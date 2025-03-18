import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./index.css";
import MainSection from "./Components/MainSection";
import Features from "./Components/Features";
import Workflow from "./Components/Workflow";
import Footer from "./Components/Footer.jsx";
import Contact from "./Contact.jsx";
import Projects from "./Components/Projects.jsx";

function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {  // Ensure hash navigation works only on Home page
      const targetId = location.hash.replace("#", "");
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navbar = document.querySelector("nav");
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const yOffset = -navbarHeight - 20;

          const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 200);
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToSection />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Routes>
          {/* Home Page with all sections */}
          <Route
            path="/"
            element={
              <>
                <MainSection />
                <Features />
                <Workflow />
                <Projects />
                <Footer />
              </>
            }
          />
          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
