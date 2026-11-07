'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IconArrowRight, IconSearch } from '@tabler/icons-react'
import { demoScenarios } from '@/data/hub'

/** Manual examples: no simulated latency, autoplay or dependence on an AI endpoint. */
export default function ScriptedDemo() {
  const [index, setIndex] = useState(0)
  const scenario = demoScenarios[index]
  return (
    <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between gap-4">
        <span className="font-semibold text-foreground">Questions your content can answer</span>
        <span className="text-xs text-muted-foreground shrink-0">Illustrative preview</span>
      </div>
      <div className="flex flex-wrap gap-2 p-5" role="group" aria-label="Choose an example question">
        {demoScenarios.map((item, i) => (
          <button key={item.id} type="button" aria-pressed={index === i} onClick={() => setIndex(i)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${index === i ? 'border-brand bg-brand-bg text-brand' : 'border-border text-muted-foreground hover:bg-muted'}`}>
            {item.label}
          </button>
        ))}
      </div>
      <div aria-live="polite" aria-atomic="true" className="px-5 pb-6 min-h-64">
        <p className="flex gap-3 font-semibold text-foreground"><IconSearch size={20} className="text-brand shrink-0" aria-hidden="true" />{scenario.query}</p>
        <p className="mt-5 text-foreground leading-relaxed">{scenario.answer}</p>
        <p className="mt-5 text-xs uppercase tracking-wider text-muted-foreground">Read the source</p>
        <Link href={scenario.sourceHref} className="mt-2 inline-block text-sm text-brand underline underline-offset-4">{scenario.sourceLabel}</Link>
      </div>
      <div className="border-t border-border bg-muted p-5">
        <p className="text-xs text-muted-foreground mb-3">Written examples. The live playground searches Viglet Turing documentation.</p>
        <a href="https://turing.viglet.org/#playground" data-viglet-action="demo_open" data-viglet-product="turing" data-viglet-placement="home_hero" className="inline-flex items-center gap-2 font-semibold text-brand">Try the live playground <IconArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </div>
  )
}
