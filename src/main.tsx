import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getResumeForPath } from '@/data/resumes'

const resume = getResumeForPath(window.location.pathname)
const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App resume={resume} />
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
