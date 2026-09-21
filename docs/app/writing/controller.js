import { maxResponseLength } from "./engine.js";
import { createWritingAutosave } from "./autosave.js";
import { formatWritingExport, writingFilename } from "./export.js";
import { writingPage, wordCount, saveMessage, scoreMessage } from "./views.js";

export function createWritingController(data, store, repaint, { resume = false } = {}) {
  const { quiz } = data,
    { engine } = store,
    fields = engine.responseFields,
    composing = new Set();

  function statusElement() {
    return document.getElementById("writing-save");
  }

  function showStatus(message = saveMessage(store)) {
    const element = statusElement();
    if (element) element.textContent = message;
    const actions = document.querySelector("[data-writing-save-actions]");
    if (actions) actions.hidden = store.storageState !== "failed";
  }

  function showSaved() {
    showStatus(saveMessage(store));
  }

  function exportStatusElement() {
    return document.getElementById("writing-export-status");
  }

  function showExportStatus(message) {
    const element = exportStatusElement();
    if (element) element.textContent = message;
  }

  function exportOptions() {
    return {
      includePrompt: Boolean(
        document.querySelector('[data-writing-export-option="prompt"]')?.checked,
      ),
      includeSelfReview: Boolean(
        document.querySelector('[data-writing-export-option="review"]')?.checked,
      ),
    };
  }

  function exportText(options = exportOptions()) {
    return formatWritingExport({
      title: quiz.headline || quiz.title || "Writing response",
      promptSnapshot: store.draft.promptSnapshot,
      responses: store.draft.responses,
      reviewed: store.draft.reviewed,
      scores: store.draft.scores,
      ...options,
    });
  }

  function refreshExportPreview() {
    const preview = document.getElementById("writing-export-preview");
    if (preview) preview.value = exportText();
  }

  function updateCount(field) {
    const count = document.getElementById(`writing-${field.dataset.writingPart}-count`);
    if (count) count.textContent = `${wordCount(field.value)} words`;
  }

  function setLengthMessage(field) {
    const help = document.getElementById(`writing-${field.dataset.writingPart}-help`);
    const over = field.value.length > maxResponseLength;
    field.classList.toggle("writing-too-long", over);
    field.setCustomValidity(
      over
        ? `This response is ${field.value.length - maxResponseLength} characters over the ${maxResponseLength.toLocaleString()} character limit. Shorten it before saving.`
        : "",
    );
    if (help) {
      help.textContent = over
        ? `Too long by ${(field.value.length - maxResponseLength).toLocaleString()} characters. Shorten this response before saving.`
        : `${help.dataset.defaultText || "Your response is saved locally while you work."} Maximum ${maxResponseLength.toLocaleString()} characters; longer input is not saved until shortened.`;
    }
    return !over;
  }

  function rememberEditor(field) {
    if (!field?.dataset.writingPart || typeof field.selectionStart !== "number") return;
    store.draft.lastEditedField = field.dataset.writingPart;
    store.draft.editorPosition = {
      start: field.selectionStart,
      end:
        typeof field.selectionEnd === "number"
          ? field.selectionEnd
          : field.selectionStart,
    };
  }

  function updateField(field, shouldSave = true) {
    rememberEditor(field);
    updateCount(field);
    if (!setLengthMessage(field)) return false;
    if (!engine.updateResponse(store.draft, field.dataset.writingPart, field.value))
      return false;
    if (shouldSave) autosave.markDirty();
    return true;
  }

  const autosave = createWritingAutosave({
    save: () => store.save(),
    onDirty: () => showStatus("Changes waiting to save."),
    onStart: showSaved,
    onComplete: (_result, { stale }) => {
      if (stale) showStatus("Changes waiting to save.");
      else showSaved();
    },
  });

  function input(event) {
    const field = event.target.closest("textarea[data-writing-part]");
    if (!field) return false;
    updateField(field, !event.isComposing && !composing.has(field));
    return true;
  }

  function compositionstart(event) {
    const field = event.target.closest("textarea[data-writing-part]");
    if (!field) return false;
    composing.add(field);
    return true;
  }

  function compositionend(event) {
    const field = event.target.closest("textarea[data-writing-part]");
    if (!field) return false;
    composing.delete(field);
    updateField(field, true);
    return true;
  }

  function focusout(event) {
    const field = event.target.closest("textarea[data-writing-part]");
    if (!field) return false;
    autosave.flush();
    return true;
  }

  function focusSavedEditor() {
    const field = document.getElementById(`writing-${store.draft.lastEditedField}`);
    if (!field) return false;
    field.focus({ preventScroll: true });
    const position = store.draft.editorPosition;
    if (position && typeof field.setSelectionRange === "function") {
      const start = Math.min(position.start, field.value.length);
      const end = Math.min(Math.max(start, position.end), field.value.length);
      field.setSelectionRange(start, end);
    }
    field.scrollIntoView?.({ block: "nearest" });
    return true;
  }

  function submit(event) {
    const form = event.target.closest(".writing-form");
    if (!form) return false;
    event.preventDefault();
    for (const part of fields) {
      const field = form.elements.namedItem(part.id);
      if (!setLengthMessage(field)) {
        field.reportValidity();
        field.focus();
        return true;
      }
      if (part.required !== false && !field.value.trim()) {
        field.setCustomValidity("Write this required response before reviewing.");
        field.reportValidity();
        field.focus();
        return true;
      }
      engine.updateResponse(store.draft, part.id, field.value);
    }
    showStatus("Preparing a recovery checkpoint…");
    store
      .prepareReview()
      .then((checkpoint) => {
        if (!checkpoint?.ok) {
          showStatus(
            checkpoint?.error ||
              "Couldn't create a recovery checkpoint. Your response remains visible; copy it before trying again.",
          );
          return;
        }
        if (engine.review(store.draft)) {
          autosave.markDirty();
          autosave.flush();
          repaint();
          const panel = document.getElementById("writing-review");
          panel?.focus({ preventScroll: true });
          panel?.scrollIntoView({ block: "start" });
        }
      })
      .catch(() =>
        showStatus(
          "Couldn't create a recovery checkpoint. Your response remains visible; copy it before trying again.",
        ),
      );
    return true;
  }

  function change(event) {
    const exportOption = event.target.closest("[data-writing-export-option]");
    if (exportOption) {
      refreshExportPreview();
      return true;
    }
    const field = event.target.closest("[data-writing-score]");
    if (!field) return false;
    if (engine.setScore(store.draft, field.dataset.writingScore, Number(field.value))) {
      autosave.markDirty();
      autosave.flush();
      const score = document.getElementById("writing-score");
      if (score) score.textContent = scoreMessage(store, quiz);
    }
    return true;
  }

  function copyText(text, successMessage, statusId = "writing-save") {
    const message =
      statusId === "writing-save" ? statusElement() : document.getElementById(statusId);
    const fallback = () => {
      if (message)
        message.textContent =
          "Clipboard access is unavailable. Select and copy your visible response manually.";
    };
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      fallback();
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      if (message) message.textContent = successMessage;
    }, fallback);
  }

  function draftText() {
    return exportText({ includePrompt: false, includeSelfReview: false });
  }

  function downloadText(text) {
    if (
      typeof Blob === "undefined" ||
      typeof URL === "undefined" ||
      typeof URL.createObjectURL !== "function"
    ) {
      showExportStatus(
        "Downloads are unavailable here. Select and copy the preview instead.",
      );
      return;
    }
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = writingFilename(quiz.headline || quiz.title || "writing-response");
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    showExportStatus("Text download prepared.");
  }

  function click(event) {
    const control = event.target.closest("[data-writing-action]");
    if (!control) return false;
    if (control.dataset.writingAction === "preview-checkpoint") {
      store.previewCheckpoint(control.dataset.checkpointId);
      repaint();
      return true;
    }
    if (control.dataset.writingAction === "preview-recovery") {
      store.previewRecovery(control.dataset.recoveryId);
      repaint();
      return true;
    }
    if (control.dataset.writingAction === "close-preview") {
      store.clearPreview();
      repaint();
      return true;
    }
    if (control.dataset.writingAction === "prepare-clear") {
      store.setClearPending(true);
      repaint();
      return true;
    }
    if (control.dataset.writingAction === "cancel-clear") {
      store.setClearPending(false);
      repaint();
      return true;
    }
    if (control.dataset.writingAction === "confirm-clear") {
      showStatus("Creating a recovery checkpoint…");
      store.clearDraft().then((result) => {
        if (!result.ok) showStatus(result.error || "The draft could not be cleared.");
        repaint();
      });
      return true;
    }
    if (control.dataset.writingAction === "restore-checkpoint") {
      showStatus("Creating a safety checkpoint before restore…");
      store.restoreCheckpoint(control.dataset.checkpointId).then((result) => {
        if (result.ok) {
          repaint();
          document.getElementById("writing-history")?.focus({ preventScroll: true });
        } else showStatus(result.error || "This version could not be restored.");
      });
      return true;
    }
    if (control.dataset.writingAction === "retry-recovery") {
      showStatus("Retrying prompt recovery…");
      store.retryRecovery().then((result) => {
        if (!result.ok) showStatus(result.error || "Prompt recovery could not finish.");
        repaint();
      });
      return true;
    }
    if (control.dataset.writingAction === "use-recovery") {
      showStatus("Applying the authored compatibility mapping…");
      store.useRecovery(control.dataset.recoveryId).then((result) => {
        if (!result.ok) showStatus(result.error || "The response could not be mapped.");
        else repaint();
      });
      return true;
    }
    if (control.dataset.writingAction === "resolve-saved") {
      store.resolveSavedConflict().then(() => repaint());
      return true;
    }
    if (control.dataset.writingAction === "keep-separate") {
      showStatus(
        "Your version remains in a separate recovery copy. Use the saved version before saving this draft again.",
      );
      return true;
    }
    if (control.dataset.writingAction === "copy-conflict") {
      const payload = store.conflict?.localPayload || store.draft;
      copyText(
        JSON.stringify(payload, null, 2),
        "A copy of your visible version is on the clipboard.",
      );
      return true;
    }
    if (control.dataset.writingAction === "copy-draft") {
      copyText(draftText(), "A copy of your draft is on the clipboard.");
      return true;
    }
    if (control.dataset.writingAction === "copy-recovery") {
      const payload = store.recoveryPreview;
      if (!payload) return true;
      const snapshot = payload.promptSnapshot || {
        responseFields: Object.keys(payload.responses || {}).map((id) => ({
          id,
          label: `Part ${id}`,
        })),
      };
      const text = formatWritingExport({
        title: "Recovered writing response",
        promptSnapshot: snapshot,
        responses: payload.responses,
      });
      copyText(
        text,
        "A copy of the recovered response is on the clipboard.",
        "writing-save",
      );
      return true;
    }
    if (control.dataset.writingAction === "copy-response") {
      autosave.flush();
      copyText(exportText(), "Copied.", "writing-export-status");
      return true;
    }
    if (control.dataset.writingAction === "download-response") {
      autosave.flush();
      downloadText(exportText());
      return true;
    }
    if (control.dataset.writingAction === "retry-save") {
      autosave.markDirty();
      autosave.flush();
      return true;
    }
    if (control.dataset.writingAction === "revise") {
      showStatus("Creating a recovery checkpoint…");
      store.prepareRevision().then((checkpoint) => {
        if (!checkpoint?.ok) {
          showStatus(
            checkpoint?.error ||
              "Couldn't create a recovery checkpoint. Your reviewed response remains visible.",
          );
          return;
        }
        engine.revise(store.draft);
        autosave.markDirty();
        autosave.flush();
        repaint();
        document.getElementById(`writing-${fields[0].id}`)?.focus();
      });
    }
    return true;
  }

  return {
    page: () => writingPage(data, store),
    input,
    compositionstart,
    compositionend,
    focusout,
    submit,
    change,
    click,
    visibility: () => autosave.flush(),
    flush: () => autosave.flush(),
    resumeFocus: () => (resume ? focusSavedEditor() : false),
    destroy: () => autosave.dispose(),
  };
}
