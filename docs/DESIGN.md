# Site layout conventions

Use the existing Viglet design system, logos and product marks. Page layout must
not introduce another color palette or a separate set of controls.

- `PageHero` owns the standard mark, label, heading scale, width, spacing and
  action placement. `ProductPageHero` supplies product identity to that component
  for overview, installation and release-history routes.
- Informational page headings use the same hero. The homepage may use its
  presentation layout; articles keep a narrower reading measure.
- Use a single main landmark between the shared header and footer. Keep content
  sections within the shared content width (`max-w-5xl`),
  with 24 px side gutters and the common responsive vertical spacing.
- Use adaptive background, card, foreground, muted and border tokens. Product
  marks and accents identify products; body labels must remain readable in both
  themes. Do not use a light-mode accent as dark-mode text without checking it.
- Use the shared button variants for primary and secondary actions. Loading,
  empty and unavailable states retain useful next steps.
- Keep focus visible and preserve keyboard access, native disclosure behavior
  and mobile navigation. Longer names wrap; they are not abbreviated to fit.
- Labels, license details, beta information and article tags use plain typography.
  Do not wrap decorative metadata in capsule borders or filled chips. Interactive
  filters use clear tab-style selection; preserve their accessible state and focus.

The permanent full-product-name rule is in STRATEGY.md section I.7 and AGENTS.md.
Browser evidence and the limits of each verification are in QA-2026-11-07.md.
