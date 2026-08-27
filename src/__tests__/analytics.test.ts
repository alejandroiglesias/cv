import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('initAnalytics', () => {
  beforeEach(() => {
    vi.resetModules()
    document.head.innerHTML = ''
    delete window.dataLayer
    delete window.gtag
    Object.defineProperty(navigator, 'doNotTrack', { configurable: true, value: null })
  })

  it('does not load analytics when the browser requests Do Not Track', async () => {
    Object.defineProperty(navigator, 'doNotTrack', { configurable: true, value: '1' })
    const { initAnalytics } = await import('../lib/analytics')

    initAnalytics()

    expect(document.querySelector('script[src*="googletagmanager.com/gtag/js"]')).not.toBeInTheDocument()
  })

  it('loads the tag during idle time and queues the GA4 bootstrap calls', async () => {
    let idleCallback: IdleRequestCallback | undefined
    let idleOptions: IdleRequestOptions | undefined
    Object.assign(window, {
      requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => {
        idleCallback = callback
        idleOptions = options
        return 1
      },
    })
    const { initAnalytics } = await import('../lib/analytics')

    initAnalytics()
    expect(idleOptions).toEqual({ timeout: 2_000 })
    idleCallback?.({} as IdleDeadline)

    expect(document.querySelector('script[src="https://www.googletagmanager.com/gtag/js?id=G-W53LE90EMV"]')).toBeInTheDocument()
    expect(window.dataLayer).toHaveLength(2)
    expect(window.dataLayer[1]).toEqual(['config', 'G-W53LE90EMV'])
  })

  it('does not load the Google tag more than once', async () => {
    const idleCallbacks: IdleRequestCallback[] = []
    Object.assign(window, {
      requestIdleCallback: (callback: IdleRequestCallback) => {
        idleCallbacks.push(callback)
        return idleCallbacks.length
      },
    })
    const { initAnalytics } = await import('../lib/analytics')

    initAnalytics()
    initAnalytics()
    idleCallbacks.forEach((callback) => callback({} as IdleDeadline))

    expect(document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]').length).toBe(1)
  })
})
