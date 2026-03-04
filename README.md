# Yogananda Design Languages

The canonical visual design language for the Yogananda digital ecosystem. Two organizational expressions — **SRF** (Self-Realization Fellowship) and **YSS** (Yogoda Satsanga Society) — sharing common foundations.

Built for **AI-first authorship**. Every token is self-documenting. Every constraint is machine-readable.

## Organizations

| | SRF Contemplative | SRF Communal | YSS |
|---|---|---|---|
| **Metaphor** | Entering a library | The temple courtyard | Entering an ashram |
| **Primary** | Navy #1a2744 | Charcoal #4C4C4C | Terracotta #bb4f27 |
| **Accent** | Gold #dcbd23 | Marigold #DC6A10 | Terracotta #BB4F27 |
| **Background** | Warm Cream #FAF8F5 | White #FFFFFF | Warm Clay #f2e8de |
| **Display** | Lora | ArcherPro | Merienda |
| **Reading** | Merriweather | Merriweather | Merriweather |
| **UI** | Open Sans | Helvetica Neue | Raleway |

## Three-Layer Architecture

```
Layer 1: Foundations (*.tokens.json)    — WHAT values exist
Layer 2: Semantics  (*.language.json)   — WHY and WHEN to use them
Layer 3: Patterns   (*.pattern.json)    — HOW they compose together
```

**Foundations** are W3C DTCG standard — interoperable with [Style Dictionary](https://amzn.github.io/style-dictionary/), [Tokens Studio](https://tokens.studio/), and Figma Variables.
**Semantics** capture what no token spec can: emotional registers, rasa, forbidden patterns, attention hierarchies, aesthetic principles from the Indian literary tradition.
**Patterns** are named compositions — molecules built from foundation atoms, governed by semantic rules.
**CSS** (`css/`) is the web expression — pure CSS custom properties and utility classes, framework-agnostic.

## Structure

```
yogananda-design/
├── foundations/                            → Layer 1: W3C DTCG design tokens
│   ├── shared.tokens.json                 → Shared across SRF + YSS
│   ├── srf.tokens.json                    → SRF visual language
│   ├── yss.tokens.json                    → YSS visual language
│   └── locale/
│       └── hi.tokens.json                 → Hindi/Devanagari overrides
├── semantics/                             → Layer 2: Design language rules
│   ├── aesthetic-theory.language.json     → Governing principles (dhvani, rasa, bindu, prana)
│   ├── emotional-registers.language.json  → Content-to-treatment mapping + rasa dimension
│   ├── attention-gradient.language.json   → Three accent voices: gold, marigold, crimson
│   ├── calm-technology.language.json      → Constraints and forbidden patterns
│   ├── accessibility.language.json        → WCAG AA requirements
│   ├── typography.language.json           → Typographic conventions per script
│   ├── atmosphere.language.json           → Photographic atmosphere system
│   ├── localization.language.json         → Multi-script visual adaptation
│   └── responsive-strategy.language.json  → Viewport tiers and interaction modality
├── patterns/                              → Layer 3: Composition recipes
│   ├── reading-surface.pattern.json       → Book reader, passages, commentary hierarchy
│   ├── search.pattern.json                → Search interface, results
│   ├── navigation.pattern.json            → Wayfinding, menus
│   ├── contemplation.pattern.json         → Dwell, quiet corner
│   └── transitions.pattern.json           → Arrivals, departures, chapter breath
├── css/                                   → Web expression (pure CSS)
│   ├── index.css                          → Bundle: core design language
│   ├── reading.css                        → Bundle: core + reading patterns
│   └── AI-GUIDE.md                        → Consumer guide for AI and developers
├── fonts/                                 → Self-hosted WOFF2 (GDPR-compliant, OFL)
│   ├── latin/                             → Merriweather, Lora, Open Sans, Raleway, Merienda, Asar
│   ├── devanagari/                        → Noto Serif/Sans Devanagari, Asar
│   └── manifest.json                      → Font metadata + loading strategy
├── motifs/                                → SVG visual elements
│   └── srf/                               → Botanical glyphs, icons, lotus
├── brand/
│   └── image-guidelines.json              → Photography usage, copyright, sources
├── app/                                   → Interactive showcase (Next.js)
├── CLAUDE.md                              → AI context (load this first)
└── PROPOSALS.md                           → Deferred architectural proposals
```

## Get Started

**AI designers** (Claude, Copilot, Cursor, v0): Read [CLAUDE.md](CLAUDE.md) — it tells you which files to load for any task.

**Web developers**: Read [css/AI-GUIDE.md](css/AI-GUIDE.md) — the complete consumer guide with import strategy, HTML setup, custom properties, classes, and design decision frameworks.

**Human designers**: Import `.tokens.json` files into [Style Dictionary](https://amzn.github.io/style-dictionary/) or [Tokens Studio](https://tokens.studio/). Token `$description` fields document intent; `semantics/` and `patterns/` files are human-readable design specs.

## Ecosystem

- [yogananda-teachings](https://github.com/rana/yogananda-teachings) — SRF portal. The reading room. Primary consumer.
- [yogananda-platform](https://github.com/rana/yogananda-platform) — Infrastructure platform.
- [yogananda-skills](https://github.com/rana/yogananda-skills) — Claude cognitive toolkit.
