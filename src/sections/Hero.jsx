import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ButtonLink } from "../components/ui/Buttons";
import { EASE_OUT, cascade } from "../lib/motion";
import { SITE } from "../data/site";

const PILLARS = [
  { n: "01", title: "Web & mobile apps", text: "Websites, web applications and Android & iOS apps." },
  { n: "02", title: "Zoho & automation", text: "Zoho solutions, custom workflows and AI integrations." },
  { n: "03", title: "Design × engineering", text: "Considered design, backed by solid engineering." },
];

const LINES = [
  { words: ["Turning", "ideas"], className: "" },
  { words: ["into", "digital"], className: "pl-[8vw] lg:pl-[13%]" },
  { words: ["experiences."], className: "", em: true },
];

/*
 * Entrance choreography (seen once per visit):
 *   Lead       headline words rise in a wave whose steps shrink (0, 110, 198, 268ms…)
 *   Support    paragraph + CTAs arrive together as one beat, with a smaller rise
 *   Decoration eyebrow, pillars and scroll cue fade in place — no movement
 */
const HEADLINE_START = 0.2;
const SUPPORT_AT = 0.62;

const rise = (delay, y = 10) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE_OUT, delay },
});
const appear = (delay) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut", delay },
});

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // As the hero scrolls away, its three lines drift apart and the copy recedes.
  const k = reduce ? 0 : 1;
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", `${-7 * k}%`]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", `${6 * k}%`]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["0%", `${-3 * k}%`]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const lineX = [x1, x2, x3];

  let wordIndex = 0;

  return (
    <section id="home" ref={ref} aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col">
      <motion.div style={{ opacity: fade }} className="container-x flex flex-1 flex-col pb-10 pt-28 sm:pt-32 lg:pb-8 lg:pt-32">
        <motion.div {...appear(0.05)} className="eyebrow flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <span className="flex items-center gap-3">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-signal" />
            </span>
            Software &amp; digital product studio
          </span>
          <span className="hidden text-dim md:inline">{SITE.locations.map((l) => l.city).join(" · ")} — India</span>
        </motion.div>

        <h1
          id="hero-title"
          className="mt-auto pt-[38svh] font-display text-[clamp(3.1rem,min(10.4vw,16.5svh),9.6rem)] font-medium leading-[0.9] tracking-[-0.05em] text-fog sm:pt-[30svh] lg:pt-12"
        >
          {LINES.map((line, li) => (
            <motion.span key={li} style={{ x: lineX[li] }} className={`block ${line.className}`}>
              {line.words.map((word, wi) => {
                const i = wordIndex++;
                return (
                  <span key={word}>
                    <span className="-mb-[0.16em] -mr-[0.1em] inline-block overflow-hidden pb-[0.16em] pr-[0.1em] align-bottom">
                      <motion.span
                        className={`inline-block ${line.em ? "font-serif font-light italic text-gradient" : ""}`}
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 1, ease: EASE_OUT, delay: HEADLINE_START + cascade(i, 0.11, 0.8) }}
                      >
                        {word}
                      </motion.span>
                    </span>
                    {wi < line.words.length - 1 ? " " : ""}
                  </span>
                );
              })}
              {li < LINES.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-12 lg:items-end">
          <motion.p {...rise(SUPPORT_AT)} className="max-w-md text-base leading-relaxed text-mist sm:text-lg lg:col-span-5">
            We design and develop powerful websites, mobile applications, and intelligent business solutions that help businesses grow.
          </motion.p>
          <motion.div {...rise(SUPPORT_AT)} className="flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-7 lg:justify-end">
            <ButtonLink href="#contact" className="w-full sm:w-auto">
              Start a Project
            </ButtonLink>
            <ButtonLink href="#services" variant="ghost" className="w-full sm:w-auto">
              Explore Our Services
            </ButtonLink>
          </motion.div>
        </div>

        <motion.ul {...appear(SUPPORT_AT + 0.25)} className="mt-12 grid grid-cols-1 border-t border-line sm:grid-cols-3 lg:mt-12" aria-label="What we do">
          {PILLARS.map((p) => (
            <li key={p.n} className="flex gap-4 border-b border-line py-5 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6">
              <span className="pt-1 font-mono text-[11px] text-signal">{p.n}</span>
              <span>
                <span className="block font-display text-lg font-medium tracking-[-0.01em] text-fog">{p.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-mist">{p.text}</span>
              </span>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.a
        href="#services"
        aria-label="Scroll to services"
        {...appear(SUPPORT_AT + 0.45)}
        className="absolute bottom-10 right-5 hidden flex-col items-center gap-3 text-dim xl:flex"
        style={{ right: "max(1.25rem, calc((100vw - 1320px) / 2 - 2.5rem))" }}
      >
        <span className="eyebrow [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative block h-14 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-signal motion-safe:animate-[scroll-cue_2.2s_cubic-bezier(0.77,0,0.175,1)_infinite]" />
        </span>
      </motion.a>
    </section>
  );
}
