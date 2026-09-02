import { describe, expect, it } from 'vitest'
import { appliedAiEsResume } from '../data/applied-ai-es-resume'
import { appliedAiResume } from '../data/applied-ai-resume'
import { frontendResume } from '../data/frontend-resume'
import { forwardDeployedResume } from '../data/forward-deployed-resume'
import { generalResume } from '../data/general-resume'
import { productResume } from '../data/product-resume'
import { technicalProjectAiSystemsResume } from '../data/technical-project-ai-systems-resume'
import type { Resume } from '../types/resume'

const variants: Array<[string, Resume]> = [
  ['general', generalResume],
  ['frontend', frontendResume],
  ['product', productResume],
  ['applied AI', appliedAiResume],
  ['applied AI ES', appliedAiEsResume],
  ['forward deployed AI', forwardDeployedResume],
  ['technical project delivery', technicalProjectAiSystemsResume],
]

const editorialFields = (resume: Resume): string[] => [
  resume.title,
  resume.seo.title,
  resume.seo.description,
  resume.earlierExperienceSummary,
  ...resume.summary,
  ...resume.focusAreas,
  ...resume.skills,
  ...resume.roles.flatMap((role) => [role.company, role.title, ...role.bullets]),
]

function normalizedNarrative(resume: Resume) {
  return editorialFields(resume).join(' ').toLocaleLowerCase()
}

function containsClaim(narrative: string, claim: string) {
  const escapedClaim = claim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`\\b${escapedClaim}\\b`, 'iu').test(narrative)
}

const requiredConcepts: Array<[string, Resume, string[]]> = [
  ['frontend', frontendResume, ['frontend architecture', 'design systems', 'product']],
  ['product', productResume, ['product discovery', 'end-to-end', 'requirements', 'Figma', 'design-to-code']],
  ['applied AI', appliedAiResume, ['source-backed RAG', 'MCP', 'LangGraph', '14 distinct multi-model workflows']],
  ['forward deployed AI', forwardDeployedResume, ['Customer Discovery', 'stakeholder collaboration', 'Hermes Agent', 'authenticated MCP', 'system integrations']],
  ['technical project delivery', technicalProjectAiSystemsResume, ['stakeholders', 'requirements', 'delivery', 'system design']],
  ['applied AI ES', appliedAiEsResume, ['IA aplicada', 'RAG', 'LangGraph', 'MCP']],
]

const prohibitedClaims: Array<[string, Resume, string[]]> = [
  ['applied AI', appliedAiResume, ['ML training', 'fine-tuning', 'CUDA', 'MLOps', 'production AI', 'improved accuracy', 'reduced hallucinations']],
  ['forward deployed AI', forwardDeployedResume, ['enterprise deployments', 'Kubernetes', 'Docker', 'production AI']],
  ['applied AI ES', appliedAiEsResume, ['TuLanding', 'Ground', 'Quorum', 'ML training', 'fine-tuning', 'CUDA', 'MLOps', 'production AI']],
  ['technical project delivery', technicalProjectAiSystemsResume, ['Jira', 'Scrum', 'sprint planning', 'roadmapping', 'UAT', 'vendor management', 'budget ownership', 'team management']],
]

describe('resume editorial policy', () => {
  it.each(variants)('keeps unlaunched or unrelated project names out of the %s narrative', (_, resume) => {
    const narrative = normalizedNarrative(resume)
    for (const claim of ['TuLanding', 'Ground', 'Quorum']) {
      expect(containsClaim(narrative, claim)).toBe(false)
    }
  })

  it.each(requiredConcepts)('keeps the %s variant legible for its target', (_, resume, concepts) => {
    const narrative = normalizedNarrative(resume)
    for (const concept of concepts) {
      expect(narrative).toContain(concept.toLocaleLowerCase())
    }
  })

  it.each(prohibitedClaims)('does not make unsupported %s claims', (_, resume, claims) => {
    const narrative = normalizedNarrative(resume)
    for (const claim of claims) {
      expect(containsClaim(narrative, claim)).toBe(false)
    }
  })

  it('keeps recent narratives differentiated without freezing exact copy', () => {
    expect(editorialFields(frontendResume).join(' ')).toContain('product-focused')
    expect(editorialFields(productResume).join(' ')).toContain('Product Engineer')
    expect(editorialFields(appliedAiResume).join(' ')).toContain('knowledge-intelligence')
    expect(editorialFields(technicalProjectAiSystemsResume).join(' ')).toContain('Technical Project Delivery')
  })

  it('keeps the requested Hermes implementation and open-source evidence visible', () => {
    for (const resume of [generalResume, productResume, appliedAiResume, forwardDeployedResume]) {
      const narrative = editorialFields(resume).join(' ')

      expect(narrative).toContain('Hermes Agent')
      expect(narrative).toContain('Slack')
      expect(narrative).toContain('WhatsApp')
      expect(narrative).toContain('Hermes Dreaming')
      expect(narrative).toContain('https://github.com/alejandroiglesias/hermes-dreaming')
    }
  })

  it('keeps the Spanish variant localized and on its applied-AI track', () => {
    expect(appliedAiEsResume.copy?.locale).toBe('es')
    expect(appliedAiEsResume.title).toContain('IA Aplicada')
    expect(appliedAiEsResume.summary.join(' ')).toContain('más de 19 años')
    expect(editorialFields(appliedAiEsResume).join(' ')).toContain('Aplicaciones con LLMs')
  })
})
