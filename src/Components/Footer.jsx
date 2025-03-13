import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resourcesLinks, contactLinks, developmentLinks } from '../constants';

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(id);
      }, 500); // Delay for smooth transition
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

  const handleGoToHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 500); // Ensure smooth transition
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className='mt-20 border-t py-10 border-neutral-700 px-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

        {/* Resources Section */}
        <div>
          <h3 className='text-sm md:text-md font-semibold mb-4'>Resources</h3>
          <ul className='space-y-2'>
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                {link.text === "Documentation" ? (
                  <button
                    onClick={handleGoToHome}
                    className="text-neutral-300 hover:text-white text-sm md:text-md"
                  >
                    {link.text}
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick(link.href.replace("#", ""))}
                    className="text-neutral-300 hover:text-white text-sm md:text-md"
                  >
                    {link.text}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className='text-sm md:text-md font-semibold mb-4'>Contact us</h3>
          <ul className='space-y-2'>
            {contactLinks.map((link, index) => (
              <li key={index} className="flex items-center space-x-2">
                {link.icon}
                <a
                  className="text-neutral-300 hover:text-white no-underline decoration-none text-sm md:text-md"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Developments Section */}
        <div>
          <h3 className='text-sm md:text-md font-semibold mb-4'>Developments</h3>
          <ul className='space-y-2'>
            {developmentLinks.map((link, index) => (
              <li key={index} className="flex items-center space-x-2">
                {link.icon}
                <a
                  className="text-neutral-300 hover:text-white no-underline decoration-none text-sm md:text-md"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
