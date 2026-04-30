# PRODUCT.md — Alejandro García Iglesias · CV Site

## Product Purpose

A personal CV/resume site that IS the portfolio piece. Recruiters and hiring managers inspect the source, run Lighthouse, and judge the stack as evidence of senior frontend taste. Every design decision signals engineering judgment.

## Users

**Primary**: Engineering managers, tech leads, and recruiters at product companies evaluating Alejandro for Senior Frontend Engineer or Frontend Lead roles. They spend 30–90 seconds scanning; they also open DevTools.

**Secondary**: Peers and collaborators in the frontend/product community.

## Brand

Warm, confident, and precise. "Canva meets rauchg" — friendly and human, but technically rigorous underneath. Not formal, not playful. The voice is direct: no buzzwords, no superlatives.

**Anti-references**: generic SaaS cream/blue developer portfolios, dark glassmorphism show-off sites, over-animated agency sites.

## Tone

Confident without being boastful. Specific. Warm. Unhurried.

## Stack (for AI slop check)

React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui + Framer Motion. Deployed on GitHub Pages at `/cv/`. Vite SPA. No framework overhead.

## Register

brand — the site itself is the product and the portfolio piece.

## Design Principles

- Lighthouse 100s are acceptance criteria, not aspirations
- Single-column, mobile-first, max-w-3xl content width
- Warm neutral base (off-white) + single warm coral accent (`--accent`)
- Source Serif 4 Variable at weight 650 for display headings; Inter for body
- Light + dark + system theming, persisted via localStorage
- Print stylesheet ships alongside the static PDF
- Tasteful Framer Motion entrance animations; prefers-reduced-motion respected
