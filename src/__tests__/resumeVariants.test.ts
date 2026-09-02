import { describe, expect, it } from 'vitest'
import { appliedAiEsResume } from '../data/applied-ai-es-resume'
import { appliedAiResume } from '../data/applied-ai-resume'
import { frontendResume } from '../data/frontend-resume'
import { forwardDeployedResume } from '../data/forward-deployed-resume'
import { generalResume, sharedResumeFacts } from '../data/general-resume'
import { productResume } from '../data/product-resume'
import { getResumeForPath, resumes } from '../data/resumes'
import { technicalProjectAiSystemsResume } from '../data/technical-project-ai-systems-resume'

const englishVariants = [generalResume, frontendResume, productResume, appliedAiResume, forwardDeployedResume, technicalProjectAiSystemsResume]

const spanishRoleFactMarkers: Array<[string, string[]]> = [
  ['Independent Product R&D & AI Consulting', ['Juana Casa', 'React/Next.js', 'Mastra', 'RAG', 'Slack', 'WhatsApp', 'PostgreSQL/pgvector', 'LangGraph', '14']],
  ['Rotunda Software', ['ModUI', 'Node.js', 'Express']],
  ['BairesDev', ['Pinterest', 'React', 'Go', 'APIs']],
  ['Mapme', ['Vue.js', 'Vuex', 'CTO', 'CEO']],
  ['Deviget', ['AppNexus', 'AngularJS', 'React']],
  ['Vulsai', ['Sass', 'Less', 'Compass', 'D3.js']],
  ['Yanma Solutions', ['subastas en tiempo real']],
  ['Freelance', ['requisitos', 'estimar']],
  ['2mas2 Interactive', ['Flash']],
  ['Syxmedia', ['PHP']],
]

function localizeSharedDate(date: string): string {
  const monthTranslations: Record<string, string> = { Mar: 'mar', Apr: 'abr', Nov: 'nov', Dec: 'dic' }
  if (date === 'Present') return 'Actualidad'
  const [month, year] = date.split(' ')
  return year && monthTranslations[month] ? `${monthTranslations[month]} ${year}` : date
}

describe('resume variant structure and routing', () => {
  it('registers the canonical variants and keeps General as the default', () => {
    expect(Object.keys(resumes)).toEqual(['general', 'frontend', 'product', 'ai', 'aiEs', 'fde', 'tpm'])
    expect(resumes.general).toBe(generalResume)
    expect(resumes.frontend).toBe(frontendResume)
    expect(resumes.product).toBe(productResume)
    expect(resumes.ai).toBe(appliedAiResume)
    expect(resumes.aiEs).toBe(appliedAiEsResume)
    expect(resumes.fde).toBe(forwardDeployedResume)
    expect(resumes.tpm).toBe(technicalProjectAiSystemsResume)
    expect(getResumeForPath('/cv/')).toBe(generalResume)
    expect(getResumeForPath('/cv/general/')).toBe(generalResume)
    expect(getResumeForPath('/cv/unknown/')).toBe(generalResume)
  })

  it.each([
    ['/cv/', generalResume], ['/cv/general', generalResume],
    ['/cv/frontend/', frontendResume], ['/cv/frontend', frontendResume],
    ['/cv/product/', productResume], ['/cv/product', productResume],
    ['/cv/ai/', appliedAiResume], ['/cv/ai', appliedAiResume],
    ['/cv/ai/es/', appliedAiEsResume], ['/cv/ai/es', appliedAiEsResume],
    ['/cv/fde/', forwardDeployedResume], ['/cv/fde', forwardDeployedResume],
    ['/cv/tpm/', technicalProjectAiSystemsResume], ['/cv/tpm', technicalProjectAiSystemsResume],
    ['/cv/technical-project-ai-systems/', technicalProjectAiSystemsResume],
    ['/technical-project-ai-systems', technicalProjectAiSystemsResume],
  ])('resolves %s to the expected variant', (pathname, expected) => {
    expect(getResumeForPath(pathname)).toBe(expected)
  })

  it('ignores query strings and fragments while resolving a supported route', () => {
    expect(getResumeForPath('/cv/frontend/?source=linkedin#experience')).toBe(frontendResume)
    expect(getResumeForPath('/cv/ai/es?lang=es#skills')).toBe(appliedAiEsResume)
    expect(getResumeForPath('/cv/fde/?source=nous#experience')).toBe(forwardDeployedResume)
    expect(getResumeForPath('/cv/tpm/#print')).toBe(technicalProjectAiSystemsResume)
    expect(getResumeForPath('/cv/unknown?source=test#top')).toBe(generalResume)
  })

  it('falls back to General for unsupported paths', () => {
    expect(getResumeForPath('/somewhere-else')).toBe(generalResume)
    expect(getResumeForPath('/cv/not-a-variant/extra')).toBe(generalResume)
  })

  it('keeps Forward Deployed AI separate from the Applied AI product-builder track', () => {
    const forwardDeployedResume = getResumeForPath('/cv/fde/')

    expect(forwardDeployedResume.id).toBe('fde')
    expect(forwardDeployedResume).not.toBe(appliedAiResume)
    expect(forwardDeployedResume.focusAreas.join(' ')).toMatch(/customer|stakeholder/i)
    expect(appliedAiResume.focusAreas).toContain('End-to-end AI product engineering')
  })

  it('keeps variant metadata aligned with its public route and PDF', () => {
    const contracts = [
      [generalResume, '/cv/', '/cv/alejandro-garcia-iglesias-general-cv.pdf'],
      [frontendResume, '/cv/frontend/', '/cv/alejandro-garcia-iglesias-frontend-engineer-cv.pdf'],
      [productResume, '/cv/product/', '/cv/alejandro-garcia-iglesias-product-engineer-cv.pdf'],
      [appliedAiResume, '/cv/ai/', '/cv/alejandro-garcia-iglesias-applied-ai-cv.pdf'],
      [appliedAiEsResume, '/cv/ai/es/', '/cv/alejandro-garcia-iglesias-applied-ai-es-cv.pdf'],
      [forwardDeployedResume, '/cv/fde/', '/cv/alejandro-garcia-iglesias-forward-deployed-ai-cv.pdf'],
      [technicalProjectAiSystemsResume, '/cv/tpm/', '/cv/alejandro-garcia-iglesias-technical-project-manager-cv.pdf'],
    ] as const
    for (const [variant, canonicalPath, pdfPath] of contracts) {
      expect(variant.seo.canonicalPath).toBe(canonicalPath)
      expect(variant.pdfPath).toBe(pdfPath)
      expect(variant.contacts.find((contact) => contact.kind === 'site')?.href)
        .toBe(`https://alejandroiglesias.github.io${canonicalPath}`)
    }
  })

  it('preserves shared identity and historical facts across variants', () => {
    const historical = sharedResumeFacts.roles.filter((role) => !role.featured)
    expect(historical.map((role) => role.company)).toEqual(['Yanma Solutions', 'Freelance', '2mas2 Interactive', 'Syxmedia'])
    expect(historical.every((role) => role.title === 'Fullstack Developer')).toBe(true)
    for (const variant of englishVariants) {
      expect(variant.name).toBe(sharedResumeFacts.name)
      expect(variant.location).toBe(sharedResumeFacts.location)
      expect(variant.earlierExperienceSummary).toBe(sharedResumeFacts.earlierExperienceSummary)
      expect(variant.roles.filter((role) => !role.featured)).toEqual(historical)
      expect(variant.roles.some((role) => role.company === 'Independent Contractor')).toBe(false)
    }
    expect(appliedAiEsResume.name).toBe(sharedResumeFacts.name)
    expect(appliedAiEsResume.location).toBe(sharedResumeFacts.location)
    expect(appliedAiEsResume.roles.filter((role) => !role.featured).map((role) => role.company))
      .toEqual(historical.map((role) => role.company))
    expect(appliedAiEsResume.roles.filter((role) => !role.featured).every((role) => role.title === 'Fullstack Developer')).toBe(true)
  })

  it('preserves shared dates, locations, and bullets for historical roles', () => {
    for (const variant of englishVariants) {
      for (const role of variant.roles.slice(1)) {
        const sharedRole = sharedResumeFacts.roles.find((candidate) => candidate.company === role.company)
        expect(sharedRole).toBeDefined()
        expect(role.start).toBe(sharedRole?.start)
        expect(role.end).toBe(sharedRole?.end)
        expect(role.location).toBe(sharedRole?.location)
        expect(role.featured).toBe(sharedRole?.featured)
        for (const bullet of role.bullets) {
          if (variant.id === 'applied-ai' && role.company === 'BairesDev' && bullet.endsWith('deliver features.')) {
            expect(sharedRole?.bullets).toContain('Expanded into backend responsibilities, learning Go and implementing APIs to deliver features end to end.')
          } else {
            expect(sharedRole?.bullets).toContain(bullet)
          }
        }
      }
    }
    for (const role of appliedAiEsResume.roles) {
      const sharedRole = sharedResumeFacts.roles.find((candidate) => candidate.company === role.company)
      expect(sharedRole).toBeDefined()
      expect(role.title).toBe(
        role.company === 'Independent Product R&D & AI Consulting'
          ? 'Senior Software Engineer — IA Aplicada'
          : sharedRole?.title,
      )
      expect(role.start).toBe(localizeSharedDate(sharedRole!.start))
      expect(role.end).toBe(localizeSharedDate(sharedRole!.end))
      expect(role.featured).toBe(sharedRole?.featured)
      expect(role.bullets.length).toBeGreaterThan(0)
    }
  })

  it('keeps the Rotunda Figma implementation experience visible in the Product variant', () => {
    const rotundaRole = productResume.roles.find((role) => role.company === 'Rotunda Software')

    expect(rotundaRole?.bullets.join(' ')).toContain('Figma')
  })

  it.each(spanishRoleFactMarkers)(
    'preserves key factual anchors when translating %s',
    (company, markers) => {
      const role = appliedAiEsResume.roles.find((candidate) => candidate.company === company)
      expect(role).toBeDefined()
      const narrative = role!.bullets.join(' ').toLocaleLowerCase()

      for (const marker of markers) {
        expect(narrative).toContain(marker.toLocaleLowerCase())
      }
    },
  )
})
