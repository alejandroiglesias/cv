import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Experience } from '../components/Experience'
import { resume } from '../data/resume'

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
    render(<Experience resume={resume} />)
    const featured = resume.roles.filter((r) => r.featured)
    for (const role of featured) {
      expect(screen.getByText(role.company)).toBeInTheDocument()
    }
    expect(screen.getByText(resume.earlierExperienceSummary)).toBeInTheDocument()
  })

  it('keeps the earlier-experience summary and print LinkedIn note in one group', () => {
    render(<Experience resume={resume} />)

    const summary = screen.getByText(resume.earlierExperienceSummary)
    const linkedIn = screen.getByText('in/alegarciaiglesias')
    const summaryGroup = summary.closest('[data-print-group="experience-summary-linkedin"]')

    expect(summaryGroup).toBeInTheDocument()
    expect(summaryGroup).toHaveClass('print-experience-summary-linkedin')
    expect(summaryGroup).toContainElement(linkedIn)
  })

  it('does not render historical roles until expanded', () => {
    render(<Experience resume={resume} />)
    const historical = resume.roles.filter((r) => !r.featured)
    for (const role of historical) {
      expect(screen.queryByText(role.company)).not.toBeInTheDocument()
    }
  })

  it('reveals historical roles after clicking Show more', async () => {
    const user = userEvent.setup()
    render(<Experience resume={resume} />)

    const trigger = screen.getByRole('button', { name: 'Show 4 earlier full-stack roles' })
    await user.click(trigger)

    const historical = resume.roles.filter((r) => !r.featured)
    for (const role of historical) {
      expect(await screen.findByText(role.company)).toBeInTheDocument()
    }
  })
})
