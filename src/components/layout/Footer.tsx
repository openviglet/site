import { Link } from 'react-router-dom'
import { Github, Linkedin } from 'lucide-react'
import { solutions } from '@/data/solutions'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-0 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/8">
          {/* Brand column */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 no-underline">
              <img
                src="/static_files/img/viglet_logo_sm.png"
                alt="Viglet"
                className="w-7 h-7"
              />
              <span className="text-xl font-extrabold text-white tracking-tight">viglet</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-6">
              Open source tools for enterprise intelligence. Built for developers, trusted by enterprises.
            </p>
            <div className="flex gap-2.5">
              <a
                href="https://github.com/openviglet"
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                className="flex items-center justify-content w-9 h-9 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Github size={16} className="mx-auto" />
              </a>
              <a
                href="https://www.linkedin.com/company/viglet.com"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="flex items-center justify-content w-9 h-9 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Linkedin size={16} className="mx-auto" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white mb-4">Products</p>
            <ul className="space-y-2.5">
              {solutions.map((sol) => (
                <li key={sol.identifier}>
                  <Link
                    to={sol.permalink}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors no-underline"
                  >
                    <span className={`w-2 h-2 rounded-sm shrink-0 product-bg-${sol.identifier}`} />
                    {sol.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white mb-4">Resources</p>
            <ul className="space-y-2.5">
              {[
                { label: 'Documentation', href: 'https://docs.viglet.com' },
                { label: 'GitHub', href: 'https://github.com/openviglet' },
                { label: 'Releases', href: 'https://github.com/openviglet' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="text-sm text-slate-400 hover:text-white transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white mb-4">Company</p>
            <ul className="space-y-2.5">
              {[
                { label: 'About', href: 'https://viglet.com' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/viglet.com' },
                { label: 'Facebook', href: 'https://www.facebook.com/viglet' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="text-sm text-slate-400 hover:text-white transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="text-sm text-slate-500">
            © 2017 – {year} Viglet. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Open source under the Apache 2.0 License.
          </p>
        </div>
      </div>
    </footer>
  )
}
