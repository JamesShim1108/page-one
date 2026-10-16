// Interactions for rendered PSAT/SAT items. State changes are plain functions,
// so they can be tested without a browser; `enhance` connects them to the DOM.
import { checkResponse } from "./engine.js";
import { itemView } from "./views.js";

export function respond(response) {
  return { response, checked: false, problem: null, result: null };
}

export function check(item, state) {
  const result = checkResponse(item, state.response);
  if (!result.answered)
    return { ...state, checked: false, problem: result.problem || null, result: null };
  return { ...state, checked: true, problem: null, result: { correct: result.correct } };
}

export function retry() {
  return { response: "", checked: false, problem: null, result: null };
}

export function createItemSet(items, { heading = "h2", numbered = false } = {}) {
  const byId = new Map(items.map((item) => [item.id, item]));
  const states = new Map(items.map((item) => [item.id, retry()]));
  const numbers = new Map(items.map((item, index) => [item.id, index + 1]));
  const render = (id) =>
    itemView(byId.get(id), states.get(id), {
      heading,
      number: numbered ? numbers.get(id) : null,
    });

  function html() {
    return items.map((item) => render(item.id)).join("");
  }

  function enhance(root) {
    const formFor = (target) => target.closest?.("form[data-tp-item]");
    const repaintItem = (form, focus) => {
      const id = form.dataset.tpItem;
      form.outerHTML = render(id);
      const next = root.querySelector(`form[data-tp-item="${CSS.escape(id)}"]`);
      next?.querySelector(focus)?.focus({ preventScroll: false });
    };
    const onChange = (event) => {
      const form = formFor(event.target);
      if (!form || !event.target.matches("[data-tp-choice]")) return;
      const id = form.dataset.tpItem;
      states.set(id, respond(event.target.value));
      repaintItem(form, `[data-tp-choice][value="${CSS.escape(event.target.value)}"]`);
    };
    // Typing keeps focus in the field: only the Check button state changes.
    const onInput = (event) => {
      const form = formFor(event.target);
      if (!form || !event.target.matches("[data-tp-entry]")) return;
      const id = form.dataset.tpItem;
      states.set(id, respond(event.target.value));
      const button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = event.target.value.trim() === "";
    };
    const onSubmit = (event) => {
      const form = formFor(event.target);
      if (!form) return;
      event.preventDefault();
      const id = form.dataset.tpItem;
      const next = check(byId.get(id), states.get(id));
      states.set(id, next);
      repaintItem(form, next.checked ? ".answer-feedback" : "[data-tp-entry]");
    };
    const onClick = (event) => {
      const button = event.target.closest?.('[data-tp-action="retry"]');
      const form = button && formFor(button);
      if (!form) return;
      states.set(form.dataset.tpItem, retry());
      repaintItem(form, "[data-tp-entry], [data-tp-choice]");
    };
    root.addEventListener("change", onChange);
    root.addEventListener("input", onInput);
    root.addEventListener("submit", onSubmit);
    root.addEventListener("click", onClick);
    return () => {
      root.removeEventListener("change", onChange);
      root.removeEventListener("input", onInput);
      root.removeEventListener("submit", onSubmit);
      root.removeEventListener("click", onClick);
    };
  }

  return { html, enhance, state: (id) => states.get(id) };
}
