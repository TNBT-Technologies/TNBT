/**
 * The vertex shader is generated for the number of formations on the page:
 * one vec3 attribute per formation (WebGL guarantees 8 attributes; we use count + 1).
 */
export function buildVertexShader(count) {
  if (count < 2 || count > 7) throw new Error(`Assembly supports 2–7 formations, got ${count}`);
  const last = (count - 1).toFixed(1);
  const lastSegment = (count - 2).toFixed(1);
  const attributes = Array.from({ length: count }, (_, i) => `attribute vec3 aF${i};`).join("\n");
  const branches = Array.from({ length: count - 1 }, (_, i) => `  if (i < ${i}.5) return aF${i};`);
  const picker = [...branches, `  return aF${count - 1};`].join("\n");

  return /* glsl */ `
${attributes}
attribute vec4 aSeed;

uniform float uTime;
uniform float uProgress;
uniform float uIntro;
uniform float uAngle;
uniform float uTilt;
uniform float uScale;
uniform float uAspect;
uniform float uPixelRatio;
uniform float uSize;
uniform float uMouseForce;
uniform vec2 uOffset;
uniform vec2 uMouse;
uniform float uWaveIndex;
uniform float uHelixIndex;

varying float vAlpha;
varying float vMix;

vec3 rotY(vec3 p, float a) { float c = cos(a); float s = sin(a); return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z); }
vec3 rotX(vec3 p, float a) { float c = cos(a); float s = sin(a); return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z); }

vec3 formation(float i) {
${picker}
}

void main() {
  float isStar = step(aSeed.x, -0.5);
  float live = 1.0 - isStar;
  float stagger = max(aSeed.x, 0.0);

  // Morph between neighbouring formations; each particle leaves on its own beat.
  float p = clamp(uProgress, 0.0, ${last});
  float seg = min(floor(p), ${lastSegment});
  float f = p - seg;
  float s0 = stagger * 0.4;
  float t = smoothstep(s0, s0 + 0.6, f);
  vec3 pos = mix(formation(seg), formation(seg + 1.0), t);

  // Mid-flight turbulence so the transition reads as a flow, not a lerp.
  float flight = sin(t * 3.14159265) * live;
  vec3 swirl = vec3(
    sin(aSeed.y * 40.0 + uTime * 0.7),
    cos(aSeed.z * 40.0 + uTime * 0.6),
    sin((aSeed.y + aSeed.z) * 30.0 + uTime * 0.5));
  pos += swirl * flight * 0.3;

  // Nebula breathes.
  float heroW = (1.0 - clamp(p, 0.0, 1.0)) * live;
  float n = sin(pos.x * 3.1 + uTime * 0.9) * sin(pos.y * 2.7 - uTime * 0.7) * sin(pos.z * 3.3 + uTime * 0.5);
  pos += normalize(pos + vec3(1e-4)) * n * 0.1 * heroW;

  // Wave rolls.
  float waveW = (1.0 - clamp(abs(p - uWaveIndex), 0.0, 1.0)) * live;
  pos.y += sin(pos.x * 2.0 + uTime * 0.8) * 0.07 * waveW;

  // Helix turns on its own axis.
  float helixW = (1.0 - clamp(abs(p - uHelixIndex), 0.0, 1.0)) * live;
  pos = mix(pos, rotX(pos, uTime * 0.35), helixW);

  // Idle drift.
  pos += 0.012 * vec3(sin(uTime * 0.6 + aSeed.y * 20.0), cos(uTime * 0.5 + aSeed.z * 20.0), sin(uTime * 0.4 + aSeed.w * 20.0));

  // Intro: particles gather in from deep space.
  vec3 dir = normalize(vec3(aSeed.y - 0.5, aSeed.z - 0.5, aSeed.w - 0.5) + vec3(1e-3));
  float it = smoothstep(stagger * 0.45, stagger * 0.45 + 0.55, uIntro);
  pos = mix(mix(dir * (3.5 + stagger * 3.0), pos, it), pos, isStar);

  pos *= mix(uScale, 1.0, isStar);
  pos = rotX(rotY(pos, uAngle * mix(1.0, 0.2, isStar)), uTilt * live);

  float depth = 4.2 - pos.z;
  float invDepth = 2.2 / max(depth, 0.15);
  vec2 ndc = vec2(pos.x / uAspect, pos.y) * invDepth + uOffset * live;

  // Cursor parts the particles.
  vec2 d = ndc - uMouse;
  d.x *= uAspect;
  float m = exp(-dot(d, d) * 12.0) * uMouseForce * live;
  vec2 push = normalize(d + vec2(1e-5)) * m * 0.14;
  push.x /= uAspect;
  ndc += push;

  gl_Position = vec4(ndc, 0.0, 1.0);
  gl_PointSize = clamp(uSize * (0.5 + aSeed.w) * invDepth, 0.5, 10.0) * uPixelRatio;

  float fade = smoothstep(0.3, 1.4, depth) * smoothstep(16.0, 5.0, depth);
  vAlpha = fade * (0.35 + 0.65 * aSeed.z) * mix(0.25 + 0.75 * it, 0.6 * uIntro, isStar) * (1.0 + m * 1.5);
  vMix = fract(aSeed.y * 7.31);
}
`;
}

export const FRAGMENT_SHADER = /* glsl */ `
precision mediump float;

uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uAlpha;

varying float vAlpha;
varying float vMix;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c) * 4.0;
  float a = 1.0 - smoothstep(0.3, 1.0, d);
  gl_FragColor = vec4(mix(uColorA, uColorB, vMix), a * vAlpha * uAlpha);
}
`;
