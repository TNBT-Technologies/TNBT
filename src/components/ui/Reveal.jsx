import { motion, stagger } from "framer-motion";
import { EASE_OUT } from "../../lib/motion";
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };

/**
 * Fades a block up into place the first time it enters the viewport.
 * MotionConfig reducedMotion="user" drops the movement and keeps the fade.
 */
export function Reveal({ as = "div", delay = 0, y = 24, className, children, ...rest }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}

const lineParent = {
  hidden: {},
  // Eased stagger: the first steps are widest and they compress, so a heading reads as one wave.
  show: ({ step, delay }) => ({ transition: { delayChildren: stagger(step, { startDelay: delay, ease: "easeOut" }) } }),
};
const lineChild = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT } },
};

/**
 * Masked word-by-word rise for headings.
 * `segments` is a string, or an array of strings / { text, em } where `em` renders in the italic serif.
 * Pass `animate="show"` to trigger on mount instead of on scroll.
 */
export function SplitReveal({ segments, as = "span", className = "", step = 0.05, delay = 0, animate, ...rest }) {
  const Component = motion[as];
  const parts = (Array.isArray(segments) ? segments : [segments]).map((s) => (typeof s === "string" ? { text: s } : s));

  const words = [];
  parts.forEach((part, pi) => {
    part.text.split(/\s+/).filter(Boolean).forEach((word, wi) => {
      words.push({ key: `${pi}-${wi}`, word, em: part.em, br: part.br && wi === 0 });
    });
  });

  return (
    <Component
      className={className}
      variants={lineParent}
      custom={{ step, delay }}
      initial="hidden"
      {...(animate ? { animate } : { whileInView: "show", viewport: VIEWPORT })}
      {...rest}
    >
      {words.map(({ key, word, em, br }, i) => (
        <span key={key}>
          {br && <br />}
          <span className="-mb-[0.14em] -mr-[0.08em] inline-block overflow-hidden pb-[0.14em] pr-[0.08em] align-bottom">
            <motion.span variants={lineChild} className={`inline-block ${em ? "font-serif font-light italic text-gradient" : ""}`}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Component>
  );
}
