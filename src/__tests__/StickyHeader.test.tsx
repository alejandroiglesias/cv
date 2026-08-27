import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { StickyHeader } from '../components/StickyHeader'

vi.mock('framer-motion', () => {
  const make = (tag: string) =>
    ({ children, ...props }: { children?: React.ReactNode }) =>
      React.createElement(tag, props, children)
  return {
    motion: new Proxy({} as Record<string, unknown>, { get: (_, tag) => make(String(tag)) }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('StickyHeader', () => {
  it('appears when the hero name leaves the viewport and disconnects on unmount', async () => {
    let intersectionCallback: IntersectionObserverCallback | undefined
    const disconnect = vi.fn()
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: IntersectionObserverCallback) {
          intersectionCallback = callback
        }
        observe = vi.fn()
        disconnect = disconnect
      },
    )
    const { unmount } = render(
      <>
        <h1 id="hero-name">Hero</h1>
        <StickyHeader name="Alejandro García Iglesias" />
      </>,
    )

    expect(screen.queryByText('Alejandro García Iglesias')).not.toBeInTheDocument()
    intersectionCallback?.([
      { isIntersecting: false } as IntersectionObserverEntry,
    ], {} as IntersectionObserver)
    await waitFor(() => expect(screen.getByText('Alejandro García Iglesias')).toBeInTheDocument())

    unmount()
    expect(disconnect).toHaveBeenCalledOnce()
  })

  it('stays hidden while the hero name remains visible', () => {
    let intersectionCallback: IntersectionObserverCallback | undefined
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: IntersectionObserverCallback) {
          intersectionCallback = callback
        }
        observe = vi.fn()
        disconnect = vi.fn()
      },
    )
    render(
      <>
        <h1 id="hero-name">Hero</h1>
        <StickyHeader name="Alejandro García Iglesias" />
      </>,
    )
    intersectionCallback?.([
      { isIntersecting: true } as IntersectionObserverEntry,
    ], {} as IntersectionObserver)

    expect(screen.queryByText('Alejandro García Iglesias')).not.toBeInTheDocument()
  })
})
