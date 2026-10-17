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
  // false on the server and on the first client render, so prerendered HTML
  // hydrates without a mismatch (W39); the effect reads the real viewport.
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    setIsMobileOrTablet(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsMobileOrTablet(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobileOrTablet
}
