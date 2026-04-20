import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import viteSitemap from './vite-plugin-sitemap'
import viteLlmTxt from './vite-plugin-llmtxt'
import viteSpaPrerender from './vite-plugin-spa-prerender'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: 'static_files', dest: '' }],
    }),
    viteSitemap(),
    viteLlmTxt(),
    viteSpaPrerender(),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
  },
})
