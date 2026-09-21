import { createReadingPositionStore } from "./position.js";
import { publicUrl, readingPath } from "../share/links.js";

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

function frame() {
  return new Promise((resolve) => {
    const request = globalThis.requestAnimationFrame;
    if (typeof request === "function") request(resolve);
    else setTimeout(resolve, 0);
  });
}

async function waitForLayout(surface, signal) {
  await frame();
  await frame();
  if (signal.aborted) return;
  const images = [...surface.querySelectorAll("img")].filter((image) => !image.complete);
  if (!images.length) return;
  await Promise.race([
    Promise.all(
      images.map(
        (image) =>
          new Promise((resolve) => {
            const finish = () => {
              image.removeEventListener("load", finish);
              image.removeEventListener("error", finish);
              resolve();
            };
            image.addEventListener("load", finish, { once: true });
            image.addEventListener("error", finish, { once: true });
          }),
      ),
    ),
    wait(1200),
  ]);
}

function viewportLine() {
  const height = Math.max(1, globalThis.innerHeight || 800);
  return Math.min(260, Math.max(96, height * 0.26));
}

function clampOffset(offset) {
  const height = Math.max(1, globalThis.innerHeight || 800);
  return Math.min(height, Math.max(-height, Number(offset) || 0));
}

function setStatus(element, message) {
  if (element) element.textContent = message;
}

function parentNavId(element, navIds) {
  let current = element;
  while (current && current.nodeType === 1) {
    const id = current.dataset.readingSection;
    if (id && navIds.has(id)) return id;
    current = current.parentElement;
  }
  return element?.dataset.readingSection || "";
}

function writeCanonicalLink(control) {
  const route =
    control.dataset.readingRoute ||
    control.closest(".reading-surface")?.dataset.readingRoute;
  const section = control.dataset.readingSection;
  if (!route || !section || !globalThis.location) return null;
  return publicUrl(readingPath(route, section, control.dataset.readingBlock));
}

async function copyText(value) {
  if (globalThis.navigator?.clipboard?.writeText) {
    await globalThis.navigator.clipboard.writeText(value);
    return true;
  }
  return false;
}

export function mountReadingSurface(
  root,
  {
    adapter = null,
    pageId = "",
    courseId = "",
    explicitTarget = false,
    recent = null,
    recentTarget = null,
    now = () => Date.now(),
  } = {},
) {
  const surface = root?.querySelector?.(".reading-surface");
  if (!surface || !pageId) return () => {};

  const abort = new AbortController();
  const { signal } = abort;
  const positionStore = createReadingPositionStore(adapter, pageId, courseId);
  const status = surface.querySelector("#reading-position-status");
  const sections = [...surface.querySelectorAll("[data-reading-section]")];
  const navLinks = [...surface.querySelectorAll("[data-reading-nav-link]")];
  const navIds = new Set(navLinks.map((link) => link.dataset.readingNavLink));
  const historyObject = globalThis.history;
  const previousScrollRestoration = historyObject?.scrollRestoration;
  let disposed = false;
  let restoring = !explicitTarget;
  let restoreCancelled = explicitTarget;
  let restorationScroll = false;
  let scrollTimer = null;
  let saveTimer = null;
  let lastSavedAt = 0;
  const viewStartedAt = now();

  if (historyObject && "scrollRestoration" in historyObject) {
    historyObject.scrollRestoration = "manual";
  }

  function navIdAtReadingLine() {
    const line = viewportLine();
    const containing = sections.filter((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= line && rect.bottom > line;
    });
    const candidate =
      containing.at(-1) ||
      sections.reduce((nearest, section) => {
        if (!nearest) return section;
        const distance = Math.abs(section.getBoundingClientRect().top - line);
        const nearestDistance = Math.abs(nearest.getBoundingClientRect().top - line);
        return distance < nearestDistance ? section : nearest;
      }, null);
    return candidate ? parentNavId(candidate, navIds) : "";
  }

  function updateCurrentSection() {
    const active = navIdAtReadingLine();
    for (const link of navLinks) {
      if (link.dataset.readingNavLink === active)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }

  function sectionElement(id) {
    return sections.find((section) => section.dataset.readingSection === id) || null;
  }

  function blockElement(id) {
    if (!id) return null;
    return (
      [...surface.querySelectorAll("[data-reading-block]")].find(
        (block) => block.dataset.readingBlock === id,
      ) || null
    );
  }

  function targetAtReadingLine() {
    const line = viewportLine();
    const block = [...surface.querySelectorAll("[data-reading-block]")].find(
      (candidate) => {
        const rect = candidate.getBoundingClientRect();
        return rect.top <= line && rect.bottom > line;
      },
    );
    const sectionId = block?.dataset.readingSection || navIdAtReadingLine();
    const section = sectionElement(sectionId) || sections[0] || null;
    return {
      block,
      section,
      sectionId: block?.dataset.readingSection || section?.dataset.readingSection || "",
      element: block || section,
    };
  }

  function openReadingDisclosures(ids = []) {
    const wanted = new Set(ids);
    for (const disclosure of surface.querySelectorAll("[data-reading-disclosure]")) {
      if (disclosure.classList.contains("reading-reveal")) continue;
      disclosure.open = wanted.has(disclosure.dataset.readingDisclosure);
    }
  }

  function capture() {
    if (disposed || restoring) return null;
    const target = targetAtReadingLine();
    if (!target.element || !target.sectionId) return null;
    const rect = target.element.getBoundingClientRect();
    const position = {
      pageId,
      sectionId: target.sectionId,
      blockId: target.block?.dataset.readingBlock || null,
      offset: clampOffset(rect.top - viewportLine()),
      pageRevision: surface.dataset.readingRevision || "",
      disclosures: [...surface.querySelectorAll("[data-reading-disclosure][open]")]
        .filter((disclosure) => !disclosure.classList.contains("reading-reveal"))
        .map((disclosure) => disclosure.dataset.readingDisclosure)
        .filter(Boolean)
        .slice(0, 20),
    };
    lastSavedAt = Date.now();
    positionStore.save(position).then((result) => {
      if (!result.ok) setStatus(status, "This reading position could not be saved.");
    });
    if (recent && recentTarget && now() - viewStartedAt >= 2000) {
      const params = new URLSearchParams({ section: position.sectionId });
      if (position.blockId) params.set("block", position.blockId);
      const heading = target.section?.querySelector("h1, h2, h3")?.textContent?.trim();
      const route = `${recentTarget.route.split("?")[0]}?${params}`;
      Promise.resolve(
        recent.touch({
          ...recentTarget,
          key: recentTarget.key || `${recentTarget.kind}:${pageId}`,
          route,
          title: recentTarget.title || "Reading",
          detail: heading || `Section ${position.sectionId}`,
          updatedAt: now(),
          active: true,
          status: "active",
        }),
      ).catch(() => {});
    }
    return position;
  }

  function scheduleCapture() {
    if (disposed || restoring) return;
    clearTimeout(scrollTimer);
    const elapsed = Date.now() - lastSavedAt;
    const waitForRateLimit = Math.max(0, 1000 - elapsed);
    scrollTimer = setTimeout(
      () => {
        scrollTimer = null;
        capture();
      },
      Math.max(300, waitForRateLimit),
    );
  }

  function flush() {
    if (disposed || restoring) return;
    clearTimeout(scrollTimer);
    scrollTimer = null;
    capture();
  }

  function cancelRestore() {
    if (!restoring) return;
    restoring = false;
    restoreCancelled = true;
  }

  function onScroll() {
    updateCurrentSection();
    if (restorationScroll) return;
    if (restoring) {
      cancelRestore();
      return;
    }
    scheduleCapture();
  }

  function onUserInteraction() {
    cancelRestore();
  }

  function restorePosition(position) {
    if (!position || restoreCancelled || disposed) return;
    let target = blockElement(position.blockId);
    const section = sectionElement(position.sectionId);
    if (!target && position.blockId && section) {
      setStatus(status, "That paragraph moved; showing its section.");
    }
    target ||= section;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const desired = viewportLine() + clampOffset(position.offset);
    const maximum = Math.max(
      0,
      (globalThis.document?.documentElement?.scrollHeight || 0) -
        (globalThis.innerHeight || 0),
    );
    const top = Math.min(
      maximum,
      Math.max(0, (globalThis.scrollY || 0) + rect.top - desired),
    );
    restorationScroll = true;
    globalThis.scrollTo?.({ top, left: 0, behavior: "auto" });
    openReadingDisclosures(position.disclosures);
    restoring = false;
    setTimeout(() => {
      restorationScroll = false;
      updateCurrentSection();
    }, 80);
  }

  async function restore() {
    await positionStore.ready;
    if (disposed || restoreCancelled) return;
    await waitForLayout(surface, signal);
    if (disposed || restoreCancelled) return;
    restorePosition(positionStore.position);
    if (restoring) restoring = false;
    updateCurrentSection();
  }

  async function copySection(control) {
    const value = writeCanonicalLink(control);
    if (!value) return;
    try {
      if (await copyText(value)) {
        surface
          .querySelector("[data-reading-copy-fallback]")
          ?.setAttribute("hidden", "true");
        setStatus(status, "Section link copied.");
      } else {
        showCopyFallback(value);
      }
    } catch {
      showCopyFallback(value);
    }
  }

  function showCopyFallback(value) {
    let wrapper = surface.querySelector("[data-reading-copy-fallback]");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.dataset.readingCopyFallback = "true";
      wrapper.className = "reading-copy-fallback";
      wrapper.innerHTML = '<label>Selectable link<input type="url" readonly></label>';
      surface.append(wrapper);
    }
    const input = wrapper.querySelector("input");
    input.value = value;
    wrapper.hidden = false;
    setStatus(status, "Copy was unavailable. Select this URL below.");
    input.focus({ preventScroll: true });
    input.select();
  }

  function onClick(event) {
    const control = event.target.closest?.('[data-reading-action="copy-section"]');
    if (!control || !surface.contains(control)) return;
    event.preventDefault();
    cancelRestore();
    copySection(control);
  }

  function onChange(event) {
    if (event.target.matches?.("[data-reading-preference]")) {
      cancelRestore();
      setTimeout(scheduleCapture, 0);
    }
  }

  function onResize() {
    if (!restoring) scheduleCapture();
  }

  surface.addEventListener("scroll", onScroll, { passive: true, signal });
  surface.addEventListener("click", onClick, { signal });
  surface.addEventListener("change", onChange, { signal });
  for (const eventName of ["wheel", "touchstart", "pointerdown", "keydown", "input"]) {
    surface.addEventListener(eventName, onUserInteraction, { capture: true, signal });
  }
  globalThis.addEventListener?.("scroll", onScroll, { passive: true, signal });
  globalThis.addEventListener?.("resize", onResize, { passive: true, signal });
  globalThis.addEventListener?.("pagehide", flush, { signal });
  globalThis.document?.addEventListener(
    "visibilitychange",
    () => {
      if (globalThis.document.visibilityState === "hidden") flush();
    },
    { signal },
  );
  updateCurrentSection();
  restore().catch(() => {
    restoring = false;
    updateCurrentSection();
  });

  return () => {
    if (disposed) return;
    flush();
    disposed = true;
    abort.abort();
    clearTimeout(scrollTimer);
    clearTimeout(saveTimer);
    if (historyObject && "scrollRestoration" in historyObject)
      historyObject.scrollRestoration = previousScrollRestoration || "auto";
  };
}
