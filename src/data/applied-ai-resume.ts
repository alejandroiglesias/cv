import type { Resume, Role } from '@/types/resume'

import { sharedResumeFacts } from '@/data/general-resume'

const appliedAiContacts = sharedResumeFacts.contacts.map((contact) =>
  contact.kind === 'site'
    ? {
        ...contact,
        href: 'https://alejandroiglesias.github.io/cv/ai/',
      }
    : contact
)

function tailorRole(role: Role): Role {
  if (role.company === 'Independent Product R&D & AI Consulting') {
    return {
      ...role,
      title: 'Senior Software Engineer — Applied AI',
      bullets: [
        'Partnered directly with Juana Casa’s two founding partners and studio team to understand and define their needs around access to project and operational knowledge. From that discovery, I built the solution end to end: an initial React/Next.js AI assistant with Mastra and source-backed RAG, followed by specialized OpenAI Workspace Agents through Slack and WhatsApp.',
        'The knowledge-access problem identified with Juana Casa inspired an independent AI knowledge-intelligence product I am developing for companies, with the studio set to serve as its first real-world implementation; I am building a reusable layer with source-backed RAG and an authenticated MCP server that gives AI assistants and agents access to company documents and structured operational data.',
        'Developing an adaptive multi-model research system built with LangGraph; implemented 14 distinct multi-model workflows across multiple AI providers, validated the end-to-end pipeline on a small engineering test run, and began exploratory evaluation with AA-Omniscience under practical cost and latency constraints.',
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

  if (role.company === 'BairesDev') {
    return {
      ...role,
      bullets: role.bullets.map((bullet) =>
        bullet.replace(
          'learning Go and implementing APIs to deliver features end to end.',
          'learning Go and implementing APIs to deliver features.',
        ),
      ),
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
    'Senior Software Engineer with 19+ years of experience spanning full-stack web development, deep frontend and product engineering, and a recent focus on Applied AI systems.',
    'I build end-to-end AI products combining product thinking, frontend, backend, retrieval, integrations, and agent workflows to solve concrete operational problems.',
    'I work autonomously from problem definition and experience design through implementation, evaluation, and iteration, applying senior engineering judgment in close collaboration with Product and Design.',
  ],
  focusAreas: [
    'Applied AI systems and software engineering',
    'End-to-end AI product engineering',
    'RAG, document retrieval, and knowledge-intelligence workflows',
    'MCP integrations and AI agents',
    'LangGraph and multi-model orchestration',
  ],
  skills: [
    'LLM Applications',
    'Retrieval-Augmented Generation (RAG)',
    'Embeddings',
    'Vector Search',
    'Hybrid Retrieval & Reranking',
    'PostgreSQL & pgvector',
    'Mastra',
    'Agent Orchestration',
    'Model Context Protocol (MCP)',
    'LangGraph',
    'AI Evaluation & Benchmarking',
    'Product Discovery',
    'TypeScript',
    'JavaScript',
    'React',
    'Next.js',
    'Node.js',
    'API Integration',
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}
