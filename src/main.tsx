import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getResumeForPath } from '@/data/resumes'

const resume = getResumeForPath(window.location.pathname)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App resume={resume} />
  </StrictMode>,
)
