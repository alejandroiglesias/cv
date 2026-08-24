# General Professional Profile and CV Design

## Objective

Create and publish one master professional narrative for Alejandro García Iglesias across two surfaces:

1. LinkedIn, as the richer and complete professional profile.
2. The canonical general CV at `/cv/`, with `/cv/general/` as a non-redirecting alias.

The profile must make Alejandro immediately credible for Senior Frontend Engineer, Senior Product Engineer, and Applied AI / AI Software Engineer opportunities while presenting one coherent identity: **Senior Software Engineer**.

## Sources of truth

Content and claims must be grounded in:

- the current CV variants and shared employment history in this repository;
- the current live LinkedIn profile;
- current repository evidence for the knowledge-intelligence and multi-model research systems;
- previously agreed CV positioning decisions;
- the user's explicit corrections in the current task.

No unsupported title, metric, technology, responsibility, client, launch, adoption, or outcome may be added. Production work, ongoing development, prototypes, research, and hypotheses must remain distinguishable.

## Narrative hierarchy

The master narrative is chronological and cumulative:

1. An early full-stack foundation across frontend, backend, APIs, databases, and web infrastructure.
2. A long and deep frontend specialization in JavaScript/TypeScript, React and related frameworks, UI architecture, design systems, tooling, and production software.
3. Increasing product engineering responsibility: close collaboration with Product and Design, end-to-end ownership, product and UX judgment, architecture trade-offs, prototyping, and work across the stack when needed.
4. A recent specialization in Applied AI: retrieval and knowledge systems, agents, orchestration, evals, integrations, and AI-native development workflows.

Frontend is Alejandro's deepest specialization, not his entire identity. Applied AI is an intentional recent specialization built on senior software, frontend, and product engineering experience; it must not be framed as a long career in machine learning research, model training, or classical ML engineering.

The rejected alternatives are:

- equal weighting of Frontend, Product, and AI, which would produce keyword soup;
- Product Engineer as the primary identity, which would weaken the requested Senior Software Engineer hierarchy.

## LinkedIn design

### Headline

Use this hierarchy and wording:

**Senior Software Engineer | Frontend & Product Engineering | Applied AI**

Technical Project Management must not appear in the headline.

### About

Replace the current frontend-only About with a concise, senior, conversational progression that covers:

- the full-stack start of the career;
- deep frontend specialization and technical ownership;
- growing product orientation and close Product/Design collaboration;
- end-to-end feature and solution ownership;
- the current focus on practical Applied AI systems;
- the software engineering foundation behind the AI work.

The About may be richer than the CV summary, but should remain scannable and avoid a long keyword inventory. It must not describe an abrupt career change or call Alejandro an AI expert, ML researcher, long-time AI Engineer, or model-training specialist.

### Current experience

Add the missing current experience:

- Company: **Independent Product R&D & AI Consulting**
- Title: **Senior Software Engineer — Product & Applied AI**
- Dates: **Apr 2026 – Present**

Its description will use four compact themes:

1. A React/Next.js assistant and specialized agents built from real Juana Casa operational knowledge needs, using supported agent and retrieval infrastructure.
2. An independently developed knowledge-intelligence layer for organizational information, including source-backed RAG, vector and full-text retrieval, hybrid fusion, reranking, bounded multi-hop retrieval, evaluation, and authenticated MCP access for assistants and agents. It must remain described as ongoing development and a product direction originating in real client needs, not a mature commercial product.
3. An experimental LangGraph-based multi-model research system spanning multiple providers and orchestration approaches such as mixture-of-agents, solver/verifier, routing, and orchestrator/worker patterns. Benchmarking must be described as exploratory work on quality, factuality, latency, and cost trade-offs; engineering smoke results must not be presented as model-quality evidence.
4. AI-native discovery, prototyping, implementation, testing, and review workflows with explicit human verification.

The product names Ground and Quorum must not appear.

### Existing experience

Keep every real company name, historical title, and date accurate. Selectively refine only the recent entries where it improves the master narrative:

- Rotunda: frontend reference role, UI/platform architecture, reusable systems, large refactors, cross-functional product work, Node.js/Express API support, and developer workflows.
- BairesDev: product experimentation, ownership of reporting interfaces, Go APIs, and work across frontend/backend.
- Mapme: product rewrite, component architecture, direct collaboration with the CTO and CEO, and UI/UX decisions under ambiguity.

Older positions should not be aggressively rewritten for keyword coverage.

Remove the overlapping **Independent Contractor — Frontend / JavaScript Developer (Short-term engagements), 2013–2016** entry from LinkedIn. This deletion was explicitly requested after the initial design review. Keep the remaining complete LinkedIn employment history.

### Skills and Open to Work

Do not overhaul the complete skills list. Review the visible Top Skills and Open to Work targets only after the headline, About, and experience are aligned. Make changes only when LinkedIn exposes an exact, supported option that improves the three primary tracks. Do not add TPM as a primary positioning signal.

## General CV content design

### Header and summary

Use **Senior Software Engineer** as the title. The existing Hero supports an optional subtitle separated by `|`; use a compact subtitle only if it improves clarity without turning the CV into a landing page.

The About summary will use three concise paragraphs:

1. The full-stack foundation and deep frontend specialization.
2. Product engineering, design collaboration, end-to-end ownership, and architecture judgment.
3. The recent Applied AI specialization and its grounding in software engineering.

The interests and skills lists will follow the same hierarchy. Skills should be concrete and recruiter-readable, combining core software/frontend/product signals with a restrained set of supported Applied AI capabilities.

### Experience

The first role will use the same confirmed company, title, and dates as LinkedIn. Its bullets will be a compressed CV adaptation of the four LinkedIn themes.

Recent historical roles will combine supported bullets already present across the targeted variants. Their factual company names, titles, locations, and dates will not change.

The four earlier full-stack roles remain collapsed on the website:

- Yanma Solutions
- Freelance
- 2mas2 Interactive
- Syxmedia

The existing summary and CTA remain:

- “Earlier full-stack experience across four roles building web applications end-to-end with frontend, backend, APIs, databases, and infrastructure.”
- “Show 4 earlier full-stack roles”

For print/PDF, keep the compact earlier-experience summary and the LinkedIn pointer. Do not print the expanded historical roles.

TuLanding, Ground, and Quorum must not appear by name.

## Data architecture

The general CV becomes the conceptual and code-level base instead of the Frontend CV.

### `general-resume.ts`

Create `src/data/general-resume.ts` containing:

- the canonical shared name, location, contacts, earlier-experience summary, and complete factual role history;
- the `generalResume` object;
- a `sharedResumeFacts` export derived from the general data for targeted variants.

The existing factual role data will be moved mechanically from `frontend-resume.ts` before any targeted transformation. This prevents the shared employment record from depending on a targeted CV.

### Targeted variants

Refactor all targeted modules to derive from the general base:

- `frontend-resume.ts`
- `product-resume.ts`
- `applied-ai-resume.ts`
- `technical-project-ai-systems-resume.ts`

Each module may tailor the summary, interests, skills, current independent-role title/bullets, and ordering or selection of supported historical bullets. It may not replace shared factual dates, companies, locations, or the four collapsed roles.

Avoid circular imports: `general-resume.ts` owns the shared facts, while every targeted module imports from it. `resumes.ts` imports each completed variant only for registration and route resolution.

## Route and metadata contract

The canonical routes are:

- `/cv/` — General
- `/cv/frontend/` — Frontend
- `/cv/product/` — Product
- `/cv/ai/` — Applied AI
- `/cv/tpm/` — TPM-targeted

`/cv/general/` is a static alias that renders the General CV without redirecting and uses `/cv/` as its canonical URL.

The root must render the General CV directly. `/cv/general/` and `/cv/` must resolve to the same data. Unknown paths continue to fall back to the General CV.

Add a `general/index.html` build entry with General metadata and a canonical link to `/cv/`. Update root metadata to General. Update `frontend/index.html` so its canonical and social URLs point to `/cv/frontend/`.

List the five canonical pages in the sitemap and omit aliases. The root counts as the General canonical; `/cv/general/` must not be listed separately.

## PDF and print contract

Generate five canonical PDFs:

- General: `alejandro-garcia-iglesias-general-cv.pdf` from `/cv/`
- Frontend: `alejandro-garcia-iglesias-frontend-engineer-cv.pdf` from `/cv/frontend/`
- Product: existing filename and route
- Applied AI: existing filename and route
- TPM: existing filename and route

Preserve the legacy TPM PDF copy. Preserve the existing A4 print system, explicit print page break, hidden interactive controls, compact earlier full-stack summary, and LinkedIn pointer.

The General CV should remain approximately three pages. If content causes an additional mostly empty page, first compress or rebalance copy; do not hide relevant experience or reduce accessibility.

## Testing and verification

### Automated checks

Update tests to verify:

- all five registered variants;
- `/cv/` and `/cv/general/` resolve to General;
- `/cv/frontend/` resolves to Frontend;
- unknown paths fall back to General;
- canonical paths and PDF paths for every variant;
- all targeted variants derive the shared factual history from General;
- the current role title is correct in General;
- the four older full-stack roles remain the only collapsed roles;
- Independent Contractor and TuLanding are absent from every CV variant;
- Ground and Quorum are absent by name;
- Applied AI claims remain free of model-training, production-AI, or unsupported quality claims.

Run fresh:

- `npm test`
- `npm run lint`
- `npm run build`
- `git diff --check`

### Browser and print verification

Inspect the built General CV at desktop and mobile viewport sizes. Confirm:

- title, summary, skills, role order, collapsed-role summary, and CTA;
- responsive layout and no horizontal overflow;
- `/cv/` and `/cv/general/` render the same General content;
- `/cv/frontend/` still renders the targeted Frontend CV;
- metadata and canonical URLs in the built HTML;
- print preview/PDF has readable page breaks, no clipped content, no interactive controls, and the compact LinkedIn history pointer.

Inspect the generated General PDF page count and render every page to images for visual review.

### LinkedIn verification

After each save, re-read the live profile and confirm:

- the exact new headline;
- the complete new About text;
- the current role company, title, dates, and description;
- the selected recent experience updates;
- Independent Contractor is absent;
- no historical title or date was unintentionally changed;
- any Top Skills or Open to Work updates match the approved three-track hierarchy.

Finally compare LinkedIn and the General CV side by side against the three recruiter perspectives: Senior Frontend Engineer, Senior Product Engineer, and Applied AI / AI Software Engineer.

## Publication

Keep repository changes scoped to this feature. After all checks pass:

1. Commit the implementation.
2. Push `main` to the existing origin, as explicitly authorized by the request to publish.
3. Wait for the GitHub Pages deployment workflow.
4. Verify the deployed canonical General CV, General alias, Frontend route, downloadable General PDF, and one existing targeted PDF.
5. Re-check the saved LinkedIn profile.

Do not claim publication or completion from local build output alone.

## Non-goals

- Building a portfolio, landing page, or CV selector.
- Redesigning the existing visual system.
- Rewriting every LinkedIn role.
- Adding Technical Project Management to the master identity.
- Presenting the multi-model lab as a commercial product or validated quality improvement.
- Presenting Applied AI work as classical ML research or model training.

## Acceptance criteria

The work is complete only when:

- the General CV is the shared data base and the targeted CVs are overrides;
- `/cv/` is the canonical General CV and `/cv/general/` is its working alias;
- LinkedIn and the General CV tell the same chronological, hierarchical story;
- the current independent role appears on both surfaces with the confirmed title;
- Independent Contractor is absent from LinkedIn and all CVs;
- the four earlier full-stack roles remain collapsed online and summarized in print;
- all automated, responsive, print, PDF, and live-deployment checks pass;
- recruiters in any of the three primary tracks can understand the relevance without seeing three separate identities.
