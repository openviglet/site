import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import SolutionPage from '@/pages/SolutionPage'
import DownloadPage from '@/pages/DownloadPage'
import ReleaseNotesPage from '@/pages/ReleaseNotesPage'
import PartnerPage from '@/pages/PartnerPage'
import AboutPage from '@/pages/AboutPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:identifier/" element={<SolutionPage />} />
        <Route path="/:identifier/download/" element={<DownloadPage />} />
        <Route path="/:identifier/release-notes/" element={<ReleaseNotesPage />} />
        <Route path="/partner/" element={<PartnerPage />} />
        <Route path="/about/" element={<AboutPage />} />
        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
