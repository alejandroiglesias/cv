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
        'Built and maintain <a href="https://github.com/alejandroiglesias/hermes-dreaming">Hermes Dreaming</a>, an open-source Python plugin for Hermes Agent that consolidates long-term memory through scheduled, reviewable agent workflows with persistent state and lifecycle tooling.',
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
    'Senior Software Engineer with 19+ years of experience across full-stack, frontend, product engineering, and a recent focus on customer-facing Applied AI solutions.',
    'I work directly with customers and stakeholders to turn ambiguous operational problems into practical AI systems, spanning discovery, requirements, integrations, retrieval, agents, APIs, and user-facing applications.',
    'I bridge product discovery and hands-on delivery, adapting solutions to existing workflows and organizational data while applying senior engineering judgment across system boundaries and technical trade-offs.',
  ],
  focusAreas: [
    'Customer-facing Applied AI and solutions engineering',
    'Discovery, requirements definition, and stakeholder collaboration',
    'AI agent deployments and workflow integration',
    'RAG, document retrieval, and organizational knowledge systems',
    'APIs, authenticated MCP, and system integrations',
  ],
  skills: [
    'Customer Discovery',
    'Requirements Definition',
    'Stakeholder Collaboration',
    'Solution Architecture',
    'Hermes Agent',
    'AI Agent Integration',
    'Retrieval-Augmented Generation (RAG)',
    'Document Retrieval',
    'Model Context Protocol (MCP)',
    'Authentication & Authorization',
    'API Design & Integration',
    'System Design',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'React',
    'Next.js',
    'Mastra',
    'LangGraph',
    'PostgreSQL & pgvector',
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}
