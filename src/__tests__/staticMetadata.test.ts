import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

function readProjectFile(path: string) {
  return readFileSync(resolve(process.cwd(), path), 'utf8')
}

describe('static metadata and indexing', () => {
  it('keeps both resume pages indexable with self-referencing canonicals', () => {
    const mainHtml = readProjectFile('index.html')
    const tailoredHtml = readProjectFile('technical-project-ai-systems/index.html')

    expect(mainHtml).toContain('<meta name="robots" content="index, follow" />')
    expect(mainHtml).toContain('<link rel="canonical" href="https://alejandroiglesias.github.io/cv/" />')
    expect(tailoredHtml).toContain('<meta name="robots" content="index, follow" />')
    expect(tailoredHtml).toContain(
      'href="https://alejandroiglesias.github.io/cv/technical-project-ai-systems/"',
    )
    expect(`${mainHtml}${tailoredHtml}`).not.toMatch(/noindex/i)
  })

  it('publishes both pages in a sitemap referenced by each document', () => {
    const sitemap = readProjectFile('public/sitemap.xml')
    const mainHtml = readProjectFile('index.html')
    const tailoredHtml = readProjectFile('technical-project-ai-systems/index.html')

    expect(sitemap).toContain('<loc>https://alejandroiglesias.github.io/cv/</loc>')
    expect(sitemap).toContain(
      '<loc>https://alejandroiglesias.github.io/cv/technical-project-ai-systems/</loc>',
    )
    expect(mainHtml).toContain('href="https://alejandroiglesias.github.io/cv/sitemap.xml"')
    expect(tailoredHtml).toContain('href="https://alejandroiglesias.github.io/cv/sitemap.xml"')
  })
})
