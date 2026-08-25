import type { Resume, Role } from '@/types/resume'

import { sharedResumeFacts } from '@/data/general-resume'
import { spanishResumeCopy } from '@/data/resume-copy'

const appliedAiEsContacts = sharedResumeFacts.contacts.map((contact) =>
  contact.kind === 'site'
    ? {
        ...contact,
        href: 'https://alejandroiglesias.github.io/cv/ai/es/',
      }
    : contact,
)

function translateLocation(location: string | undefined): string | undefined {
  if (location === 'Remote') return 'Remoto'
  return location
}

function tailorRole(role: Role): Role {
  if (role.company === 'Independent Product R&D & AI Consulting') {
    return {
      ...role,
      title: 'Senior Software Engineer — IA Aplicada',
      bullets: [
        'Trabajé con los dos socios fundadores de Juana Casa y el equipo del estudio para definir el problema de acceso al conocimiento operativo y de proyectos, y construí de punta a punta un asistente de IA en React/Next.js con Mastra, RAG con fuentes, agentes especializados e integraciones con Slack, WhatsApp y APIs.',
        'A partir de ese problema real estoy construyendo una capa reutilizable de inteligencia de conocimiento para empresas, con RAG, PostgreSQL/pgvector, retrieval vectorial y full-text, hybrid retrieval, reciprocal-rank fusion, reranking, multi-hop acotado, evals y un servidor MCP autenticado para que agentes y asistentes accedan a documentos y datos operativos.',
        'En un laboratorio experimental de investigación aplicada con LangGraph implementé 14 workflows multi-modelo entre varios providers —routing, mixture-of-agents, solver/verifier, orchestrator/worker— y evalúo factualidad, calidad, latencia y costo con benchmarks reproducibles y una corrida exploratoria con AA-Omniscience.',
        'Refiné flujos de desarrollo AI-native en discovery, spec, implementación, testing y review, combinando coding agents (Codex, Claude Code, Cursor), agentes de diseño y orquestación, con verificación humana explícita.',
      ],
    }
  }

  if (role.company === 'Rotunda Software') {
    return {
      ...role,
      location: translateLocation(role.location),
      bullets: [
        'Trabajé sobre una arquitectura de microservicios, con un framework frontend interno, e implementé endpoints de API en Node.js y Express para sostener features de producto.',
        'Colaboré con backend, diseño, QA y marketing para definir soluciones técnicas y de producto, identificando de forma proactiva mejoras de UX e implementación.',
        'Fui el referente principal de frontend del equipo, apoyando a developers en decisiones e implementación de UI.',
        'Lideré la evolución de la librería interna de UI (ModUI): mejoré APIs, simplifiqué el sistema de estilos y aumenté la consistencia.',
        'Impulsé refactors de frontend a escala, incluyendo migraciones de varias aplicaciones y sitios de marketing.',
      ],
    }
  }

  if (role.company === 'BairesDev') {
    return {
      ...role,
      location: translateLocation(role.location),
      bullets: [
        'En el equipo de Experiments de Pinterest implementé y testeé variaciones de UI en React sobre el producto consumer, para soportar experimentación de producto.',
        'Desarrollé y fui owner de la capa de UI de herramientas internas de reporting de advertising: arquitectura de información y presentación de datos.',
        'Sumé responsabilidades de backend: aprendí Go e implementé APIs para entregar features de punta a punta.',
        'Colaboré en equipos distribuidos, con code reviews y testing.',
      ],
    }
  }

  if (role.company === 'Mapme') {
    return {
      ...role,
      location: translateLocation(role.location),
      bullets: [
        'Colaboré de cerca con el CTO y el CEO, traduciendo necesidades de negocio en soluciones de UI prácticas y usables, a menudo sin diseños formales.',
        'Ayudé a evaluar e introducir Vue.js para un rewrite completo del producto, y después lideré la implementación frontend de la aplicación rediseñada desde cero.',
        'Construí una arquitectura basada en componentes con Vue y Vuex, incluyendo componentes de UI reutilizables pensados para mantenimiento y escala.',
      ],
    }
  }

  if (role.company === 'Deviget') {
    return {
      ...role,
      location: translateLocation(role.location),
      bullets: [
        'Trabajé en una plataforma de advertising a gran escala (AppNexus).',
        'Construí componentes de UI modulares con AngularJS y prácticas sólidas de testing.',
        'Contribuí a mejoras de estructura frontend y organización de CSS.',
        'Participé en el desarrollo de un Style Guide.',
        'Colaboré en equipos distribuidos y cross-functional.',
        'Después de AppNexus, construí una UI de administración en React para políticas de seguridad corporativa, en otro engagement.',
      ],
    }
  }

  if (role.company === 'Vulsai') {
    return {
      ...role,
      location: translateLocation(role.location),
      bullets: [
        'Frontend developer principal en varios proyectos.',
        'Introduje tooling moderno de CSS (Sass, Less, Compass), mejorando mantenibilidad y estructura de estilos.',
        'Construí interfaces de visualización de datos con D3.js.',
        'Desarrollé widgets embebibles autocontenidos.',
        'Colaboré de cerca con diseño.',
      ],
    }
  }

  if (role.company === 'Yanma Solutions') {
    return {
      ...role,
      location: translateLocation(role.location),
      bullets: [
        'Establecí estándares de desarrollo del equipo y formé a quienes se sumaban.',
        'Entrevisté candidatos.',
        'Desarrollé una aplicación crítica de subastas en tiempo real.',
      ],
    }
  }

  if (role.company === 'Freelance') {
    return {
      ...role,
      location: translateLocation(role.location),
      bullets: [
        'Trabajé con clientes locales en proyectos variados.',
        'Desarrollé habilidades de relevamiento de requisitos, estimación y organización.',
      ],
    }
  }

  if (role.company === '2mas2 Interactive') {
    return {
      ...role,
      location: translateLocation(role.location),
      bullets: [
        'Desarrollé backends para campañas de advertising interactivo basadas en Flash.',
        'Construí una plataforma reutilizable para procesamiento de contenido dinámico.',
        'Participé en establecer estándares de desarrollo y formé a quienes se sumaban.',
      ],
    }
  }

  if (role.company === 'Syxmedia') {
    return {
      ...role,
      location: translateLocation(role.location),
      bullets: [
        'Implementé mockups y sitios dinámicos.',
        'Trabajé frontend y backend sobre un framework PHP interno.',
      ],
    }
  }

  return {
    ...role,
    location: translateLocation(role.location),
  }
}

export const appliedAiEsResume: Resume = {
  id: 'applied-ai-es',
  ...sharedResumeFacts,
  contacts: appliedAiEsContacts,
  copy: spanishResumeCopy,
  title: 'Senior Software Engineer — IA Aplicada',
  pdfPath: '/cv/alejandro-garcia-iglesias-applied-ai-es-cv.pdf',
  seo: {
    title: 'Alejandro García Iglesias · Senior Software Engineer — IA Aplicada',
    description:
      'Senior Software Engineer con más de 19 años de experiencia en ingeniería de software y especialización en IA aplicada: RAG, agentes, LangGraph y MCP.',
    canonicalPath: '/cv/ai/es/',
  },
  summary: [
    'Senior Software Engineer con más de 19 años de experiencia en ingeniería de software: empecé en desarrollo full-stack, me especialicé en profundidad en frontend y product engineering, y hoy mi foco está en sistemas de IA aplicada.',
    'Construyo soluciones de punta a punta combinando producto, frontend, backend, retrieval, integraciones y agentes para resolver problemas concretos.',
    'Tomo decisiones técnicas con autonomía, trabajo codo a codo con Producto y Diseño, y llevo las soluciones desde un problema mal definido hasta una implementación usable, con evaluación y verificación humana.',
  ],
  earlierExperienceSummary:
    'Experiencia full-stack previa en cuatro roles, construyendo aplicaciones web de punta a punta: frontend, backend, APIs, bases de datos e infraestructura.',
  focusAreas: [
    'Sistemas de IA aplicada e ingeniería de software',
    'RAG, retrieval e inteligencia de conocimiento',
    'Agentes, MCP y orquestación (LangGraph, Mastra)',
    'Product engineering de punta a punta',
    'Roles de Senior Software Engineer con foco en IA aplicada',
  ],
  skills: [
    'IA Generativa',
    'LLM Applications',
    'Retrieval-Augmented Generation (RAG)',
    'AI Agents',
    'Orquestación de Agentes',
    'LangGraph',
    'Mastra',
    'Model Context Protocol (MCP)',
    'Embeddings',
    'Búsqueda Vectorial',
    'Hybrid Retrieval & Reranking',
    'PostgreSQL / pgvector',
    'AI Evaluation & Benchmarking',
    'Model Routing',
    'Product Engineering',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'APIs & Integrations',
    'AI-assisted Development',
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}
