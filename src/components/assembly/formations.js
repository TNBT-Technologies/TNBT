/**
 * Particle formations for the "Assembly" background — one per chapter (see CHAPTERS in data/site.js).
 * Every formation is a Float32Array of n xyz points in roughly a 2-unit radius.
 * A share of points are background "stars" that stay put in every formation,
 * so the scene always keeps some depth while the rest rebuilds itself.
 */
const TAU = Math.PI * 2;

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rand) {
  const u = Math.max(rand(), 1e-6);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * rand());
}

function rotateX([x, y, z], a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [x, c * y - s * z, s * y + c * z];
}
function rotateZ([x, y, z], a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [c * x - s * y, s * x + c * y, z];
}

/* Nebula — an idea taking shape: a living sphere wrapped in a tilted ring */
function nebula(k, m, rand) {
  if (k < m * 0.72) {
    const i = k + 0.5;
    const phi = Math.acos(1 - (2 * i) / (m * 0.72));
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 1 + (rand() - 0.5) * 0.08;
    return [r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi)];
  }
  const a = rand() * TAU;
  const r = 1.5 + gaussian(rand) * 0.05;
  let p = [Math.cos(a) * r, gaussian(rand) * 0.015, Math.sin(a) * r];
  p = rotateX(p, 1.2);
  return rotateZ(p, 0.38);
}

/* Lattice — structure: a blueprint grid floor with a gentle swell */
function lattice(k, m, rand) {
  const lines = 17;
  const half = 2.3;
  const family = k % 2;
  const line = Math.floor(rand() * lines);
  const fixed = -half + (line / (lines - 1)) * half * 2;
  const along = -half + rand() * half * 2;
  const x = family ? fixed : along;
  const z = family ? along : fixed;
  const y = 0.2 * Math.sin(x * 1.3) * Math.cos(z * 1.1);
  const p = rotateX([x, y - 0.1, z], -0.95);
  return [p[0], p[1] - 0.15, p[2]];
}

/* Wave — craft: a flowing surface, like fabric catching light */
function wave(k, m, rand) {
  const cols = Math.ceil(Math.sqrt(m * 1.6));
  const rows = Math.ceil(m / cols);
  const cx = k % cols;
  const cz = Math.floor(k / cols);
  const x = -2.5 + (cx / (cols - 1)) * 5 + (rand() - 0.5) * 0.02;
  const z = -1.6 + (cz / Math.max(rows - 1, 1)) * 3.2 + (rand() - 0.5) * 0.02;
  const y = 0.24 * Math.sin(x * 1.5 + z * 0.8) + 0.12 * Math.cos(z * 2.2 - x * 0.6);
  const p = rotateX([x, y, z], -0.5);
  return [p[0], p[1] - 0.25, p[2]];
}

/* Helix — process: two strands moving forward, joined by steps */
function helix(k, m, rand) {
  const length = 5.4;
  const radius = 0.42;
  if (k < m * 0.8) {
    const strand = k % 2;
    const x = -length / 2 + rand() * length;
    const a = x * 2.3 + strand * Math.PI;
    return [x, Math.cos(a) * radius + gaussian(rand) * 0.012, Math.sin(a) * radius + gaussian(rand) * 0.012];
  }
  const steps = 22;
  const step = Math.floor(rand() * steps);
  const x = -length / 2 + ((step + 0.5) / steps) * length;
  const a = x * 2.3;
  const t = rand() * 2 - 1;
  return [x, Math.cos(a) * radius * t, Math.sin(a) * radius * t];
}

/* Core — launch: everything converges into a bright core, a disc and a beam */
function core(k, m, rand) {
  const f = k / m;
  if (f < 0.42) {
    const r = 0.48 * Math.pow(rand(), 2.2);
    const u = rand() * 2 - 1;
    const a = rand() * TAU;
    const s = Math.sqrt(1 - u * u);
    return [r * s * Math.cos(a), r * u, r * s * Math.sin(a)];
  }
  if (f < 0.82) {
    const a = rand() * TAU;
    const r = 0.65 + Math.pow(rand(), 1.6) * 1.35;
    let p = [Math.cos(a) * r, gaussian(rand) * 0.025, Math.sin(a) * r];
    p = rotateX(p, 1.28);
    return rotateZ(p, -0.2);
  }
  const dir = rand() < 0.5 ? -1 : 1;
  const y = dir * (0.45 + Math.pow(rand(), 0.8) * 1.9);
  return [gaussian(rand) * 0.025, y, gaussian(rand) * 0.025];
}

const BUILDERS = { Nebula: nebula, Lattice: lattice, Wave: wave, Helix: helix, Core: core };

/** Builds one formation per name, in the order given (the page's chapter order). */
export function buildFormations(names, n, seed = 7) {
  const rand = rng(seed);
  const starCount = Math.floor(n * 0.1);
  const m = n - starCount;

  const stars = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    stars[i * 3] = (rand() * 2 - 1) * 6.5;
    stars[i * 3 + 1] = (rand() * 2 - 1) * 4.2;
    stars[i * 3 + 2] = -1.5 - rand() * 6;
  }

  const formations = names.map((name) => {
    const build = BUILDERS[name];
    if (!build) throw new Error(`Unknown particle formation "${name}"`);
    const out = new Float32Array(n * 3);
    out.set(stars, 0);
    for (let k = 0; k < m; k++) {
      const [x, y, z] = build(k, m, rand);
      const o = (starCount + k) * 3;
      out[o] = x;
      out[o + 1] = y;
      out[o + 2] = z;
    }
    return out;
  });

  // Per-particle seeds: x = morph stagger, y/z = noise phases, w = size.
  // Stars get a negative stagger flag so the shader can treat them as fixed.
  const seeds = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    seeds[i * 4] = i < starCount ? -1 : rand();
    seeds[i * 4 + 1] = rand();
    seeds[i * 4 + 2] = rand();
    seeds[i * 4 + 3] = i < starCount ? rand() * 0.5 : rand();
  }

  return { formations, seeds };
}
