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
  { title: 'AEM Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont', description: 'Unlock your AEM content. Seamlessly extract pages, fragments, and assets for superior search experiences.' },
  { title: 'Asset Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont', description: 'Unify your digital files. Transform static documents and media from file systems into searchable insights.' },
  { title: 'Database Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont', description: 'Bridge structured data. Easily ingest and synchronize records from SQL.' },
  { title: 'Web Crawler Source', solution: 'dumont', download: true, githubUrl: 'https://github.com/openviglet/dumont', description: 'Harvest the web. Intelligently crawl, extract, and structure content from any public or private website.' },
  { title: 'WordPress Source', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont', description: 'Sync your CMS. Automatically push posts and pages from WordPress to your enterprise search engine.' },
  // Dumont targets
  { title: 'Elastic Search Target', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont', description: 'Power up Elasticsearch. Push data instantly to build fast, scalable, and relevant search applications.' },
  { title: 'Solr Target', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont', description: 'Feed the open-source standard. Ensure robust and reliable data ingestion into Apache Solr.' },
  { title: 'Turing ES Target', solution: 'dumont', githubUrl: 'https://github.com/openviglet/dumont', description: 'Fuel Cognitive Search. Feed semantic data into Turing ES for AI-driven answers and personalization.' },
  // Shio modules
  { title: 'NodeJS', solution: 'shio', description: 'Convert Shio CMS Site to NodeJS application.' },
  { title: 'OTCS', solution: 'shio', description: 'Integrate OpenText Content Server into Shio CMS and import documents.' },
  { title: 'OTDS', solution: 'shio', description: 'Authenticate via OpenText Directory Services (OTDS).' },
  { title: 'OTMM', solution: 'shio', description: 'Integrate OpenText Media Management into Shio CMS and import assets.' },
  { title: 'Turing ES', solution: 'shio', githubUrl: 'https://viglet.org/turing', description: 'Shio CMS is integrated with Turing ES, allowing you to map the attributes that will be indexed in Turing during Post Type modeling.' },
  { title: 'WEM', solution: 'shio', description: 'Convert OpenText Web Experience Management (WEM) import package to Shio CMS import package.' },
  // Turing modules
  { title: 'Apache Solr', solution: 'turing', download: false, description: 'Use Apache Solr as Search Engine.' },
  { title: 'Java SDK', solution: 'turing', download: false, githubUrl: 'https://github.com/openviglet/turing', downloadUrl: 'https://github.com/openviglet/turing/releases/download/v0.3.9/turing-java-sdk.jar', description: 'Java Library to access Turing ES.' },
  { title: 'Shio CMS', solution: 'turing', download: false, githubUrl: 'https://viglet.org/shio', description: 'Shio CMS is integrated with Turing ES, allowing you to map the attributes that will be indexed in Turing during Post Type modeling.' },
  { title: 'Utils', solution: 'turing', download: true, githubUrl: 'https://github.com/openviglet/turing', downloadUrl: 'https://github.com/openviglet/turing/releases/download/v0.3.9/turing-utils.zip', description: 'Sample Configurations and Scripts.' },
]

export function getModulesBySolution(identifier: string): Module[] {
  return modules.filter((m) => m.solution === identifier)
}

export function getDownloadModulesBySolution(identifier: string): Module[] {
  return modules.filter((m) => m.solution === identifier && m.download === true)
}
