import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import React from 'react'
import { App } from '../App'
import { getResumeCopy } from '../data/resume-copy'
import { resumes } from '../data/resumes'

vi.mock('framer-motion', () => {
  const make = (tag: string) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ children, ...rest }: any) => {
      for (const key of ['initial', 'animate', 'whileInView', 'viewport', 'transition', 'exit']) {
        delete rest[key]
      }
      return React.createElement(tag, rest, children)
    }

  return {
    motion: new Proxy({} as Record<string, unknown>, { get: (_, key) => make(String(key)) }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => false,
  }
})

vi.mock('../lib/analytics', () => ({ initAnalytics: vi.fn() }))

describe('App', () => {
  it('renders its main sections', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Professional Summary' })).toBeInTheDocument()
    expect(screen.getByText('Focus Areas')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument()
  })

  it.each(Object.values(resumes))('renders the $id variant through the App shell', (resume) => {
    render(<App resume={resume} />)
    const copy = getResumeCopy(resume)
    const [primaryTitle, ...rest] = resume.title.split('|')
    const tagline = rest.join('|').trim()
    const hero = screen.getByRole('banner')

    expect(within(hero).getByRole('heading', { name: resume.name })).toBeInTheDocument()
    expect(within(hero).getByText(primaryTitle.trim())).toBeInTheDocument()
    if (tagline) expect(within(hero).getByText(tagline)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: copy.professionalSummary })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: copy.downloadPdf })).toHaveAttribute(
      'href',
      resume.pdfPath,
    )
  })
})
