// Exact fractions, so answers are computed without rounding.

const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

export class Q {
  constructor(n, d = 1) {
    if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0)
      throw new Error(`Bad fraction ${n}/${d}`);
    const g = gcd(n, d) || 1;
    const sign = d < 0 ? -1 : 1;
    this.n = (sign * n) / g;
    this.d = (sign * d) / g;
  }
  static of(value) {
    return value instanceof Q ? value : new Q(value, 1);
  }
  add(o) {
    o = Q.of(o);
    return new Q(this.n * o.d + o.n * this.d, this.d * o.d);
  }
  sub(o) {
    o = Q.of(o);
    return new Q(this.n * o.d - o.n * this.d, this.d * o.d);
  }
  mul(o) {
    o = Q.of(o);
    return new Q(this.n * o.n, this.d * o.d);
  }
  div(o) {
    o = Q.of(o);
    return new Q(this.n * o.d, this.d * o.n);
  }
  neg() {
    return new Q(-this.n, this.d);
  }
  pow(k) {
    let out = new Q(1);
    for (let i = 0; i < Math.abs(k); i += 1) out = out.mul(this);
    return k < 0 ? new Q(1).div(out) : out;
  }
  get value() {
    return this.n / this.d;
  }
  get isInteger() {
    return this.d === 1;
  }
  get isZero() {
    return this.n === 0;
  }
  cmp(o) {
    return Math.sign(this.sub(o).n);
  }
  equals(o) {
    return this.cmp(o) === 0;
  }
  // "3/4", "−3/4", "5"
  toString() {
    const body =
      this.d === 1 ? String(Math.abs(this.n)) : `${Math.abs(this.n)}/${this.d}`;
    return this.n < 0 ? `−${body}` : body;
  }
}

export const q = (n, d = 1) => new Q(n, d);
