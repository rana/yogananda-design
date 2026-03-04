# Proposals

Deferred architectural proposals. Each captures intent, rationale, and enough detail to resume without context loss.

---

## PRO-001: React Component Library Extraction

**Status:** Proposed
**Priority:** After showcase stabilization
**Depends on:** Showcase v2 completion (validates API surfaces)

### Problem

The showcase builds real behaviors (sahrdaya warmth, breath timing, rasa transformations, voice crossfade, commentary hierarchy) that the teachings portal and future YSS surfaces would reuse. Currently these live as showcase-specific components with demo chrome baked in. No clean extraction path exists.

### Proposal

Extract consumable React primitives into `packages/react/` within this repo:

```
packages/
  react/
    src/
      ThemeProvider.tsx      ← org/theme state, data-org/data-theme on <html>
      ReadingSurface.tsx     ← dwell, sahrdaya warmth, texture, focus states
      VoiceCrossfade.tsx     ← contemplative/communal voice with crossfade
      CommentaryStack.tsx    ← mula/bhashya/tika/varttika nesting
      RasaContainer.tsx      ← rasa-aware whitespace/timing/accent
      AttentionMark.tsx       ← gold/crimson/marigold at named attention levels
      BreathTransition.tsx   ← three-phase prana timing
      PrintWrapper.tsx       ← print-citation visibility, chrome removal
    index.ts                 ← barrel export
    package.json             ← @yogananda/react, peerDeps: react 18+
```

Showcase components would import from `packages/react/` and wrap with demo controls, legends, and explanatory text. Consumer apps import the same primitives directly.

CSS layer remains framework-agnostic (`css/index.css` or `css/reading.css`). The React package assumes CSS is loaded separately — it applies class names and data attributes, not inline styles.

### Distribution

**GitHub Packages** (private npm registry):
- Free for private packages within a GitHub account
- Consumer repos add `.npmrc` with `@yogananda:registry=https://npm.pkg.github.com`
- Standard `npm install @yogananda/react` workflow
- Proper semver versioning
- No public access required

### Sequencing

1. Stabilize showcase (current work) — discover the right component APIs through use
2. Extract primitives into `packages/react/` — separate demo chrome from behavior
3. Publish to GitHub Packages — `@yogananda/react@0.1.0`
4. Integrate into `yogananda-teachings` — replace hand-rolled components
5. Validate with YSS surface when activated (PRO-043)

### Why not now

Extracting before the showcase is stable means refactoring twice. The showcase is where we discover edge cases, API shapes, and composition patterns. Build first, extract from working code.
