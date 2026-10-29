// Render the blog's Mermaid sources (content/blog/diagrams/*.mmd) to SVG in
// public/blog/diagrams/, which the posts reference as plain images.
//
// On demand, not part of `prebuild`: mermaid-cli drives a headless Chromium,
// too heavy for every build. The SVGs are committed; run this after editing a
// .mmd file (`node scripts/render-blog-diagrams.mjs`). Same convention as
// docs.viglet.org, where the posts came from: pre-rendered diagrams look the
// same on screen and on paper, with no client-side Mermaid bundle.

import { readdirSync, mkdirSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { resolve } from 'node:path'

const SRC = resolve(process.cwd(), 'content/blog/diagrams')
const OUT = resolve(process.cwd(), 'public/blog/diagrams')
mkdirSync(OUT, { recursive: true })

for (const file of readdirSync(SRC).filter((f) => f.endsWith('.mmd'))) {
  const output = resolve(OUT, file.replace(/\.mmd$/, '.svg'))
  execSync(`npx -y @mermaid-js/mermaid-cli@12 --size 900 -b transparent -i "${resolve(SRC, file)}" -o "${output}"`, {
    stdio: 'inherit',
  })
}
