import { AnimatePresence, motion, useScroll } from "framer-motion";
import { CHAPTERS } from "../../data/site";
import { useActiveChapter } from "../../lib/chapters";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Vertical chapter readout in the desktop gutter: which chapter you're in and the
 * formation the particle field has assembled into. Decorative, so hidden from AT.
 */
export default function ChapterHud() {
  const active = useActiveChapter();
  const { scrollYProgress } = useScroll();
  const chapter = CHAPTERS[active];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-8 left-4 z-40 hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-dim [writing-mode:vertical-rl] rotate-180 lg:flex xl:left-6"
    >
      <span className="text-mist">
        {pad(active + 1)} / {pad(CHAPTERS.length)}
      </span>
      <span className="relative block h-16 w-px overflow-hidden bg-line-strong">
        <motion.span className="absolute inset-0 origin-top bg-signal" style={{ scaleY: scrollYProgress }} />
      </span>
      <span className="relative block h-48 w-[14px] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={chapter.id}
            className="absolute inset-0 whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            {chapter.label} · <span className="text-signal">{chapter.formation}</span>
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
