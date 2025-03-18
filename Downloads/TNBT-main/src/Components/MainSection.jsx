import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import { X } from "lucide-react";

function MainSection() {
  const [showPDF, setShowPDF] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pdfURL = "/Quotation_tnbttechnologies.pdf";

  useEffect(() => {
    // Detect if the user is on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent background scrolling when PDF is open
  useEffect(() => {
    if (showPDF) {
      document.body.style.overflow = "hidden"; // Disable background scrolling
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup function
    };
  }, [showPDF]);

  return (
    <div className="relative flex flex-col items-center mt-[-3rem] sm:mt-[-2rem] lg:mt-10">
      {/* Background Content Wrapper */}
      <div
        className={`transition-all duration-500 w-full flex flex-col items-center ${
          showPDF ? "blur-md" : ""
        }`}
      >
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-6xl text-center tracking-wide !text-inherit">
          TNBT Technologies builds softwares
          <span className="bg-gradient-to-r from-green-500 to-green-900 bg-clip-text text-transparent">
            {" "}
            for clients
          </span>
        </h1>

        {/* Description */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-center text-neutral-500 max-w-4xl px-2 sm:px-0">
          At TNBT Technologies, we build high-quality websites and apps
          tailored to your business needs. Our team focuses on sleek design,
          seamless functionality, and scalable solutions to help you grow
          online. Let’s turn your ideas into reality with cutting-edge
          technology and innovation!
        </p>

        {/* Documentation Button */}
        <div className="flex justify-center my-6 sm:my-10">
          {isMobile ? (
            <a
              href={pdfURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-800 py-2 sm:py-3 px-3 sm:px-4 mx-2 sm:mx-3 rounded-md text-white font-semibold hover:scale-105 transition-all duration-300"
            >
              Documentation
            </a>
          ) : (
            <button
              onClick={() => setShowPDF(true)}
              className="bg-gradient-to-r from-green-500 to-green-800 py-2 sm:py-3 px-3 sm:px-4 mx-2 sm:mx-3 rounded-md text-white font-semibold hover:scale-105 transition-all duration-300"
            >
              Documentation
            </button>
          )}
        </div>

        {/* Video Section */}
        <div className="flex flex-col sm:flex-row mt-6 sm:mt-10 justify-center w-full max-w-5xl space-y-4 sm:space-y-0">
          <video
            autoPlay
            loop
            muted
            className="rounded-lg w-[90%] sm:w-1/2 border border-green-800 shadow-green-800 mx-auto sm:mx-2"
          >
            <source src={video1} type="video/mp4"></source>
            Your browser does not support the video tag.
          </video>

          <video
            autoPlay
            loop
            muted
            className="rounded-lg w-[90%] sm:w-1/2 border border-green-800 shadow-green-800 mx-auto sm:mx-2"
          >
            <source src={video2} type="video/mp4"></source>
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* PDF Viewer (Only shows when button is clicked) */}
      <AnimatePresence>
        {showPDF && !isMobile && (
          <>
            {/* Background Overlay with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md"
            />

            {/* PDF Viewer */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex flex-col items-center justify-center p-4 sm:p-10"
            >
              {/* 🔹 Responsive PDF Embed */}
              <div className="w-full max-w-4xl h-[80vh] sm:h-[90vh] bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src={pdfURL}
                  className="w-full h-full"
                  style={{ minHeight: "500px" }}
                  onError={(e) => console.error("PDF failed to load:", e)}
                  title="Quotation PDF"
                ></iframe>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-5">
                <a
                  href={pdfURL}
                  className="bg-gradient-to-r from-green-500 to-green-800 py-2 sm:py-3 px-4 rounded-md text-white font-semibold hover:scale-105 transition-all duration-300"
                  download
                >
                  Download Document
                </a>
                <button
                  onClick={() => setShowPDF(false)}
                  className="text-white font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <X size={20} /> {/* Cross Icon */}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainSection;
