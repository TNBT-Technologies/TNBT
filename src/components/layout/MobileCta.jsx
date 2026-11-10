import { Phone } from "lucide-react";
import { ArrowSwap } from "../ui/Buttons";
import { CHAPTERS, SITE } from "../../data/site";
import { useActiveChapter } from "../../lib/chapters";
import { menuOpenStore, useStore } from "../../lib/store";

const CONTACT_INDEX = CHAPTERS.findIndex((c) => c.id === "contact");

/**
 * Phones and tablets: once the reader is past the hero, a thumb-reachable way to start a
 * project (and call, when a number is configured). It steps aside on the contact section,
 * where the form itself is the call to action.
 * Uses CSS transitions (not mount/unmount) so rapid toggling retargets instead of restarting.
 */
export default function MobileCta() {
  const active = useActiveChapter();
  const menuOpen = useStore(menuOpenStore);
  const visible = active >= 1 && active < CONTACT_INDEX && !menuOpen;
  const phone = SITE.phones[0];

  return (
    <div
      data-mobile-cta
      inert={!visible}
      aria-hidden={!visible}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <div
        className={`flex items-center gap-2 rounded-full border border-line-strong bg-ink/80 p-1.5 shadow-[0_18px_50px_-18px_rgb(0_0_0/0.9)] backdrop-blur-xl transition-[transform,opacity] ease-out ${
          visible ? "pointer-events-auto translate-y-0 opacity-100 duration-300" : "translate-y-[calc(100%+1.5rem)] opacity-0 duration-200"
        }`}
      >
        <a href="#contact" className="btn btn-primary btn-sm h-11 px-5">
          Start a project
          <ArrowSwap />
        </a>
        {phone && (
          <a
            href={phone.href}
            aria-label={`Call ${SITE.name} on ${phone.display}`}
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-fog transition-transform duration-150 ease-out active:scale-[0.95]"
          >
            <Phone size={17} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
