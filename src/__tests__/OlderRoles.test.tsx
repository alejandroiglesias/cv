import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { OlderRoles } from '../components/OlderRoles'
import type { Role } from '../types/resume'

vi.mock('framer-motion', () => ({
  motion: new Proxy({} as Record<string, unknown>, {
    get: (_, tag) => ({ children, ...props }: { children?: React.ReactNode }) => {
      return React.createElement(String(tag), props, children)
    },
  }),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

const roles: Role[] = [
  {
    company: 'Example Co',
    title: 'Developer',
    start: '2020',
    end: '2021',
    bullets: ['Built things'],
    featured: false,
  },
]

describe('OlderRoles', () => {
  it('has an accessible collapsed trigger and reveals roles on activation', async () => {
    const user = userEvent.setup()
    render(<OlderRoles roles={roles} showEarlierRoles="Show earlier roles" />)
    const trigger = screen.getByRole('button', { name: 'Show earlier roles' })

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Example Co')).not.toBeInTheDocument()

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Example Co')).toBeInTheDocument()
  })

  it('closes the expanded roles and restores the trigger label', async () => {
    const user = userEvent.setup()
    render(<OlderRoles roles={roles} showLess="Show less roles" showEarlierRoles="Show roles" />)
    const trigger = screen.getByRole('button', { name: 'Show roles' })

    await user.click(trigger)
    await user.click(screen.getByRole('button', { name: 'Show less roles' }))

    expect(screen.getByRole('button', { name: 'Show roles' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Example Co')).not.toBeInTheDocument()
  })
})
