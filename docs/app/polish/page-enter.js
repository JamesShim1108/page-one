// Plays the page-enter animation once per navigation. In-page repaints (choosing an
// answer, flipping a card, typing a draft) call repaint() again and must not animate,
// so the attribute is set here and nowhere else. The CSS lives in styles/motion.css.
let lastKey = null;
let timer = 0;

export function markPageEnter(main, route) {
  const key = location.hash || "#/";
  if (key === lastKey) return;
  lastKey = key;
  // A deep link scrolls to its target right after this runs. It only fades, so the
  // browser never measures the target while a translate is moving it.
  const deepLink = Boolean(
    route.params.get("section") || route.params.get("block") || route.params.get("row"),
  );
  main.removeAttribute("data-enter");
  void main.offsetWidth; // restart the animation if an earlier one is still running
  main.setAttribute("data-enter", deepLink ? "fade" : "rise");
  clearTimeout(timer);
  timer = setTimeout(() => main.removeAttribute("data-enter"), 1200);
}
