import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Code2, Map as MapIcon, PenTool, Rocket, Search, ShieldCheck } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { PROCESS_STEPS } from "../data/process";
import { scrollToY } from "../lib/scroll";

const pad = (n) => String(n).padStart(2, "0");
const ICONS = { discover: Search, plan: MapIcon, design: PenTool, develop: Code2, test: ShieldCheck, deliver: Rocket };

function StepIcon({ id, active = true, className = "" }) {
  const Icon = ICONS[id];
  return (
    <span
      aria-hidden="true"
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-[border-color,background-color,color] duration-500 ${
        active ? "border-signal/50 bg-signal/10 text-signal" : "border-line-strong text-mist"
      } ${className}`}
    >
      {Icon && <Icon size={18} strokeWidth={1.75} />}
    </span>
  );
}

function StepBody({ step, compact = false }) {
  return (
    <>
      <h3 className="font-display text-[clamp(1.9rem,3vw,2.75rem)] font-medium leading-none tracking-[-0.035em] text-fog">{step.title}</h3>
      <p className="mt-4 text-base leading-relaxed text-fog/90 sm:text-lg">{step.summary}</p>
      <p className={`mt-3 text-[15px] leading-relaxed text-mist ${compact ? "[@media(max-height:879px)]:hidden" : ""}`}>{step.detail}</p>
      <p className="mt-6 flex items-start gap-3 border-t border-line pt-4 text-sm text-fog/85">
        <span className="eyebrow shrink-0 pt-[3px] text-signal">You get</span>
        {step.output}
      </p>
    </>
  );
}

/** Desktop: the section pins and the stages travel horizontally as you scroll. */
function PinnedProcess() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [height, setHeight] = useState(null);
  const [current, setCurrent] = useState(0);
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

  // Land each stage mid-way through its share of the pinned scroll.
  const goToStep = (i) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - window.innerHeight;
    scrollToY(top + ((i + 0.5) / PROCESS_STEPS.length) * travel);
  };

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setCurrent(Math.min(PROCESS_STEPS.length - 1, Math.floor(p * PROCESS_STEPS.length * 0.999)));
  });

  return (
    <section id="process" ref={sectionRef} aria-labelledby="process-title" className="relative" style={{ height: height ?? "300vh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="container-x pt-24 xl:pt-28">
          <SectionHeading
            id="process-title"
            index="04"
            label="Process"
            title={["From first idea to", { text: "launch day.", em: true }]}
            titleClassName="text-[clamp(2.2rem,4.4vw,4.2rem)]"
            intro="Six clear stages, the same on every project — so you always know what's happening and what comes next."
          />

          {/* progress rail — each stage label jumps straight to its card */}
          <nav aria-label="Process stages" className="mt-8 xl:mt-10">
            <div aria-hidden="true" className="relative h-px w-full bg-line-strong">
              <motion.div className="absolute inset-0 origin-left bg-signal" style={{ scaleX: scrollYProgress }} />
            </div>
            <ol className="mt-1 grid grid-cols-6">
              {PROCESS_STEPS.map((step, i) => (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => goToStep(i)}
                    aria-current={i === current ? "step" : undefined}
                    className={`-ml-2 rounded-full px-2 py-2.5 text-left font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                      i <= current ? "text-fog" : "text-dim hover:text-mist"
                    }`}
                  >
                    <span className={`transition-colors duration-300 ${i <= current ? "text-signal" : ""}`}>{pad(i + 1)}</span> {step.title}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="mt-auto pb-10 pt-8 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] xl:pb-14">
          <motion.ol ref={trackRef} style={{ x }} className="flex w-max gap-6 pl-[max(3rem,calc((100vw-1320px)/2+3rem))] pr-[12vw]">
            {PROCESS_STEPS.map((step, i) => (
              <li
                key={step.id}
                aria-current={i === current ? "step" : undefined}
                className={`relative w-[clamp(340px,31vw,460px)] shrink-0 overflow-hidden rounded-[28px] border bg-ink-2 p-8 transition-[border-color,opacity] duration-500 ease-out xl:p-10 ${
                  i === current ? "border-signal/40 opacity-100" : "border-line opacity-60"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(80%_100%_at_20%_0%,rgb(92_242_195/0.12),transparent_70%)] transition-opacity duration-500 ${
                    i === current ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span
                    aria-hidden="true"
                    className={`step-numeral block font-display text-[clamp(3.5rem,5vw,5.5rem)] font-medium leading-[0.8] tracking-[-0.05em] ${
                      i === current ? "is-active" : ""
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <StepIcon id={step.id} active={i === current} />
                </div>
                <div className="relative mt-7">
                  <StepBody step={step} compact />
                </div>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

/** Mobile, tablet and reduced motion: a vertical timeline whose rail fills as you read. */
function StackedProcess() {
  const listRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);

  return (
    <section id="process" aria-labelledby="process-title" className="relative py-28 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="process-title"
          index="04"
          label="Process"
          title={["From first idea to", { text: "launch day.", em: true }]}
          intro="Six clear stages, the same on every project — so you always know what's happening and what comes next."
        />

        <ol ref={listRef} className="relative mt-16 sm:mt-20">
          <span aria-hidden="true" className="absolute bottom-6 left-[21.5px] top-2 w-px bg-line-strong">
            <motion.span className="absolute inset-0 origin-top bg-signal" style={{ scaleY }} />
          </span>
          {PROCESS_STEPS.map((step, i) => (
            <Reveal as="li" key={step.id} className="relative grid grid-cols-[44px_1fr] gap-x-5 pb-14 last:pb-0 sm:gap-x-8">
              {/* solid backing so the timeline line stops at the node */}
              <span className="relative z-10 h-11 w-11 rounded-full bg-ink">
                <StepIcon id={step.id} />
              </span>
              <div className="pt-1">
                <p className="eyebrow mb-3 text-signal">Step {pad(i + 1)}</p>
                <StepBody step={step} />
              </div>
            </Reveal>
          ))}
        </ol>
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
