'use client'

import { useEffect } from 'react'
import { trackJourneyAction } from '@/lib/analytics'

/** Explicit attributes keep tracking independent of link text, URLs and form data. */
export default function JourneyAnalytics() {
  useEffect(() => {
    const clicked = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || !(event.target instanceof Element)) return
      const link = event.target.closest<HTMLAnchorElement>('a[data-viglet-action]')
      if (!link) return
      trackJourneyAction(link.dataset.vigletAction ?? '', {
        product: link.dataset.vigletProduct,
        journey: link.dataset.vigletJourney,
        placement: link.dataset.vigletPlacement,
      })
    }
    document.addEventListener('click', clicked)
    return () => document.removeEventListener('click', clicked)
  }, [])
  return null
}
