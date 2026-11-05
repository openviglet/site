/** One inline JSON-LD block. `data` is already serialised and escaped by src/lib/seo.ts. */
export default function JsonLd({ data }: Readonly<{ data: string }>) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />
}
