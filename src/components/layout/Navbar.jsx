import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Instagram, Mail, Phone } from "lucide-react";
import BrandMark from "./BrandMark";
import { ButtonLink } from "../ui/Buttons";
import { NAV_LINKS, SITE } from "../../data/site";
import { useActiveChapter } from "../../lib/chapters";
import { lockScroll, scrollToSection } from "../../lib/scroll";
import { menuOpenStore } from "../../lib/store";
import { EASE_DRAWER } from "../../lib/motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const active = useActiveChapter();
  const reduce = useReducedMotion();
  const toggleRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Hide while reading downward, return as soon as the reader scrolls up.
    if (y > 640 && y > prev + 4) setHidden(true);
    else if (y < prev - 4 || y < 640) setHidden(false);
  });

  // Mobile menu: lock scroll, make the page inert, close on Escape, restore focus.
  useEffect(() => {
    menuOpenStore.set(open);
    if (!open) return undefined;
    lockScroll(true);
    const page = [document.getElementById("main"), document.getElementById("site-footer")].filter(Boolean);
    page.forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      lockScroll(false);
      page.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  // Close the menu if the viewport grows into the desktop layout.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const goTo = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    // Let the menu release the scroll lock before scrolling.
    requestAnimationFrame(() => scrollToSection(id));
  };

  const showBar = scrolled && !open;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[70] pt-[env(safe-area-inset-top)] transition-transform duration-300 ease-out"
        style={{ transform: hidden && !open ? "translateY(-120%)" : "translateY(0)" }}
      >
        <div className="container-x">
          <div className="relative mt-3 flex h-14 items-center justify-between gap-4 pl-3 pr-1.5 sm:mt-4 sm:h-16 sm:pl-4 sm:pr-2">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-line bg-ink/75 shadow-[0_20px_60px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl transition-[opacity,transform] duration-300 ease-out"
              style={{ opacity: showBar ? 1 : 0, transform: showBar ? "scale(1)" : "scale(0.985)" }}
            >
              {/* reading progress */}
              <span className="absolute inset-x-8 bottom-[-1px] h-px overflow-hidden">
                <motion.span className="absolute inset-0 origin-left bg-gradient-to-r from-signal/0 via-signal to-signal" style={{ scaleX: scrollYProgress }} />
              </span>
            </span>

            <a href="#home" onClick={goTo("home")} className="relative rounded-full" aria-label={`${SITE.name} — back to top`}>
              <BrandMark />
            </a>

            <nav aria-label="Primary" className="relative hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {NAV_LINKS.map((link, i) => {
                  const isActive = active === i;
                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-200 ${isActive ? "text-fog" : "text-mist hover:text-fog"}`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-full bg-fog/[0.07]"
                            transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                          />
                        )}
                        <span className="relative">{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="relative flex items-center gap-2">
              <ButtonLink href="#contact" size="sm" className="hidden sm:inline-flex">
                Let&apos;s Talk
              </ButtonLink>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-ink/60 backdrop-blur-md transition-transform duration-150 ease-out active:scale-[0.95] lg:hidden"
              >
                <span className="relative block h-3 w-5" aria-hidden="true">
                  <span
                    className="absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-fog transition-transform duration-300 ease-out"
                    style={{ transform: open ? "translateY(5.25px) rotate(45deg)" : "none" }}
                  />
                  <span
                    className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-fog transition-transform duration-300 ease-out"
                    style={{ transform: open ? "translateY(-5.25px) rotate(-45deg)" : "none" }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(6.5rem+env(safe-area-inset-top))] sm:px-8 lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.35, ease: EASE_DRAWER } }}
            transition={{ duration: 0.55, ease: EASE_DRAWER }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_80%_10%,rgb(92_242_195/0.14),transparent_70%),radial-gradient(60%_40%_at_0%_100%,rgb(242_230_206/0.07),transparent_70%)]"
            />
            <nav aria-label="Mobile" className="relative">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.id} className="border-b border-line">
                    <a
                      href={`#${link.id}`}
                      onClick={goTo(link.id)}
                      aria-current={active === i ? "true" : undefined}
                      className="flex items-baseline gap-4 py-4 font-display text-[clamp(2.1rem,9vw,3.2rem)] font-medium leading-none tracking-[-0.035em] text-fog active:text-signal"
                    >
                      <span className="w-6 font-mono text-[11px] tracking-[0.15em] text-signal">0{i + 1}</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* One entrance per container: the curtain reveals everything inside it, top to bottom. */}
            <div className="relative mt-auto space-y-5 pt-10">
              <a href="#contact" onClick={goTo("contact")} className="btn btn-primary w-full">
                Start a Project
              </a>
              <div className="flex flex-col gap-3 text-sm text-mist">
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-3">
                  <Mail size={16} className="text-signal" /> {SITE.email}
                </a>
                {SITE.phones[0] && (
                  <a href={SITE.phones[0].href} className="inline-flex items-center gap-3">
                    <Phone size={16} className="text-signal" /> {SITE.phones[0].display}
                  </a>
                )}
                {SITE.socials.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3">
                    <Instagram size={16} className="text-signal" /> {s.handle}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
