export interface Module {
  title: string
  solution: string
  description: string
  githubUrl?: string
  downloadUrl?: string
  download?: boolean
}

export const modules: Module[] = [
  // Dumont sources
  { title: 'AEM Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont', description: 'Extracts pages, fragments and assets from Adobe AEM for search indexing.' },
  { title: 'Asset Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont', description: 'Makes documents and media files on file systems searchable.' },
  { title: 'Database Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont', description: 'Ingests and synchronizes records from SQL databases.' },
  { title: 'Web Crawler Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont', description: 'Crawls public or private websites and extracts structured content, with robots.txt/sitemap discovery and conditional re-crawl.' },
  { title: 'Adobe EDS Source', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont', description: 'Index Adobe Edge Delivery Services (Franklin/Helix) sites, with sitemap discovery, sheet parsing, path filters and facet enrichment.' },
  { title: 'WordPress Source', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont', description: 'Pushes WordPress posts and pages to your search engine automatically.' },
  // Dumont targets
  { title: 'Elastic Search Target', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont', description: 'Pushes extracted content to Elasticsearch.' },
  { title: 'Solr Target', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont', description: 'Pushes extracted content to Apache Solr.' },
  { title: 'Turing Target', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont', description: 'Pushes extracted content to Viglet Turing for semantic search and AI answers.' },
  // Shio modules
  { title: 'React SDK', solution: 'shio', githubUrl: 'https://www.npmjs.com/package/@viglet/shio-react-sdk', description: 'Use the Content Delivery API from React with hooks (useShioPost, useShioChildren, useShioQuery, useShioSites) and a ShioProvider.' },
  { title: 'JavaScript SDK', solution: 'shio', githubUrl: 'https://www.npmjs.com/package/@viglet/shio-editor-cors', description: 'Framework-agnostic client with the Adobe Universal Editor bridge, for inline visual editing on any externally rendered page.' },
  { title: 'Shio CLI', solution: 'shio', githubUrl: 'https://www.npmjs.com/package/@viglet/shio', description: 'Scaffold an app (create-shio-app) and manage your content model as code: push and pull post types with drift detection.' },
  { title: 'Next.js', solution: 'shio', githubUrl: 'https://openviglet.github.io/shio/docs/headless/nextjs-starter/', description: 'Render content with Next.js (App Router) using the delivery API and the React SDK, with slug routing through post-by-URL.' },
  { title: 'Turing', solution: 'shio', githubUrl: 'https://www.viglet.org/turing/', description: 'Viglet Shio integrates with Viglet Turing: choose which attributes get indexed while modeling post types, for enterprise search and AI.' },
  { title: 'Webhooks', solution: 'shio', description: 'Outbound webhooks notify your application when content is published or unpublished, so you can revalidate caches or rebuild pages.' },
  // Turing modules
  { title: 'Dumont', solution: 'turing', githubUrl: 'https://www.viglet.org/dumont/', description: 'Viglet Dumont, the data exchange platform, feeds Viglet Turing with content from Adobe AEM, WordPress, databases, files and the web.' },
  { title: 'React SDK', solution: 'turing', githubUrl: 'https://www.npmjs.com/package/@viglet/turing-react-sdk', description: 'React 19 headless hooks and UI components for search, chat and autocomplete, with full TypeScript support.' },
  { title: 'JavaScript SDK', solution: 'turing', githubUrl: 'https://www.npmjs.com/package/@viglet/turing-sdk', description: 'Framework-agnostic, zero-dependency vanilla-JS client. Works in Adobe EDS blocks, a plain <script>, or any bundler.' },
  { title: 'Turing CLI', solution: 'turing', githubUrl: 'https://www.npmjs.com/package/@viglet/turing-cli', description: 'Zero-dependency developer CLI: scaffold a project, run a local stack, deploy agents/flows/tools/skills, and run YAML eval suites.' },
  { title: 'Java SDK', solution: 'turing', githubUrl: 'https://github.com/openviglet/turing', description: 'Java library to index and query Turing from JVM applications.' },
  { title: 'MCP Server & Client', solution: 'turing', githubUrl: 'https://openviglet.github.io/turing/docs/mcp-servers/', description: 'Expose Turing search as an MCP server for any MCP-aware client, and connect agents out to federated MCP servers.' },
  { title: 'Model Catalog', solution: 'turing', githubUrl: 'https://github.com/openviglet/model-catalog', description: 'Vendor-neutral public catalog of LLM, embedding, rerank and media models: context windows, capabilities, indicative pricing and deprecations. Turing reads it to enrich the model picker and warn on retired models.' },
  { title: 'Shio', solution: 'turing', githubUrl: 'https://www.viglet.org/shio/', description: 'Viglet Shio integrates with Turing: choose which attributes get indexed while modeling post types.' },
]

export function getModulesBySolution(identifier: string): Module[] {
  return modules.filter((m) => m.solution === identifier)
}

export function getDownloadModulesBySolution(identifier: string): Module[] {
  return modules.filter((m) => m.solution === identifier && m.download === true)
}
