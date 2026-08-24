import { sharedResumeFacts } from '@/data/resume'
import type { Resume, Role } from '@/types/resume'

const appliedAiContacts = sharedResumeFacts.contacts.map((contact) =>
  contact.kind === 'site'
    ? {
        ...contact,
        href: 'https://alejandroiglesias.github.io/cv/ai/',
      }
    : contact,
)

function tailorRole(role: Role): Role {
  if (role.company === 'Independent Product R&D & AI Consulting') {
    return {
      ...role,
      title: 'Senior Software Engineer — Applied AI',
      bullets: [
        'Partnered with Juana Casa, an architecture studio, to identify where AI could improve access to project and operational knowledge; built an initial React/Next.js assistant with Mastra and grounded RAG, then implemented specialized OpenAI Workspace Agents accessible through Slack and WhatsApp.',
        'The Juana Casa work evolved into Ground, a knowledge-intelligence direction currently in development; I am building a reusable layer with source-backed RAG and an authenticated MCP server that gives AI assistants and agents access to company documents and structured operational data.',
        'Currently developing Quorum, an adaptive multi-model AI system investigating whether combining independent models can improve answer quality and factual reliability under practical cost and latency constraints; built a research lab using LangGraph, implementing 14 distinct multi-model workflows with support for multiple AI providers, validated the end-to-end pipeline on a small engineering test run, and began an exploratory evaluation using a public factuality benchmark (AA-Omniscience).',
        'Evaluated and refined AI-assisted product design and development workflows, combining coding agents (Codex, Claude Code, Cursor), design tools (Claude Design, OpenDesign, Pen), and agent orchestration across discovery, prototyping, implementation, testing, and review, with explicit human verification throughout.',
      ],
    }
  }

  if (role.company === 'Rotunda Software') {
    return {
      ...role,
      bullets: [
        role.bullets[6],
        role.bullets[1],
        role.bullets[2],
        role.bullets[0],
        role.bullets[5],
        role.bullets[3],
        role.bullets[4],
      ],
    }
  }

  return role
}

export const appliedAiResume: Resume = {
  id: 'applied-ai',
  ...sharedResumeFacts,
  contacts: appliedAiContacts,
  title: 'Senior Software Engineer — Applied AI',
  pdfPath: '/cv/alejandro-garcia-iglesias-applied-ai-cv.pdf',
  seo: {
    title: 'Alejandro García Iglesias · Senior Software Engineer — Applied AI',
    description:
      'Senior Software Engineer with a frontend and full-stack foundation, applying retrieval, MCP, agents, and multi-model workflows to practical AI systems.',
    canonicalPath: '/cv/ai/',
  },
  summary: [
    'Senior Software Engineer with a frontend and full-stack foundation, now focused on applied AI systems that connect software engineering, retrieval, integrations, and agent workflows to concrete operational problems.',
    'I have built and investigated systems using React/Next.js, Mastra, grounded RAG, authenticated MCP, specialized agents, and Quorum multi-model orchestration, keeping prototypes, ongoing development, and exploratory evaluation clearly distinct.',
    'My work combines engineering judgment with product context: understanding the source data, defining useful system boundaries, making integrations reliable, and keeping AI-assisted workflows observable and human-verified.',
  ],
  interests: [
    'Applied AI systems and software engineering',
    'Grounded RAG and knowledge-intelligence workflows',
    'MCP integrations and AI agents',
    'LangGraph and multi-model orchestration',
    'Senior Software Engineering roles focused on applied AI',
  ],
  skills: [
    'Software Engineering',
    'Applied AI Systems',
    'Grounded RAG',
    'AI Agents',
    'MCP Integrations',
    'LangGraph',
    'Multi-model Workflows',
    'System Design',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'API Integration',
    'Microservices',
    'Technical Documentation',
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}
