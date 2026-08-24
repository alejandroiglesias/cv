import { describe, expect, it } from 'vitest'
import { resume } from '../data/resume'
import { getResumeForPath } from '../data/resumes'
import { technicalProjectAiSystemsResume } from '../data/technical-project-ai-systems-resume'

describe('resume variants', () => {
  it('keeps the Frontend/Product resume as the default', () => {
    expect(getResumeForPath('/cv/')).toBe(resume)
    expect(getResumeForPath('/cv/unknown/')).toBe(resume)
    expect(resume.title).toBe(
      'Senior Frontend/Product Engineer | Frontend Architecture, System Design & Product Thinking',
    )
  })

  it('keeps the shared experience history factual and normalized', () => {
    const historical = resume.roles.filter((role) => !role.featured)

    expect(resume.earlierExperienceSummary).toBe(
      'Earlier full-stack experience across four roles building web applications end-to-end with frontend, backend, APIs, databases, and infrastructure.',
    )
    expect(resume.roles.some((role) => role.company === 'Independent Contractor')).toBe(false)
    expect(historical.map((role) => role.company)).toEqual([
      'Yanma Solutions',
      'Freelance',
      '2mas2 Interactive',
      'Syxmedia',
    ])
    expect(historical.every((role) => role.title === 'Fullstack Developer')).toBe(true)
    const deprecatedLabel = ['front', 'end'].join('-')
    expect(JSON.stringify(resume).toLowerCase()).not.toContain(deprecatedLabel)
    expect(resume.roles.some((role) => role.bullets.some((bullet) => bullet.includes('TuLanding')))).toBe(
      false,
    )
  })

  it('selects the Technical Project / AI Systems resume for its static route', () => {
    expect(getResumeForPath('/cv/technical-project-ai-systems/')).toBe(
      technicalProjectAiSystemsResume,
    )
    expect(getResumeForPath('/technical-project-ai-systems')).toBe(
      technicalProjectAiSystemsResume,
    )
  })

  it('keeps each online CV link on its own variant', () => {
    const mainSite = resume.contacts.find((contact) => contact.kind === 'site')
    const tailoredSite = technicalProjectAiSystemsResume.contacts.find(
      (contact) => contact.kind === 'site',
    )

    expect(mainSite?.href).toBe('https://alejandroiglesias.github.io/cv/')
    expect(tailoredSite?.label).toBe('alejandroiglesias.github.io/cv')
    expect(tailoredSite?.href).toBe(
      'https://alejandroiglesias.github.io/cv/technical-project-ai-systems/',
    )
  })

  it('retitles only the independent work and preserves historical job titles', () => {
    const mainTitles = new Map(resume.roles.map((role) => [role.company, role.title]))
    const tailoredIndependent = technicalProjectAiSystemsResume.roles[0]

    expect(tailoredIndependent.company).toBe('Independent Consulting & Product R&D')
    expect(tailoredIndependent.title).toBe('Technical Product & AI Systems Consultant')

    for (const role of technicalProjectAiSystemsResume.roles.slice(1)) {
      expect(role.title).toBe(mainTitles.get(role.company))
    }
  })

  it('frames Technical Project Management as a target without unsupported PM claims', () => {
    const searchableContent = JSON.stringify(technicalProjectAiSystemsResume)

    expect(technicalProjectAiSystemsResume.summary.at(-1)).toContain(
      "I'm now seeking a Technical Project Manager opportunity",
    )
    expect(technicalProjectAiSystemsResume.roles.some((role) => /Project Manager/i.test(role.title)))
      .toBe(false)
    expect(searchableContent).not.toMatch(
      /\bJira\b|\bScrum\b|sprint planning|roadmapping|\bUAT\b|vendor management/i,
    )
  })

  it('prioritizes the most relevant evidence for the target role', () => {
    const independent = technicalProjectAiSystemsResume.roles[0]
    const mapme = technicalProjectAiSystemsResume.roles.find((role) => role.company === 'Mapme')

    expect(independent.bullets[0]).toContain('Juana Casa')
    expect(independent.bullets[1]).toContain('knowledge-intelligence layer')
    expect(mapme?.bullets[0]).toContain('translating business needs')
    expect(technicalProjectAiSystemsResume.skills).not.toContain('Code Quality & Refactoring')
  })
})
