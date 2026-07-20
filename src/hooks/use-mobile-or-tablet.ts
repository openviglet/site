import { useState, useEffect } from 'react'

/**
 * Returns `true` when the viewport is phone- or tablet-sized (below the Tailwind
 * `lg` / 1024px desktop breakpoint).
 *
 * Used to freeze the animated hero backdrop on mobile/tablet, where the
 * continuous CSS animations cause visible flickering.
 */
export function useIsMobileOrTablet(): boolean {
  const query = '(max-width: 1023px)'
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(query)
    setIsMobileOrTablet(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsMobileOrTablet(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobileOrTablet
}
