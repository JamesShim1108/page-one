// The full-page calculator at #/calculator.
import { breadcrumbs } from "../ui.js";

export { mountCalculator } from "./app.js";

export function calculatorPage() {
  return `<div class="container calc-page">${breadcrumbs([["Home", "/"], ["Calculator"]])}
    <header class="page-intro"><p class="eyebrow">MATH TOOLS</p><h1>Calculator</h1><p>Calculate, graph, build tables, and fit regressions. History, variables, and data stay in this browser. On math pages, the Calculator button opens the same calculator beside your work.</p></header>
    <div class="calc-page-body" data-calc-page></div>
  </div>`;
}
