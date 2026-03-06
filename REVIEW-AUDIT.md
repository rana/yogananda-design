# Review Audit — 2026-03-05

## Pass 3: Stewardship Redesign Review

Unified review of the greenfield stewardship vocabulary: `semantics/stewardship.language.json`, `css/patterns/stewardship.css`, `app/components/Stewardship.tsx`, and all cross-references updated during the rename from operations → stewardship.

---

## Critical

(none)

---

## Important

### 1. [coherence] Temporal dhvani "older" opacity: JSON says 0.5, CSS says 0.30
**Location:** [stewardship.language.json:103](semantics/stewardship.language.json#L103) vs [stewardship.css:261](css/patterns/stewardship.css#L261)
**Finding:** The semantic JSON defines `older` as `"tertiary (0.5)"` but no `--opacity-tertiary` custom property exists in foundations.css. The CSS uses `--opacity-secondary` (0.30). The JSON promises one value; the CSS delivers another. Additionally, the label "tertiary" implies a token that was never created.
**Authoritative:** The CSS is the delivered experience. The JSON should match.
**Fix:** In stewardship.language.json, change `"older"` opacity from `"tertiary (0.5)"` to `"secondary (0.30)"`. Or, if 0.5 is the intended value, add `--opacity-tertiary: 0.50;` to foundations.css. The CSS value (0.30) produces better dhvani — "older" should genuinely recede — so updating the JSON is the better fix.

### 2. [alignment] `.tone-border` concern/failure sets opacity on the element itself
**Location:** [stewardship.css:159](css/patterns/stewardship.css#L159) and [stewardship.css:168](css/patterns/stewardship.css#L168)
**Finding:** The concern and failure rules set `opacity: var(--gold-ambient)` and `opacity: var(--gold-interactive)` directly on the `.tone-border` element. CSS `opacity` affects the entire element and all its children — text, status indicators, everything inside the card becomes semi-transparent at concern level (0.3 opacity). This makes concerned cards harder to read, which contradicts the design intent of making them more visible.
**Fix:** The gradient border technique should not use element-level opacity. Instead, control the border's visual intensity through the gradient stops themselves, or use `border-image` with opacity baked into the gradient colors. For concern: use `color-mix(in srgb, var(--color-gold) 30%, transparent)` in the gradient definition rather than `opacity: 0.3` on the container.

### 3. [coherence] REVIEW-AUDIT.md Pass 2 finding #1 references operations.css (stale)
**Location:** Previous REVIEW-AUDIT.md finding 1
**Finding:** Pass 2 finding #1 says "CLAUDE.md CSS tree missing registers.css and operations.css" — but operations.css no longer exists. It was deleted and replaced by stewardship.css. The CLAUDE.md tree was updated during the stewardship work. This finding is resolved by the stewardship rename.
**Fix:** This audit (Pass 3) supersedes Pass 2. Finding carried forward as resolved.

### 4. [gap] Density custom properties defined but never consumed
**Location:** [stewardship.css:230-244](css/patterns/stewardship.css#L230-L244)
**Finding:** `[data-density="compact"]` and `[data-density="comfortable"]` define five custom properties each (`--density-gap`, `--density-padding`, `--density-font-size`, `--density-label-size`, `--density-line-height`) but no CSS rule in stewardship.css or any other file references these properties. They are vocabulary without consumers — the platform would need to write its own rules using `var(--density-gap)` etc. This is intentional (vocabulary, not components), but the gap between "properties exist" and "properties do something" should be documented.
**Fix:** Either (a) add a comment in stewardship.css noting these are vocabulary for consumer use, not self-activating, or (b) add minimal rules that consume them (e.g., `.data-label { font-size: var(--density-label-size, 0.6875rem); }`). Option (b) is better — the design system already owns `.data-label` and `.data-text-emphasis`, so those classes should respond to density.

### 5. [alignment] Showcase status-indicator missing aria-hidden
**Location:** [Stewardship.tsx:159](app/components/Stewardship.tsx#L159)
**Finding:** The semantic JSON ([stewardship.language.json:183](semantics/stewardship.language.json#L183)) states: "The dot is decorative (aria-hidden). Color is never the only channel." But the showcase renders `<span className="status-indicator" />` without `aria-hidden="true"`. The semantic contract requires it.
**Fix:** Add `aria-hidden="true"` to the status-indicator span: `<span className="status-indicator" aria-hidden="true" />`

---

## Minor

### 6. [coherence] Touch target size: stewardship JSON says 48px, calm-technology says 44px minimum
**Location:** [stewardship.language.json:82](semantics/stewardship.language.json#L82) — "Touch targets at comfortable size (48px)" vs [calm-technology.language.json:143](semantics/calm-technology.language.json#L143) — "Minimum 44x44px... 48px preferred for primary actions"
**Finding:** Not a contradiction — calm-technology says 44px minimum, 48px preferred for primary actions. Stewardship says 48px for act-phase buttons (which are primary actions). But the stewardship JSON omits the 44px minimum, which could mislead a consumer into thinking 48px is the only acceptable size.
**Fix:** Minor wording adjustment in stewardship.language.json: "Touch targets at comfortable size (minimum 44px, 48px preferred for primary actions)."

### 7. [gap] No `data-serving` showcase demonstration
**Location:** [stewardship.language.json:171-177](semantics/stewardship.language.json#L171-L177) — sevak-awareness section
**Finding:** The semantic JSON defines `data-serving` as an optional attribute for displaying seeker count. The showcase doesn't demonstrate it. Since `required: false`, this is acceptable, but it means the vocabulary exists without a reference implementation.
**Fix:** No action needed — the JSON marks it as aspirational. Consider adding a commented-out example in the showcase if the platform ever implements edge analytics.

### 8. [coherence] Stewardship calm-technology notes say "Touch targets minimum 44px" but triage protocol says "48px"
**Location:** [stewardship.language.json:198](semantics/stewardship.language.json#L198) says 44px; [stewardship.language.json:82](semantics/stewardship.language.json#L82) says 48px
**Finding:** Internal inconsistency within the same file. The calm-technology-notes section says "Touch targets minimum 44px" and the triage protocol act phase says "Touch targets at comfortable size (48px)."
**Fix:** Align both: "Touch targets minimum 44px, 48px preferred for primary actions" in the triage protocol; keep 44px in calm-technology-notes as the minimum.

### 9. [gap] No CSS for `data-serving` attribute
**Location:** [stewardship.language.json:173](semantics/stewardship.language.json#L173)
**Finding:** The semantic JSON defines `data-serving` but stewardship.css has no corresponding CSS rule. If a consumer adds `data-serving="847"`, nothing happens visually.
**Fix:** Acceptable — the JSON says `required: false` and "the design vocabulary is ready when the data is." The consumer would use existing classes (`.data-text-emphasis`, instructional register) rather than a dedicated rule. No CSS needed unless the treatment diverges from existing vocabulary.

### 10. [coherence] Showcase uses hardcoded "var(--font-ui)" inline styles instead of classes
**Location:** [Stewardship.tsx](app/components/Stewardship.tsx) — multiple inline style objects
**Finding:** The showcase component uses extensive inline styles (`fontFamily: "var(--font-ui)"`, `fontSize: "0.8125rem"`, etc.) rather than the CSS classes defined in stewardship.css (`.data-label`, `.data-text-emphasis`). This is consistent with other showcase components (they all use inline styles for demonstration), but it means the showcase doesn't fully exercise the CSS vocabulary it's demonstrating.
**Fix:** Minor. The showcase is not a consumer template — it demonstrates vocabulary visually. Other showcase components follow the same pattern. No change needed unless showcase is being used as copy-paste reference.

---

## Summary

| Metric | Count |
|--------|-------|
| **Total findings (Pass 3)** | 10 |
| **By dimension** | alignment: 2, coherence: 5, gap: 3 |
| **By severity** | critical: 0, important: 5, minor: 5 |
| **Actionable fixes** | 5 concrete edits (findings 1, 2, 4, 5, 8) |

The stewardship redesign is coherent and well-aligned with the project's aesthetic principles. No critical findings. The two most impactful issues are the opacity-on-element bug (finding 2, which would make concerned cards unreadable) and the JSON/CSS opacity mismatch (finding 1). Both are straightforward fixes.

---

## Superseded Findings from Pass 2

Pass 2 findings 1-5 status after stewardship work:
- **#1 (CLAUDE.md CSS tree):** Resolved — tree now includes stewardship.css and registers.css
- **#2 (FTR-119):** Still open — unrelated to stewardship work
- **#3 (FTR-030 dual meaning):** Still open — unrelated to stewardship work
- **#4 (registers.css in load table):** Still open — unrelated to stewardship work
- **#5 (PRI index):** Still open — unrelated to stewardship work

---

## Questions you would benefit from asking

**Should the density properties self-activate?** The vocabulary-not-components principle says no — but `.data-label` and `.data-text-emphasis` are already owned classes. Having them respond to `data-density` would be vocabulary responding to vocabulary, not an assembled component. This feels like a missing connection, not scope creep.

**Is the two-channel resolution actually perceptible?** The design argues that gold opacity alone can't distinguish four states, so gradient borders provide a second channel. But the showcase demonstrates this — has anyone verified that concern vs. attention is visually distinguishable at a glance? The theory is sound; the empirical validation matters.

**What am I not asking?** Whether the stewardship vocabulary has been tested against the actual yogananda-platform codebase. The showcase demonstrates the CSS, but the real consumer is platform.css (600 lines of existing operational styling). A migration path from platform's current approach to stewardship vocabulary would validate whether the vocabulary is sufficient for real operational needs.
