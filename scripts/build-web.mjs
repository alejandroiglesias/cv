import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import react from '@vitejs/plugin-react'
import { build } from 'vite'

const projectRoot = path.resolve(import.meta.dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const serverOutDir = await mkdtemp(path.join(tmpdir(), 'cv-prerender-'))
const rootMarker = '<div id="root"></div>'

try {
  await build({ root: projectRoot })
  await build({
    configFile: false,
    root: projectRoot,
    publicDir: false,
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.join(projectRoot, 'src'),
      },
    },
    ssr: {
      noExternal: true,
    },
    build: {
      ssr: path.join(projectRoot, 'src/entry-server.tsx'),
      outDir: serverOutDir,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: 'entry-server.mjs',
        },
      },
    },
  })

  const serverEntry = path.join(serverOutDir, 'entry-server.mjs')
  const { render, staticResumeRoutes } = await import(pathToFileURL(serverEntry).href)

  for (const route of staticResumeRoutes) {
    const outputPath = path.join(distDir, route.output)
    const template = await readFile(outputPath, 'utf8')

    if (!template.includes(rootMarker)) {
      throw new Error(`Could not find the empty root marker in ${route.output}`)
    }

    const html = template.replace(rootMarker, `<div id="root">${render(route.pathname)}</div>`)
    await writeFile(outputPath, html)
  }
} finally {
  await rm(serverOutDir, { recursive: true, force: true })
}
