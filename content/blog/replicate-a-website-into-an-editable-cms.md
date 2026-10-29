---
date: 2026-11-17
draft: true
slug: replicate-a-website-into-an-editable-cms
title: "Replicate an Existing Website into an Editable CMS with Viglet Shio"
description: "Moving a site to a new CMS usually means rebuilding it page by page. Viglet Shio clones a live site, proposes a content model from its markup, converts it into editable posts, and tells you when the copy is done."
authors: [alexandre]
tags: [cms, open-source]
keywords:
  - website migration CMS
  - migrate website to headless CMS
  - clone website into CMS
  - content migration tool
  - open source CMS migration
viglet_products: [shio]
---

Most CMS migrations stall at the same place: the old site has hundreds of pages,
nobody wrote down its content model, and rebuilding it by hand takes months. The
result is either a pixel copy nobody can edit or an editable site that no longer
looks like the original.

[**Viglet Shio**](https://openviglet.github.io/shio/) treats that as a choice you
make per block, not once for the whole site.

<!-- truncate -->

## Five commands

```bash
npx @viglet/shio clone https://example.com --max-pages 50 --render --assets
npx @viglet/shio propose --accept all
npx @viglet/shio convert
npx @viglet/shio publish --all   # drafts until you say so
npx @viglet/shio judge           # ACCEPTED, or what holds it
```

- **`clone`** captures the live site, its pages and assets.
- **`propose`** derives a content model from the markup: which repeated structures
  are really post-types and fields.
- **`convert`** turns the pages into real Shio posts.
- **`publish`** is explicit. Until then everything is a draft.
- **`judge`** says whether the round is done.

## Fidelity, authorable, or both

`convert` has two modes. **Fidelity** gives a pixel-accurate copy. **Authorable**
gives pages a curator can edit, redrawn with Shio's own section vocabulary, with a
theme that takes its colours, type and corner radius from the source.

The choice is per block, so most pages end up mixed: the blocks you accepted become
sections, and each run of kept markup becomes a section too, movable and
replaceable instead of locked away.

A third option, `convert --annotate`, keeps a wholly verbatim page byte for byte and
stamps the field mapping onto its own markup as attributes, so a curator can still
edit its heading in place.

## Knowing when to stop

A migration without a finish line drifts. `judge` runs the checks, answers once,
and holds the answer to a bar you declare: a finding at or below it prints as a task
for later, one above it fails. An authorable replica is held to its content, its
structure and its routes, not to looking like the source. Ask for `--fidelity`
when the pixel comparison is what you need.

## After the copy

The result is an ordinary Shio site: content in the console for curators, as
Markdown files for an AI agent over MCP, and over a REST and GraphQL delivery API
for any front end.

## Next steps

- 📘 [Replicate a site with Shio](https://openviglet.github.io/shio/replicate/)
- 📗 [Run your CMS from Claude Code](/blog/run-your-cms-from-claude-code-shio/)
- ⭐ [Shio on GitHub](https://github.com/openviglet/shio) (Apache 2.0)

*Viglet Shio is an open source, agent-ready CMS: people run it from the console, AI
agents run it over MCP, and the curator approves what goes live.*
