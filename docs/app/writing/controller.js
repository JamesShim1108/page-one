import { writingPage, wordCount, saveMessage, scoreMessage } from "./views.js";

export function createWritingController(data, store, repaint) {
  const { quiz } = data,
    { engine } = store,
    fields = engine.responseFields;
  function showSaved() {
    document.getElementById("writing-save").textContent = saveMessage(store);
  }

  function input(event) {
    const field = event.target.closest("textarea[data-writing-part]");
    if (!field) return false;
    if (engine.updateResponse(store.draft, field.dataset.writingPart, field.value)) {
      field.setCustomValidity("");
      store.save();
      showSaved();
      document.getElementById(`writing-${field.dataset.writingPart}-count`).textContent =
        `${wordCount(field.value)} words`;
    }
    return true;
  }

  function submit(event) {
    const form = event.target.closest(".writing-form");
    if (!form) return false;
    event.preventDefault();
    for (const part of fields) {
      const field = form.elements.namedItem(part.id);
      if (part.required !== false && !field.value.trim()) {
        field.setCustomValidity("Write this required response before reviewing.");
        field.reportValidity();
        field.focus();
        return true;
      }
      engine.updateResponse(store.draft, part.id, field.value);
    }
    if (engine.review(store.draft)) {
      store.save();
      repaint();
      const panel = document.getElementById("writing-review");
      panel.focus({ preventScroll: true });
      panel.scrollIntoView({ block: "start" });
    }
    return true;
  }

  function change(event) {
    const field = event.target.closest("[data-writing-score]");
    if (!field) return false;
    if (engine.setScore(store.draft, field.dataset.writingScore, Number(field.value))) {
      store.save();
      showSaved();
      document.getElementById("writing-score").textContent = scoreMessage(store, quiz);
    }
    return true;
  }

  function click(event) {
    const control = event.target.closest("[data-writing-action]");
    if (!control) return false;
    if (control.dataset.writingAction === "revise") {
      engine.revise(store.draft);
      store.save();
      repaint();
      document.getElementById(`writing-${fields[0].id}`).focus();
    }
    return true;
  }
  return { page: () => writingPage(data, store), input, submit, change, click };
}
