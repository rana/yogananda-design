"use client";

/* ── Multi-Script Typography ──────────────────────────────────────
   The design language adapts across five scripts while maintaining
   the same contemplative quality. Font stacks, line-height
   adjustments, and loading strategy differ per script — but the
   emotional register remains invariant.

   Source: semantics/localization.language.json, DES-017
   ─────────────────────────────────────────────────────────────── */

const scripts = [
  {
    name: "Latin",
    sample: "\u201cBe as simple as you can be; you will be astonished to see how uncomplicated and happy your life can become.\u201d",
    attribution: "\u2014 Paramahansa Yogananda",
    readingFont: "Merriweather, Georgia, serif",
    uiFont: "Open Sans, system-ui, sans-serif",
    lineHeight: 1.8,
    fontSize: "18px",
    loading: "Default \u2014 always loaded",
    note: null,
  },
  {
    name: "Devanagari",
    sample: "\u201c\u091c\u093f\u0924\u0928\u093e \u0938\u0930\u0932 \u0939\u094b \u0938\u0915\u0924\u0947 \u0939\u094b \u0909\u0924\u0928\u093e \u0938\u0930\u0932 \u0939\u094b \u091c\u093e\u0913; \u0924\u0941\u092e\u094d\u0939\u0947\u0902 \u092f\u0939 \u0926\u0947\u0916\u0915\u0930 \u0906\u0936\u094d\u091a\u0930\u094d\u092f \u0939\u094b\u0917\u093e \u0915\u093f \u0924\u0941\u092e\u094d\u0939\u093e\u0930\u093e \u091c\u0940\u0935\u0928 \u0915\u093f\u0924\u0928\u093e \u0938\u0930\u0932 \u0914\u0930 \u0938\u0941\u0916\u0940 \u0939\u094b \u0938\u0915\u0924\u093e \u0939\u0948\u0964\u201d",
    attribution: "\u2014 \u092a\u0930\u092e\u0939\u0902\u0938 \u092f\u094b\u0917\u093e\u0928\u0928\u094d\u0926",
    readingFont: "Noto Serif Devanagari, serif",
    uiFont: "Noto Sans Devanagari, sans-serif",
    lineHeight: 2.0,
    fontSize: "18px",
    loading: "Hindi locale eagerly preloads. English pages: conditional.",
    note: "1.9\u20132.0 line-height \u2014 taller glyphs with hanging characters",
  },
  {
    name: "Bengali",
    sample: "\u201c\u09af\u09a4\u099f\u09be \u09b8\u09b0\u09b2 \u09b9\u0993 \u09a4\u09a4\u09c7\u0987 \u09ad\u09be\u09b2\u09cb; \u09a4\u09cb\u09ae\u09be\u09b0 \u099c\u09c0\u09ac\u09a8 \u0995\u09a4 \u09b8\u09b9\u099c \u0993 \u09b8\u09c1\u0996\u09c0 \u09b9\u09a4\u09c7 \u09aa\u09be\u09b0\u09c7 \u09a6\u09c7\u0996\u09c7 \u0985\u09ac\u09be\u0995 \u09b9\u09ac\u09c7\u0964\u201d",
    attribution: "\u2014 \u09aa\u09b0\u09ae\u09b9\u0982\u09b8 \u09af\u09cb\u0997\u09be\u09a8\u09a8\u09cd\u09a6",
    readingFont: "Noto Serif Bengali, serif",
    uiFont: "Noto Sans Bengali, sans-serif",
    lineHeight: 2.0,
    fontSize: "18px",
    loading: "Conditional on /bn/ locale",
    note: null,
  },
];

const additionalScripts = [
  {
    name: "Japanese (CJK)",
    reading: "Noto Serif JP",
    ui: "Noto Sans JP",
    loading: "Conditional on /ja/ locale",
  },
  {
    name: "Thai",
    reading: "Noto Serif Thai",
    ui: "Noto Sans Thai",
    loading: "Conditional on /th/ locale",
  },
];

export default function MultiScriptTypography() {
  return (
    <section id="multi-script" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
        >
          Multi-Script Typography
        </h2>
        <p
          className="mb-6"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            maxWidth: "600px",
          }}
        >
          The same contemplative quality across five scripts. Each has its
          own font stack, line-height, and loading strategy &mdash; but
          the emotional register remains invariant. A passage in Devanagari
          carries the same sacred weight as its English original.
        </p>

        {/* Live script comparison */}
        <div className="space-y-4 mb-6">
          {scripts.map((script) => (
            <div
              key={script.name}
              className="theme-transition rounded-md overflow-hidden"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="px-4 py-2 flex items-center justify-between"
                style={{
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "14px",
                      color: "var(--color-text)",
                    }}
                  >
                    {script.name}
                  </span>
                  <span className="token-value" style={{ fontSize: "10px" }}>
                    {script.readingFont.split(",")[0]}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-ui)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    line-height: {script.lineHeight}
                  </span>
                </div>
              </div>

              {/* Passage sample */}
              <div
                style={{
                  padding: "clamp(20px, 4vw, 32px)",
                  fontFamily: script.readingFont,
                  fontSize: script.fontSize,
                  lineHeight: script.lineHeight,
                  color: "var(--color-text)",
                  maxWidth: "42em",
                }}
              >
                {script.sample}
                <div
                  style={{
                    fontFamily: script.readingFont,
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "var(--color-gold)",
                    opacity: 0.4,
                    marginTop: "12px",
                  }}
                >
                  {script.attribution}
                </div>
              </div>

              {/* Metadata */}
              {script.note && (
                <div
                  className="px-4 py-2"
                  style={{
                    borderTop: "1px solid var(--color-border)",
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {script.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional scripts (no live font) */}
        <div
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}
        >
          Additional Scripts
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {additionalScripts.map((script) => (
            <div
              key={script.name}
              className="theme-transition rounded-md p-3"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="font-semibold text-sm mb-1"
                style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}
              >
                {script.name}
              </div>
              <div
                className="text-xs"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.4,
                }}
              >
                Reading: {script.reading}
                <br />
                UI: {script.ui}
                <br />
                <span style={{ opacity: 0.6 }}>{script.loading}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Loading principle */}
        <div
          className="theme-transition rounded-md p-4"
          style={{
            backgroundColor: "var(--color-surface)",
            borderInlineStart: "3px solid var(--color-gold)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "12px",
              lineHeight: 1.5,
              color: "var(--color-text-secondary)",
            }}
          >
            Non-Latin fonts load only when needed.{" "}
            <code className="token-value" style={{ fontSize: "10px" }}>
              unicode-range
            </code>{" "}
            gating prevents unnecessary downloads. System font fallbacks
            with{" "}
            <code className="token-value" style={{ fontSize: "10px" }}>
              size-adjust
            </code>{" "}
            provide instant rendering while web fonts load.
          </div>
        </div>

        {/* Fallback marking */}
        <div
          className="theme-transition rounded-md p-4 mt-4"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}
          >
            English Fallback Marking
          </div>
          <div
            className="text-xs mb-3"
            style={{
              fontFamily: "var(--font-ui)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.5,
            }}
          >
            When content appears in a different language, it&rsquo;s
            marked honestly. The tone is a librarian saying &ldquo;we
            have that on the other shelf.&rdquo;
          </div>
          {/* Simulated EN tag */}
          <div
            style={{
              fontFamily: "var(--font-reading)",
              fontSize: "16px",
              lineHeight: 1.8,
              color: "var(--color-text)",
            }}
          >
            Be as simple as you can be&hellip;{" "}
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                opacity: 0.6,
                verticalAlign: "super",
              }}
            >
              [EN]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
