# Yogananda Design Language — AI Guide

> For Claude, Copilot, Cursor, v0, and any AI generating UX for the Yogananda ecosystem.
> Copy this file into any consumer project. It is self-contained.

## Soul

This design language serves the published teachings of Paramahansa Yogananda. Every decision traces back to one question: **Is this worthy of presenting the guru's words?**

The portal is a library, not an app. It waits; it does not interrupt. The technology disappears; the teachings remain.

Three commitments shape every surface:
1. **Verbatim fidelity** — The guru's words are never paraphrased, summarized, or generated. AI is a librarian, not an oracle.
2. **Full attribution** — Every passage carries author, book, chapter, page. No orphaned quotes.
3. **Calm technology** — The smallest possible amount of attention. If removing a UI element wouldn't harm the experience, remove it.

---

## For the Architect

You are choosing what to import, how to structure HTML, and which patterns to activate.

### Import Strategy

Two CSS bundles exist. Choose one:

| Bundle | Import | When |
|--------|--------|------|
| **Core** | `css/index.css` | Any surface — navigation, search, settings, events, marketing |
| **Reading** | `css/reading.css` | Surfaces presenting sacred or reverential text (includes core + reading patterns + print + preferences) |

Or import selectively:
```
css/foundations.css          ← always required (all tokens)
css/themes/srf.css           ← SRF themes (or yss.css for YSS)
css/themes/high-contrast.css ← prefers-contrast: more (recommended)
css/typography/fonts.css     ← @font-face declarations
css/typography/classes.css   ← .reading-text, .display-text, etc.
css/typography/features.css  ← drop caps, epigraphs, citations
css/calm.css                 ← reduced motion, focus rings, sr-only
css/attention.css            ← gold/marigold opacity utility classes
css/patterns/reading-surface.css ← scroll indicator, dwell, focus mode
css/patterns/print.css       ← @media print stylesheet
css/patterns/preferences.css ← font size / line spacing user controls
```

### HTML Structure

```html
<html
  data-org="srf"              <!-- "srf" (default) or "yss" -->
  data-theme="light"          <!-- theme name: light, sepia, earth, dark, meditate, gathering -->
  lang="en"                   <!-- language: en, hi, etc. -->
>
```

Every CSS rule resolves against these attributes. Set them on `<html>`, and the entire surface responds.

### Organization Awareness

SRF and YSS are sibling organizations, not skins of each other. When `data-org="yss"`:
- `--color-gold` becomes terracotta (#BB4F27)
- `--font-display` becomes Merienda
- `--font-ui` becomes Raleway
- The contemplative mood shifts from "Pacific coast library" to "Indian ashram courtyard"

The CSS handles all overrides. You set the attribute; the tokens do the rest.

### Forbidden Patterns

These are commitments, not preferences. Never generate:
- Push notifications, autoplay media, or sound without user action
- Gamification (streaks, points, badges, achievements)
- Time-pressure UI (countdowns, "limited time," urgency language)
- Decorative animation (parallax, particles, animated backgrounds)
- Infinite scroll (content has natural endings)
- Skeleton loaders (content is present or honestly absent)
- Social sharing buttons
- Tooltips on sacred text (Yogananda's words stand alone)
- AI-generated or AI-synthesized imagery of the gurus
- Pure white backgrounds on *contemplative reading surfaces* (always warm: #FAF8F5 minimum). Communal voice (gathering) and YSS modern (ashram) use white deliberately.

### Required Patterns

Every surface must include:
- `prefers-reduced-motion: reduce` → all transitions instant (already in `calm.css`)
- `prefers-contrast: more` → pure black/white text (already in `high-contrast.css`)
- `:focus-visible` indicators on all interactive elements (already in `calm.css`)
- Touch targets minimum 44x44px (`--touch-target-min`)
- Logical CSS properties (`inline-start`, `block-end`) for RTL readiness
- Screen reader semantics: ARIA landmarks, heading hierarchy, live regions

---

## For the Designer

You are making aesthetic decisions — choosing registers, voices, colors, and typography for a component or page.

### Two Axes: Voice and Register

Every design decision lives at the intersection of two orthogonal axes:

**Voice** (horizontal — what kind of surface):
- **Contemplative** — The library. Gold accent, navy text, cream background. Merriweather/Lora/Open Sans. For reading, study, meditation, archives.
- **Communal** — The gathering. Marigold accent, charcoal text, white background. ArcherPro/Helvetica Neue. For events, registration, community, outreach.

**Register** (vertical — how much reverence):
- **Sacred** — Yogananda's own words. Maximum reverence. Expansive whitespace, reading typography, no UI overlays on text.
- **Reverential** — SRF/YSS monastic and presidential authors. Deep respect, slightly less ceremonial spacing.
- **Instructional** — Portal-authored guides and editorial. Clear, warm, the librarian speaking.
- **Functional** — Navigation, search, settings. Invisible infrastructure.
- **Ambient** — Scroll indicators, texture overlays, paper warmth. Felt, not seen.

**Critical rule**: Sacred and reverential registers always use reading typography regardless of voice. A Yogananda quote on an event page still gets Merriweather — the voice colors the chrome; the register protects the text.

### Register Selection (decision tree)

1. Is this Yogananda's or a lineage guru's verbatim words? → **sacred**
2. Is this by an SRF/YSS presidential or monastic author? → **reverential**
3. Is this portal-authored content meant to guide? → **instructional**
4. Is this navigation, search, or settings? → **functional**
5. Otherwise → **ambient**

### Attention Hierarchy (gold opacity)

Gold is never arbitrary. It maps to a deliberate hierarchy:

| Level | Opacity | Custom property | Purpose | Examples |
|-------|---------|-----------------|---------|----------|
| Interactive | 1.0 | `--gold-interactive` | Demands attention | Focus rings, active links, CTA accents |
| Decorative | 0.4 | `--gold-decorative` | Beautiful without calling | Epigraph marks, chapter ornaments |
| Ambient | 0.3 | `--gold-ambient` | Peripheral awareness | Scroll progress, meditate-theme gold |
| Highlight | 0.2 | `--gold-highlight` | Guiding, not grabbing | Keyboard-nav paragraph outline |
| Subliminal | 0.06 | `--gold-subliminal` | Felt, not seen | Paragraph hover background |
| Texture | 0.03 | `--gold-texture` | Ghost of physicality | Paper texture noise overlay |

When using marigold (communal voice), the same hierarchy applies via `--marigold-*` properties.

**Rule**: If you're reaching for a gold value, ask which attention level it belongs to. If none fit, the element probably shouldn't be gold.

### Theme Selection

| Theme | Mood | When |
|-------|------|------|
| `light` | Warm library in daylight | Default reading |
| `sepia` | Antique paper, physical book | Readers wanting warmth |
| `earth` | Red clay, Indian warmth | Warm reading, shared with YSS |
| `dark` | Deep navy, SRF-respectful darkness | Evening reading |
| `meditate` | Pre-dawn stillness, gold at 60% | Contemplation |
| `gathering` | Open courtyard, marigold on white | Events and community |

YSS themes: `ashram`, `sandstone`, `night`, `devotion`.

### Color Decisions

- Never use raw hex values. Always reference `var(--color-*)` tokens.
- Never mix voice palettes. Gold + navy = contemplative. Marigold + charcoal = communal. Don't cross them.
- Category colors (teal, indigo, amber) belong exclusively to the communal voice.
- Borders are mostly implied (whitespace, background shifts), not drawn. When drawn, use `var(--color-border)` at default opacity.
- Text hierarchy: primary (full opacity), secondary (`--color-text-secondary` at 70%), and below.

### Motion Decisions

All motion is functional, never decorative.

| Token | Duration | Use |
|-------|----------|-----|
| `--motion-instant` | 0ms | Immediate response |
| `--motion-interaction` | 150ms | Hover, focus, click |
| `--motion-content` | 300ms | Theme switch, panel reveal |
| `--motion-contemplative` | 800ms | Chapter transition, dwell |
| `--motion-arrival` | 1200ms | Portal entry, opening moment |

**Rule**: No transition exceeds 300ms for standard UI. 800ms and 1200ms are reserved for contemplative and arrival moments only.

### Whitespace Decisions

Whitespace is digital silence. The teachings deserve breathing room.

| Token | Size | Use |
|-------|------|-----|
| `--space-tight` | 4px | Inside compact elements |
| `--space-compact` | 8px | Between related items |
| `--space-default` | 16px | Standard spacing |
| `--space-generous` | 24px | Between sections |
| `--space-spacious` | 32px | Larger separations |
| `--space-expansive` | 48px | Between major sections |
| `--space-vast` | 64px | Page-level separation |

**Rule**: When in doubt, use more whitespace, not less. Sacred register should use `--space-expansive` or `--space-vast` between elements.

---

## For the Implementer

You are writing HTML and CSS. Here are the exact classes, properties, and data attributes.

### Typography Classes

```css
/* Reading voice (serif, warm, immersive) */
.reading-text      /* Merriweather 400, 18px, 1.8 line-height */
.display-text      /* Lora 700, 1.3 line-height — chapter titles */
.citation-text     /* Merriweather 300, 14px — "— Author, Book" */

/* UI voice (sans, neutral, invisible) */
.ui-text           /* Open Sans 400, 14px */

/* Hindi */
.reading-text-hi   /* Noto Serif Devanagari 400, 20px, 1.9 */
.display-text-hi   /* Noto Serif Devanagari 700, 1.4 — Hindi headings */
.ui-text-hi        /* Noto Sans Devanagari 400, 15px */

/* Devotional display */
.display-inspirational-text  /* Asar 400, 22px — the inscription voice */

/* Communal voice */
.display-event-text  /* ArcherPro 500 — event headings (system font) */
.ui-event-text       /* Helvetica Neue 375 — event chrome (system font) */
```

### Typographic Features

```css
.drop-cap          /* 3.5em initial letter, Merriweather 700 */
.small-caps        /* font-variant: small-caps, 0.05em spacing */
.reader-content    /* hanging-punctuation: first allow-end */
.reader-epigraph   /* Italic, centered, gold quotation mark */
.reader-citation   /* Em-dash prefix citation format */
.reader-scene-break /* Swelled-rule section divider (gold gradient taper) */
.reader-verse      /* Verse block — preserved line breaks, centered, italic */
```

### Attention Utility Classes

```css
/* Gold hierarchy */
.gold-interactive  /* opacity: 1.0 */
.gold-decorative   /* opacity: 0.4 */
.gold-ambient      /* opacity: 0.3 */
.gold-highlight    /* opacity: 0.2 */
.gold-subliminal   /* opacity: 0.06 */

/* Crimson hierarchy (publication overlay — data-publication) */
.crimson-interactive  /* opacity: 1.0 — chapter titles, labels */
.crimson-decorative   /* opacity: 0.4 — drop caps, ornamental marks */
.crimson-ambient      /* opacity: 0.25 — book progress, TOC markers */
.crimson-highlight    /* opacity: 0.15 — chapter nav hover */
.crimson-subliminal   /* opacity: 0.06 — faint publication warmth */

/* Marigold hierarchy */
.marigold-interactive  /* opacity: 1.0 */
.marigold-decorative   /* opacity: 0.4 */
.marigold-ambient      /* opacity: 0.2 */
.marigold-subliminal   /* opacity: 0.06 */
```

### Custom Properties Reference

All properties live on `:root` via `foundations.css`. Reference them with `var(--name)`.

**Colors**: `--color-bg`, `--color-bg-secondary`, `--color-text`, `--color-text-secondary`, `--color-border`, `--color-gold`, `--color-surface`, `--color-navy`, `--color-cream`, `--color-marigold`, `--color-marigold-hover`, `--color-marigold-light`, `--color-charcoal`, `--color-border-neutral`, `--color-gold-dark`

**Category**: `--color-category-teal`, `--color-category-indigo`, `--color-category-amber`

**Spacing**: `--space-tight` (4px), `--space-compact` (8px), `--space-default` (16px), `--space-generous` (24px), `--space-spacious` (32px), `--space-expansive` (48px), `--space-vast` (64px)

**Motion**: `--motion-instant` (0ms), `--motion-interaction` (150ms), `--motion-content` (300ms), `--motion-contemplative` (800ms), `--motion-arrival` (1200ms)

**Easing**: `--easing-standard`, `--easing-contemplative`, `--easing-decelerate`, `--easing-accelerate`

**Typography**: `--font-reading`, `--font-display`, `--font-ui`, `--font-reading-hi`, `--font-ui-hi`, `--font-display-inspirational`, `--font-display-event`, `--font-ui-event`

**Radius**: `--radius-none` (0), `--radius-small` (2px), `--radius-default` (4px), `--radius-pill` (9999px)

**Opacity**: `--opacity-ghost` (0.03), `--opacity-whisper` (0.06), `--opacity-muted` (0.12), `--opacity-subdued` (0.15), `--opacity-secondary` (0.30), `--opacity-primary` (0.70), `--opacity-full` (1.0)

**Touch**: `--touch-target-min` (44px), `--touch-target-comfortable` (48px)

### Reading Surface Data Attributes

These are set by JavaScript on reading surfaces:

```html
<!-- Scroll progress -->
<div class="scroll-indicator" style="--scroll: 0.35">

<!-- Paragraph interaction -->
<p data-paragraph data-paragraph-id="42">
<p data-paragraph data-dwell-active>       <!-- dwell mode highlight -->
<p data-paragraph class="kb-focus">        <!-- keyboard navigation -->

<!-- Reading modes (set on <html>) -->
data-mode="focus"     <!-- dims all but current section -->
data-mode="present"   <!-- minimal chrome, expansive margins -->
data-mode="quiet"     <!-- removes all non-essential UI -->
```

### Citations

Always use this format:
```html
<cite class="citation-text">&mdash;&nbsp;Paramahansa Yogananda, <em>Autobiography of a Yogi</em>, Chapter 12</cite>
```

The em-dash (U+2014) + non-breaking space (U+00A0) pattern is mandatory. Never use hyphens.

### Fonts

Self-hosted WOFF2 files are required (GDPR compliance, ADR-099). Copy from the `fonts/` directory. The CSS references fonts via absolute paths (`/fonts/...`) from your web root — host them at `public/fonts/` or equivalent. Critical path: Merriweather 400 + Open Sans 400 (~68KB). Full Latin set: ~454KB. Devanagari: ~242KB additional, loaded on demand via unicode-range. Communal voice fonts (ArcherPro, Helvetica Neue) are system fonts — no self-hosted files needed; they degrade to Georgia and system-ui on systems without them.

### Tailwind Integration

If using Tailwind CSS v4, map tokens in your CSS:
```css
@theme {
  --color-bg: var(--color-bg);
  --color-text: var(--color-text);
  --color-gold: var(--color-gold);
  --spacing-tight: var(--space-tight);
  --spacing-default: var(--space-default);
  /* ... map what you need */
}
```

Then use: `class="bg-bg text-text p-default"`.

---

## For the Operator

You are configuring runtime behavior — themes, accessibility, performance.

### Theme Switching

Set `data-theme` on `<html>`. All colors respond immediately via CSS custom property overrides.

```javascript
document.documentElement.dataset.theme = 'dark';
```

For auto dark mode: the CSS includes `@media (prefers-color-scheme: dark)` that activates dark theme automatically. Override with an explicit `data-theme` value.

### Organization Switching

Set `data-org` on `<html>`:
```javascript
document.documentElement.dataset.org = 'yss'; // or 'srf' (default)
```

### User Preferences

Apply CSS classes on `<html>` or `<body>`:
```html
<html class="font-large">     <!-- 112.5% base font (18px) -->
<html class="font-larger">    <!-- 125% base font (20px) -->
<html class="line-relaxed">   <!-- 2.1 line-height on paragraphs -->
<html class="line-spacious">  <!-- 2.4 line-height on paragraphs -->
```

### Text-Only Mode

For low-bandwidth connections:
```html
<body class="text-only">
```
Strips all images, SVGs, decorative elements, and custom fonts. Georgia replaces all fonts.

### Accessibility Checklist

The CSS handles automatically:
- `prefers-reduced-motion: reduce` → all motion instant
- `prefers-contrast: more` → solid black/white text, visible borders
- `:focus-visible` → 2px solid gold outline on interactive elements

You must still ensure:
- All `<img>` have meaningful `alt` text (or `alt=""` if decorative)
- Heading hierarchy: h1 → h2 → h3, never skip levels
- Interactive elements have accessible names
- Color is never the only means of conveying information
- Touch targets are at least 44x44px

### Performance

- Preload critical fonts: Merriweather 400 + Open Sans 400
- Devanagari fonts load on demand (unicode-range subsetting)
- The devotional display font (Asar) loads only on pages that use `.display-inspirational-text` or `--font-display-inspirational`
- All CSS is static — no JavaScript required for any design token to work
- Print stylesheet is built in — `@media print` handles everything

---

## Quick Reference Card

```
VOICE:      contemplative (default) | communal
REGISTER:   sacred → reverential → instructional → functional → ambient
ACCENT:     gold (contemplative) | marigold (communal) | crimson (publication overlay)
HIERARCHY:  interactive 1.0 → decorative 0.4 → ambient 0.3 → highlight 0.2 → subliminal 0.06 → texture 0.03
PRINCIPLES: dhvani (suggest > state) | aucitya (propriety) | rasa (experiential flavor) | bindu (still center) | sahṛdaya (prepared reader) | prāṇa (breath rhythm) | alaṅkāra (ornament = structure)

IMPORT:     css/index.css (core) | css/reading.css (reading surfaces)
HTML:       data-org="srf" data-theme="light" lang="en"
FONTS:      self-hosted WOFF2, font-display: swap, zero external requests

FORBIDDEN:  autoplay, gamification, time-pressure, decorative animation,
            infinite scroll, pure white backgrounds, social sharing,
            AI-generated content, tooltips on sacred text

REQUIRED:   reduced motion, high contrast, keyboard nav, touch targets 44px,
            full attribution, honest absence, logical properties
```

---

*Source: yogananda-design/css/ — the canonical CSS expression of the Yogananda design language.*
*Token definitions: foundations/*.tokens.json | Semantic rules: semantics/*.language.json*
