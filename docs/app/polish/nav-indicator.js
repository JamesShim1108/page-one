// A pill that glides behind the current navigation link. main.js still owns
// aria-current; this module only reads it, so routing is unchanged.
export function mountNavIndicator() {
  const nav = document.getElementById("site-nav");
  if (!nav) return;
  const indicator = document.createElement("span");
  indicator.className = "nav-indicator";
  indicator.setAttribute("aria-hidden", "true");
  nav.prepend(indicator);
  document.documentElement.dataset.navIndicator = "on";

  let placed = false;
  const place = () => {
    const current = nav.querySelector('a[aria-current="page"]');
    if (!current || !current.offsetWidth) {
      indicator.dataset.visible = "false";
      return;
    }
    // The first placement jumps into position; later ones glide.
    if (!placed) indicator.style.transition = "none";
    indicator.style.setProperty("--nav-x", `${current.offsetLeft}px`);
    indicator.style.setProperty("--nav-y", `${current.offsetTop}px`);
    indicator.style.setProperty("--nav-w", `${current.offsetWidth}px`);
    indicator.style.setProperty("--nav-h", `${current.offsetHeight}px`);
    indicator.dataset.visible = "true";
    if (!placed) {
      void indicator.offsetWidth;
      indicator.style.transition = "";
      placed = true;
    }
  };

  new MutationObserver(place).observe(nav, {
    attributes: true,
    attributeFilter: ["aria-current"],
    subtree: true,
  });
  window.addEventListener("resize", place);
  document.fonts?.ready.then(place);
  place();
}
