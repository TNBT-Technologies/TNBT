import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import Footer from "./Components/Footer";

function Contact() {
  return (
    <div className="w-full">
      {/* Full-width Green Gradient Header */}
      <div className="w-full bg-gradient-to-r from-green-500 to-green-900 text-white py-12 md:py-24 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">Contact Us</h1>
        <div className="mt-2 md:mt-4 text-sm md:text-lg font-semibold">
          <Link to="/" className="text-gray-300 hover:text-white">
            HOME
          </Link>
          <span className="mx-1 md:mx-2">›</span>
          <span className="text-gray-200">CONTACT</span>
        </div>
      </div>

      {/* Contact Form and Social Media Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center py-12 px-4 space-y-8 md:space-y-0 md:space-x-12">
        {/* Left - Contact Info & Social Media */}
        <div className="w-full md:w-2/3 p-6 md:p-10 bg-white rounded-lg shadow-lg text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Just have a quick question?
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            We're here to help you achieve your business goals with our innovative IT solutions.
          </p>
          <p className="text-gray-700 mb-8 text-lg">
            Get in touch with us today and let's explore how we can drive your business forward together.
          </p>
          <div className="flex justify-center md:justify-start space-x-6">
            {[
              { Icon: FaFacebookF, link: "https://www.facebook.com" },
              { Icon: FaTwitter, link: "https://www.twitter.com" },
              { Icon: FaLinkedinIn, link: "https://www.linkedin.com" },
              {
                Icon: FaInstagram,
                link: "https://www.instagram.com/tnbt_technologies?igsh=Y3B2dDZoOTZxMHpx",
              },
            ].map(({ Icon, link }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 md:p-4 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-green-600 hover:text-white transition"
              >
                <Icon size={20} md:size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="w-full md:w-1/2 bg-white text-gray-900 p-6 md:p-8 rounded-lg shadow-lg">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">
            Get in Touch
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
            />
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
            <textarea
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              placeholder="Your message"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-800 text-white py-2 rounded-md hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Map and Contact Info Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center py-12 px-4 md:px-8 space-y-6 md:space-y-0 md:space-x-8">
        {/* Left - Google Map */}
        <div className="w-full md:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-64 md:h-96 border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.1860043838965!2d74.98949767484585!3d13.213635887124424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbb564091fc5f53%3A0x5817fb55eaca26b1!2sGandhi%20Maidana!5e0!3m2!1sen!2sin!4v1741580790140!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right - Contact Info */}
        <div className="w-full md:w-1/2 bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Contact Info
          </h2>
          <div className="space-y-4">
            {[
              [FaPhoneAlt, "+91-7975402353 / +91-9686724126"],
              [FaMapMarkerAlt, "Karkala, India"],
              [FaEnvelope, "tnbttechnologies@gmail.com"],
            ].map(([Icon, text], index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center justify-center md:justify-start space-x-3"
              >
                <Icon className="text-blue-500 text-lg md:text-xl" />
                <span className="font-medium text-gray-800">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Contact;
