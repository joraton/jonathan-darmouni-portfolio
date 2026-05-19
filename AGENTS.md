# AGENTS.md

## Project

One-page portfolio for Jonathan Darmouni, built to sell freelance missions around AI-powered business automations with simple webapp interfaces.

The site should feel dark, premium, cinematic, and business-oriented. Keep the hero video from `prompt.md` as the main visual signature.

## Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS 3
- Framer Motion
- lucide-react

## Commands

- Install dependencies: `npm install`
- Start local dev server: `npm run dev -- --host 127.0.0.1`
- Production build: `npm run build`
- Preview build: `npm run preview`

Always run `npm run build` after code changes.

## Content Direction

Primary positioning:

> J'automatise vos process metier avec des webapps IA simples a utiliser.

Main audience:

- PME owners
- Business leaders
- Teams with repetitive admin, finance, document, reporting, or client-follow-up processes

Primary CTA:

- "Prendre un appel"
- Current placeholder is `https://calendly.com/`
- Preferred future target: Google Calendar appointment booking link

Do not show public pricing unless explicitly requested.

## Visual Direction

Use the direction from `prompt.md`:

- Black background
- Warm cream text
- Charcoal cards
- Subtle teal/accent highlights for automation/AI
- Cinematic hero with inset rounded video container
- Noise overlays and soft gradients
- Large but readable typography

Avoid:

- Generic SaaS landing-page look
- Overly colorful gradients
- Marketing-heavy hero copy
- Decorative cards inside cards
- Text overlap on mobile

## Key Files

- `src/App.tsx`: all page components and content
- `src/index.css`: Tailwind setup, global fonts, noise utilities
- `tailwind.config.js`: theme extensions
- `index.html`: Google Fonts and metadata

## Important Implementation Notes

- The hero video URL is stored in `heroVideoUrl` in `src/App.tsx`.
- The hero uses `SmoothLoopVideo`, which crossfades between two video elements to make the loop feel smoother.
- The navbar order should stay:
  - Profil
  - Methode
  - Realisations
  - Contact
- The "Offre" link was intentionally removed from the navbar.
- Keep the section anchors working:
  - `#profil`
  - `#methode`
  - `#realisations`
  - `#contact`

## Case Studies

Current case studies:

- Swipe it
- nevos.fr
- intheboxparis.com
- Conseiller de plateforme agreee
- Relances factures impayees

Do not invent precise metrics for projects unless provided by Jonathan or verifiable from a public source.

Swipe it can mention public App Store proof:

- iOS utility app
- 5.0 rating
- 9 ratings
- version 3.0 published March 16
- URL: `https://apps.apple.com/fr/app/swipe-it-photo-cleaner/id6756235144`

## Style Constraints

- Keep copy in French.
- Use clear business language.
- Prefer concise, concrete claims.
- Keep UI responsive across mobile and desktop.
- Preserve accessibility basics: real links, readable contrast, labels for icon-only links.

## Before Finishing

Run:

```bash
npm run build
```

If changing layout or hero behavior, also check visually at mobile and desktop widths.
