import { useState } from 'react'
import { IconCopy, IconCheck } from '@tabler/icons-react'

/**
 * Reusable terminal components (Block H / W23) — promoted from DownloadPage's
 * private `CopyableCommand`. Two variants:
 *
 *  - `CommandBlock` — a single copy-to-clipboard command line (the original
 *    DownloadPage look, kept pixel-identical so that page has no regression).
 *  - `Terminal` — a macOS-style faux terminal (traffic-light dots, monospace,
 *    colored prompt/flag/comment spans) for dev credibility on the home and
 *    solution pages.
 *
 * Pure presentation, design-system tokens, `prefers-reduced-motion` safe (no
 * animation is used here, so nothing to gate).
 */

/** A single copyable command in a dark slate box (was `CopyableCommand`). */
export function CommandBlock({ command }: Readonly<{ command: string }>) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="bg-slate-900 rounded-xl px-4 py-3 flex items-start justify-between gap-3 group">
      <code className="text-sky-300 text-sm font-mono whitespace-pre-wrap break-words leading-relaxed min-w-0">
        <span className="text-slate-500 select-none">$ </span>{command}
      </code>
      <button
        type="button"
        onClick={() => { navigator.clipboard?.writeText(command); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
        className="text-muted-foreground hover:text-white transition-colors shrink-0 mt-0.5"
        aria-label="Copy command"
      >
        {copied ? <IconCheck size={16} className="text-green-400" /> : <IconCopy size={16} />}
      </button>
    </div>
  )
}

export interface TerminalLine {
  /** The command after the prompt. Flags (tokens starting with `-`) are tinted. */
  cmd: string
  /** Optional trailing `# comment`, rendered dimmed. */
  comment?: string
}

/** Colorize a command string: tint flag tokens (`--env`, `-p`) distinctly. */
function renderCmd(cmd: string) {
  return cmd.split(/(\s+)/).map((tok, i) => {
    if (/^\s+$/.test(tok)) return tok
    const isFlag = tok.startsWith('-')
    return (
      <span key={`${i}-${tok}`} className={isFlag ? 'text-[#82aaff]' : undefined}>
        {tok}
      </span>
    )
  })
}

/**
 * A macOS-style faux terminal window. `title` labels the title bar (e.g.
 * "bash — turing"); `lines` are rendered as `$ cmd  # comment` with colored
 * prompt, flags and comments.
 */
export default function Terminal({
  title = 'bash',
  lines,
  className = '',
}: Readonly<{ title?: string; lines: TerminalLine[]; className?: string }>) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-[#0d101e]/95 shadow-2xl shadow-black/40 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.02] px-3.5 py-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-[#8b94b3]">{title}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[0.8rem] leading-relaxed text-[#d7def5]">
        <code>
          {lines.map((line, i) => (
            <span key={`${i}-${line.cmd}`}>
              <span className="text-emerald-400 select-none">$ </span>
              {renderCmd(line.cmd)}
              {line.comment && (
                <span className="text-[#6b7394]">{'  # ' + line.comment}</span>
              )}
              {i < lines.length - 1 ? '\n' : ''}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
