"use client";

import { useState } from "react";

/* ── Responsive Strategy ─────────────────────────────────────────
   Four viewport tiers, three interaction modalities, orientation
   handling. The portal's responsive vocabulary — named tiers
   prevent magic numbers, interaction detection prevents viewport
   assumptions.

   Source: semantics/responsive-strategy.language.json, FTR-044
   ────────────────────────────────────────────────────────────── */

const viewportTiers = [
  {
    name: "Mobile",
    range: "\u2264 639px",
    character: "Single column, full-width, touch-first",
    readerBehavior: "Single column, full-width text. Landscape: line length capped.",
    color: "var(--color-gold)",
    widthPct: 25,
  },
  {
    name: "Tablet",
    range: "640 \u2013 1023px",
    character: "First-class reading surface \u2014 not an interpolation",
    readerBehavior: "Wider margins than mobile, narrower than desktop. Landscape: two-column opt-in.",
    color: "var(--color-gold)",
    widthPct: 50,
    highlight: true,
  },
  {
    name: "Desktop",
    range: "\u2265 1024px",
    character: "Full layout. Side panels visible. Hover affordances.",
    readerBehavior: "Generous margins. Related Teachings side panel visible.",
    color: "var(--color-gold)",
    widthPct: 75,
  },
  {
    name: "Wide",
    range: "\u2265 1280px",
    character: "Reader centered at max-content width",
    readerBehavior: "Reader centered, side panel always visible.",
    color: "var(--color-gold)",
    widthPct: 100,
  },
];

const interactionModes = [
  {
    name: "Desktop-class",
    detection: "@media (hover: hover) and (pointer: fine)",
    affordances: "Hover tooltips, dwell icon reveal on hover, fine cursor interactions",
    touchTarget: "44px minimum",
  },
  {
    name: "Touch-primary",
    detection: "@media (hover: none) and (pointer: coarse)",
    affordances: "Long-press dwell, native share sheet, enlarged tap targets",
    touchTarget: "48px minimum",
  },
  {
    name: "Hybrid",
    detection: "@media (hover: hover) and (pointer: coarse)",
    affordances: "Both hover and touch. Favor touch for primary actions.",
    touchTarget: "48px minimum",
  },
];

const orientationBehaviors = [
  {
    name: "Phone landscape",
    treatment: "Single column, wider margins. Line length capped at 36rem.",
    css: "max-inline-size: 36rem; margin-inline: auto",
  },
  {
    name: "Tablet landscape",
    treatment: "Two-column option: chapter text left, Related Teachings right. Opt-in via reader settings.",
    css: "Orientation drives layout, not viewport width",
  },
  {
    name: "Presentation landscape",
    treatment: "Text fills viewport width. Proportionally larger font for group reading.",
    css: "data-mode='present'",
  },
];

type Tab = "tiers" | "interaction" | "orientation";

export default function ResponsiveStrategy() {
  const [tab, setTab] = useState<Tab>("tiers");

  return (
    <section id="responsive" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
        >
          Responsive Strategy
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
          Four named viewport tiers, three interaction modalities, and
          orientation-aware layout. Viewport width alone is an unreliable
          proxy &mdash; interaction capability and orientation matter too.
        </p>

        {/* Tab bar */}
        <div className="flex gap-1 mb-6">
          {([
            { value: "tiers" as Tab, label: "Viewport Tiers" },
            { value: "interaction" as Tab, label: "Interaction" },
            { value: "orientation" as Tab, label: "Orientation" },
          ]).map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className="theme-transition cursor-pointer px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                fontFamily: "var(--font-ui)",
                backgroundColor: tab === t.value ? "var(--color-gold)" : "var(--color-bg-secondary)",
                color: tab === t.value ? "var(--color-navy)" : "var(--color-text-secondary)",
                border: `1px solid ${tab === t.value ? "var(--color-gold)" : "var(--color-border)"}`,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Viewport Tiers */}
        {tab === "tiers" && (
          <div className="space-y-3">
            {viewportTiers.map((tier) => (
              <div
                key={tier.name}
                className="theme-transition rounded-md overflow-hidden"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  border: tier.highlight
                    ? "1px solid var(--color-gold)"
                    : "1px solid var(--color-border)",
                }}
              >
                {/* Width visualization bar */}
                <div
                  style={{
                    height: "3px",
                    width: `${tier.widthPct}%`,
                    backgroundColor: tier.color,
                    opacity: 0.4,
                    transition: "width 300ms var(--easing-standard)",
                  }}
                />
                <div className="p-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="font-semibold"
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "14px",
                        color: tier.highlight ? "var(--color-gold)" : "var(--color-text)",
                      }}
                    >
                      {tier.name}
                    </span>
                    <span className="token-value">{tier.range}</span>
                    {tier.highlight && (
                      <span
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: "10px",
                          color: "var(--color-gold)",
                          opacity: 0.6,
                        }}
                      >
                        first-class
                      </span>
                    )}
                  </div>
                  <div
                    className="text-xs mb-1"
                    style={{
                      fontFamily: "var(--font-ui)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {tier.character}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-ui)",
                      color: "var(--color-text-secondary)",
                      opacity: 0.7,
                    }}
                  >
                    Reader: {tier.readerBehavior}
                  </div>
                </div>
              </div>
            ))}

            {/* Tablet philosophy callout */}
            <div
              className="theme-transition rounded-md p-4 mt-2"
              style={{
                backgroundColor: "var(--color-surface)",
                borderInlineStart: "3px solid var(--color-gold)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-reading)",
                  fontSize: "14px",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: "var(--color-text-secondary)",
                }}
              >
                &ldquo;Tablets are arguably the ideal form factor for
                sustained book reading &mdash; larger than a phone, more
                portable than a laptop, usable in bed, in a garden, or at
                a study group. The portal treats tablet as a distinct
                experience tier.&rdquo;
              </div>
            </div>
          </div>
        )}

        {/* Interaction Modality */}
        {tab === "interaction" && (
          <div className="space-y-3">
            {interactionModes.map((mode) => (
              <div
                key={mode.name}
                className="theme-transition rounded-md p-4"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className="font-semibold"
                    style={{ fontFamily: "var(--font-ui)", fontSize: "14px", color: "var(--color-text)" }}
                  >
                    {mode.name}
                  </span>
                  <code
                    className="token-value"
                    style={{ fontSize: "10px" }}
                  >
                    {mode.detection}
                  </code>
                </div>
                <div
                  className="text-xs mb-2"
                  style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}
                >
                  {mode.affordances}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: mode.touchTarget,
                      height: mode.touchTarget,
                      borderRadius: "4px",
                      border: "1px dashed var(--color-gold)",
                      opacity: 0.4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "9px",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      tap
                    </span>
                  </div>
                  <span
                    className="text-xs"
                    style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}
                  >
                    {mode.touchTarget} touch target
                  </span>
                </div>
              </div>
            ))}

            {/* Component implications */}
            <div
              className="theme-transition rounded-md p-4"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}
              >
                Component Implications
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { feature: "Dwell Mode", desktop: "Hover icon", touch: "Long-press" },
                  { feature: "Share", desktop: "Custom menu", touch: "navigator.share" },
                  { feature: "Glossary", desktop: "Hover tooltip", touch: "Tap to reveal" },
                ].map((item) => (
                  <div key={item.feature}>
                    <div
                      className="text-xs font-semibold mb-1"
                      style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}
                    >
                      {item.feature}
                    </div>
                    <div
                      className="text-xs"
                      style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)", lineHeight: 1.4 }}
                    >
                      <span style={{ opacity: 0.6 }}>Desktop:</span> {item.desktop}
                      <br />
                      <span style={{ opacity: 0.6 }}>Touch:</span> {item.touch}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orientation */}
        {tab === "orientation" && (
          <div className="space-y-3">
            {orientationBehaviors.map((item) => (
              <div
                key={item.name}
                className="theme-transition rounded-md p-4"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="font-semibold mb-1"
                  style={{ fontFamily: "var(--font-ui)", fontSize: "14px", color: "var(--color-text)" }}
                >
                  {item.name}
                </div>
                <div
                  className="text-xs mb-2"
                  style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}
                >
                  {item.treatment}
                </div>
                <code className="token-value" style={{ fontSize: "10px" }}>
                  {item.css}
                </code>
              </div>
            ))}

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
                The portal does not lock orientation. Orientation transitions
                are natural breakpoints &mdash; the layout responds to the
                device&rsquo;s physical state, not to an arbitrary pixel count.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
