---
date: 2026-11-03
draft: true
slug: run-your-cms-from-claude-code-shio
title: "Run Your CMS from Claude Code: Viglet Shio over MCP"
description: "Viglet Shio is an open source CMS built so an AI coding agent can drive it: 12 MCP tools, content as Markdown files, errors that say how to fix the call, and a review queue so the curator still decides what goes live."
authors: [alexandre]
tags: [cms, mcp, open-source]
keywords:
  - agent-ready CMS
  - CMS for AI agents
  - Claude Code CMS
  - MCP CMS
  - headless CMS MCP server
  - open source headless CMS
viglet_products: [shio]
---

Point an AI coding agent at a typical headless CMS and watch the first ten minutes.
It lists content types, guesses at IDs, gets a `400 Bad Request` that says nothing
about what it did wrong, and in the end it can't check its own work without asking
you to open a browser. Those CMSs were built for a person clicking through a web UI,
and the API came later.

[**Viglet Shio**](https://openviglet.github.io/shio/) starts from the agent. Every
capability ships first as an MCP tool, then as files and CLI, then as REST, and only
then in the console. A person can still run all of it from the console; the agent
just doesn't have to.

<!-- truncate -->

## Connect Claude Code in two commands

Shio ships a Claude Code plugin and an MCP server:

```bash
claude plugin marketplace add openviglet/shio
claude plugin install shio
```

Point it at your instance with `SHIO_URL`, `SHIO_USER` and `SHIO_PASSWORD`. No
plugin? The CLI works as an stdio MCP bridge on its own:

```bash
claude mcp add shio -- npx -y @viglet/shio mcp
```

To try it locally, one container is enough:

```bash
docker run -p 2710:2710 -e SHIO_ADMIN_PASSWORD=shio123 ghcr.io/openviglet/shio-ce:latest
```

## What the agent gets

- **12 MCP tools**: `shio_context` answers "what is in this CMS" in one call, then
  `shio_find`, `shio_read`, `shio_write`, `shio_apply`, `shio_publish`,
  `shio_verify` and the rest do the work.
- **Content as files**: `npx @viglet/shio pull` projects the site to Markdown with
  front matter, and a three-way merge brings edits back. `Edit`, `Write` and
  `Grep`, the cheapest tools an agent has, are all it needs to author.
- **Errors that teach**: every 4xx carries `fix`, `allowed`, `didYouMean` and
  `example`, so a wrong call is followed by a right one instead of a guess.
- **A token budget in CI**: response sizes are measured, and a regression fails the
  build like any other test.

Shio itself hosts no model and no prompts. It works with any MCP-capable agent,
Claude Code being the one with a first-party plugin.

## What the curator keeps

Letting an agent write content is only safe if a person still decides what goes
live. In Shio, writes are drafts by default, publishing is an explicit step, and
every agent change lands in a review queue with attribution. The curator reviews in
a React console with a Universal Editor and preview links.

## And the front end

Content goes out through a Content Delivery API (REST and GraphQL) with
dependency-free TypeScript SDKs, to Next.js, Astro, Vue, Svelte or anything else.
Or let Shio render the pages itself. To start a Next.js site wired to it:

```bash
npm create @viglet/shio-app@latest my-site
```

## Next steps

- 📘 [Shio with Claude Code](https://openviglet.github.io/shio/claude-code/)
- 📗 [How Shio compares to Contentful, Sanity, Strapi and WordPress](https://openviglet.github.io/shio/compare/)
- ⭐ [Shio on GitHub](https://github.com/openviglet/shio) (Apache 2.0)

*Viglet Shio is an open source, agent-ready CMS: people run it from the console, AI
agents run it over MCP, and the curator approves what goes live.*
