import { useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Check, Code2, Map as MapIcon, PenTool, Rocket, Search, ShieldCheck } from "lucide-react";
import SectionHeading, { Eyebrow } from "../components/ui/SectionHeading";
import { Reveal, SplitReveal } from "../components/ui/Reveal";
import { ButtonLink } from "../components/ui/Buttons";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { PROCESS_STEPS } from "../data/process";
import { scrollToY } from "../lib/scroll";
import { EASE_OUT } from "../lib/motion";

const N = PROCESS_STEPS.length;
const pad = (n) => String(n).padStart(2, "0");
const ICONS = { discover: Search, plan: MapIcon, design: PenTool, develop: Code2, test: ShieldCheck, deliver: Rocket };
const TITLE = ["From first idea to", { text: "launch day.", em: true }];
const INTRO = "Six clear stages, the same on every project — so you always know what's happening and what comes next.";

function StepIcon({ id, active = true }) {
  const Icon = ICONS[id];
  return (
    <span
      aria-hidden="true"
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-[border-color,background-color,color] duration-500 ${
        active ? "border-signal/50 bg-signal/10 text-signal" : "border-line-strong bg-ink text-mist"
      }`}
    >
      {Icon && <Icon size={18} strokeWidth={1.75} />}
    </span>
  );
}

function Deliverable({ output }) {
  return (
    <p className="flex items-start gap-3 rounded-2xl border border-line bg-ink/60 px-4 py-3.5">
      <Check size={16} strokeWidth={2.25} aria-hidden="true" className="mt-0.5 shrink-0 text-signal" />
      <span>
        <span className="eyebrow block text-signal">You get</span>
        <span className="mt-1.5 block text-sm leading-snug text-fog/90">{output}</span>
      </span>
    </p>
  );
}

function NextStepCard({ className = "" }) {
  return (
    <div
      data-cta-zone
      className={`relative flex flex-col overflow-hidden rounded-[28px] border border-signal/30 bg-ink-2 bg-[radial-gradient(120%_80%_at_0%_0%,rgb(92_242_195/0.16),transparent_60%)] p-7 xl:p-9 ${className}`}
    >
      <p className="eyebrow text-signal">Your turn</p>
      <h3 className="mt-5 font-display text-[clamp(2rem,2.8vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.035em] text-fog">
        Ready for step <em className="font-serif font-light italic text-gradient">01?</em>
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-mist">
        Tell us what you&apos;re planning and we&apos;ll take it from discovery all the way to delivery.
      </p>
      <div className="mt-auto pt-8">
        <ButtonLink href="#contact">Start a project</ButtonLink>
      </div>
    </div>
  );
}

/** Big "05 / 06" readout. The digits roll in the direction the reader is moving. */
function StageCounter({ current, direction }) {
  const step = PROCESS_STEPS[current];
  return (
    <div aria-hidden="true" className="hidden shrink-0 text-right lg:block">
      <div className="flex items-baseline justify-end gap-2 font-display font-medium tracking-[-0.05em]">
        <span className="relative inline-block h-[0.86em] overflow-hidden text-[clamp(3.5rem,5.5vw,5.75rem)] leading-[0.86]">
          {/* invisible copy reserves the width */}
          <span className="invisible">{pad(current + 1)}</span>
          <AnimatePresence initial={false} custom={direction}>
            <motion.span
              key={current}
              custom={direction}
              className="text-gradient absolute inset-0"
              variants={{
                enter: (d) => ({ y: d > 0 ? "100%" : "-100%" }),
                center: { y: "0%" },
                exit: (d) => ({ y: d > 0 ? "-100%" : "100%" }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              {pad(current + 1)}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="text-2xl text-dim">/ {pad(N)}</span>
      </div>
      <p className="eyebrow mt-3 text-fog">{step.title}</p>
    </div>
  );
}

/** Desktop: the section pins and the stages travel horizontally as you scroll. */
function PinnedProcess() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [height, setHeight] = useState(null);
  const [stage, setStage] = useState({ index: 0, direction: 1 });
  const current = stage.index;
  const distance = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const travel = Math.max(0, track.scrollWidth - window.innerWidth);
      distance.set(travel);
      setHeight(travel + window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance]);

  // Stage n takes focus at progress n / (N - 1), so the stepper fill reaches each node
  // exactly as its card lights up, and the last stage is reached before the pin releases.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.round(Math.min(Math.max(p, 0), 1) * (N - 1));
    setStage((prev) => (next === prev.index ? prev : { index: next, direction: next > prev.index ? 1 : -1 }));
  });

  const goToStep = (i) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + (i / (N - 1)) * (section.offsetHeight - window.innerHeight));
  };

  return (
    <section id="process" ref={sectionRef} aria-labelledby="process-title" className="relative" style={{ height: height ?? "300vh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="container-x pt-24 xl:pt-28 [@media(max-height:879px)]:pt-20">
          <div className="flex items-end justify-between gap-10">
            <div className="min-w-0">
              <Eyebrow index="04" label="Process" />
              <SplitReveal
                as="h2"
                id="process-title"
                segments={TITLE}
                className="mt-5 font-display text-[clamp(2.2rem,4.2vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-fog"
              />
              <Reveal as="p" delay={0.15} className="mt-4 max-w-xl text-base leading-relaxed text-mist [@media(max-height:879px)]:mt-3 [@media(max-height:879px)]:text-[15px]">
                {INTRO}
              </Reveal>
            </div>
            <StageCounter current={current} direction={stage.direction} />
          </div>

          {/* Stepper: nodes sit on the line; each label jumps straight to its stage. */}
          <nav aria-label="Process stages" className="mt-8 xl:mt-10 [@media(max-height:879px)]:mt-6">
            <ol className="relative grid grid-cols-6">
              <span aria-hidden="true" className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-[5px] h-px bg-line-strong">
                <motion.span className="absolute inset-0 origin-left bg-signal" style={{ scaleX: scrollYProgress }} />
              </span>
              {PROCESS_STEPS.map((step, i) => {
                const reached = i <= current;
                return (
                  <li key={step.id} className="relative flex justify-center">
                    <button
                      type="button"
                      onClick={() => goToStep(i)}
                      aria-current={i === current ? "step" : undefined}
                      className="group flex flex-col items-center gap-3 rounded-xl px-2 pb-1 outline-offset-2"
                    >
                      <span
                        aria-hidden="true"
                        className={`relative z-10 h-[11px] w-[11px] rounded-full border transition-[background-color,border-color,box-shadow] duration-300 ${
                          reached ? "border-signal bg-signal" : "border-line-strong bg-ink group-hover:border-mist"
                        } ${i === current ? "shadow-[0_0_0_5px_rgb(92_242_195/0.18)]" : ""}`}
                      />
                      <span
                        className={`whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                          i === current ? "text-fog" : reached ? "text-mist" : "text-dim group-hover:text-mist"
                        }`}
                      >
                        <span className={reached ? "text-signal" : ""}>{pad(i + 1)}</span> {step.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        <div className="mt-auto pb-10 pt-8 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)] xl:pb-12 [@media(max-height:879px)]:pb-6 [@media(max-height:879px)]:pt-6">
          <motion.ol ref={trackRef} style={{ x }} className="flex w-max items-stretch pl-[max(3rem,calc((100vw-1320px)/2+3rem))] pr-[12vw]">
            {PROCESS_STEPS.map((step, i) => {
              const active = i === current;
              return [
                <li
                  key={step.id}
                  aria-current={active ? "step" : undefined}
                  className={`relative flex w-[clamp(320px,29vw,430px)] shrink-0 flex-col overflow-hidden rounded-[28px] border bg-ink-2 p-7 transition-[border-color,opacity] duration-500 ease-out xl:p-9 [@media(max-height:879px)]:p-6 ${
                    active ? "border-signal/40 opacity-100" : "border-line opacity-55"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(80%_100%_at_15%_0%,rgb(92_242_195/0.13),transparent_70%)] transition-opacity duration-500 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`step-numeral pointer-events-none absolute -right-2 -top-5 font-display text-[clamp(6.5rem,9vw,9rem)] font-medium leading-none tracking-[-0.06em] ${
                      active ? "is-active" : ""
                    }`}
                  >
                    {pad(i + 1)}
                  </span>

                  <div className="relative flex items-center gap-3">
                    <StepIcon id={step.id} active={active} />
                    <span className="eyebrow">
                      Step {pad(i + 1)} <span className="text-dim">/ {pad(N)}</span>
                    </span>
                  </div>
                  <h3 className="relative mt-7 [@media(max-height:879px)]:mt-5 font-display text-[clamp(1.9rem,2.8vw,2.6rem)] font-medium leading-none tracking-[-0.035em] text-fog">
                    {step.title}
                  </h3>
                  <p className="relative mt-4 text-base leading-relaxed text-fog/90">{step.summary}</p>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-mist [@media(max-height:879px)]:hidden">{step.detail}</p>
                  <div className="relative mt-auto pt-6">
                    <Deliverable output={step.output} />
                  </div>
                </li>,
                <li key={`${step.id}-link`} aria-hidden="true" className="flex w-10 shrink-0 items-center xl:w-12">
                  <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-signal/40" />
                  <span className="h-1.5 w-1.5 rotate-45 border-r border-t border-signal/60" />
                </li>,
              ];
            })}
            <li className="flex w-[clamp(300px,25vw,380px)] shrink-0">
              <NextStepCard className="w-full" />
            </li>
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

/** One stage in the vertical timeline; its node lights up once the reader reaches it. */
function StackedStep({ step, index }) {
  const ref = useRef(null);
  const reached = useInView(ref, { margin: "0px 0px -55% 0px" });
  return (
    <Reveal as="li" className="relative grid grid-cols-[44px_1fr] gap-x-5 pb-14 sm:gap-x-8">
      <span ref={ref} className="relative z-10 h-11 w-11 rounded-full bg-ink">
        <StepIcon id={step.id} active={reached} />
      </span>
      <div className="pt-1">
        <p className="eyebrow mb-3 text-signal">
          Step {pad(index + 1)} <span className="text-dim">/ {pad(N)}</span>
        </p>
        <h3 className="font-display text-[clamp(1.9rem,6vw,2.6rem)] font-medium leading-none tracking-[-0.035em] text-fog">{step.title}</h3>
        <p className="mt-4 text-base leading-relaxed text-fog/90 sm:text-lg">{step.summary}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-mist">{step.detail}</p>
        <div className="mt-6 max-w-md">
          <Deliverable output={step.output} />
        </div>
      </div>
    </Reveal>
  );
}

/** Mobile, tablet and reduced motion: a vertical timeline whose rail fills as you read. */
function StackedProcess() {
  const listRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.6"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);

  return (
    <section id="process" aria-labelledby="process-title" className="relative py-28 sm:py-32">
      <div className="container-x">
        <SectionHeading id="process-title" index="04" label="Process" title={TITLE} intro={INTRO} />

        <ol ref={listRef} className="relative mt-16 sm:mt-20">
          <span aria-hidden="true" className="absolute bottom-14 left-[21.5px] top-2 w-px bg-line-strong">
            <motion.span className="absolute inset-0 origin-top bg-signal" style={{ scaleY }} />
          </span>
          {PROCESS_STEPS.map((step, i) => (
            <StackedStep key={step.id} step={step} index={i} />
          ))}
        </ol>
        <Reveal className="sm:pl-[calc(44px+2rem)]">
          <NextStepCard className="max-w-xl" />
        </Reveal>
      </div>
    </section>
  );
}

export default function Process() {
  // Pin only where the stage cards fit comfortably: wide and tall enough, motion allowed.
  const roomy = useMediaQuery("(min-width: 1024px) and (min-height: 760px)");
  const reduce = useReducedMotion();
  return roomy && !reduce ? <PinnedProcess /> : <StackedProcess />;
}
