import type { NextConfig } from 'next'

const projectRoot = import.meta.dirname

/**
 * Static export (W17): `next build` writes the whole site to out/ as plain
 * HTML, which GitHub Pages serves exactly as it served the Vite build. Block G's
 * next step (W18) runs it as a server on Viglet Cloud, which is the point where
 * `output: 'export'` goes and API routes (W19) become possible.
 */
const nextConfig: NextConfig = {
  output: 'export',
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
