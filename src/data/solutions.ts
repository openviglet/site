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
  logoSection: string
  shortName: string
  memo: string
  fullName: string
  description: string

  downloadMessage?: string
  shortRelease?: string
  /** Docker image on the GitHub Container Registry, e.g. `ghcr.io/openviglet/turing-ce`.
   *  Products are distributed exclusively as containers — no JAR downloads. */
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
  dumont: '#006400',  // darkgreen
  shio:   '#FF6347',  // tomato
  turing: '#4169E1',  // royalblue
}

export const solutions: Solution[] = [
  {
    identifier: 'dumont',
    title: 'Viglet Dumont DEP',
    status: 'stable',
    order: 1,
    permalink: '/dumont/',
    getStarted: 'https://docs.viglet.org/dumont/',
    github: 'https://github.com/openviglet/dumont-ce',
    githubOrg: 'openviglet',
    release: '2026.2.16',
    logoAcronym: 'Du',
    logoSection: 'DEP',
    shortName: 'Dumont DEP',
    memo:'Flow',
    fullName: 'Viglet Dumont DEP',
    description: 'The Data Extraction Platform. Giving your data flight, from source to destination.',
    downloadMessage: 'Run Dumont DEP with Docker and explore your flight plan.',
    dockerImage: 'ghcr.io/openviglet/dumont-ce',
    runPort: 30130,
    installationSteps: true,
  },
  {
    identifier: 'shio',
    title: 'Viglet Shio CMS',
    status: 'stable',
    order: 2,
    permalink: '/shio/',
    getStarted: 'https://docs.viglet.org/shio/',
    github: 'https://github.com/openviglet/shio-ce',
    githubOrg: 'openviglet',
    release: '0.3.8',
    logoAcronym: 'Sh',
    logoSection: 'CMS',
    shortName: 'Shio CMS',
    fullName: 'Viglet Shio CMS',
    description: 'Headless CMS — model content, deliver it over a versioned REST & GraphQL API, with native cache and search.',
    memo: 'Content',
    downloadMessage: 'Run Shio CMS with Docker and create your site.',
    dockerImage: 'ghcr.io/openviglet/shio-ce',
    runPort: 2710,
    appLogin: 'admin',
    appPassword: 'admin',
    installationSteps: true,
  },
  {
    identifier: 'turing',
    title: 'Viglet Turing ES',
    status: 'stable',
    order: 3,
    permalink: '/turing/',
    getStarted: 'https://docs.viglet.org/turing/',
    site: 'https://turing.viglet.org',
    github: 'https://github.com/openviglet/turing-ce',
    githubOrg: 'openviglet',
    release: '2026.2.6',
    logoAcronym: 'Tu',
    logoSection: 'ES',
    shortName: 'Turing ES',
    fullName: 'Viglet Turing ES',
    description: 'Enterprise Search, Semantic Navigation, Chatbot using Search Engine and Generative AI.',
    memo: 'Intelligence',
    downloadMessage: 'Run Turing ES with Docker and add more value to your content.',
    dockerImage: 'ghcr.io/openviglet/turing-ce',
    runPort: 2700,
    installationSteps: true,
  },
]

export function getSolution(identifier: string): Solution | undefined {
  return solutions.find((s) => s.identifier === identifier)
}
