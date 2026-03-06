# Proposals

Deferred architectural proposals. Each captures intent, rationale, and enough detail to resume without context loss.

---

## FTR-098: React Component Library Extraction

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
      AttentionMark.tsx       ← gold/crimson/ochre at named attention levels
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
5. Validate with YSS surface when activated (yogananda-teachings FTR-119)

### Why not now

Extracting before the showcase is stable means refactoring twice. The showcase is where we discover edge cases, API shapes, and composition patterns. Build first, extract from working code.

---

## FTR-078: HCT Color Science Foundation

**Status:** Proposed
**Priority:** Medium — strengthens existing tokens without changing visual output
**Depends on:** Nothing (additive to current foundations)
**Source:** Analysis of Google Material Design 3's HCT color space (Designing Google Material Design 3.md)

### Problem

Foundation color tokens use hand-tuned hex values. The voice-shaped opacity asymmetry (gold ambient 0.3 vs. crimson ambient 0.25 vs. ochre ambient 0.2) was calibrated perceptually — correct, but without a formal model explaining *why* warmer/more-saturated hues need lower opacity for equivalent perceptual weight. Accessibility contrast compliance is verified manually, not guaranteed algorithmically.

### Insight

Google's HCT (Hue-Chroma-Tone) color space synthesizes CAM16 hue/chroma linearity with CIELAB lightness accuracy. Key properties:

- **Algorithmic contrast guarantees:** A 40-point HCT tone difference guarantees 3.0:1 contrast. A 50-point difference guarantees 4.5:1 (WCAG AA). Contrast becomes a mathematical invariant rather than a per-combination verification.
- **Perceptual uniformity:** Equal chroma differences at different hues produce equal perceptual weight. This would formalize the hue-dependent opacity calibration that was hand-tuned.
- **Generative capacity:** New themes could be derived from seed colors with guaranteed accessibility. Currently each theme's color palette is hand-composed.

### Proposal

1. **Audit existing tokens in HCT space.** Convert all foundation hex values (#DCBD23 gold, #9B2335 crimson, #DC6A10 ochre, etc.) to HCT coordinates. Document the actual tone relationships between background/foreground pairs.
2. **Validate opacity asymmetry mathematically.** Map the voice-shaped opacity gradients to HCT chroma/tone and verify that the hand-tuned values correspond to perceptual equivalence.
3. **Add HCT coordinates to token `$extensions`.** Each color token gains `"hct": { "hue": N, "chroma": N, "tone": N }` alongside the hex `$value`. The hex remains canonical for consumption; HCT is metadata for reasoning.
4. **Document the contrast guarantee.** Add a `"contrast-guarantee"` property to foreground/background token pairs showing the HCT tone delta and the WCAG ratio it guarantees.
5. **Explore generative theme creation.** As a future capability: given a seed HCT hue and the existing tone/chroma relationships, generate a new theme with automatic accessibility compliance.

### What this does NOT change

- Visual output is identical — hex values stay the same
- CSS layer unchanged — consumes hex as before
- No dependency on Google's Material Color Utilities library (the math is well-documented and portable)
- The three-voice architecture, attention gradient, and all semantic layers remain exactly as designed

### Why not now

The current tokens work. This is a deepening of the foundation, not a correction. Best pursued when a second consumer (yogananda-teachings) creates pressure for generative theme creation, or when a new theme needs guaranteed contrast without per-pair manual testing.

---

## FTR-136: Spring Physics for Prāṇa Motion

**Status:** Proposed
**Priority:** Low — current cubic-bezier implementation serves well; spring is a refinement
**Depends on:** FTR-098 (React extraction) would make spring motion a library concern
**Source:** Analysis of M3 Expressive spring physics model (Designing Google Material Design 3.md)

### Problem

The prāṇa breath model (pūraka → kumbhaka → recaka) describes approach-hold-release with the asymmetry of natural breath. The current implementation uses cubic-bezier easing: `decelerate` for arrivals, `accelerate` for departures, `contemplative` for sacred transitions. These are correct but mathematically incapable of **overshoot** — the slight exceed-and-settle that physical breathing exhibits. An inhalation doesn't stop precisely at its peak; it arrives, gently exceeds, and settles.

### Insight

Spring physics (stiffness, damping, initial velocity) produce natural overshoot-settle behavior. A critically damped spring approaches, barely exceeds its target, and resolves to stillness. This is structurally isomorphic with prāṇa: the spring's resolution IS kumbhaka — it emerges from the physics rather than from a separate duration token.

M3's spring model defines:
- **Stiffness:** How quickly the spring resolves (maps to pūraka's gathering energy)
- **Damping:** How much bounce (low damping = more overshoot; high damping = gentle settle)
- **Initial velocity:** Momentum from the user's gesture

### Proposal

Define spring constants that embody prāṇa's three phases:

| Prāṇa Phase | Spring Character | Stiffness | Damping Ratio |
|---|---|---|---|
| **Pūraka** (approach) | Arrives with gathering energy, gentle settle | Medium-high | 0.8–0.9 (slightly underdamped) |
| **Recaka** (release) | Departs slowly, trailing quality | Low | 0.95–1.0 (near-critical damping) |
| **Contemplative** | Sacred pacing, almost no overshoot | Low | 0.98 (barely perceptible settle) |

The kumbhaka (held state) is not a spring parameter — it is the spring's resolved rest state. Duration is still unlimited and never interrupted.

### What this preserves

- Existing cubic-bezier tokens remain valid for CSS-only consumers (spring requires JavaScript)
- The prāṇa model is unchanged — spring is a more faithful *expression*, not a new model
- Reduced-motion still disables all animation (0.01ms)
- The asymmetry principle holds: approach springs have different parameters than departure springs

### Why not now

Cubic-bezier serves correctly. Spring physics require a JavaScript runtime (CSS `linear()` can approximate but cannot respond to gesture velocity). This becomes actionable when the React component library (FTR-098) provides a natural home for spring-based motion primitives.

---

## FTR-137: Harmonic Ratio Audit

**Status:** Proposed
**Priority:** Medium — would crystallize what may already be true
**Depends on:** Nothing
**Source:** Both external documents reference the Golden Ratio (1.618) extensively; worth auditing whether it is already present in the existing token values

### Problem

The spacing and typography tokens were designed with aesthetic judgment. If harmonic relationships (Golden Ratio, musical intervals, or other self-similar ratios) are already present — and they may be, given that aesthetic judgment often converges on mathematical harmony — they are not named or documented. An unnamed ratio is fragile: future edits may break a harmony they don't know exists.

### Audit Questions

1. **Typography scale:** Does the progression from `--font-size-sm` through body to display sizes follow a consistent ratio? If body is 18px and display is ~29px, that's approximately 1.618. If heading sizes follow `body × ratio^n`, document the ratio.
2. **Spacing scale:** Do the spacing tokens (compact → default → generous → expansive) follow a harmonic progression? If default is 1.5rem and generous is ~2.4rem, that's 1.6.
3. **Line-height relationships:** The rasa treatment tendencies specify line-heights (1.8, 1.9, 2.0). Are these related by a ratio to each other or to the base?
4. **Layout proportions:** Does the 61.8% / 38.2% golden split appear in any existing layout? The reader + side panel proportions would be a natural home.
5. **Transition timing:** The three durations (150ms interaction, 300ms content, 800ms contemplative) — 300/150 = 2.0, 800/300 ≈ 2.67. Not golden, but the ratio between content and contemplative (~2.67) is close to the golden ratio squared (2.618). Worth checking if this is accidental or load-bearing.

### Proposal

1. Convert all quantitative tokens to a common unit and compute ratios between adjacent values.
2. Where harmonic relationships exist, document them in the token `$extensions` metadata.
3. Where near-miss values could be adjusted to exact harmonics without visible change (e.g., 2.67 → 2.618), consider the adjustment.
4. Name the governing ratio(s) in the foundation file's description.
5. Do NOT force harmonics where they don't exist. Some tokens are pragmatic (44px touch target comes from Apple HIG, not from a ratio). Only document what is genuinely harmonic.

### Why this matters

A design system with named harmonic ratios is self-similar across scales — Yogananda's "yatha pinde tatha brahmande" (as the microcosm, so the macrocosm). The fractal quality that both external documents describe as a goal may already be present in the tokens. Naming it makes it reproducible and protectable.

---

## FTR-114: Concentric Radius Convention

**Status:** Proposed
**Priority:** Low — a pattern-level convention, not a foundation change
**Depends on:** Nothing
**Source:** visionOS spatial design guidelines (Designing Apple visionOS.md)

### Problem

When UI elements nest (a card within a section, a button within a card), their corner radii are typically set independently. If `outer_radius = 12px` and `inner_radius = 8px` with `padding = 6px`, the corners are not concentric (12 - 6 = 6, not 8). The visual result is a subtle geometric dissonance — curves that almost align but don't, creating unconscious tension.

### Proposal

Codify a convention in the pattern layer:

```
inner_radius = outer_radius - padding
```

Express as CSS custom property relationships:

```css
.card {
  --radius: var(--radius-lg, 12px);
  border-radius: var(--radius);
  padding: var(--space-default, 1rem);
}
.card > .inner {
  /* radius = parent radius - parent padding */
  border-radius: calc(var(--radius) - var(--space-default, 1rem));
}
```

When the result would be zero or negative, the inner element uses no radius (sharp corners are proper at close nesting distances — the orbital model supports this: elements closer to the bindu are stiller and more geometric).

### Scope

This is a composition convention, not a new token. It would live in a patterns file or as a CSS comment convention. It reinforces the bindu orbital model: nested elements at decreasing radii create a visual convergence toward the still center.

---

## FTR-115: Light-Over-Shadow Elevation Principle

**Status:** Proposed
**Priority:** Low — documenting what is already true
**Depends on:** Nothing
**Source:** MD3 "Aura" concept; visionOS glass material model (both external documents)

### Problem

The design system does not use drop shadows. This is an implicit convention, not an explicit principle. Both external documents articulate the alternative: elevation expressed through light emission rather than shadow casting. The Yogananda system already does this — gold glow at subliminal opacity, motif sacred voice as self-illumination — but the principle is unnamed.

### Proposal

Add to `calm-technology.language.json` or `aesthetic-theory.language.json`:

**Name:** "Elevation through light"
**Principle:** This design system never uses drop shadows. Elevation and visual hierarchy are expressed through: (1) tone difference (lighter/darker backgrounds per attention level), (2) light emission (gold glow at subliminal-to-ambient opacity), (3) whitespace (orbital distance from the bindu), and (4) typography weight/size.

**Rationale through alaṅkāra:** A drop shadow simulates the *absence* of light. The Yogananda design language simulates the *presence* of light. This is not a stylistic preference — it is a philosophical position: the design system is oriented toward light as both metaphor and mechanism. The gold attention gradient, the motif sacred voice, the atmosphere system's radial glow — all express hierarchy through luminance, not darkness.

**Connection to existing principles:**
- Dhvani: Light at texture opacity (0.03) suggests elevation without stating it
- Bindu: Elements closer to the still center are lighter and stiller
- Alaṅkāra: The gold glow simultaneously provides elevation cue AND atmospheric warmth AND brand identity — three functions in one visual treatment

### Scope

This is a documentation proposal — naming a principle that already governs the CSS layer. No code changes. The value is in making the convention explicit, auditable, and reproducible by future consumers.
