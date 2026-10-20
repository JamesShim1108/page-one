# Graphs

A `graph` block draws a coordinate graph from data. Write the window, the functions, and any asymptotes or points; the site draws a sharp SVG that follows the page colors, prints cleanly, works offline, and is read aloud from its `alt` text. No image files, licenses, or screenshots are needed.

Graph blocks work anywhere other blocks do: lesson sections, question `stimulusBlocks`, free-response `stimulusBlocks`, print views, and exam stimuli.

## What readers can do

On screen, graphs in lessons, practice questions, and free-response stimuli are interactive:

- **Trace.** Hover, or slide a finger sideways, to read values along a curve: `f(1.5) = 3.375`. Curves drawn through points read with `≈`. At a hole or asymptote the readout says the function is undefined and names the open circle.
- **Zoom and move.** The + and − buttons zoom, and Reset returns to the authored window. With a mouse, drag to move the view, double-click to zoom in, and Ctrl + scroll (or a trackpad pinch) to zoom at the pointer. On a phone, drag to move after zooming in; before that, vertical swipes still scroll the page.
- **Sliders.** A graph with `sliders` redraws as each slider moves (below).
- **Keyboard.** Tab to the graph, then ← → trace, ↑ ↓ switch curves, + − zoom, 0 resets, and Esc clears the trace. The readout is announced to screen readers.

Graphs stay still where a still picture is right: print views, printed pages, and exam mode (as on the AP Exam). A graph with `tickLabels: false` also stays still, since tracing would reveal the scale the question hides. Add `interactive: false` to keep any other graph still.

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

Then run `npm run build`. The build stops with a clear message if an expression cannot be read, the curve never enters the window, or a point falls outside it. To look at every graph on one page, run `npm run graphs` and open `graph-preview/index.html` through your local server. The graphs there are live, so you can try tracing, zoom, and sliders.

## Fields

| Field         | Required | What it does                                                                                                     |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `caption`     | Yes      | Text shown under the graph and used as its accessible name.                                                      |
| `alt`         | Yes      | A sentence that describes the shape for screen readers: where it rises, falls, crosses, and levels off.          |
| `window`      | Yes      | `{ x: [min, max], y: [min, max] }`. Everything is clipped to this rectangle.                                     |
| `ticks`       | No       | A step for each axis, `{ x: 1, y: 2 }`, or a list of labeled ticks, `{ x: [{ at: 3.14159, label: "π" }] }`.      |
| `tickLabels`  | No       | `false` hides the numbers, for "no scale is indicated" questions.                                                |
| `grid`        | No       | `false` hides the grid lines.                                                                                    |
| `axisLabels`  | No       | `{ x: "t", y: "h(t)" }`. Defaults to `x` and `y`.                                                                |
| `height`      | No       | Drawing height from 160 to 520. The default is 300; the width is fixed, so a larger height makes a taller graph. |
| `functions`   | One of   | Curves from expressions (below).                                                                                 |
| `curves`      | these    | Smooth curves through listed points, for "the graph of f is shown" questions about a general function.           |
| `segments`    | four is  | Straight segments, such as secant lines: `{ from: [1, 1], to: [3, 9], dashed: true }`.                           |
| `points`      | required | Marked points: `{ at: [2, 4], open: true, label: "(2, 4)", position: "se" }`.                                    |
| `asymptotes`  | No       | Dashed lines: `{ x: 2 }`, `{ y: 1 }`, or `{ slope: 2, intercept: 0 }`.                                           |
| `sliders`     | No       | Parameters readers can change (below).                                                                           |
| `interactive` | No       | `false` keeps the graph still on screen.                                                                         |

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

### Sliders

A slider gives a one-letter name a value the reader can change. Use the name in expressions, in coordinates written as text, and in labels inside braces:

```js
{
  type: "graph",
  caption: "f(x) = x² and g(x) = f(x − h) + k",
  alt: "Two congruent parabolas. The dashed parabola g starts with vertex (3, 2).",
  window: { x: [-6, 7], y: [-4, 9] },
  sliders: [
    { name: "h", label: "Horizontal translation", min: -4, max: 4, step: 1, value: 3 },
    { name: "k", label: "Vertical translation", min: -3, max: 5, step: 1, value: 2 },
  ],
  functions: [
    { expr: "x^2", label: "f" },
    { expr: "(x - h)^2 + k", label: "g", color: 2, dashed: true },
  ],
  points: [{ at: ["h", "k"], label: "({h}, {k})" }],
}
```

- `name` is one letter other than `x`, `e`, `i`, or a function's variable. `value` is where the slider starts; `step` defaults to a twentieth of the range.
- Coordinates in `points`, `segments`, `asymptotes`, and `domain` can be text such as `"h"`, `"2/b"`, or `"1 + 3(b + 1)"`.
- Braces in a label hold any expression in the slider names: `"slope {b + 1}"`, `"({b}, {b^2})"`.
- Write the `caption` for the general case and the `alt` for the starting values. Printed copies draw the starting values and add "Shown with h = 3, k = 2."
- The build draws every slider at its minimum and maximum, so a slider range that breaks the graph is caught.

### Segment labels

Segments take `label`, `labelAt` (an x-value), and `labelPosition`, like functions: `{ from: [0, -3], to: [4, 13], label: "slope 4", labelAt: 2 }`.

## Checklist for a question graph

1. Choose the window so every feature the question asks about is visible, including both branches near an asymptote.
2. Write the `alt` text as if the reader cannot see the graph at all; it should make the question answerable.
3. Check the answer key in code from the same expression the graph draws.
4. Run `npm run build`, then `npm run graphs` to look at it.
