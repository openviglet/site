import type { Plugin } from 'vite'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

interface ProductInfo {
  identifier: string
  fullName: string
  shortName: string
  description: string
  release: string
  logoSection: string
}

function extractProducts(solutionsPath: string): ProductInfo[] {
  const src = readFileSync(solutionsPath, 'utf-8')
  const blocks = src.split(/\{/).slice(1)
  const products: ProductInfo[] = []

  for (const block of blocks) {
    const get = (key: string) => {
      const m = block.match(new RegExp(`${key}:\\s*['"]([^'"]+)['"]`))
      return m ? m[1] : ''
    }
    const id = get('identifier')
    if (!id) continue
    products.push({
      identifier: id,
      fullName: get('fullName'),
      shortName: get('shortName'),
      description: get('description'),
      release: get('release'),
      logoSection: get('logoSection'),
    })
  }
  return products
}

function buildLlmTxt(products: ProductInfo[]): string {
  const productSections = products
    .map(
      (p) => `## ${p.fullName}

> ${p.description}

- Version: ${p.release}
- Product page: https://www.viglet.org/${p.identifier}/
- Download: https://www.viglet.org/${p.identifier}/download/
- Release notes: https://www.viglet.org/${p.identifier}/release-notes/
- Documentation: https://docs.viglet.org/${p.identifier}/
- GitHub: https://github.com/openviglet/${p.identifier}`,
    )
    .join('\n\n')

  return `# Viglet

> Open source platform for enterprise intelligence — data extraction, content management, and semantic search.

Viglet provides three complementary tools that work independently or together. Built for developers, trusted by enterprises. 100% open source under the Apache 2.0 license.

- Website: https://www.viglet.org
- Documentation: https://docs.viglet.org
- GitHub: https://github.com/openviglet
- License: Apache 2.0

## Products

${productSections}

## Viglet Dumont DEP — Details

The Data Extraction Platform models data extraction flows as flights. It connects multiple sources to multiple targets through a unified pipeline.

Sources: AEM, file systems (Asset Source), SQL databases, web crawlers, WordPress.
Targets: Elasticsearch, Apache Solr, Turing ES.

Stack: Java 21 + Spring Boot. Port: 30130.

## Viglet Shio CMS — Details

Headless content management system with GraphQL APIs, native caching, and built-in search indexing. Create flexible post types and build sites with JavaScript.

Modules: NodeJS site generation, OpenText integrations (OTCS, OTDS, OTMM, WEM), Turing ES search integration.

Stack: Java 21 + Spring Boot. Port: 2710.

## Viglet Turing ES — Details

Enterprise search with semantic navigation, faceted search, chatbot interface, and generative AI. Supports multiple LLMs (ChatGPT, Ollama) with RAG pipelines and an embedding store.

Modules: Apache Solr integration, Java SDK, Shio CMS integration.

Stack: Java 21 + Spring Boot + Apache Solr. Port: 2700.

## Technology

- Backend: Java 21 + Spring Boot
- Search: Apache Solr / Elasticsearch
- Content API: GraphQL (Shio CMS)
- Frontend: React + Vite
- Deployment: Docker, Docker Compose, Kubernetes
- CI/CD: GitHub Actions

## History

- 2017: Viglet founded
- 2018: Turing ES first public release
- 2020: Shio CMS launched
- 2023: Dumont DEP ships
- 2025: Turing ES adds generative AI, RAG, and conversational search

## Partner Program

Three partner tiers: Technology Partner (ISVs integrating with Viglet), Solution Partner (consultancies implementing Viglet), and Community Partner (contributors and advocates).

- Partner page: https://www.viglet.org/partner/

## Community

- GitHub: https://github.com/openviglet
- Reddit: https://www.reddit.com/r/TuringES/
- LinkedIn: https://www.linkedin.com/company/viglet.com

## About

- About page: https://www.viglet.org/about/
`
}

export default function viteLlmTxt(): Plugin {
  return {
    name: 'vite-plugin-llmtxt',
    closeBundle() {
      const solutionsPath = resolve(__dirname, 'src/data/solutions.ts')
      const products = extractProducts(solutionsPath)
      const llmTxt = buildLlmTxt(products)
      writeFileSync(resolve(__dirname, 'dist/llms.txt'), llmTxt, 'utf-8')
      console.log(`✓ llms.txt generated with ${products.length} products`)
    },
  }
}
