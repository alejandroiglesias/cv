import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { getResumeForPath } from '@/data/resumes'
export { staticResumeRoutes } from '@/data/static-resume-routes'

export function render(pathname: string) {
  const resume = getResumeForPath(pathname)

  return renderToString(
    <StrictMode>
      <App resume={resume} />
    </StrictMode>,
  )
}
