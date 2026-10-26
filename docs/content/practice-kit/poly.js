// Polynomials with exact fraction coefficients.

import { Q } from "./rat.js";
import { polyText, factorText, sup, num } from "./fmt.js";

export class Poly {
  // coefficients run from the constant term up.
  constructor(ascending) {
    const list = ascending.map((value) => Q.of(value));
    while (list.length > 1 && list[list.length - 1].isZero) list.pop();
    this.c = list.length ? list : [new Q(0)];
  }
  // Poly.of(2, 0, -5, 1) is 2x³ − 5x + 1.
  static of(...highToLow) {
    return new Poly([...highToLow].reverse());
  }
  // lead * (x - r1)(x - r2)...
  static fromRoots(lead, roots) {
    let out = new Poly([lead]);
    for (const root of roots) out = out.mul(new Poly([Q.of(root).neg(), 1]));
    return out;
  }
  get degree() {
    return this.c.length - 1;
  }
  get lead() {
    return this.c[this.c.length - 1];
  }
  // Exact value at a number or fraction.
  at(x) {
    const point = Q.of(x);
    return this.c.reduceRight(
      (sum, coefficient) => sum.mul(point).add(coefficient),
      new Q(0),
    );
  }
  // A plain-number function for sampling.
  fn() {
    const values = this.c.map((coefficient) => coefficient.value);
    return (x) => values.reduceRight((sum, coefficient) => sum * x + coefficient, 0);
  }
  add(other) {
    const o = other instanceof Poly ? other : new Poly([other]);
    const size = Math.max(this.c.length, o.c.length);
    return new Poly(
      Array.from({ length: size }, (_, i) =>
        (this.c[i] || new Q(0)).add(o.c[i] || new Q(0)),
      ),
    );
  }
  sub(other) {
    const o = other instanceof Poly ? other : new Poly([other]);
    return this.add(o.scale(-1));
  }
  scale(k) {
    return new Poly(this.c.map((coefficient) => coefficient.mul(k)));
  }
  mul(other) {
    const o = other instanceof Poly ? other : new Poly([other]);
    const out = Array.from({ length: this.c.length + o.c.length - 1 }, () => new Q(0));
    this.c.forEach((a, i) =>
      o.c.forEach((b, j) => (out[i + j] = out[i + j].add(a.mul(b)))),
    );
    return new Poly(out);
  }
  pow(k) {
    let out = new Poly([1]);
    for (let i = 0; i < k; i += 1) out = out.mul(this);
    return out;
  }
  // this = quotient * divisor + remainder
  divmod(divisor) {
    let remainder = new Poly(this.c);
    const quotient = Array.from(
      { length: Math.max(0, this.degree - divisor.degree + 1) },
      () => new Q(0),
    );
    while (!remainder.isZero && remainder.degree >= divisor.degree) {
      const shift = remainder.degree - divisor.degree;
      const factor = remainder.lead.div(divisor.lead);
      quotient[shift] = factor;
      remainder = remainder.sub(
        divisor.mul(new Poly([...Array(shift).fill(new Q(0)), factor])),
      );
    }
    return { quotient: new Poly(quotient), remainder };
  }
  get isZero() {
    return this.c.length === 1 && this.c[0].isZero;
  }
  derivative() {
    return new Poly(this.c.slice(1).map((coefficient, i) => coefficient.mul(i + 1)));
  }
  // "2x³ − 5x + 1"
  text(variable = "x") {
    return polyText([...this.c].reverse(), variable);
  }
}

// 2(x − 1)²(x + 3) from a lead and [[root, multiplicity], ...].
export function factoredText(lead, roots, variable = "x") {
  const l = Q.of(lead);
  const factors = roots
    .map(([root, mult]) => `${factorText(root, variable)}${mult > 1 ? sup(mult) : ""}`)
    .join("");
  if (l.equals(1)) return factors;
  if (l.equals(-1)) return `−${factors}`;
  return `${l.isInteger ? num(l) : `(${num(l)})`}${factors}`;
}
