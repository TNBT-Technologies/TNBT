# TNBT Technologies — website

Marketing site for TNBT Technologies, a software development studio (web, mobile, Zoho, AI and automation) based in Udupi and Bengaluru.

Built with **React 19 + Vite 6**, **Tailwind CSS v4**, **framer-motion** and **Lenis** smooth scrolling. The particle background is hand-written WebGL (no three.js).

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build
npm run lint
```

> If your shell has `NODE_ENV=production` set, run `npm install --include=dev` so Vite and the build plugins are installed.

## Editing content

All copy lives in `src/data/` — no component changes needed for routine edits.

| File | What it controls |
| --- | --- |
| `site.js` | Company name, email, phone numbers, social links, locations, chapter/nav order |
| `services.js` | The six services, their capabilities, stacks, and the contact-form project types & budgets |
| `technologies.js` | Logos shown in each service's "Typical stack" |
| `process.js` | The six delivery stages |

Remove a phone number or social link from `site.js` and it disappears everywhere it's shown.

## Contact form

The form validates input, shows loading/success/error states, and is spam-protected with a honeypot field.

- **Default (no setup):** submitting opens the visitor's email app with the brief pre-filled, addressed to the email in `site.js`.
- **Direct delivery:** copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT` to any endpoint that accepts a JSON `POST` — e.g. a [Formspree](https://formspree.io) form URL or your own API route. Rebuild after changing it. Form endpoint URLs are public by design; never put secret keys in `VITE_*` variables.

## Service stack logos

Each service lists its typical stack with real brand logos, stored as optimised SVGs in `public/tech/` and served locally — nothing is fetched from third parties at runtime.

- Most marks come from [Simple Icons](https://simpleicons.org) (v16; the classic CSS3 shield from v13), recoloured with each brand's colour. Brands whose colour is black (Express, Vercel, Apple) use their light variant so they read on the dark theme.
- Zoho Creator, CRM, People, Payroll, Books, Inventory, Flow and Deluge use Zoho's official product icons (from zoho.com), cropped to the icon without the wordmark.

All brand marks are trademarks of their respective owners and are used only to indicate the technologies we work with.

## How the site is put together

```
src/
  App.jsx                    page composition, deep links (#hash and legacy /contact)
  index.css                  design tokens (@theme), base styles, component classes
  data/                      content (see above)
  lib/                       scroll (Lenis), chapter tracking, contact delivery, shared stores, motion tokens
  hooks/                     media queries, smooth scrolling
  components/
    assembly/                the "Assembly" signature: WebGL particle field, formations, atmosphere, chapter HUD
    layout/                  navbar, footer, floating mobile CTA, brand mark
    ui/                      reveals, buttons, magnetic wrapper, custom cursor, logo lens, section heading
  sections/                  Hero, CapabilityBand, Services, About, Process, Contact
```

**Signature interaction — "Assembly":** ~2.6k–6.5k particles rebuild themselves for each chapter as you scroll — an idea-cloud (hero) → blueprint lattice (services) → wave (about) → helix (process) → converging core (contact). The cursor parts the particles in the hero, and a chapter readout in the desktop gutter names the current formation.

Chapters are defined once in `CHAPTERS` (`src/data/site.js`): the navigation, chapter readout, background tints, particle formations and the generated WebGL shader all follow that list. To add or remove a section, update `CHAPTERS` and give the section an element with the matching `id`.

**Motion & accessibility:** custom easing curves (`--ease-out`, `--ease-in-out`, `--ease-drawer`), transform/opacity-only animation, hover effects gated to mouse/trackpad. `prefers-reduced-motion` turns off smooth scrolling, the custom cursor, magnetic buttons, the capability marquee and the pinned horizontal process section, and freezes the particle field. If WebGL isn't available, the site falls back to the CSS atmosphere.

## Deploying

- **Any static host at the domain root** (Vercel, Netlify, Cloudflare Pages, Render): build command `npm run build`, output directory `dist`.
- **GitHub Pages** (`https://TNBT-Technologies.github.io/TNBT`): `npm run deploy` builds with the `/TNBT/` base path and publishes `dist` with `gh-pages`.
