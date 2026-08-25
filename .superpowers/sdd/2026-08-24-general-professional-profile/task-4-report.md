# Task 4 local QA report

Date: 2026-08-24
Branch: `codex/general-professional-profile`
Commit: `99992c2` (`fix: harden responsive and print CV layouts`)

## Scope

This report covers local verification and fixes for the General CV implementation. No LinkedIn changes, GitHub pushes, merges, or production publication were performed in this worktree.

## Findings and fixes

1. The first fresh PDF generation produced a four-page General PDF with an almost empty page 3. The existing forced Mapme page break was preserved; print-only experience line-height was tightened to `1.25` so BairesDev finishes before the explicit break. Regenerated General PDF is now three pages with no blank page.
2. A 390px browser capture showed contact items forcing an oversized flex min-content width and clipping long labels. Contact items now use constrained, wrapping flex children (`w-full min-w-0`, `sm:w-auto`, and `min-w-0` links). Exact emulated 390px metrics now report `innerWidth=390`, `body.scrollWidth=390`, `documentElement.scrollWidth=390`, `main=390`, and contact/About widths of `342`.

## Automated evidence

Commands run from the feature worktree:

```text
npm test                         PASS — 5 files, 41 tests
npm run lint                     PASS — exit 0
npm run build:web                PASS — TypeScript and Vite build exit 0
npm run build                    PASS — web build plus five canonical PDF generations and legacy TPM copy
git diff --check                 PASS — no output
```

The initial unprivileged `npm run build` stopped at the preview server bind with `listen EPERM 127.0.0.1`; rerunning the same command with the approved local-server permission completed successfully.

## Route and metadata evidence

The local production preview returned HTTP 200 and the expected title for all routes:

```text
/cv/          Alejandro García Iglesias · Senior Software Engineer
/cv/general/  Alejandro García Iglesias · Senior Software Engineer
/cv/frontend/ Alejandro García Iglesias · Senior Frontend Engineer
/cv/product/  Alejandro García Iglesias · Senior Product Engineer
/cv/ai/       Alejandro García Iglesias · Senior Software Engineer — Applied AI
/cv/tpm/      Alejandro García Iglesias · Senior Software Engineer
```

Built canonical metadata:

```text
dist/index.html           https://alejandroiglesias.github.io/cv/
dist/general/index.html   https://alejandroiglesias.github.io/cv/
dist/frontend/index.html  https://alejandroiglesias.github.io/cv/frontend/
dist/product/index.html   https://alejandroiglesias.github.io/cv/product/
dist/ai/index.html        https://alejandroiglesias.github.io/cv/ai/
dist/tpm/index.html       https://alejandroiglesias.github.io/cv/tpm/
```

`public/sitemap.xml` contains the five canonical pages and excludes `/general/`.

## Browser and interaction evidence

- Desktop screenshot captured at 1440×1000 from `/cv/`; General title, subtitle, contacts, PDF CTA, About, and interests are visible in the existing visual system.
- Mobile screenshot captured at 390×844 from `/cv/`; after the contact wrapping fix, contacts stack within the viewport and no horizontal overflow is present in exact emulated metrics.
- Browser interaction check: the four earlier roles are absent before interaction, appear after clicking `Show 4 earlier full-stack roles`, and disappear again after clicking the collapse control.
- Root and General alias both resolve to General; Frontend route remains distinct by title and generated first-page visual inspection.

## PDF evidence

`pdfinfo` reports three pages for every generated PDF:

```text
alejandro-garcia-iglesias-general-cv.pdf                 3
alejandro-garcia-iglesias-frontend-engineer-cv.pdf       3
alejandro-garcia-iglesias-product-engineer-cv.pdf        3
alejandro-garcia-iglesias-applied-ai-cv.pdf              3
alejandro-garcia-iglesias-technical-project-manager-cv.pdf 3
alejandro-garcia-iglesias-technical-project-ai-systems-cv.pdf 3
```

All three General PDF pages were rendered to PNG and inspected. Page 1 contains the General header/About/skills; page 2 contains current role, Rotunda, and BairesDev; page 3 contains Mapme, Deviget, Vulsai, compact earlier-experience summary, and LinkedIn pointer. No interactive web controls appear in the print output. The Frontend PDF first page was also rendered and remains Frontend-specific.

## Content-boundary evidence

Scans over recruiter-facing source and built General HTML found no `Ground`, `Quorum`, or `TuLanding` names. The General source contains no `model training`, `production AI`, `validated quality`, or commercial-adoption claims. Shared role data still contains exactly the four collapsed companies: Yanma Solutions, Freelance, 2mas2 Interactive, and Syxmedia; `Independent Contractor` is absent.

## Status

Local implementation QA: PASS after commit `99992c2`.

Unverified in this task: live LinkedIn persistence, final LinkedIn narrative comparison, GitHub Pages deployment, production URLs, and whole-change external review. These require the parent task's authorized external workflow.
