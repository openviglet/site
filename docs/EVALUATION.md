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

## Routing check, 7 November 2026

The published revision b2dd1dc was deployed by GitHub Actions at 20:49 UTC.
A fresh Chrome profile on the published site sent each of the four journey
events to both G-SMSL7R3897 and G-Y2ZJHV209D. The Admin API confirms both streams
belong to property 506977335. This is duplicate destination routing; it is not
evidence of two independent visitor actions.

W67 pins custom events to G-SMSL7R3897 with the documented
[send_to control](https://developers.google.com/tag-platform/gtagjs/routing).
The local static export, using the real Google tag, sent each action once to
that stream. Collector responses were HTTP 204. Only the allowlisted custom
parameters product, journey and placement were present on those actions.
Denied consent loaded no tag and sent no requests. Withdrawal suppressed later
requests, and product navigation still worked with the loader blocked. Static
and server builds passed. This does not validate the corrected production
revision; W55 must repeat the test after publication. Google-managed automatic
page views and outbound-click events still use the connected destinations and
must not be substituted for the four explicit journey actions.

Test sessions used utm_source=viglet-w55-internal, utm_medium=qa and
utm_campaign=w55-20261107. Exclude that source/campaign and localhost from any
analysis. Treat 7 November as a calibration day, excluded from the outcome
window; no counts from these sessions represent adoption. No contact inquiry
was submitted, and no account destination settings were changed.

## GA dimension registration

On 7 November the Admin API returned no custom definitions for property
506977335, and Data API metadata exposed no custom dimensions. The existing
service account can read the property but its attempt to create the product
definition returned HTTP 403 (caller does not have permission). No definition
was created, and no permissions were changed.

A property Editor must create these event-scoped custom dimensions under
Admin > Data display > Custom definitions, using the exact event parameter names:

| Display name | Event parameter | Scope |
|---|---|---|
| Viglet product | product | Event |
| Viglet journey | journey | Event |
| Viglet placement | placement | Event |

After creation, record the activation date and confirm that the Data API exposes
customEvent:product, customEvent:journey and customEvent:placement. W68 remains
pending that account action and propagation. Do not reconstruct missing historical
values or start a segmented outcome window before the definitions are usable.

## Production verification checkpoint

W55 remains incomplete. The production browser checks established denied and
withdrawn consent suppression and exposed the duplicate routing fixed by W67.
The queried GA realtime report showed product_open and setup_guide_open once
per stream, but did not establish receipt of all four controlled test actions.
HTTP 204 collector responses alone are not sufficient account-side proof.

Resume W55 after publishing W67 and completing W68. Use a fresh, labelled test
session, check all four actions in the property, inspect their registered
dimensions, verify single delivery and the consent cases again, and record the
verified revision and timestamp. Exclude the calibration sessions from reports.
The first usable outcome day is the first full day after this verification and
dimension availability, rather than the original site's publication date.
