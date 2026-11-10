import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Eyebrow } from "../components/ui/SectionHeading";
import { Reveal, SplitReveal } from "../components/ui/Reveal";
import ContactForm from "./ContactForm";
import { SITE } from "../data/site";

const NEXT_STEPS = [
  { title: "We read your brief", text: "and reply with any questions we have." },
  { title: "We suggest an approach", text: "with scope, technology and a quote." },
  { title: "We start building", text: "once you're happy with the plan." },
];

function WhatHappensNext() {
  return (
    <div>
      <p className="eyebrow">What happens next</p>
      <ol className="mt-5 space-y-4">
        {NEXT_STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-[11px] text-signal">{i + 1}</span>
            <p className="pt-[3px] text-[15px] leading-relaxed text-mist">
              <span className="text-fog">{step.title}</span> {step.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

const mapsSearch = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const mapsEmbed = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=12&output=embed`;

/** City switcher + keyless Google Maps embed, only loaded once the section is near. */
function Locations() {
  const ref = useRef(null);
  const near = useInView(ref, { once: true, margin: "600px 0px" });
  const [activeId, setActiveId] = useState(SITE.locations[0]?.id);
  const [loaded, setLoaded] = useState({});
  const active = SITE.locations.find((l) => l.id === activeId) ?? SITE.locations[0];

  if (!active) return null;

  return (
    <div ref={ref}>
      <p className="eyebrow">Where we are</p>
      <div role="tablist" aria-label="Office locations" className="mt-5 inline-flex rounded-full border border-line-strong p-1">
        {SITE.locations.map((loc) => {
          const isActive = loc.id === active.id;
          return (
            <button
              key={loc.id}
              id={`loc-tab-${loc.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="loc-panel"
              onClick={() => setActiveId(loc.id)}
              className={`relative rounded-full px-5 py-2 text-sm transition-colors duration-200 ${isActive ? "text-ink" : "text-mist hover:text-fog"}`}
            >
              {isActive && (
                <motion.span layoutId="loc-pill" className="absolute inset-0 rounded-full bg-signal" transition={{ type: "spring", duration: 0.4, bounce: 0.12 }} />
              )}
              <span className="relative font-medium">{loc.city}</span>
            </button>
          );
        })}
      </div>

      <div id="loc-panel" role="tabpanel" aria-labelledby={`loc-tab-${active.id}`} className="mt-5">
        <div className="relative aspect-[16/11] overflow-hidden rounded-[22px] border border-line bg-ink-2">
          {!loaded[active.id] && (
            <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
              <div className="flex flex-col items-center gap-3 text-dim">
                <MapPin size={22} className="text-signal motion-safe:animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Loading map</span>
              </div>
            </div>
          )}
          {near &&
            SITE.locations.map((loc) =>
              loc.id === active.id || loaded[loc.id] ? (
                <iframe
                  key={loc.id}
                  title={`Map of ${loc.city}, ${loc.region}`}
                  src={mapsEmbed(loc.query)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setLoaded((s) => ({ ...s, [loc.id]: true }))}
                  className={`map-dark absolute inset-x-0 -top-[110px] h-[calc(100%+110px)] w-full border-0 transition-opacity duration-500 ${
                    loc.id === active.id && loaded[loc.id] ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                  tabIndex={loc.id === active.id ? 0 : -1}
                  aria-hidden={loc.id === active.id ? undefined : true}
                />
              ) : null,
            )}
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
          <span className="flex items-center gap-2 text-fog/90">
            <MapPin size={15} className="text-signal" aria-hidden="true" />
            {active.city}, {active.region}
          </span>
          <a
            href={mapsSearch(active.query)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-mist transition-colors duration-200 hover:text-fog"
          >
            Open in Maps <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactLines() {
  return (
    <ul className="divide-y divide-line border-y border-line">
      <li>
        <a href={`mailto:${SITE.email}`} className="group flex items-center gap-4 py-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong text-signal transition-colors duration-200 group-hover:border-signal/60">
            <Mail size={17} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="eyebrow block text-dim">Email</span>
            <span className="mt-1.5 block truncate text-[15px] text-fog transition-colors duration-200 group-hover:text-signal sm:text-base">{SITE.email}</span>
          </span>
        </a>
      </li>
      {SITE.phones.length > 0 && (
        <li className="flex items-center gap-4 py-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong text-signal">
            <Phone size={17} aria-hidden="true" />
          </span>
          <span>
            <span className="eyebrow block text-dim">Phone</span>
            <span className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
              {SITE.phones.map((p) => (
                <a key={p.href} href={p.href} className="text-[15px] text-fog transition-colors duration-200 hover:text-signal sm:text-base">
                  {p.display}
                </a>
              ))}
            </span>
          </span>
        </li>
      )}
      {SITE.socials.map((s) => (
        <li key={s.href}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong text-signal transition-colors duration-200 group-hover:border-signal/60">
              <Instagram size={17} aria-hidden="true" />
            </span>
            <span>
              <span className="eyebrow block text-dim">{s.label}</span>
              <span className="mt-1.5 block text-[15px] text-fog transition-colors duration-200 group-hover:text-signal sm:text-base">{s.handle}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-28 sm:py-32 lg:py-36">
      <div className="container-x">
        <Eyebrow index="05" label="Contact" />
        <SplitReveal
          as="h2"
          id="contact-title"
          segments={["Let's build something", { text: "together.", em: true }]}
          className="mt-6 max-w-[14ch] font-display text-[clamp(2.9rem,8.6vw,8.4rem)] font-medium leading-[0.92] tracking-[-0.05em] text-fog"
        />

        <div className="mt-16 grid grid-cols-1 gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-12 lg:col-span-5">
            <Reveal as="p" className="max-w-md text-base leading-relaxed text-mist sm:text-lg">
              Tell us what you&apos;re planning — a new website, an app, or a process you want off spreadsheets. We&apos;ll get back to you with questions, ideas and a clear next step.
            </Reveal>
            <Reveal delay={0.05}>
              <WhatHappensNext />
            </Reveal>
            <Reveal delay={0.08}>
              <ContactLines />
            </Reveal>
            <Reveal delay={0.1}>
              <Locations />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
