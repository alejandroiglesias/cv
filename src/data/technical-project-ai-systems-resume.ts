import { sharedResumeFacts } from '@/data/resume'
import type { Resume, Role } from '@/types/resume'

const technicalProjectContacts = sharedResumeFacts.contacts.map((contact) =>
  contact.kind === 'site'
    ? {
        ...contact,
        href: 'https://alejandroiglesias.github.io/cv/technical-project-ai-systems/',
      }
    : contact,
)

function tailorRole(role: Role): Role {
  if (role.company === 'Independent Product R&D & AI Consulting') {
    return {
      ...role,
      company: 'Independent Consulting & Product R&D',
      title: 'Technical Product & AI Systems Consultant',
      bullets: [
        'Partnered with Juana Casa, an architecture studio, to identify where AI could improve access to project and operational knowledge; translated those needs into an initial React/Next.js assistant with Mastra and RAG, then implemented specialized OpenAI Workspace Agents accessible through Slack and WhatsApp.',
        'Extended the knowledge-access work beyond Juana Casa into a broader product direction; currently developing a reusable knowledge-intelligence layer with grounded RAG and an authenticated MCP server that gives AI assistants and agents source-backed access to company documents and structured operational data.',
        'Designed, built, and launched <a href="https://tulanding.page/">TuLanding</a>, taking a subscription product from hypothesis through implementation and release; developed its create → preview → subscribe journey with Astro/React and Cloudflare.',
        'Evaluated and refined AI-assisted product design and development workflows across discovery, prototyping, implementation, testing, and review, combining coding agents, design tools, and agent orchestration with explicit human verification throughout.',
        'Investigated whether deliberation across multiple AI models could support a more useful and transparent second-opinion experience; built a React/Next.js and TypeScript prototype with independent responses, cross-model debate, and final synthesis surfacing agreement and dissent.',
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
        role.bullets[3],
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

export const technicalProjectAiSystemsResume: Resume = {
  id: 'technical-project-ai-systems',
  ...sharedResumeFacts,
  contacts: technicalProjectContacts,
  title: 'Senior Software Engineer | Technical Product, AI Systems & Delivery',
  pdfPath: '/cv/alejandro-garcia-iglesias-technical-project-ai-systems-cv.pdf',
  seo: {
    title: 'Alejandro García Iglesias · Technical Product, AI Systems & Delivery',
    description:
      'Senior Software Engineer with 19+ years of experience spanning technical leadership, system design, product delivery, AI systems, workflow automation, and business-to-technical translation.',
    canonicalPath: '/cv/technical-project-ai-systems/',
  },
  summary: [
    'Senior Software Engineer with 19+ years of experience building and evolving web products, with a strong focus on technical leadership, product thinking, system design, and AI-assisted workflows.',
    'I work at the intersection of business, product, and engineering—translating complex needs into practical technical solutions, identifying trade-offs, and helping cross-functional teams move from ambiguity toward execution.',
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
    'Technical Leadership',
    'Product & Requirements Definition',
    'System Design & Architecture',
    'AI Systems & Workflow Automation',
    'Business-to-Technical Translation',
    'API & Systems Integration',
    'Cross-functional Collaboration',
    'Process & Workflow Design',
    'Technical Documentation',
    'Product Thinking',
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Microservices',
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}
