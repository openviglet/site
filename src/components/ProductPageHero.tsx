import type { ReactNode } from 'react'
import type { Solution } from '@/data/solutions'
import VigletLogo from '@/components/VigletLogo'
import PageHero from '@/components/PageHero'

/** One hero layout for product overview, installation and release history. */
export default function ProductPageHero({ solution, label, title, description, children }: Readonly<{
  solution: Solution
  label: string
  title: string
  description: string
  children: ReactNode
}>) {
  return (
    <div data-product-hero>
      <PageHero label={label} title={title} description={description} context={solution.category} mark={<VigletLogo identifier={solution.identifier} size={48} />}>{children}</PageHero>
    </div>
  )
}
