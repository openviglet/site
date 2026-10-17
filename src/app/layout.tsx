import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import ConsentBanner from '@/components/ConsentBanner'
import { SITE_ORIGIN } from '@/lib/seo'
import '@/index.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  icons: {
    icon: [
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/favicons/site.webmanifest',
  other: { 'msapplication-config': '/favicons/browserconfig.xml' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C2410C',
}

/** Applies the stored colour mode before first paint, so a dark-mode visitor
 *  never sees a light flash (see src/hooks/use-color-mode.ts). */
const themeScript = `(function() {
  var t = localStorage.getItem('theme') || 'system';
  if (t === 'system') t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
})();`

/**
 * Analytics (Google Analytics) is consent-gated (LGPD/privacy-first) and loaded
 * at runtime only after the visitor opts in (see ConsentBanner and
 * src/lib/analytics.ts). Nothing tracks before consent.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // data-theme is set by themeScript before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ConsentBanner />
        {children}
      </body>
    </html>
  )
}
