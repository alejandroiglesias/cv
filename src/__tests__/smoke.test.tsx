import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { App } from '../App'
import { appliedAiEsResume } from '../data/applied-ai-es-resume'
import { generalResume } from '../data/general-resume'
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
    expect(screen.getByText('Professional Summary')).toBeInTheDocument()
    expect(screen.getByText('Focus Areas')).toBeInTheDocument()
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

  it('renders the General resume by default with its own PDF', () => {
    render(<App />)

    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
      'href',
      generalResume.pdfPath,
    )
  })

  it('renders the Technical Project / AI Systems variant with its own PDF', () => {
    render(<App resume={technicalProjectAiSystemsResume} />)

    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Technical Project Delivery', { selector: 'p' })).toBeInTheDocument()
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

  it('renders the Spanish Applied AI variant with localized headings and its own PDF', () => {
    render(<App resume={appliedAiEsResume} />)

    expect(screen.getByText('Resumen Profesional')).toBeInTheDocument()
    expect(screen.getByText('Áreas de Enfoque')).toBeInTheDocument()
    expect(screen.getByText('Habilidades')).toBeInTheDocument()
    expect(screen.getByText('Experiencia')).toBeInTheDocument()
    expect(screen.getAllByText('Senior Software Engineer — IA Aplicada').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Descargar PDF' })).toHaveAttribute(
      'href',
      '/cv/alejandro-garcia-iglesias-applied-ai-es-cv.pdf',
    )
    expect(
      screen.getByRole('link', {
        name: 'alejandroiglesias.github.io/cv',
      }),
    ).toHaveAttribute('href', 'https://alejandroiglesias.github.io/cv/ai/es/')
  })
})
