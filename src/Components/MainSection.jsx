import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, FileText, X } from "lucide-react";
import { Link } from "react-router-dom";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const pdfURL = "/Quotation_tnbttechnologies.pdf";

function MainSection() {
  const [showPDF, setShowPDF] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!showPDF) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowPDF(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPDF]);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-[-90px] -z-10 h-[520px] w-full max-w-[760px] -translate-x-1/2 rounded-full bg-[#255e35]/[0.13] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-16 lg:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#8be28b]/20 bg-[#8be28b]/[0.07] px-4 py-2 text-xs font-semibold tracking-wide text-[#a3efa3] sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8be28b] shadow-[0_0_12px_#8be28b]" />
            YOUR IDEAS, BUILT FOR WHAT’S NEXT
          </div>
          <h1 className="font-[Manrope] text-4xl font-semibold leading-[1.13] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            Digital products that move your business{" "}
            <span className="bg-gradient-to-r from-[#b5f5a6] via-[#80df91] to-[#45bd7b] bg-clip-text text-transparent">
              forward.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
            We partner with ambitious teams to design and build thoughtful websites and applications—made to work beautifully and grow with you.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#8be28b] px-7 font-semibold text-[#071008] transition hover:-translate-y-0.5 hover:bg-[#a4efa1] sm:w-auto"
            >
              Start a conversation
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#projects"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/10 px-7 font-semibold text-neutral-200 transition hover:border-white/25 hover:bg-white/[0.04] sm:w-auto"
            >
              Explore our work <ArrowDown size={16} />
            </a>
          </div>
          <div className="mt-3">
            {isMobile ? (
              <a
                href={pdfURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2 text-sm text-neutral-400 transition hover:text-[#a3efa3]"
              >
                <FileText size={15} /> View company profile
              </a>
            ) : (
              <button
                type="button"
                onClick={() => setShowPDF(true)}
                className="inline-flex items-center gap-2 py-2 text-sm text-neutral-400 transition hover:text-[#a3efa3]"
              >
                <FileText size={15} /> View company profile
              </button>
            )}
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16">
          {[
            { src: video1, label: "Design with purpose" },
            { src: video2, label: "Built to perform" },
          ].map(({ src, label }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101814] p-1.5 shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                aria-label={label}
                className="aspect-[16/10] w-full rounded-xl object-cover"
              >
                <source src={src} type="video/mp4" />
              </video>
              <div className="absolute inset-x-1.5 bottom-1.5 rounded-b-xl bg-gradient-to-t from-black/75 to-transparent px-5 pb-4 pt-12">
                <span className="text-sm font-medium text-white">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showPDF && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md sm:p-8"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setShowPDF(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Company profile"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="flex h-[min(88vh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101814] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
                <div>
                  <p className="font-semibold text-white">TNBT Technologies</p>
                  <p className="text-xs text-neutral-400">Company profile</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPDF(false)}
                  aria-label="Close company profile"
                  className="rounded-full p-2 text-neutral-300 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <iframe src={pdfURL} title="TNBT Technologies company profile" className="min-h-0 flex-1 bg-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MainSection;
