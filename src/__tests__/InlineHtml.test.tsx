import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InlineHtml } from '../components/InlineHtml'

describe('InlineHtml', () => {
  it('renders plain text without introducing markup', () => {
    const { container } = render(<p><InlineHtml html="A plain bullet" /></p>)
    expect(container.querySelector('a')).not.toBeInTheDocument()
    expect(screen.getByText('A plain bullet')).toBeInTheDocument()
  })

  it('renders supported links with safe external-link semantics and surrounding text', () => {
    render(<InlineHtml html={'Read <a href="https://example.com">the docs</a> today.'} />)
    const link = screen.getByRole('link', { name: 'the docs' })

    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText(/Read/)).toHaveTextContent('Read')
    expect(screen.getByText(/today/)).toHaveTextContent('today.')
  })

  it('renders multiple links in their original order', () => {
    render(<InlineHtml html={'<a href="/one">One</a> and <a href="/two">Two</a>'} />)
    expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual(['One', 'Two'])
  })
})
