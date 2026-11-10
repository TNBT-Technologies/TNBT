import { Reveal, SplitReveal } from "./Reveal";

export function Eyebrow({ index, label, className = "" }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="text-signal">({index})</span>
      <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
      {label}
    </p>
  );
}

/** Section header: eyebrow, large split-reveal title and an optional intro on the right. */
export default function SectionHeading({ id, index, label, title, intro, className = "", titleClassName = "text-[clamp(2.4rem,6.2vw,5.6rem)]" }) {
  return (
    <div className={`grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className="lg:col-span-8">
        <Eyebrow index={index} label={label} />
        <SplitReveal
          as="h2"
          id={id}
          segments={title}
          className={`mt-6 max-w-[16ch] font-display font-medium leading-[0.95] tracking-[-0.04em] text-fog ${titleClassName}`}
        />
      </div>
      {intro && (
        <Reveal as="p" delay={0.15} className="max-w-md text-base leading-relaxed text-mist sm:text-lg lg:col-span-4 lg:pb-2">
          {intro}
        </Reveal>
      )}
    </div>
  );
}
