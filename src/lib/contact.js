import { SITE } from "../data/site";

/**
 * Contact form delivery.
 *
 * Set VITE_CONTACT_ENDPOINT (see .env.example) to any endpoint that accepts a JSON POST —
 * e.g. a Formspree form URL or your own API route. Without it, the form falls back to
 * opening the visitor's email app with the brief pre-filled, so it is never a dead end.
 * No secrets live in the frontend: endpoint URLs like Formspree's are public by design.
 */
const ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT || "").trim();

export const contactMode = ENDPOINT ? "endpoint" : "email";

export function buildMailto(brief) {
  const lines = [`Name: ${brief.name}`, `Email: ${brief.email}`];
  if (brief.phone) lines.push(`Phone: ${brief.phone}`);
  lines.push(`Project type: ${brief.projectType}`);
  if (brief.budget) lines.push(`Budget: ${brief.budget}`);
  lines.push("", brief.message);

  const subject = `Project brief: ${brief.projectType} — ${brief.name}`;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export async function submitBrief(brief) {
  if (!ENDPOINT) {
    window.location.href = buildMailto(brief);
    return { mode: "email" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...brief, _subject: `New project brief from ${brief.name}`, _replyto: brief.email }),
      signal: controller.signal,
    });
    if (!res.ok) {
      let message = "";
      try {
        const data = await res.json();
        message = data?.errors?.[0]?.message || data?.error || data?.message || "";
      } catch {
        /* non-JSON error body */
      }
      throw new Error(message || `The server responded with ${res.status}.`);
    }
    return { mode: "endpoint" };
  } catch (err) {
    if (err.name === "AbortError") throw new Error("The request timed out. Please try again.");
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
