import { useEffect, useState } from 'react'
import { IconX } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  getConsent,
  setConsent,
  initAnalyticsFromConsent,
  OPEN_CONSENT_EVENT,
} from '@/lib/analytics'

/**
 * Privacy-first consent banner (Block D / W12). No analytics run until the
 * visitor accepts — on mount we only load GA if consent was *already* granted;
 * otherwise the banner is shown and nothing is loaded. Accept and Decline are
 * equally prominent (LGPD: refusal must be as easy as acceptance). The choice
 * persists in localStorage; a "Cookie settings" footer link can reopen this.
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Honour a prior choice (loads GA only if previously granted).
    initAnalyticsFromConsent()
    if (getConsent() === null) setVisible(true)

    const reopen = () => setVisible(true)
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  if (!visible) return null

  const choose = (consent: 'granted' | 'denied') => {
    setConsent(consent)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl shadow-hover p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground mb-1">We respect your privacy</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use Google Analytics cookies only to understand how the site is used — never
              for ads. Nothing is loaded until you choose. You can change this anytime from the
              footer.
            </p>
          </div>
          <button
            type="button"
            onClick={() => choose('denied')}
            aria-label="Decline and close"
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <IconX size={18} />
          </button>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 justify-end">
          <Button variant="ghost" onClick={() => choose('denied')}>
            Decline
          </Button>
          <Button onClick={() => choose('granted')}>
            Accept analytics
          </Button>
        </div>
      </div>
    </div>
  )
}
