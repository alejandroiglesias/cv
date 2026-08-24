import { sharedResumeFacts } from '@/data/frontend-resume'
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
        'Partnered with Juana Casa, an architecture studio, to identify where AI could improve access to project and operational knowledge; built an initial React/Next.js AI assistant with Mastra and source-backed RAG, then implemented specialized OpenAI Workspace Agents accessible through Slack and WhatsApp.',
        'The knowledge-access problem identified with Juana Casa inspired an independent knowledge-intelligence product currently in development, with the goal of implementing it at the studio; I am building a reusable layer with source-backed RAG and an authenticated MCP server that gives AI assistants and agents access to company documents and structured operational data.',
        'Developing Quorum, an adaptive multi-model research system built with LangGraph; implemented 14 distinct multi-model workflows across multiple AI providers, validated the end-to-end pipeline on a small engineering test run, and began exploratory evaluation with AA-Omniscience under practical cost and latency constraints.',
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
    'Senior Software Engineer with a frontend and full-stack foundation and a product-engineering perspective, now focused on applied AI systems that connect software engineering, retrieval, integrations, and agent workflows to concrete operational problems.',
    'I have built and investigated systems using React/Next.js, Mastra, source-backed RAG, authenticated MCP, specialized agents, and Quorum multi-model orchestration, keeping prototypes, ongoing development, and exploratory evaluation clearly distinct.',
    'My work combines engineering judgment with product context: understanding the source data, defining useful system boundaries, making integrations reliable, and keeping AI-assisted workflows observable and human-verified.',
  ],
  interests: [
    'Applied AI systems and software engineering',
    'RAG, document retrieval, and knowledge-intelligence workflows',
    'MCP integrations and AI agents',
    'LangGraph and multi-model orchestration',
    'Senior Software Engineering roles focused on applied AI',
  ],
  skills: [
    'Retrieval-Augmented Generation (RAG)',
    'Mastra',
    'AI Agents',
    'MCP Integrations',
    'LangGraph',
    'Model Routing & Orchestration',
    'Multi-model Workflows',
    'AI Evaluation & Benchmarking',
    'TypeScript',
    'JavaScript',
    'React',
    'Next.js',
    'Node.js',
    'API Integration',
    'Microservices',
    'Technical Documentation',
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}
