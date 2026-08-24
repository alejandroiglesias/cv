import { sharedResumeFacts } from '@/data/resume'
import type { Resume, Role } from '@/types/resume'

const technicalProjectContacts = sharedResumeFacts.contacts.map((contact) =>
  contact.kind === 'site'
    ? {
        ...contact,
        href: 'https://alejandroiglesias.github.io/cv/tpm/',
      }
    : contact,
)

function tailorRole(role: Role): Role {
  if (role.company === 'Independent Product R&D & AI Consulting') {
    return {
      ...role,
      title: 'Senior Software Engineer — Technical Product & AI Systems',
      bullets: [
        "Worked directly with Juana Casa's two founding partners and members of the studio team as key stakeholders, clarifying operational knowledge-access needs, defining requirements, and translating them into an initial React/Next.js assistant with Mastra and RAG.",
        'The knowledge-access problem identified with Juana Casa inspired Ground, an independent product currently in development with the goal of implementing it at the studio; I translated that product direction into scope, system boundaries, and an integration approach spanning source-backed RAG, authenticated MCP access, and specialized Workspace Agents through Slack and WhatsApp.',
        'Drove delivery from discovery and prototyping through implementation, testing, and review, using AI-assisted workflows while keeping decisions and outputs explicitly human-verified.',
        'Designed and carried out a staged Quorum research initiative across 14 multi-model workflows and multiple providers, balancing quality hypotheses with cost, latency, integration, and exploratory evaluation constraints.',
      ],
    }
  }

  if (role.company === 'Rotunda Software') {
    return {
      ...role,
      bullets: [
        role.bullets[0],
        role.bullets[5],
        role.bullets[2],
        role.bullets[1],
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

export const technicalProjectAiSystemsResume: Resume = {
  id: 'tpm',
  ...sharedResumeFacts,
  contacts: technicalProjectContacts,
  title: 'Senior Software Engineer | Technical Product, AI Systems & Delivery',
  pdfPath: '/cv/alejandro-garcia-iglesias-technical-project-manager-cv.pdf',
  seo: {
    title: 'Alejandro García Iglesias · Technical Product, AI Systems & Delivery',
    description:
      'Senior Software Engineer with 19+ years of experience spanning technical leadership, system design, product delivery, AI systems, workflow automation, and business-to-technical translation.',
    canonicalPath: '/cv/tpm/',
  },
  summary: [
    'Senior Software Engineer with 19+ years of experience building and evolving web products, with a strong focus on technical leadership, product thinking, system design, and AI-assisted workflows.',
    'I work at the intersection of business, product, and engineering—collaborating with stakeholders, translating complex needs into practical technical solutions, identifying trade-offs, and helping cross-functional teams move from ambiguity toward execution.',
    "My recent work focuses on AI systems, workflow automation, integrations, and turning operational processes into software; I'm now seeking a Technical Project Manager opportunity where I can combine that engineering depth with product, requirements, and AI systems delivery.",
  ],
  interests: [
    'Technical project and product delivery for complex software systems',
    'AI systems, workflow automation & process improvement',
    'Business-to-technical requirements translation',
    'System architecture, integrations & technical decision-making',
    'Roles combining engineering depth with project and product ownership',
  ],
  skills: [
    'Business-to-Technical Translation',
    'Stakeholder Collaboration',
    'Cross-functional Coordination',
    'Requirements Discovery & Definition',
    'Technical Leadership',
    'System Design & Architecture',
    'Architecture Trade-off Analysis',
    'API & Systems Integration',
    'Process & Workflow Design',
    'Technical Documentation',
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}

/** Explicit current name; the longer export remains for legacy imports. */
export const tpmResume = technicalProjectAiSystemsResume
