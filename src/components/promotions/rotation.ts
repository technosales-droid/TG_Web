/**
 * Picks the next course to promote. A course is not repeated until every course has been shown; when the round is
 * complete a new one starts, and its first pick is never the course that just closed the previous round.
 */
export function pickNext(ids: string[], shown: string[], rand: () => number = Math.random) {
  let round = shown.filter((id) => ids.includes(id));
  let pool = ids.filter((id) => !round.includes(id));
  if (!pool.length) {
    const last = round.at(-1);
    pool = ids.length > 1 ? ids.filter((id) => id !== last) : ids;
    round = [];
  }
  const id = pool[Math.floor(rand() * pool.length)];
  return { id, shown: [...round, id] };
}
