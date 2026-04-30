# cv

Personal online resume — [alejandroiglesias.github.io/cv](https://alejandroiglesias.github.io/cv/)

---

## Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Build | Vite |
| Styles | Tailwind CSS v4 + semantic CSS tokens |
| Components | shadcn/ui (Radix primitives, copy-in owned) |
| Motion | Framer Motion (entrance fades, reduced-motion aware) |
| Fonts | Inter + Fraunces (self-hosted via @fontsource) |
| Icons | Inline SVGs (zero runtime) |
| Tests | Vitest + React Testing Library |
| Deploy | GitHub Actions → GitHub Pages |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173/cv/
```

---

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server with HMR at `/cv/` |
| `npm run build` | Type-check + Vite production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm test` | Run Vitest test suite |
| `npm run lint` | ESLint |

---

## Project structure

```
src/
├── data/resume.ts          # Single source of truth — all content lives here
├── types/resume.ts         # TypeScript types for resume data
├── components/
│   ├── ui/                 # shadcn-style primitives (Button, Badge, Collapsible)
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Role.tsx
│   ├── OlderRoles.tsx      # collapsible "Show more" for historical roles
│   ├── ContactList.tsx
│   ├── ObfuscatedEmail.tsx # anti-scraper email reveal
│   ├── ThemeToggle.tsx
│   └── Footer.tsx
├── hooks/
│   ├── useTheme.ts         # light/dark/system, persisted to localStorage
│   └── useReducedMotion.ts
├── lib/
│   ├── analytics.ts        # GA4, lazy-loaded after idle, DNT-aware
│   └/utils.ts             # cn() helper (clsx + tailwind-merge)
└── __tests__/
    ├── smoke.test.tsx
    ├── Experience.test.tsx
    └── ObfuscatedEmail.test.tsx
```

---

## Updating content

All resume content is typed and centralized in [`src/data/resume.ts`](src/data/resume.ts).

- **Add a new role**: append to the `roles` array. Set `featured: true` to show it by default, `false` to put it behind "Show more".
- **Update skills**: edit the `skills` array.
- **Update contacts**: edit the `contacts` array.

---

## Theming

Semantic CSS tokens in `src/index.css`. Both light and dark sets are defined — the active class is toggled on `<html>` by `useTheme`. No Tailwind config file needed (Tailwind v4 reads from `@theme inline` in the CSS).

---

## Deploy

Pushing to `main` triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`, which builds the site and deploys `dist/` to GitHub Pages via the [Actions + Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) integration.

**One-time GitHub setup** (already done): set Pages source to "GitHub Actions" in the repo Settings → Pages.

---

## PDF

A curated PDF lives at `public/alejandro-garcia-iglesias-cv.pdf` and is served at `/cv/alejandro-garcia-iglesias-cv.pdf`. The page also has `@media print` styles — print-to-PDF from the browser works as a fallback.

> Future improvement: generate the PDF at build time via Playwright so it's always in sync with the web content.
