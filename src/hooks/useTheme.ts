import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const resolved = theme === 'system' ? getSystemTheme() : theme
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

function safeGetTheme(): Theme {
  try {
    return (localStorage.getItem('theme') as Theme | null) ?? 'system'
  } catch {
    return 'system'
  }
}

function safeSaveTheme(theme: Theme) {
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // ignore
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(safeGetTheme)

  useEffect(() => {
    applyTheme(theme)
    safeSaveTheme(theme)
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('system')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

  return { theme, resolvedTheme, setTheme, toggleTheme }
}
