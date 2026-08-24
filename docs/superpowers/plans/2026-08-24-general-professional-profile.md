# General Professional Profile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a canonical General CV built from a general shared-data base and update LinkedIn to the same Senior Software Engineer narrative.

**Architecture:** `general-resume.ts` will own the complete factual employment history, shared contacts, and General CV, while the four targeted variants import those facts and override only their editorial angle. `/cv/` will render General canonically, `/cv/general/` will be a non-redirecting alias, and each targeted route will remain canonical to itself. LinkedIn will use the same approved hierarchy in a richer form and add the missing Apr 2026–Present role.

**Tech Stack:** React 19, TypeScript 6, Vite 8 multi-page build, Vitest, React Testing Library, Tailwind CSS 4, Chrome print-to-PDF, GitHub Pages, LinkedIn via Computer Use.

## Global Constraints

- Position Alejandro first as **Senior Software Engineer**, then deep Frontend + Product Engineering experience, then current Applied AI specialization.
- Preserve all supported companies, historical titles, dates, locations, technologies, responsibilities, and status boundaries.
- Do not name Ground, Quorum, or TuLanding in General CV or LinkedIn copy.
- Do not imply ML research, model training, production AI success, commercial maturity, adoption, or validated quality improvement.
- Current role is exactly **Independent Product R&D & AI Consulting** / **Senior Software Engineer — Product & Applied AI** / **Apr 2026 – Present**.
- The four collapsed website roles remain Yanma Solutions, Freelance, 2mas2 Interactive, and Syxmedia.
- `/cv/` is the General canonical; `/cv/general/` renders General as an alias with canonical `/cv/`; `/cv/frontend/` is the Frontend canonical.
- Preserve the existing layout, typography, responsive behavior, animation/reduced-motion behavior, component architecture, and print system.
- Remove **Independent Contractor — Frontend / JavaScript Developer (Short-term engagements), 2013–2016** from LinkedIn and keep it absent from every CV.
- All implementation and review subagents must use `gpt-5.6-luna`, per the user's request.

---

## File Structure

- Create `src/data/general-resume.ts`: canonical factual history, shared exports, and General editorial content.
- Modify `src/data/frontend-resume.ts`: targeted Frontend override importing the General base.
- Modify `src/data/product-resume.ts`: import shared facts from General.
- Modify `src/data/applied-ai-resume.ts`: import shared facts from General.
- Modify `src/data/technical-project-ai-systems-resume.ts`: import shared facts from General.
- Modify `src/data/resumes.ts`: register General and resolve canonical/alias routes.
- Modify `src/__tests__/resumeVariants.test.ts`: enforce data ownership, route, copy, and factual-boundary contracts.
- Create `general/index.html`: General alias entry with root canonical metadata.
- Modify `index.html`: canonical General metadata.
- Modify `frontend/index.html`: self-canonical Frontend metadata.
- Modify `vite.config.ts`: add the General build input.
- Modify `scripts/generate-pdfs.mjs`: add General PDF and move Frontend PDF generation to `/cv/frontend/`.
- Modify `public/sitemap.xml`: list General root and the four targeted canonical routes.
- Modify `src/__tests__/staticMetadata.test.ts`: verify General/Frontend metadata and build entries.
- Modify `README.md`: document five variants, aliases, data ownership, routes, and PDFs.
- External-only LinkedIn changes: headline, About, current role, selected recent roles, Open to Work review, and Independent Contractor deletion.

---

### Task 1: Make General the shared data base and add General editorial content

**Files:**
- Create: `src/data/general-resume.ts`
- Modify: `src/data/frontend-resume.ts`
- Modify: `src/data/product-resume.ts`
- Modify: `src/data/applied-ai-resume.ts`
- Modify: `src/data/technical-project-ai-systems-resume.ts`
- Modify: `src/data/resumes.ts`
- Test: `src/__tests__/resumeVariants.test.ts`
- Test: `src/__tests__/smoke.test.tsx`

**Interfaces:**
- Produces: `generalResume: Resume`, `sharedResumeFacts`, and `resumes.general`.
- Produces route behavior: `getResumeForPath('/cv/')`, `getResumeForPath('/cv/general/')`, and unknown paths return `generalResume`; `/cv/frontend/` returns `frontendResume`.
- Targeted variants consume `sharedResumeFacts` from `@/data/general-resume` and may replace current-role copy while preserving shared factual history.

- [ ] **Step 1: Rewrite the variant tests to express the new base contract**

Add `generalResume` to the imports and `variants` array. Replace the current default and registry tests with:

```ts
it('keeps the General resume as the default and root canonical', () => {
  expect(getResumeForPath('/cv/')).toBe(generalResume)
  expect(getResumeForPath('/cv/general/')).toBe(generalResume)
  expect(getResumeForPath('/cv/frontend/')).toBe(frontendResume)
  expect(getResumeForPath('/cv/unknown/')).toBe(generalResume)
  expect(generalResume.title).toBe(
    'Senior Software Engineer | Frontend, Product Engineering & Applied AI',
  )
  expect(generalResume.pdfPath).toBe('/cv/alejandro-garcia-iglesias-general-cv.pdf')
  expect(generalResume.seo.canonicalPath).toBe('/cv/')
})

it('registers the five canonical resume variants', () => {
  expect(Object.keys(resumes)).toEqual(['general', 'frontend', 'product', 'ai', 'tpm'])
  expect(resumes.general).toBe(generalResume)
  expect(resumes.frontend).toBe(frontendResume)
})
```

Update the supported-route test so `/cv`, `/cv/`, `/cv/general`, and `/cv/general/` return General; `/cv/frontend` and `/cv/frontend/` return Frontend. Update the unknown-path fallback expectation to General.

Add these contracts:

```ts
it('owns shared facts in the General module', () => {
  expect(generalResume.name).toBe(sharedResumeFacts.name)
  expect(generalResume.location).toBe(sharedResumeFacts.location)
  expect(generalResume.roles.map((role) => role.company)).toEqual(
    sharedResumeFacts.roles.map((role) => role.company),
  )
})

it('publishes a restrained General narrative across all three primary tracks', () => {
  const content = JSON.stringify(generalResume)
  expect(content).toMatch(/full-stack|frontend architecture|product|Applied AI/i)
  expect(content).toMatch(/hybrid|reranking|multi-hop|MCP|LangGraph|14 orchestration workflows/i)
  expect(generalResume.roles[0]).toMatchObject({
    company: 'Independent Product R&D & AI Consulting',
    title: 'Senior Software Engineer — Product & Applied AI',
    start: 'Apr 2026',
    end: 'Present',
  })
  expect(content).not.toMatch(/\bGround\b|\bQuorum\b|TuLanding|production AI|model training/i)
})
```

For every variant, retain the test asserting the only non-featured companies are Yanma Solutions, Freelance, 2mas2 Interactive, and Syxmedia, and assert `Independent Contractor` is absent.

- [ ] **Step 2: Run the focused tests and verify the new tests fail**

Run:

```bash
npm test -- src/__tests__/resumeVariants.test.ts src/__tests__/smoke.test.tsx
```

Expected: FAIL because `general-resume.ts`, `generalResume`, and `resumes.general` do not exist and root still resolves to Frontend.

- [ ] **Step 3: Create `general-resume.ts` by moving the canonical facts out of Frontend**

Move the full contact list, earlier-experience summary, and complete factual `roles` array from `frontend-resume.ts` into `general-resume.ts`. Keep all historical facts unchanged. Replace the first role with the approved General title and these four bullets:

```ts
{
  company: 'Independent Product R&D & AI Consulting',
  title: 'Senior Software Engineer — Product & Applied AI',
  start: 'Apr 2026',
  end: 'Present',
  featured: true,
  bullets: [
    "Partnered with Juana Casa's two founding partners and studio team to translate project and operational knowledge needs into a React/Next.js AI assistant with Mastra, source-backed RAG, and specialized agents delivered through Slack and WhatsApp.",
    'Developing an independent knowledge-intelligence layer for companies based on that real-world problem, combining vector and full-text retrieval, reciprocal-rank fusion, reranking, bounded multi-hop retrieval, evaluation, and authenticated MCP access to company documents and structured operational data.',
    'Built an experimental LangGraph research lab for multi-model inference across multiple providers, implementing 14 orchestration workflows—including mixture-of-agents, solver/verifier, routing, and orchestrator/worker patterns—and exploring factuality, quality, latency, and cost trade-offs through reproducible benchmarks.',
    'Refined AI-native product and software development workflows across discovery, prototyping, implementation, testing, and review, combining coding and design agents with explicit human verification.',
  ],
}
```

Create the General `Resume` with this exact editorial content:

```ts
export const generalResume: Resume = {
  id: 'general',
  name: 'Alejandro García Iglesias',
  title: 'Senior Software Engineer | Frontend, Product Engineering & Applied AI',
  location: 'Buenos Aires, Argentina',
  pdfPath: '/cv/alejandro-garcia-iglesias-general-cv.pdf',
  seo: {
    title: 'Alejandro García Iglesias · Senior Software Engineer',
    description:
      'Senior Software Engineer with 19+ years of experience spanning full-stack foundations, deep frontend specialization, product engineering, and current Applied AI systems.',
    canonicalPath: '/cv/',
  },
  summary: [
    'Senior Software Engineer with 19+ years of experience, starting in full-stack web development before specializing deeply in frontend architecture, JavaScript/TypeScript, React, and production UI systems.',
    'My work has grown increasingly product-oriented: I collaborate closely with Product and Design, translate ambiguous needs into practical solutions, and take end-to-end ownership across UX, architecture, implementation, APIs, and technical trade-offs.',
    'More recently, I have focused on Applied AI systems and AI-powered products, building retrieval and agent workflows, integrations, evals, and multi-model experiments on top of a broad software engineering foundation.',
  ],
  earlierExperienceSummary:
    'Earlier full-stack experience across four roles building web applications end-to-end with frontend, backend, APIs, databases, and infrastructure.',
  interests: [
    'Product-focused software engineering and end-to-end ownership',
    'Frontend architecture, UI systems & design systems',
    'Applied AI products, retrieval & agent workflows',
    'System design, APIs & integrations',
    'Senior Software Engineering roles spanning Frontend, Product & Applied AI',
  ],
  skills: [
    'Software Engineering',
    'Frontend Architecture',
    'Product Engineering',
    'Full-stack Development',
    'React',
    'TypeScript',
    'JavaScript',
    'Design Systems',
    'System Design',
    'Product & UX Collaboration',
    'Node.js',
    'API Design & Integration',
    'Retrieval-Augmented Generation (RAG)',
    'Hybrid Search & Reranking',
    'AI Agents',
    'MCP Integrations',
    'LangGraph',
    'Mastra',
    'AI Evaluation & Benchmarking',
    'AI-assisted Development Workflows',
  ],
  contacts,
  roles,
}
```

Export `sharedResumeFacts` from this module with the General-owned `name`, `location`, `contacts`, `earlierExperienceSummary`, and `roles`.

- [ ] **Step 4: Convert Frontend into an override of the General base**

Import `sharedResumeFacts` from `@/data/general-resume`. Keep the existing Frontend summary, interests, skills, and targeted current-role bullets. Make its website contact point to `https://alejandroiglesias.github.io/cv/frontend/`. Set its SEO canonical to `/cv/frontend/`.

Do not re-export `sharedResumeFacts` from `frontend-resume.ts`.

- [ ] **Step 5: Point Product, Applied AI, and TPM imports at the General base**

In each module, replace:

```ts
import { sharedResumeFacts } from '@/data/frontend-resume'
```

with:

```ts
import { sharedResumeFacts } from '@/data/general-resume'
```

Retain each variant's existing supported editorial overrides.

- [ ] **Step 6: Register General and implement the route contract**

In `resumes.ts`, import `generalResume`, register it first, and resolve paths as follows:

```ts
export const resumes = {
  general: generalResume,
  frontend: frontendResume,
  product: productResume,
  ai: appliedAiResume,
  tpm: technicalProjectAiSystemsResume,
} satisfies Record<string, Resume>

switch (normalizedPath) {
  case '/cv/frontend':
    return resumes.frontend
  case '/cv/product':
    return resumes.product
  case '/cv/ai':
    return resumes.ai
  case '/cv/tpm':
  case '/cv/technical-project-ai-systems':
  case '/technical-project-ai-systems':
    return resumes.tpm
  case '/cv':
  case '/cv/general':
  default:
    return resumes.general
}
```

Change `App`'s default resume from `frontendResume` to `generalResume`. Update smoke-test expectations so the default render includes `Senior Software Engineer` and the General PDF URL.

- [ ] **Step 7: Run focused and full automated checks**

Run:

```bash
npm test -- src/__tests__/resumeVariants.test.ts src/__tests__/smoke.test.tsx
npm test
npm run lint
git diff --check
```

Expected: all tests pass, ESLint exits 0, and `git diff --check` has no output.

- [ ] **Step 8: Commit Task 1**

```bash
git add src/data/general-resume.ts src/data/frontend-resume.ts src/data/product-resume.ts src/data/applied-ai-resume.ts src/data/technical-project-ai-systems-resume.ts src/data/resumes.ts src/App.tsx src/__tests__/resumeVariants.test.ts src/__tests__/smoke.test.tsx
git commit -m "feat: add general CV data base"
```

---

### Task 2: Publish General routes, metadata, sitemap, and PDFs

**Files:**
- Create: `general/index.html`
- Modify: `index.html`
- Modify: `frontend/index.html`
- Modify: `vite.config.ts`
- Modify: `scripts/generate-pdfs.mjs`
- Modify: `public/sitemap.xml`
- Modify: `src/__tests__/staticMetadata.test.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: Task 1 route behavior and `generalResume.pdfPath`.
- Produces: built `dist/index.html`, `dist/general/index.html`, and `dist/frontend/index.html` with correct canonical URLs.
- Produces: `public/alejandro-garcia-iglesias-general-cv.pdf` and corresponding `dist` copy.

- [ ] **Step 1: Add failing static metadata and PDF configuration tests**

Extend `staticMetadata.test.ts` to assert:

```ts
expect(readFile('index.html')).toContain(
  '<link rel="canonical" href="https://alejandroiglesias.github.io/cv/"',
)
expect(readFile('index.html')).toContain(
  '<title>Alejandro García Iglesias · Senior Software Engineer</title>',
)
expect(readFile('general/index.html')).toContain(
  '<link rel="canonical" href="https://alejandroiglesias.github.io/cv/"',
)
expect(readFile('frontend/index.html')).toContain(
  '<link rel="canonical" href="https://alejandroiglesias.github.io/cv/frontend/"',
)
expect(readFile('vite.config.ts')).toMatch(/general:.*general\/index\.html/s)
expect(readFile('scripts/generate-pdfs.mjs')).toContain(
  "filename: 'alejandro-garcia-iglesias-general-cv.pdf'",
)
expect(readFile('scripts/generate-pdfs.mjs')).toContain("route: '/cv/frontend/'")
```

Assert the sitemap contains `/cv/`, `/cv/frontend/`, `/cv/product/`, `/cv/ai/`, and `/cv/tpm/`, but not `/cv/general/`.

- [ ] **Step 2: Run the static tests and verify they fail**

```bash
npm test -- src/__tests__/staticMetadata.test.ts
```

Expected: FAIL because General alias/static metadata and General PDF configuration are missing.

- [ ] **Step 3: Update root and Frontend metadata and create the General alias entry**

Use this metadata on both `index.html` and `general/index.html`:

```html
<link rel="canonical" href="https://alejandroiglesias.github.io/cv/" />
<title>Alejandro García Iglesias · Senior Software Engineer</title>
<meta
  name="description"
  content="Senior Software Engineer with 19+ years of experience spanning full-stack foundations, deep frontend specialization, product engineering, and current Applied AI systems."
/>
```

Use the same title, description, root URL, and existing profile image for Open Graph and Twitter metadata. Keep theme initialization and the module entry unchanged.

In `frontend/index.html`, keep the existing Frontend title/description but change canonical, `og:url`, and the website identity to `https://alejandroiglesias.github.io/cv/frontend/`.

- [ ] **Step 4: Register the General HTML entry and canonical sitemap**

Add this Vite input:

```ts
general: path.resolve(__dirname, 'general/index.html'),
```

Update `public/sitemap.xml` so the only entries are:

```xml
<loc>https://alejandroiglesias.github.io/cv/</loc>
<loc>https://alejandroiglesias.github.io/cv/frontend/</loc>
<loc>https://alejandroiglesias.github.io/cv/product/</loc>
<loc>https://alejandroiglesias.github.io/cv/ai/</loc>
<loc>https://alejandroiglesias.github.io/cv/tpm/</loc>
```

- [ ] **Step 5: Generate the General PDF and move Frontend generation off root**

Add this as the first PDF configuration:

```js
{
  route: '/cv/',
  filename: 'alejandro-garcia-iglesias-general-cv.pdf',
},
```

Change the Frontend configuration route from `/cv/` to `/cv/frontend/`. Keep Product, Applied AI, TPM, and the legacy TPM copy unchanged.

- [ ] **Step 6: Update README to the five-variant architecture**

Document:

- General owns shared factual data in `src/data/general-resume.ts`.
- Targeted variants override General-owned facts without changing historical identity.
- Canonical routes are root, Frontend, Product, AI, and TPM.
- `/cv/general/` is a root-canonical alias.
- Five canonical PDFs are generated, including `alejandro-garcia-iglesias-general-cv.pdf`.
- `pdf:generate` now regenerates five canonical PDFs.

- [ ] **Step 7: Run static tests and the production build**

```bash
npm test -- src/__tests__/staticMetadata.test.ts
npm test
npm run lint
npm run build
git diff --check
```

Expected: tests and lint pass; the build exits 0; five canonical PDFs plus the legacy TPM copy exist in both `public/` and `dist/`; `git diff --check` has no output.

- [ ] **Step 8: Commit Task 2**

```bash
git add general/index.html index.html frontend/index.html vite.config.ts scripts/generate-pdfs.mjs public/sitemap.xml public/alejandro-garcia-iglesias-general-cv.pdf public/alejandro-garcia-iglesias-frontend-engineer-cv.pdf public/alejandro-garcia-iglesias-product-engineer-cv.pdf public/alejandro-garcia-iglesias-applied-ai-cv.pdf public/alejandro-garcia-iglesias-technical-project-manager-cv.pdf public/alejandro-garcia-iglesias-technical-project-ai-systems-cv.pdf src/__tests__/staticMetadata.test.ts README.md
git commit -m "feat: publish canonical general CV"
```

---

### Task 3: Update and verify the live LinkedIn master profile

**Files:**
- External state: `https://www.linkedin.com/in/alegarciaiglesias`
- Report only: the SDD task report in the plan workspace; do not add a repository content file.

**Interfaces:**
- Consumes: approved General CV narrative and exact current-role facts from Task 1.
- Produces: saved LinkedIn headline, About, current role, selected recent descriptions, Open to Work targets when exact supported options exist, and removal of Independent Contractor.

- [ ] **Step 1: Capture the pre-change state with Computer Use**

Record in the task report the current headline, About, visible Top Skills, Open to Work roles, and complete experience titles/dates. Do not change anything during this step.

- [ ] **Step 2: Update and save the headline**

Set exactly:

```text
Senior Software Engineer | Frontend & Product Engineering | Applied AI
```

Save, return to the profile, and verify the exact visible headline before continuing.

- [ ] **Step 3: Update and save About**

Set exactly:

```text
I’m a Senior Software Engineer with 19+ years of experience building web products, starting in full-stack development across frontend, backend, APIs, databases, and web infrastructure.

Frontend became my deepest specialization. Over the years, I’ve led UI architecture and large refactors, evolved design systems and reusable component libraries, improved developer workflows, and acted as a frontend reference across teams. I work closely with Product and Design, and my role has increasingly extended beyond implementation into clarifying ambiguous problems, shaping solutions, making architecture and UX trade-offs, and owning features end to end.

More recently, I’ve focused deeply on Applied AI and AI-native software development. My current work includes AI-powered products, retrieval and knowledge systems, hybrid search, reranking, multi-hop retrieval, evals, agent workflows, MCP integrations, and multi-model orchestration. I approach this as a software and product engineer: connecting models to reliable data, tools, interfaces, and real workflows.

I’m interested in senior engineering roles where I can combine deep frontend expertise, product ownership, and practical Applied AI systems.
```

Save, return to the profile, and re-read the entire visible About.

- [ ] **Step 4: Add and verify the current Apr 2026–Present experience**

Use:

```text
Title: Senior Software Engineer — Product & Applied AI
Employment type: Self-employed, if LinkedIn requires a supported type
Company: Independent Product R&D & AI Consulting
Start: April 2026
End: Present
Location: Remote, only if the form requires or supports it without changing the approved company/title/date facts
```

Set this description:

```text
• Partnered with Juana Casa’s two founding partners and studio team to translate project and operational knowledge needs into a React/Next.js AI assistant with Mastra, source-backed RAG, and specialized agents delivered through Slack and WhatsApp.

• Developing an independent knowledge-intelligence layer for companies based on that real-world problem, combining vector and full-text retrieval, reciprocal-rank fusion, reranking, bounded multi-hop retrieval, evaluation, and authenticated MCP access to company documents and structured operational data.

• Built an experimental LangGraph research lab for multi-model inference across multiple providers, implementing 14 orchestration workflows—including mixture-of-agents, solver/verifier, routing, and orchestrator/worker patterns—and exploring factuality, quality, latency, and cost trade-offs through reproducible benchmarks.

• Refined AI-native product and software development workflows across discovery, prototyping, implementation, testing, and review, combining coding and design agents with explicit human verification.
```

Do not create a duplicate company page or claim a client relationship type that LinkedIn does not support. After saving, verify company, title, dates, and all four bullets on the profile.

Keep LinkedIn's **Notify network** control disabled for this new role and for every edited role unless the user explicitly changes that instruction.

- [ ] **Step 5: Align Rotunda, BairesDev, and Mapme descriptions**

Use the exact corresponding bullets from `generalResume.roles` for these three positions. Preserve title, company, dates, location, media, and employment type. Save and verify each position separately before opening the next.

- [ ] **Step 6: Delete the overlapping Independent Contractor entry**

Delete only:

```text
Frontend / JavaScript Developer (Short-term engagements)
Independent Contractor
2013–2016
```

This recoverable LinkedIn deletion was explicitly requested by the user. Verify the entry is absent and adjacent Deviget/Vulsai entries remain.

- [ ] **Step 7: Align Open to Work when exact role options are available**

Replace the current five targets with these exact LinkedIn options when the role picker exposes them:

```text
Senior Software Engineer
Senior Frontend Developer
Product Engineer
AI Engineer
Technical Lead
```

If an exact option is unavailable, keep the closest existing supported option rather than inventing a label. Do not add Technical Project Manager. Record the final selected values in the report.

Leave the complete skills list and Top Skills unchanged in this implementation; the main narrative changes already supply the required hierarchy and this avoids a taxonomy-driven keyword rewrite.

- [ ] **Step 8: Perform a complete LinkedIn post-change verification**

Read the live profile from top to bottom and report:

- exact headline and About;
- current role company/title/dates/description;
- Rotunda, BairesDev, and Mapme titles/dates unchanged and descriptions saved;
- Independent Contractor absent;
- final Open to Work targets;
- no TPM positioning and no Ground/Quorum/TuLanding names in edited copy.

Reload the profile after every individual save. Treat the reloaded visible field as the persistence signal; a closed modal alone is not sufficient.

---

### Task 4: Verify, review, publish, and validate production

**Files:**
- Inspect: all files changed by Tasks 1–2
- Inspect: `dist/`
- Inspect: generated PDFs in `public/`
- External state: LinkedIn and GitHub Pages production URLs

**Interfaces:**
- Consumes: completed reviewed commits from Tasks 1–2 and verified LinkedIn state from Task 3.
- Produces: fresh automated evidence, visual evidence, production deployment, and recruiter-perspective consistency verdict.

- [ ] **Step 1: Run the complete automated gate from a clean working tree**

```bash
npm test
npm run lint
npm run build
git diff --check
git status --short
```

Expected: all tests pass; lint and build exit 0; diff check is empty; only expected generated PDF changes are committed or the worktree is clean.

- [ ] **Step 2: Inspect built route and metadata contracts**

Serve `dist/` with `npm run preview -- --host 127.0.0.1 --port 4173`. Verify:

```text
http://127.0.0.1:4173/cv/
http://127.0.0.1:4173/cv/general/
http://127.0.0.1:4173/cv/frontend/
http://127.0.0.1:4173/cv/product/
http://127.0.0.1:4173/cv/ai/
http://127.0.0.1:4173/cv/tpm/
```

Confirm root and `/general/` render the same General title/current role, Frontend is distinct, and each built HTML file has the expected canonical.

- [ ] **Step 3: Perform responsive browser checks**

Use desktop `1440×1000` and mobile `390×844` viewports. On General root and General alias verify:

- no horizontal overflow;
- Hero title/subtitle, contacts, Download PDF, About, Interests, Skills, and Experience remain readable;
- `Show 4 earlier full-stack roles` expands and collapses four roles;
- reduced-motion and existing theme controls are not regressed.

- [ ] **Step 4: Inspect every page of the General PDF**

Use `pdfinfo public/alejandro-garcia-iglesias-general-cv.pdf` to record page count. Render every page to PNG with `pdftoppm -png`, inspect the images, and verify:

- approximately three pages;
- no clipped text or unintended blank page;
- the current role and recent history are readable;
- historical roles are summarized, not expanded;
- LinkedIn pointer is present;
- no interactive web controls appear.

Spot-check the Frontend PDF filename and first page to ensure the route change did not produce General content.

- [ ] **Step 5: Dispatch a final Luna whole-change review and address findings**

Review all implementation commits against the design spec and this plan. The reviewer must issue separate verdicts for spec compliance and code quality, inspect the final LinkedIn state, and explicitly test the three recruiter perspectives. Any Critical or Important finding must be fixed by one Luna fix subagent and re-reviewed once before publication.

- [ ] **Step 6: Merge the reviewed feature branch into `main` and push**

From the primary checkout:

```bash
git merge --ff-only codex/general-professional-profile
git push origin main
```

If fast-forward is unavailable, stop and inspect rather than creating an implicit merge commit or rebasing over unrelated work.

- [ ] **Step 7: Wait for GitHub Pages deployment and verify production**

Use the repository's existing GitHub Actions workflow. Confirm the deployment run for the pushed commit succeeds, then verify:

```text
https://alejandroiglesias.github.io/cv/
https://alejandroiglesias.github.io/cv/general/
https://alejandroiglesias.github.io/cv/frontend/
https://alejandroiglesias.github.io/cv/alejandro-garcia-iglesias-general-cv.pdf
https://alejandroiglesias.github.io/cv/alejandro-garcia-iglesias-frontend-engineer-cv.pdf
```

Check the canonical URL in root, General alias, and Frontend production HTML.

- [ ] **Step 8: Perform the final narrative consistency audit**

Compare production General CV and LinkedIn side by side. Record pass/fail for:

1. Senior Frontend recruiter sees deep frontend architecture and UI systems experience.
2. Senior Product recruiter sees full-stack foundations, Product/Design collaboration, ambiguity handling, and end-to-end ownership.
3. Applied AI recruiter sees current retrieval, agents, MCP, evals, and multi-model work grounded in senior software engineering rather than ML research claims.

Confirm one coherent identity remains visible and no unsupported claim was introduced.
