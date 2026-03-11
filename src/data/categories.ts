export interface Category {
  identifier: string
  menuTitle: string
  title: string
  bannerTitle: string
  description: string
  url: string
}

export const categories: Category[] = [
  {
    identifier: 'ai',
    menuTitle: 'AI and Search',
    title: 'AI and Search | Solutions',
    bannerTitle: 'Artificial Intelligence and Enterprise Search',
    description: 'Artificial intelligence in a way that you can already implement easily and without a headache.',
    url: '/ai-and-search/',
  },
  {
    identifier: 'website',
    menuTitle: 'Digital Experience',
    title: 'Digital Experience | Solutions',
    bannerTitle: 'Digital Experience',
    description: 'Have the end-to-end solution. Creating, analyzing and testing your website.',
    url: '/digital-experience/',
  },
]
