import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/cv/',
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        frontend: path.resolve(__dirname, 'frontend/index.html'),
        product: path.resolve(__dirname, 'product/index.html'),
        ai: path.resolve(__dirname, 'ai/index.html'),
        tpm: path.resolve(__dirname, 'tpm/index.html'),
        technicalProjectAiSystems: path.resolve(
          __dirname,
          'technical-project-ai-systems/index.html',
        ),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
