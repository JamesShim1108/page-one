// Visual polish only. Nothing outside main.js imports this folder, and each effect is
// started on its own, so one failing never stops the others or the site.
import { trackScroll } from "./scroll-state.js";
import { mountNavIndicator } from "./nav-indicator.js";
import { mountSpotlight } from "./spotlight.js";

export function startPolish() {
  for (const start of [trackScroll, mountNavIndicator, mountSpotlight]) {
    try {
      start();
    } catch (error) {
      console.warn("A visual effect was skipped.", error);
    }
  }
}
