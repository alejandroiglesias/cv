import { useEffect, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark' | 'system'
const themeChangeEvent = 'cv-theme-change'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
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

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  window.addEventListener(themeChangeEvent, onStoreChange)
  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener(themeChangeEvent, onStoreChange)
  }
}

function subscribeToSystemTheme(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

export function useTheme() {
  const theme = useSyncExternalStore<Theme>(subscribeToTheme, safeGetTheme, () => 'system')
  const systemTheme = useSyncExternalStore<'light' | 'dark'>(
    subscribeToSystemTheme,
    getSystemTheme,
    () => 'light',
  )
  const resolvedTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

  const setTheme = (nextTheme: Theme) => {
    safeSaveTheme(nextTheme)
    window.dispatchEvent(new Event(themeChangeEvent))
  }

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  return { theme, resolvedTheme, setTheme, toggleTheme }
}
