import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { JSDOM } from 'jsdom'
import { describe, expect, it } from 'vitest'
import { appliedAiEsResume } from '../data/applied-ai-es-resume'
import { appliedAiResume } from '../data/applied-ai-resume'
import { frontendResume } from '../data/frontend-resume'
import { generalResume } from '../data/general-resume'
import { productResume } from '../data/product-resume'
import { technicalProjectAiSystemsResume } from '../data/technical-project-ai-systems-resume'
import type { Resume } from '../types/resume'

function readProjectFile(filePath: string) {
  return readFileSync(resolve(process.cwd(), filePath), 'utf8')
}

function parseHtml(filePath: string) {
  return new JSDOM(readProjectFile(filePath)).window.document
}

const baseUrl = 'https://alejandroiglesias.github.io/cv'

const staticPages: ReadonlyArray<{ file: string; resume: Resume }> = [
  { file: 'index.html', resume: generalResume },
  { file: 'general/index.html', resume: generalResume },
  { file: 'frontend/index.html', resume: frontendResume },
  { file: 'product/index.html', resume: productResume },
  { file: 'ai/index.html', resume: appliedAiResume },
  { file: 'ai/es/index.html', resume: appliedAiEsResume },
  { file: 'tpm/index.html', resume: technicalProjectAiSystemsResume },
  { file: 'technical-project-ai-systems/index.html', resume: technicalProjectAiSystemsResume },
]

function metaContent(document: Document, selector: string) {
  return document.querySelector<HTMLMetaElement>(selector)?.content
}

describe('static metadata and indexing', () => {
  it.each(staticPages)('$file exposes the SEO contract of its resume', ({ file, resume }) => {
    const document = parseHtml(file)
    const canonicalUrl = `https://alejandroiglesias.github.io${resume.seo.canonicalPath}`

    expect(document.documentElement.lang).toBe(resume.copy?.locale ?? 'en')
    expect(document.title).toBe(resume.seo.title)
    expect(metaContent(document, 'meta[name="description"]')).toBe(resume.seo.description)
    expect(metaContent(document, 'meta[property="og:title"]')).toBe(resume.seo.title)
    expect(metaContent(document, 'meta[property="og:description"]')).toBe(resume.seo.description)
    expect(metaContent(document, 'meta[property="og:url"]')).toBe(canonicalUrl)
    expect(metaContent(document, 'meta[name="twitter:title"]')).toBe(resume.seo.title)
    expect(metaContent(document, 'meta[name="twitter:description"]')).toBe(resume.seo.description)

    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'index, follow',
    )
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(canonicalUrl)
    expect(document.querySelector('link[rel="sitemap"]')?.getAttribute('href')).toBe(
      `${baseUrl}/sitemap.xml`,
    )
    expect(document.querySelector('meta[name="robots"][content*="noindex"]')).toBeNull()
  })

  it('publishes the canonical pages and excludes aliases', () => {
    const sitemap = readProjectFile('public/sitemap.xml')
    const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      ([, location]) => location,
    )

    expect(locations).toEqual([
      `${baseUrl}/`,
      `${baseUrl}/frontend/`,
      `${baseUrl}/product/`,
      `${baseUrl}/ai/`,
      `${baseUrl}/ai/es/`,
      `${baseUrl}/tpm/`,
    ])
    expect(sitemap).not.toContain('/general/')
    expect(sitemap).not.toContain('/technical-project-ai-systems/')
  })
})
