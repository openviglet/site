import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react'
import { solutions } from '@/data/solutions'
import { categories } from '@/data/categories'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center gap-6">
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
            {categories.map((cat) => (
              <Link
                key={cat.identifier}
                to={cat.url}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-brand-bg hover:text-brand transition-colors"
              >
                {cat.menuTitle}
              </Link>
            ))}
          </nav>

          {/* Products dropdown + CTA */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setProductsOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-brand-bg hover:text-brand transition-colors"
              >
                Products
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {productsOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-hover p-2 z-50">
                  {solutions.map((sol) => (
                    <Link
                      key={sol.identifier}
                      to={sol.permalink}
                      onClick={() => setProductsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-content text-white text-sm font-extrabold shrink-0 product-bg-${sol.identifier}`}
                      >
                        <span className="w-full text-center">{sol.logoAcronym}</span>
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-brand transition-colors">
                          {sol.shortName}
                        </p>
                        <p className="text-xs text-slate-500 line-clamp-1">{sol.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

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
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.identifier}
                to={cat.url}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-brand-bg hover:text-brand"
              >
                {cat.menuTitle}
              </Link>
            ))}
            <hr className="border-slate-100 my-2" />
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Products
            </p>
            {solutions.map((sol) => (
              <Link
                key={sol.identifier}
                to={sol.permalink}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-content text-white text-xs font-extrabold shrink-0 product-bg-${sol.identifier}`}
                >
                  <span className="w-full text-center">{sol.logoAcronym}</span>
                </span>
                <span className="text-sm font-medium text-slate-700">{sol.shortName}</span>
              </Link>
            ))}
            <hr className="border-slate-100 my-2" />
            <a
              href="https://docs.viglet.com"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-brand"
            >
              Get Started <ExternalLink size={12} />
            </a>
          </div>
        )}
      </header>
      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
