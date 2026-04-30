const GA4_ID = 'G-XXXXXXXXXX' // TODO: replace with real GA4 measurement ID

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function initAnalytics() {
  if (navigator.doNotTrack === '1') return

  const load = () => {
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    script.async = true
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer ?? []
    window.gtag = function (...args) {
      window.dataLayer.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA4_ID)
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(load)
  } else {
    setTimeout(load, 1000)
  }
}
