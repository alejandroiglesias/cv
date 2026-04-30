import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ObfuscatedEmail } from '../components/ObfuscatedEmail'

describe('ObfuscatedEmail', () => {
  it('resolves the obfuscated email to a mailto href on mount', () => {
    render(<ObfuscatedEmail obfuscated="ale.garciaiglesias,gmail.com" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'mailto:ale.garciaiglesias@gmail.com')
  })

  it('shows the human-readable email address as link text after mount', () => {
    render(<ObfuscatedEmail obfuscated="ale.garciaiglesias,gmail.com" />)
    const link = screen.getByRole('link')
    expect(link).toHaveTextContent('ale.garciaiglesias@gmail.com')
  })

  it('the raw obfuscated string (with comma) never appears in the DOM', () => {
    const { container } = render(
      <ObfuscatedEmail obfuscated="ale.garciaiglesias,gmail.com" />
    )
    expect(container.innerHTML).not.toContain('ale.garciaiglesias,gmail.com')
  })
})
