import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Experience } from '../components/Experience'
import { appliedAiEsResume } from '../data/applied-ai-es-resume'
import { frontendResume } from '../data/frontend-resume'

vi.mock('framer-motion', () => {
  const make = (tag: string) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ children, ...rest }: any) => {
      for (const key of ['initial', 'animate', 'whileInView', 'viewport', 'transition']) {
        delete rest[key]
      }
      return React.createElement(tag, rest, children)
    }

  return {
    motion: new Proxy({} as Record<string, unknown>, { get: (_, key) => make(String(key)) }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Experience', () => {
  it('renders all featured roles by default', () => {
    render(<Experience resume={frontendResume} />)
    const featured = frontendResume.roles.filter((r) => r.featured)
    for (const role of featured) {
      expect(screen.getByText(role.company)).toBeInTheDocument()
    }
    expect(screen.getByText(frontendResume.earlierExperienceSummary)).toBeInTheDocument()
  })

  it('keeps the earlier-experience summary and print LinkedIn note in one group', () => {
    render(<Experience resume={frontendResume} />)

    const summary = screen.getByText(frontendResume.earlierExperienceSummary)
    const linkedIn = screen.getByText('in/alegarciaiglesias')
    const summaryGroup = summary.closest('[data-print-group="experience-summary-linkedin"]')

    expect(summaryGroup).toBeInTheDocument()
    expect(summaryGroup).toHaveClass('print-experience-summary-linkedin')
    expect(summaryGroup).toHaveClass(
      'mt-3',
      'mb-0',
      'px-4',
      'text-center',
      'sm:px-16',
      'md:px-28',
      'print:border-b',
      'print:border-border',
      'print:px-16',
    )
    expect(summaryGroup).toContainElement(linkedIn)
  })

  it('gives the longer Spanish earlier-experience summary more horizontal room', () => {
    render(<Experience resume={appliedAiEsResume} />)

    const summary = screen.getByText(appliedAiEsResume.earlierExperienceSummary)
    const summaryGroup = summary.closest('[data-print-group="experience-summary-linkedin"]')

    expect(summaryGroup).toHaveClass('md:px-20', 'print:px-16')
    expect(summaryGroup).not.toHaveClass('md:px-28')
  })

  it('does not render historical roles until expanded', () => {
    render(<Experience resume={frontendResume} />)
    const historical = frontendResume.roles.filter((r) => !r.featured)
    for (const role of historical) {
      expect(screen.queryByText(role.company)).not.toBeInTheDocument()
    }
  })

  it('reveals historical roles after clicking Show more', async () => {
    const user = userEvent.setup()
    render(<Experience resume={frontendResume} />)

    const trigger = screen.getByRole('button', { name: 'Show 4 earlier full-stack roles' })
    await user.click(trigger)

    const historical = frontendResume.roles.filter((r) => !r.featured)
    for (const role of historical) {
      expect(await screen.findByText(role.company)).toBeInTheDocument()
    }
  })

  it('reveals historical roles after clicking the Spanish expand control', async () => {
    const user = userEvent.setup()
    render(<Experience resume={appliedAiEsResume} />)

    expect(screen.queryByText('Yanma Solutions')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Ver 4 roles full-stack anteriores' }))
    expect(await screen.findByText('Yanma Solutions')).toBeInTheDocument()
    expect(screen.getAllByText('Fullstack Developer')).toHaveLength(4)
  })
})
