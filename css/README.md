# CSS Layer — Consumer Guide

The design language expressed as pure CSS. Framework-agnostic. Import what you need.

## Quick Start

Copy the entire `css/` directory into your project. Import one file:

```css
/* Reading surface (teachings, reader, any sacred content) */
@import './css/reading.css';

/* Non-reading surface (dashboard, admin, platform) */
@import './css/index.css';
```

That's it. All custom properties, themes, typography, and patterns are available.

## Font Files Required

The CSS references self-hosted fonts at `/fonts/` from your web root. You need these files in your `public/fonts/` directory:

```
public/fonts/
  merriweather-latin-300-normal.woff2
  merriweather-latin-400-normal.woff2
  merriweather-latin-400-italic.woff2
  merriweather-latin-700-normal.woff2
  lora-latin-400-normal.woff2
  lora-latin-400-italic.woff2
  lora-latin-700-normal.woff2
  open-sans-latin-400-normal.woff2
  open-sans-latin-600-normal.woff2
  raleway-latin-300-normal.woff2
  raleway-latin-400-normal.woff2
  raleway-latin-400-italic.woff2
  raleway-latin-500-normal.woff2
  raleway-latin-600-normal.woff2
  raleway-latin-700-normal.woff2
  merienda-latin-400-normal.woff2
  merienda-latin-500-normal.woff2
  merienda-latin-700-normal.woff2
  asar-latin-400-normal.woff2
  devanagari/
    noto-serif-devanagari-devanagari-400-normal.woff2
    noto-sans-devanagari-devanagari-400-normal.woff2
    asar-devanagari-400-normal.woff2
```

The yogananda-design repo has these in its `public/fonts/` directory. Copy them. All fonts are OFL-licensed and self-hosted — zero external requests (GDPR, ADR-099).

## HTML Setup

Set `data-theme` and optionally `data-org` on `<html>`:

```html
<!-- SRF (default) with light theme -->
<html data-theme="light">

<!-- SRF with dark theme -->
<html data-theme="dark">

<!-- YSS with ashram theme -->
<html data-org="yss" data-theme="ashram">

<!-- System preference auto-switching -->
<html data-theme="auto">
```

### Available Themes

**SRF themes** (import `css/themes/srf.css`):
- `light` — default, defined in `:root` via `foundations.css`
- `sepia` — warm antique paper
- `earth` — clay and terracotta
- `dark` — deep navy
- `meditate` — deeper dark, softened gold
- `gathering` — communal voice, white + marigold
- `auto` — follows system dark/light preference

**YSS themes** (import `css/themes/yss.css`):
- `ashram` — sunlit courtyard, white + terracotta
- `sandstone` — prayer hall lamplight, cream + devotional gold
- `night` — evening aarti, warm darkness
- `devotion` — inner sanctum, saffron + candlelight

## Custom Properties Available

After importing `css/foundations.css` (included in both bundles), these custom properties are available everywhere:

### Colors (theme-aware — change with data-theme)
```css
var(--color-bg)              /* Background */
var(--color-bg-secondary)    /* Secondary background */
var(--color-text)            /* Primary text */
var(--color-text-secondary)  /* Secondary text */
var(--color-border)          /* Borders */
var(--color-gold)            /* Accent (gold for SRF, terracotta for YSS earth) */
var(--color-surface)         /* Elevated surface */
```

### Brand Colors (constant — do not change with theme)
```css
var(--color-navy)            /* #1a2744 — SRF navy */
var(--color-cream)           /* #FAF8F5 — SRF cream */
var(--color-marigold)        /* #DC6A10 — communal voice accent */
var(--color-marigold-hover)  /* #BE5706 */
var(--color-marigold-light)  /* #FCEFE9 */
var(--color-charcoal)        /* #4C4C4C — communal voice text */
var(--color-gold-dark)       /* #C39314 */
var(--color-crimson)         /* #9B2335 — publication voice accent (theme-adaptive) */
var(--color-border-neutral)  /* #EDEDED */
```

### Gold Opacity Levels (named attention hierarchy)
```css
var(--gold-interactive)   /* 1.0  — focus rings, active links */
var(--gold-decorative)    /* 0.4  — epigraph marks, ornaments */
var(--gold-ambient)       /* 0.3  — scroll indicator, progress */
var(--gold-highlight)     /* 0.2  — keyboard paragraph outline */
var(--gold-subliminal)    /* 0.06 — paragraph hover background */
var(--gold-texture)       /* 0.03 — paper texture noise */
```

### Crimson Opacity Levels (publication voice — activated by `data-publication`)
```css
var(--crimson-interactive)  /* 1.0  — chapter titles, publication labels */
var(--crimson-decorative)   /* 0.4  — drop caps, ornamental marks */
var(--crimson-ambient)      /* 0.25 — book progress, TOC markers */
var(--crimson-highlight)    /* 0.15 — chapter nav hover */
var(--crimson-subliminal)   /* 0.06 — faint publication warmth */
```

### Motion
```css
var(--motion-instant)       /* 0ms */
var(--motion-interaction)   /* 150ms — hover, focus, click */
var(--motion-content)       /* 300ms — panels, theme switches */
var(--motion-contemplative) /* 800ms — chapter transitions */
var(--motion-arrival)       /* 1200ms — portal entry */

var(--easing-standard)      /* cubic-bezier(0.4, 0, 0.2, 1) */
var(--easing-contemplative) /* cubic-bezier(0.25, 0, 0.1, 1) */
var(--easing-decelerate)    /* cubic-bezier(0.0, 0, 0.2, 1) */
var(--easing-accelerate)    /* cubic-bezier(0.4, 0, 1.0, 1) */
```

### Spacing
```css
var(--space-tight)     /* 4px */
var(--space-compact)   /* 8px */
var(--space-default)   /* 16px */
var(--space-generous)  /* 24px */
var(--space-spacious)  /* 32px */
var(--space-expansive) /* 48px */
var(--space-vast)      /* 64px */
```

### Typography (change with data-org)
```css
var(--font-reading)               /* Merriweather serif stack */
var(--font-display)               /* Lora serif accent */
var(--font-ui)                    /* Open Sans sans-serif */
var(--font-reading-hi)            /* Noto Serif Devanagari */
var(--font-ui-hi)                 /* Noto Sans Devanagari */
var(--font-display-inspirational) /* Asar/Merienda */
var(--font-display-event)         /* ArcherPro stack */
var(--font-ui-event)              /* Helvetica Neue stack */
```

### Other
```css
var(--radius-none)    var(--radius-small)    var(--radius-default)    var(--radius-pill)
var(--opacity-ghost)  var(--opacity-whisper)  var(--opacity-muted)     var(--opacity-subdued)
var(--opacity-secondary)  var(--opacity-primary)  var(--opacity-full)
var(--z-base)  var(--z-raised)  var(--z-overlay)  var(--z-top)
var(--touch-target-min)  var(--touch-target-comfortable)
```

## CSS Classes Available

### Typography (from `css/typography/classes.css`)
```css
.reading-text          /* Merriweather 18px/1.8 — body text */
.display-text          /* Lora 700/1.3 — headings */
.citation-text         /* Merriweather 300 14px — attributions */
.ui-text               /* Open Sans 14px — interface */
.reading-text-hi       /* Noto Serif Devanagari 20px/1.9 */
.display-text-hi       /* Noto Serif Devanagari 700/1.4 */
.ui-text-hi            /* Noto Sans Devanagari 15px/1.6 */
.display-inspirational-text  /* Devotional display 22px */
.display-event-text    /* Event heading, ArcherPro 500 */
.ui-event-text         /* Event UI, Helvetica Neue 375 */
```

### Typographic Features (from `css/typography/features.css`)
```css
.drop-cap              /* 3.5em float inline-start — chapter opening */
.small-caps            /* font-variant: small-caps + letter-spacing */
.reader-content        /* hanging-punctuation: first allow-end */
.reader-epigraph       /* Centered italic quote with gold mark */
.reader-citation       /* Attribution with em-dash prefix */
.footnote-ref          /* Superscript footnote link (use on <sup>) */
.footnote-backlink     /* Back-arrow from footnote to text */
.chapter-notes         /* Footnote section container */
.book-figure           /* Image container with break-inside: avoid */
.book-figure-img       /* Responsive image within figure */
.book-caption          /* Italic caption below figure */
.reader-scene-break    /* Swelled-rule section divider (gold gradient taper) */
.reader-verse          /* Verse block — preserved line breaks, centered, italic */
.reader-texture        /* SVG fractal noise paper texture */
```

### Attention (from `css/attention.css`)
```css
.gold-interactive   .gold-decorative   .gold-ambient   .gold-highlight   .gold-subliminal
.crimson-interactive  .crimson-decorative  .crimson-ambient  .crimson-highlight  .crimson-subliminal
.marigold-interactive   .marigold-decorative   .marigold-ambient   .marigold-subliminal
```

### Calm Technology (from `css/calm.css`)
```css
.theme-transition   /* Smooth bg/color/border on theme switch */
.sr-only            /* Screen reader only */
.text-only          /* Apply to body: strips images, forces system font */
```

### Reader Preferences (from `css/patterns/preferences.css`)
```css
.font-large    /* 112.5% base — 18px body */
.font-larger   /* 125% base — 20px body */
.line-relaxed  /* 2.1 line-height on [data-paragraph] */
.line-spacious /* 2.4 line-height on [data-paragraph] */
```

## Reading Surface Data Attributes

The reading surface patterns in `css/patterns/reading-surface.css` respond to these `data-*` attributes. Set them via JavaScript in your application:

```html
<!-- Dwell contemplation mode -->
<div data-dwell-active>
  <p data-paragraph>Dimmed paragraph</p>
  <p data-paragraph data-dwell-target>Focused paragraph</p>
</div>

<!-- Reader modes (on <html> or <body>) -->
<html data-mode="focus">    <!-- Hides header, footer, [data-no-focus] -->
<html data-mode="present">  <!-- Hides chrome, scales font up -->
<html data-mode="quiet">    <!-- Hides chrome, dims article to 0.05 -->

<!-- Golden thread cross-references -->
<p class="golden-thread-passage">Connected paragraph</p>
<p class="golden-thread-passage" data-thread-active>Active connection</p>

<!-- Keyboard paragraph navigation -->
<p data-paragraph class="kb-focus">Currently focused</p>
```

## Tailwind Integration

If your project uses Tailwind CSS, map the design language custom properties to Tailwind tokens in your `globals.css`:

```css
@import './css/reading.css';   /* Design language first */
@import "tailwindcss";          /* Tailwind second */

/* Optional: map to Tailwind color names */
@theme {
  --color-srf-gold: var(--color-gold);
  --color-srf-navy: var(--color-text);
  --color-warm-cream: var(--color-bg);
  --color-warm-cream-dark: var(--color-bg-secondary);
  --font-serif: var(--font-reading);
  --font-sans: var(--font-ui);
  --font-display: var(--font-display);
}
```

This lets you use both `var(--color-gold)` and Tailwind's `text-srf-gold` interchangeably. All Tailwind utilities automatically adapt to theme switches.

## Migrating from Hardcoded Values

If your project currently hardcodes design values, replace them with custom property references:

```css
/* Before */
color: #dcbd23;
background: #FAF8F5;
font-family: "Merriweather", Georgia, serif;
transition: color 150ms ease;
padding: 24px;

/* After */
color: var(--color-gold);
background: var(--color-bg);
font-family: var(--font-reading);
transition: color var(--motion-interaction) var(--easing-standard);
padding: var(--space-generous);
```

Common mappings from yogananda-teachings:

| Teachings hardcoded | Design language token |
|---|---|
| `#dcbd23` | `var(--color-gold)` |
| `#1a2744` | `var(--color-text)` / `var(--color-navy)` |
| `#FAF8F5` | `var(--color-bg)` / `var(--color-cream)` |
| `#f0ece4` | `var(--color-bg-secondary)` |
| `150ms` | `var(--motion-interaction)` |
| `300ms` | `var(--motion-content)` |
| `800ms` | `var(--motion-contemplative)` |
| `0.06` (hover bg) | `var(--gold-subliminal)` / `var(--opacity-whisper)` |
| `0.15` (dwell dim) | `var(--opacity-subdued)` |
| `0.3` (scroll indicator) | `var(--gold-ambient)` / `var(--opacity-secondary)` |
| `44px` (touch target) | `var(--touch-target-min)` |
| `4px` radius | `var(--radius-default)` |
| `2px` radius | `var(--radius-small)` |

## Selective Import

If you don't need everything, import individual files:

```css
/* Minimum viable: just tokens and themes */
@import './css/foundations.css';
@import './css/themes/srf.css';

/* Add typography */
@import './css/typography/fonts.css';
@import './css/typography/classes.css';

/* Add calm technology base */
@import './css/calm.css';

/* Add reading features as needed */
@import './css/typography/features.css';
@import './css/patterns/reading-surface.css';
@import './css/patterns/print.css';
```

Every file except `foundations.css` is optional. `foundations.css` must be imported first — all other files reference its custom properties.

## File Sizes

The complete `reading.css` bundle is ~1,200 lines of CSS before minification. After minification and gzip, expect ~3–4 KB. The custom properties alone (`foundations.css`) are ~150 lines / ~1 KB gzipped.
