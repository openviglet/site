import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'

/**
 * Build-time prerender entry (Block E / W39). `scripts/prerender-html.mjs`
 * imports the SSR bundle of this file and writes `render(path)` into each
 * route's `dist/<route>/index.html`, so crawlers that do not run JavaScript
 * read the page's `<h1>` and copy. `src/main.tsx` hydrates it in the browser.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}
