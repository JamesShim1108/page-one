// A seeded random source for problem templates. The same seed always gives the same
// problem, so a built bank is reproducible and a failing variant can be rerun.

export function hashText(text) {
  let hash = 2166136261;
  for (const ch of String(text)) {
    hash ^= ch.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createRandom(seed) {
  const next = mulberry32(typeof seed === "number" ? seed : hashText(seed));
  const api = {
    next,
    // An integer from lo to hi, both included.
    int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
    // Like int but never 0.
    nonzero: (lo, hi) => {
      let value = 0;
      while (value === 0) value = api.int(lo, hi);
      return value;
    },
    pick: (list) => list[Math.floor(next() * list.length)],
    chance: (p = 0.5) => next() < p,
    sign: () => (next() < 0.5 ? -1 : 1),
    shuffle(list) {
      const out = [...list];
      for (let i = out.length - 1; i > 0; i -= 1) {
        const j = Math.floor(next() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    },
    // n different integers from lo to hi.
    distinct(lo, hi, n) {
      const pool = [];
      for (let v = lo; v <= hi; v += 1) pool.push(v);
      return api.shuffle(pool).slice(0, n);
    },
    // n different non-zero integers from lo to hi.
    distinctNonzero(lo, hi, n) {
      const pool = [];
      for (let v = lo; v <= hi; v += 1) if (v !== 0) pool.push(v);
      return api.shuffle(pool).slice(0, n);
    },
    sample: (list, n) => api.shuffle(list).slice(0, n),
  };
  return api;
}
