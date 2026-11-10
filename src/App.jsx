import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Atmosphere, { Grain } from "./components/assembly/Atmosphere";
import ParticleField from "./components/assembly/ParticleField";
import ChapterHud from "./components/assembly/ChapterHud";
import Cursor from "./components/ui/Cursor";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MobileCta from "./components/layout/MobileCta";
import Hero from "./sections/Hero";
import CapabilityBand from "./sections/CapabilityBand";
import Services from "./sections/Services";
import About from "./sections/About";
import Process from "./sections/Process";
import Contact from "./sections/Contact";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { initChapters } from "./lib/chapters";
import { scrollToSection } from "./lib/scroll";

/** Honour deep links: "#services" style hashes and the old "/contact" page URL. */
function useInitialTarget() {
  useEffect(() => {
    const { pathname, hash } = window.location;
    let target = hash ? decodeURIComponent(hash.slice(1)) : "";
    if (!target && /\/contact\/?$/.test(pathname)) {
      target = "contact";
      window.history.replaceState(null, "", `${import.meta.env.BASE_URL}#contact`);
    }
    if (!target) return undefined;
    // Wait a frame so fonts/layout settle before jumping.
    const raf = requestAnimationFrame(() => scrollToSection(target, { immediate: true, updateHash: false }));
    return () => cancelAnimationFrame(raf);
  }, []);
}

export default function App() {
  useSmoothScroll();
  useInitialTarget();
  useEffect(() => initChapters(), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        onClick={() => document.getElementById("main")?.focus({ preventScroll: true })}
        className="fixed left-4 top-4 z-[90] -translate-y-24 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-ink transition-transform duration-200 ease-out focus:translate-y-0"
      >
        Skip to content
      </a>

      <Atmosphere />
      <ParticleField />
      <Grain />
      <Cursor />
      <Navbar />
      <ChapterHud />
      <MobileCta />

      <main id="main" tabIndex={-1} className="relative z-10 overflow-x-clip outline-none">
        <Hero />
        <CapabilityBand />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}
