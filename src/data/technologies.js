import { asset } from "../lib/asset";

/**
 * Brand marks for the per-service "Typical stack" rows. They live in /public/tech as optimised SVGs
 * (Simple Icons + official Zoho product icons), so nothing is fetched from a third party at runtime.
 * `color` drives each logo's glow.
 */
const t = (id, name, file, color, short = name) => ({ id, name, short, src: asset(`tech/${file}.svg`), color });

export const TECH = Object.fromEntries(
  [
    t("react", "React", "react", "#61DAFB"),
    t("typescript", "TypeScript", "typescript", "#3178C6"),
    t("html5", "HTML5", "html5", "#E34F26"),
    t("css3", "CSS3", "css3", "#2179BA"),
    t("tailwindcss", "Tailwind CSS", "tailwindcss", "#06B6D4"),

    t("flutter", "Flutter", "flutter", "#54C5F8"),
    t("dart", "Dart", "dart", "#0175C2"),
    t("kotlin", "Kotlin", "kotlin", "#7F52FF"),
    t("android", "Android", "android", "#3DDC84"),
    t("ios", "iOS", "ios", "#EEF1EC"),

    t("nodejs", "Node.js", "nodejs", "#5FA04E"),
    t("express", "Express.js", "express", "#EEF1EC", "Express"),
    t("python", "Python", "python", "#3776AB"),
    t("php", "PHP", "php", "#777BB4"),

    t("postgresql", "PostgreSQL", "postgresql", "#4169E1"),
    t("mongodb", "MongoDB", "mongodb", "#47A248"),
    t("supabase", "Supabase", "supabase", "#3FCF8E"),
    t("firebase", "Firebase", "firebase", "#FF7A00"),
    t("neon", "Neon", "neon", "#34D59A"),

    t("zoho-creator", "Zoho Creator", "zoho-creator", "#E42527", "Creator"),
    t("zoho-crm", "Zoho CRM", "zoho-crm", "#2F8BD6", "CRM"),
    t("zoho-people", "Zoho People", "zoho-people", "#F9B21D", "People"),
    t("zoho-payroll", "Zoho Payroll", "zoho-payroll", "#F9B21D", "Payroll"),
    t("zoho-books", "Zoho Books", "zoho-books", "#3D8BD9", "Books"),
    t("zoho-inventory", "Zoho Inventory", "zoho-inventory", "#E42527", "Inventory"),
    t("zoho-flow", "Zoho Flow", "zoho-flow", "#2DB36B", "Flow"),
    t("deluge", "Deluge", "deluge", "#2DB36B"),

    t("vercel", "Vercel", "vercel", "#EEF1EC"),
    t("figma", "Figma", "figma", "#F24E1E"),
    t("gemini", "Google Gemini", "gemini", "#8E75B2", "Gemini"),
  ].map((item) => [item.id, item]),
);
