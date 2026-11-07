/**
 * Consent-gated Google Analytics (Block D / W12).
 *
 * The site ships **no** analytics until the visitor explicitly opts in. The
 * gtag loader is not in the page head; it lives here, loaded only after
 * consent (LGPD/privacy-first, cursarei's ConsentBanner pattern). The choice is
 * persisted in localStorage so the banner appears once.
 */

const GA_ID = 'G-SMSL7R3897'
const CONSENT_KEY = 'viglet-analytics-consent'

/** Custom event the footer's "Cookie settings" link fires to reopen the banner. */
export const OPEN_CONSENT_EVENT = 'viglet:open-consent'

export type Consent = 'granted' | 'denied'
let sessionConsent: Consent | undefined

export function getConsent(): Consent | null {
  if (sessionConsent !== undefined) return sessionConsent
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function setConsent(consent: Consent): void {
  sessionConsent = consent
  try {
    localStorage.setItem(CONSENT_KEY, consent)
    sessionConsent = undefined
  } catch {
    /* storage blocked: honour the choice for this session only */
  }
  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = consent !== 'granted'
  }
  if (consent === 'granted') loadAnalytics()
}

/** Let a visitor re-open the banner to change their mind. */
export function reopenConsent(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}

let loaded = false

/** Inject gtag.js and configure GA. Idempotent, only ever called after consent. */
export function loadAnalytics(): void {
  if (typeof window === 'undefined' || getConsent() !== 'granted') return
  const flags = window as unknown as Record<string, unknown>
  flags[`ga-disable-${GA_ID}`] = false
  if (loaded) return
  loaded = true

  const w = window as unknown as { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void }
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  w.dataLayer = w.dataLayer || []
  // W44: gtag.js runs only `arguments` objects found on the data layer as commands. A rest-args
  // array is read as a plain data-layer message, so `js` and `config` never reached GA.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments)
  }
  w.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_ID)
}

/** Called once at startup: honour a previously granted consent, load nothing otherwise. */
export function initAnalyticsFromConsent(): void {
  const granted = getConsent() === 'granted'
  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = !granted
  }
  if (granted) loadAnalytics()
}

export const journeyActions = ['demo_open', 'setup_guide_open', 'product_open', 'contact_intent'] as const
export type JourneyAction = (typeof journeyActions)[number]

const allowedDimensions = {
  product: ['turing', 'dumont', 'shio', 'suite'],
  journey: ['general', 'aem', 'wordpress', 'shio'],
  placement: ['home_hero', 'home_products', 'home_context', 'home_support', 'blog', 'comparison', 'navigation', 'download', 'docs', 'overview'],
} as const

/** Intent only: never infer a completed install or a submitted lead from a click. */
export function trackJourneyAction(action: string, dimensions: Record<string, string | undefined>): void {
  if (typeof window === 'undefined' || getConsent() !== 'granted') return
  if (!journeyActions.includes(action as JourneyAction)) return
  const safe: Record<string, string> = {}
  for (const [key, allowed] of Object.entries(allowedDimensions)) {
    const value = dimensions[key]
    if (value && (allowed as readonly string[]).includes(value)) safe[key] = value
  }
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  // Analytics must never interrupt navigation, even if an extension replaces gtag.
  try { w.gtag?.('event', action, safe) } catch { /* navigation remains available */ }
}
