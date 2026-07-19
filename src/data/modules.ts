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
  { title: 'AEM Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont-ce', description: 'Unlock your AEM content. Seamlessly extract pages, fragments, and assets for superior search experiences.' },
  { title: 'Asset Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont-ce', description: 'Unify your digital files. Transform static documents and media from file systems into searchable insights.' },
  { title: 'Database Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont-ce', description: 'Bridge structured data. Easily ingest and synchronize records from SQL.' },
  { title: 'Web Crawler Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont-ce', description: 'Harvest the web. Intelligently crawl, extract, and structure content from any public or private website, with robots.txt/sitemap discovery and conditional re-crawl.' },
  { title: 'Adobe EDS Source', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont-ce', description: 'Index Adobe Edge Delivery Services (Franklin/Helix) sites — sitemap discovery, sheet parsing, path filters and facet enrichment.' },
  { title: 'WordPress Source', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont-ce', description: 'Sync your CMS. Automatically push posts and pages from WordPress to your enterprise search engine.' },
  // Dumont targets
  { title: 'Elastic Search Target', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont-ce', description: 'Power up Elasticsearch. Push data instantly to build fast, scalable, and relevant search applications.' },
  { title: 'Solr Target', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont-ce', description: 'Feed the open-source standard. Ensure robust and reliable data ingestion into Apache Solr.' },
  { title: 'Turing ES Target', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont-ce', description: 'Fuel Cognitive Search. Feed semantic data into Turing ES for AI-driven answers and personalization.' },
  // Shio modules
  { title: 'React SDK', solution: 'shio', githubUrl: 'https://www.npmjs.com/package/@viglet/shio-react-sdk', description: 'Consume the Content Delivery API from React with hooks — useShioPost, useShioChildren, useShioQuery, useShioSites — and a ShioProvider.' },
  { title: 'JavaScript SDK', solution: 'shio', githubUrl: 'https://www.npmjs.com/package/@viglet/shio-editor-cors', description: 'Framework-agnostic client with the Adobe Universal Editor bridge, enabling inline visual editing on any externally-rendered page.' },
  { title: 'Shio CLI', solution: 'shio', githubUrl: 'https://www.npmjs.com/package/@viglet/shio', description: 'Scaffold an app (create-shio-app) and manage your content model as code — push and pull post types with drift detection.' },
  { title: 'Next.js', solution: 'shio', githubUrl: 'https://docs.viglet.org/shio/', description: 'Render Shio content with Next.js (App Router) using the delivery API and the React SDK — slug routing via post-by-URL.' },
  { title: 'Turing ES', solution: 'shio', githubUrl: 'https://www.viglet.org/turing/', description: 'Shio CMS integrates with Turing ES — map which attributes get indexed during Post Type modeling for enterprise search and AI.' },
  { title: 'Webhooks', solution: 'shio', description: 'Outbound webhooks notify your application when content is published or unpublished, so you can revalidate caches or rebuild pages.' },
  // Turing modules
  { title: 'Dumont DEP', solution: 'turing', githubUrl: 'https://www.viglet.org/dumont/', description: 'Feed Turing with content from Adobe AEM, WordPress, databases, files and the web — connectors are provided by the Dumont Data Extraction Platform.' },
  { title: 'React SDK', solution: 'turing', githubUrl: 'https://www.npmjs.com/package/@viglet/turing-react-sdk', description: 'React 19 headless hooks and UI components for search, chat and autocomplete, with full TypeScript support.' },
  { title: 'JavaScript SDK', solution: 'turing', githubUrl: 'https://www.npmjs.com/package/@viglet/turing-sdk', description: 'Framework-agnostic, zero-dependency vanilla-JS client — works in Adobe EDS blocks, a plain <script>, or any bundler.' },
  { title: 'Turing CLI', solution: 'turing', githubUrl: 'https://www.npmjs.com/package/@viglet/turing-cli', description: 'Zero-dependency developer CLI: scaffold a project, run a local stack, deploy agents/flows/tools/skills, and run YAML eval suites.' },
  { title: 'Java SDK', solution: 'turing', githubUrl: 'https://github.com/openviglet/turing-ce', description: 'Java library to index and query Turing ES from JVM applications.' },
  { title: 'MCP Server & Client', solution: 'turing', githubUrl: 'https://docs.viglet.org/turing/', description: 'Expose Turing search as an MCP server for any MCP-aware client, and connect agents out to federated MCP servers.' },
  { title: 'Shio CMS', solution: 'turing', githubUrl: 'https://www.viglet.org/shio/', description: 'Shio CMS integrates with Turing ES — map which attributes get indexed during Post Type modeling.' },
]

export function getModulesBySolution(identifier: string): Module[] {
  return modules.filter((m) => m.solution === identifier)
}

export function getDownloadModulesBySolution(identifier: string): Module[] {
  return modules.filter((m) => m.solution === identifier && m.download === true)
}
