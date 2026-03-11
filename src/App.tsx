import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import SolutionPage from '@/pages/SolutionPage'
import DownloadPage from '@/pages/DownloadPage'
import ReleaseNotesPage from '@/pages/ReleaseNotesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:identifier/" element={<SolutionPage />} />
        <Route path="/:identifier/download/" element={<DownloadPage />} />
        <Route path="/:identifier/release-notes/" element={<ReleaseNotesPage />} />
        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
