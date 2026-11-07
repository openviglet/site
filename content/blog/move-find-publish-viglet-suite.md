---
date: 2026-11-24
draft: true
slug: move-find-publish-viglet-suite
title: "Move It, Find It, Publish It: How Viglet Dumont, Viglet Turing and Viglet Shio Fit Together"
description: "The Viglet suite is three open source products that each do one step of a content platform: Viglet Dumont moves content in from your sources, Viglet Turing makes it searchable and answerable with AI, and Viglet Shio publishes it. Use one or chain all three."
authors: [alexandre]
tags: [enterprise-search, cms, data-integration, open-source]
keywords:
  - open source content platform
  - enterprise search and CMS
  - open source DXP alternative
  - self-hosted search and CMS
  - Viglet suite
viglet_products: [dumont, turing, shio]
---

Most content platforms come as one product you buy whole. The Viglet suite is three
open source products, each doing one step, each usable without the others:

- **Move it**: [Viglet Dumont](https://dumont.viglet.org/) brings content
  in from the systems you already have.
- **Find it**: [Viglet Turing](https://turing.viglet.org/) makes it
  searchable, and answerable with AI.
- **Publish it**: [Viglet Shio](https://shio.viglet.org/) is the CMS that
  people and AI agents publish from.

All three are Apache 2.0 and self-hosted.

<!-- truncate -->

## Move it: Viglet Dumont

Your content already lives somewhere: Adobe AEM, a database, a file
share, a set of sites. Viglet Dumont reads those sources and keeps their content indexed,
including the hard part of noticing changed and removed pages. It delivers to Viglet Turing
by default, or to your own Apache Solr or Elasticsearch, so you can use it without
the rest of the suite.

More in [Keeping a search index in step with Adobe AEM](/blog/keep-search-index-in-sync-with-aem/).

## Find it: Viglet Turing

Viglet Turing is the enterprise search platform on top: faceted and semantic search,
multi-language, RAG chat with citations using the LLM you choose, and AI agents that
can call external MCP servers. It runs on Solr, Elasticsearch or an embedded Lucene
engine, so the engine choice isn't a lock-in.

More in [RAG over enterprise content with Viglet Turing and MCP](/blog/rag-enterprise-content-turing-mcp/).

## Publish it: Viglet Shio

Viglet Shio is the CMS. Curators work in a React console; AI coding agents such as Claude
Code work over MCP and content-as-files; front ends read a REST and GraphQL delivery
API. A published Viglet Shio post can also go to Viglet Turing as a search document, with the
fields a post-type declares as indexed sent in a typed field of their own, so a
facet like "price under 5000" works without configuring the schema twice.

More in [Run your CMS from Claude Code](/blog/run-your-cms-from-claude-code-shio/).

## Three ways to use it

1. **Search for a site you already have.** Viglet Dumont plus Viglet Turing: keep your CMS, add
   search and an AI chat over its content.
2. **A new site with search built in.** Viglet Shio plus Viglet Turing: publish in Viglet Shio, search
   in Viglet Turing.
3. **One product on its own.** Viglet Dumont into your Solr, Viglet Turing with its own
   connectors, or Viglet Shio as a headless CMS.

## Next steps

- ⭐ [Viglet Turing](https://github.com/openviglet/turing) · [Viglet Dumont](https://github.com/openviglet/dumont) · [Viglet Shio](https://github.com/openviglet/shio) on GitHub
- 📘 [All Viglet guides](/blog/)

*Viglet builds open source, self-hosted software for content: Viglet Dumont moves it,
Viglet Turing finds it, Viglet Shio publishes it.*
