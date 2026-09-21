import { escapeHtml as esc } from "../ui.js";
import { publicUrl } from "./links.js";
import { qrSvg } from "./qr.js";

function panelFor(control) {
  return control.closest?.("[data-share-path]") || control;
}

function shareUrl(panel) {
  return publicUrl(panel.dataset.sharePath || panel.dataset.shareUrl || "/");
}

function statusFor(panel) {
  return panel.querySelector("[data-share-status]");
}

function fallbackInput(panel, url) {
  let wrapper = panel.querySelector("[data-share-fallback]");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.dataset.shareFallback = "true";
    wrapper.className = "share-fallback";
    wrapper.innerHTML = '<label>Selectable link<input type="url" readonly></label>';
    panel.append(wrapper);
  }
  const input = wrapper.querySelector("input");
  input.value = url;
  wrapper.hidden = false;
  input.focus({ preventScroll: true });
  input.select();
}

async function copyUrl(panel, url) {
  const status = statusFor(panel);
  try {
    if (globalThis.navigator?.clipboard?.writeText) {
      await globalThis.navigator.clipboard.writeText(url);
      if (status) status.textContent = "Link copied.";
      panel.querySelector("[data-share-fallback]")?.setAttribute("hidden", "true");
      return;
    }
  } catch {
    // Fall through to a selectable URL without claiming success.
  }
  if (status) status.textContent = "Copy was unavailable. Select this URL below.";
  fallbackInput(panel, url);
}

function renderQr(panel, url) {
  const target = panel.querySelector("[data-share-qr]");
  if (!target) return;
  const title = panel.dataset.shareTitle || "Page One activity";
  const result = qrSvg(url, { title: `${title} QR code` });
  target.hidden = false;
  if (!result.ok) {
    target.innerHTML = `<p class="share-qr__unavailable">This link is too long for a local QR code. Use Copy link instead.</p><button type="button" class="btn secondary" data-share-action="copy">Copy link</button>`;
    return;
  }
  target.innerHTML = `<div class="share-qr__head"><h3>Scan to open this activity</h3><button type="button" class="text-button" data-share-action="qr-close">Hide QR code</button></div><div class="share-qr__image">${result.svg}</div><label>Link<input type="url" readonly value="${esc(url)}"></label><div class="share-qr__actions"><button type="button" class="btn secondary" data-share-action="qr-download">Download QR</button><button type="button" class="btn secondary" data-share-action="qr-print">Print QR</button><button type="button" class="btn secondary" data-share-action="copy">Copy link</button></div>`;
}

function downloadQr(panel) {
  const svg = panel.querySelector("[data-share-qr] svg");
  const status = statusFor(panel);
  if (!svg || typeof Blob === "undefined" || typeof URL?.createObjectURL !== "function") {
    if (status) status.textContent = "Downloads are unavailable. Use Copy link instead.";
    return;
  }
  const blob = new Blob([svg.outerHTML], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "page-one-qr.svg";
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  if (status) status.textContent = "QR download prepared.";
}

export function createShareController() {
  return {
    enhance() {
      for (const button of document.querySelectorAll('[data-share-action="native"]'))
        button.hidden = typeof globalThis.navigator?.share !== "function";
      return () => {};
    },
    click(event) {
      const control = event.target.closest?.("[data-share-action]");
      if (!control) return false;
      const panel = panelFor(control);
      const url = shareUrl(panel);
      const title = panel.dataset.shareTitle || "Page One activity";
      const action = control.dataset.shareAction;
      if (action === "copy") {
        copyUrl(panel, url);
        return true;
      }
      if (action === "native") {
        if (typeof globalThis.navigator?.share !== "function") return true;
        globalThis.navigator.share({ title, url }).catch((error) => {
          if (error?.name === "AbortError") return;
          const status = statusFor(panel);
          if (status) status.textContent = "Sharing was unavailable.";
        });
        return true;
      }
      if (action === "qr") {
        renderQr(panel, url);
        return true;
      }
      if (action === "qr-close") {
        const target = panel.querySelector("[data-share-qr]");
        if (target) target.hidden = true;
        return true;
      }
      if (action === "qr-download") {
        downloadQr(panel);
        return true;
      }
      if (action === "qr-print") {
        const target = panel.querySelector("[data-share-qr]");
        if (target) {
          target.classList.add("is-printing");
          globalThis.print?.();
          target.classList.remove("is-printing");
        }
        return true;
      }
      return false;
    },
  };
}
