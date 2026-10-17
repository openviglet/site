import { solutions } from '@/data/solutions'

/**
 * Problem → product intent table (Block B / W7): the keyword half of matching a
 * free-text problem ("preciso indexar minha intranet e adicionar busca com IA")
 * to the products that solve it, with a reason per match. Client-side, no
 * model: the language-model half waits on the Block G API routes (W19).
 *
 * Terms are written lowercase and without accents (the matcher strips them),
 * in English and Portuguese. A term of one word matches a word that starts with
 * it ("index" → "indexar", "indexing"), except terms of three letters or fewer,
 * which must match a whole word or its plural ("pdf" matches "PDFs", "ai" never
 * matches "aim"). A term with a space
 * matches as a phrase.
 *
 * Grounding rule (ROADMAP § non-goals): every reason restates a capability
 * already in `features.ts` / `modules.ts`. No invented claims.
 */

export interface Intent {
  solution: string
  terms: string[]
  reason: string
}

export const intents: Intent[] = [
  // ── Dumont: get content out of a source ──────────────────────────────────
  { solution: 'dumont', terms: ['aem', 'adobe experience manager'], reason: 'Dumont’s AEM source extracts pages, fragments and assets from Adobe AEM for indexing.' },
  { solution: 'dumont', terms: ['wordpress'], reason: 'Dumont’s WordPress source pushes posts and pages to your search engine.' },
  { solution: 'dumont', terms: ['intranet', 'crawl', 'crawler', 'website', 'web site', 'rastrear'], reason: 'Dumont’s web crawler extracts structured content from public or private websites.' },
  { solution: 'dumont', terms: ['database', 'banco de dados', 'sql', 'jdbc', 'tabela'], reason: 'Dumont’s database source ingests and synchronizes records from SQL databases.' },
  { solution: 'dumont', terms: ['file share', 'filesystem', 'file system', 'arquivos', 'documentos', 'pdf'], reason: 'Dumont’s asset source makes documents and media on file systems searchable.' },
  { solution: 'dumont', terms: ['edge delivery', 'eds', 'franklin', 'helix'], reason: 'Dumont indexes Adobe Edge Delivery Services sites.' },
  { solution: 'dumont', terms: ['index', 'extract', 'extrair', 'ingest', 'ingerir', 'etl', 'connector', 'conector'], reason: 'Dumont connects a source to a search engine, with no custom ETL to write.' },
  { solution: 'dumont', terms: ['solr', 'elasticsearch'], reason: 'Dumont delivers extracted content to Apache Solr or Elasticsearch by changing one property.' },

  // ── Turing: search and answer ────────────────────────────────────────────
  { solution: 'turing', terms: ['search', 'busca', 'buscar', 'pesquisa', 'pesquisar', 'facet', 'faceta', 'filtro'], reason: 'Turing serves faceted, multilingual, typo-tolerant search on Solr, Elasticsearch or Lucene.' },
  { solution: 'turing', terms: ['semantic', 'semantica', 'vector', 'vetor', 'embedding'], reason: 'Turing ranks keyword and vector matches together (hybrid RRF).' },
  { solution: 'turing', terms: ['ai', 'ia', 'inteligencia artificial', 'rag', 'chatbot', 'chat', 'answer', 'resposta', 'perguntas', 'llm', 'gpt', 'openai', 'gemini', 'ollama'], reason: 'Turing answers questions from your content with cited RAG, on the LLM you choose.' },
  { solution: 'turing', terms: ['agent', 'agente', 'mcp'], reason: 'Turing agents call your tools, run skills in a sandbox and federate over MCP.' },
  { solution: 'turing', terms: ['algolia', 'coveo', 'lucidworks'], reason: 'Turing is a self-hosted, Apache 2.0 alternative to hosted search services.' },

  // ── Shio: model and serve content ────────────────────────────────────────
  { solution: 'shio', terms: ['cms', 'headless', 'gerenciar conteudo', 'manage content', 'content model', 'modelar', 'post type'], reason: 'Shio models your own post types, in the console or as code.' },
  { solution: 'shio', terms: ['graphql', 'rest api', 'content api', 'delivery api'], reason: 'Shio delivers content over a versioned REST and GraphQL API.' },
  { solution: 'shio', terms: ['build a site', 'new site', 'criar site', 'criar um site', 'next js', 'nextjs'], reason: 'Shio renders content with Next.js or any framework through its React and JavaScript SDKs.' },
  { solution: 'shio', terms: ['publish', 'publicar', 'preview', 'draft', 'rascunho', 'agendar', 'schedule', 'editor'], reason: 'Shio previews drafts, schedules publishing and edits pages inline.' },
]

export interface ProductMatch {
  solution: string
  /** Distinct reasons, in table order. */
  reasons: string[]
}

function normalize(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

function termMatches(term: string, words: string[], phrase: string): boolean {
  if (term.includes(' ')) return phrase.includes(` ${term} `)
  if (term.length <= 3) return words.some((w) => w === term || w === `${term}s`)
  return words.some((w) => w.startsWith(term))
}

/**
 * Products that fit a problem statement, most reasons first; ties keep the
 * pipeline order (extract → search → serve). `[]` when nothing matches.
 */
export function matchProducts(text: string): ProductMatch[] {
  const words = normalize(text).split(/[^a-z0-9]+/).filter(Boolean)
  if (words.length === 0) return []
  const phrase = ` ${words.join(' ')} `
  const order = ['dumont', 'turing', 'shio']
  const found = new Map<string, string[]>()
  for (const intent of intents) {
    if (!intent.terms.some((t) => termMatches(t, words, phrase))) continue
    const reasons = found.get(intent.solution) ?? []
    if (!reasons.includes(intent.reason)) reasons.push(intent.reason)
    found.set(intent.solution, reasons)
  }
  return [...found.entries()]
    .filter(([id]) => solutions.some((s) => s.identifier === id))
    .map(([solution, reasons]) => ({ solution, reasons }))
    .sort((a, b) => b.reasons.length - a.reasons.length || order.indexOf(a.solution) - order.indexOf(b.solution))
}
