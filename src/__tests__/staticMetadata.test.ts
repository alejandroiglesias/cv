import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

function readProjectFile(path: string) {
  return readFileSync(resolve(process.cwd(), path), 'utf8')
}

function compactHtml(html: string) {
  return html.replace(/\s+/g, ' ').trim()
}

const baseUrl = 'https://alejandroiglesias.github.io/cv'

const staticPages = [
  {
    file: 'index.html',
    canonical: '/',
    title: 'Alejandro García Iglesias · Senior Software Engineer',
    description:
      'Senior Software Engineer with 19+ years of experience spanning full-stack foundations, deep frontend specialization, product engineering, and current Applied AI systems.',
  },
  {
    file: 'general/index.html',
    canonical: '/',
    title: 'Alejandro García Iglesias · Senior Software Engineer',
    description:
      'Senior Software Engineer with 19+ years of experience spanning full-stack foundations, deep frontend specialization, product engineering, and current Applied AI systems.',
  },
  {
    file: 'frontend/index.html',
    canonical: '/frontend/',
    title: 'Alejandro García Iglesias · Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer with 19+ years of experience in frontend architecture, design systems, and product-focused web applications.',
  },
  {
    file: 'product/index.html',
    canonical: '/product/',
    title: 'Alejandro García Iglesias · Senior Product Engineer',
    description:
      'Senior Product Engineer with 19+ years of experience building web products end to end across frontend architecture, APIs, UI systems, and product discovery.',
  },
  {
    file: 'ai/index.html',
    canonical: '/ai/',
    title: 'Alejandro García Iglesias · Senior Software Engineer — Applied AI',
    description:
      'Senior Software Engineer with a frontend and full-stack foundation, applying retrieval, MCP, agents, and multi-model workflows to practical AI systems.',
  },
  {
    file: 'tpm/index.html',
    canonical: '/tpm/',
    title: 'Alejandro García Iglesias · Senior Software Engineer',
    description:
      'Senior Software Engineer with 19+ years of experience spanning technical leadership, system design, product delivery, AI systems, workflow automation, and business-to-technical translation.',
  },
  {
    file: 'technical-project-ai-systems/index.html',
    canonical: '/tpm/',
    title: 'Alejandro García Iglesias · Senior Software Engineer',
    description:
      'Senior Software Engineer with 19+ years of experience spanning technical leadership, system design, product delivery, AI systems, workflow automation, and business-to-technical translation.',
  },
] as const

describe('static metadata and indexing', () => {
  it.each(staticPages)('$file is indexable and has coherent metadata', (page) => {
    const html = compactHtml(readProjectFile(page.file))
    const canonicalUrl = `${baseUrl}${page.canonical}`

    expect(html).toContain('<meta name="robots" content="index, follow" />')
    expect(html).toContain(`<link rel="canonical" href="${canonicalUrl}" />`)
    expect(html).toContain(
      'href="https://alejandroiglesias.github.io/cv/sitemap.xml"',
    )
    expect(html).toContain(`<title>${page.title}</title>`)
    expect(html).toContain(`content="${page.description}"`)
    expect(html).toContain(`<meta property="og:title" content="${page.title}" />`)
    expect(html).toContain(
      `<meta property="og:description" content="${page.description}" />`,
    )
    expect(html).toContain(`<meta property="og:url" content="${canonicalUrl}" />`)
    expect(html).toContain(`<meta name="twitter:title" content="${page.title}" />`)
    expect(html).toContain(
      `<meta name="twitter:description" content="${page.description}" />`,
    )
    expect(html).not.toMatch(/noindex/i)
  })

  it('publishes exactly the five canonical pages and excludes aliases', () => {
    const sitemap = readProjectFile('public/sitemap.xml')
    const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      ([, location]) => location,
    )

    expect(locations).toEqual([
      `${baseUrl}/`,
      `${baseUrl}/frontend/`,
      `${baseUrl}/product/`,
      `${baseUrl}/ai/`,
      `${baseUrl}/tpm/`,
    ])
    expect(sitemap).not.toContain('/general/')
    expect(sitemap).not.toContain('/technical-project-ai-systems/')
  })

  it('generates five canonical PDFs and copies the legacy TPM filename', () => {
    const generator = readProjectFile('scripts/generate-pdfs.mjs')
    const expectedPdfs = [
      ["route: '/cv/'", 'alejandro-garcia-iglesias-general-cv.pdf'],
      ["route: '/cv/frontend/'", 'alejandro-garcia-iglesias-frontend-engineer-cv.pdf'],
      ["route: '/cv/product/'", 'alejandro-garcia-iglesias-product-engineer-cv.pdf'],
      ["route: '/cv/ai/'", 'alejandro-garcia-iglesias-applied-ai-cv.pdf'],
      ["route: '/cv/tpm/'", 'alejandro-garcia-iglesias-technical-project-manager-cv.pdf'],
    ]

    for (const [route, filename] of expectedPdfs) {
      expect(generator).toContain(route)
      expect(generator).toContain(`filename: '${filename}'`)
    }
    expect(generator).toContain(
      "const legacyTpmFilename = 'alejandro-garcia-iglesias-technical-project-ai-systems-cv.pdf'",
    )
    expect(generator).toContain('path.join(publicDir, legacyTpmFilename)')
    expect(generator).toContain('path.join(distDir, legacyTpmFilename)')
    expect(generator.match(/--print-to-pdf=/g)).toHaveLength(1)
    expect(generator).not.toContain("route: '/cv/technical-project-ai-systems/'")
  })

  it('keeps generated PDF artifacts and the legacy TPM copy in sync', () => {
    const canonicalPdfs = [
      'alejandro-garcia-iglesias-general-cv.pdf',
      'alejandro-garcia-iglesias-frontend-engineer-cv.pdf',
      'alejandro-garcia-iglesias-product-engineer-cv.pdf',
      'alejandro-garcia-iglesias-applied-ai-cv.pdf',
      'alejandro-garcia-iglesias-technical-project-manager-cv.pdf',
    ]
    const publicPdfs = canonicalPdfs.map((filename) => resolve(process.cwd(), 'public', filename))
    const legacyPath = resolve(
      process.cwd(),
      'public/alejandro-garcia-iglesias-technical-project-ai-systems-cv.pdf',
    )
    const tpmPath = publicPdfs.at(-1)

    expect(publicPdfs.every((filePath) => existsSync(filePath))).toBe(true)
    expect(existsSync(legacyPath)).toBe(true)
    expect(tpmPath).toBeDefined()
    expect(readFileSync(legacyPath)).toEqual(readFileSync(tpmPath!))
  })

  it('keeps all seven static HTML entries wired into Vite', () => {
    const viteConfig = readProjectFile('vite.config.ts')
    for (const entry of [
      'index.html',
      'general/index.html',
      'frontend/index.html',
      'product/index.html',
      'ai/index.html',
      'tpm/index.html',
      'technical-project-ai-systems/index.html',
    ]) {
      expect(viteConfig).toContain(`'${entry}'`)
    }
  })
})
