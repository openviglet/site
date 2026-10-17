---
name: site-roadmap-docs
description: How to work a task in viglet.org's roadmap — the docs/ files (ROADMAP.md, CHANGELOG.md, IMPROVEMENTS.md, STRATEGY.md) written through the roadkeep CLI and never hand-edited, and above all the one-task-one-commit rule: every finished W-task ends in one commit holding the code plus the doc sync. Use whenever adding a task, picking the next W-number, marking a task shipped, retiring, deferring, linting, editing any of those files, executing a block or a list of W ids, or finishing any task that touches this repo.
---

# Roadmap tasks & committing

**No figure in this file is derived from the backlog.** Counts, the next id and which ids
are open are all things `roadkeep` answers; where you would want a number, this file names
the read instead.

## ⛔ READ FIRST — one task, one commit (non-negotiable)

**A task is not finished until the commit landed.** This repo commits through
`run-commit.cmd` (user-global rule), always with the intent spelled out:

```
cd D:\Git\viglet\site
git status --short          # must list this task's files alone
run-commit.cmd -m "<conventional-commits title>"
```

- **`run-commit.cmd` stages everything** (`git add *`). So the `git status` check above is
  the gate: if the tree holds anything that is not this task's work — another session's
  files, a stray scratch file — stop and sort it out before committing, never commit it
  under this task's title.
- **Always pass `-m`.** Docs/roadmap commits especially: without it the tool reads prose
  about shipped work in the diff as `feat: implement …`.
- **The doc sync rides in the same commit as the code**, so the governed files never
  describe a state that did not ship.
- **You may NOT do more than one task before committing.** A multi-task request (a whole
  block, or a list of `W<n>`s) is a request to run them one at a time, committing after
  each.
- **A batch of ≥2 tasks runs under the `/loop` skill** (self-paced): one task per
  iteration, committed at the end of that iteration, then advance.
- **Self-check before starting task N+1:** `git status` / `git log -1`. If the previous
  task's work is still in the tree, commit it first.
- **Where two sessions share this checkout, declare your paths**: `roadkeep claim W<n>
  --path <p>` says what the task touches, and `roadkeep claim W<n>` with no `--path` reads
  back what the tree holds that another live claim calls its own.

The same rule applies to any finished unit of work here, roadmap task or not.

## The gate before the commit

Validated means the project's own build was run, not that the edit looked right. From the
repo root:

| Command | What it holds | When |
|---|---|---|
| `npm run build` | `prebuild` (`scripts/fetch-guides.mjs`), then `tsc --noEmit`, `next build` — which renders every route, llms.txt and the sitemap into `out/` — then `scripts/og-images.mjs`. | Every task that touches `src/`, `scripts/`, `public/` or a config. |
| `roadkeep lint --baseline HEAD` | The governed files, judged on **what you added**. The repo arrived with standing findings (over-long `why`s, unknown deps); plain `lint` reports them all, `--baseline HEAD` forgives them by name. | Every task, without exception — it is the only gate a docs-only change has. |

There is no test suite and no `npm run lint`; don't invent one. `npm run dev` /
`npm run preview` are how you *see* a change, not gates. On Windows, if `node_modules`
binaries are locked by the IDE or Next, don't loop on reinstalls — rely on IDE TypeScript
diagnostics (see `AGENTS.md`).

## ⛔ READ SECOND — the docs are owned by `roadkeep`

[`roadkeep.toml`](../../../roadkeep.toml) declares the format — prefix `W`,
`ref_scheme = "outline"` (pointers are `→ §II.1`, not task ids), the markers. The em
dashes in `docs/ROADMAP.md` (`**Title** — why`, `(deps: —)`, `## Block A — Title`) are
the parser's separators: the site's "no em dashes" copy rule (W37) does **not** apply there.

[`.mcp.json`](../../../.mcp.json) and [`.claude/settings.json`](../../settings.json) wire
the rest through `.claude/hooks/roadkeep-launch.py`: a guard that **denies a hand-edit**
of a governed file and names the command that does it, the `mcp__roadkeep__*` tools, and
the [`roadkeep`](../roadkeep/SKILL.md) skill with the whole write path. **Reach for the
MCP tools first**; the shell fallback is `python .claude/hooks/roadkeep-launch.py <verb>`,
not a `roadkeep` on PATH. There is no `../roadkeep` beside this repo, so the launcher
needs `ROADKEEP_HOME` (the roadkeep checkout, `D:\Git\alegauss\roadkeep`) or the plugin.

Start a task with `brief`, not by reading the files; `lint` is the gate.

Each file has one job (see `AGENTS.md`) — never duplicate content between them:

| File | Single responsibility |
|---|---|
| [`docs/ROADMAP.md`](../../../docs/ROADMAP.md) | **Task status** — active backlog only (📋 designed · 💭 idea · ⏳ partial · 🛠 in-progress), one line per task, the block headings and the `## Non-goals`. |
| [`docs/CHANGELOG.md`](../../../docs/CHANGELOG.md) | What has **shipped**, indexed by block. `git log` is authoritative for detail. |
| [`docs/IMPROVEMENTS.md`](../../../docs/IMPROVEMENTS.md) | **Design rationale** for _unshipped_ work only, by outline (`§II.1`). §0 holds non-goals. Deleted per task by the ship that closes it. |
| [`docs/STRATEGY.md`](../../../docs/STRATEGY.md) | Positioning and the bets (showcase, dogfooding, GEO, the Cloud migration). Never a numbered task. |

`roadkeep.toml` today declares only the roadmap under `[files]`, so `brief` reports "no
improvements or strategy file" and `ship` cannot delete a section it does not know about.
Until the other files are declared there, delete the shipped task's `IMPROVEMENTS.md`
subsection yourself, in the same commit.

## The loop

- **`brief --claim`** picks the next line and briefs it in one read, taking it in the same
  transaction. Reach for **`--designed`** when you were asked to *execute*: a 💭 line hands
  you a design to write, not a commit.
- **Order**: in-progress first, then the `## Priority` queue if `docs/ROADMAP.md` has one,
  then the lowest ready id. `priority list` is the read.
- **The read BEFORE an add is `delivered <block> --near "<the sentence you would file>"`**
  — the duplicate question asked before an id is spent.
- **Adding** is `add --block <x> --symptom "…" --why "…" --ref <x.y>`. Under an outline the
  `§` anchor is **not derived**: `--ref` is required, and `anchors --block <x>` names the
  free addresses. `budget` prices every field first (`why` is one sentence, ≤ 200 chars).
- **The next id is `roadkeep next-id`.** `AGENTS.md` also keeps the counter in
  [`docs/last-task.md`](../../../docs/last-task.md): after an `add`, bump that file's
  number and append its log line in the same commit, so the two never disagree.
- **Keep a task line terse** — symptom (what does not work, never a fix name) + one
  sentence of why + the pointer. The reasoning belongs in `IMPROVEMENTS.md`.

## The two lists that bind a proposal

- **Non-goals** (`non-goal list`, plus `IMPROVEMENTS.md` §0): every entry binds. A
  proposal a non-goal forbids is not filed.
- **Strategy ≠ backlog**: market or positioning discussion goes in `STRATEGY.md`, never as a
  `W` line. **No invented product claims**: no superlatives, no unverifiable benchmarks.

## Shipping

`ship <id> --why "<what now works>"` writes the ledger entry and clears the roadmap line in
one transaction. Before it, **read the task's `IMPROVEMENTS.md` section** and ask of each
paragraph: _does this stop being true when the code moves?_

| Answer | Door |
|---|---|
| It explains **this module** | `--recorded-in <path>` — move the prose into that file's header comment. The common case. |
| It is a rule the project must keep obeying | a non-goal (`non-goal add`) or an `AGENTS.md` convention, not a ship flag |
| A constraint with a rejected alternative, belonging to no single file | `--decides "<the constraint>"` |
| You read it and it had gone stale | `--superseded-design "<what it was wrong about>"` |
| Nothing survives | ship plainly — most ships are this |

Then delete the section (see above) and commit. **Never copy a section into a second file.**

## Everything else

- **Status lives in exactly one file.** If a marker anywhere disagrees with the roadmap,
  the roadmap wins.
- **A pause is `defer <id> --reason "…"`, not `retire`.** Retiring is terminal.
- **A false claim is `restate <id> --symptom "…"`**, keeping the id, deps, marker and design.
- **Cross-repo deps** (Turing's `T` ids, Block E ↔ Turing Block O) don't resolve here; when
  Turing or Dumont is what's in the way, file it there with the `viglet-friction` skill.
- **`lint` reports and `repair` spends the report** — every finding names the command that
  closes it, and `explain <code>` says what a code means before you guess.
