import { describe, expect, it } from 'vitest'
import { appliedAiResume } from '../data/applied-ai-resume'
import { resume, sharedResumeFacts } from '../data/resume'
import { productResume } from '../data/product-resume'
import { getResumeForPath } from '../data/resumes'
import { technicalProjectAiSystemsResume } from '../data/technical-project-ai-systems-resume'

const variants = [resume, productResume, appliedAiResume, technicalProjectAiSystemsResume]

describe('resume variants', () => {
  it('keeps the Frontend resume as the default and preserves the legacy export', () => {
    expect(getResumeForPath('/cv/')).toBe(resume)
    expect(getResumeForPath('/cv/frontend/')).toBe(resume)
    expect(getResumeForPath('/cv/unknown/')).toBe(resume)
    expect(resume.title).toBe('Senior Frontend Engineer')
    expect(resume.pdfPath).toBe('/cv/alejandro-garcia-iglesias-cv.pdf')
    expect(resume.seo.canonicalPath).toBe('/cv/')
  })

  it.each([
    [productResume, 'Senior Product Engineer', '/cv/product/', '/cv/alejandro-garcia-iglesias-product-engineer-cv.pdf'],
    [appliedAiResume, 'Senior Software Engineer — Applied AI', '/cv/ai/', '/cv/alejandro-garcia-iglesias-applied-ai-cv.pdf'],
    [technicalProjectAiSystemsResume, 'Senior Software Engineer | Technical Product, AI Systems & Delivery', '/cv/tpm/', '/cv/alejandro-garcia-iglesias-technical-project-manager-cv.pdf'],
  ])('publishes the %s editorial contract', (variant, title, canonicalPath, pdfPath) => {
    expect(variant.title).toBe(title)
    expect(variant.seo.canonicalPath).toBe(canonicalPath)
    expect(variant.pdfPath).toBe(pdfPath)
  })

  it('resolves every supported route with or without a trailing slash', () => {
    expect(getResumeForPath('/cv/')).toBe(resume)
    expect(getResumeForPath('/cv')).toBe(resume)
    expect(getResumeForPath('/cv/frontend/')).toBe(resume)
    expect(getResumeForPath('/cv/frontend')).toBe(resume)
    expect(getResumeForPath('/cv/product/')).toBe(productResume)
    expect(getResumeForPath('/cv/product')).toBe(productResume)
    expect(getResumeForPath('/cv/ai/')).toBe(appliedAiResume)
    expect(getResumeForPath('/cv/ai')).toBe(appliedAiResume)
    expect(getResumeForPath('/cv/tpm/')).toBe(technicalProjectAiSystemsResume)
    expect(getResumeForPath('/cv/tpm')).toBe(technicalProjectAiSystemsResume)
    expect(getResumeForPath('/cv/technical-project-ai-systems/')).toBe(
      technicalProjectAiSystemsResume,
    )
    expect(getResumeForPath('/cv/technical-project-ai-systems')).toBe(
      technicalProjectAiSystemsResume,
    )
    expect(getResumeForPath('/technical-project-ai-systems/')).toBe(
      technicalProjectAiSystemsResume,
    )
    expect(getResumeForPath('/technical-project-ai-systems')).toBe(
      technicalProjectAiSystemsResume,
    )
  })

  it('falls back to Frontend for unknown paths', () => {
    expect(getResumeForPath('/cv/not-a-variant')).toBe(resume)
    expect(getResumeForPath('/somewhere-else')).toBe(resume)
  })

  it('keeps the shared name, contacts, earlier summary, and historical experience factual', () => {
    const historical = sharedResumeFacts.roles.filter((role) => !role.featured)

    expect(resume.earlierExperienceSummary).toBe(
      'Earlier full-stack experience across four roles building web applications end-to-end with frontend, backend, APIs, databases, and infrastructure.',
    )
    expect(historical.map((role) => role.company)).toEqual([
      'Yanma Solutions',
      'Freelance',
      '2mas2 Interactive',
      'Syxmedia',
    ])
    expect(historical.every((role) => role.title === 'Fullstack Developer')).toBe(true)
    expect(resume.roles.some((role) => role.company === 'Independent Contractor')).toBe(false)

    for (const variant of variants) {
      expect(variant.name).toBe(sharedResumeFacts.name)
      expect(variant.location).toBe(sharedResumeFacts.location)
      expect(variant.earlierExperienceSummary).toBe(sharedResumeFacts.earlierExperienceSummary)
      expect(variant.roles.filter((role) => !role.featured)).toEqual(historical)
    }
  })

  it('keeps each online CV link on its own canonical variant', () => {
    const expected = new Map([
      [resume, 'https://alejandroiglesias.github.io/cv/'],
      [productResume, 'https://alejandroiglesias.github.io/cv/product/'],
      [appliedAiResume, 'https://alejandroiglesias.github.io/cv/ai/'],
      [technicalProjectAiSystemsResume, 'https://alejandroiglesias.github.io/cv/tpm/'],
    ])

    for (const [variant, href] of expected) {
      expect(variant.contacts.find((contact) => contact.kind === 'site')?.href).toBe(href)
    }
  })

  it('foregrounds the distinct editorial angles', () => {
    expect(JSON.stringify(resume)).toMatch(/frontend architecture|design systems|product/i)
    expect(JSON.stringify(productResume)).toMatch(/full-stack|end-to-end|product/i)
    expect(JSON.stringify(appliedAiResume)).toMatch(
      /Ground|Juana Casa|RAG|MCP|agents|LangGraph|Quorum|14 distinct multi-model workflows/i,
    )
    expect(JSON.stringify(technicalProjectAiSystemsResume)).toMatch(
      /business|technical|system design|cross-functional|delivery/i,
    )
  })

  it('keeps TuLanding out of every CV variant', () => {
    for (const variant of variants) {
      expect(JSON.stringify(variant)).not.toMatch(/TuLanding/i)
    }
  })

  it('keeps Applied AI grounded in software engineering without ML or operational claims', () => {
    const searchableContent = JSON.stringify(appliedAiResume)

    expect(searchableContent).toMatch(/Ground|Juana Casa|RAG|MCP|agents|LangGraph|Quorum/i)
    expect(searchableContent).toContain('14 distinct multi-model workflows')
    expect(searchableContent).not.toMatch(/ML training|fine-tuning|CUDA|MLOps/i)
    expect(searchableContent).not.toMatch(/improved accuracy|reduced hallucinations|production AI/i)
  })

  it('frames TPM as a target without unsupported project-management claims', () => {
    const searchableContent = JSON.stringify(technicalProjectAiSystemsResume)

    expect(technicalProjectAiSystemsResume.summary.at(-1)).toContain(
      "I'm now seeking a Technical Project Manager opportunity",
    )
    expect(technicalProjectAiSystemsResume.roles.some((role) => /Project Manager/i.test(role.title))).toBe(
      false,
    )
    expect(searchableContent).not.toMatch(
      /\bJira\b|\bScrum\b|sprint planning|roadmapping|\bUAT\b|vendor management|budget ownership|team management/i,
    )
  })
})
