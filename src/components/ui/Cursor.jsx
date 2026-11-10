import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useFinePointer } from "../../hooks/useMediaQuery";

const INTERACTIVE = "a, button, [role='button'], [role='tab'], label, summary";

/**
 * Desktop-only cursor: a dot that tracks the pointer exactly, and a ring that trails it
 * and morphs into a label over elements marked `data-cursor="Label"`.
 * Positions are written straight to `transform` — no React renders per frame.
 */
function CursorImpl() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    let last = 0;
    let seen = false;

    const setAttr = (name, value) => {
      dot.setAttribute(name, value);
      ring.setAttribute(name, value);
    };

    const tick = (now) => {
      const dt = Math.min(last ? (now - last) / 1000 : 0.016, 0.05);
      last = now;
      const k = 1 - Math.exp(-dt * 20);
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.1 ? requestAnimationFrame(tick) : 0;
      if (!raf) last = 0;
    };

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!seen) {
        seen = true;
        pos.x = target.x;
        pos.y = target.y;
      }
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      setAttr("data-hidden", "false");
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;
      if (el.closest("input, textarea, select, iframe")) {
        setAttr("data-mode", "text");
        return;
      }
      const labelled = el.closest("[data-cursor]");
      if (labelled) {
        label.textContent = labelled.getAttribute("data-cursor");
        setAttr("data-mode", "label");
        return;
      }
      setAttr("data-mode", el.closest(INTERACTIVE) ? "hover" : "default");
    };

    const onDown = () => ring.setAttribute("data-pressed", "true");
    const onUp = () => ring.setAttribute("data-pressed", "false");
    const onLeave = () => setAttr("data-hidden", "true");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" data-hidden="true" data-mode="default" aria-hidden="true">
        <span>
          <i ref={labelRef} />
        </span>
      </div>
      <div ref={dotRef} className="cursor-dot" data-hidden="true" data-mode="default" aria-hidden="true">
        <span />
      </div>
    </>
  );
}

export default function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  return fine && !reduce ? <CursorImpl /> : null;
}
