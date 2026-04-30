import { useEffect, useRef } from 'react'

interface ObfuscatedEmailProps {
  obfuscated: string
  className?: string
}

/** Decodes email on mount to defeat scrapers. Pre-hydration shows no valid address. */
export function ObfuscatedEmail({ obfuscated, className }: ObfuscatedEmailProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const email = obfuscated.replace(',', '@')
    ref.current.href = `mailto:${email}`
    ref.current.textContent = email
  }, [obfuscated])

  return (
    <a ref={ref} className={className} aria-label="Send email">
      {/* pre-hydration placeholder — intentionally blank */}
    </a>
  )
}
