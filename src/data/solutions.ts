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
  downloadSize?: string
  downloadUrl?: string
  shortRelease?: string
  runJar?: string
  runPort?: number
  appLogin?: string
  appPassword?: string
  fileType?: string
  youtubePlaylistId?: string
  pdfGetStarted?: string
  installationSteps?: boolean
  serviceUrl?: string
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
    github: 'https://github.com/openviglet/dumont',
    githubOrg: 'openviglet',
    release: '2025.4',
    logoAcronym: 'Du',
    logoSection: 'DEP',
    shortName: 'Dumont DEP',
    memo:'Flow',
    fullName: 'Viglet Dumont DEP',
    description: 'The Data Extraction Platform. Giving your data flight, from source to destination.',

    downloadMessage: 'Download Dumont DEP and explore your flight plan.',
    downloadSize: '145 MB',
    downloadUrl: 'https://github.com/openviglet/dumont/releases/download/v2025.4/dumont-connector.jar',
    runJar: 'dumont-connector.jar',
    runPort: 30110,
    fileType: '.jar',
    installationSteps: true,
  },
  {
    identifier: 'shio',
    title: 'Viglet Shio CMS',
    status: 'stable',
    order: 2,
    permalink: '/shio/',
    getStarted: 'https://docs.viglet.org/shio/',
    github: 'https://github.com/openviglet/shio',
    githubOrg: 'openviglet',
    release: '0.3.8',
    logoAcronym: 'Sh',
    logoSection: 'CMS',
    shortName: 'Shio CMS',
    fullName: 'Viglet Shio CMS',
    description: 'Model Content, Use GraphQL and Create Site using Javascript with Native Cache and Search.',
    memo: 'Content',

    downloadMessage: 'Download Shio CMS and create your site.',
    downloadSize: '179 MB',
    downloadUrl: 'https://github.com/openviglet/shio/releases/download/v0.3.8/viglet-shio.jar',
    runJar: 'viglet-shio.jar',
    runPort: 2710,
    appLogin: 'admin',
    appPassword: 'admin',
    fileType: '.jar',
    installationSteps: true,
  },
  {
    identifier: 'turing',
    title: 'Viglet Turing ES',
    status: 'stable',
    order: 3,
    permalink: '/turing/',
    getStarted: 'https://docs.viglet.org/turing/',
    github: 'https://github.com/openviglet/turing',
    githubOrg: 'openviglet',
    release: '2025.3',
    logoAcronym: 'Tu',
    logoSection: 'ES',
    shortName: 'Turing ES',
    fullName: 'Viglet Turing ES',
    description: 'Enterprise Search, Semantic Navigation, Chatbot using Search Engine and Generative AI.',
    memo: 'Intelligence',
    downloadMessage: 'Download Turing ES and add more value to your content.',
    downloadSize: '455 MB',
    downloadUrl: 'https://github.com/openviglet/turing/releases/download/v2025.3.65/viglet-turing.jar',
    runJar: 'viglet-turing.jar',
    runPort: 2700,
    fileType: '.jar',
    installationSteps: true,
  },
]

export function getSolution(identifier: string): Solution | undefined {
  return solutions.find((s) => s.identifier === identifier)
}
