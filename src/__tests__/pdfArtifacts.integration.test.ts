import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { JSDOM } from 'jsdom'
import { describe, expect, it } from 'vitest'
import {
  extractPdfText,
  findPdfToText,
  validateGeneratedPdfs,
} from '../../scripts/pdf-ats-smoke.mjs'
import { appliedAiEsResume } from '../data/applied-ai-es-resume'
import { appliedAiResume } from '../data/applied-ai-resume'
import { frontendResume } from '../data/frontend-resume'
import { generalResume } from '../data/general-resume'
import { productResume } from '../data/product-resume'
import { getResumeCopy } from '../data/resume-copy'
import { technicalProjectAiSystemsResume } from '../data/technical-project-ai-systems-resume'
import type { Resume } from '../types/resume'

const distDir = resolve(process.cwd(), 'dist')
const canonicalArtifacts = [
  { filename: 'alejandro-garcia-iglesias-general-cv.pdf', resume: generalResume },
  { filename: 'alejandro-garcia-iglesias-frontend-engineer-cv.pdf', resume: frontendResume },
  { filename: 'alejandro-garcia-iglesias-product-engineer-cv.pdf', resume: productResume },
  { filename: 'alejandro-garcia-iglesias-applied-ai-cv.pdf', resume: appliedAiResume },
  { filename: 'alejandro-garcia-iglesias-applied-ai-es-cv.pdf', resume: appliedAiEsResume },
  {
    filename: 'alejandro-garcia-iglesias-technical-project-manager-cv.pdf',
    resume: technicalProjectAiSystemsResume,
  },
] satisfies ReadonlyArray<{ filename: string; resume: Resume }>
const canonicalPdfs = canonicalArtifacts.map(({ filename }) => filename)
const legacyTpmPdf = 'alejandro-garcia-iglesias-technical-project-ai-systems-cv.pdf'
const builtHtml = [
  { file: 'index.html', resume: generalResume },
  { file: 'general/index.html', resume: generalResume },
  { file: 'frontend/index.html', resume: frontendResume },
  { file: 'product/index.html', resume: productResume },
  { file: 'ai/index.html', resume: appliedAiResume },
  { file: 'ai/es/index.html', resume: appliedAiEsResume },
  { file: 'tpm/index.html', resume: technicalProjectAiSystemsResume },
  { file: 'technical-project-ai-systems/index.html', resume: technicalProjectAiSystemsResume },
] satisfies ReadonlyArray<{ file: string; resume: Resume }>

function pdfPath(filename: string) {
  return resolve(distDir, filename)
}

async function pdfText(filename: string) {
  const extractor = await findPdfToText()
  if (!extractor) throw new Error('pdftotext is required for PDF integration tests')
  return extractPdfText(extractor, pdfPath(filename))
}

function builtDocument(file: string) {
  return new JSDOM(readFileSync(resolve(distDir, file), 'utf8')).window.document
}

function normalizedPages(text: string) {
  return text
    .split('\f')
    .map((page) => page.replace(/-\s*\n\s*/g, '-').replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}

describe.skipIf(process.env.RUN_PDF_INTEGRATION !== '1')(
  'generated PDF build artifacts',
  () => {
    it('contains one non-empty, parseable PDF for every canonical resume', async () => {
      for (const filename of canonicalPdfs) {
        expect(existsSync(pdfPath(filename))).toBe(true)
        expect((await pdfText(filename)).trim().length).toBeGreaterThan(0)
      }
    })

    it('keeps the earlier-experience summary with its print-only LinkedIn note', async () => {
      for (const { filename, resume } of canonicalArtifacts) {
        const pages = normalizedPages(await pdfText(filename))
        const summary = resume.earlierExperienceSummary.replace(/\s+/g, ' ').trim()
        const linkedInNote = getResumeCopy(resume).seeFullExperienceOnLinkedIn
        const summaryPage = pages.findIndex((page) => page.includes(summary))
        const linkedInPage = pages.findIndex((page) => page.includes(linkedInNote))

        expect(summaryPage, `${filename}: earlier-experience summary`).toBeGreaterThanOrEqual(0)
        expect(linkedInPage, `${filename}: LinkedIn note page`).toBe(summaryPage)
      }
    })

    it('preserves every static HTML entry and its metadata through the web build', () => {
      for (const { file, resume } of builtHtml) {
        expect(existsSync(resolve(distDir, file))).toBe(true)
        const document = builtDocument(file)
        const canonicalUrl = `https://alejandroiglesias.github.io${resume.seo.canonicalPath}`

        expect(document.title).toBe(resume.seo.title)
        expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
          resume.seo.description,
        )
        expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
          canonicalUrl,
        )
        expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
          canonicalUrl,
        )
      }
    })

    it('keeps the legacy TPM artifact semantically aligned with the canonical artifact', async () => {
      expect(existsSync(pdfPath(legacyTpmPdf))).toBe(true)
      const legacyText = (await pdfText(legacyTpmPdf)).trim()
      const canonicalText = (await pdfText(canonicalPdfs.at(-1)!)).trim()

      expect(legacyText.length).toBeGreaterThan(0)
      expect(legacyText).toBe(canonicalText)
    })

    it('keeps generated PDFs readable by the ATS contract', async () => {
      const result = await validateGeneratedPdfs(
        canonicalPdfs.map((filename) => ({ filename, path: pdfPath(filename) })),
        { onMissingExtractor: 'error' },
      )

      expect(result.skipped).toBe(false)
    })
  },
)
