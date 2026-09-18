// Keep the explanation near its word without going off a narrow screen.
export function placePopover(anchor, panel, viewport, padding = 12, gap = 10) {
  const left = Math.max(
    padding,
    Math.min(anchor.left, viewport.width - panel.width - padding),
  );
  const below = anchor.bottom + gap;
  const above = anchor.top - panel.height - gap;
  const preferred = below + panel.height <= viewport.height - padding ? below : above;
  const top = Math.max(
    padding,
    Math.min(preferred, viewport.height - panel.height - padding),
  );
  return { left, top };
}
