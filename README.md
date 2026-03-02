# Yogananda Design Languages

Visual design system for the Yogananda digital ecosystem. Two organizational expressions — **SRF** (Self-Realization Fellowship) and **YSS** (Yogoda Satsanga Society) — sharing common foundations.

Built for **AI-first authorship**. Every token is self-documenting. Every constraint is machine-readable.

## Structure

```
yogananda-design/
├── CLAUDE.md                              → AI loading instructions
├── foundations/                            → Layer 1: W3C DTCG design tokens
│   ├── shared.tokens.json                 → Shared across SRF + YSS
│   ├── srf.tokens.json                    → SRF visual language
│   ├── yss.tokens.json                    → YSS visual language (scaffold)
│   └── locale/
│       └── hi.tokens.json                 → Hindi/Devanagari overrides
├── semantics/                             → Layer 2: Design language rules
│   ├── calm-technology.language.json      → PRI-08 constraints
│   ├── emotional-registers.language.json  → Content → treatment mapping
│   ├── attention-gradient.language.json   → Opacity/emphasis hierarchy
│   ├── accessibility.language.json        → WCAG AA requirements
│   └── typography.language.json           → Typographic conventions per script
├── patterns/                              → Layer 3: Composition recipes
│   ├── reading-surface.pattern.json       → Book reader, passages
│   ├── search.pattern.json                → Search interface, results
│   ├── navigation.pattern.json            → Wayfinding, menus
│   ├── contemplation.pattern.json         → Dwell, quiet corner
│   └── transitions.pattern.json           → Arrivals, departures, chapter breath
├── fonts/                                 → Self-hosted web fonts (GDPR-compliant)
│   ├── latin/                             → Merriweather, Lora, Open Sans
│   ├── devanagari/                        → Noto Serif/Sans Devanagari (future)
│   └── manifest.json                      → Font metadata + loading strategy
├── motifs/                                → SVG visual elements
│   ├── srf/                               → Gold lotus, ornaments
│   └── yss/                               → (scaffold)
└── brand/
    └── image-guidelines.json              → Photography usage, copyright, sources
```

## Design Token Format

Uses the [W3C Design Tokens Community Group](https://www.designtokens.org/) format (DTCG). Compatible with:
- [Style Dictionary](https://amzn.github.io/style-dictionary/) — generate CSS, SCSS, Android XML, Swift, Kotlin
- [Tokens Studio](https://tokens.studio/) — Figma integration
- Any tool supporting `.tokens.json`

## Organizations

| | SRF | YSS |
|---|-----|-----|
| **Metaphor** | Entering a library | Entering an ashram |
| **Primary color** | Navy #1a2744 | Terracotta #bb4f27 |
| **Accent** | Gold #dcbd23 | (TBD — awaiting YSS input) |
| **Background** | Warm Cream #FAF8F5 | Warm Clay #f2e8de |
| **Reading font** | Merriweather | Noto Serif Devanagari |
| **UI font** | Open Sans | Raleway |
| **Status** | Complete | Scaffold |

## How to Use

### For AI Designers (Primary Use Case)

1. **Start here:** Read `CLAUDE.md` — it tells you which files to load for any task.
2. **Always load:** `foundations/shared.tokens.json` + your organization's token file (`srf.tokens.json` or `yss.tokens.json`) + `semantics/calm-technology.language.json`.
3. **For reading surfaces:** Add `semantics/emotional-registers.language.json` + `patterns/reading-surface.pattern.json`.
4. **For search UI:** Add `patterns/search.pattern.json` + `semantics/attention-gradient.language.json`.
5. **For Hindi content:** Add `foundations/locale/hi.tokens.json` + `semantics/typography.language.json`.
6. **To validate:** Check your output against `semantics/calm-technology.language.json` (forbidden list) and `semantics/accessibility.language.json` (minimums).

### For Human Designers

1. Import `.tokens.json` files into [Style Dictionary](https://amzn.github.io/style-dictionary/) or [Tokens Studio](https://tokens.studio/).
2. Token `$description` fields document intent; `$extensions.org.yogananda.design` documents rationale.
3. The `semantics/` and `patterns/` files are human-readable JSON — use them as design specs.

### For CI/CD Integration

The portal can validate its CSS against design tokens in CI:
- Lint that portal CSS custom properties match foundation token values.
- Check that no forbidden patterns (from `calm-technology.language.json`) appear in new components.
- Verify accessibility minimums from `accessibility.language.json`.

### Adding a New Organization

1. Create `foundations/{org}.tokens.json` following the structure of `srf.tokens.json`.
2. Define the organization's color palette, typography, and themes.
3. Add locale overrides in `foundations/locale/` as needed.
4. Add motifs in `motifs/{org}/`.
5. Shared foundations, semantics, and patterns apply to all organizations automatically.

### Adding a New Language/Script

1. Create `foundations/locale/{lang}.tokens.json` with typography overrides.
2. Add quotation mark conventions to `semantics/typography.language.json`.
3. Add font variants to `fonts/manifest.json`.
4. Self-host the font files in the appropriate `fonts/` subdirectory.

## Three-Layer Architecture

```
Layer 1: Foundations (*.tokens.json)    — WHAT values exist
Layer 2: Semantics (*.language.json)    — WHY and WHEN to use them
Layer 3: Patterns (*.pattern.json)      — HOW they compose together
```

**Foundations** are W3C DTCG standard — interoperable with design tooling.
**Semantics** are custom — they capture what no token spec can: emotional registers, forbidden patterns, attention hierarchies.
**Patterns** are composition recipes — named molecules built from foundation atoms, governed by semantic rules.

## Related

- [yogananda-teachings](https://github.com/rana/yogananda-teachings) — SRF portal (primary consumer)
- [yogananda-platform](https://github.com/rana/yogananda-platform) — Infrastructure platform
- [yogananda-skills](https://github.com/rana/yogananda-skills) — Claude cognitive toolkit
