# Graphs

A `graph` block draws a coordinate graph from data. Write the window, the functions, and any asymptotes or points; the site draws a sharp SVG that follows the page colors, prints cleanly, works offline, and is read aloud from its `alt` text. No image files, licenses, or screenshots are needed.

Graph blocks work anywhere other blocks do: lesson sections, question `stimulusBlocks`, free-response `stimulusBlocks`, print views, and exam stimuli.

## Quick start

Paste this into a lesson section's `blocks` or a question's `stimulusBlocks` and edit it:

```js
{
  type: "graph",
  caption: "Graph of r(x) = (x + 1)/(x − 3)",
  alt: "A two-branch curve with a vertical asymptote at x = 3 and a horizontal asymptote at y = 1.",
  window: { x: [-6, 12], y: [-8, 10] },
  ticks: { x: 2, y: 2 },
  functions: [{ expr: "(x + 1)/(x - 3)", label: "r" }],
  asymptotes: [{ x: 3 }, { y: 1 }],
}
```

Then run `npm run build`. The build stops with a clear message if an expression cannot be read, the curve never enters the window, or a point falls outside it. To look at every graph on one page, run `npm run graphs` and open `graph-preview/index.html` through your local server.

## Fields

| Field        | Required | What it does                                                                                                     |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `caption`    | Yes      | Text shown under the graph and used as its accessible name.                                                      |
| `alt`        | Yes      | A sentence that describes the shape for screen readers: where it rises, falls, crosses, and levels off.          |
| `window`     | Yes      | `{ x: [min, max], y: [min, max] }`. Everything is clipped to this rectangle.                                     |
| `ticks`      | No       | A step for each axis, `{ x: 1, y: 2 }`, or a list of labeled ticks, `{ x: [{ at: 3.14159, label: "π" }] }`.      |
| `tickLabels` | No       | `false` hides the numbers, for "no scale is indicated" questions.                                                |
| `grid`       | No       | `false` hides the grid lines.                                                                                    |
| `axisLabels` | No       | `{ x: "t", y: "h(t)" }`. Defaults to `x` and `y`.                                                                |
| `height`     | No       | Drawing height from 160 to 520. The default is 300; the width is fixed, so a larger height makes a taller graph. |
| `functions`  | One of   | Curves from expressions (below).                                                                                 |
| `curves`     | these    | Smooth curves through listed points, for "the graph of f is shown" questions about a general function.           |
| `segments`   | four is  | Straight segments, such as secant lines: `{ from: [1, 1], to: [3, 9], dashed: true }`.                           |
| `points`     | required | Marked points: `{ at: [2, 4], open: true, label: "(2, 4)", position: "se" }`.                                    |
| `asymptotes` | No       | Dashed lines: `{ x: 2 }`, `{ y: 1 }`, or `{ slope: 2, intercept: 0 }`.                                           |

### Functions

```js
{ expr: "x^3 - 3x", domain: [-2, 2], endpoints: ["closed", "open"], label: "f", labelAt: 1.5, labelPosition: "ne", dashed: false, color: 1, variable: "x" }
```

- `expr` is the only required field. Use `variable: "t"` when the expression is written in t.
- `domain` limits the curve, which is how piecewise-defined functions are drawn: one entry per piece.
- `endpoints` puts a closed or open circle at each end of the domain. Use `null` for no marker.
- `label` names the curve on the graph. It is placed near `labelAt` (an x-value), or near the right end of the visible part if `labelAt` is left out. `labelPosition` is one of `n`, `s`, `e`, `w`, `ne`, `nw`, `se`, `sw`.
- `color` is 1 (green, the default), 2 (amber), 3 (red), or 4 (teal). Use `dashed: true` as well when two curves must be told apart in print or by color-blind readers.

Curves are split automatically at vertical asymptotes and wherever the expression is undefined, so `1/(x − 2)` draws as two branches. A hole is undefined at one input, so mark it with an open point: `points: [{ at: [2, 4], open: true }]`.

### Writing expressions

Expressions are parsed by `docs/app/graph/expression.js`, never evaluated as code.

- Operators: `+`, `-` or `−`, `*`, `·`, `×`, `/`, `^`, and parentheses. Superscripts work: `x²` is `x^2`.
- Implicit multiplication: `2x`, `3(x + 1)`, `x(x − 2)`, `(x + 1)(x − 1)`, `2pi`.
- `−x^2` means `−(x^2)`, as in algebra. Write `1/(2x)` when all of `2x` is the denominator.
- Functions: `sin cos tan sec csc cot asin acos atan sqrt cbrt abs ln log log2 exp`, and `√(...)`. Functions need parentheses: `sin(x)`.
- Constants: `pi`, `π`, and `e`. Odd roots of negatives are real: `x^(1/3)` at −8 is −2.

### Curves through points

```js
curves: [
  {
    through: [
      [0, 2],
      [3, 4],
      [6, 6],
      [9, 2],
    ],
    label: "W",
  },
];
```

The curve passes through every listed point and never overshoots between them, so a peak placed at a point stays the peak there. When a question depends on exact concavity or an exact inflection point, use a `functions` expression instead, so the answer key can be checked in code.

## Checklist for a question graph

1. Choose the window so every feature the question asks about is visible, including both branches near an asymptote.
2. Write the `alt` text as if the reader cannot see the graph at all; it should make the question answerable.
3. Check the answer key in code from the same expression the graph draws.
4. Run `npm run build`, then `npm run graphs` to look at it.
