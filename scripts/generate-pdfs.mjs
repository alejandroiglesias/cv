import { spawn } from 'node:child_process'
import { constants } from 'node:fs'
import { access, copyFile, mkdir, mkdtemp, rm, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { preview } from 'vite'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(projectRoot, 'public')
const distDir = path.join(projectRoot, 'dist')
const host = '127.0.0.1'

const pdfs = [
  {
    route: '/cv/',
    filename: 'alejandro-garcia-iglesias-frontend-engineer-cv.pdf',
  },
  {
    route: '/cv/product/',
    filename: 'alejandro-garcia-iglesias-product-engineer-cv.pdf',
  },
  {
    route: '/cv/ai/',
    filename: 'alejandro-garcia-iglesias-applied-ai-cv.pdf',
  },
  {
    route: '/cv/tpm/',
    filename: 'alejandro-garcia-iglesias-technical-project-manager-cv.pdf',
  },
]

const legacyTpmFilename = 'alejandro-garcia-iglesias-technical-project-ai-systems-cv.pdf'

async function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean)

  for (const candidate of candidates) {
    try {
      await access(candidate, constants.X_OK)
      return candidate
    } catch {
      // Try the next platform-specific location.
    }
  }

  throw new Error(
    'Chrome was not found. Install Google Chrome or set CHROME_PATH to its executable.',
  )
}

function closePreview(server) {
  return new Promise((resolve, reject) => {
    server.httpServer.close((error) => {
      if (error) reject(error)
      else resolve()
    })
  })
}

async function waitForStableFile(filePath) {
  let previousSize = -1
  let stableChecks = 0

  for (let attempt = 0; attempt < 300; attempt += 1) {
    try {
      const { size } = await stat(filePath)
      stableChecks = size > 0 && size === previousSize ? stableChecks + 1 : 0
      if (stableChecks >= 5) return
      previousSize = size
    } catch {
      // Chrome has not created the PDF yet.
    }

    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  throw new Error(`Chrome did not finish writing ${filePath}`)
}

async function runChrome(chromePath, args, outputPath) {
  const child = spawn(chromePath, args, { stdio: ['ignore', 'ignore', 'pipe'] })
  let stderr = ''
  let launchError

  child.stderr.on('data', (chunk) => {
    stderr += chunk
  })
  child.on('error', (error) => {
    launchError = error
  })

  const exitPromise = new Promise((resolve) => child.once('close', resolve))

  try {
    await waitForStableFile(outputPath)
  } catch (error) {
    if (child.exitCode === null) child.kill('SIGKILL')
    if (launchError) throw launchError
    throw new Error(`${error.message}\n${stderr.trim()}`)
  }

  if (child.exitCode === null) {
    child.kill('SIGTERM')
    await Promise.race([
      exitPromise,
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ])
  }
  if (child.exitCode === null) child.kill('SIGKILL')
}

const chromePath = await findChrome()
const tempDir = await mkdtemp(path.join(tmpdir(), 'cv-pdf-build-'))
let server

try {
  server = await preview({
    root: projectRoot,
    preview: {
      host,
      port: 0,
    },
  })

  const address = server.httpServer.address()
  if (!address || typeof address === 'string') {
    throw new Error('Could not determine the local preview port.')
  }
  const previewPort = address.port

  await mkdir(publicDir, { recursive: true })
  await mkdir(distDir, { recursive: true })

  await Promise.all(
    pdfs.map(async (pdf, index) => {
      const profileDir = path.join(tempDir, `profile-${index}`)
      const generatedPath = path.join(tempDir, pdf.filename)
      await mkdir(profileDir, { recursive: true })

      const publicPath = path.join(publicDir, pdf.filename)
      const distPath = path.join(distDir, pdf.filename)
      const url = `http://${host}:${previewPort}${pdf.route}`

      console.log(`Generating ${pdf.filename} from ${pdf.route}`)

      await runChrome(
        chromePath,
        [
          '--headless=new',
          '--disable-background-networking',
          '--disable-background-mode',
          '--disable-component-update',
          '--disable-default-apps',
          '--disable-extensions',
          '--disable-gpu',
          '--disable-sync',
          '--metrics-recording-only',
          '--no-first-run',
          '--no-pdf-header-footer',
          '--run-all-compositor-stages-before-draw',
          '--virtual-time-budget=1500',
          `--user-data-dir=${profileDir}`,
          `--print-to-pdf=${generatedPath}`,
          url,
        ],
        generatedPath,
      )

      await Promise.all([
        copyFile(generatedPath, publicPath),
        copyFile(generatedPath, distPath),
      ])
      console.log(`Generated ${pdf.filename}`)
    }),
  )

  const tpmPdf = pdfs.find((pdf) => pdf.route === '/cv/tpm/')
  if (!tpmPdf) throw new Error('TPM PDF configuration is missing.')

  await Promise.all([
    copyFile(
      path.join(publicDir, tpmPdf.filename),
      path.join(publicDir, legacyTpmFilename),
    ),
    copyFile(
      path.join(distDir, tpmPdf.filename),
      path.join(distDir, legacyTpmFilename),
    ),
  ])
  console.log(`Copied ${legacyTpmFilename} from ${tpmPdf.filename}`)
} finally {
  if (server) await closePreview(server)
  await rm(tempDir, { recursive: true, force: true })
}
