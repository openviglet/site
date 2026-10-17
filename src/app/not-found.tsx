import HomePage from '@/views/HomePage'

/**
 * An unknown path (or an unknown product or comparison slug) shows the home
 * page, as the SPA's catch-all route did. The static export writes it to
 * out/404.html, which GitHub Pages serves with a 404 status.
 */
export default function NotFound() {
  return <HomePage />
}
