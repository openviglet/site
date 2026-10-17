import type { NextConfig } from 'next'

const projectRoot = import.meta.dirname

/**
 * Two builds of the same pages. By default `next build` is a static export
 * (W17): it writes the whole site to out/ as plain HTML, which GitHub Pages
 * serves. `SITE_OUTPUT=server` (set by the Viglet Cloud image, W18) builds for
 * `next start` instead: the same prerendered pages behind a Node server, which
 * API routes (W19) need. Pages keeps serving until Cloud serves the same content
 * at the same domain; then the export goes.
 */
const serverBuild = process.env.SITE_OUTPUT === 'server'

const nextConfig: NextConfig = {
  ...(serverBuild ? {} : { output: 'export' as const }),
  // `/:identifier/` and every other route keep their trailing slash: it is
  // baked into the sitemap, the canonicals and existing inbound links.
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  // `npm run build` type-checks with the project's own TypeScript (7, the
  // native compiler) before `next build`, which cannot drive it.
  typescript: { ignoreBuildErrors: true },
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
}

export default nextConfig
