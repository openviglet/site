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
  fullName: string
  description: string
  githubCiUrl?: string
  githubCiImage?: string
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
  dumont: '#15803D',
  shio:   '#DC2626',
  turing: '#1D4ED8',
}

export const solutions: Solution[] = [
  {
    identifier: 'dumont',
    title: 'Viglet Dumont DEP',
    status: 'stable',
    order: 1,
    permalink: '/dumont/',
    getStarted: 'https://docs.viglet.com/dumont/',
    github: 'https://github.com/openviglet/dumont',
    githubOrg: 'openviglet',
    release: '2025.4',
    logoAcronym: 'Du',
    logoSection: 'DEP',
    shortName: 'Dumont DEP',
    fullName: 'Viglet Dumont DEP',
    description: 'The Data Extraction Platform. Giving your data flight, from source to destination.',
    githubCiUrl: 'https://github.com/openviglet/dumont/actions/workflows/validate.yml',
    githubCiImage: 'https://img.shields.io/github/actions/workflow/status/openviglet/dumont/validate.yml?branch=2025.4',
    downloadMessage: 'Download Dumont DEP and explore your flight plan.',
    downloadSize: '145 MB',
    downloadUrl: 'https://github.com/openviglet/dumont/releases/download/v2025.4/dumont-connector.jar',
    runJar: 'dumont-connector.jar',
    runPort: 2750,
    fileType: '.jar',
    installationSteps: true,
  },
  {
    identifier: 'shio',
    title: 'Viglet Shio CMS',
    status: 'stable',
    order: 2,
    permalink: '/shio/',
    getStarted: 'https://docs.viglet.com/shio/',
    github: 'https://github.com/openviglet/shio',
    githubOrg: 'openviglet',
    release: '0.3.8',
    logoAcronym: 'Sh',
    logoSection: 'CMS',
    shortName: 'Shio CMS',
    fullName: 'Viglet Shio CMS',
    description: 'Model Content, Use GraphQL and Create Site using Javascript with Native Cache and Search.',
    githubCiUrl: 'https://github.com/openviglet/shio/actions/workflows/build.yml',
    githubCiImage: 'https://img.shields.io/github/actions/workflow/status/openviglet/shio/build.yml?branch=0.3.8',
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
    getStarted: 'https://docs.viglet.com/turing/',
    github: 'https://github.com/openviglet/turing',
    githubOrg: 'openviglet',
    release: '2025.3',
    logoAcronym: 'Tu',
    logoSection: 'ES',
    shortName: 'Turing ES',
    fullName: 'Viglet Turing ES',
    description: 'Enterprise Search, Semantic Navigation, Chatbot using Search Engine and Generative AI.',
    githubCiUrl: 'https://github.com/openviglet/turing/actions/workflows/validate.yml',
    githubCiImage: 'https://img.shields.io/github/actions/workflow/status/openviglet/turing/validate.yml?branch=2025.4',
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
