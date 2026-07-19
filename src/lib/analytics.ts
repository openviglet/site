/**
 * Consent-gated Google Analytics (Block D / W12).
 *
 * The site ships **no** analytics until the visitor explicitly opts in — the
 * gtag loader was removed from index.html and lives here, loaded only after
 * consent (LGPD/privacy-first, cursarei's ConsentBanner pattern). The choice is
 * persisted in localStorage so the banner appears once.
 */

const GA_ID = 'G-SMSL7R3897'
const CONSENT_KEY = 'viglet-analytics-consent'

/** Custom event the footer's "Cookie settings" link fires to reopen the banner. */
export const OPEN_CONSENT_EVENT = 'viglet:open-consent'

export type Consent = 'granted' | 'denied'

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function setConsent(consent: Consent): void {
  try {
    localStorage.setItem(CONSENT_KEY, consent)
  } catch {
    /* storage blocked — honour the choice for this session only */
  }
  if (consent === 'granted') loadAnalytics()
}

/** Let a visitor re-open the banner to change their mind. */
export function reopenConsent(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}

let loaded = false

/** Inject gtag.js and configure GA — idempotent, only ever called after consent. */
export function loadAnalytics(): void {
  if (loaded || typeof window === 'undefined') return
  loaded = true

  const w = window as unknown as { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void }
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  w.dataLayer = w.dataLayer || []
  function gtag(...args: unknown[]) {
    w.dataLayer.push(args)
  }
  w.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_ID)
}

/** Called once at startup: honour a previously granted consent, load nothing otherwise. */
export function initAnalyticsFromConsent(): void {
  if (getConsent() === 'granted') loadAnalytics()
}
