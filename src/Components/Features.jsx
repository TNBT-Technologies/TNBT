import {
  Code2,
  LayoutDashboard,
  LineChart,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Web & app development",
    description: "Custom-built digital products shaped around your goals, your users, and the way your business works.",
  },
  {
    icon: LayoutDashboard,
    title: "Product & UI design",
    description: "Clear, considered interfaces that make complex experiences feel simple and natural to use.",
  },
  {
    icon: Rocket,
    title: "Launch with confidence",
    description: "From first release to what comes next, we help you ship smoothly and keep improving.",
  },
  {
    icon: ShieldCheck,
    title: "Responsive by default",
    description: "Reliable experiences that feel right across phones, tablets, laptops, and everything in between.",
  },
  {
    icon: Users,
    title: "A close-knit partnership",
    description: "Work directly with a collaborative team that keeps you in the loop at every step.",
  },
  {
    icon: LineChart,
    title: "Built for growth",
    description: "Performance-minded foundations and practical SEO help your product reach more people.",
  },
];

function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-y border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#8be28b]">What we do</p>
          <h2 className="font-[Manrope] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Everything your idea needs to{" "}
            <span className="text-[#8be28b]">take shape.</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-400 sm:text-lg">
            Good technology starts with understanding people. We bring design, development, and a thoughtful process together.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="group rounded-2xl border border-white/[0.07] bg-[#0c120f] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#8be28b]/25 hover:bg-[#111a14] sm:p-7"
            >
              <div className="mb-7 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#8be28b]/15 bg-[#8be28b]/[0.08] text-[#9bea9b] transition group-hover:bg-[#8be28b]/[0.14]">
                  <Icon size={21} strokeWidth={1.8} />
                </span>
                <span className="text-xs font-medium tracking-widest text-neutral-600">0{index + 1}</span>
              </div>
              <h3 className="font-[Manrope] text-lg font-semibold text-neutral-100">{title}</h3>
              <p className="mt-2.5 text-sm leading-6 text-neutral-400">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
