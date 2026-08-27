import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { ObfuscatedEmail } from '../components/ObfuscatedEmail'

describe('ObfuscatedEmail', () => {
  it('does not expose either email form in server-rendered markup', () => {
    const markup = renderToString(
      <ObfuscatedEmail obfuscated="ale.garciaiglesias,gmail.com" />,
    )

    expect(markup).not.toContain('ale.garciaiglesias@gmail.com')
    expect(markup).not.toContain('ale.garciaiglesias,gmail.com')
  })

  it('resolves the obfuscated email to a mailto href after hydration', () => {
    render(<ObfuscatedEmail obfuscated="ale.garciaiglesias,gmail.com" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'mailto:ale.garciaiglesias@gmail.com')
  })

  it('updates the link when the obfuscated prop changes', () => {
    const { rerender } = render(
      <ObfuscatedEmail obfuscated="ale.garciaiglesias,gmail.com" />,
    )
    const link = screen.getByRole('link')
    rerender(<ObfuscatedEmail obfuscated="hello,example.org" />)

    expect(link).toHaveAttribute('href', 'mailto:hello@example.org')
    expect(link).toHaveTextContent('hello@example.org')
  })
})
