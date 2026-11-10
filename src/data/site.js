/**
 * Company details. Anything left empty here is hidden from the site
 * (e.g. remove a phone number or social link and it disappears everywhere).
 */
export const SITE = {
  name: "TNBT Technologies",
  shortName: "TNBT",
  tagline: "Turning ideas into digital experiences.",
  description:
    "A software development studio building websites, mobile apps and business automation for growing teams. Based in Udupi and Bengaluru, India.",
  email: "tnbttechnologies@gmail.com",
  phones: [
    { display: "+91 79754 02353", href: "tel:+917975402353" },
    { display: "+91 96867 24126", href: "tel:+919686724126" },
  ],
  socials: [{ label: "Instagram", handle: "@tnbt_technologies", href: "https://www.instagram.com/tnbt_technologies" }],
  locations: [
    { id: "udupi", city: "Udupi", region: "Karnataka, India", query: "Udupi, Karnataka, India" },
    { id: "bengaluru", city: "Bengaluru", region: "Karnataka, India", query: "Bengaluru, Karnataka, India" },
  ],
};

/**
 * Page chapters, in scroll order. Each one drives a particle formation,
 * an atmosphere tint and the chapter readout.
 */
export const CHAPTERS = [
  { id: "home", label: "Home", formation: "Nebula" },
  { id: "services", label: "Services", formation: "Lattice" },
  { id: "about", label: "About", formation: "Wave" },
  { id: "process", label: "Process", formation: "Helix" },
  { id: "contact", label: "Contact", formation: "Core" },
];

export const NAV_LINKS = CHAPTERS.map(({ id, label }) => ({ id, label }));
