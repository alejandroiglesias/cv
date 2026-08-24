import type { Resume, Role } from '@/types/resume'

import { sharedResumeFacts } from '@/data/frontend-resume'

const technicalProjectContacts = sharedResumeFacts.contacts.map((contact) =>
  contact.kind === 'site'
    ? {
        ...contact,
        href: 'https://alejandroiglesias.github.io/cv/tpm/',
      }
    : contact
)

function tailorRole(role: Role): Role {
  if (role.company === 'Independent Product R&D & AI Consulting') {
    return {
      ...role,
      title: 'Senior Software Engineer — Technical Product & AI Systems',
      bullets: [
        "Worked directly with Juana Casa's two founding partners and members of the studio team as key stakeholders, clarifying operational knowledge-access needs, defining requirements, and translating them into an initial React/Next.js AI assistant with Mastra and RAG, and specialized Workspace Agents through Slack and WhatsApp.",
        'The knowledge-access problem identified with Juana Casa inspired an independent AI knowledge-intelligence product I am developing for companies, with the studio set to serve as its first real-world implementation; I translated that product direction into scope, system boundaries, and an integration approach spanning source-backed RAG and authenticated MCP access.',
        'Drove delivery from discovery and prototyping through implementation, testing, and review, using AI-assisted workflows while keeping decisions and outputs explicitly human-verified.',
        'Designed and carried out a staged multi-model research initiative across 14 workflows and multiple providers, balancing quality hypotheses with cost, latency, integration, and exploratory evaluation constraints.',
      ],
    }
  }

  if (role.company === 'Rotunda Software') {
    return {
      ...role,
      bullets: [
        role.bullets[5],
        role.bullets[0],
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
  title: 'Senior Software Engineer',
  pdfPath: '/cv/alejandro-garcia-iglesias-technical-project-manager-cv.pdf',
  seo: {
    title: 'Alejandro García Iglesias · Senior Software Engineer',
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
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}

/** Explicit current name; the longer export remains for legacy imports. */
export const tpmResume = technicalProjectAiSystemsResume
