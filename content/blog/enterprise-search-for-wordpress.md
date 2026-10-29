---
date: 2026-06-22
slug: enterprise-search-for-wordpress
title: "Adding Enterprise Search to WordPress with Viglet Turing"
description: "Index WordPress posts, pages, and custom post types into an open-source enterprise search engine with faceted navigation and semantic search: a self-hosted alternative to Algolia and ElasticPress."
authors: [alexandre]
tags: [wordpress, enterprise-search, semantic-search, open-source]
keywords:
  - enterprise search for WordPress
  - WordPress search plugin
  - WordPress faceted search
  - open source alternative to Algolia WordPress
  - WordPress semantic search
  - self-hosted WordPress search
viglet_products: [turing, dumont]
---

WordPress ships with a built-in search that runs a `LIKE` query against the
posts table. It works for a handful of posts, but on a real content site it
has no relevance ranking, no facets, no typo tolerance, no autocomplete, and it
slows down as your database grows. Most teams reach for a SaaS layer
(**Algolia**, **ElasticPress + hosted Elasticsearch**) and start paying per
record and per query.

This guide shows the open-source alternative: indexing WordPress into
[**Viglet Turing**](https://www.viglet.org/turing/), an Apache-2.0 enterprise
search platform you self-host, with faceted search, semantic navigation, and
generative AI (RAG), and your content staying on your own infrastructure.

<!-- truncate -->

## The connector is a WordPress plugin, not a Java service

The [Adobe AEM connector](https://openviglet.github.io/dumont/docs/connectors/aem/) is a Java plugin loaded into
the Viglet Dumont process. The WordPress connector works differently: it is a
**PHP plugin you install directly inside WordPress**. It talks to Turing over
HTTP, so there is no separate connector JAR to run.

![Diagram: The connector is a WordPress plugin, not a Java service](/blog/diagrams/enterprise-search-for-wordpress.svg)

Indexing follows your edits, without making editors wait on Turing:

| WordPress event | What happens |
|---|---|
| Post/page published or updated | Queued, then sent to Turing |
| Content trashed, deleted or unpublished | Queued, then removed from the index |

A save only queues the post. A worker (WP-Cron, or `wp dumont queue run`) sends the
queue in batches and retries with backoff when Turing is unreachable, so an outage never
blocks the editor or drops a change. For the first load, the Setup page (or
`wp dumont index`) indexes everything already published.

## Step 1: Run Turing

The fastest path is Docker:

```bash
docker pull ghcr.io/openviglet/turing-ce:latest
docker run -p 2700:2700 ghcr.io/openviglet/turing-ce:latest
```

Open `http://localhost:2700/console`, set the admin password on first run, and
create a **Semantic Navigation (SN) Site**. This is the index your WordPress
content will land in.

## Step 2: Install the WordPress plugin

Download `viglet-dumont-<version>.zip` from the
[Dumont releases](https://github.com/openviglet/dumont/releases) and upload it under
**Plugins → Add New → Upload Plugin** (or install it with Composer or WP-CLI, see the
[reference](https://openviglet.github.io/dumont/docs/connectors/wordpress/#install)). Then activate it.

## Step 3: Connect to Turing

Open **Viglet Dumont → Setup** and enter the Turing URL (for example
`http://localhost:2700`), an API token from the Turing console, and the SN site name.
**Save and test the connection** checks the address, the network, that it is a Turing,
the key and the SN site. If one fails, it says which. If the SN site does not exist yet,
it offers to create it. Then **Index everything now** loads your published content.

On a container deploy, the same settings can come from environment variables
(`VIGLET_DUMONT_TURING_URL`, `VIGLET_DUMONT_TURING_SITE`,
`VIGLET_DUMONT_TURING_API_KEY`), so the site comes up configured and the key never lands
in the database.

## What gets indexed

Each post becomes one document: title, rendered text, abstract, URL, type, author,
publication and modification dates, image, and its categories and tags.

The **Fields** page goes further. Per post type, it turns your custom taxonomies and
custom fields into typed Turing fields (dates, numbers, booleans, multi-valued strings)
and marks the ones to filter by as facets. Saving sends those fields to Turing, so facets
need no console step, and the page shows what a real post sends. With nothing configured,
every public custom taxonomy already becomes a facet.

### Several sites, one search

Every document id starts with a **site key** (the site's address by default), and each
document carries it as a facet. Several WordPress sites, or every blog of a multisite
network, can publish into one SN site for a unified search, without overwriting each
other.

## Step 4: Query it

Your WordPress content is now searchable through the Turing API, via REST,
GraphQL, or the SDK:

```bash
# Faceted search
curl "http://localhost:2700/api/sn/wp-search/search?q=tutorial&rows=10&_setlocale=en_US"

# Autocomplete
curl "http://localhost:2700/api/sn/wp-search/ac?q=tut&_setlocale=en_US"
```

You rarely need to, though. Turn on **Replace WordPress search with Turing** and your
theme's own search page shows Turing's ranking, with the theme's header, footer and
styles intact. Or drop the **Turing search** block on any page: it gives you suggestions
as you type, "did you mean", facets and pages, built on Turing's JS SDK, which the plugin
also exposes to your theme as a script module.

## Step 5 (optional): Conversational answers (RAG)

Because Turing already holds your WordPress content, turning on **RAG** gives
you grounded AI answers with citations over your own posts, with the LLM of your
choice (OpenAI, Ollama, Anthropic, Gemini):

```bash
curl "http://localhost:2700/api/sn/wp-search/chat?q=How+do+I+reset+my+password"
```

## Why open-source for WordPress search?

- **Your content stays in your infrastructure**: no per-record SaaS pricing,
  no data egress.
- **Taxonomies and custom fields → typed facets**, provisioned for you, with a
  queue that keeps indexing in step with your edits through Turing outages.
- **Search + semantic + RAG in one platform** under Apache 2.0.

## Next steps

- 📘 [WordPress Connector: full reference](https://openviglet.github.io/dumont/docs/connectors/wordpress/)
- 📗 [Semantic Navigation](https://openviglet.github.io/turing/docs/semantic-navigation/) and [RAG](https://openviglet.github.io/turing/docs/rag/) guides
- 📙 [How to add enterprise search to Adobe AEM](/blog/enterprise-search-for-adobe-aem/), the same approach for the other major CMS
- ⭐ [Star Turing on GitHub](https://github.com/openviglet/turing)
- 💬 [Ask in GitHub Discussions](https://github.com/openviglet/turing/discussions)

*Viglet Turing is open-source (Apache 2.0) enterprise search with semantic
navigation and generative AI. Self-host it, index WordPress, Adobe AEM,
databases, file systems, and web content, and own your search stack end to end.*
