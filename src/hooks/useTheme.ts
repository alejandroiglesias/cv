import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', theme === 'dark')
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
  const [systemTheme, setSystemTheme] = useState(getSystemTheme)
  const resolvedTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    applyTheme(resolvedTheme)
    safeSaveTheme(theme)
  }, [resolvedTheme, theme])

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setSystemTheme(mq.matches ? 'dark' : 'light')
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  return { theme, resolvedTheme, setTheme, toggleTheme }
}
