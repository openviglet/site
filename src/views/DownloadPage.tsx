'use client'

import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolutionMenu from '@/components/SolutionMenu'
import VigletLogo from '@/components/VigletLogo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CommandBlock } from '@/components/Terminal'
import { getSolution } from '@/data/solutions'
import { cloud } from '@/data/cloud'

export default function DownloadPage({ identifier }: Readonly<{ identifier: string }>) {
  const solution = getSolution(identifier)
  if (!solution) return null
  const image = solution.dockerImage
  const port = solution.runPort
  const run = image && port ? `docker run -d -p ${port}:${port} --name ${identifier} ${image}` : undefined
  const localUrl = port ? `http://localhost:${port}` : undefined
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <SolutionMenu solution={solution} />
      <main id="main-content" className="flex-1 px-6 py-10 md:py-14">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-5"><VigletLogo identifier={identifier} size={48} /><Badge variant="brand">Docker installation</Badge></div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Run {solution.shortName}</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">Start an evaluation instance with Docker. For configuration and production deployment, follow the official {solution.shortName} setup guide.</p>
          <p className="mt-4 text-sm text-muted-foreground">You need Docker Engine or Docker Desktop, access to the container registry, and port {port} available on your host.</p>
          {image && run && (
            <section className="mt-8 space-y-5" aria-label="Container commands">
              <div><h2 className="font-semibold text-foreground mb-3">Pull the image</h2><CommandBlock command={`docker pull ${image}`} /></div>
              <div><h2 className="font-semibold text-foreground mb-3">Start the evaluation instance</h2><CommandBlock command={run} /></div>
              {localUrl && <p className="text-sm text-muted-foreground">Then open <a href={localUrl} className="text-brand underline underline-offset-4">{localUrl}</a> and follow the product's first-run instructions.</p>}
            </section>
          )}
          <section className="mt-8 rounded-2xl border border-border bg-muted p-6" aria-labelledby="production-setup">
            <h2 id="production-setup" className="text-xl font-bold text-foreground">Before production</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">The evaluation command does not configure persistent storage, backups, access controls or updates. Your team operates the infrastructure and pays for any external models or services it enables.</p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Button asChild><a href={solution.getStarted} data-viglet-action="setup_guide_open" data-viglet-product={identifier} data-viglet-placement="download">Read the {solution.shortName} setup guide</a></Button>
              <Button variant="outline" asChild><Link href="/contact/" data-viglet-action="contact_intent" data-viglet-product={identifier} data-viglet-placement="download">Discuss implementation</Link></Button>
            </div>
          </section>
          {identifier === 'turing' && <p className="mt-6 text-sm text-muted-foreground">Using WordPress or WooCommerce? Install the <a href="https://turing.viglet.org/docs/integrations/wordpress/" className="text-brand underline underline-offset-4">Viglet Turing Search plugin</a> alongside your Turing server. Dumont is not required.</p>}
          <nav className="flex flex-wrap gap-x-6 gap-y-3 mt-8 text-sm text-brand" aria-label="Installation resources">
            <Link href={solution.permalink} className="underline underline-offset-4">{solution.shortName} overview</Link>
            <Link href={`${solution.permalink}release-notes/`} className="underline underline-offset-4">Release notes</Link>
            {solution.github && <a href={`${solution.github}/releases/`} className="underline underline-offset-4">Official releases</a>}
            <a href={solution.docs} className="underline underline-offset-4">All documentation</a>
          </nav>
          <div className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">Prefer hosted evaluation? <a href={cloud.signUpUrl} className="text-brand underline underline-offset-4">Try {cloud.name}</a> {cloud.beta && <Badge variant="brand">Beta</Badge>}. Features may change during the beta.</div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
