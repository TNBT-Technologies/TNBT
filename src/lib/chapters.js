import { useSyncExternalStore } from "react";
import { CHAPTERS } from "../data/site";

/**
 * Tracks where the reader is across the page's chapters.
 *  - `getChapterProgress()` is continuous (0 → CHAPTERS.length - 1) and drives the particle morphs.
 *  - `useActiveChapter()` is the discrete chapter index for nav, HUD and atmosphere.
 */
let tops = [];
let active = 0;
const listeners = new Set();

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

function measure() {
  const y = window.scrollY;
  tops = CHAPTERS.map(({ id }) => {
    const el = document.getElementById(id);
    return el ? el.getBoundingClientRect().top + y : Number.POSITIVE_INFINITY;
  });
}

export function getChapterProgress() {
  if (!tops.length) return 0;
  const vh = window.innerHeight;
  const probe = window.scrollY + vh * 0.55;
  const span = vh * 0.75;
  let p = 0;
  for (let i = 1; i < tops.length; i++) p += clamp01((probe - (tops[i] - span * 0.5)) / span);
  return p;
}

function updateActive() {
  const probe = window.scrollY + window.innerHeight * 0.42;
  let next = 0;
  for (let i = 0; i < tops.length; i++) if (probe >= tops[i]) next = i;
  if (next !== active) {
    active = next;
    listeners.forEach((l) => l());
  }
}

export function initChapters() {
  const refresh = () => {
    measure();
    updateActive();
  };
  refresh();
  window.addEventListener("scroll", updateActive, { passive: true });
  window.addEventListener("resize", refresh);
  const ro = new ResizeObserver(refresh);
  ro.observe(document.body);
  return () => {
    window.removeEventListener("scroll", updateActive);
    window.removeEventListener("resize", refresh);
    ro.disconnect();
  };
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useActiveChapter() {
  return useSyncExternalStore(subscribe, () => active, () => 0);
}
