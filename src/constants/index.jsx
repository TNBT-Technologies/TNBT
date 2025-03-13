import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";
import React from "react";
import { Code2, MonitorSmartphone, LayoutDashboard, Rocket, Users, BarChart3 } from "lucide-react";
import { Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";


export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Projects", href: "#" },
];



export const features = [
  {
    icon: <Code2 />, 
    text: "Custom Web & App Development",
    description:
      "We build tailored websites and applications to meet your business needs, ensuring functionality and performance.",
  },
  {
    icon: <MonitorSmartphone />, 
    text: "Responsive & Multi-Platform Compatibility",
    description:
      "Our solutions work seamlessly across all devices—mobile, tablet, and desktop—for the best user experience.",
  },
  {
    icon: <LayoutDashboard />, 
    text: "Pre-Designed Templates & Custom UI",
    description:
      "Choose from modern, high-quality templates or get a fully customized UI design for your project.",
  },
  {
    icon: <Rocket />, 
    text: "Real-Time Updates & Fast Deployment",
    description:
      "Deploy your website or app quickly with real-time updates and ensure smooth, hassle-free maintenance.",
  },
  {
    icon: <Users />, 
    text: "Collaborative Project Management",
    description:
      "We work closely with clients, providing regular updates, revisions, and collaborative development processes.",
  },
  {
    icon: <BarChart3 />, 
    text: "Analytics & SEO Optimization",
    description:
      "Track user engagement, optimize SEO, and enhance performance with our built-in analytics tools.",
  },
];


export const checklistItems = [
  {
    title: "Seamless Code Integration",
    description:
      "Easily merge and integrate code across multiple development environments without conflicts.",
  },
  {
    title: "Effortless Code Review",
    description:
      "Streamline your code review process with automated tools and collaborative feedback systems.",
  },
  {
    title: "AI-Powered Development Assistance",
    description:
      "Accelerate coding and debugging with AI-driven suggestions, auto-completion, and optimizations.",
  },
  {
    title: "Quick and Secure Deployment",
    description:
      "Deploy your websites and apps with minimal downtime and maximum security in just a few clicks.",
  },
];


export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#features", text: "features" },
  { href: "#", text: "Documentation" },
  { href: "#workflow", text: "Workflow" },
  { href: "#projects", text: "Projects" },
 
];

export const contactLinks = [
  { href: "https://www.instagram.com/tnbt_technologies?igsh=Y3B2dDZoOTZxMHpx", text: "Instagram", icon: <Instagram size={12} /> },
  { href: "https://twitter.com", text: "Twitter", icon: <Twitter size={12} /> },
  { href: "https://www.linkedin.com", text: "LinkedIn", icon: <Linkedin size={12} /> },
  { text: "Email:tnbttechnologies@gmail.com", icon: <Mail size={12} /> },
  { text: "Phone: +917975402353 / +919686724126", icon: <Phone size={12} /> },
];

export const developmentLinks = [
  { text: "Projects" },
  { text: "Technologies" },
  { text: "Tools" },
  { text: "Best Practices" },
];
