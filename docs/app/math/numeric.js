// Numerical methods shared by the calculator: roots, extrema, integrals, derivatives,
// polynomial roots, one-variable statistics, regressions, and exact-form detection.
// Every function is pure so it can be tested in Node.

const EPS = 1e-12;

// ---------- Roots and extrema ----------

// Brent's method on a bracket [a, b] where f(a) and f(b) differ in sign.
export function brent(f, a, b, tol = 1e-13, maxIter = 200) {
  let fa = f(a);
  let fb = f(b);
  if (fa === 0) return a;
  if (fb === 0) return b;
  if (!(fa * fb < 0)) return NaN;
  let c = a;
  let fc = fa;
  let d = b - a;
  let e = d;
  for (let i = 0; i < maxIter; i += 1) {
    if (fb * fc > 0) {
      c = a;
      fc = fa;
      d = b - a;
      e = d;
    }
    if (Math.abs(fc) < Math.abs(fb)) {
      a = b;
      b = c;
      c = a;
      fa = fb;
      fb = fc;
      fc = fa;
    }
    const tol1 = 2 * Number.EPSILON * Math.abs(b) + tol / 2;
    const xm = (c - b) / 2;
    if (Math.abs(xm) <= tol1 || fb === 0) return b;
    if (Math.abs(e) >= tol1 && Math.abs(fa) > Math.abs(fb)) {
      const s = fb / fa;
      let p;
      let q;
      if (a === c) {
        p = 2 * xm * s;
        q = 1 - s;
      } else {
        const qq = fa / fc;
        const r = fb / fc;
        p = s * (2 * xm * qq * (qq - r) - (b - a) * (r - 1));
        q = (qq - 1) * (r - 1) * (s - 1);
      }
      if (p > 0) q = -q;
      p = Math.abs(p);
      if (2 * p < Math.min(3 * xm * q - Math.abs(tol1 * q), Math.abs(e * q))) {
        e = d;
        d = p / q;
      } else {
        d = xm;
        e = d;
      }
    } else {
      d = xm;
      e = d;
    }
    a = b;
    fa = fb;
    b += Math.abs(d) > tol1 ? d : xm > 0 ? tol1 : -tol1;
    fb = f(b);
    if (!Number.isFinite(fb)) return NaN;
  }
  return b;
}

// Golden-section search for a minimum of f on [a, b].
export function goldenMin(f, a, b, tol = 1e-11) {
  const ratio = (Math.sqrt(5) - 1) / 2;
  let c = b - ratio * (b - a);
  let d = a + ratio * (b - a);
  let fc = f(c);
  let fd = f(d);
  for (
    let i = 0;
    i < 200 && Math.abs(b - a) > tol * (1 + Math.abs(a) + Math.abs(b));
    i += 1
  ) {
    if (fc < fd) {
      b = d;
      d = c;
      fd = fc;
      c = b - ratio * (b - a);
      fc = f(c);
    } else {
      a = c;
      c = d;
      fc = fd;
      d = a + ratio * (b - a);
      fd = f(d);
    }
  }
  return (a + b) / 2;
}

function samplesOf(f, a, b, n) {
  const xs = [];
  const ys = [];
  for (let k = 0; k <= n; k += 1) {
    const x = a + ((b - a) * k) / n;
    xs.push(x);
    ys.push(f(x));
  }
  return { xs, ys };
}

const dedupe = (list, scale) => {
  const out = [];
  for (const item of list.sort((p, q) => p.x - q.x))
    if (!out.length || Math.abs(item.x - out[out.length - 1].x) > 1e-7 * scale)
      out.push(item);
  return out;
};

// All real zeros of f on [a, b]: sign changes refined by Brent, plus touching zeros
// (even multiplicity) found as minima of |f| that reach zero. A sign change across a
// vertical asymptote is rejected because |f| grows instead of vanishing there.
export function findZeros(f, a, b, n = 1200) {
  const { xs, ys } = samplesOf(f, a, b, n);
  const finite = ys.filter(Number.isFinite).map(Math.abs);
  const scale = Math.max(1, ...finite.filter((v) => v < 1e6));
  const tolerance = 1e-9 * scale;
  const found = [];
  for (let k = 0; k < n; k += 1) {
    const y0 = ys[k];
    const y1 = ys[k + 1];
    if (!Number.isFinite(y0) || !Number.isFinite(y1)) continue;
    if (y0 === 0) {
      found.push({ x: xs[k], y: 0 });
      continue;
    }
    if (y0 * y1 < 0) {
      const x = brent(f, xs[k], xs[k + 1]);
      const y = f(x);
      if (
        Number.isFinite(y) &&
        Math.abs(y) <= Math.max(tolerance, 1e-6 * Math.min(Math.abs(y0), Math.abs(y1)))
      )
        found.push({ x, y: 0 });
    }
  }
  if (ys[n] === 0) found.push({ x: xs[n], y: 0 });
  // Touching zeros: |f| has a local minimum near 0 without a sign change.
  for (let k = 1; k < n; k += 1) {
    const [p, c, q] = [ys[k - 1], ys[k], ys[k + 1]].map(Math.abs);
    if (![p, c, q].every(Number.isFinite)) continue;
    if (c <= p && c <= q && ys[k - 1] * ys[k + 1] > 0 && c < 0.05 * scale) {
      const x = goldenMin((t) => Math.abs(f(t)), xs[k - 1], xs[k + 1]);
      if (Math.abs(f(x)) <= tolerance) found.push({ x, y: 0 });
    }
  }
  return dedupe(found, Math.max(1, Math.abs(a), Math.abs(b))).map((z) => ({
    x: clean(z.x),
    y: 0,
  }));
}

// Local minima and maxima of f strictly inside (a, b).
export function findExtrema(f, a, b, n = 1200) {
  const { xs, ys } = samplesOf(f, a, b, n);
  const magnitudes = ys
    .filter(Number.isFinite)
    .map(Math.abs)
    .sort((p, q) => p - q);
  const typical = Math.max(1, magnitudes[Math.floor(magnitudes.length / 2)] || 0);
  const found = [];
  for (let k = 1; k < n; k += 1) {
    const [p, c, q] = [ys[k - 1], ys[k], ys[k + 1]];
    if (![p, c, q].every(Number.isFinite)) continue;
    const isMax = c >= p && c >= q && (c > p || c > q);
    const isMin = c <= p && c <= q && (c < p || c < q);
    if (!isMax && !isMin) continue;
    const g = isMax ? (t) => -f(t) : f;
    let x = goldenMin(g, xs[k - 1], xs[k + 1]);
    // Golden-section search is limited to about 8 digits on a flat top, so polish
    // the location as a zero of the slope when the slope changes sign around it.
    const slope = (t) => {
      const h = 1e-6 * Math.max(1, Math.abs(t));
      return (f(t + h) - f(t - h)) / (2 * h);
    };
    const step = (b - a) / n;
    const lo = Math.max(a, x - step);
    const hi = Math.min(b, x + step);
    if (slope(lo) * slope(hi) < 0) {
      const polished = brent(slope, lo, hi);
      if (Number.isFinite(polished) && Math.abs(polished - x) < step) x = polished;
    }
    const y = f(x);
    if (!Number.isFinite(y)) continue;
    // A spike beside a vertical asymptote is not an extremum. Near a true one the
    // graph falls away like h² (or like h at a corner); beside an asymptote the
    // drop stays about the same size however close you look.
    const drop = (h) => {
      const sides = [f(x - h), f(x + h)];
      if (!sides.every(Number.isFinite)) return NaN;
      return sides.reduce((s, v) => s + (isMax ? y - v : v - y), 0) / 2;
    };
    const far = drop(step / 10);
    const close = drop(step / 100);
    if (!Number.isFinite(far) || !Number.isFinite(close) || far < 0 || close < 0)
      continue;
    if (close > 0 && far / close < 4) continue;
    const scale = Math.max(1, Math.abs(a), Math.abs(b));
    if (Math.abs(x) < 1e-9 * scale) x = 0;
    const value = f(x);
    found.push({
      x: clean(x),
      y: Math.abs(value) < 1e-10 * typical ? 0 : clean(value),
      kind: isMax ? "maximum" : "minimum",
    });
  }
  return dedupe(found, Math.max(1, Math.abs(a), Math.abs(b)));
}

// Solves f(x) = 0 near a guess, or inside [low, high].
export function solve(f, guess = 0, high) {
  if (high !== undefined) {
    const zeros = findZeros(f, Math.min(guess, high), Math.max(guess, high), 2000);
    if (zeros.length) return zeros[0].x;
    return NaN;
  }
  // Search outward from the guess for a sign change, then refine.
  const f0 = f(guess);
  if (f0 === 0) return guess;
  let step = Math.max(1e-3, Math.abs(guess) * 1e-3);
  for (let i = 0; i < 80; i += 1) {
    for (const [lo, hi] of [
      [guess - step, guess],
      [guess, guess + step],
      [guess - step, guess - step / 2],
      [guess + step / 2, guess + step],
    ]) {
      const flo = f(lo);
      const fhi = f(hi);
      if (Number.isFinite(flo) && Number.isFinite(fhi) && flo * fhi <= 0) {
        const x = brent(f, lo, hi);
        if (Number.isFinite(x) && Math.abs(f(x)) < 1e-6 * Math.max(1, Math.abs(f0)))
          return clean(x);
      }
    }
    step *= 1.6;
  }
  // No sign change: maybe a touching zero near the guess.
  const near = findZeros(f, guess - 10, guess + 10, 4000);
  if (near.length)
    return near.reduce((best, z) =>
      Math.abs(z.x - guess) < Math.abs(best.x - guess) ? z : best,
    ).x;
  return NaN;
}

// ---------- Calculus helpers ----------

export function derivative(f, x) {
  const h = 1e-3 * Math.max(1, Math.abs(x));
  const value = (-f(x + 2 * h) + 8 * f(x + h) - 8 * f(x - h) + f(x - 2 * h)) / (12 * h);
  return clean(value, 1e-9);
}

export function integrate(f, a, b) {
  if (a === b) return 0;
  const simpson = (l, r, fl, fm, fr) => ((r - l) / 6) * (fl + 4 * fm + fr);
  const recurse = (l, r, fl, fm, fr, whole, tol, depth) => {
    const m = (l + r) / 2;
    const lm = (l + m) / 2;
    const rm = (m + r) / 2;
    const flm = f(lm);
    const frm = f(rm);
    const left = simpson(l, m, fl, flm, fm);
    const right = simpson(m, r, fm, frm, fr);
    if (!Number.isFinite(left + right)) return NaN;
    if (depth <= 0 || Math.abs(left + right - whole) <= 15 * tol)
      return left + right + (left + right - whole) / 15;
    return (
      recurse(l, m, fl, flm, fm, left, tol / 2, depth - 1) +
      recurse(m, r, fm, frm, fr, right, tol / 2, depth - 1)
    );
  };
  const fa = f(a);
  const fb = f(b);
  const fm = f((a + b) / 2);
  const value = recurse(a, b, fa, fm, fb, simpson(a, b, fa, fm, fb), 1e-11, 40);
  return clean(value, 1e-10);
}

// ---------- Polynomials ----------

// All roots (real and complex) of a polynomial given highest-degree coefficient first.
// Aberth–Ehrlich iteration; tiny imaginary parts are cleaned to zero.
export function polynomialRoots(coefficients) {
  let c = coefficients.map(Number);
  while (c.length && c[0] === 0) c.shift();
  const zerosAtOrigin = [];
  while (c.length > 1 && c[c.length - 1] === 0) {
    c.pop();
    zerosAtOrigin.push({ re: 0, im: 0 });
  }
  const n = c.length - 1;
  if (n < 1) return zerosAtOrigin;
  const lead = c[0];
  c = c.map((v) => v / lead);
  const evalAt = (z) => {
    let re = 1;
    let im = 0;
    let dre = 0;
    let dim = 0;
    for (let k = 1; k <= n; k += 1) {
      // derivative first: d = d*z + p
      const ndre = dre * z.re - dim * z.im + re;
      const ndim = dre * z.im + dim * z.re + im;
      dre = ndre;
      dim = ndim;
      const nre = re * z.re - im * z.im + c[k];
      const nim = re * z.im + im * z.re;
      re = nre;
      im = nim;
    }
    return { p: { re, im }, d: { re: dre, im: dim } };
  };
  const radius = 1 + Math.max(...c.slice(1).map(Math.abs));
  let roots = Array.from({ length: n }, (_, k) => {
    const angle = (2 * Math.PI * k) / n + 0.4;
    return { re: radius * 0.5 * Math.cos(angle), im: radius * 0.5 * Math.sin(angle) };
  });
  const div = (a, b) => {
    const den = b.re * b.re + b.im * b.im;
    return {
      re: (a.re * b.re + a.im * b.im) / den,
      im: (a.im * b.re - a.re * b.im) / den,
    };
  };
  for (let iter = 0; iter < 500; iter += 1) {
    let moved = 0;
    roots = roots.map((z, i) => {
      const { p, d } = evalAt(z);
      if (p.re === 0 && p.im === 0) return z;
      const ratio = div(p, d);
      let sum = { re: 0, im: 0 };
      roots.forEach((w, j) => {
        if (i === j) return;
        const diff = { re: z.re - w.re, im: z.im - w.im };
        const inv = div({ re: 1, im: 0 }, diff);
        sum = { re: sum.re + inv.re, im: sum.im + inv.im };
      });
      const denom = {
        re: 1 - (ratio.re * sum.re - ratio.im * sum.im),
        im: -(ratio.re * sum.im + ratio.im * sum.re),
      };
      const step = div(ratio, denom);
      moved = Math.max(
        moved,
        Math.hypot(step.re, step.im) / Math.max(1, Math.hypot(z.re, z.im)),
      );
      return { re: z.re - step.re, im: z.im - step.im };
    });
    if (moved < 1e-15) break;
  }
  // A repeated root comes back as a tight cluster; its average is far more accurate.
  const clustered = roots.map((z) => {
    const near = roots.filter(
      (w) =>
        Math.hypot(w.re - z.re, w.im - z.im) < 1e-5 * Math.max(1, Math.hypot(z.re, z.im)),
    );
    return {
      re: near.reduce((s, w) => s + w.re, 0) / near.length,
      im: near.reduce((s, w) => s + w.im, 0) / near.length,
    };
  });
  const out = clustered.map((z) => {
    const scale = Math.max(1, Math.hypot(z.re, z.im));
    return {
      re: Math.abs(z.re) < 1e-10 * scale ? 0 : clean(z.re, 1e-9),
      im: Math.abs(z.im) < 1e-8 * scale ? 0 : clean(z.im, 1e-9),
    };
  });
  return [...out, ...zerosAtOrigin].sort((p, q) => p.re - q.re || p.im - q.im);
}

// ---------- Statistics ----------

export function quantiles(sorted) {
  const median = (list) => {
    const m = list.length;
    if (!m) return NaN;
    return m % 2 ? list[(m - 1) / 2] : (list[m / 2 - 1] + list[m / 2]) / 2;
  };
  const n = sorted.length;
  const lower = sorted.slice(0, Math.floor(n / 2));
  const upper = sorted.slice(Math.ceil(n / 2));
  return { q1: median(lower), median: median(sorted), q3: median(upper) };
}

export function oneVariable(values) {
  const list = values.filter(Number.isFinite);
  const n = list.length;
  if (!n) throw new Error("No data");
  const sum = list.reduce((s, v) => s + v, 0);
  const mean = sum / n;
  const sumSquares = list.reduce((s, v) => s + v * v, 0);
  const ss = list.reduce((s, v) => s + (v - mean) ** 2, 0);
  const sorted = [...list].sort((a, b) => a - b);
  const { q1, median, q3 } =
    n > 1 ? quantiles(sorted) : { q1: NaN, median: sorted[0], q3: NaN };
  return {
    n,
    mean: clean(mean),
    sum: clean(sum),
    sumSquares: clean(sumSquares),
    sampleSD: n > 1 ? clean(Math.sqrt(ss / (n - 1))) : NaN,
    populationSD: clean(Math.sqrt(ss / n)),
    min: sorted[0],
    q1,
    median,
    q3,
    max: sorted[n - 1],
  };
}

// ---------- Least squares ----------

// Solves the least-squares problem A·c ≈ y with Householder QR.
export function leastSquares(rows, y) {
  const m = rows.length;
  const n = rows[0].length;
  if (m < n) throw new Error(`Needs at least ${n} data points`);
  const A = rows.map((row) => [...row]);
  const b = [...y];
  for (let k = 0; k < n; k += 1) {
    let norm = 0;
    for (let i = k; i < m; i += 1) norm += A[i][k] ** 2;
    norm = Math.sqrt(norm);
    if (norm === 0) throw new Error("The data cannot determine this model");
    const alpha = A[k][k] > 0 ? -norm : norm;
    const v = new Array(m).fill(0);
    for (let i = k; i < m; i += 1) v[i] = A[i][k];
    v[k] -= alpha;
    const vv = v.reduce((s, x) => s + x * x, 0);
    if (vv === 0) continue;
    for (let j = k; j < n; j += 1) {
      let dot = 0;
      for (let i = k; i < m; i += 1) dot += v[i] * A[i][j];
      for (let i = k; i < m; i += 1) A[i][j] -= (2 * dot * v[i]) / vv;
    }
    let dot = 0;
    for (let i = k; i < m; i += 1) dot += v[i] * b[i];
    for (let i = k; i < m; i += 1) b[i] -= (2 * dot * v[i]) / vv;
  }
  const c = new Array(n).fill(0);
  for (let k = n - 1; k >= 0; k -= 1) {
    let s = b[k];
    for (let j = k + 1; j < n; j += 1) s -= A[k][j] * c[j];
    if (Math.abs(A[k][k]) < 1e-14)
      throw new Error("The data cannot determine this model");
    c[k] = s / A[k][k];
  }
  return c;
}

function rSquared(ys, predicted) {
  const mean = ys.reduce((s, v) => s + v, 0) / ys.length;
  const total = ys.reduce((s, v) => s + (v - mean) ** 2, 0);
  const residual = ys.reduce((s, v, i) => s + (v - predicted[i]) ** 2, 0);
  return total === 0 ? 1 : 1 - residual / total;
}

function correlation(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((s, v) => s + v, 0) / n;
  const my = ys.reduce((s, v) => s + v, 0) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i += 1) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
    syy += (ys[i] - my) ** 2;
  }
  return sxx && syy ? sxy / Math.sqrt(sxx * syy) : NaN;
}

export const REGRESSIONS = Object.freeze({
  linear: { label: "Linear", form: "y = a + bx", minPoints: 2 },
  quadratic: { label: "Quadratic", form: "y = a + bx + cx²", minPoints: 3 },
  cubic: { label: "Cubic", form: "y = a + bx + cx² + dx³", minPoints: 4 },
  quartic: { label: "Quartic", form: "y = a + bx + cx² + dx³ + ex⁴", minPoints: 5 },
  exponential: { label: "Exponential", form: "y = a·bˣ", minPoints: 2 },
  logarithmic: { label: "Logarithmic", form: "y = a + b·ln(x)", minPoints: 2 },
  power: { label: "Power", form: "y = a·xᵇ", minPoints: 2 },
  sinusoidal: { label: "Sinusoidal", form: "y = a·sin(b(x + c)) + d", minPoints: 4 },
});

const LETTERS = ["a", "b", "c", "d", "e"];

// Fits a model to paired data. Returns coefficients, a predict function, goodness of
// fit, and expression text the calculator can graph (in radians for sinusoidal).
export function regression(kind, xs, ys) {
  const spec = REGRESSIONS[kind];
  if (!spec) throw new Error(`Unknown regression "${kind}"`);
  const pairs = xs
    .map((x, i) => [x, ys[i]])
    .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
  if (pairs.length < spec.minPoints)
    throw new Error(
      `${spec.label} regression needs at least ${spec.minPoints} data points`,
    );
  const X = pairs.map((p) => p[0]);
  const Y = pairs.map((p) => p[1]);
  const result = { kind, label: spec.label, form: spec.form, n: pairs.length };

  if (["linear", "quadratic", "cubic", "quartic"].includes(kind)) {
    const degree = { linear: 1, quadratic: 2, cubic: 3, quartic: 4 }[kind];
    // Center and scale x for a well-conditioned fit, then expand back.
    const mean = X.reduce((s, v) => s + v, 0) / X.length;
    const spread = Math.max(...X.map((x) => Math.abs(x - mean))) || 1;
    const rows = X.map((x) =>
      Array.from({ length: degree + 1 }, (_, k) => ((x - mean) / spread) ** k),
    );
    const scaled = leastSquares(rows, Y);
    // Expand p(t) with t = (x − mean)/spread into powers of x.
    const coef = new Array(degree + 1).fill(0);
    scaled.forEach((ck, k) => {
      for (let j = 0; j <= k; j += 1)
        coef[j] += (ck * binomial(k, j) * (-mean) ** (k - j)) / spread ** k;
    });
    const largest = Math.max(...coef.map(Math.abs));
    coef.forEach((v, k) => {
      coef[k] = Math.abs(v) < 1e-11 * largest ? 0 : clean(v, 1e-12);
    });
    const predict = (x) => coef.reduce((s, ck, k) => s + ck * x ** k, 0);
    result.coefficients = Object.fromEntries(coef.map((v, k) => [LETTERS[k], v]));
    result.predict = predict;
    result.expression =
      coef
        .map((v, k) =>
          v === 0 ? "" : `${paren(v)}${k === 0 ? "" : k === 1 ? "*x" : `*x^${k}`}`,
        )
        .filter(Boolean)
        .join(" + ") || "0";
    result.r2 = rSquared(Y, X.map(predict));
    if (kind === "linear") result.r = correlation(X, Y);
    return result;
  }
  if (kind === "exponential") {
    if (Y.some((y) => y <= 0))
      throw new Error("Exponential regression needs every y-value to be positive");
    const lnY = Y.map(Math.log);
    const [c0, c1] = leastSquares(
      X.map((x) => [1, x]),
      lnY,
    );
    const a = Math.exp(c0);
    const b = Math.exp(c1);
    result.coefficients = { a, b };
    result.predict = (x) => a * b ** x;
    result.expression = `${paren(a)}*${paren(b)}^x`;
    result.r = correlation(X, lnY);
    result.r2 = result.r ** 2;
    result.transformed = "ln(y) against x";
    return result;
  }
  if (kind === "logarithmic") {
    if (X.some((x) => x <= 0))
      throw new Error("Logarithmic regression needs every x-value to be positive");
    const lnX = X.map(Math.log);
    const [a, b] = leastSquares(
      lnX.map((t) => [1, t]),
      Y,
    );
    result.coefficients = { a, b };
    result.predict = (x) => a + b * Math.log(x);
    result.expression = `${paren(a)} + ${paren(b)}*ln(x)`;
    result.r = correlation(lnX, Y);
    result.r2 = result.r ** 2;
    result.transformed = "y against ln(x)";
    return result;
  }
  if (kind === "power") {
    if (X.some((x) => x <= 0) || Y.some((y) => y <= 0))
      throw new Error("Power regression needs every x- and y-value to be positive");
    const lnX = X.map(Math.log);
    const lnY = Y.map(Math.log);
    const [c0, b] = leastSquares(
      lnX.map((t) => [1, t]),
      lnY,
    );
    const a = Math.exp(c0);
    result.coefficients = { a, b };
    result.predict = (x) => a * x ** b;
    result.expression = `${paren(a)}*x^${paren(b)}`;
    result.r = correlation(lnX, lnY);
    result.r2 = result.r ** 2;
    result.transformed = "ln(y) against ln(x)";
    return result;
  }
  // Sinusoidal: for each trial frequency the best a·sin + b·cos + d is linear, so search
  // the frequency, then polish it with golden-section search.
  const sorted = [...X].sort((p, q) => p - q);
  const span = sorted[sorted.length - 1] - sorted[0];
  if (!(span > 0)) throw new Error("Sinusoidal regression needs different x-values");
  const gaps = sorted
    .slice(1)
    .map((x, i) => x - sorted[i])
    .filter((g) => g > 0);
  const minGap = Math.min(...gaps);
  const fitAt = (w) => {
    const coef = leastSquares(
      X.map((x) => [Math.sin(w * x), Math.cos(w * x), 1]),
      Y,
    );
    const sse = X.reduce(
      (s, x, i) =>
        s + (coef[0] * Math.sin(w * x) + coef[1] * Math.cos(w * x) + coef[2] - Y[i]) ** 2,
      0,
    );
    return { coef, sse };
  };
  const low = (2 * Math.PI) / (4 * span);
  const high = Math.PI / minGap;
  let best = null;
  const trials = 2000;
  for (let k = 0; k <= trials; k += 1) {
    const w = low * (high / low) ** (k / trials);
    try {
      const { sse } = fitAt(w);
      if (!best || sse < best.sse) best = { w, sse, k };
    } catch {
      // A frequency that makes the columns dependent is skipped.
    }
  }
  if (!best) throw new Error("Sinusoidal regression could not fit this data");
  const ratio = (high / low) ** (1 / trials);
  const w = goldenMin(
    (t) => {
      try {
        return fitAt(t).sse;
      } catch {
        return Infinity;
      }
    },
    best.w / ratio,
    best.w * ratio,
  );
  const { coef } = fitAt(w);
  const amplitude = Math.hypot(coef[0], coef[1]);
  const phase = Math.atan2(coef[1], coef[0]); // A sin + B cos = amplitude·sin(w x + phase)
  // Written as a·sin(b(x + c)) + d, as in the CED, with the shift c of smallest size.
  const period = (2 * Math.PI) / w;
  let shift = phase / w;
  shift -= period * Math.round(shift / period);
  const a = amplitude;
  const b = w;
  const c = shift;
  const d = coef[2];
  result.coefficients = { a, b, c, d };
  result.predict = (x) => a * Math.sin(b * (x + c)) + d;
  result.expression = `${paren(a)}*sin(${paren(b)}*(x + ${paren(c)})) + ${paren(d)}`;
  result.period = period;
  result.r2 = rSquared(Y, X.map(result.predict));
  return result;
}

function binomial(n, k) {
  let r = 1;
  for (let i = 1; i <= k; i += 1) r = (r * (n - k + i)) / i;
  return r;
}

// Full-precision number text for expressions the calculator re-reads.
function paren(v) {
  const text = String(Number(v.toPrecision(15)));
  if (text.includes("e")) {
    const [mantissa, exponent] = text.split("e");
    return `(${mantissa}*10^(${Number(exponent)}))`;
  }
  return v < 0 ? `(${text})` : text;
}

// ---------- Exact forms ----------

// Rounds values that are within floating-point noise of a short decimal.
export function clean(value, tolerance = 1e-12) {
  if (!Number.isFinite(value)) return value;
  const rounded = Number(value.toPrecision(12));
  return Math.abs(rounded - value) <= tolerance * Math.max(1, Math.abs(value))
    ? rounded
    : value;
}

// Best rational p/q with q ≤ maxDen if it matches x to near machine precision.
export function toFraction(x, maxDen = 10000) {
  if (!Number.isFinite(x)) return null;
  const sign = x < 0 ? -1 : 1;
  let value = Math.abs(x);
  let h0 = 1;
  let h1 = 0;
  let k0 = 0;
  let k1 = 1;
  let rest = value;
  for (let i = 0; i < 40; i += 1) {
    const a = Math.floor(rest);
    const h = a * h0 + h1;
    const k = a * k0 + k1;
    if (k > maxDen) break;
    h1 = h0;
    h0 = h;
    k1 = k0;
    k0 = k;
    if (Math.abs(value - h / k) <= 1e-12 * Math.max(1, value))
      return { n: sign * h, d: k };
    const frac = rest - a;
    if (frac < EPS) break;
    rest = 1 / frac;
  }
  return null;
}

function squareFree(n) {
  let outside = 1;
  let inside = n;
  for (let f = 2; f * f <= inside; f += 1)
    while (inside % (f * f) === 0) {
      inside /= f * f;
      outside *= f;
    }
  return { outside, inside };
}

// Recognizes p/q, p·π/q, and (p/q)·√n so results like 0.8660254038 can be shown as √3/2.
export function exactForm(x) {
  if (!Number.isFinite(x) || Number.isInteger(x) || Math.abs(x) > 1e9) return null;
  const sign = x < 0 ? "−" : "";
  const frac = toFraction(x, 1000);
  if (frac) return `${frac.n < 0 ? "−" : ""}${Math.abs(frac.n)}/${frac.d}`;
  const piFrac = toFraction(x / Math.PI, 24);
  if (piFrac && Math.abs(piFrac.n) <= 96) {
    const n = Math.abs(piFrac.n);
    const top = n === 1 ? "π" : `${n}π`;
    return `${sign}${piFrac.d === 1 ? top : `${top}/${piFrac.d}`}`;
  }
  const square = toFraction(x * x, 400);
  if (square && square.n > 0) {
    // x = √(n/d) = √(n·d)/d, then pull square factors out of the root.
    const { outside, inside } = squareFree(square.n * square.d);
    if (inside > 1 && inside <= 1000) {
      const reduced = toFraction(outside / square.d, 1000);
      if (reduced) {
        const coefficient = Math.abs(reduced.n) === 1 ? "" : String(Math.abs(reduced.n));
        const root = `${coefficient}√${inside}`;
        return `${sign}${reduced.d === 1 ? root : `${root}/${reduced.d}`}`;
      }
    }
  }
  return null;
}
