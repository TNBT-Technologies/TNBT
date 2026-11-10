let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};
export const getLenis = () => lenis;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scrolls to an absolute page position, with Lenis when it's running. */
export function scrollToY(y, { immediate = false } = {}) {
  const top = Math.max(0, Math.round(y));
  const instant = immediate || reducedMotion();
  if (lenis) lenis.scrollTo(top, { immediate: instant, duration: 1.2 });
  else window.scrollTo({ top, behavior: instant ? "auto" : "smooth" });
}

/**
 * Scrolls to an element by id ("home"/"top" scrolls to the very top).
 * Sections land flush with the top of the viewport; pass a negative `offset`
 * to leave room for the fixed navigation (e.g. when targeting a row inside a section).
 */
export function scrollToSection(id, { updateHash = true, immediate = false, offset = 0 } = {}) {
  const toTop = id === "home" || id === "top";
  const el = toTop ? null : document.getElementById(id);
  if (!toTop && !el) return false;

  // An explicit pixel target (rather than the element) keeps Lenis from subtracting the root
  // scroll-padding, which exists so keyboard focus never hides under the fixed nav.
  const top = toTop ? 0 : el.getBoundingClientRect().top + window.scrollY + offset;
  scrollToY(top, { immediate });

  if (updateHash) {
    const url = toTop ? window.location.pathname + window.location.search : `#${id}`;
    window.history.replaceState(null, "", url);
  }
  return true;
}

/** Locks page scrolling (e.g. while the mobile menu is open). */
export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
