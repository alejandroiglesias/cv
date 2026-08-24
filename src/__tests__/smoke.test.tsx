import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { App } from '../App'
import { technicalProjectAiSystemsResume } from '../data/technical-project-ai-systems-resume'

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
  it('renders the name', () => {
    render(<App />)
    expect(screen.getByText('Alejandro García Iglesias')).toBeInTheDocument()
  })

  it('renders all section headings', () => {
    render(<App />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders all featured roles', () => {
    render(<App />)
    expect(screen.getByText('Rotunda Software')).toBeInTheDocument()
    expect(screen.getByText('BairesDev')).toBeInTheDocument()
    expect(screen.getByText('Mapme')).toBeInTheDocument()
    expect(screen.getByText('Deviget')).toBeInTheDocument()
  })

  it('renders the Technical Project / AI Systems variant with its own PDF', () => {
    render(<App resume={technicalProjectAiSystemsResume} />)

    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    expect(
      screen.getByText('Senior Software Engineer — Technical Product & AI Systems'),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
      'href',
      '/cv/alejandro-garcia-iglesias-technical-project-manager-cv.pdf',
    )
    expect(
      screen.getByRole('link', {
        name: 'alejandroiglesias.github.io/cv',
      }),
    ).toHaveAttribute('href', 'https://alejandroiglesias.github.io/cv/tpm/')
  })
})
