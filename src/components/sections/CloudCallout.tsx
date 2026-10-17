import Link from 'next/link'
import { IconBrandDocker, IconCloud, IconExternalLink } from '@tabler/icons-react'
import { cloud } from '@/data/cloud'

/**
 * Home "Viglet Cloud (beta)" band (Block I / W30): frames the two ways to run
 * the suite, self-hosted with Docker or hosted on Viglet Cloud. A band, not a
 * product card, marked Beta, with no stability or SLA language. Copy comes
 * from `src/data/cloud.ts`.
 */
export default function CloudCallout() {
  return (
    <section className="py-12 px-6 bg-muted border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-brand text-white shadow-md">
          <IconCloud size={24} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="flex flex-wrap items-center gap-2 font-bold text-foreground text-lg mb-1">
            Self-host it, or let Viglet host it
            {cloud.beta && (
              <span className="rounded border border-border px-1.5 py-px text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Beta
              </span>
            )}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every product runs from one Docker image on your own servers. Or let Viglet run them for you on {cloud.name}, which is in beta, so features may change.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href={cloud.signUpUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white text-sm font-bold no-underline hover:opacity-90 transition-opacity"
          >
            Try the beta
            <IconExternalLink size={14} />
          </a>
          <Link
            href="/turing/download/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-foreground text-sm font-bold no-underline hover:bg-muted transition-colors"
          >
            <IconBrandDocker size={16} />
            Run with Docker
          </Link>
        </div>
      </div>
    </section>
  )
}
