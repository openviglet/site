// Real prerender (Block E / W39).
//
// vite-plugin-spa-prerender writes one index.html per route with that route's
// <head> (title, description, canonical, OG), but the body is the empty app
// root, which crawlers that do not run JavaScript read as nothing. This runs
// after both builds (see package.json): it imports the SSR bundle of
// src/entry-server.tsx from dist-ssr/ and writes each route's rendered HTML
// into its <div id="root">, which src/main.tsx then hydrates.
//
// Unlike og-images.mjs this is not optional: a route that fails to render
// fails the build, since shipping it empty is the regression this exists to
// prevent.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, rmSync } from 'node:fs'
import { resolve, relative, sep } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const DIST = resolve(ROOT, 'dist')
const SSR_ENTRY = resolve(ROOT, 'dist-ssr', 'entry-server.js')
const EMPTY_ROOT = '<div id="root"></div>'

if (!existsSync(SSR_ENTRY)) {
  console.error(`prerender-html: ${relative(ROOT, SSR_ENTRY)} not found. Run the SSR build first.`)
  process.exit(1)
}

const { render } = await import(pathToFileURL(SSR_ENTRY).href)

/** Every index.html under dist/, as [file, route] with the route's trailing slash. */
function routeFiles(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = resolve(dir, name)
    if (statSync(full).isDirectory()) out.push(...routeFiles(full))
    else if (name === 'index.html') {
      const rel = relative(DIST, dir).split(sep).filter(Boolean).join('/')
      out.push([full, rel ? `/${rel}/` : '/'])
    }
  }
  return out
}

let count = 0
const withoutH1 = []
for (const [file, route] of routeFiles(DIST)) {
  const html = readFileSync(file, 'utf-8')
  if (!html.includes(EMPTY_ROOT)) continue
  let body
  try {
    body = render(route)
  } catch (err) {
    console.error(`prerender-html: rendering ${route} failed`)
    throw err
  }
  if (!/<h1[\s>]/.test(body)) withoutH1.push(route)
  writeFileSync(file, html.replace(EMPTY_ROOT, `<div id="root">${body}</div>`), 'utf-8')
  count++
}

// The SSR bundle is a build intermediate, not part of the site.
rmSync(resolve(ROOT, 'dist-ssr'), { recursive: true, force: true })

console.log(`✓ prerender-html: rendered ${count} route(s) into dist/`)
if (withoutH1.length) console.warn(`prerender-html: no <h1> in ${withoutH1.join(', ')}`)
