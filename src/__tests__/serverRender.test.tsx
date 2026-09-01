// @vitest-environment node

import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { App } from '../App'
import { getResumeCopy } from '../data/resume-copy'
import { resumes } from '../data/resumes'

describe('server-rendered resumes', () => {
  it.each(Object.values(resumes))('renders the $id variant without browser APIs', (resume) => {
    const markup = renderToString(<App resume={resume} />)
    const copy = getResumeCopy(resume)

    expect(markup).toContain(resume.name)
    expect(markup).toContain(copy.professionalSummary)
    expect(markup).toContain(resume.pdfPath)
  })
})
