import { Link } from 'react-router-dom'
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'

import { solutions } from '@/data/solutions'

function RedditIcon({ size = 16, className = '' }: Readonly<{ size?: number; className?: string }>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  )
}

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
                <IconBrandGithub size={16} className="mx-auto" />
              </a>
              <a
                href="https://www.reddit.com/r/TuringES/"
                target="_blank"
                rel="noopener"
                aria-label="Reddit"
                className="flex items-center justify-content w-9 h-9 rounded-lg bg-slate-800 text-slate-400 hover:bg-[#FF4500] hover:text-white transition-colors"
              >
                <RedditIcon size={16} className="mx-auto" />
              </a>
              <a
                href="https://www.linkedin.com/company/viglet.com"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="flex items-center justify-content w-9 h-9 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <IconBrandLinkedin size={16} className="mx-auto" />
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
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors no-underline"
                  >
                    <span className="relative flex w-2 h-2 shrink-0">
                      <span className={`absolute inline-flex h-full w-full rounded-full opacity-0 group-hover:opacity-75 group-hover:animate-ping product-bg-${sol.identifier}`} />
                      <span className={`relative inline-flex w-2 h-2 rounded-full product-bg-${sol.identifier}`} />
                    </span>
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
                { label: 'Documentation', href: 'https://docs.viglet.org' },
                { label: 'GitHub', href: 'https://github.com/openviglet' },
                { label: 'Reddit', href: 'https://www.reddit.com/r/TuringES/' },
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
              <li>
                <Link
                  to="/about/"
                  className="text-sm text-slate-400 hover:text-white transition-colors no-underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/partner/"
                  className="text-sm text-slate-400 hover:text-white transition-colors no-underline"
                >
                  Become a Partner
                </Link>
              </li>
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/viglet.com' },
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
