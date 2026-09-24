// Run: node --experimental-strip-types src/components/promotions/rotation.check.ts
// @ts-expect-error node needs the .ts extension
import { pickNext } from "./rotation.ts";

const ids = ["a", "b", "c", "d"];
let shown: string[] = [];
let prev = "";
for (let round = 0; round < 50; round++) {
  const seen = new Set<string>();
  for (let i = 0; i < ids.length; i++) {
    const n = pickNext(ids, shown);
    if (seen.has(n.id)) throw new Error(`repeat within round: ${n.id}`);
    if (i === 0 && n.id === prev) throw new Error("round boundary repeat");
    seen.add(n.id);
    shown = n.shown;
    prev = n.id;
  }
  if (seen.size !== ids.length) throw new Error("round incomplete");
}
console.log("rotation ok");
