import type { Resume } from '@/types/resume'

export const resume: Resume = {
  id: 'frontend',
  name: 'Alejandro García Iglesias',
  title: 'Senior Frontend Engineer',
  location: 'Buenos Aires, Argentina',
  pdfPath: '/cv/alejandro-garcia-iglesias-cv.pdf',
  seo: {
    title: 'Alejandro García Iglesias · Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer with 19+ years of experience in frontend architecture, design systems, and product-focused web applications. Based in Buenos Aires, open to remote opportunities.',
    canonicalPath: '/cv/',
  },

  summary: [
    'Senior Frontend Engineer with 19+ years of experience building product-focused web applications, combining frontend architecture, UI systems, and product proximity to turn complex problems into clear, effective user experiences.',
    'I work beyond implementation, helping define product and technical solutions, improving architecture, creating reusable UI patterns, and simplifying complexity to help teams move faster.',
    "I've often acted as a frontend reference across teams, driving refactors, improving design-to-development workflows, and contributing to product, UX, and technical decisions.",
  ],

  earlierExperienceSummary:
    'Earlier full-stack experience across four roles building web applications end-to-end with frontend, backend, APIs, databases, and infrastructure.',

  interests: [
    'Frontend architecture & system design',
    'Design systems & reusable UI patterns',
    'Product-focused frontend engineering',
    'Design-to-development workflows',
    'Senior Frontend Engineering roles with strong product and technical impact',
  ],

  skills: [
    'Frontend Architecture',
    'UI Architecture',
    'System Design',
    'Technical Leadership',
    'Product Proximity',
    'Design Systems',
    'JavaScript',
    'TypeScript',
    'React',
    'Vue.js',
    'Angular',
    'Node.js',
    'CSS / Tailwind CSS',
    'Developer Experience (DX)',
    'Code Quality & Refactoring',
    'API Integration',
    'Microservices',
    'AI-assisted Development & Workflows',
  ],

  contacts: [
    {
      kind: 'email',
      label: 'ale.garciaiglesias@gmail.com',
      href: 'mailto:ale.garciaiglesias@gmail.com',
      obfuscated: 'ale.garciaiglesias,gmail.com',
    },
    {
      kind: 'site',
      label: 'alejandroiglesias.github.io/cv',
      href: 'https://alejandroiglesias.github.io/cv/',
    },
    {
      kind: 'linkedin',
      label: 'in/alegarciaiglesias',
      href: 'https://www.linkedin.com/in/alegarciaiglesias',
    },
    {
      kind: 'github',
      label: 'github.com/alejandroiglesias',
      href: 'https://github.com/alejandroiglesias',
    },
    {
      kind: 'stackoverflow',
      label: 'stackoverflow.com/users/425741',
      href: 'https://stackoverflow.com/users/425741',
    },
    {
      kind: 'x',
      label: '@aiglesias_',
      href: 'https://x.com/aiglesias_',
    },
  ],

  roles: [
    // ─── Featured roles ──────────────────────────────────────────
    {
      company: 'Independent Product R&D & AI Consulting',
      title: 'Senior Frontend Engineer',
      start: 'Apr 2026',
      end: 'Present',
      featured: true,
      bullets: [
        'Partnered with Juana Casa, an architecture studio, to identify where AI could improve access to project and operational knowledge; built an initial React/Next.js assistant with Mastra and RAG, then implemented specialized OpenAI Workspace Agents accessible through Slack and WhatsApp.',
        'Acted as a frontend/product engineering partner while extending that knowledge-access work into a broader product direction; currently developing a reusable knowledge-intelligence layer with grounded RAG and an authenticated MCP server that gives AI assistants and agents source-backed access to company documents and structured operational data.',
        'Evaluated and refined AI-assisted product design and development workflows, combining coding agents (Codex, Claude Code, Cursor), design tools (Claude Design, OpenDesign, Pen), and agent orchestration across discovery, prototyping, implementation, testing, and review, with explicit human verification throughout.',
        'Currently developing an adaptive multi-model AI system investigating whether combining independent models can improve answer quality and factual reliability under practical cost and latency constraints; built a research lab using LangGraph, implementing 14 distinct multi-model workflows with support for multiple AI providers, validated the end-to-end pipeline on a small test run, and began an exploratory evaluation using a public factuality benchmark (AA-Omniscience).',
      ],
    },
    {
      company: 'Rotunda Software',
      title: 'Senior Frontend Engineer',
      location: 'Remote',
      start: 'Apr 2022',
      end: 'Apr 2026',
      featured: true,
      bullets: [
        'Acted as the main frontend reference across the team, supporting developers in UI-related decisions and implementation.',
        'Led the evolution of the internal UI library (ModUI), improving APIs, simplifying styling systems, and increasing consistency.',
        'Drove large-scale frontend refactors, including migrations of multiple applications and marketing sites.',
        'Built interactive documentation and standardized reusable UI patterns and styling conventions, improving onboarding, consistency, and design-to-development handoff.',
        'Improved frontend tooling and local development workflows, reducing friction for the engineering team.',
        'Collaborated with backend, design, QA, and marketing to define technical and product solutions, proactively identifying UX and implementation improvements.',
        'Worked within a microservices-based architecture using a custom internal frontend framework, implementing Node.js and Express API endpoints to support frontend features.',
      ],
    },
    {
      company: 'BairesDev',
      title: 'Senior Frontend Engineer',
      location: 'Remote',
      start: 'Mar 2020',
      end: 'Mar 2022',
      featured: true,
      printBreakBefore: true,
      bullets: [
        "Worked on Pinterest's Experiments team, implementing and testing React UI variations in the core consumer product to support product experimentation.",
        'Developed and owned the UI layer of internal advertising reporting tools, defining their information architecture and data presentation.',
        'Expanded into backend responsibilities, learning Go and implementing APIs to deliver features end to end.',
        'Collaborated in distributed teams and participated in code reviews and testing.',
      ],
    },
    {
      company: 'Mapme',
      title: 'Senior Frontend Engineer',
      location: 'Remote',
      start: 'Nov 2016',
      end: 'Dec 2019',
      featured: true,
      bullets: [
        'Helped evaluate and introduce Vue.js for a full product rewrite, then led the frontend implementation of the redesigned application from scratch.',
        'Built a component-based architecture with Vue and Vuex, including reusable UI components designed for maintainability and scalability.',
        'Collaborated closely with the CTO and CEO, translating business needs into practical, user-friendly UI solutions, often without formal designs.',
      ],
    },
    {
      company: 'Deviget',
      title: 'Frontend Developer',
      location: 'Remote',
      start: 'Dec 2013',
      end: 'Apr 2016',
      featured: true,
      bullets: [
        'Worked on a large-scale advertising platform (AppNexus).',
        'Built modular UI components using AngularJS with strong testing practices.',
        'Contributed to frontend structure improvements and CSS organization.',
        'Participated in Style Guide development.',
        'Collaborated in distributed cross-functional teams.',
        'After AppNexus, built a React-based administration UI for corporate security policies for another client engagement.',
      ],
    },
    // ─── Historical roles (shown via "Show more") ─────────────────
    {
      company: 'Vulsai',
      title: 'Frontend Developer',
      location: 'Buenos Aires, AR',
      start: '2012',
      end: '2013',
      featured: true,
      bullets: [
        'Primary frontend developer across multiple projects.',
        'Introduced modern CSS tooling (Sass, Less, Compass), improving maintainability and structure of styles.',
        'Built data visualization interfaces using D3.js.',
        'Developed self-contained embeddable widgets.',
        'Collaborated closely with design.',
      ],
    },
    {
      company: 'Yanma Solutions',
      title: 'Fullstack Developer',
      location: 'Buenos Aires, AR',
      start: '2011',
      end: '2012',
      featured: false,
      bullets: [
        'Established team development standards and trained newcomers.',
        'Interviewed candidates.',
        'Developed a critical real-time auctions application.',
      ],
    },
    {
      company: 'Freelance',
      title: 'Fullstack Developer',
      location: 'Buenos Aires, AR',
      start: '2010',
      end: '2011',
      featured: false,
      bullets: [
        'Worked with local clients on a variety of projects.',
        'Developed requirements gathering, estimation, and organization skills.',
      ],
    },
    {
      company: '2mas2 Interactive',
      title: 'Fullstack Developer',
      location: 'Buenos Aires, AR',
      start: '2008',
      end: '2009',
      featured: false,
      bullets: [
        'Developed backends for Flash-based interactive advertising campaigns.',
        'Built a reusable platform for dynamic content processing.',
        'Participated in establishing development standards and trained newcomers.',
      ],
    },
    {
      company: 'Syxmedia',
      title: 'Fullstack Developer',
      location: 'Buenos Aires, AR',
      start: '2007',
      end: '2008',
      featured: false,
      bullets: [
        'Coded mockups and dynamic websites.',
        'Worked on both frontend and backend using an in-house PHP framework.',
      ],
    },
  ],
}

export const sharedResumeFacts = {
  name: resume.name,
  location: resume.location,
  contacts: resume.contacts,
  earlierExperienceSummary: resume.earlierExperienceSummary,
  roles: resume.roles,
}

/** Named Frontend alias for callers that prefer explicit variant names. */
export const frontendResume = resume
