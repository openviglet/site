import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import viteSitemap from './vite-plugin-sitemap'
import viteLlmTxt from './vite-plugin-llmtxt'
import viteSpaPrerender from './vite-plugin-spa-prerender'

export default defineConfig(({ command, isSsrBuild }) => ({
  plugins: [
    react(),
    tailwindcss(),
    // The SSR build (W39: `src/entry-server.tsx` → dist-ssr/) only feeds
    // scripts/prerender-html.mjs; the site's own outputs come from the client
    // build, so the copy and SEO plugins run there alone. Not in `vite` (dev)
    // either: their closeBundle would rewrite dist/ when the dev server stops.
    ...(command !== 'build' || isSsrBuild
      ? []
      : [
          viteStaticCopy({
            targets: [{ src: 'static_files', dest: '' }],
          }),
          viteSitemap(),
          viteLlmTxt(),
          viteSpaPrerender(),
        ]),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  publicDir: 'public',
  build: {
    outDir: isSsrBuild ? 'dist-ssr' : 'dist',
  },
}))
