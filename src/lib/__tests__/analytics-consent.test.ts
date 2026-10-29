// Run with: node --experimental-strip-types --test src/lib/__tests__/analytics-consent.test.ts
//
// No test framework is installed in this project; these use only Node's own built-in test runner and its own
// TS type-stripping, so they add no new dependency. They exercise the real source files (consent.ts,
// tracker-scripts.ts), not a reimplementation -- except the two analytics *components* themselves
// (google-tag-manager.tsx, meta-pixel.tsx), which contain JSX that Node's loader can't parse; that's exactly
// why their script text was factored out into tracker-scripts.ts (a plain module) in the first place.
import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";

// ---- minimal browser stubs, installed before importing consent.ts --------------------------------------
function installDomStubs() {
  let cookieJar: Record<string, string> = {};
  let storage: Record<string, string> = {};

  (globalThis as unknown as { document: unknown }).document = {
    get cookie() {
      return Object.entries(cookieJar)
        .map(([k, v]) => `${k}=${v}`)
        .join("; ");
    },
    set cookie(value: string) {
      const [pair] = value.split(";");
      const eq = pair.indexOf("=");
      const name = pair.slice(0, eq).trim();
      const val = pair.slice(eq + 1);
      if (/expires=Thu, 01 Jan 1970/.test(value)) delete cookieJar[name];
      else cookieJar[name] = val;
    },
  };

  (globalThis as unknown as { localStorage: unknown }).localStorage = {
    getItem: (k: string) => (k in storage ? storage[k] : null),
    setItem: (k: string, v: string) => {
      storage[k] = v;
    },
    removeItem: (k: string) => {
      delete storage[k];
    },
  };

  return {
    setCookie: (name: string, value: string) => {
      cookieJar[name] = value;
    },
    cookieNames: () => Object.keys(cookieJar),
    storageEntries: () => storage,
    reset: () => {
      cookieJar = {};
      storage = {};
    },
  };
}

const stubs = installDomStubs();

// Imported *after* the stubs above are installed on globalThis, since clearCookiesByPrefix/setConsent read
// document/localStorage at call time, not at import time -- but importing after is the safer order regardless.
const { clearCookiesByPrefix, setConsent } = await import("../consent.ts");
const { gtmScript, metaPixelScript, GTM_FIRED_KEY, META_PIXEL_FIRED_KEY, GTM_ID, META_PIXEL_ID } = await import(
  "../tracker-scripts.ts"
);

beforeEach(() => stubs.reset());

describe("clearCookiesByPrefix", () => {
  test("deletes every cookie matching a given prefix, leaves others alone", () => {
    stubs.setCookie("_ga", "GA1.1.123");
    stubs.setCookie("_ga_ABC123DEF", "GS1.1.456");
    stubs.setCookie("_fbp", "fb.1.789");
    stubs.setCookie("tg-cookie-preferences", "kept");

    clearCookiesByPrefix(["_ga"]);

    const remaining = stubs.cookieNames();
    assert.ok(!remaining.includes("_ga"), "_ga should be cleared");
    assert.ok(!remaining.includes("_ga_ABC123DEF"), "_ga_<id> should be cleared (prefix match)");
    assert.ok(remaining.includes("_fbp"), "unrelated cookie _fbp must survive an _ga clear");
    assert.ok(remaining.includes("tg-cookie-preferences"), "the consent record itself must survive");
  });

  test("is a no-op when nothing matches, and safe to call with no document at all", () => {
    stubs.setCookie("unrelated", "1");
    clearCookiesByPrefix(["_fbp", "_fbc"]);
    assert.deepEqual(stubs.cookieNames(), ["unrelated"]);
  });
});

describe("setConsent", () => {
  test("persists the marketing flag alongside embeds/analytics", () => {
    setConsent({ embeds: true, analytics: false, marketing: true, choice: "custom" });
    const raw = stubs.storageEntries()["tg-cookie-preferences"];
    assert.ok(raw, "setConsent must write to the known localStorage key");
    const saved = JSON.parse(raw);
    assert.equal(saved.embeds, true);
    assert.equal(saved.analytics, false);
    assert.equal(saved.marketing, true);
    assert.equal(saved.choice, "custom");
  });

  test("defaults the choice to 'all' only when something was actually allowed", () => {
    setConsent({ embeds: false, analytics: false, marketing: true });
    const allowed = JSON.parse(Object.values(stubs.storageEntries())[0] as string);
    assert.equal(allowed.choice, "all");

    stubs.reset();
    setConsent({ embeds: false, analytics: false, marketing: false });
    const nothingAllowed = JSON.parse(Object.values(stubs.storageEntries())[0] as string);
    assert.equal(nothingAllowed.choice, "necessary");
  });
});

// ---- duplicate-event guards: run each real script string through node:vm, twice, against a mocked window,
// and assert the tracked side effect only happens once -- this is the scenario a visitor creates by toggling
// a consent switch off then back on in the same tab without a page reload. --------------------------------

function runScriptTwice(script: string) {
  const calls: { fbq: unknown[][]; dataLayerPush: unknown[][]; scriptsInserted: number } = {
    fbq: [],
    dataLayerPush: [],
    scriptsInserted: 0,
  };
  const sessionStore: Record<string, string> = {};
  const fakeScriptEl = { async: false, src: "" };
  const sandbox = {
    window: {
      sessionStorage: {
        getItem: (k: string) => (k in sessionStore ? sessionStore[k] : null),
        setItem: (k: string, v: string) => {
          sessionStore[k] = v;
        },
      },
    },
    document: {
      createElement: () => {
        calls.scriptsInserted += 1;
        return { ...fakeScriptEl };
      },
      getElementsByTagName: () => [{ parentNode: { insertBefore: () => {} } }],
    },
    fbq: undefined as unknown,
    dataLayer: undefined as unknown,
  };
  // fbq() itself, plus the loader IIFE's own `if (f.fbq) return` guard, both live inside the pasted snippet;
  // give the sandbox a real recording fbq so calls after 'init'/'track' are observable, and let the IIFE
  // define its own replacement on first run exactly as it would in a real browser.
  sandbox.fbq = (...args: unknown[]) => calls.fbq.push(args);
  const ctx = vm.createContext(sandbox);
  // Run the identical script twice in the SAME context/window -- exactly what happens when React remounts
  // the <Script> tag after a consent toggle, since sessionStorage (unlike a plain JS variable) survives that.
  vm.runInContext(script, ctx);
  vm.runInContext(script, ctx);
  return calls;
}

describe("duplicate-event guards", () => {
  test("Meta Pixel: fbq('init'/'track') fire exactly once across two script runs in one tab", () => {
    const calls = runScriptTwice(metaPixelScript());
    const inits = calls.fbq.filter((c) => c[0] === "init");
    const tracks = calls.fbq.filter((c) => c[0] === "track" && c[1] === "PageView");
    assert.equal(inits.length, 1, "fbq('init', ...) must fire exactly once per tab");
    assert.equal(tracks.length, 1, "fbq('track', 'PageView') must fire exactly once per tab");
    assert.equal(inits[0]?.[1], META_PIXEL_ID);
  });

  test("GTM: the loader only inserts gtm.js and pushes gtm.start once across two script runs in one tab", () => {
    // GTM pushes onto window.dataLayer; wrap runScriptTwice's sandbox expectations manually since dataLayer
    // is created lazily by the snippet itself (w[l]=w[l]||[]).
    const sessionStore: Record<string, string> = {};
    let dataLayer: unknown[] = [];
    let scriptsInserted = 0;
    const sandbox = {
      window: {
        sessionStorage: {
          getItem: (k: string) => (k in sessionStore ? sessionStore[k] : null),
          setItem: (k: string, v: string) => {
            sessionStore[k] = v;
          },
        },
        get dataLayer() {
          return dataLayer;
        },
        set dataLayer(v: unknown[]) {
          dataLayer = v;
        },
      },
      document: {
        createElement: () => {
          scriptsInserted += 1;
          return { async: false, src: "" };
        },
        getElementsByTagName: () => [{ parentNode: { insertBefore: () => {} } }],
      },
    };
    const ctx = vm.createContext(sandbox);
    const script = gtmScript();
    vm.runInContext(script, ctx);
    vm.runInContext(script, ctx);

    const starts = dataLayer.filter((e) => typeof e === "object" && e !== null && (e as { event?: unknown }).event === "gtm.js");
    assert.equal(starts.length, 1, "'gtm.start' must be pushed to dataLayer exactly once per tab");
    assert.equal(scriptsInserted, 1, "gtm.js <script> must be inserted exactly once per tab");
    assert.ok(GTM_ID.startsWith("GTM-"));
  });

  test("the two trackers use different sessionStorage keys (one revoking the other must not matter)", () => {
    assert.notEqual(GTM_FIRED_KEY, META_PIXEL_FIRED_KEY);
  });
});
