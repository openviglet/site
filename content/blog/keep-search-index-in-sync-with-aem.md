---
date: 2026-11-10
draft: true
slug: keep-search-index-in-sync-with-aem
title: "Keeping a Search Index in Step with Adobe AEM, Without Losing Pages"
description: "Indexing AEM once is easy; keeping the index right as pages change, move and disappear is the hard part. How Viglet Dumont tracks every document, flags drift and never de-indexes on a single missed pass."
authors: [alexandre]
tags: [aem, data-integration, enterprise-search, open-source]
keywords:
  - AEM search index sync
  - AEM indexing
  - AEM as a Cloud Service search
  - AEM to Solr
  - AEM to Elasticsearch
  - search index drift
viglet_products: [dumont, turing]
---

Getting content from Adobe AEM into a search index the first time is a weekend
project. Keeping it right is the real work: new pages have to show up, changed pages
have to be updated, removed pages have to go, and nobody notices when one of those
quietly stops happening. The usual symptom is a search result that leads to a 404,
or a page everyone can see on the site and nobody can find.

[**Viglet Dumont**](https://openviglet.github.io/dumont/) is the open source
connector layer of the Viglet suite. It reads AEM, WordPress, databases, files and
web sites, and keeps their content indexed in Viglet Turing, Apache Solr or
Elasticsearch. This post is about the second half of that sentence: *keeps*.

<!-- truncate -->

## Read AEM the way your tier allows

Each source picks the tier it reads. On-premise and AMS use the author servlets
(`infinity.json`, QueryBuilder). AEM as a Cloud Service, where those aren't served,
uses the publish delivery APIs (`model.json`). Extraction is declared per content
type, and a recipe can be versioned and shared across sites.

The target is one setting:

```yaml
dumont:
  indexing:
    provider: turing  # or solr, elasticsearch
```

## A successful run is not a correct index

A job that ends with "success" tells you it ran. It doesn't tell you the index is
right. Dumont checks the index itself:

- **Per-field coverage between runs.** If a selector stops matching after a layout
  change, the run raises a drift flag naming the field, instead of indexing pages
  with an empty summary.
- **Provenance.** Every published field carries where its value came from.
- **An indexing log.** Every status a document passed through is recorded,
  attributed to the source and the run, and you can query it by either.

## Never de-index on a guess

The expensive mistake is removing live pages because one crawl failed to reach
them. Dumont doesn't do that. An incomplete run never de-indexes what it didn't
reach. A scheduled audit compares the source, the connector's ledger and the index:
documents that never landed or went stale are requeued, and a document still
indexed after leaving the source goes into a dated report that you review and
apply.

The same rule covers failures. A store that can't be reached answers `503` rather
than an empty page, and a row it won't accept is reported, not dropped.

## Try a dry run first

Point the onboarding wizard at a URL and Dumont infers the source's shape and a
field manifest for you to correct. A dry run then shows what indexing *would*
produce, with per-field coverage, the records it would skip and a diff against the
last run, and writes nothing. Only a draft you confirm gets indexed.

## Next steps

- 📘 [Dumont documentation](https://openviglet.github.io/dumont/docs/)
- 📗 [Enterprise search for Adobe AEM](/blog/enterprise-search-for-adobe-aem/), the search side with Turing
- ⭐ [Dumont on GitHub](https://github.com/openviglet/dumont) (Apache 2.0)

*Viglet Dumont is an open source data exchange platform: it connects AEM, WordPress,
databases, files and web sites to Viglet Turing, Solr or Elasticsearch, and keeps
the index in step with the source.*
