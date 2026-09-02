import { execFile } from 'node:child_process'
import { access, constants } from 'node:fs'
import { promisify } from 'node:util'
import path from 'node:path'

const execFileAsync = promisify(execFile)

const expectedSections = [
  'Professional Summary',
  'FOCUS AREAS',
  'Skills',
  'Experience',
]

const expectedHistory = [
  'Independent Product R&D & AI Consulting',
  'Apr 2026',
  'Rotunda Software',
  'Apr 2022',
  'BairesDev',
  'Mar 2020',
  'Mapme',
  'Nov 2016',
  'Deviget',
  'Dec 2013',
  'Vulsai',
  '2012',
]

const defaultContracts = [
  {
    filename: 'alejandro-garcia-iglesias-general-cv.pdf',
    titleMarkers: ['Senior Software Engineer'],
    firstBulletMarker: 'Partnered with Juana Casa',
  },
  {
    filename: 'alejandro-garcia-iglesias-frontend-engineer-cv.pdf',
    titleMarkers: ['Senior Frontend Engineer'],
    firstBulletMarker: 'Built and iterated a React/Next.js',
  },
  {
    filename: 'alejandro-garcia-iglesias-product-engineer-cv.pdf',
    titleMarkers: ['Senior Product Engineer'],
    firstBulletMarker: 'Worked directly with Juana Casa',
  },
  {
    filename: 'alejandro-garcia-iglesias-applied-ai-cv.pdf',
    titleMarkers: ['Senior Software Engineer', 'Applied AI'],
    firstBulletMarker: 'Partnered directly with Juana Casa',
  },
  {
    filename: 'alejandro-garcia-iglesias-applied-ai-es-cv.pdf',
    titleMarkers: ['Senior Software Engineer', 'IA Aplicada'],
    firstBulletMarker: 'Trabajé junto a los dos socios fundadores de Juana Casa',
    sections: [
      'Resumen Profesional',
      'ÁREAS DE ENFOQUE',
      'Habilidades',
      'Experiencia',
    ],
    historyMarkers: [
      'Independent Product R&D & AI Consulting',
      'abr 2026',
      'Rotunda Software',
      'abr 2022',
      'BairesDev',
      'mar 2020',
      'Mapme',
      'nov 2016',
      'Deviget',
      'dic 2013',
      'Vulsai',
      '2012',
    ],
  },
  {
    filename: 'alejandro-garcia-iglesias-forward-deployed-ai-cv.pdf',
    titleMarkers: ['Senior Software Engineer', 'Forward Deployed AI'],
    firstBulletMarker: 'Partnered directly with Juana Casa',
  },
  {
    filename: 'alejandro-garcia-iglesias-technical-project-manager-cv.pdf',
    titleMarkers: ['Senior Software Engineer', 'Technical Project Delivery'],
    firstBulletMarker: 'Worked directly with Juana Casa',
  },
]

function normalize(text) {
  return text.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
}

async function isExecutable(filePath) {
  try {
    await new Promise((resolve, reject) => {
      access(filePath, constants.X_OK, (error) => (error ? reject(error) : resolve()))
    })
    return true
  } catch {
    return false
  }
}

export async function findPdfToText() {
  const configured = process.env.PDFTOTEXT_PATH
  if (configured && (await isExecutable(configured))) return configured

  for (const candidate of ['/opt/homebrew/bin/pdftotext', '/usr/local/bin/pdftotext', '/usr/bin/pdftotext']) {
    if (await isExecutable(candidate)) return candidate
  }

  try {
    const { stdout } = await execFileAsync('which', ['pdftotext'])
    const discovered = stdout.trim()
    if (discovered && (await isExecutable(discovered))) return discovered
  } catch {
    // The validator will emit a visible warning when Poppler is unavailable.
  }

  return null
}

export async function extractPdfText(extractor, pdfPath) {
  const { stdout } = await execFileAsync(extractor, ['-layout', pdfPath, '-'], {
    maxBuffer: 10 * 1024 * 1024,
  })
  return stdout
}

function assertMarkersInOrder(text, markers, context) {
  const searchableText = text.toLocaleLowerCase()
  let previousIndex = -1
  for (const marker of markers) {
    const currentIndex = searchableText.indexOf(marker.toLocaleLowerCase())
    if (currentIndex === -1) {
      throw new Error(`[pdf-ats] ${context}: missing "${marker}"`)
    }
    if (currentIndex < previousIndex) {
      throw new Error(`[pdf-ats] ${context}: "${marker}" is out of reading order`)
    }
    previousIndex = currentIndex
  }
}

function assertExactMarkersInOrder(text, markers, context) {
  let previousIndex = -1
  for (const marker of markers) {
    const currentIndex = text.indexOf(marker)
    if (currentIndex === -1) {
      throw new Error(`[pdf-ats] ${context}: missing "${marker}"`)
    }
    if (currentIndex < previousIndex) {
      throw new Error(`[pdf-ats] ${context}: "${marker}" is out of reading order`)
    }
    previousIndex = currentIndex
  }
}

function findMarker(text, marker) {
  return text.toLocaleLowerCase().indexOf(marker.toLocaleLowerCase())
}

function validateExtractedText(text, contract) {
  const normalized = normalize(text)
  if (!normalized) throw new Error(`[pdf-ats] ${contract.filename}: extracted text is empty`)

  assertMarkersInOrder(
    normalized,
    ['Alejandro García Iglesias', ...contract.titleMarkers, 'ale.garciaiglesias@gmail.com'],
    contract.filename,
  )
  assertExactMarkersInOrder(normalized, contract.sections ?? expectedSections, contract.filename)
  assertMarkersInOrder(normalized, contract.historyMarkers ?? expectedHistory, contract.filename)

  const firstBulletIndex = findMarker(normalized, contract.firstBulletMarker)
  const nextRoleIndex = findMarker(normalized, 'Rotunda Software')
  if (firstBulletIndex === -1) {
    throw new Error(`[pdf-ats] ${contract.filename}: first experience bullet was not extracted`)
  }
  if (nextRoleIndex === -1 || firstBulletIndex > nextRoleIndex) {
    throw new Error(`[pdf-ats] ${contract.filename}: experience bullets are out of reading order`)
  }
}

function withDefaultContract(file) {
  const defaults = defaultContracts.find(({ filename }) => filename === file.filename)
  if (!defaults) return file

  return {
    ...defaults,
    ...file,
    titleMarkers: file.titleMarkers ?? defaults.titleMarkers,
    firstBulletMarker: file.firstBulletMarker ?? defaults.firstBulletMarker,
    sections: file.sections ?? defaults.sections,
  }
}

export async function validateGeneratedPdfs(files, { onMissingExtractor = 'warn' } = {}) {
  const extractor = await findPdfToText()
  if (!extractor) {
    const message =
      '[pdf-ats] WARNING: pdftotext was not found; PDF text validation was skipped. Set PDFTOTEXT_PATH to a Poppler pdftotext executable to enable it.'
    if (onMissingExtractor === 'error') throw new Error(message)
    console.warn(message)
    return { skipped: true }
  }

  for (const file of files) {
    const contract = withDefaultContract(file)
    const text = await extractPdfText(extractor, contract.path)
    validateExtractedText(text, contract)
    console.log(`[pdf-ats] PASS ${contract.filename}`)
  }

  return { skipped: false, extractor }
}

async function main() {
  const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
  const publicDir = path.join(projectRoot, 'public')
  const files = defaultContracts.map((contract) => ({
    ...contract,
    path: path.join(publicDir, contract.filename),
  }))

  await validateGeneratedPdfs(files, { onMissingExtractor: 'error' })
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main()
}
