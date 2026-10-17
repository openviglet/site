import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import SolutionPage from '@/pages/SolutionPage'
import DownloadPage from '@/pages/DownloadPage'
import ReleaseNotesPage from '@/pages/ReleaseNotesPage'
import PartnerPage from '@/pages/PartnerPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import ComparePage from '@/pages/ComparePage'
import ProductComparePage from '@/pages/ProductComparePage'
import ConsentBanner from '@/components/ConsentBanner'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/**
 * The routes, without a router: the browser wraps them in `BrowserRouter`
 * (below) and the build-time prerender (W39, `src/entry-server.tsx`) in a
 * `StaticRouter`, so both render the same tree.
 */
export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <ConsentBanner />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:identifier/" element={<SolutionPage />} />
        <Route path="/:identifier/download/" element={<DownloadPage />} />
        <Route path="/:identifier/release-notes/" element={<ReleaseNotesPage />} />
        <Route path="/partner/" element={<PartnerPage />} />
        <Route path="/about/" element={<AboutPage />} />
        <Route path="/contact/" element={<ContactPage />} />
        <Route path="/compare/" element={<ProductComparePage />} />
        <Route path="/compare/:slug/" element={<ComparePage />} />
        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
