// Link cards get a soft highlight that follows the pointer. Pointer-only: touch and
// reduced-motion visitors never run this.
const CARDS = ".study-mode:not(.study-mode--soon), .term-set-card";

export function mountSpotlight() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canHover || calm) return;

  let frame = 0;
  let latest = null;
  document.addEventListener(
    "pointermove",
    (event) => {
      const card = event.target.closest?.(CARDS);
      if (!card) return;
      latest = { card, x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = latest.card.getBoundingClientRect();
        latest.card.style.setProperty("--spot-x", `${latest.x - box.left}px`);
        latest.card.style.setProperty("--spot-y", `${latest.y - box.top}px`);
      });
    },
    { passive: true },
  );
}
