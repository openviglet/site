import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconMenu2, IconX, IconExternalLink } from '@tabler/icons-react'
import { solutions } from '@/data/solutions'
import { Button } from '@/components/ui/button'
import VigletLogo from '@/components/VigletLogo'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/static_files/img/viglet_logo_sm.png"
              alt="Viglet"
              className="w-7 h-7"
            />
            <span className="text-lg font-extrabold text-slate-900 tracking-tight">
              viglet
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {solutions.map((sol) => (
              <Link
                key={sol.identifier}
                to={sol.permalink}
                className="group flex items-center gap-2 px-3.5 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <span className="relative flex w-2 h-2 shrink-0">
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-0 group-hover:opacity-75 group-hover:animate-ping product-bg-${sol.identifier}`} />
                  <span className={`relative inline-flex w-2 h-2 rounded-full product-bg-${sol.identifier}`} />
                </span>
                {sol.shortName}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <Button asChild size="sm">
              <a href="https://docs.viglet.com" target="_blank" rel="noopener">
                Get Started
              </a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden ml-auto p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>

        {/* Mobile nav — inside header but below the 16h bar */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-1 shadow-lg">
            {solutions.map((sol) => (
              <Link
                key={sol.identifier}
                to={sol.permalink}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 no-underline"
              >
                <VigletLogo identifier={sol.identifier} size={28} />
                <span className="text-sm font-medium text-slate-700">{sol.shortName}</span>
              </Link>
            ))}
            <hr className="border-slate-100 my-2" />
            <a
              href="https://docs.viglet.com"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-brand no-underline"
            >
              Get Started <IconExternalLink size={12} />
            </a>
          </div>
        )}
      </header>
      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
