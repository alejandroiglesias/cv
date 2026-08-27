import { describe, expect, it, beforeEach, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useTheme } from '../hooks/useTheme'

function ThemeProbe() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
  return (
    <div>
      <output data-testid="theme">{theme}</output>
      <output data-testid="resolved">{resolvedTheme}</output>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  )
}

describe('useTheme', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('restores a saved theme, applies it, and persists toggles', async () => {
    window.localStorage.setItem('theme', 'dark')
    const user = userEvent.setup()
    render(<ThemeProbe />)

    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveClass('dark')

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(document.documentElement).not.toHaveClass('dark')
    expect(window.localStorage.getItem('theme')).toBe('light')
  })

  it('tracks system preference changes while using the system theme', async () => {
    let matches = false
    const changeListeners = new Set<() => void>()
    vi.spyOn(window, 'matchMedia').mockImplementation(() => ({
      get matches() {
        return matches
      },
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
        changeListeners.add(listener as () => void)
      },
      removeEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
        changeListeners.delete(listener as () => void)
      },
      dispatchEvent: vi.fn(),
    }))
    const user = userEvent.setup()
    render(<ThemeProbe />)
    await user.click(screen.getByRole('button', { name: 'System' }))

    act(() => {
      matches = true
      changeListeners.forEach((listener) => listener())
    })
    expect(document.documentElement).toHaveClass('dark')
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark')

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(screen.getByTestId('resolved')).toHaveTextContent('light')
    expect(document.documentElement).not.toHaveClass('dark')
  })
})
