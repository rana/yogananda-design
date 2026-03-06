# Yogananda Design Languages — AI Context

## What This Repo Is

The canonical visual design language for the Yogananda digital ecosystem. Two organizational expressions — SRF (Self-Realization Fellowship) and YSS (Yogoda Satsanga Society) — sharing common foundations.

**Primary consumer: AI.** This repo is built for AI designers (Claude, Copilot, Cursor, v0) generating UX for any Yogananda ecosystem surface. Every token is self-documenting. Every constraint is machine-readable. Every pattern is implementation-agnostic.

**Secondary consumer: Human designers.** Tokens use the W3C Design Tokens Community Group (DTCG) format, compatible with Style Dictionary, Tokens Studio, and Figma Variables.

## Repo Principles

1. **Tokens are self-documenting.** Every token carries `$description` and `$extensions` with rationale, governing principle, and evaluation trigger. No external cross-reference needed.
2. **Constraints are first-class.** What's forbidden matters as much as what's allowed. The calm technology rules, the forbidden patterns — these are structured data, not comments.
3. **Intent over implementation.** Describe *what* and *why*, never *how*. No framework-specific code (React, Vue, Tailwind config, Swift). CSS custom properties and utility classes are the web platform's native token expression — they live in `css/` alongside DTCG JSON as a canonical format, not below it.
4. **Organization-aware.** SRF and YSS are distinct expressions of shared foundations. Neither is a "skin" of the other — each has its own aesthetic tradition, metaphor, and cultural context.
5. **AI-first authorship.** Structured for machine consumption, readable by humans. Dense JSON with rich descriptions beats sprawling documentation.
6. **Standard format.** W3C DTCG for quantifiable tokens. Custom structured JSON for semantic rules and composition patterns. Both self-describing.
7. **Visual language only.** Every file must pass: *"Does this change how something looks, feels, or moves?"* Content selection algorithms, editorial taxonomy, search behavior, URL routing, and backend data models belong in the consuming portal — not the design system. The design system defines the visual treatment; consumers own the product logic that triggers it.

## Three-Layer Architecture

**Layer 1: Foundations** (`foundations/*.tokens.json`) — W3C DTCG format
Quantifiable design tokens: colors, typography, spacing, duration, shadows. Organization-specific files (SRF, YSS) plus shared foundations. Locale overrides for script-specific typography.

**Layer 2: Semantics** (`semantics/*.language.json`) — Custom format
Design language rules: emotional registers (with rasa experiential dimension), attention gradients (three accent voices), calm technology constraints, aesthetic theory (governing principles from the Indian literary tradition), accessibility requirements, typographic conventions, photographic atmosphere, multi-script visual adaptation, responsive strategy, stewardship (operational surface vocabulary). References Layer 1 tokens by name.

**Layer 3: Patterns** (`patterns/*.pattern.json`) — Custom format
Composition recipes: pre-composed molecules (passage card, search result, chapter transition, paginated book). Named combinations of Layer 1 tokens governed by Layer 2 semantics. Implementation-agnostic.

**Web Expression** (`css/`) — Pure CSS
The design language expressed as CSS custom properties, utility classes, and composition patterns. Framework-agnostic — works with any web technology. Two entry points:
- `css/index.css` — Complete design language (foundations + themes + typography + calm + attention)
- `css/reading.css` — Everything above + reading surface patterns (dwell, focus, present, print, preferences)

Structure mirrors the three-layer architecture:
```
css/
  foundations.css           ← Layer 1: All custom properties
  themes/srf.css           ← Themes: sepia, earth, dark, meditate, gathering, auto
  themes/yss.css           ← Themes: ashram, sandstone, night, devotion + org overrides
  themes/high-contrast.css ← Accessibility: prefers-contrast overrides
  typography/fonts.css     ← @font-face: Latin, Devanagari, devotional (7 families)
  typography/classes.css   ← .reading-text, .display-text, .ui-text + Hindi + communal
  typography/features.css  ← .drop-cap, .reader-epigraph, .reader-citation, .book-figure, .reader-scene-break, .reader-verse
  calm.css                 ← Layer 2: Focus rings, reduced-motion, text-only, sr-only
  attention.css            ← Layer 2: Gold/ochre/crimson at named attention levels
  registers.css            ← Layer 2: Emotional register voice overrides (communal)
  motifs.css               ← Motif system: botanical glyphs × 5 color voices, mask-image
  patterns/reading-surface.css  ← Layer 3: Dwell, focus, present, quiet, golden thread
  patterns/print.css            ← Layer 3: Print stylesheet
  patterns/preferences.css      ← Layer 3: Font size, line spacing user preferences
  patterns/atmosphere.css       ← Layer 3: Optional photographic atmosphere (opt-in)
  patterns/stewardship.css      ← Layer 3: Stewardship vocabulary + IBM Plex Mono (opt-in)
  index.css                ← Bundle: all core files
  reading.css              ← Bundle: core + reading patterns
```

## When to Load What

### For AI reading design intent (JSON):

| Task | Load these files |
|------|-----------------|
| **Any UX work** | `foundations/shared.tokens.json` + organization file (SRF or YSS) + `semantics/calm-technology.language.json` + `semantics/aesthetic-theory.language.json` |
| **Building a reading surface** | + `semantics/emotional-registers.language.json` + `semantics/typography.language.json` + `patterns/reading-surface.pattern.json` |
| **Building search UI** | + `patterns/search.pattern.json` + `semantics/attention-gradient.language.json` |
| **Building navigation** | + `patterns/navigation.pattern.json` + `patterns/transitions.pattern.json` |
| **Building multi-script UI** | + `semantics/localization.language.json` + `semantics/typography.language.json` |
| **Building for Hindi/Devanagari** | + `foundations/locale/hi.tokens.json` + `semantics/typography.language.json` |
| **Building for YSS** | Use `foundations/yss.tokens.json` instead of SRF. Same shared + semantics + patterns. |
| **Responsive design decisions** | + `semantics/responsive-strategy.language.json` |
| **Validating a component** | `semantics/calm-technology.language.json` (check forbidden list) + `semantics/accessibility.language.json` |
| **Building contemplative UI** | + `patterns/contemplation.pattern.json` |
| **Adding photographic atmosphere** | + `semantics/atmosphere.language.json` + `brand/image-guidelines.json` |
| **Choosing an icon or motif** | `motifs/srf/glyphs.json` + `css/motifs.css` + `motifs/srf/` or `motifs/yss/` + `brand/image-guidelines.json` |
| **Understanding the brand** | `brand/image-guidelines.json` + organization token file `$description` fields |
| **Generating PDF output** | + `patterns/paginated.pattern.json` + `semantics/typography.language.json` + `semantics/attention-gradient.language.json` |
| **Building operational surfaces** | + `semantics/stewardship.language.json` + `semantics/attention-gradient.language.json` |

### For web surfaces consuming CSS:

| Surface type | CSS import |
|-------------|-----------|
| **Any web surface** | `css/index.css` (or selectively import individual files) |
| **Reading surface** (teachings, reader) | `css/reading.css` (includes all patterns) |
| **Non-reading surface** (dashboard, admin) | `css/index.css` (no reading patterns) |
| **SRF surface** | Default — no extra import needed |
| **YSS surface** | Same imports + set `data-org="yss"` on `<html>` |
| **Surface with photographs** | + `css/patterns/atmosphere.css` (opt-in, not in bundles) |
| **Operational surface** (platform, dashboard) | + `css/patterns/stewardship.css` (opt-in, not in bundles) |

## File Format Reference

### DTCG Tokens (`.tokens.json`)

```json
{
  "token-name": {
    "$value": "#dcbd23",
    "$type": "color",
    "$description": "What this token means and when to use it.",
    "$extensions": {
      "org.yogananda.design": {
        "principle": "PRI-03",
        "rationale": "Why this specific value was chosen.",
        "evaluationTrigger": "When to reconsider this value."
      }
    }
  }
}
```

- `$value` — The token value (type-specific format)
- `$type` — DTCG type: `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `number`, `typography`, `border`, `transition`, `shadow`
- `$description` — Always present. Rich enough for AI to understand intent.
- `$extensions.org.yogananda.design` — Project-specific metadata: governing principle, rationale, ADR reference, evaluation trigger

### Semantic Language (`.language.json`)

Custom format for rules, constraints, and mappings. Each file is self-describing via a top-level `$description`. AI reads the structure and applies rules; no schema needed beyond the descriptions.

### Composition Patterns (`.pattern.json`)

Named compositions referencing foundation tokens. Format: `{ "pattern-name": { "description": "...", "tokens": { role: "token.path" }, "rules": [...] } }`. Implementation-agnostic — translate to CSS, React, Swift, PDF as needed.

## Ecosystem Context

This design system serves the **Yogananda digital ecosystem**:

- **yogananda-teachings** (portal) — SRF design language. The reading room. First and primary consumer.
- **yogananda-platform** — Infrastructure dashboard. Lighter brand touch.
- **YSS surface** — YSS design language. The ashram. Second consumer.
- **PDF generation** (FTR-030) — Paginated pattern (`patterns/paginated.pattern.json`) for books, chapters, and contemplation cards. The design language's native medium.
- **Any future Yogananda digital property** — the design language, not any single site.

## Sibling Repos

- `yogananda-teachings` — The SRF portal (Next.js). Primary consumer of SRF tokens.
- `yogananda-platform` — Infrastructure and deployment platform.
- `yogananda-skills` — Claude cognitive toolkit (analysis skills, commands).

## Consumer Cross-References

Identifiers in this repo that consuming portals depend on (the design system's downstream contracts):

| Identifier | Topic | Consumed By |
|-----------|-------|------------|
| **PRI-05** | Global-first (2G connections work) | yogananda-teachings FTR-095, FTR-096 |
| **PRI-07** | WCAG 2.1 AA minimums | yogananda-teachings FTR-043 |
| **PRI-08** | Calm technology | yogananda-teachings FTR-056, reading surfaces |
| **FTR-006** | Text-only mode for low-bandwidth | yogananda-teachings FTR-022, FTR-044 |
| **FTR-131** | Devanagari typography (no drop-caps) | yogananda-teachings FTR-058 |
| **FTR-085** | Self-hosted fonts (GDPR) | yogananda-teachings font loading |

**Identifier scope:** This repo owns visual design identifiers (PRI principles, ADR design decisions). Consuming portals own their own product identifiers (DES features, ADR implementation decisions). Namespaces are intentionally separate — the design system is a dependency, not a co-owner.

## Content Type Contract

The CSS layer responds to these `data-content-type` attribute values on reading surface elements. This is the closed vocabulary that consuming portals must use:

| Content Type | CSS Class | Visual Treatment |
|-------------|-----------|-----------------|
| `prose` | (default `<p>`) | Standard reading text — no special class needed |
| `verse` | `.reader-verse` | Centered, italic, pre-line whitespace, generous margin |
| `epigraph` | `.reader-epigraph` | Centered italic with decorative gold quotation mark |
| `caption` | `.book-caption` | Italic, secondary color, constrained width |
| `dialogue` | `.reader-dialogue` | Tighter vertical rhythm, no drop-cap |

Scene breaks are structural (`.reader-scene-break` on `<hr>`), not content-typed. The vocabulary loop: extraction → assembly → Contentful → Neon → `data-content-type` → CSS class → visual treatment.

## Showcase Website

This repo includes an interactive showcase site (`app/`) built with Next.js that demonstrates the design language live. The showcase is the first consumer of the `css/` layer — it imports `css/index.css` and adds only its own application chrome.

**When any token file changes, update both the CSS layer and the showcase:**
- `foundations/*.tokens.json` changes → update `css/foundations.css` (custom properties), `lib/tokens.ts` (typed access), and showcase components
- `semantics/*.language.json` changes → update relevant `css/` files + showcase sections
- New themes → add to the appropriate `css/themes/*.css` file, add to `DesignProvider.tsx` theme lists, add theme card in `ThemeGallery.tsx`
- New organization → add to `css/themes/` with org overrides, add to `DesignProvider.tsx` Org type, update org-aware components

The showcase uses a `DesignProvider` React context (`app/components/DesignProvider.tsx`) that manages organization (SRF/YSS) and theme state via `data-org` and `data-theme` attributes on `<html>`. All components consume this context via `useDesign()`.

## Copyright and Licensing

- **Design tokens, patterns, and semantic rules**: Open (MIT license with this repo).
- **SRF photographs and copyrighted images**: NOT included in this repo. SRF holds copyright. See `brand/image-guidelines.json` for usage rules and authorized sources.
- **Font files**: Licensed under SIL Open Font License (OFL). See individual font licenses.
- **Lotus SVG motif**: Original work for this project. Included in `motifs/srf/`.
