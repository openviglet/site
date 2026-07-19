import { useRef, useState } from 'react'
import { IconMail, IconCheck, IconLoader2, IconAlertTriangle } from '@tabler/icons-react'

/**
 * Release-alert + newsletter opt-in (Block D / W10 + W11).
 *
 * The site is a static SPA with no backend (backend is gated on Block G), so
 * this submits to a third-party form service. The endpoint is read from
 * `VITE_NEWSLETTER_ENDPOINT` at build time; when it is not configured the whole
 * component renders nothing — no half-built form ships. Works with any service
 * that accepts a JSON POST (Formspree, Buttondown, Web3Forms, …).
 *
 * LGPD / privacy-first: explicit, UNCHECKED consent checkbox (submit disabled
 * until it's ticked and the email is valid), a clear purpose + unsubscribe note,
 * and no pre-selection. Never a dead spinner — the request has a timeout and
 * always resolves to a success or error state.
 */

const ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function NewsletterSignup() {
  // Not configured → render nothing (graceful, no dead form on the live site).
  if (!ENDPOINT) return null
  return (
    <div className="pb-10 mb-10 border-b border-white/8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="font-bold text-white text-lg">Stay in the loop</p>
          <p className="text-sm text-slate-400 mt-1 max-w-sm">
            Get notified about new Viglet releases and guides. Low volume, unsubscribe anytime.
          </p>
        </div>
        <div className="w-full md:max-w-md">
          <NewsletterForm endpoint={ENDPOINT} />
        </div>
      </div>
    </div>
  )
}

function NewsletterForm({ endpoint }: Readonly<{ endpoint: string }>) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const abortRef = useRef<AbortController | null>(null)

  const valid = EMAIL_RE.test(email) && consent

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || status === 'submitting') return
    setStatus('submitting')

    const controller = new AbortController()
    abortRef.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 15000)

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, consent: true, source: 'viglet.org', tags: ['release', 'newsletter'] }),
        signal: controller.signal,
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
      abortRef.current = null
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 text-sm text-slate-300">
        <span className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
          <IconCheck size={18} className="text-emerald-400" />
        </span>
        <p>Thanks! Please check your inbox to confirm your subscription.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1 min-w-0">
          <IconMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
            placeholder="you@company.com"
            aria-label="Email address"
            className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-sm pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand/60"
          />
        </div>
        <button
          type="submit"
          disabled={!valid || status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand text-white text-sm font-bold hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {status === 'submitting' ? <IconLoader2 size={16} className="animate-spin" /> : null}
          Notify me
        </button>
      </div>

      <label className="flex items-start gap-2.5 mt-3 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-brand shrink-0"
        />
        <span className="text-xs text-slate-400 leading-relaxed">
          I agree to receive occasional emails about Viglet releases and guides. Unsubscribe anytime — no spam.
        </span>
      </label>

      {status === 'error' && (
        <p className="flex items-center gap-1.5 text-xs text-amber-400 mt-2" aria-live="polite">
          <IconAlertTriangle size={14} />
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
