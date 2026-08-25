import type { Resume, Role } from '@/types/resume'

import { sharedResumeFacts } from '@/data/general-resume'

const frontendContacts = sharedResumeFacts.contacts.map((contact) =>
  contact.kind === 'site'
    ? {
        ...contact,
        href: 'https://alejandroiglesias.github.io/cv/frontend/',
      }
    : contact,
)

function tailorRole(role: Role): Role {
  if (role.company === 'Independent Product R&D & AI Consulting') {
    return {
      ...role,
      title: 'Senior Frontend Engineer',
      bullets: [
        "Built and iterated a React/Next.js AI knowledge assistant for Juana Casa, working directly with the studio's two founding partners and team members to translate project and operational knowledge needs into clear product flows backed by Mastra and RAG.",
        'The knowledge-access problem identified with Juana Casa inspired an independent AI knowledge-intelligence product I am developing for companies, with the studio set to serve as its first real-world implementation; I am combining frontend and product engineering with a reusable layer, source-backed RAG, and authenticated MCP access to company data.',
        'Evaluated and refined AI-assisted product design and frontend development workflows, combining coding agents, design tools, and agent orchestration across prototyping, implementation, testing, and review with explicit human verification.',
      ],
    }
  }

  return role
}

export const frontendResume: Resume = {
  id: 'frontend',
  ...sharedResumeFacts,
  contacts: frontendContacts,
  title: 'Senior Frontend Engineer',
  pdfPath: '/cv/alejandro-garcia-iglesias-frontend-engineer-cv.pdf',
  seo: {
    title: 'Alejandro García Iglesias · Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer with 19+ years of experience in frontend architecture, design systems, and product-focused web applications. Based in Buenos Aires, open to remote opportunities.',
    canonicalPath: '/cv/frontend/',
  },
  summary: [
    'Senior Frontend Engineer with 19+ years of experience building product-focused web applications, combining a full-stack foundation with deep frontend specialization, UI architecture, and product thinking to turn complex problems into clear, effective user experiences.',
    'I work beyond implementation, helping define product and technical solutions, improving architecture, creating reusable UI patterns, and simplifying complexity to help teams move faster.',
    "I've often acted as a frontend reference across teams, driving refactors, improving design-to-development workflows, and contributing to product, UX, and technical decisions.",
  ],
  focusAreas: [
    'Frontend architecture & system design',
    'Design systems & reusable UI patterns',
    'Product-focused frontend engineering',
    'Design-to-development workflows',
    'Senior Frontend Engineering roles with strong product and technical impact',
  ],
  skills: [
    'Frontend Architecture',
    'UI Engineering',
    'Component Architecture',
    'Design Systems',
    'Next.js',
    'React',
    'TypeScript',
    'Technical Leadership',
    'JavaScript',
    'Product & UX Collaboration',
    'Design-to-development Workflows',
    'Frontend Tooling & DX',
    'Testing & Code Quality',
    'Vue.js',
    'Angular',
    'CSS / Tailwind CSS',
    'API Integration',
    'Node.js',
    'AI-assisted Development Workflows',
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}
