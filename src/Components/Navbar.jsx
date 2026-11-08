import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.png";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleNavbar = () => setMobileOpen((open) => !open);

  const handleNavClick = (id) => {
    setMobileOpen(false); // Close menu
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      scrollToSection(id);
    }
  };

  const scrollToSection = (id) => {
    setTimeout(() => {
      const targetElement = document.getElementById(id);
      if (!targetElement) return;

      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const yOffset = -navbarHeight - 20;

      const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 200);
  };

  const navigation = ["features", "workflow", "projects"];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#080d0b]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="TNBT Technologies home">
          <img className="h-10 w-10 rounded-xl object-contain" src={logo} alt="" />
          <span className="font-[Manrope] text-base font-bold tracking-tight sm:text-lg">
            TNBT <span className="text-[#8be28b]">Technologies</span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {navigation.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="text-sm font-medium capitalize text-neutral-300 transition-colors hover:text-[#a3efa3]"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="rounded-full border border-[#8be28b]/30 bg-[#8be28b]/10 px-5 py-2.5 text-sm font-semibold text-[#a3efa3] transition hover:border-[#8be28b]/60 hover:bg-[#8be28b]/15"
          >
            Let’s talk <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleNavbar}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          className="rounded-lg p-2 text-neutral-100 transition hover:bg-white/10 lg:hidden"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[#080d0b] px-6 pt-5 lg:hidden">
          <div className="flex h-[56px] items-center justify-between">
            <Link to="/" onClick={toggleNavbar} className="flex items-center gap-3">
              <img className="h-9 w-9 rounded-lg object-contain" src={logo} alt="" />
              <span className="font-[Manrope] font-bold">TNBT Technologies</span>
            </Link>
            <button
              type="button"
              onClick={toggleNavbar}
              aria-label="Close navigation menu"
              className="rounded-lg p-2 hover:bg-white/10"
            >
              <X size={23} />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-start justify-center gap-7">
            {navigation.map((item, index) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="font-[Manrope] text-4xl font-semibold capitalize tracking-tight text-white"
              >
                <span className="mr-3 text-base font-medium text-[#8be28b]">0{index + 1}</span>
                {item}
              </button>
            ))}
            <Link
              to="/contact"
              onClick={toggleNavbar}
              className="mt-3 rounded-full bg-[#8be28b] px-6 py-3 font-semibold text-[#081109]"
            >
              Let’s talk <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="pb-8 text-sm text-neutral-500">Thoughtful digital experiences, built together.</p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
