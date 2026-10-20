# Math tools

Math courses (AP Precalculus and Advanced Algebra 2) and PSAT/SAT practice get two tools:

- **Calculator.** A Calculator button sits at the bottom right of every page in those courses. It opens a panel that stays open while you move between pages, so you can work a problem beside a lesson, quiz, or free-response question. On wide screens, drag the panel by its title bar; on phones it opens from the bottom. The full page is at `#/calculator`, and the SAT math module bar has its own Calculator button.
- **Math keys.** Free-response answer boxes in math courses have a **∑ Math keys** button that opens a strip of math keys at the bottom of the screen, and they accept typing shortcuts.

## Calculator

Four views share one memory:

| View      | What it does                                                                                                                                                                                                                                               |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Calculate | Type an expression and press Enter. History stays in the list: click an expression to edit it again, or a result to insert it. ↑ and ↓ recall earlier lines. Results show an exact form when there is one: `= 1/3`, `= π/6`, `= √3/2`.                     |
| Graph     | Six functions y1–y6 with trace, zoom, and drag from the interactive graphs. Window presets: Standard, Fit y, Trig, Data. Analyze finds zeros, relative minimums and maximums, intersections, and values, in the current window.                            |
| Table     | Values of every entered function from a start x by a step Δx, 20 rows at a time.                                                                                                                                                                           |
| Stats     | Paste x, y pairs (or two spreadsheet columns). Shows one-variable statistics and fits linear, quadratic, cubic, quartic, exponential, logarithmic, power, and sinusoidal regressions with r², residuals, and a button that graphs the model with the data. |

The ⚙︎ button sets radians or degrees, complex results (a + bi), decimal places, and exact forms, and clears history or memory.

### What it understands

| Kind                | Examples                                                                                                                                                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arithmetic          | `2(3 + 4)`, `−2²` (−4), `2^-1`, `5!`, `12%`, `2.5E3`, `abs(−3)` or bars around −3, `√(2)`, `∛(−8)`, `root(16, 4)`                                                      |
| Functions           | `sin cos tan sec csc cot`, `sin⁻¹(x)` or `sin^-1(x)`, `sinh`, `ln`, `log(x)`, `log(8, 2)`, `log₂(8)`, `log_3(81)`, `exp`, `floor ceil round(x, 2) mod gcd lcm nCr nPr` |
| Angles              | Follow the angle mode; `30°` is degrees in either mode. `sin(π)` is exactly 0 and `tan(90°)` is an error.                                                              |
| Memory              | `A = 5` or `5 → A`; `f(x) = x² − 3x` then `f(2)`; `Ans`; `y1(3)` uses a graph slot; `L1` and `L2` are the Stats columns                                                |
| Lists               | `{1, 2, 3}·2`, `mean`, `median`, `stdDev` (sample), `stdDevP`, `sum`, `min`, `max`, `sort`, `seq(2^n, n, 0, 5)`                                                        |
| Advanced            | `Σ(k², k, 1, 10)`, `solve(x² = 2, x, 1)` (guess) or `solve(…, x, 0, 5)` (range), `nDeriv(x³, x, 2)`, `fnInt(x², x, 0, 3)`, `polyRoots(1, 0, 1)`                        |
| Complex (a + bi on) | `√(−4)`, `i²`, `e^(iπ)`, `(1 + 2i)(3 − i)`, `abs`, `conj`, `angle`                                                                                                     |

When an input could be read two ways, the result says how it was read. `1/2x` is `(1/2)·x`, as on most graphing calculators, so the line shows "Read as 1/2·x".

Calculator history, memory, graph slots, and data are saved in this browser's local storage. Settings → "Clear all Page One private work" clears them too.

## Math keys and typing shortcuts

The keys insert symbols at the caret and keep the caret where you were typing, so the phone keyboard stays open. Groups: Symbols (², ³, ⁻¹, √, π, θ, ≤, ≥, ≠, ≈, ±, ∞, →, °, Δ, |x|, ∪), Functions (sin through cot, inverses, ln, log, logₐ, eˣ, f(x), f⁻¹(x), aₙ, Σ), Exponents (superscripts and subscripts), and Greek. Select text, then press √ or |x| to wrap it.

Typing shortcuts work in any field marked as a math field:

| Type                                  | Get               |
| ------------------------------------- | ----------------- |
| `x^2`, `x^-1`, `x^n`                  | `x²`, `x⁻¹`, `xⁿ` |
| `<=`, `>=`, `!=`                      | `≤`, `≥`, `≠`     |
| `+-`, `->`, `~=`                      | `±`, `→`, `≈`     |
| `pi`, `theta`, `inf` (as whole words) | `π`, `θ`, `∞`     |
| `sqrt(`, `cbrt(`                      | `√(`, `∛(`        |

Backspace right after a shortcut puts back what you typed. The "Typing shortcuts" box in the key strip turns them off.

## For authors and developers

- A course gets the tools when its ID is in `MATH_COURSE_IDS` in `docs/app/math/courses.js`.
- Any `<textarea>` or `<input>` with `data-math-input` gets the typing shortcuts. Put `mathKeysToggle(fieldId)` from `docs/app/mathkeys/keys.js` beside it to add the key strip.
- Any button with `data-open-calculator` opens the calculator panel.
- The engine (`docs/app/math/engine.js`) never uses `eval`. Numerical methods and regressions are in `docs/app/math/numeric.js`; display rules are in `docs/app/math/format.js`. `tests/math.test.mjs` checks results against known values.

| Area                           | Files                  |
| ------------------------------ | ---------------------- |
| Expression engine and numerics | `docs/app/math/`       |
| Calculator views, panel, page  | `docs/app/calculator/` |
| Math keys and shortcuts        | `docs/app/mathkeys/`   |
| Styles                         | `docs/styles/math.css` |
