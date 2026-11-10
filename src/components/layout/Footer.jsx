import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUp, Instagram } from "lucide-react";
import BrandMark from "./BrandMark";
import { NAV_LINKS, SITE } from "../../data/site";
import { SERVICES } from "../../data/services";
import { openService } from "../../lib/store";
import { scrollToSection } from "../../lib/scroll";

function BackToTop() {
  const { scrollYProgress } = useScroll();
  return (
    <button
      type="button"
      onClick={() => scrollToSection("top")}
      aria-label="Back to top"
      data-cursor="Top"
      className="group relative grid h-14 w-14 shrink-0 place-items-center rounded-full transition-transform duration-150 ease-out active:scale-[0.95]"
    >
      <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="28" cy="28" r="27" fill="none" stroke="rgb(237 241 236 / 0.14)" strokeWidth="1" />
        <motion.circle cx="28" cy="28" r="27" fill="none" stroke="var(--color-signal)" strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
      </svg>
      <span className="relative block overflow-hidden">
        <ArrowUp size={18} aria-hidden="true" className="text-fog transition-transform duration-300 ease-out group-hover:-translate-y-6" />
        <ArrowUp size={18} aria-hidden="true" className="absolute inset-0 translate-y-6 text-signal transition-transform duration-300 ease-out group-hover:translate-y-0" />
      </span>
    </button>
  );
}

function Column({ title, children }) {
  return (
    <div>
      <h2 className="eyebrow text-dim">{title}</h2>
      <ul className="mt-5 space-y-3 text-[15px]">{children}</ul>
    </div>
  );
}

const linkClass = "text-fog/80 transition-colors duration-200 hover:text-signal";

export default function Footer() {
  const wordRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wordRef, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["45%", "0%"]);
  const year = new Date().getFullYear();

  // Open the service's row and land on it just below the fixed navigation.
  const goToService = (id) => (e) => {
    e.preventDefault();
    openService(id);
    requestAnimationFrame(() => scrollToSection(`service-row-${id}`, { offset: -96, updateHash: false }));
  };

  return (
    <footer id="site-footer" className="relative z-10 overflow-hidden border-t border-line bg-ink/60">
      <div className="container-x pt-20 sm:pt-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <BrandMark />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mist">{SITE.description}</p>
            {SITE.socials.length > 0 && (
              <div className="mt-6 flex gap-2">
                {SITE.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${SITE.name} on ${s.label}`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-fog/80 transition-colors duration-200 hover:border-signal/60 hover:text-signal"
                  >
                    <Instagram size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <Column title="Navigate">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </Column>
          </div>

          <div className="lg:col-span-3">
            <Column title="Services">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" onClick={goToService(s.id)} className={linkClass}>
                    {s.short}
                  </a>
                </li>
              ))}
            </Column>
          </div>

          <div className="lg:col-span-3">
            <Column title="Contact">
              <li>
                <a href={`mailto:${SITE.email}`} className={`${linkClass} [overflow-wrap:anywhere]`}>
                  {SITE.email.split("@")[0]}
                  <wbr />@{SITE.email.split("@")[1]}
                </a>
              </li>
              {SITE.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className={linkClass}>
                    {p.display}
                  </a>
                </li>
              ))}
              {SITE.locations.map((l) => (
                <li key={l.id} className="text-mist">
                  {l.city}, {l.region}
                </li>
              ))}
            </Column>
          </div>
        </div>
      </div>

      <div ref={wordRef} aria-hidden="true" className="relative mt-16 overflow-hidden sm:mt-20">
        <motion.p
          style={{ y }}
          className="select-none text-center font-display text-[30vw] font-semibold leading-[0.78] tracking-[-0.05em]"
        >
          <span className="bg-gradient-to-b from-fog/[0.13] via-fog/[0.05] to-transparent bg-clip-text text-transparent">TNBT</span>
        </motion.p>
      </div>

      <div className="container-x">
        <div className="flex flex-col-reverse gap-6 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-dim">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">Karkala · Bengaluru — India</p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
