const GA4_ID = 'G-W53LE90EMV'
const GA4_SCRIPT_SELECTOR = `script[src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"]`

let loadScheduled = false

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function initAnalytics() {
  if (navigator.doNotTrack === '1' || loadScheduled || document.querySelector(GA4_SCRIPT_SELECTOR)) {
    return
  }

  loadScheduled = true

  const load = () => {
    if (document.querySelector(GA4_SCRIPT_SELECTOR)) {
      loadScheduled = false
      return
    }

    window.dataLayer = window.dataLayer ?? []
    window.gtag = function () {
      // gtag.js consumes the native Arguments object from its bootstrap queue.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA4_ID)

    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    script.async = true
    document.head.appendChild(script)
    loadScheduled = false
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(load, { timeout: 2_000 })
  } else {
    setTimeout(load, 1000)
  }
}
