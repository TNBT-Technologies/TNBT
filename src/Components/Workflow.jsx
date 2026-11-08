import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import codeImg from "../assets/code.jpg";
import { checklistItems } from "../constants";

function Workflow() {
  return (
    <section id="workflow" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#8be28b]">How we work</p>
          <h2 className="font-[Manrope] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            A clear path from{" "}
            <span className="text-[#8be28b]">idea to impact.</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-400 sm:text-lg">
            Great work comes from good collaboration. We keep the process focused, transparent, and built around your team.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#255e35]/10 blur-2xl" />
            <img
              src={codeImg}
              alt="A developer working on a digital product"
              className="relative aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-[#080d0b]/80 p-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8be28b]">The right people, in your corner</p>
              <p className="mt-1 text-sm text-neutral-200 sm:text-base">Small team. Thoughtful work. Real partnership.</p>
            </div>
          </div>

          <div className="space-y-2">
            {checklistItems.map((item, index) => (
              <div key={item.title} className="flex gap-4 border-b border-white/[0.07] py-5 last:border-0 sm:gap-5 sm:py-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#8be28b]/20 bg-[#8be28b]/[0.08] text-[#9bea9b]">
                  <Check size={17} strokeWidth={2.2} />
                </span>
                <div>
                  <p className="mb-1 text-xs font-semibold tracking-widest text-neutral-600">STEP 0{index + 1}</p>
                  <h3 className="font-[Manrope] text-base font-semibold text-neutral-100 sm:text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-neutral-400">{item.description}</p>
                </div>
              </div>
            ))}
            <Link
              to="/contact"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#9bea9b] transition hover:text-white"
            >
              Tell us what you’re building
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Workflow;
