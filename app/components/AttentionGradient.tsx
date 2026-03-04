"use client";

import { useState } from "react";

type Accent = "gold" | "marigold" | "crimson";

const accents: { id: Accent; label: string; voice: string; cssVar: string }[] = [
  { id: "gold", label: "Gold", voice: "Contemplative", cssVar: "var(--color-gold)" },
  { id: "marigold", label: "Marigold", voice: "Communal", cssVar: "var(--color-marigold)" },
  { id: "crimson", label: "Crimson", voice: "Publication", cssVar: "var(--color-crimson)" },
];

interface Level {
  name: string;
  opacity: number;
  cssClass: string | null;
  cssVar: string | null;
  purpose: string;
  elements: string;
}

/* Voice-shaped asymmetry: gold 6, crimson 5, marigold 4. The asymmetry is the design.
   CSS classes from attention.css; CSS vars from foundations.css. Texture has no class
   (expressed via SVG fractalNoise, not opacity). */
const levelsByAccent: Record<Accent, Level[]> = {
  gold: [
    { name: "Interactive", opacity: 1.0, cssClass: "gold-interactive", cssVar: "--gold-interactive", purpose: "Demands attention \u2014 the seeker is engaging", elements: "Focus rings, active links, call-to-action accents" },
    { name: "Decorative", opacity: 0.4, cssClass: "gold-decorative", cssVar: "--gold-decorative", purpose: "Present but not calling \u2014 background beauty", elements: "Epigraph marks, chapter ornaments, scene-break dividers" },
    { name: "Ambient", opacity: 0.3, cssClass: "gold-ambient", cssVar: "--gold-ambient", purpose: "Peripheral awareness \u2014 orientation without distraction", elements: "Scroll indicator, meditate-theme gold, progress" },
    { name: "Highlight", opacity: 0.2, cssClass: "gold-highlight", cssVar: "--gold-highlight", purpose: "Guiding the reader, not grabbing them", elements: "Keyboard-navigated paragraph outline, current section" },
    { name: "Subliminal", opacity: 0.06, cssClass: "gold-subliminal", cssVar: "--gold-subliminal", purpose: "Registers as warmth, not color", elements: "Paragraph hover background, dwell mode highlight" },
    { name: "Texture", opacity: 0.03, cssClass: null, cssVar: "--gold-texture", purpose: "The ghost of physical pages", elements: "Paper texture noise overlay, background warmth" },
  ],
  crimson: [
    { name: "Interactive", opacity: 1.0, cssClass: "crimson-interactive", cssVar: "--crimson-interactive", purpose: "Structural authority \u2014 the book speaking", elements: "Chapter titles, publication labels, drop capitals" },
    { name: "Decorative", opacity: 0.4, cssClass: "crimson-decorative", cssVar: "--crimson-decorative", purpose: "Ornamental marks with structural purpose", elements: "Section dividers, rubricated ornaments" },
    { name: "Ambient", opacity: 0.25, cssClass: "crimson-ambient", cssVar: "--crimson-ambient", purpose: "Peripheral book awareness", elements: "Book progress indicators, TOC markers" },
    { name: "Highlight", opacity: 0.15, cssClass: "crimson-highlight", cssVar: "--crimson-highlight", purpose: "Guiding navigation through structure", elements: "Chapter navigation hover, current chapter marker" },
    { name: "Subliminal", opacity: 0.06, cssClass: "crimson-subliminal", cssVar: "--crimson-subliminal", purpose: "Faint publication warmth", elements: "Background tint in publication context" },
  ],
  marigold: [
    { name: "Interactive", opacity: 1.0, cssClass: "marigold-interactive", cssVar: "--marigold-interactive", purpose: "Communal energy \u2014 invitation to participate", elements: "Event CTAs, registration buttons, active links" },
    { name: "Decorative", opacity: 0.4, cssClass: "marigold-decorative", cssVar: "--marigold-decorative", purpose: "Warm presence without urgency", elements: "Category badges, event type indicators" },
    { name: "Ambient", opacity: 0.2, cssClass: "marigold-ambient", cssVar: "--marigold-ambient", purpose: "Background orientation for events", elements: "Section dividers, calendar markers" },
    { name: "Subliminal", opacity: 0.06, cssClass: "marigold-subliminal", cssVar: "--marigold-subliminal", purpose: "Communal warmth without distraction", elements: "Hover backgrounds, active section tint" },
  ],
};

function GradientTabs({
  active,
  onChange,
}: {
  active: Accent;
  onChange: (a: Accent) => void;
}) {
  return (
    <div className="flex gap-2 mb-6">
      {accents.map((a) => {
        const selected = a.id === active;
        return (
          <button
            key={a.id}
            onClick={() => onChange(a.id)}
            className="theme-transition"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "6px",
              border: selected
                ? `2px solid ${a.cssVar}`
                : "2px solid var(--color-border)",
              backgroundColor: selected
                ? "var(--color-bg-secondary)"
                : "transparent",
              cursor: "pointer",
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              fontWeight: selected ? 600 : 400,
              color: selected ? "var(--color-text)" : "var(--color-text-secondary)",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: a.cssVar,
                opacity: selected ? 1 : 0.5,
              }}
            />
            {a.label}
            <span
              style={{
                fontSize: "11px",
                opacity: 0.6,
                fontWeight: 400,
              }}
            >
              {a.voice}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function AttentionGradient() {
  const [accent, setAccent] = useState<Accent>("gold");
  const activeAccent = accents.find((a) => a.id === accent)!;
  const levels = levelsByAccent[accent];

  return (
    <section id="gradient" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
        >
          Attention Gradient
        </h2>
        <p
          className="mb-8"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            maxWidth: "600px",
          }}
        >
          Three accent voices at calibrated opacity levels. Gold (contemplative)
          uses six levels from interactive to texture. Crimson (publication) uses
          five — structure, not atmosphere. Marigold (communal) uses four —
          energy, not contemplation. The asymmetry is the design.
        </p>

        <GradientTabs active={accent} onChange={setAccent} />

        <div className="space-y-3">
          {levels.map((level, i) => (
            <div
              key={level.name}
              className="theme-transition flex items-stretch rounded-md overflow-hidden"
              style={{
                border: "1px solid var(--color-border)",
                animationDelay: `${i * 100}ms`,
              }}
            >
              {/* Accent swatch */}
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: "100px",
                  backgroundColor: "var(--color-bg-secondary)",
                  position: "relative",
                }}
              >
                <div
                  className="theme-transition"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: activeAccent.cssVar,
                    opacity: level.opacity,
                    transition: `background-color var(--motion-content) var(--easing-standard), opacity var(--motion-content) var(--easing-standard)`,
                  }}
                />
                <div
                  className="absolute bottom-2 text-xs font-mono"
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    color: "var(--color-text-secondary)",
                    fontSize: "11px",
                  }}
                >
                  {level.opacity}
                </div>
              </div>

              {/* Details */}
              <div
                className="theme-transition flex-1 p-4"
                style={{ backgroundColor: "var(--color-bg)" }}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "15px",
                      color: "var(--color-text)",
                    }}
                  >
                    {level.name}
                  </span>
                  <span className="token-value">
                    {level.cssClass ? `.${level.cssClass}` : `opacity: ${level.opacity}`}
                  </span>
                </div>
                <div
                  className="text-sm mb-1"
                  style={{
                    fontFamily: "var(--font-ui)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {level.purpose}
                </div>
                <div
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-ui)",
                    color: "var(--color-text-secondary)",
                    opacity: 0.7,
                  }}
                >
                  {level.elements}
                </div>
              </div>

              {/* Live example bar — uses real CSS attention classes */}
              <div
                className="hidden sm:flex items-center justify-center shrink-0"
                style={{
                  width: "200px",
                  backgroundColor: "var(--color-bg-secondary)",
                  padding: "12px",
                }}
              >
                {level.cssClass ? (
                  <div
                    className={`${level.cssClass} w-full h-full rounded theme-transition`}
                    style={{
                      border: "2px solid currentColor",
                      minHeight: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: `color var(--motion-content) var(--easing-standard), opacity var(--motion-content) var(--easing-standard)`,
                    }}
                  >
                    <span
                      className="text-xs"
                      style={{ fontFamily: "var(--font-ui)" }}
                    >
                      {level.name.toLowerCase()}
                    </span>
                  </div>
                ) : (
                  <div
                    className="w-full h-full rounded theme-transition"
                    style={{
                      border: `2px solid ${activeAccent.cssVar}`,
                      opacity: level.opacity,
                      minHeight: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: "var(--font-ui)",
                        color: activeAccent.cssVar,
                      }}
                    >
                      {level.name.toLowerCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Gradient strips — all three accents, voice-shaped */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {accents.map((a) => {
            const voiceLevels = levelsByAccent[a.id];
            const lowest = voiceLevels[voiceLevels.length - 1].opacity;
            return (
              <div key={a.id}>
                <div className="rounded-md overflow-hidden" style={{ height: "40px" }}>
                  <div
                    className="h-full"
                    style={{
                      background: `linear-gradient(to right, ${voiceLevels
                        .map(
                          (l, i) =>
                            `color-mix(in srgb, ${a.cssVar} ${Math.round(l.opacity * 100)}%, transparent) ${Math.round((i / (voiceLevels.length - 1)) * 100)}%`,
                        )
                        .join(", ")})`,
                    }}
                  />
                </div>
                <div
                  className="flex justify-between mt-1 text-xs"
                  style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}
                >
                  <span>{a.label} &middot; {a.voice} &middot; {voiceLevels.length} levels</span>
                  <span>{lowest}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
