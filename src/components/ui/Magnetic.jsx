import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "../../hooks/useMediaQuery";

const SPRING = { stiffness: 200, damping: 16, mass: 0.5 };

/** Pulls its child gently toward the cursor. Mouse/trackpad only, off for reduced motion. */
export default function Magnetic({ children, strength = 0.28, className = "" }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const enabled = fine && !reduce;

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-flex ${className}`}
      style={enabled ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
