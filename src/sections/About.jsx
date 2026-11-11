import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { cascade } from "../lib/motion";

// Words wrapped in *asterisks* render in the italic serif.
const MANIFESTO =
  "We're TNBT Technologies — a software studio working out of Udupi and Bengaluru. We help businesses replace guesswork, paperwork and patchwork tools with *software* that fits how they actually work: websites that earn trust, apps people enjoy using, and systems that quietly run the busy parts of the day.";

const PRINCIPLES = [
  {
    title: "Problems before features",
    text: "We start with how your business runs today and what is slowing it down. The right solution follows from that — not the other way round.",
  },
  {
    title: "Built to last, ready to grow",
    text: "Clean code, sensible architecture and well-designed databases, so the product keeps up as your users and data grow.",
  },
  {
    title: "Creativity meets engineering",
    text: "Every screen is designed to be clear and pleasant to use, and every feature is engineered to be fast, secure and reliable.",
  },
  {
    title: "Straight talk, steady updates",
    text: "You'll always know what we're building, why, and where it stands — from the first call to launch day.",
  },
];

const AUDIENCE = ["Startups", "Small & medium businesses", "Entrepreneurs", "Local businesses", "Teams going digital", "Researchers & academics"];

const DELIVERABLES = [
  "Custom websites",
  "Full-stack web applications",
  "Android & iOS apps",
  "Business management systems",
  "Admin dashboards",
  "Database-driven applications",
  "Zoho-based solutions",
  "AI integrations",
  "Business process automation",
  "Research papers & journal articles",
  "Technical documentation",
];

function Word({ children, progress, range, em, reduce }) {
  const opacity = useTransform(progress, range, reduce ? [1, 1] : [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={em ? "font-serif font-light italic text-gradient" : undefined}>
      {children}
    </motion.span>
  );
}

/** Manifesto that lights up word by word as it scrolls through the viewport. */
function ScrollManifesto({ text }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="max-w-[24ch] font-display text-[clamp(1.85rem,4.6vw,4.4rem)] font-medium leading-[1.06] tracking-[-0.035em] text-fog"
    >
      {words.map((raw, i) => {
        const em = raw.startsWith("*");
        const word = raw.replace(/\*/g, "");
        const start = i / words.length;
        return (
          <span key={i}>
            <Word progress={scrollYProgress} range={[start, start + 1 / words.length]} em={em} reduce={reduce}>
              {word}
            </Word>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 sm:py-32 lg:py-36">
      <div className="container-x">
        <Eyebrow index="03" label="About" />
        <h2 id="about-title" className="sr-only">
          About TNBT Technologies
        </h2>
        <div className="mt-10">
          <ScrollManifesto text={MANIFESTO} />
        </div>

        <div className="mt-24 grid grid-cols-1 gap-16 lg:mt-32 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal as="p" className="eyebrow">
              How we work
            </Reveal>
            <ol className="mt-8 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <Reveal as="li" key={p.title} delay={cascade(i)} className="border-t border-line pt-6">
                  <span className="font-mono text-[11px] text-signal">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-[1.45rem] font-medium leading-tight tracking-[-0.02em] text-fog">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist">{p.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="space-y-14 lg:col-span-4 lg:col-start-9">
            <Reveal>
              <p className="eyebrow">Who we work with</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {AUDIENCE.map((a) => (
                  <li key={a} className="rounded-full border border-line-strong px-4 py-2 text-sm text-fog/90">
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="eyebrow">What we build</p>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {DELIVERABLES.map((d) => (
                  <li key={d} className="flex items-center justify-between py-3 text-[15px] text-fog/90">
                    {d}
                    <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-signal/70" />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
