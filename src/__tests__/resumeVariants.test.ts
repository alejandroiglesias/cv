import { describe, expect, it } from 'vitest'
import { appliedAiResume } from '../data/applied-ai-resume'
import { frontendResume, sharedResumeFacts } from '../data/frontend-resume'
import { productResume } from '../data/product-resume'
import { getResumeForPath, resumes } from '../data/resumes'
import { technicalProjectAiSystemsResume } from '../data/technical-project-ai-systems-resume'

const variants = [
  frontendResume,
  productResume,
  appliedAiResume,
  technicalProjectAiSystemsResume,
]

describe('resume variants', () => {
  it('keeps the Frontend resume as the default with an explicit export and PDF name', () => {
    expect(getResumeForPath('/cv/')).toBe(frontendResume)
    expect(getResumeForPath('/cv/frontend/')).toBe(frontendResume)
    expect(getResumeForPath('/cv/unknown/')).toBe(frontendResume)
    expect(frontendResume.title).toBe('Senior Frontend Engineer')
    expect(frontendResume.pdfPath).toBe(
      '/cv/alejandro-garcia-iglesias-frontend-engineer-cv.pdf',
    )
    expect(frontendResume.seo.canonicalPath).toBe('/cv/')
  })

  it('registers only the four canonical resume variants', () => {
    expect(Object.keys(resumes)).toEqual(['frontend', 'product', 'ai', 'tpm'])
    expect(resumes.frontend).toBe(frontendResume)
    expect(resumes.ai).toBe(appliedAiResume)
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
    expect(getResumeForPath('/cv/')).toBe(frontendResume)
    expect(getResumeForPath('/cv')).toBe(frontendResume)
    expect(getResumeForPath('/cv/frontend/')).toBe(frontendResume)
    expect(getResumeForPath('/cv/frontend')).toBe(frontendResume)
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
    expect(getResumeForPath('/cv/not-a-variant')).toBe(frontendResume)
    expect(getResumeForPath('/somewhere-else')).toBe(frontendResume)
  })

  it('keeps the shared name, contacts, earlier summary, and historical experience factual', () => {
    const historical = sharedResumeFacts.roles.filter((role) => !role.featured)

    expect(frontendResume.earlierExperienceSummary).toBe(
      'Earlier full-stack experience across four roles building web applications end-to-end with frontend, backend, APIs, databases, and infrastructure.',
    )
    expect(historical.map((role) => role.company)).toEqual([
      'Yanma Solutions',
      'Freelance',
      '2mas2 Interactive',
      'Syxmedia',
    ])
    expect(historical.every((role) => role.title === 'Fullstack Developer')).toBe(true)
    expect(
      frontendResume.roles.some((role) => role.company === 'Independent Contractor'),
    ).toBe(false)

    for (const variant of variants) {
      expect(variant.name).toBe(sharedResumeFacts.name)
      expect(variant.location).toBe(sharedResumeFacts.location)
      expect(variant.earlierExperienceSummary).toBe(sharedResumeFacts.earlierExperienceSummary)
      expect(variant.roles.filter((role) => !role.featured)).toEqual(historical)
    }
  })

  it('derives every non-independent role bullet from the shared factual history', () => {
    for (const variant of variants) {
      for (const role of variant.roles.slice(1)) {
        const sharedRole = sharedResumeFacts.roles.find(
          (candidate) => candidate.company === role.company,
        )

        expect(sharedRole).toBeDefined()
        expect(role.start).toBe(sharedRole?.start)
        expect(role.end).toBe(sharedRole?.end)
        expect(role.location).toBe(sharedRole?.location)
        expect(role.featured).toBe(sharedRole?.featured)

        for (const bullet of role.bullets) {
          expect(sharedRole?.bullets).toContain(bullet)
        }
      }
    }
  })

  it('keeps each online CV link on its own canonical variant', () => {
    const expected = new Map([
      [frontendResume, 'https://alejandroiglesias.github.io/cv/'],
      [productResume, 'https://alejandroiglesias.github.io/cv/product/'],
      [appliedAiResume, 'https://alejandroiglesias.github.io/cv/ai/'],
      [technicalProjectAiSystemsResume, 'https://alejandroiglesias.github.io/cv/tpm/'],
    ])

    for (const [variant, href] of expected) {
      expect(variant.contacts.find((contact) => contact.kind === 'site')?.href).toBe(href)
    }
  })

  it('foregrounds the distinct editorial angles', () => {
    expect(JSON.stringify(frontendResume)).toMatch(
      /frontend architecture|design systems|product/i,
    )
    expect(JSON.stringify(productResume)).toMatch(/full-stack|end-to-end|product/i)
    expect(JSON.stringify(appliedAiResume)).toMatch(
      /knowledge-intelligence product|Juana Casa|RAG|MCP|agents|LangGraph|Quorum|14 distinct multi-model workflows/i,
    )
    expect(JSON.stringify(technicalProjectAiSystemsResume)).toMatch(
      /business|technical|system design|cross-functional|delivery/i,
    )
  })

  it('keeps the recent experience differentiated by target role', () => {
    const frontendIndependent = frontendResume.roles[0]
    const productIndependent = productResume.roles[0]
    const appliedAiIndependent = appliedAiResume.roles[0]
    const tpmIndependent = technicalProjectAiSystemsResume.roles[0]

    expect(frontendResume.summary.join(' ')).toMatch(
      /building product-focused web applications/i,
    )
    expect(frontendResume.summary.join(' ')).toMatch(/full-stack foundation/i)
    expect(frontendResume.summary.join(' ')).toMatch(/product thinking/i)
    expect(frontendResume.summary.join(' ')).not.toMatch(/product proximity/i)
    expect(frontendIndependent.bullets.join(' ')).toMatch(
      /React\/Next\.js AI knowledge assistant|frontend development|product flows/i,
    )
    expect(frontendIndependent.bullets.join(' ')).not.toMatch(/Quorum|14 distinct/i)

    expect(productIndependent.bullets.join(' ')).toMatch(
      /product discovery|clarify what to build|independent product/i,
    )
    expect(productIndependent.bullets.join(' ')).not.toMatch(/Quorum|14 distinct/i)

    expect(appliedAiIndependent.bullets.join(' ')).toMatch(
      /independent knowledge-intelligence product|source-backed RAG|MCP|Quorum|LangGraph|14 distinct multi-model workflows/i,
    )

    expect(tpmIndependent.company).toBe('Independent Product R&D & AI Consulting')
    expect(tpmIndependent.title).toBe(
      'Senior Software Engineer — Technical Product & AI Systems',
    )
    expect(tpmIndependent.bullets.join(' ')).toMatch(
      /founding partners|stakeholders|requirements|delivery/i,
    )
    expect(tpmIndependent.bullets.join(' ')).toMatch(
      /initial React\/Next\.js AI assistant/i,
    )

    for (const variant of variants) {
      expect(variant.roles[0].bullets.join(' ')).toMatch(
        /independent knowledge-intelligence product.*goal of implementing it (?:at Juana Casa|at the studio|in the studio)/i,
      )
      expect(JSON.stringify(variant)).not.toMatch(/\bGround\b/)
    }
  })

  it('uses concrete, non-redundant skills for each target role', () => {
    expect(frontendResume.skills.slice(0, 8)).toEqual(
      expect.arrayContaining([
        'Frontend Architecture',
        'UI Engineering',
        'Component Architecture',
        'Design Systems',
      ]),
    )
    expect(frontendResume.skills).not.toEqual(
      expect.arrayContaining(['System Design', 'Full-stack Foundations']),
    )

    expect(productResume.skills).toEqual(
      expect.arrayContaining([
        'Product Discovery',
        'Requirements Definition',
        'Prototyping',
        'UX & Design Collaboration',
      ]),
    )
    expect(productResume.skills).not.toEqual(
      expect.arrayContaining([
        'Product Engineering',
        'End-to-end Product Ownership',
        'Product Thinking',
      ]),
    )

    expect(appliedAiResume.skills).toEqual(
      expect.arrayContaining([
        'Mastra',
        'Retrieval-Augmented Generation (RAG)',
        'Model Routing & Orchestration',
        'AI Evaluation & Benchmarking',
      ]),
    )
    expect(appliedAiResume.skills).not.toEqual(
      expect.arrayContaining([
        'Software Engineering',
        'Applied AI Systems',
        'Python',
        'Grounded RAG',
        'System Design',
      ]),
    )

    expect(technicalProjectAiSystemsResume.skills).toEqual(
      expect.arrayContaining([
        'Stakeholder Collaboration',
        'Cross-functional Coordination',
        'Requirements Discovery & Definition',
        'Architecture Trade-off Analysis',
      ]),
    )
    expect(technicalProjectAiSystemsResume.skills).not.toEqual(
      expect.arrayContaining(['Technical Delivery', 'AI Systems Delivery']),
    )

    for (const variant of variants) {
      expect(JSON.stringify(variant)).not.toMatch(/grounded RAG/i)
    }
  })

  it('keeps TuLanding out of every CV variant', () => {
    for (const variant of variants) {
      expect(JSON.stringify(variant)).not.toMatch(/TuLanding/i)
    }
  })

  it('keeps Applied AI grounded in software engineering without ML or operational claims', () => {
    const searchableContent = JSON.stringify(appliedAiResume)

    expect(searchableContent).toMatch(
      /knowledge-intelligence product|Juana Casa|RAG|MCP|agents|LangGraph|Quorum/i,
    )
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
