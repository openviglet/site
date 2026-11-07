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
viglet_products: [turing]
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
generative AI (RAG). You control the application and index; model and embedding
configuration determines where AI processing happens.

<!-- truncate -->

## The connector is a WordPress plugin, not a Java service

**Viglet Turing Search** is a **PHP plugin you install directly inside WordPress**.
It connects WordPress and WooCommerce directly to Viglet Turing over HTTP. It is supplied
by Viglet Turing and does not require a Viglet Dumont process.

See [Viglet Turing for WordPress](https://turing.viglet.org/wordpress/) or
[try the demo store](https://turing.viglet.org/wp-demo/) before installing.

![Diagram: The connector is a WordPress plugin, not a Java service](/blog/diagrams/enterprise-search-for-wordpress.svg)

Indexing follows your edits, without making editors wait on Viglet Turing:

| WordPress event | What happens |
|---|---|
| Post/page published or updated | Queued, then sent to Viglet Turing |
| Content trashed, deleted or unpublished | Queued, then removed from the index |

A save only queues the post. A worker (WP-Cron, or `wp turing queue run`) sends the
queue in batches and retries with backoff when Viglet Turing is unreachable, so an outage never
blocks the editor or drops a change. For the first load, the Setup page (or
`wp turing index`) indexes everything already published.

## Step 1: Run Viglet Turing

The fastest path is Docker:

```bash
docker pull ghcr.io/openviglet/turing:latest
docker run -p 2700:2700 ghcr.io/openviglet/turing:latest
```

Open `http://localhost:2700/console`, set the admin password on first run, and
create a **Semantic Navigation (SN) Site**. This is the index your WordPress
content will land in.

## Step 2: Install the WordPress plugin

Follow the [Viglet Turing WordPress installation reference](https://turing.viglet.org/docs/integrations/wordpress/#install)
for the current plugin package and installation methods. Upload the
`viglet-turing-search` plugin ZIP under **Plugins → Add New → Upload Plugin**, then activate it.

## Step 3: Connect to Viglet Turing

Open **Viglet Turing Search → Setup** and enter the Viglet Turing URL (for example
`http://localhost:2700`), an API token from the Viglet Turing console, and the SN site name.
**Save and test the connection** checks the address, the network, that it is a Viglet Turing,
the key and the SN site. If one fails, it says which. If the SN site does not exist yet,
it offers to create it. Then **Index everything now** loads your published content.

On a container deploy, the same settings can come from environment variables
(`VIGLET_TURING_TURING_URL`, `VIGLET_TURING_TURING_SITE`,
`VIGLET_TURING_TURING_API_KEY`), so the site comes up configured and the key never lands
in the database.

## What gets indexed

Each post becomes one document: title, rendered text, abstract, URL, type, author,
publication and modification dates, image, and its categories and tags.

The **Fields** page goes further. Per post type, it turns your custom taxonomies and
custom fields into typed Viglet Turing fields (dates, numbers, booleans, multi-valued strings)
and marks the ones to filter by as facets. Saving sends those fields to Viglet Turing, so facets
need no console step, and the page shows what a real post sends. With nothing configured,
every public custom taxonomy already becomes a facet.

### Several sites, one search

Every document id starts with a **site key** (the site's address by default), and each
document carries it as a facet. Several WordPress sites, or every blog of a multisite
network, can publish into one SN site for a unified search, without overwriting each
other.

## Step 4: Query it

Your WordPress content is now searchable through the Viglet Turing API, via REST,
GraphQL, or the SDK:

```bash
# Faceted search
curl "http://localhost:2700/api/sn/wp-search/search?q=tutorial&rows=10&_setlocale=en_US"

# Autocomplete
curl "http://localhost:2700/api/sn/wp-search/ac?q=tut&_setlocale=en_US"
```

You rarely need to, though. Turn on **Replace WordPress search with Viglet Turing** and your
theme's own search page shows Viglet Turing's ranking, with the theme's header, footer and
styles intact. Or drop the **Viglet Turing search** block on any page: it gives you suggestions
as you type, "did you mean", facets and pages, built on Viglet Turing's JS SDK, which the plugin
also exposes to your theme as a script module.

## Step 5 (optional): Conversational answers (RAG)

Because Viglet Turing already holds your WordPress content, turning on **RAG** gives
you grounded AI answers with citations over your own posts, with the LLM of your
choice (OpenAI, Ollama, Anthropic, Gemini):

```bash
curl "http://localhost:2700/api/sn/wp-search/chat?q=How+do+I+reset+my+password"
```

## Why open-source for WordPress search?

- **You control the application and index**: use local models and embeddings when
  processing must stay inside your infrastructure; external providers receive
  the data needed for enabled requests.
- **Taxonomies and custom fields → typed facets**, provisioned for you, with a
  queue that keeps indexing in step with your edits through Viglet Turing outages.
- **Search + semantic + RAG in one platform** under Apache 2.0.

## Next steps

- 📘 [Viglet Turing WordPress integration: full reference](https://turing.viglet.org/docs/integrations/wordpress/)
- 📗 [Semantic Navigation](https://turing.viglet.org/docs/semantic-navigation/) and [RAG](https://turing.viglet.org/docs/rag/) guides
- 📙 [How to add enterprise search to Adobe AEM](/blog/enterprise-search-for-adobe-aem/), the same approach for the other major CMS
- ⭐ [Star Viglet Turing on GitHub](https://github.com/openviglet/turing)
- 💬 [Ask in GitHub Discussions](https://github.com/openviglet/turing/discussions)

*Viglet Turing is open-source (Apache 2.0) enterprise search with semantic
navigation and generative AI. Self-host it, index WordPress, Adobe AEM,
databases, file systems, and web content, and own your search stack end to end.*
