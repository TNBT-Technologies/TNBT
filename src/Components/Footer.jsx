import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "/logo.png";

const sectionLinks = [
  { label: "What we do", href: "/#features" },
  { label: "How we work", href: "/#workflow" },
  { label: "Selected work", href: "/#projects" },
];

function Footer() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:gap-16">
          <div>
            <Link to="/" className="inline-flex items-center gap-3" aria-label="TNBT Technologies home">
              <img src={logo} alt="" className="h-10 w-10 rounded-xl object-contain" />
              <span className="font-[Manrope] font-bold text-white">TNBT Technologies</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-400">
              Thoughtful digital experiences, built together. Let’s make something that matters.
            </p>
            <a
              href="https://www.instagram.com/tnbt_technologies?igsh=Y3B2dDZoOTZxMHpx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit TNBT Technologies on Instagram"
              className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition hover:border-[#8be28b]/30 hover:text-[#a3efa3]"
            >
              <Instagram size={17} />
            </a>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">Explore</h2>
            <ul className="space-y-3">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-neutral-300 transition hover:text-[#a3efa3]">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" className="text-sm text-neutral-300 transition hover:text-[#a3efa3]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">Say hello</h2>
            <ul className="space-y-3">
              <li>
                <a href="mailto:tnbttechnologies@gmail.com" className="flex items-center gap-3 text-sm text-neutral-300 transition hover:text-[#a3efa3]">
                  <Mail size={15} className="shrink-0 text-[#8be28b]" />
                  tnbttechnologies@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+917975402353" className="flex items-center gap-3 text-sm text-neutral-300 transition hover:text-[#a3efa3]">
                  <Phone size={15} className="shrink-0 text-[#8be28b]" />
                  +91 79754 02353
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-400">
                <MapPin size={15} className="shrink-0 text-[#8be28b]" />
                Karkala, India
              </li>
            </ul>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#9bea9b] hover:text-white">
              Get in touch <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/[0.07] pt-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} TNBT Technologies. All rights reserved.</span>
          <span>Built with care in India.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
