import type { Resume, Role } from '@/types/resume'

import { sharedResumeFacts } from '@/data/general-resume'

const productContacts = sharedResumeFacts.contacts.map((contact) =>
  contact.kind === 'site'
    ? {
        ...contact,
        href: 'https://alejandroiglesias.github.io/cv/product/',
      }
    : contact
)

function tailorRole(role: Role): Role {
  if (role.company === 'Independent Product R&D & AI Consulting') {
    return {
      ...role,
      title: 'Senior Product Engineer',
      bullets: [
        "Worked directly with Juana Casa's two founding partners and studio team on product discovery, clarifying what to build, and translating those needs into an initial React/Next.js AI assistant with Mastra and RAG; I then implemented specialized OpenAI Workspace Agents through Slack and WhatsApp.",
        'The knowledge-access problem identified with Juana Casa led me to start developing an independent AI knowledge-intelligence product for companies, with the studio set to serve as its first real-world implementation; I shaped the product direction and experience while building a reusable layer with source-backed RAG and authenticated MCP access to company data.',
        'Explored and refined AI-assisted design-to-code workflows across product discovery, interface exploration, prototyping, implementation, testing, and review, using Figma, Pen, and OpenDesign alongside coding agents and agent orchestration, with explicit human verification throughout.',
      ],
    }
  }

  if (role.company === 'Rotunda Software') {
    return {
      ...role,
      bullets: [
        role.bullets[5],
        role.bullets[0],
        role.bullets[1],
        role.bullets[2],
        role.bullets[3],
        role.bullets[6],
      ],
    }
  }

  if (role.company === 'Mapme') {
    return {
      ...role,
      bullets: [role.bullets[2], role.bullets[0], role.bullets[1]],
    }
  }

  return role
}

export const productResume: Resume = {
  id: 'product',
  ...sharedResumeFacts,
  contacts: productContacts,
  title: 'Senior Product Engineer',
  pdfPath: '/cv/alejandro-garcia-iglesias-product-engineer-cv.pdf',
  seo: {
    title: 'Alejandro García Iglesias · Senior Product Engineer',
    description:
      'Senior Product Engineer with 19+ years of experience building web products end to end across frontend architecture, APIs, UI systems, and product discovery.',
    canonicalPath: '/cv/product/',
  },
  summary: [
    'Senior Product Engineer with 19+ years of experience building and evolving web products end to end, combining frontend architecture, full-stack foundations, product thinking, design literacy, and hands-on interface prototyping.',
    'I translate ambiguous business and user needs into practical product and technical solutions, moving between product definition, interface design, implementation, APIs, and system trade-offs.',
    'My strongest work is close to the product: clarifying what to build, shaping the experience, establishing a maintainable technical foundation, and helping teams turn ideas into useful software.',
  ],
  focusAreas: [
    'End-to-end product engineering',
    'Product discovery, design, and technical definition',
    'Frontend architecture and design systems',
    'Full-stack foundations, APIs, and integrations',
  ],
  skills: [
    'End-to-End Feature Ownership',
    'Product Discovery',
    'Requirements Definition',
    'Figma & Interface Prototyping',
    'Product & UX Design Collaboration',
    'AI-assisted Design-to-Code Workflows',
    'Full-stack Development',
    'Frontend Architecture',
    'System Design',
    'Design Systems',
    'API Design & Integration',
    'PostgreSQL',
    'Data Modeling',
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Technical Leadership',
    'Code Quality & Refactoring',
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}
