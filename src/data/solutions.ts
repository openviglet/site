export interface Solution {
  identifier: string
  title: string
  status: 'stable' | 'beta'
  order: number
  permalink: string
  getStarted: string
  github?: string
  githubOrg?: string
  release?: string
  logoAcronym: string
  /** What the product is, in words. The names dropped their acronyms (ES / CMS /
   *  DEP) in October 2026, so the category says it beside the name instead. */
  category: string
  shortName: string
  memo: string
  fullName: string
  description: string

  downloadMessage?: string
  shortRelease?: string
  /** Docker image on the GitHub Container Registry, e.g. `ghcr.io/openviglet/turing-ce`.
   *  Products ship only as containers; there are no JAR downloads. */
  dockerImage?: string
  runPort?: number
  appLogin?: string
  appPassword?: string
  youtubePlaylistId?: string
  pdfGetStarted?: string
  installationSteps?: boolean
  serviceUrl?: string
  /** Dedicated product marketing site (e.g. turing.viglet.org). When set, the
   *  solution page funnels visitors here as the primary CTA instead of docs. */
  site?: string
}

export const productColors: Record<string, string> = {
  dumont: '#0F766E',  // teal
  shio:   '#7C3AED',  // violet
  turing: '#4169E1',  // royalblue
}

export const solutions: Solution[] = [
  {
    identifier: 'dumont',
    title: 'Viglet Dumont',
    status: 'stable',
    order: 1,
    permalink: '/dumont/',
    getStarted: 'https://docs.viglet.org/dumont/',
    github: 'https://github.com/openviglet/dumont-ce',
    githubOrg: 'openviglet',
    release: '2026.2.16',
    logoAcronym: 'Du',
    category: 'Data Extraction Platform',
    shortName: 'Dumont',
    memo:'Flow',
    fullName: 'Viglet Dumont',
    description: 'Data extraction platform: connect any source and deliver its content to any search engine.',
    downloadMessage: 'Run Dumont with Docker and explore your flight plan.',
    dockerImage: 'ghcr.io/openviglet/dumont-ce',
    runPort: 30130,
    installationSteps: true,
  },
  {
    identifier: 'shio',
    title: 'Viglet Shio',
    status: 'stable',
    order: 2,
    permalink: '/shio/',
    getStarted: 'https://docs.viglet.org/shio/',
    github: 'https://github.com/openviglet/shio-ce',
    githubOrg: 'openviglet',
    release: '0.3.8',
    logoAcronym: 'Sh',
    category: 'Headless CMS',
    shortName: 'Shio',
    fullName: 'Viglet Shio',
    description: 'Headless CMS: model content and deliver it over a versioned REST and GraphQL API, with native cache and search.',
    memo: 'Content',
    downloadMessage: 'Run Shio with Docker and create your site.',
    dockerImage: 'ghcr.io/openviglet/shio-ce',
    runPort: 2710,
    appLogin: 'admin',
    appPassword: 'admin',
    installationSteps: true,
  },
  {
    identifier: 'turing',
    title: 'Viglet Turing',
    status: 'stable',
    order: 3,
    permalink: '/turing/',
    getStarted: 'https://docs.viglet.org/turing/',
    site: 'https://turing.viglet.org',
    github: 'https://github.com/openviglet/turing-ce',
    githubOrg: 'openviglet',
    release: '2026.2.6',
    logoAcronym: 'Tu',
    category: 'Enterprise Search',
    shortName: 'Turing',
    fullName: 'Viglet Turing',
    description: 'Enterprise search, cited RAG and AI agents over your content. Self-hosted, with your choice of search engine and LLM.',
    memo: 'Intelligence',
    downloadMessage: 'Run Turing with Docker and add more value to your content.',
    dockerImage: 'ghcr.io/openviglet/turing-ce',
    runPort: 2700,
    installationSteps: true,
  },
]

export function getSolution(identifier: string): Solution | undefined {
  return solutions.find((s) => s.identifier === identifier)
}
