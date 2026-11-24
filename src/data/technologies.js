import { asset } from "../lib/asset";

/**
 * Brand marks for the per-service "Typical stack" rows. They live in /public/tech as optimised SVGs
 * (from Simple Icons), so nothing is fetched from a third party at runtime.
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

    t("vercel", "Vercel", "vercel", "#EEF1EC"),
    t("figma", "Figma", "figma", "#F24E1E"),
    t("gemini", "Google Gemini", "gemini", "#8E75B2", "Gemini"),

    t("latex", "LaTeX", "latex", "#00A3A3"),
    t("overleaf", "Overleaf", "overleaf", "#47A141"),
    t("zotero", "Zotero", "zotero", "#D13E4A"),
    t("mendeley", "Mendeley", "mendeley", "#B65058"),
    t("googlescholar", "Google Scholar", "googlescholar", "#4285F4", "Scholar"),
    t("markdown", "Markdown", "markdown", "#EEF1EC"),
    t("swagger", "Swagger", "swagger", "#85EA2D"),
  ].map((item) => [item.id, item]),
);
