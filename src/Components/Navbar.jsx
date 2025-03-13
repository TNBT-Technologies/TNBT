import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.png";

function Navbar({ onNavClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (id) => {
    setMobileOpen(false); // Close menu
    if (onNavClick) onNavClick(); // Close PDF if open

    if (location.pathname !== "/") {
      navigate("/"); // Navigate to home first
      setTimeout(() => {
        scrollToSection(id);
      }, 500); // Wait for navigation to complete
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

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-800">
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img className="h-[50px] w-[50px] mr-3" src={logo} alt="logo" />
          <span className="text-lg font-bold tracking-tight">TNBT Technologies</span>
        </div>

        {/* Centered Navigation Items (Desktop) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-12">
          {["features", "workflow", "projects"].map((item) => (
            <button key={item} onClick={() => handleNavClick(item)} className="hover:text-green-500">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* Contact Us Button (Desktop) */}
        <div className="hidden lg:flex">
          <Link to="/contact" className="bg-gradient-to-r from-green-500 to-green-900 py-2 px-3 rounded-md text-white font-semibold">
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleNavbar} className="text-white focus:outline-none">
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-neutral-900 text-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ height: "100vh", width: "100vw" }}
      >
        <button onClick={toggleNavbar} className="absolute top-6 right-6">
          <X size={32} />
        </button>

        <ul className="text-center space-y-6 text-xl font-semibold">
          {["features", "workflow", "projects"].map((item) => (
            <li key={item}>
              <button onClick={() => handleNavClick(item)} className="hover:text-green-500">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Contact Us Button in Mobile View */}
        <Link
          to="/contact"
          onClick={toggleNavbar}
          className="mt-8 bg-gradient-to-r from-green-500 to-green-900 py-3 px-6 rounded-md text-white font-semibold"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
