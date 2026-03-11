export interface Feature {
  title: string
  solution: string
  content: string
}

export const features: Feature[] = [
  { title: 'Native Cache', solution: 'shio', content: 'Your site will be optimized with native cache. Faster and hassle free.' },
  { title: 'GraphQL', solution: 'shio', content: 'The simplicity of Headless CMS, consuming and interacting with its content using GraphQL power.' },
  { title: 'Microservices', solution: 'shio', content: 'Run Multi-container Docker applications using Docker Compose and Kubernetes.' },
  { title: 'Modeling', solution: 'shio', content: 'Create new Post Types with different attributes, that fit your business.' },
  { title: 'OpenText Integration', solution: 'shio', content: 'Use OpenText solutions together with Shio CMS: Authenticate through OTDS; Consume OTCS and OTMM Documents and Assets; Import WEM content.' },
  { title: 'Search Ready', solution: 'shio', content: 'Contents are indexed automatically. This way, you can use embedded search engine in your site. Simple and powerful.' },
  { title: 'Chatbot', solution: 'turing', content: 'Engage your clients with clear communication, craft complex intents with precision, generate insightful reports, and continuously enhance your interactions for smarter, more effective outcomes.' },
  { title: 'Generative AI', solution: 'turing', content: 'Supports multiple large language models (LLMs) such as ChatGPT and Ollama, with flexible deployment options including SaaS and on-premises. Additionally, it features an intuitive Embedding Store for seamless content storage and management powered by Retrieval-Augmented Generation (RAG).' },
  { title: 'Microservices', solution: 'turing', content: 'Deploy and manage multi-container Docker applications effortlessly with Docker Compose and Kubernetes, enabling seamless scalability and orchestration.' },
  { title: 'Semantic Navigation', solution: 'turing', content: 'Build a powerful faceted search with precise targeting rules, and seamlessly integrate your preferred Generative AI to enhance your content. Effortlessly index data from diverse sources like AEM, WordPress, OpenText WEM, databases, and file systems.' },
]

export function getFeaturesBySolution(identifier: string): Feature[] {
  return features.filter((f) => f.solution === identifier)
}
