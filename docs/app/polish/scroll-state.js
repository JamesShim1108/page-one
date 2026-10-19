// Marks the page as scrolled so the floating header can lift off the content.
export function trackScroll(root = document.documentElement) {
  let frame = 0;
  const update = () => {
    frame = 0;
    root.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
  };
  update();
  window.addEventListener(
    "scroll",
    () => {
      if (!frame) frame = requestAnimationFrame(update);
    },
    { passive: true },
  );
}
