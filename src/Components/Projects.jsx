import { ArrowUpRight, Sparkles } from "lucide-react";

const project = {
  logo: "/logoproject.jpeg",
  title: "Outreach",
  description: "A simpler way to create and manage receipts, with cloud storage to keep everything close at hand.",
  category: "Mobile app",
  url: "https://play.google.com/store/apps/details?id=com.outreachllp.net&pcampaignid=web_share",
};

function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-y border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-12 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#8be28b]">Selected work</p>
            <h2 className="font-[Manrope] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Made for the{" "}
              <span className="text-[#8be28b]">real world.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-neutral-400 sm:text-base">
            We turn everyday challenges into useful digital tools. Here’s one of the products we’ve helped bring to life.
          </p>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Explore ${project.title} on Google Play`}
          className="group grid overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c120f] transition duration-300 hover:-translate-y-1 hover:border-[#8be28b]/25 hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:grid-cols-[0.85fr_1.15fr]"
        >
          <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_rgba(112,186,100,0.18),_transparent_68%)] p-10 sm:min-h-80">
            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#080d0b]/60 px-3 py-1.5 text-xs font-medium text-neutral-300">
              <Sparkles size={13} className="text-[#8be28b]" />
              {project.category}
            </div>
            <img
              src={project.logo}
              alt={`${project.title} app icon`}
              className="h-36 w-36 rounded-[2rem] object-cover shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition duration-500 group-hover:scale-105 sm:h-44 sm:w-44"
            />
          </div>
          <div className="flex flex-col justify-center border-t border-white/[0.07] p-7 sm:p-10 md:border-l md:border-t-0 lg:p-14">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">01 / Product</span>
            <div className="mt-4 flex items-center justify-between gap-4">
              <h3 className="font-[Manrope] text-3xl font-semibold text-white sm:text-4xl">{project.title}</h3>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-neutral-200 transition group-hover:border-[#8be28b]/35 group-hover:bg-[#8be28b]/10 group-hover:text-[#a3efa3]">
                <ArrowUpRight size={20} />
              </span>
            </div>
            <p className="mt-4 max-w-lg text-base leading-7 text-neutral-400">{project.description}</p>
            <span className="mt-8 text-sm font-semibold text-[#9bea9b]">Explore on Google Play <span aria-hidden="true">↗</span></span>
          </div>
        </a>
      </div>
    </section>
  );
}

export default Projects;
