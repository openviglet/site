import type { ProductPath } from '@/data/hub'

interface ProductOverview {
  chooseWhen: string[]
  startingPoint: string
  relationships: { product: ProductPath['product']; description: string }[]
  guide: { label: string; href: string }
}

/** Portfolio decisions belong here; detailed capabilities live on the product sites. */
export const productOverviews: Record<ProductPath['product'], ProductOverview> = {
  turing: {
    chooseWhen: [
      'Your website or application needs search with filters and relevance controls.',
      'You want AI answers that cite your indexed content.',
      'You need to choose your search engine, model and hosting environment.',
    ],
    startingPoint: 'Start a Viglet Turing instance and index a content source. Configure a model when you need AI answers. For WordPress and WooCommerce, use the Viglet Turing plugin directly; Viglet Dumont is not required.',
    relationships: [
      { product: 'dumont', description: 'Connect AEM, databases, files and websites to your search index when those sources need extraction.' },
      { product: 'shio', description: 'Manage and publish content in Viglet Shio, then index it in Viglet Turing when your site needs search.' },
    ],
    guide: { label: 'Add search to WordPress', href: '/blog/enterprise-search-for-wordpress/' },
  },
  dumont: {
    chooseWhen: [
      'Your content is in AEM, databases, files or websites and needs to reach a search engine.',
      'You need configured extraction and field mappings for supported sources.',
      'You want to deliver content to Viglet Turing, Solr or Elasticsearch.',
    ],
    startingPoint: 'Configure a supported source, its credentials and field mappings, then choose a search destination. The WordPress/WooCommerce plugin belongs to Viglet Turing and does not need Viglet Dumont.',
    relationships: [
      { product: 'turing', description: 'Deliver extracted content to Viglet Turing for search, cited answers and agents.' },
    ],
    guide: { label: 'Connect Adobe AEM to search', href: '/blog/enterprise-search-for-adobe-aem/' },
  },
  shio: {
    chooseWhen: [
      'Your team needs a CMS for structured content and publishing.',
      'People and coding agents should work with the same content through the console and MCP.',
      'Your site needs rendered pages or a REST and GraphQL content API.',
    ],
    startingPoint: 'Run Viglet Shio, define your content types and choose how to publish or deliver content. Connect an external coding agent through MCP when you want it to author content; the agent keeps its own model configuration.',
    relationships: [
      { product: 'turing', description: 'Add Viglet Turing for search over Viglet Shio content. Viglet Shio can publish content independently.' },
    ],
    guide: { label: 'Run your CMS from Claude Code', href: '/blog/run-your-cms-from-claude-code-shio/' },
  },
}
