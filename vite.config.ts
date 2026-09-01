import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { staticResumeRoutes } from './src/data/static-resume-routes'

export default defineConfig({
  base: '/cv/',
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        staticResumeRoutes.map((route) => [route.input, path.resolve(__dirname, route.source)]),
      ),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
