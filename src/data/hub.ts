export const hubMessage = {
  title: 'Open-source search, AI answers and content tools you can self-host.',
  description: 'Start with Viglet Turing for search and cited answers. Connect existing sources with Dumont, or manage content with people and AI agents in Shio.',
}

export interface ProductPath {
  product: 'turing' | 'dumont' | 'shio'
  job: string
  description: string
  action: string
  href: string
}

export const productPaths: ProductPath[] = [
  { product: 'turing', job: 'Search your content. Answer with sources.', description: 'Add faceted search, cited RAG answers and AI agents to your site or application, with your choice of search engine and model.', action: 'Try Turing live', href: 'https://turing.viglet.org/#playground' },
  { product: 'dumont', job: 'Keep your search index connected.', description: 'Extract and map content from AEM, databases, files and websites into Turing, Solr or Elasticsearch.', action: 'Explore Dumont connectors', href: 'https://dumont.viglet.org/' },
  { product: 'shio', job: 'A CMS for people and their agents.', description: 'Manage content in the console or through an AI agent over MCP. Publish pages or deliver content to your application through REST and GraphQL.', action: 'See Shio with an agent', href: 'https://shio.viglet.org/claude-code/' },
]

export const evaluationPaths = [
  { id: 'aem', title: 'Add search to Adobe AEM', description: 'See search and cited answers over WKND content, then follow the connector setup for your AEM environment.', action: 'Explore the AEM demo', href: 'https://turing.viglet.org/aem-search/', guide: '/blog/enterprise-search-for-adobe-aem/', guideLabel: 'Read the AEM integration guide' },
  { id: 'wordpress', title: 'Search your WordPress content', description: 'Follow the WordPress integration guide. You will need a Turing server; AI answers also require a configured model.', action: 'Read the WordPress guide', href: '/blog/enterprise-search-for-wordpress/', guide: 'https://turing.viglet.org/docs/getting-started/intro/', guideLabel: 'Set up the Turing server' },
  { id: 'shio', title: 'Let an agent work with your CMS', description: 'Connect Claude Code to Shio through MCP and see how content authoring and review fit together.', action: 'Read the Shio agent guide', href: '/blog/run-your-cms-from-claude-code-shio/', guide: 'https://shio.viglet.org/claude-code/', guideLabel: 'Explore Shio for agents' },
] as const

export const demoScenarios = [
  { id: 'aem', label: 'AEM indexing', query: 'How do I index Adobe AEM content?', answer: 'Configure a Dumont AEM source to extract pages and assets, then deliver the mapped content to Turing for search.', sourceLabel: 'AEM integration guide', sourceHref: '/blog/enterprise-search-for-adobe-aem/' },
  { id: 'models', label: 'Model choice', query: 'Can I use a local model for answers?', answer: 'Turing supports local Ollama models as well as external providers. Configure local embeddings and review external tools when processing must stay within your infrastructure.', sourceLabel: 'Turing getting started', sourceHref: 'https://turing.viglet.org/docs/getting-started/intro/' },
  { id: 'shio', label: 'Content authoring', query: 'Can an agent manage my content?', answer: 'Shio exposes content operations through MCP, so a coding agent can work with your CMS while your team reviews the content.', sourceLabel: 'Shio with Claude Code', sourceHref: '/blog/run-your-cms-from-claude-code-shio/' },
] as const
