import { sharedResumeFacts } from '@/data/resume'
import type { Resume, Role } from '@/types/resume'

const productContacts = sharedResumeFacts.contacts.map((contact) =>
  contact.kind === 'site'
    ? {
        ...contact,
        href: 'https://alejandroiglesias.github.io/cv/product/',
      }
    : contact,
)

function tailorRole(role: Role): Role {
  if (role.company === 'Independent Product R&D & AI Consulting') {
    return {
      ...role,
      title: 'Senior Product Engineer',
      bullets: [
        'Partnered with Juana Casa, an architecture studio, to identify where AI could improve access to project and operational knowledge; built an initial React/Next.js assistant with Mastra and RAG, then implemented specialized OpenAI Workspace Agents accessible through Slack and WhatsApp.',
        'Extended the knowledge-access work beyond Juana Casa into a broader product direction; currently developing a reusable knowledge-intelligence layer with grounded RAG and an authenticated MCP server that gives AI assistants and agents source-backed access to company documents and structured operational data.',
        'Evaluated and refined AI-assisted product design and development workflows across discovery, prototyping, implementation, testing, and review, combining coding agents, design tools, and agent orchestration with explicit human verification throughout.',
        'Currently developing an adaptive multi-model AI system investigating whether combining independent models can improve answer quality and factual reliability under practical cost and latency constraints; built a research lab using LangGraph, implementing 14 distinct multi-model workflows with support for multiple AI providers, validated the end-to-end pipeline on a small test run, and began an exploratory evaluation using a public factuality benchmark (AA-Omniscience).',
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
        role.bullets[4],
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
    'Senior Product Engineer with 19+ years of experience building and evolving web products end to end, combining frontend architecture, full-stack foundations, product thinking, and design collaboration.',
    'I translate ambiguous business and user needs into practical product and technical solutions, moving between product definition, interface design, implementation, APIs, and system trade-offs.',
    'My strongest work is close to the product: clarifying what to build, shaping the experience, establishing a maintainable technical foundation, and helping teams turn ideas into useful software.',
  ],
  interests: [
    'End-to-end product engineering',
    'Product discovery, design, and technical definition',
    'Frontend architecture and design systems',
    'Full-stack foundations, APIs, and integrations',
    'Senior Product Engineering roles with meaningful product ownership',
  ],
  skills: [
    'Product Engineering',
    'Product Thinking',
    'Frontend Architecture',
    'System Design',
    'Design Systems',
    'JavaScript',
    'TypeScript',
    'React',
    'Vue.js',
    'Angular',
    'Node.js',
    'API Integration',
    'Microservices',
    'CSS / Tailwind CSS',
    'Technical Leadership',
    'Code Quality & Refactoring',
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}
