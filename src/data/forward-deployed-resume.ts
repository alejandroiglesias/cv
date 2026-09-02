import type { Resume, Role } from '@/types/resume'

import { sharedResumeFacts } from '@/data/general-resume'

const forwardDeployedContacts = sharedResumeFacts.contacts.map((contact) =>
  contact.kind === 'site'
    ? {
        ...contact,
        href: 'https://alejandroiglesias.github.io/cv/fde/',
      }
    : contact
)

function tailorRole(role: Role): Role {
  if (role.company === 'Independent Product R&D & AI Consulting') {
    return {
      ...role,
      title: 'Senior Software Engineer — Applied AI & Solutions',
      bullets: [
        "Partnered directly with Juana Casa's two founding partners and studio team to discover project and operational knowledge needs, scope an appropriate solution, and translate ambiguous requirements into an end-to-end AI system.",
        "Implemented specialized AI agents using Hermes Agent and integrated them into the studio's Slack and WhatsApp workflows, giving the team conversational access to organizational knowledge and operational data.",
        'Developing a reusable source-backed RAG and authenticated MCP integration layer that connects AI assistants and agents with company documents and structured operational data.',
        'Iterated directly with stakeholders on requirements, workflows, integrations, and product behavior as the solution evolved from prototype toward operational use.',
        'Built and maintain <a href="https://github.com/alejandroiglesias/hermes-dreaming">Hermes Dreaming</a>, an open-source memory-consolidation plugin for Hermes Agent, using AI-assisted engineering to work with its plugin and tool APIs, scheduled execution, persistent state, and configurable memory operations.',
      ],
    }
  }

  if (role.company === 'Rotunda Software') {
    return {
      ...role,
      bullets: [
        role.bullets[5],
        role.bullets[6],
        role.bullets[4],
        role.bullets[2],
        role.bullets[0],
        role.bullets[1],
      ],
    }
  }

  if (role.company === 'BairesDev') {
    return {
      ...role,
      bullets: [role.bullets[2], role.bullets[3], role.bullets[0], role.bullets[1]],
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

export const forwardDeployedResume: Resume = {
  id: 'fde',
  ...sharedResumeFacts,
  contacts: forwardDeployedContacts,
  title: 'Senior Software Engineer — Forward Deployed AI',
  pdfPath: '/cv/alejandro-garcia-iglesias-forward-deployed-ai-cv.pdf',
  seo: {
    title: 'Alejandro García Iglesias · Senior Software Engineer — Forward Deployed AI',
    description:
      'Senior Software Engineer focused on customer-facing Applied AI, discovery, agent deployments, organizational knowledge, APIs, and system integrations.',
    canonicalPath: '/cv/fde/',
  },
  summary: [
    'Senior Software Engineer with 19+ years of experience across frontend, full-stack, product engineering, and Applied AI. Now focused on customer-facing AI solutions, working directly with stakeholders to turn ambiguous operational problems into practical systems spanning discovery, integrations, retrieval, agents, APIs, and user-facing applications.',
  ],
  focusAreas: [
    'Customer-facing Applied AI engineering',
    'AI agent integrations & workflows',
    'RAG & organizational knowledge systems',
    'APIs, MCP & business-system integrations',
    'Product discovery & stakeholder collaboration',
    'End-to-end AI product delivery',
  ],
  skills: [
    'TypeScript',
    'JavaScript',
    'Node.js',
    'React',
    'Next.js',
    'REST APIs',
    'API Design & Integration',
    'Model Context Protocol (MCP)',
    'Retrieval-Augmented Generation (RAG)',
    'PostgreSQL',
    'pgvector',
    'Mastra',
    'LangGraph',
    'Hermes Agent',
    'AI Agents & Tool Use',
    'Git',
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}
