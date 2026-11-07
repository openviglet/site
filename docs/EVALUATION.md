# Evaluating the product journeys

The hub uses Google Analytics only after analytics consent. Custom events describe
navigation intent. They do not establish an installation, a submitted form or a sale.

| Event | What happened |
|---|---|
| `demo_open` | A visitor followed an explicit demo link. |
| `setup_guide_open` | A visitor opened a setup or integration guide, or the docs chooser. |
| `product_open` | A visitor followed a product evaluation link. |
| `contact_intent` | A visitor followed a link to the contact page. |

Custom parameters are allowlisted product, journey and placement identifiers. They
contain no form fields, search text, arbitrary URLs or link text. The underlying GA
page and session collection remains governed by the existing consent choice. Clicks
made before consent are dropped; withdrawing consent disables subsequent collection.

After publication, verify the events with a consented test session and exclude that
session from the evaluation. Compare absolute counts over the same date range with
Search Console clicks and impressions for AEM and the relevant published guides.
Treat the consented sample as incomplete, not as total site traffic. Keep the
October 2026 observations as historical context, not a current baseline.

Review actual inquiries separately to learn whether visitors need implementation,
support or a different product. Do not label a contact-page click a qualified lead.
Use aggregate counts and anonymized observations in the visibility review; do not
copy message contents into analytics. With sparse traffic, prefer these observations
to an A/B test or a claimed conversion uplift.

The code's checks cover consent and event payloads. Live event delivery, browser
rendering and conversion outcomes need verification in the deployed environment.
