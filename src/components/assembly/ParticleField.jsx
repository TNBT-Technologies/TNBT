import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { buildFormations } from "./formations";
import { buildVertexShader, FRAGMENT_SHADER } from "./shaders";
import { getChapterProgress } from "../../lib/chapters";
import { CHAPTERS } from "../../data/site";

/**
 * "Assembly" — the site's signature background.
 * A raw-WebGL particle field that rebuilds itself for every chapter of the page
 * (idea → structure → craft → process → launch) as the visitor scrolls.
 * Chapters and their formations are defined once, in CHAPTERS (data/site.js).
 */

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

// One look per formation. `off`/`scale` are desktop values, `offM`/`scaleM` mobile.
const LOOK_BY_FORMATION = {
  Nebula: { a: "#5cf2c3", b: "#f2e6ce", off: [0.42, 0.06], offM: [0, 0.34], scale: 1, scaleM: 0.56, alpha: 1, spin: 0.09, tilt: 0.2 },
  Lattice: { a: "#6cb8ff", b: "#5cf2c3", off: [0, -0.1], offM: [0, -0.05], scale: 1.05, scaleM: 0.72, alpha: 0.42, spin: 0.035, tilt: 0 },
  Wave: { a: "#9fe6ff", b: "#5cf2c3", off: [0, -0.24], offM: [0, -0.22], scale: 1.05, scaleM: 0.72, alpha: 0.5, spin: 0.015, tilt: 0 },
  Helix: { a: "#f2e6ce", b: "#5cf2c3", off: [0, 0.3], offM: [0, 0.08], scale: 0.95, scaleM: 0.6, alpha: 0.3, spin: 0, tilt: 0 },
  Core: { a: "#5cf2c3", b: "#f2e6ce", off: [0.64, 0.42], offM: [0.1, 0.45], scale: 0.8, scaleM: 0.5, alpha: 0.8, spin: 0.1, tilt: 0.12 },
};

const FORMATIONS = CHAPTERS.map((c) => c.formation);
const LOOKS = FORMATIONS.map((name) => {
  const look = LOOK_BY_FORMATION[name];
  return { ...look, a: rgb(look.a), b: rgb(look.b) };
});
const WAVE_INDEX = FORMATIONS.indexOf("Wave");
const HELIX_INDEX = FORMATIONS.indexOf("Helix");
const VERTEX_SHADER = buildVertexShader(FORMATIONS.length);

const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const damp = (current, target, rate, dt) => current + (target - current) * (1 - Math.exp(-rate * dt));

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed: ${log}`);
  }
  return shader;
}

function createProgram(gl) {
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(`Program link failed: ${gl.getProgramInfoLog(program)}`);
  return program;
}

export default function ParticleField() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const small = window.innerWidth < 768;
    const count = small ? 2600 : window.innerWidth < 1280 ? 5000 : 6500;
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 2 : 1.75);
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const { formations, seeds } = buildFormations(FORMATIONS, count);

    let gl = null;
    let raf = 0;
    let disposed = false;
    let state = null;

    // Animated values, smoothed toward their targets every frame.
    const sim = {
      progress: getChapterProgress(),
      mouseX: 0,
      mouseY: 0,
      mouseForce: 0,
      angle: 0,
      time: 0,
      introStart: -1,
      last: 0,
      width: 0,
      height: 0,
      dirty: true,
    };
    const pointer = { x: 0, y: 0, inside: false };

    function setup() {
      gl = canvas.getContext("webgl", { alpha: true, antialias: false, depth: false, stencil: false, premultipliedAlpha: true });
      if (!gl) return false;
      const program = createProgram(gl);
      gl.useProgram(program);

      const attach = (name, data, size) => {
        const loc = gl.getAttribLocation(program, name);
        if (loc < 0) return;
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      };
      formations.forEach((data, i) => attach(`aF${i}`, data, 3));
      attach("aSeed", seeds, 4);

      const u = {};
      ["uTime", "uProgress", "uIntro", "uAngle", "uTilt", "uScale", "uAspect", "uPixelRatio", "uSize", "uMouseForce", "uOffset", "uMouse", "uColorA", "uColorB", "uAlpha", "uWaveIndex", "uHelixIndex"].forEach(
        (name) => (u[name] = gl.getUniformLocation(program, name)),
      );

      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE);
      gl.clearColor(0, 0, 0, 0);
      gl.uniform1f(u.uPixelRatio, dpr);
      gl.uniform1f(u.uSize, small ? 3.2 : 3.5);
      // Formations that don't exist on this page get an index far out of range (weight 0).
      gl.uniform1f(u.uWaveIndex, WAVE_INDEX < 0 ? -10 : WAVE_INDEX);
      gl.uniform1f(u.uHelixIndex, HELIX_INDEX < 0 ? -10 : HELIX_INDEX);
      state = { u };
      sim.dirty = true;
      return true;
    }

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      if (w === sim.width && h === sim.height) return;
      sim.width = w;
      sim.height = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
      sim.dirty = true;
    }

    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (!gl || !state) return;
      const dt = Math.min(sim.last ? (now - sim.last) / 1000 : 0.016, 0.05);
      sim.last = now;
      if (sim.introStart < 0) sim.introStart = now;

      const target = getChapterProgress();
      const before = sim.progress;
      sim.progress = damp(sim.progress, target, reduce ? 12 : 4.5, dt);
      if (Math.abs(sim.progress - target) < 1e-4) sim.progress = target;

      // In reduced motion nothing moves on its own; only redraw when scroll changes.
      if (reduce && !sim.dirty && Math.abs(before - sim.progress) < 1e-5) return;
      sim.dirty = false;

      const p = Math.min(Math.max(sim.progress, 0), LOOKS.length - 1);
      const i = Math.min(Math.floor(p), LOOKS.length - 2);
      const f = smooth(p - i);
      const A = LOOKS[i];
      const B = LOOKS[i + 1];
      const mobile = sim.width < 768;
      const heroW = Math.max(0, 1 - p);

      if (!reduce) sim.time += dt;
      sim.angle += (reduce ? 0 : lerp(A.spin, B.spin, f)) * dt;

      const mouseActive = finePointer && !reduce && pointer.inside;
      sim.mouseX = damp(sim.mouseX, pointer.x, 6, dt);
      sim.mouseY = damp(sim.mouseY, pointer.y, 6, dt);
      sim.mouseForce = damp(sim.mouseForce, mouseActive ? heroW : 0, 4, dt);

      const intro = reduce ? 1 : Math.min(1, (now - sim.introStart) / 2600);
      const introEased = 1 - Math.pow(1 - intro, 3);

      const offA = mobile ? A.offM : A.off;
      const offB = mobile ? B.offM : B.off;
      const { u } = state;
      gl.uniform1f(u.uTime, sim.time);
      gl.uniform1f(u.uProgress, p);
      gl.uniform1f(u.uIntro, introEased);
      gl.uniform1f(u.uAngle, sim.angle + sim.mouseX * 0.35 * sim.mouseForce);
      gl.uniform1f(u.uTilt, lerp(A.tilt, B.tilt, f) - sim.mouseY * 0.2 * sim.mouseForce);
      gl.uniform1f(u.uScale, lerp(mobile ? A.scaleM : A.scale, mobile ? B.scaleM : B.scale, f));
      gl.uniform1f(u.uAspect, sim.width / sim.height);
      gl.uniform1f(u.uMouseForce, sim.mouseForce);
      gl.uniform2f(u.uOffset, lerp(offA[0], offB[0], f), lerp(offA[1], offB[1], f));
      gl.uniform2f(u.uMouse, sim.mouseX, sim.mouseY);
      gl.uniform3f(u.uColorA, lerp(A.a[0], B.a[0], f), lerp(A.a[1], B.a[1], f), lerp(A.a[2], B.a[2], f));
      gl.uniform3f(u.uColorB, lerp(A.b[0], B.b[0], f), lerp(A.b[1], B.b[1], f), lerp(A.b[2], B.b[2], f));
      gl.uniform1f(u.uAlpha, lerp(A.alpha, B.alpha, f));

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, count);
    }

    const start = () => {
      if (!raf && !disposed) {
        sim.last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointerMove = (e) => {
      if (!sim.width) return;
      pointer.x = (e.clientX / sim.width) * 2 - 1;
      pointer.y = -((e.clientY / sim.height) * 2 - 1);
      pointer.inside = true;
    };
    const onPointerLeave = () => {
      pointer.inside = false;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onLost = (e) => {
      e.preventDefault();
      stop();
      state = null;
    };
    const onRestored = () => {
      try {
        if (setup()) start();
      } catch {
        /* stay on the CSS atmosphere */
      }
    };

    try {
      if (!setup()) return undefined;
    } catch (err) {
      if (import.meta.env.DEV) console.warn("[Assembly] WebGL unavailable, using CSS atmosphere only.", err);
      return undefined;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    start();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    return () => {
      disposed = true;
      stop();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-0 h-lvh w-full" />;
}
