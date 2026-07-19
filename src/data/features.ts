export interface Feature {
  title: string
  solution: string
  content: string
}

export const features: Feature[] = [
  { title: 'Content Delivery API', solution: 'shio', content: 'Consume content headlessly over a versioned, read-only REST API — fetch by id, by URL for slug routing, or query — returning stable, frozen JSON.' },
  { title: 'GraphQL Delivery', solution: 'shio', content: 'A real GraphQL schema generated from your own post types, served read-only at /graphql — query exactly the fields your front-end needs.' },
  { title: 'Content Modeling as Code', solution: 'shio', content: 'Model post types in the console, or version your content model as code with the Post Types DSL and the Shio CLI — push and pull with drift detection.' },
  { title: 'API Tokens & Environments', solution: 'shio', content: 'Per-environment (prod/preview) keys with READ / PREVIEW / WRITE scopes and per-site allow-lists, protected by rate limiting and ETag / Cache-Control caching.' },
  { title: 'Draft Preview & Scheduling', solution: 'shio', content: 'Preview unpublished drafts with short-lived tokens, schedule content to go live, and restore earlier versions from the console.' },
  { title: 'Visual Editing', solution: 'shio', content: 'Edit any externally-rendered page inline through the Adobe Universal Editor bridge — visual authoring without coupling the CMS to your front-end.' },
  { title: 'React & JavaScript SDKs', solution: 'shio', content: 'Official SDKs with hooks (useShioPost, useShioQuery, useShioChildren) to render content with Next.js or any framework, plus outbound webhooks on publish.' },
  { title: 'Native Cache & Search', solution: 'shio', content: 'A Hazelcast-backed native cache keeps delivery fast; content is indexed automatically and integrates with Turing ES for enterprise search.' },
  { title: 'Chatbot', solution: 'turing', content: 'Engage your clients with clear communication, craft complex intents with precision, generate insightful reports, and continuously enhance your interactions for smarter, more effective outcomes.' },
  { title: 'Generative AI', solution: 'turing', content: 'Supports multiple large language models (LLMs) such as ChatGPT and Ollama, with flexible deployment options including SaaS and on-premises. Additionally, it features an intuitive Embedding Store for seamless content storage and management powered by Retrieval-Augmented Generation (RAG).' },
  { title: 'Microservices', solution: 'turing', content: 'Deploy and manage multi-container Docker applications effortlessly with Docker Compose and Kubernetes, enabling seamless scalability and orchestration.' },
  { title: 'Semantic Navigation', solution: 'turing', content: 'Build a powerful faceted search with precise targeting rules, and seamlessly integrate your preferred Generative AI to enhance your content. Effortlessly index data from diverse sources like AEM, WordPress, databases, and file systems.' },
]

export function getFeaturesBySolution(identifier: string): Feature[] {
  return features.filter((f) => f.solution === identifier)
}
