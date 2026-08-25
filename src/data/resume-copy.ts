import type { Resume, ResumeCopy } from '@/types/resume'

export const englishResumeCopy: ResumeCopy = {
  locale: 'en',
  professionalSummary: 'Professional Summary',
  focusAreas: 'Focus Areas',
  skills: 'Skills',
  experience: 'Experience',
  downloadPdf: 'Download PDF',
  fullHistoryOnLinkedIn: 'Full history on LinkedIn →',
  seeFullExperienceOnLinkedIn: 'See my full experience on LinkedIn:',
  showLess: 'Show less',
  showEarlierRoles: 'Show {count} earlier full-stack roles',
  footerLead: 'Interested in working together?',
  footerBody: "I'm available for full-time or contract opportunities. Get in touch:",
}

export const spanishResumeCopy: ResumeCopy = {
  locale: 'es',
  professionalSummary: 'Resumen Profesional',
  focusAreas: 'Áreas de Enfoque',
  skills: 'Habilidades',
  experience: 'Experiencia',
  downloadPdf: 'Descargar PDF',
  fullHistoryOnLinkedIn: 'Historial completo en LinkedIn →',
  seeFullExperienceOnLinkedIn: 'Ver mi experiencia completa en LinkedIn:',
  showLess: 'Ver menos',
  showEarlierRoles: 'Ver {count} roles full-stack anteriores',
  footerLead: '¿Trabajamos juntos?',
  footerBody: 'Estoy disponible para roles full-time o por contrato. Escribime:',
}

export function getResumeCopy(resume: Resume): ResumeCopy {
  return resume.copy ?? englishResumeCopy
}

export function formatEarlierRolesLabel(copy: ResumeCopy, count: number): string {
  return copy.showEarlierRoles.replace('{count}', String(count))
}
