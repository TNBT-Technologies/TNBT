import { useState } from "react";
import { ArrowRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Components/Footer";

const emailAddress = "tnbttechnologies@gmail.com";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(88,158,91,0.2),_transparent_62%)]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
          <div className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
            <Link to="/" className="transition hover:text-[#a3efa3]">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-300">Contact</span>
          </div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#8be28b]">Your next idea starts here</p>
          <h1 className="max-w-3xl font-[Manrope] text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-6xl">
            Let’s build something{" "}
            <span className="text-[#8be28b]">good together.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg">
            Tell us what you have in mind. We’ll get back to you and figure out the best next step.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        <div className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#0c120f] p-6 sm:p-8 lg:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8be28b]">Get in touch</p>
            <h2 className="mt-3 font-[Manrope] text-2xl font-semibold text-white sm:text-3xl">We’d love to hear from you.</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-400">
              Have a project in mind, a question, or just want to say hello? Our team is happy to help.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <a href="mailto:tnbttechnologies@gmail.com" className="group flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#8be28b]/15 bg-[#8be28b]/[0.07] text-[#9bea9b]">
                <Mail size={18} />
              </span>
              <span>
                <span className="block text-xs text-neutral-500">Email us</span>
                <span className="text-sm font-medium text-neutral-200 transition group-hover:text-[#a3efa3]">tnbttechnologies@gmail.com</span>
              </span>
            </a>
            <a href="tel:+917975402353" className="group flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#8be28b]/15 bg-[#8be28b]/[0.07] text-[#9bea9b]">
                <Phone size={18} />
              </span>
              <span>
                <span className="block text-xs text-neutral-500">Call us</span>
                <span className="text-sm font-medium text-neutral-200 transition group-hover:text-[#a3efa3]">+91 79754 02353 / +91 96867 24126</span>
              </span>
            </a>
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#8be28b]/15 bg-[#8be28b]/[0.07] text-[#9bea9b]">
                <MapPin size={18} />
              </span>
              <span>
                <span className="block text-xs text-neutral-500">Find us</span>
                <span className="text-sm font-medium text-neutral-200">Karkala, India</span>
              </span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-6 sm:mt-10">
            <span className="text-sm text-neutral-400">Follow our work</span>
            <a
              href="https://www.instagram.com/tnbt_technologies?igsh=Y3B2dDZoOTZxMHpx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit TNBT Technologies on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition hover:border-[#8be28b]/30 hover:text-[#a3efa3]"
            >
              <Instagram size={17} />
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0c120f] p-6 sm:p-8 lg:p-10">
          <h2 className="font-[Manrope] text-xl font-semibold text-white sm:text-2xl">Tell us about your project</h2>
          <p className="mt-2 text-sm text-neutral-400">A few details are all we need to get started.</p>
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-neutral-300">
                Your name
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Jane Smith"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#080d0b] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition focus:border-[#8be28b]/50 focus:outline-none focus:ring-2 focus:ring-[#8be28b]/10"
                />
              </label>
              <label className="block text-sm font-medium text-neutral-300">
                Email address
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#080d0b] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition focus:border-[#8be28b]/50 focus:outline-none focus:ring-2 focus:ring-[#8be28b]/10"
                />
              </label>
            </div>
            <label className="block text-sm font-medium text-neutral-300">
              What can we help with?
              <textarea
                name="message"
                rows="5"
                required
                placeholder="Tell us a little about your idea, goals, or timeline..."
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#080d0b] px-4 py-3 text-sm leading-6 text-white placeholder:text-neutral-600 transition focus:border-[#8be28b]/50 focus:outline-none focus:ring-2 focus:ring-[#8be28b]/10"
              />
            </label>
            <button
              type="submit"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#8be28b] px-6 font-semibold text-[#071008] transition hover:bg-[#a4efa1] sm:w-auto"
            >
              Send your message
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p aria-live="polite" className="text-xs leading-5 text-neutral-500">
              {submitted
                ? "Your email app should open with your message ready to send."
                : "This will open your email app with your message pre-filled."}
            </p>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c120f]">
          <div className="flex flex-col justify-between gap-2 border-b border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2 className="font-[Manrope] font-semibold text-white">Visit us in Karkala</h2>
              <p className="mt-1 text-sm text-neutral-500">Karnataka, India</p>
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#9bea9b]">
              <MapPin size={14} /> Karkala, India
            </span>
          </div>
          <iframe
            className="h-64 w-full border-0 sm:h-80"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.1860043838965!2d74.98949767484585!3d13.213635887124424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbb564091fc5f53%3A0x5817fb55eaca26b1!2sGandhi%20Maidana!5e0!3m2!1sen!2sin!4v1741580790140!5m2!1sen!2sin"
            title="Map showing TNBT Technologies in Karkala, India"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
