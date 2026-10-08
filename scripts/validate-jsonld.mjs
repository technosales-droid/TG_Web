#!/usr/bin/env node
// Crawls the built HTML output and validates every JSON-LD block. Run after `npm run build`.
// Fails (exit 1) on: invalid JSON, two different @id values declaring conflicting data, or any field whose
// value is empty, "TODO", or an obvious placeholder string. Intended for Phase 2 of the SEO plan.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", ".next", "server", "app");
const PLACEHOLDER_RE = /\b(TODO|TBD|TBC|placeholder|lorem ipsum|xxx|to be announced|to be confirmed)\b/i;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) blocks.push(m[1].replace(/\\u003c/g, "<"));
  return blocks;
}

/** Recursively check every string value in an object/array for empty or placeholder content. */
function findBadValues(value, path, errors) {
  if (value === null || value === undefined) return;
  if (typeof value === "string") {
    if (value.trim() === "") errors.push(`${path}: empty string`);
    else if (PLACEHOLDER_RE.test(value)) errors.push(`${path}: looks like a placeholder -> "${value}"`);
  } else if (Array.isArray(value)) {
    if (value.length === 0) errors.push(`${path}: empty array`);
    value.forEach((v, i) => findBadValues(v, `${path}[${i}]`, errors));
  } else if (typeof value === "object") {
    for (const [k, v] of Object.entries(value)) findBadValues(v, `${path}.${k}`, errors);
  }
}

function main() {
  const files = walk(ROOT);
  let totalBlocks = 0;
  let failed = 0;
  /** @id -> { page, json } of the first time it was seen, to catch conflicting re-declarations. */
  const idsSeen = new Map();

  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const page = file.replace(ROOT, "").replace(/\\/g, "/");
    const blocks = extractJsonLd(html);
    blocks.forEach((raw, i) => {
      totalBlocks++;
      let data;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        failed++;
        console.error(`✗ ${page} [block ${i}]: invalid JSON -- ${e.message}`);
        return;
      }

      const errors = [];
      findBadValues(data, data["@type"] ?? "root", errors);
      if (errors.length) {
        failed++;
        console.error(`✗ ${page} [${data["@type"]}]:`);
        for (const e of errors) console.error(`    ${e}`);
      }

      const id = data["@id"];
      if (id) {
        const prior = idsSeen.get(id);
        const normalized = JSON.stringify(data);
        if (prior && prior.json !== normalized) {
          failed++;
          console.error(`✗ Duplicate @id "${id}" with conflicting data:`);
          console.error(`    first seen on ${prior.page}`);
          console.error(`    now on ${page}, values differ`);
        } else if (!prior) {
          idsSeen.set(id, { page, json: normalized });
        }
      }
    });
  }

  console.log(`\nChecked ${files.length} pages, ${totalBlocks} JSON-LD blocks, ${idsSeen.size} unique @ids.`);
  if (failed) {
    console.error(`${failed} problem(s) found.`);
    process.exit(1);
  }
  console.log("All JSON-LD blocks valid.");
}

main();
