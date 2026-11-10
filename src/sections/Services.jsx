import { AnimatePresence, motion } from "framer-motion";
import { ArrowSwap } from "../components/ui/Buttons";
import { Reveal } from "../components/ui/Reveal";
import { EASE_OUT } from "../lib/motion";
import SectionHeading from "../components/ui/SectionHeading";
import TechLens from "../components/ui/TechLens";
import { SERVICES } from "../data/services";
import { TECH } from "../data/technologies";
import { openServicesStore, setProjectIntent, toggleService, useStore } from "../lib/store";
import { scrollToSection } from "../lib/scroll";

function PlusIcon({ open }) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-[border-color,background-color] duration-200 sm:h-12 sm:w-12 ${
        open ? "border-signal bg-signal" : "border-line-strong group-hover:border-fog/40"
      }`}
    >
      <span className="relative h-3.5 w-3.5 transition-transform duration-300 ease-out" style={{ transform: open ? "rotate(135deg)" : "none" }}>
        <span className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 ${open ? "bg-ink" : "bg-fog"}`} />
        <span className={`absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 ${open ? "bg-ink" : "bg-fog"}`} />
      </span>
    </span>
  );
}

/** Soft light that follows the pointer across a row (mouse/trackpad only; touch never fires it). */
const trackSpotlight = (e) => {
  if (e.pointerType !== "mouse") return;
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

function ServiceRow({ service, index, open, onToggle }) {
  const panelId = `service-panel-${service.id}`;
  const buttonId = `service-button-${service.id}`;

  const discuss = () => {
    setProjectIntent(service.projectType);
    scrollToSection("contact");
  };

  return (
    <Reveal as="li" id={`service-row-${service.id}`} y={16} className="scroll-mt-24 border-b border-line">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          onPointerMove={trackSpotlight}
          aria-expanded={open}
          aria-controls={panelId}
          data-cursor={open ? "Close" : "Open"}
          className="group relative grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-x-3 py-6 text-left sm:grid-cols-[4rem_1fr_auto] sm:py-8 lg:grid-cols-[5rem_minmax(0,1fr)_minmax(0,19rem)_auto] lg:gap-x-8"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-6 -right-6 rounded-3xl bg-[radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,50%),rgb(92_242_195/0.075),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gradient-to-r from-signal via-signal/60 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
          />
          <span className={`font-mono text-xs transition-colors duration-200 ${open ? "text-signal" : "text-dim"}`}>0{index + 1}</span>
          <span
            className={`font-display text-[clamp(1.55rem,4.3vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.035em] transition-[color,transform] duration-300 ease-out group-hover:translate-x-2 ${
              open ? "text-fog" : "text-fog/80 group-hover:text-fog"
            }`}
          >
            {service.title}
          </span>
          <span className="hidden text-sm leading-relaxed text-mist lg:block">{service.tagline}</span>
          <PlusIcon open={open} />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { height: { duration: 0.32, ease: EASE_OUT }, opacity: { duration: 0.25, delay: 0.05 } } }}
            exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.26, ease: EASE_OUT }, opacity: { duration: 0.15 } } }}
            className="overflow-hidden"
          >
            <div className="grid gap-10 pb-10 pl-[calc(2.25rem+0.75rem)] sm:pl-[calc(4rem+0.75rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:pb-14 lg:pl-[calc(5rem+2rem)]">
              <div>
                <p className="text-sm leading-relaxed text-mist lg:hidden">{service.tagline}</p>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-fog/90 sm:text-lg lg:mt-0">{service.description}</p>
                <div className="mt-8">
                  <p className="eyebrow">Typical stack</p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-4">
                    {service.stack.map((id) => (
                      <li key={id}>
                        <TechLens tech={TECH[id]} size={48} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <p className="eyebrow">What&apos;s included</p>
                <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="flex items-center gap-3 border-b border-line py-3 text-[15px] text-fog/90">
                      <span aria-hidden="true" className="h-1 w-1 shrink-0 rotate-45 bg-signal" />
                      {cap}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={discuss}
                  className="group/cta mt-8 inline-flex items-center gap-2 text-sm font-semibold text-signal transition-colors duration-200 hover:text-fog"
                >
                  {service.cta}
                  <ArrowSwap />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export default function Services() {
  const openIds = useStore(openServicesStore);

  return (
    <section id="services" aria-labelledby="services-title" className="relative py-28 sm:py-32 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          index="02"
          label="Services"
          title={["Everything it takes to", { text: "go digital.", em: true }]}
          intro="Design, engineering and automation under one roof — so your website, app and back-office systems are built to work together."
        />

        <ul className="mt-16 border-t border-line sm:mt-20">
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={i}
              open={openIds.includes(service.id)}
              onToggle={() => toggleService(service.id)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
