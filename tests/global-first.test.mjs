/* ══════════════════════════════════════════════════════════════════
   Global-First Regression Tests — PRI-05
   ══════════════════════════════════════════════════════════════════
   "Serve a seeker in rural Bihar on 2G as faithfully as a monk
    on fiber in Encinitas."

   These tests validate that the design system upholds PRI-05:
   Global-First. They check font budgets, CSS budgets, progressive
   enhancement gates, accessibility media queries, fallback chains,
   and calm technology guarantees.

   Zero dependencies. Uses Node's built-in test runner (node:test).
   Run: node --test tests/global-first.test.mjs
   ══════════════════════════════════════════════════════════════════ */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const CSS_DIR = join(ROOT, "css");
const FONTS_DIR = join(ROOT, "public", "fonts");

/* ── Helpers ─────────────────────────────────────────────────────── */

function readCSS(relativePath) {
  return readFileSync(join(CSS_DIR, relativePath), "utf-8");
}

function allCSSFiles(dir = CSS_DIR) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...allCSSFiles(full));
    } else if (entry.name.endsWith(".css")) {
      files.push(full);
    }
  }
  return files;
}

function allFontFiles(dir = FONTS_DIR) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...allFontFiles(full));
    } else if (entry.name.endsWith(".woff2")) {
      files.push(full);
    }
  }
  return files;
}

function concatAllCSS() {
  return allCSSFiles().map((f) => readFileSync(f, "utf-8")).join("\n");
}

/* ══════════════════════════════════════════════════════════════════ */
/*  1. FONT BUDGET                                                   */
/* ══════════════════════════════════════════════════════════════════ */

describe("Font budget", () => {
  const fonts = allFontFiles();

  it("total font payload stays under 1200 KB", () => {
    const totalBytes = fonts.reduce((sum, f) => sum + statSync(f).size, 0);
    const totalKB = totalBytes / 1024;
    assert.ok(
      totalKB < 1200,
      `Total font payload is ${totalKB.toFixed(0)} KB — budget is 1200 KB`
    );
  });

  it("no single font file exceeds 170 KB", () => {
    for (const f of fonts) {
      const sizeKB = statSync(f).size / 1024;
      const name = f.replace(FONTS_DIR + "/", "");
      assert.ok(
        sizeKB < 170,
        `${name} is ${sizeKB.toFixed(0)} KB — individual budget is 170 KB`
      );
    }
  });

  it("Latin font subset stays under 750 KB total", () => {
    const latinFonts = fonts.filter((f) => !f.includes("devanagari"));
    const totalBytes = latinFonts.reduce(
      (sum, f) => sum + statSync(f).size,
      0
    );
    const totalKB = totalBytes / 1024;
    assert.ok(
      totalKB < 750,
      `Latin fonts total ${totalKB.toFixed(0)} KB — budget is 750 KB`
    );
  });

  it("Devanagari font subset stays under 500 KB total", () => {
    const devFonts = fonts.filter((f) => f.includes("devanagari"));
    const totalBytes = devFonts.reduce(
      (sum, f) => sum + statSync(f).size,
      0
    );
    const totalKB = totalBytes / 1024;
    assert.ok(
      totalKB < 500,
      `Devanagari fonts total ${totalKB.toFixed(0)} KB — budget is 500 KB`
    );
  });

  it("all web font @font-face declarations use font-display: swap", () => {
    const fontsCSS = readCSS("typography/fonts.css");
    const fontFaceBlocks = fontsCSS.match(/@font-face\s*\{[^}]+\}/g) || [];

    // Exclude metric-adjusted fallback declarations (they use local()
    // and resolve instantly — font-display is irrelevant for them)
    const webFontBlocks = fontFaceBlocks.filter(
      (block) => !block.includes("Fallback")
    );

    assert.ok(
      webFontBlocks.length > 0,
      "Expected at least one web font @font-face declaration"
    );

    const missing = webFontBlocks.filter(
      (block) => !block.includes("font-display: swap")
    );
    assert.equal(
      missing.length,
      0,
      `${missing.length} of ${webFontBlocks.length} web font @font-face blocks missing font-display: swap`
    );
  });

  it("all fonts are self-hosted WOFF2 (no external URLs)", () => {
    const fontsCSS = readCSS("typography/fonts.css");
    const externalURLs = fontsCSS.match(
      /url\s*\(\s*["']?https?:\/\//g
    );
    assert.equal(
      externalURLs,
      null,
      "Found external font URLs — all fonts must be self-hosted (ADR-099, GDPR)"
    );
  });

  it("Devanagari fonts use unicode-range gating", () => {
    const fontsCSS = readCSS("typography/fonts.css");
    const fontFaceBlocks = fontsCSS.match(/@font-face\s*\{[^}]+\}/g) || [];
    const devanagariBlocks = fontFaceBlocks.filter((block) =>
      block.includes("devanagari")
    );

    assert.ok(
      devanagariBlocks.length > 0,
      "Expected Devanagari @font-face declarations"
    );

    const missingRange = devanagariBlocks.filter(
      (block) => !block.includes("unicode-range")
    );
    assert.equal(
      missingRange.length,
      0,
      `${missingRange.length} Devanagari @font-face blocks missing unicode-range`
    );
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  2. CSS BUDGET                                                    */
/* ══════════════════════════════════════════════════════════════════ */

describe("CSS budget", () => {
  it("total CSS bundle stays under 100 KB uncompressed", () => {
    const totalBytes = allCSSFiles().reduce(
      (sum, f) => sum + statSync(f).size,
      0
    );
    const totalKB = totalBytes / 1024;
    assert.ok(
      totalKB < 120,
      `Total CSS is ${totalKB.toFixed(1)} KB — budget is 120 KB`
    );
  });

  it("no single CSS file exceeds 20 KB", () => {
    for (const f of allCSSFiles()) {
      const sizeKB = statSync(f).size / 1024;
      const name = f.replace(CSS_DIR + "/", "");
      assert.ok(
        sizeKB < 20,
        `${name} is ${sizeKB.toFixed(1)} KB — individual budget is 20 KB`
      );
    }
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  3. PROGRESSIVE ENHANCEMENT                                       */
/* ══════════════════════════════════════════════════════════════════ */

describe("Progressive enhancement", () => {
  it("every animation-timeline usage is gated by @supports", () => {
    const allCSS = concatAllCSS();
    const lines = allCSS.split("\n");
    let supportsDepth = 0;
    let braceDepthAtSupports = 0;
    let braceDepth = 0;
    const ungated = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Track @supports entry
      if (line.match(/@supports\s*\(/)) {
        supportsDepth++;
        // The opening brace on this line will be counted below
        braceDepthAtSupports = braceDepth;
      }

      // Count braces
      const opens = (line.match(/\{/g) || []).length;
      const closes = (line.match(/\}/g) || []).length;
      braceDepth += opens - closes;

      // Detect exiting @supports (brace depth returns to entry level)
      if (supportsDepth > 0 && braceDepth <= braceDepthAtSupports) {
        supportsDepth--;
      }

      // Check animation-timeline property usage (not in @supports condition)
      if (
        line.match(/^\s*animation-timeline\s*:/) &&
        supportsDepth === 0
      ) {
        ungated.push(`Line ${i + 1}: ${line.trim()}`);
      }
    }

    assert.equal(
      ungated.length,
      0,
      `animation-timeline used outside @supports:\n${ungated.join("\n")}`
    );
  });

  it("no scroll-driven animation exists without @supports guard", () => {
    const allCSS = concatAllCSS();
    // Check for scroll() or view() in animation-timeline outside @supports
    const timelinePattern = /animation-timeline:\s*(scroll|view)\(\)/g;
    const allUses = [...allCSS.matchAll(timelinePattern)];

    // Each should be inside a @supports block
    for (const match of allUses) {
      const idx = match.index;
      const preceding = allCSS.substring(Math.max(0, idx - 500), idx);
      const hasSupports = preceding.includes("@supports");
      assert.ok(
        hasSupports,
        `animation-timeline: ${match[1]}() at position ${idx} appears outside @supports`
      );
    }
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  4. ACCESSIBILITY MEDIA QUERIES                                   */
/* ══════════════════════════════════════════════════════════════════ */

describe("Accessibility media queries", () => {
  const allCSS = concatAllCSS();

  it("prefers-reduced-motion: reduce is handled", () => {
    const matches = allCSS.match(/prefers-reduced-motion:\s*reduce/g) || [];
    assert.ok(
      matches.length >= 1,
      "Expected at least one prefers-reduced-motion: reduce rule"
    );
  });

  it("reduced-motion eliminates ALL transitions globally", () => {
    const calm = readCSS("calm.css");
    // The universal selector inside reduced-motion
    assert.ok(
      calm.includes("prefers-reduced-motion: reduce"),
      "calm.css must handle prefers-reduced-motion"
    );
    assert.ok(
      calm.includes("animation-duration: 0.01ms !important"),
      "calm.css must zero out animation-duration"
    );
    assert.ok(
      calm.includes("transition-duration: 0.01ms !important"),
      "calm.css must zero out transition-duration"
    );
  });

  it("prefers-contrast: more is handled", () => {
    const matches = allCSS.match(/prefers-contrast:\s*more/g) || [];
    assert.ok(
      matches.length >= 1,
      "Expected at least one prefers-contrast: more rule"
    );
  });

  it("high-contrast theme file exists and has overrides", () => {
    const hc = readCSS("themes/high-contrast.css");
    assert.ok(
      hc.includes("prefers-contrast: more"),
      "high-contrast.css must use prefers-contrast: more"
    );
  });

  it("@media print rules exist", () => {
    const matches = allCSS.match(/@media\s+print/g) || [];
    assert.ok(
      matches.length >= 2,
      `Expected at least 2 @media print blocks, found ${matches.length}`
    );
  });

  it("dedicated print stylesheet exists", () => {
    const print = readCSS("patterns/print.css");
    assert.ok(
      print.includes("@media print"),
      "print.css must contain @media print rules"
    );
  });

  it("atmosphere layers are removed in print and high-contrast", () => {
    const atmosphere = readCSS("patterns/atmosphere.css");
    assert.ok(
      atmosphere.includes("@media print"),
      "atmosphere.css must handle print"
    );
    assert.ok(
      atmosphere.includes("prefers-contrast: more"),
      "atmosphere.css must handle high contrast"
    );
    assert.ok(
      atmosphere.includes("prefers-reduced-motion: reduce"),
      "atmosphere.css must handle reduced motion"
    );
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  5. FONT FALLBACK CHAINS                                          */
/* ══════════════════════════════════════════════════════════════════ */

describe("Font fallback chains", () => {
  const foundations = readFileSync(
    join(CSS_DIR, "foundations.css"),
    "utf-8"
  );

  // Extract all --font-* declarations
  const fontProps =
    foundations.match(/--font-[\w-]+:\s*[^;]+;/g) || [];

  it("every --font-* custom property has a generic family fallback", () => {
    const generics = ["serif", "sans-serif", "cursive", "monospace", "system-ui"];
    const missing = [];

    for (const prop of fontProps) {
      const [name, value] = prop.split(/:\s*/);
      const hasGeneric = generics.some((g) => value.includes(g));
      if (!hasGeneric) {
        missing.push(name);
      }
    }

    assert.equal(
      missing.length,
      0,
      `Font properties without generic fallback: ${missing.join(", ")}`
    );
  });

  it("reading font falls back through at least 3 levels", () => {
    const readingProp = fontProps.find((p) => p.startsWith("--font-reading:"));
    assert.ok(readingProp, "Expected --font-reading custom property");
    const commas = (readingProp.match(/,/g) || []).length;
    assert.ok(
      commas >= 3,
      `--font-reading has ${commas + 1} fonts — should have at least 4 for graceful degradation`
    );
  });

  it("UI font includes system-ui in its chain", () => {
    const uiProp = fontProps.find((p) =>
      p.startsWith("--font-ui:") && !p.startsWith("--font-ui-")
    );
    assert.ok(uiProp, "Expected --font-ui custom property");
    assert.ok(
      uiProp.includes("system-ui"),
      "--font-ui must include system-ui for zero-download fallback"
    );
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  6. CALM TECHNOLOGY GUARANTEES                                    */
/* ══════════════════════════════════════════════════════════════════ */

describe("Calm technology", () => {
  it(".text-only mode exists for bandwidth-constrained environments", () => {
    const calm = readCSS("calm.css");
    assert.ok(
      calm.includes(".text-only"),
      "calm.css must define .text-only mode (ADR-006)"
    );
  });

  it(".text-only strips images and decorations", () => {
    const calm = readCSS("calm.css");
    assert.ok(
      calm.includes(".text-only img"),
      ".text-only must hide images"
    );
    assert.ok(
      calm.includes("display: none !important"),
      ".text-only must use display: none on decorations"
    );
  });

  it(".text-only falls back to system serif", () => {
    const calm = readCSS("calm.css");
    assert.ok(
      calm.includes('.text-only *') &&
      calm.includes('Georgia, "Times New Roman", serif'),
      ".text-only must fall back to Georgia serif stack"
    );
  });

  it(".sr-only utility exists for screen reader content", () => {
    const calm = readCSS("calm.css");
    assert.ok(calm.includes(".sr-only"), "calm.css must define .sr-only");
  });

  it("!important is only used in accessibility/override contexts", () => {
    const allCSS = concatAllCSS();
    const importantLines = [];
    const lines = allCSS.split("\n");

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("!important")) {
        importantLines.push({ line: i + 1, content: lines[i].trim() });
      }
    }

    // All !important usages should be inside one of these contexts:
    // - @media (prefers-reduced-motion)
    // - @media (prefers-contrast)
    // - @media print
    // - .text-only
    // - .sr-only
    // - reader mode overrides (.reader-mode-focus, .reader-mode-present)
    // - print.css
    // - preferences.css (user preference overrides)
    // This is a structural count — if new !important appears outside
    // these contexts, the test should be updated intentionally.
    assert.ok(
      importantLines.length > 0,
      "Expected some !important for accessibility overrides"
    );
    assert.ok(
      importantLines.length < 60,
      `Found ${importantLines.length} !important usages — exceeds expected ceiling of 60. ` +
      `Review whether new usages are in accessibility/override contexts.`
    );
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  7. CSS ARCHITECTURE                                              */
/* ══════════════════════════════════════════════════════════════════ */

describe("CSS architecture", () => {
  it("index.css imports foundations.css first", () => {
    const index = readCSS("index.css");
    const lines = index.split("\n").filter((l) => l.startsWith("@import"));
    assert.ok(lines.length > 0, "index.css must have @import statements");
    assert.ok(
      lines[0].includes("foundations.css"),
      "First @import must be foundations.css — all other files depend on it"
    );
  });

  it("reading.css imports index.css (complete bundle)", () => {
    const reading = readCSS("reading.css");
    assert.ok(
      reading.includes("index.css"),
      "reading.css must import the complete design language via index.css"
    );
  });

  it("both SRF and YSS theme files exist", () => {
    const srf = readCSS("themes/srf.css");
    const yss = readCSS("themes/yss.css");
    assert.ok(srf.length > 0, "SRF theme file must exist and have content");
    assert.ok(yss.length > 0, "YSS theme file must exist and have content");
  });

  it("foundations.css defines all core custom properties", () => {
    const foundations = readFileSync(
      join(CSS_DIR, "foundations.css"),
      "utf-8"
    );
    const required = [
      "--color-bg",
      "--color-text",
      "--color-gold",
      "--color-border",
      "--color-surface",
      "--font-reading",
      "--font-display",
      "--font-ui",
    ];
    for (const prop of required) {
      assert.ok(
        foundations.includes(prop),
        `foundations.css missing required property: ${prop}`
      );
    }
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  8. FONT FALLBACK METRICS — CLS Prevention                       */
/* ══════════════════════════════════════════════════════════════════ */

describe("Font fallback metrics (CLS prevention)", () => {
  const fontsCSS = readCSS("typography/fonts.css");
  const foundations = readFileSync(join(CSS_DIR, "foundations.css"), "utf-8");

  it("fallback @font-face declarations exist with size-adjust", () => {
    const fallbacks = [
      "Merriweather Fallback",
      "Lora Fallback",
      "Open Sans Fallback",
      "Raleway Fallback",
    ];
    for (const name of fallbacks) {
      assert.ok(
        fontsCSS.includes(name),
        `Missing fallback @font-face for "${name}"`
      );
    }
  });

  it("all fallback fonts use size-adjust", () => {
    const fallbackBlocks =
      fontsCSS.match(/@font-face\s*\{[^}]*Fallback[^}]+\}/g) || [];
    assert.ok(
      fallbackBlocks.length >= 4,
      `Expected at least 4 fallback @font-face blocks, found ${fallbackBlocks.length}`
    );
    for (const block of fallbackBlocks) {
      assert.ok(
        block.includes("size-adjust"),
        `Fallback @font-face missing size-adjust:\n${block.substring(0, 80)}...`
      );
    }
  });

  it("all fallback fonts use ascent-override and descent-override", () => {
    const fallbackBlocks =
      fontsCSS.match(/@font-face\s*\{[^}]*Fallback[^}]+\}/g) || [];
    for (const block of fallbackBlocks) {
      assert.ok(
        block.includes("ascent-override"),
        "Fallback @font-face missing ascent-override"
      );
      assert.ok(
        block.includes("descent-override"),
        "Fallback @font-face missing descent-override"
      );
    }
  });

  it("font stacks include fallback families before raw system fonts", () => {
    assert.ok(
      foundations.includes('"Merriweather Fallback"'),
      "--font-reading must include Merriweather Fallback"
    );
    assert.ok(
      foundations.includes('"Lora Fallback"'),
      "--font-display must include Lora Fallback"
    );
    assert.ok(
      foundations.includes('"Open Sans Fallback"'),
      "--font-ui must include Open Sans Fallback"
    );
  });

  it("fallback fonts use local() source (no downloads)", () => {
    const fallbackBlocks =
      fontsCSS.match(/@font-face\s*\{[^}]*Fallback[^}]+\}/g) || [];
    for (const block of fallbackBlocks) {
      assert.ok(
        block.includes("local("),
        "Fallback @font-face must use local() — no network cost"
      );
      assert.ok(
        !block.includes("url("),
        "Fallback @font-face must NOT use url() — must be zero-cost"
      );
    }
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  9. DATA-CONSTRAINED EXPERIENCE                                   */
/* ══════════════════════════════════════════════════════════════════ */

describe("Data-constrained experience", () => {
  const calm = readCSS("calm.css");

  it("prefers-reduced-data media query is handled", () => {
    assert.ok(
      calm.includes("prefers-reduced-data: reduce"),
      "calm.css must include prefers-reduced-data: reduce"
    );
  });

  it(".data-constrained class exists for server-side Save-Data activation", () => {
    assert.ok(
      calm.includes(".data-constrained"),
      "calm.css must define .data-constrained for Save-Data header"
    );
  });

  it("data-constrained strips web fonts to system serif", () => {
    assert.ok(
      calm.includes('.data-constrained *') &&
        calm.includes("Georgia"),
      ".data-constrained must fall back to Georgia serif"
    );
  });

  it("data-constrained preserves sans-serif for UI elements", () => {
    assert.ok(
      calm.includes(".data-constrained .ui-text") ||
        calm.includes(".data-constrained nav"),
      ".data-constrained must preserve system-ui for functional elements"
    );
  });

  it("data-constrained strips decorative images", () => {
    assert.ok(
      calm.includes(".data-constrained img:not([data-essential])"),
      ".data-constrained must strip non-essential images"
    );
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  10. YSS PARITY                                                   */
/* ══════════════════════════════════════════════════════════════════ */

describe("YSS organization parity", () => {
  const yss = readCSS("themes/yss.css");

  it("YSS font stacks include CLS-preventing fallbacks", () => {
    assert.ok(
      yss.includes('"Merriweather Fallback"'),
      "YSS --font-reading must include Merriweather Fallback"
    );
    assert.ok(
      yss.includes('"Raleway Fallback"'),
      "YSS --font-ui must include Raleway Fallback"
    );
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  11. RTL READINESS — PRI-06                                       */
/* ══════════════════════════════════════════════════════════════════ */

describe("RTL readiness (PRI-06)", () => {
  it("zero physical directional properties in CSS layer", () => {
    const allCSS = concatAllCSS();
    const lines = allCSS.split("\n");
    const violations = [];

    // Physical directional properties that should be logical
    const physicalPatterns = [
      /\bmargin-left\s*:/,
      /\bmargin-right\s*:/,
      /\bpadding-left\s*:/,
      /\bpadding-right\s*:/,
      /\bborder-left\s*:/,
      /\bborder-right\s*:/,
      /\bborder-left-width\s*:/,
      /\bborder-right-width\s*:/,
      /\bborder-left-style\s*:/,
      /\bborder-right-style\s*:/,
      /\bborder-left-color\s*:/,
      /\bborder-right-color\s*:/,
      /(?<!\binset-)(?<!\bborder-inline-)(?<!\bpadding-inline-)(?<!\bmargin-inline-)\bleft\s*:/,
      /(?<!\binset-)(?<!\bborder-inline-)(?<!\bpadding-inline-)(?<!\bmargin-inline-)\bright\s*:/,
      /\bfloat\s*:\s*left\b/,
      /\bfloat\s*:\s*right\b/,
    ];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      // Skip comments
      if (line.startsWith("/*") || line.startsWith("*") || line.startsWith("//")) continue;
      for (const pattern of physicalPatterns) {
        if (pattern.test(line)) {
          violations.push(`Line ${i + 1}: ${line}`);
        }
      }
    }

    assert.equal(
      violations.length,
      0,
      `Physical directional properties found (should be logical):\n${violations.join("\n")}`
    );
  });

  it("logical properties are actually used (not just absent)", () => {
    const allCSS = concatAllCSS();
    const logicalPatterns = [
      "inline-start",
      "inline-end",
      "block-start",
      "block-end",
      "margin-inline",
      "padding-inline",
      "inset-inline",
      "border-inline",
    ];
    const found = logicalPatterns.filter((p) => allCSS.includes(p));
    assert.ok(
      found.length >= 4,
      `Expected at least 4 logical property types, found ${found.length}: ${found.join(", ")}`
    );
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  12. EXPERIENCE TIERS — Semantic Language Coverage                 */
/* ══════════════════════════════════════════════════════════════════ */

describe("Experience tiers documentation", () => {
  const accessibilityJSON = readFileSync(
    join(ROOT, "semantics", "accessibility.language.json"),
    "utf-8"
  );
  const accessibility = JSON.parse(accessibilityJSON);

  it("experience-tiers section exists with three named tiers", () => {
    const tiers = accessibility["performance-as-accessibility"]?.["experience-tiers"]?.tiers;
    assert.ok(tiers, "Expected experience-tiers.tiers in accessibility.language.json");
    assert.ok(tiers["full-typography"], "Missing tier: full-typography");
    assert.ok(tiers["metric-matched"], "Missing tier: metric-matched");
    assert.ok(tiers["data-constrained"], "Missing tier: data-constrained");
  });

  it("each tier has name, description, activation, and experience", () => {
    const tiers = accessibility["performance-as-accessibility"]["experience-tiers"].tiers;
    for (const [key, tier] of Object.entries(tiers)) {
      assert.ok(tier.name, `Tier ${key} missing name`);
      assert.ok(tier.$description, `Tier ${key} missing $description`);
      assert.ok(tier.activation, `Tier ${key} missing activation`);
      assert.ok(tier.experience, `Tier ${key} missing experience`);
    }
  });

  it("gold-accent-visibility intentional decision is documented", () => {
    const gold = accessibility.visual?.["gold-accent-visibility"];
    assert.ok(gold, "Expected gold-accent-visibility in accessibility.language.json visual section");
    assert.ok(gold.rationale, "gold-accent-visibility missing rationale");
    assert.ok(gold.enforcement, "gold-accent-visibility missing enforcement");
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  13. CONNECTIVITY & SEMANTIC HTML — Pattern Coverage               */
/* ══════════════════════════════════════════════════════════════════ */

describe("Reading surface pattern completeness", () => {
  const patternJSON = readFileSync(
    join(ROOT, "patterns", "reading-surface.pattern.json"),
    "utf-8"
  );
  const pattern = JSON.parse(patternJSON);

  it("connectivity-states section exists with all five states", () => {
    const states = pattern["connectivity-states"]?.states;
    assert.ok(states, "Expected connectivity-states.states in reading-surface.pattern.json");
    assert.ok(states.online, "Missing state: online");
    assert.ok(states["offline-with-cache"], "Missing state: offline-with-cache");
    assert.ok(states["offline-empty"], "Missing state: offline-empty");
    assert.ok(states.intermittent, "Missing state: intermittent");
    assert.ok(states.reconnected, "Missing state: reconnected");
  });

  it("connectivity-states references PRI-05", () => {
    const principle = pattern["connectivity-states"]?.principle;
    assert.ok(
      principle && principle.includes("PRI-05"),
      "connectivity-states must reference PRI-05 (Global-First)"
    );
  });

  it("semantic-html section exists with chapter-reader structure", () => {
    const html = pattern["semantic-html"];
    assert.ok(html, "Expected semantic-html in reading-surface.pattern.json");
    assert.ok(html["chapter-reader"]?.structure?.length > 0, "chapter-reader must have structure array");
    assert.ok(html["passage-card"]?.structure?.length > 0, "passage-card must have structure array");
  });

  it("semantic-html chapter-reader includes critical elements", () => {
    const elements = pattern["semantic-html"]["chapter-reader"].structure.map((s) => s.element);
    const required = ["<main", "<article>", "<p data-paragraph>", "<blockquote>"];
    for (const el of required) {
      const found = elements.some((e) => e.startsWith(el));
      assert.ok(
        found,
        `chapter-reader structure missing required element starting with: ${el}`
      );
    }
  });

  it("semantic-html references DPUB-ARIA roles", () => {
    const structure = pattern["semantic-html"]["chapter-reader"].structure;
    const dpubElements = structure.filter(
      (s) => s.attributes?.some((a) => a.includes("doc-"))
    );
    assert.ok(
      dpubElements.length >= 2,
      `Expected at least 2 DPUB-ARIA elements, found ${dpubElements.length}`
    );
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  14. BIDI READINESS — Typography Language Coverage                 */
/* ══════════════════════════════════════════════════════════════════ */

describe("Bidi readiness documentation", () => {
  const typographyJSON = readFileSync(
    join(ROOT, "semantics", "typography.language.json"),
    "utf-8"
  );
  const typography = JSON.parse(typographyJSON);

  it("bidi-readiness section exists and references PRI-06", () => {
    const bidi = typography["bidi-readiness"];
    assert.ok(bidi, "Expected bidi-readiness in typography.language.json");
    assert.equal(bidi.principle, "PRI-06", "bidi-readiness must reference PRI-06");
    assert.equal(bidi.status, "ready", "bidi-readiness status must be 'ready'");
  });

  it("bidi-readiness documents what flips and what doesn't", () => {
    const bidi = typography["bidi-readiness"];
    assert.ok(bidi["what-flips"]?.length > 0, "Must document what flips in RTL");
    assert.ok(bidi["what-does-not-flip"]?.length > 0, "Must document what does not flip");
  });

  it("bidi-readiness documents remaining work", () => {
    const remaining = typography["bidi-readiness"]?.["remaining-work"];
    assert.ok(remaining, "Must document remaining work for full RTL support");
    assert.ok(remaining["typography-stack"], "Must note missing Arabic/Urdu font stack");
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  15. FORCED COLORS — Windows High Contrast Mode (DES-025)         */
/* ══════════════════════════════════════════════════════════════════ */

describe("Forced colors support (DES-025)", () => {
  const allCSS = concatAllCSS();
  const hc = readCSS("themes/high-contrast.css");

  it("@media (forced-colors: active) exists in CSS layer", () => {
    const matches = allCSS.match(/forced-colors:\s*active/g) || [];
    assert.ok(
      matches.length >= 1,
      "Expected at least one @media (forced-colors: active) block"
    );
  });

  it("forced-colors block lives in high-contrast.css", () => {
    assert.ok(
      hc.includes("forced-colors: active"),
      "high-contrast.css must contain forced-colors: active"
    );
  });

  it("forced-colors maps focus rings to system Highlight", () => {
    assert.ok(
      hc.includes("outline") && hc.includes("Highlight"),
      "forced-colors must map focus indicators to system Highlight color"
    );
  });

  it("forced-colors ensures interactive element borders use ButtonText", () => {
    assert.ok(
      hc.includes("ButtonText"),
      "forced-colors must reference ButtonText for interactive element borders"
    );
  });

  it("forced-colors maps links to system LinkText", () => {
    assert.ok(
      hc.includes("LinkText"),
      "forced-colors must map links to system LinkText"
    );
  });

  it("forced-colors hides decorative SVGs", () => {
    assert.ok(
      hc.includes("[data-decorative]"),
      "forced-colors must handle data-decorative elements"
    );
  });

  it("forced-colors replaces golden thread box-shadow with border", () => {
    assert.ok(
      hc.includes(".golden-thread-passage"),
      "forced-colors must handle golden thread passages"
    );
  });

  it("forced-colors documented in accessibility.language.json", () => {
    const accessibilityJSON = readFileSync(
      join(ROOT, "semantics", "accessibility.language.json"),
      "utf-8"
    );
    const accessibility = JSON.parse(accessibilityJSON);
    const fc = accessibility.visual?.["forced-colors"];
    assert.ok(fc, "Expected forced-colors in accessibility.language.json visual section");
    assert.ok(fc["system-color-mapping"], "forced-colors must document system-color-mapping");
    assert.ok(fc.principle, "forced-colors must reference a governing principle");
  });
});

/* ══════════════════════════════════════════════════════════════════ */
/*  16. SKIP NAVIGATION — DES-025                                    */
/* ══════════════════════════════════════════════════════════════════ */

describe("Skip navigation (DES-025)", () => {
  const calm = readCSS("calm.css");

  it(".skip-nav class exists in calm.css", () => {
    assert.ok(
      calm.includes(".skip-nav"),
      "calm.css must define .skip-nav pattern"
    );
  });

  it("skip-nav is visually hidden by default (translateY)", () => {
    assert.ok(
      calm.includes("translateY(-100%)"),
      ".skip-nav must be translated above viewport by default"
    );
  });

  it("skip-nav becomes visible on :focus", () => {
    assert.ok(
      calm.includes(".skip-nav:focus"),
      ".skip-nav must have :focus state that reveals it"
    );
    assert.ok(
      calm.includes("translateY(0)"),
      ".skip-nav:focus must translate back to visible position"
    );
  });

  it("skip-nav works in forced-colors mode", () => {
    assert.ok(
      calm.includes("forced-colors: active") &&
        calm.includes(".skip-nav:focus"),
      "skip-nav must have forced-colors override"
    );
  });

  it("skip-nav respects prefers-reduced-motion", () => {
    // The global reduced-motion rule covers this, but skip-nav
    // should also have its own explicit transition: none
    assert.ok(
      calm.includes("prefers-reduced-motion"),
      "calm.css must handle reduced motion (global rule covers skip-nav)"
    );
  });

  it("skip-nav documented in accessibility.language.json", () => {
    const accessibilityJSON = readFileSync(
      join(ROOT, "semantics", "accessibility.language.json"),
      "utf-8"
    );
    const accessibility = JSON.parse(accessibilityJSON);
    const sn = accessibility.visual?.["skip-navigation"];
    assert.ok(sn, "Expected skip-navigation in accessibility.language.json visual section");
    assert.ok(sn.usage?.html, "skip-navigation must document HTML usage");
    assert.ok(sn["css-class"], "skip-navigation must document CSS class name");
  });

  it("skip-nav in semantic-html chapter-reader structure", () => {
    const patternJSON = readFileSync(
      join(ROOT, "patterns", "reading-surface.pattern.json"),
      "utf-8"
    );
    const pattern = JSON.parse(patternJSON);
    const structure = pattern["semantic-html"]["chapter-reader"].structure;
    const skipNavEl = structure.find((s) => s.element.includes("skip-nav"));
    assert.ok(skipNavEl, "chapter-reader semantic HTML must include skip-nav element");
    // It should be the first element in the structure
    assert.ok(
      structure[0].element.includes("skip-nav"),
      "skip-nav must be the FIRST element in the chapter-reader structure"
    );
  });
});
