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
  { title: 'Web Crawler Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont-ce', description: 'Harvest the web. Intelligently crawl, extract, and structure content from any public or private website.' },
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
  { title: 'Apache Solr', solution: 'turing', download: false, description: 'Use Apache Solr as Search Engine.' },
  { title: 'Java SDK', solution: 'turing', download: false, githubUrl: 'https://github.com/openviglet/turing-ce', downloadUrl: 'https://github.com/openviglet/turing-ce/releases/download/v0.3.9/turing-java-sdk.jar', description: 'Java Library to access Turing ES.' },
  { title: 'Shio CMS', solution: 'turing', download: false, githubUrl: 'https://viglet.org/shio', description: 'Shio CMS is integrated with Turing ES, allowing you to map the attributes that will be indexed in Turing during Post Type modeling.' },
  { title: 'Utils', solution: 'turing', download: true, githubUrl: 'https://github.com/openviglet/turing-ce', downloadUrl: 'https://github.com/openviglet/turing-ce/releases/download/v0.3.9/turing-utils.zip', description: 'Sample Configurations and Scripts.' },
]

export function getModulesBySolution(identifier: string): Module[] {
  return modules.filter((m) => m.solution === identifier)
}

export function getDownloadModulesBySolution(identifier: string): Module[] {
  return modules.filter((m) => m.solution === identifier && m.download === true)
}
