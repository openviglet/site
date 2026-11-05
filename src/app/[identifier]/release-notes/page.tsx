import { notFound } from 'next/navigation'
import ReleaseNotesPage from '@/views/ReleaseNotesPage'
import { getSolution, solutions } from '@/data/solutions'
import JsonLd from '@/components/JsonLd'
import { productPageJsonLd, productPageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ identifier: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return solutions.map((s) => ({ identifier: s.identifier }))
}

export async function generateMetadata({ params }: Props) {
  const solution = getSolution((await params).identifier)
  return solution ? productPageMetadata(solution, 'releaseNotes') : {}
}

export default async function Page({ params }: Props) {
  const { identifier } = await params
  const solution = getSolution(identifier)
  if (!solution) notFound()
  return (
    <>
      <JsonLd data={productPageJsonLd(solution, 'releaseNotes')} />
      <ReleaseNotesPage identifier={identifier} />
    </>
  )
}
