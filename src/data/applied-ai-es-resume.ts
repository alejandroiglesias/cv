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
  if (location === 'Buenos Aires, AR') return 'Buenos Aires, Argentina'
  return location
}

function translateDate(date: string): string {
  const monthTranslations: Record<string, string> = {
    Jan: 'ene',
    Feb: 'feb',
    Mar: 'mar',
    Apr: 'abr',
    May: 'may',
    Jun: 'jun',
    Jul: 'jul',
    Aug: 'ago',
    Sep: 'sep',
    Oct: 'oct',
    Nov: 'nov',
    Dec: 'dic',
  }

  if (date === 'Present') return 'Actualidad'

  const [month, year] = date.split(' ')
  return year && monthTranslations[month] ? `${monthTranslations[month]} ${year}` : date
}

function tailorRole(role: Role): Role {
  if (role.company === 'Independent Product R&D & AI Consulting') {
    return {
      ...role,
      title: 'Senior Software Engineer — IA Aplicada',
      start: translateDate(role.start),
      end: translateDate(role.end),
      bullets: [
        'Trabajé junto a los dos socios fundadores de Juana Casa y al equipo del estudio para entender y definir sus necesidades de acceso al conocimiento operativo y de proyectos. A partir de ese discovery, construí de punta a punta un asistente de IA con React/Next.js, Mastra, RAG con fuentes, agentes especializados e integraciones con Slack, WhatsApp y APIs.',
        'A partir de esa necesidad concreta, estoy desarrollando una capa reutilizable de acceso al conocimiento empresarial con PostgreSQL/pgvector, búsqueda vectorial y full-text, retrieval híbrido con reciprocal-rank fusion, reranking, multi-hop acotado, evals y un servidor MCP autenticado para dar a agentes y asistentes acceso a documentos y datos operativos estructurados.',
        'Estoy desarrollando un sistema experimental de investigación aplicada con LangGraph para explorar cómo distintos flujos de orquestación multi-modelo afectan la calidad y la confiabilidad factual bajo restricciones prácticas de costo y latencia. Implementé 14 flujos sobre múltiples proveedores —routing, mixture-of-agents, solver/verifier y orchestrator/worker—, validé el pipeline de punta a punta con una prueba de ingeniería acotada y comencé una evaluación exploratoria con AA-Omniscience.',
        'Refiné flujos de desarrollo asistido por IA a lo largo de discovery, especificación, implementación, testing y review, combinando agentes de código (Codex, Claude Code, Cursor), agentes de diseño y orquestación de agentes, con verificación humana explícita.',
      ],
    }
  }

  if (role.company === 'Rotunda Software') {
    return {
      ...role,
      location: translateLocation(role.location),
      start: translateDate(role.start),
      end: translateDate(role.end),
      bullets: [
        'Trabajé con una arquitectura de microservicios y un framework frontend interno; además, implementé endpoints de API con Node.js y Express para dar soporte a funcionalidades de producto.',
        'Colaboré con backend, Diseño, QA y Marketing para definir soluciones técnicas y de producto, e identifiqué proactivamente mejoras de UX e implementación.',
        'Fui el principal referente frontend del equipo y acompañé a otros desarrolladores en decisiones e implementación de UI.',
        'Lideré la evolución de la librería interna de UI (ModUI): mejoré sus APIs, simplifiqué el sistema de estilos y aumenté la consistencia.',
        'Impulsé refactorizaciones de frontend a gran escala, incluidas las migraciones de varias aplicaciones y sitios de marketing.',
      ],
    }
  }

  if (role.company === 'BairesDev') {
    return {
      ...role,
      location: translateLocation(role.location),
      start: translateDate(role.start),
      end: translateDate(role.end),
      bullets: [
        'En el equipo de Experiments de Pinterest, implementé y probé variaciones de UI en React sobre su producto principal para habilitar experimentación de producto.',
        'Tuve ownership de la capa de UI de herramientas internas de reporting publicitario y definí su arquitectura de información y presentación de datos.',
        'Sumé responsabilidades de backend: aprendí Go e implementé APIs para entregar funcionalidades de punta a punta.',
        'Trabajé en equipos distribuidos y participé en code reviews y testing.',
      ],
    }
  }

  if (role.company === 'Mapme') {
    return {
      ...role,
      location: translateLocation(role.location),
      start: translateDate(role.start),
      end: translateDate(role.end),
      bullets: [
        'Colaboré de cerca con el CTO y el CEO, traduciendo necesidades de negocio en soluciones de UI prácticas y fáciles de usar, a menudo sin diseños formales.',
        'Ayudé a evaluar e introducir Vue.js para una reescritura completa del producto y luego lideré desde cero la implementación frontend de la aplicación rediseñada.',
        'Construí una arquitectura basada en componentes con Vue y Vuex, incluidos componentes de UI reutilizables diseñados para facilitar la mantenibilidad y la escalabilidad.',
      ],
    }
  }

  if (role.company === 'Deviget') {
    return {
      ...role,
      location: translateLocation(role.location),
      start: translateDate(role.start),
      end: translateDate(role.end),
      bullets: [
        'Trabajé en una plataforma de publicidad a gran escala (AppNexus).',
        'Construí componentes de UI modulares con AngularJS y buenas prácticas de testing.',
        'Contribuí a mejoras de estructura frontend y organización de CSS.',
        'Participé en el desarrollo de un Style Guide.',
        'Colaboré en equipos distribuidos y multidisciplinarios.',
        'Después de AppNexus, en otro proyecto para un cliente, construí una UI de administración en React para políticas de seguridad corporativa.',
      ],
    }
  }

  if (role.company === 'Vulsai') {
    return {
      ...role,
      location: translateLocation(role.location),
      start: translateDate(role.start),
      end: translateDate(role.end),
      bullets: [
        'Fui el principal desarrollador frontend en varios proyectos.',
        'Introduje herramientas modernas de CSS (Sass, Less, Compass), mejorando la mantenibilidad y la estructura de los estilos.',
        'Construí interfaces de visualización de datos con D3.js.',
        'Desarrollé widgets embebibles autocontenidos.',
        'Colaboré de cerca con Diseño.',
      ],
    }
  }

  if (role.company === 'Yanma Solutions') {
    return {
      ...role,
      location: translateLocation(role.location),
      start: translateDate(role.start),
      end: translateDate(role.end),
      bullets: [
        'Establecí estándares de desarrollo para el equipo y formé a quienes se incorporaban.',
        'Entrevisté candidatos.',
        'Desarrollé una aplicación crítica de subastas en tiempo real.',
      ],
    }
  }

  if (role.company === 'Freelance') {
    return {
      ...role,
      location: translateLocation(role.location),
      start: translateDate(role.start),
      end: translateDate(role.end),
      bullets: [
        'Trabajé con clientes locales en proyectos variados.',
        'Desarrollé habilidades para relevar requisitos, estimar y organizar proyectos.',
      ],
    }
  }

  if (role.company === '2mas2 Interactive') {
    return {
      ...role,
      location: translateLocation(role.location),
      start: translateDate(role.start),
      end: translateDate(role.end),
      bullets: [
        'Desarrollé backends para campañas de publicidad interactiva basadas en Flash.',
        'Construí una plataforma reutilizable para procesamiento de contenido dinámico.',
        'Participé en la definición de estándares de desarrollo y formé a quienes se incorporaban.',
      ],
    }
  }

  if (role.company === 'Syxmedia') {
    return {
      ...role,
      location: translateLocation(role.location),
      start: translateDate(role.start),
      end: translateDate(role.end),
      bullets: [
        'Implementé maquetas y sitios dinámicos.',
        'Trabajé tanto en frontend como en backend sobre un framework PHP interno.',
      ],
    }
  }

  return {
    ...role,
    location: translateLocation(role.location),
    start: translateDate(role.start),
    end: translateDate(role.end),
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
      'Senior Software Engineer con más de 19 años de experiencia en desarrollo full-stack, frontend y product engineering, con foco actual en IA aplicada: RAG, agentes, LangGraph y MCP.',
    canonicalPath: '/cv/ai/es/',
  },
  summary: [
    'Senior Software Engineer con más de 19 años de experiencia, desde el desarrollo full-stack hasta una profunda especialización en frontend y product engineering, y con foco actual en sistemas de IA aplicada.',
    'Construyo soluciones de punta a punta combinando producto, frontend, backend, retrieval, integraciones y agentes para resolver problemas concretos.',
    'Trabajo con autonomía desde la definición del problema y la experiencia hasta la implementación, evaluación e iteración de la solución, colaborando de cerca con Producto y Diseño y tomando decisiones técnicas a lo largo de todo el proceso.',
  ],
  earlierExperienceSummary:
    'Experiencia full-stack previa en cuatro roles, desarrollando aplicaciones web de punta a punta: frontend, backend, APIs, bases de datos e infraestructura.',
  focusAreas: [
    'Sistemas de IA aplicada e ingeniería de software',
    'RAG, retrieval y sistemas de conocimiento',
    'Agentes, MCP y orquestación (LangGraph, Mastra)',
    'Product engineering de punta a punta',
    'Productos con IA, automatización e interfaces conversacionales',
  ],
  skills: [
    'IA generativa',
    'Aplicaciones con LLMs',
    'Retrieval-Augmented Generation (RAG)',
    'Agentes de IA',
    'Orquestación de agentes',
    'LangGraph',
    'Mastra',
    'Model Context Protocol (MCP)',
    'Embeddings',
    'Búsqueda vectorial',
    'Retrieval híbrido y reranking',
    'PostgreSQL / pgvector',
    'Evaluación de IA y benchmarking',
    'Integración multi-modelo y model routing',
    'Product engineering',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'APIs e integraciones',
    'Desarrollo asistido por IA',
  ],
  roles: sharedResumeFacts.roles.map(tailorRole),
}
