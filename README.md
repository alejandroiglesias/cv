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
| `npm run build` | Type-check + Vite build + automatic PDF generation → `dist/` |
| `npm run build:web` | Type-check + Vite production build without regenerating PDFs |
| `npm run pdf:generate` | Regenerate the canonical PDFs from an existing production build |
| `npm run preview` | Preview production build locally |
| `npm test` | Run Vitest test suite |
| `npm run lint` | ESLint |

---

## Project structure

```
src/
├── data/general-resume.ts  # General CV and shared factual work history
├── data/resumes.ts         # URL-to-variant registry and aliases
├── data/technical-project-ai-systems-resume.ts
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

Shared factual content is centralized in [`src/data/general-resume.ts`](src/data/general-resume.ts). Targeted variants reuse General-owned facts and may override them for role-specific positioning, ordering, and supported wording without changing historical identity.

- **Add a new role**: append to the `roles` array. Set `featured: true` to show it by default, `false` to put it behind "Show more".
- **Update skills**: edit the `skills` array.
- **Update contacts**: edit the `contacts` array.
- **Update a role-specific variant**: edit the corresponding module (`frontend-resume.ts`, `product-resume.ts`, `applied-ai-resume.ts`, `applied-ai-es-resume.ts`, or `technical-project-ai-systems-resume.ts`).
- **Add a new web variant**: register its data in `src/data/resumes.ts` and add a static HTML entry to Vite so direct GitHub Pages URLs resolve correctly.

---

## Theming

Semantic CSS tokens in `src/index.css`. Both light and dark sets are defined — the active class is toggled on `<html>` by `useTheme`. No Tailwind config file needed (Tailwind v4 reads from `@theme inline` in the CSS).

---

## Deploy

Pushing to `main` triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`, which builds the site and deploys `dist/` to GitHub Pages via the [Actions + Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) integration.

**One-time GitHub setup** (already done): set Pages source to "GitHub Actions" in the repo Settings → Pages.

The canonical resume pages use `index, follow`, self-referencing canonical URLs, and are listed in `public/sitemap.xml`:

- General: `/cv/`
- Frontend: `/cv/frontend/`
- Product: `/cv/product/`
- Applied AI: `/cv/ai/`
- Applied AI (Spanish): `/cv/ai/es/`
- Technical Product / AI Systems / Delivery: `/cv/tpm/`

The `/cv/general/` path is a root-canonical alias. The legacy `/cv/technical-project-ai-systems/` path also points canonically to `/cv/tpm/`; aliases are intentionally excluded from the sitemap. Because this project is hosted below `/cv/`, an effective `robots.txt` would need to be published by the root `alejandroiglesias.github.io` site rather than this repository.

---

## PDFs

The canonical PDFs are generated automatically during `npm run build` and committed under `public/`:

- General CV: `alejandro-garcia-iglesias-general-cv.pdf`
- Frontend CV: `alejandro-garcia-iglesias-frontend-engineer-cv.pdf`
- Product Engineer: `alejandro-garcia-iglesias-product-engineer-cv.pdf`
- Applied AI: `alejandro-garcia-iglesias-applied-ai-cv.pdf`
- Applied AI (Spanish): `alejandro-garcia-iglesias-applied-ai-es-cv.pdf`
- Technical Project Manager: `alejandro-garcia-iglesias-technical-project-manager-cv.pdf`

The legacy filename `alejandro-garcia-iglesias-technical-project-ai-systems-cv.pdf` remains available as a byte-identical copy of the Technical Project Manager PDF in both `public/` and `dist/`; it is not printed separately.

The generator builds the site, serves `dist/` locally, and uses Chrome's native headless print-to-PDF support. It detects Google Chrome on macOS and common Chrome/Chromium locations on Linux; set `CHROME_PATH` when the executable lives elsewhere. Generated files are written to both `public/` and `dist/` so the committed assets and deployment artifact stay in sync.
