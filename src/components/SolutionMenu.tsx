import { Link, useLocation } from 'react-router-dom'
import VigletLogo from '@/components/VigletLogo'
import type { Solution } from '@/data/solutions'

function GitHubIcon({ size = 14 }: Readonly<{ size?: number }>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.52 11.52 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

interface SolutionMenuProps {
  readonly solution: Solution
}

export default function SolutionMenu({ solution }: SolutionMenuProps) {
  const { pathname } = useLocation()
  const base = solution.permalink

  const tabs = [
    { label: 'Overview', to: base },
    ...(solution.release
      ? [
          { label: 'Download', to: `${base}download/` },
          { label: 'Release Notes', to: `${base}release-notes/` },
        ]
      : []),
  ]

  return (
    <nav className="sticky top-16 z-40 bg-white/92 backdrop-blur-md border-b border-slate-200 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-4">
        {/* Brand */}
        <Link
          to={base}
          className="flex items-center gap-2 text-slate-900 font-bold text-sm no-underline hover:text-brand transition-colors shrink-0 mr-2"
        >
          <VigletLogo identifier={solution.identifier} size={28} />
          {solution.shortName}
        </Link>

        {/* Tabs */}
        <div className="flex items-center gap-1 flex-1">
          {tabs.map((tab) => {
            const isActive = pathname === tab.to || pathname === tab.to.slice(0, -1)
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors no-underline whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-bg text-brand font-semibold'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>

        {/* GitHub link */}
        {solution.github && (
          <>
            <div className="w-px h-5 bg-slate-200 shrink-0" />
            <a
              href={solution.github}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors no-underline shrink-0"
            >
              <GitHubIcon size={14} />
              GitHub
            </a>
          </>
        )}
      </div>
    </nav>
  )
}
