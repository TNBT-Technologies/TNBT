/** Motion tokens shared by JS animations — mirrors the CSS --ease-* variables. */
export const EASE_OUT = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT = [0.77, 0, 0.175, 1];
export const EASE_DRAWER = [0.32, 0.72, 0, 1];

/**
 * Delay for the i-th item of a group entrance. Steps shrink as the group goes on
 * (80ms, 58ms, 41ms…), so it reads as a wave rather than a metronome.
 */
export const cascade = (i, first = 0.08, decay = 0.72) => (first * (1 - decay ** i)) / (1 - decay);
