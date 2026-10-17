import { notFound } from 'next/navigation'
import ReleaseNotesPage from '@/views/ReleaseNotesPage'
import { getSolution, solutions } from '@/data/solutions'
import { productPageMetadata } from '@/lib/seo'

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
  if (!getSolution(identifier)) notFound()
  return <ReleaseNotesPage identifier={identifier} />
}
