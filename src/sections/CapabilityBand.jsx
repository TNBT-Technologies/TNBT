import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const ROW_A = ["Websites", "Mobile Apps", "Web Applications", "Zoho Automation", "AI Integrations", "Research Papers"];
const ROW_B = ["Admin Dashboards", "REST APIs", "UI/UX Design", "Journals", "E-commerce", "Documentation"];

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** One line of type that drifts on its own and speeds up / flips with scroll velocity. */
function VelocityRow({ items, baseVelocity, outline = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: "200px 0px" });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2500, 2500], reduce ? [0, 0] : [-5, 5], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const sequence = (
    <span className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className={outline ? "text-outline" : "text-fog"}>{item}</span>
          <span aria-hidden="true" className="mx-[0.45em] inline-block h-[0.16em] w-[0.16em] rotate-45 bg-signal" />
        </span>
      ))}
    </span>
  );

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        style={{ x, skewX: skew }}
        className="flex w-max whitespace-nowrap font-display text-[clamp(2.6rem,8.5vw,7.5rem)] font-medium leading-[1.05] tracking-[-0.04em]"
      >
        {sequence}
        <span aria-hidden="true" className="flex">
          {sequence}
          {sequence}
          {sequence}
        </span>
      </motion.div>
    </div>
  );
}

export default function CapabilityBand() {
  return (
    <section aria-label="What we build" className="relative border-y border-line py-10 sm:py-14">
      <h2 className="sr-only">What we build</h2>
      <VelocityRow items={ROW_A} baseVelocity={-1.6} />
      <VelocityRow items={ROW_B} baseVelocity={1.6} outline />
    </section>
  );
}
