import { useActiveChapter } from "../../lib/chapters";
import { CHAPTERS } from "../../data/site";

/**
 * Ambient light behind the particles. One tint per chapter, cross-faded with opacity only
 * (gradients can't be transitioned, opacity is free to composite).
 */
const AURA_BY_CHAPTER = {
  home: "radial-gradient(55% 50% at 74% 34%, rgb(92 242 195 / 0.15), transparent 70%), radial-gradient(45% 40% at 8% 96%, rgb(242 230 206 / 0.07), transparent 70%)",
  services: "radial-gradient(50% 45% at 12% 18%, rgb(108 184 255 / 0.12), transparent 70%), radial-gradient(50% 45% at 90% 85%, rgb(92 242 195 / 0.07), transparent 70%)",
  about: "radial-gradient(60% 50% at 50% 100%, rgb(159 230 255 / 0.1), transparent 70%), radial-gradient(40% 35% at 85% 10%, rgb(92 242 195 / 0.06), transparent 70%)",
  process: "radial-gradient(70% 40% at 50% 55%, rgb(92 242 195 / 0.09), transparent 70%), radial-gradient(40% 40% at 95% 20%, rgb(108 184 255 / 0.08), transparent 70%)",
  contact: "radial-gradient(50% 50% at 75% 25%, rgb(242 230 206 / 0.1), transparent 70%), radial-gradient(50% 45% at 20% 80%, rgb(92 242 195 / 0.1), transparent 70%)",
};
const AURAS = CHAPTERS.map((c) => AURA_BY_CHAPTER[c.id] ?? AURA_BY_CHAPTER.home);

export default function Atmosphere() {
  const active = useActiveChapter();
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-0 h-lvh w-full overflow-hidden">
        {AURAS.map((background, i) => (
          <div key={i} className="aura" data-on={active === i} style={{ background }} />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgb(0_0_0/0.55))]" />
      </div>
    </>
  );
}

export function Grain() {
  return <div aria-hidden="true" className="grain" />;
}
