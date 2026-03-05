"use client";

import { useState } from "react";

type Accent = "gold" | "ochre" | "crimson";

const accents: { id: Accent; label: string; voice: string; cssVar: string }[] = [
  { id: "gold", label: "Gold", voice: "Contemplative", cssVar: "var(--color-gold)" },
  { id: "ochre", label: "Ochre", voice: "Communal", cssVar: "var(--color-ochre)" },
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

/* Voice-shaped asymmetry: gold 6, crimson 5, ochre 4. The asymmetry is the design.
   CSS classes from attention.css; CSS vars from foundations.css. Texture has no class
   (expressed via SVG fractalNoise, not opacity). */
const levelsByAccent: Record<Accent, Level[]> = {
  gold: [
    { name: "Interactive", opacity: 1.0, cssClass: "gold-interactive", cssVar: "--gold-interactive", purpose: "Demands attention — the seeker is engaging", elements: "Focus rings, active links, call-to-action accents" },
    { name: "Decorative", opacity: 0.4, cssClass: "gold-decorative", cssVar: "--gold-decorative", purpose: "Present but not calling — background beauty", elements: "Epigraph marks, chapter ornaments, scene-break dividers" },
    { name: "Ambient", opacity: 0.3, cssClass: "gold-ambient", cssVar: "--gold-ambient", purpose: "Peripheral awareness — orientation without distraction", elements: "Scroll indicator, meditate-theme gold, progress" },
    { name: "Highlight", opacity: 0.2, cssClass: "gold-highlight", cssVar: "--gold-highlight", purpose: "Guiding the reader, not grabbing them", elements: "Keyboard-navigated paragraph outline, current section" },
    { name: "Subliminal", opacity: 0.06, cssClass: "gold-subliminal", cssVar: "--gold-subliminal", purpose: "Registers as warmth, not color", elements: "Paragraph hover background, dwell mode highlight" },
    { name: "Texture", opacity: 0.03, cssClass: null, cssVar: "--gold-texture", purpose: "The ghost of physical pages", elements: "Paper texture noise overlay, background warmth" },
  ],
  crimson: [
    { name: "Interactive", opacity: 1.0, cssClass: "crimson-interactive", cssVar: "--crimson-interactive", purpose: "Structural authority — the book speaking", elements: "Chapter titles, publication labels, drop capitals" },
    { name: "Decorative", opacity: 0.4, cssClass: "crimson-decorative", cssVar: "--crimson-decorative", purpose: "Ornamental marks with structural purpose", elements: "Section dividers, rubricated ornaments" },
    { name: "Ambient", opacity: 0.25, cssClass: "crimson-ambient", cssVar: "--crimson-ambient", purpose: "Peripheral book awareness", elements: "Book progress indicators, TOC markers" },
    { name: "Highlight", opacity: 0.15, cssClass: "crimson-highlight", cssVar: "--crimson-highlight", purpose: "Guiding navigation through structure", elements: "Chapter navigation hover, current chapter marker" },
    { name: "Subliminal", opacity: 0.06, cssClass: "crimson-subliminal", cssVar: "--crimson-subliminal", purpose: "Faint publication warmth", elements: "Background tint in publication context" },
  ],
  ochre: [
    { name: "Interactive", opacity: 1.0, cssClass: "ochre-interactive", cssVar: "--ochre-interactive", purpose: "Communal energy — invitation to participate", elements: "Event CTAs, registration buttons, active links" },
    { name: "Decorative", opacity: 0.4, cssClass: "ochre-decorative", cssVar: "--ochre-decorative", purpose: "Warm presence without urgency", elements: "Category badges, event type indicators" },
    { name: "Ambient", opacity: 0.2, cssClass: "ochre-ambient", cssVar: "--ochre-ambient", purpose: "Background orientation for events", elements: "Section dividers, calendar markers" },
    { name: "Subliminal", opacity: 0.06, cssClass: "ochre-subliminal", cssVar: "--ochre-subliminal", purpose: "Communal warmth without distraction", elements: "Hover backgrounds, active section tint" },
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
          five — structure, not atmosphere. Ochre (communal) uses four —
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

        {/* ── Gradient Borders — Spatial Attention Axis ─────────── */}
        <GradientBorderDemo />
      </div>
    </section>
  );
}

/* ── Gradient Border Showcase ──────────────────────────────────── */

const gradientBorders: { voice: string; label: string; description: string; stops: string }[] = [
  { voice: "gold", label: "Gold — Contemplative", description: "The reading lamp's glow. accent → darkened → accent.", stops: "gold → gold-dark → gold" },
  { voice: "ochre", label: "Ochre — Communal", description: "The kāṣāya spectrum. Renunciant cloth warming through gold.", stops: "ochre → gold → ochre" },
  { voice: "crimson", label: "Crimson — Publication", description: "Rubrication meets the reading lamp.", stops: "crimson → gold → crimson" },
];

function GradientBorderDemo() {
  return (
    <div className="mt-12">
      <h3
        className="display-text mb-2"
        style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "var(--color-text)" }}
      >
        Gradient Borders
      </h3>
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
        Where opacity asks <em>how much</em> attention, gradient borders ask{" "}
        <em>where</em> attention gathers. Gold mediates every gradient — the bindu
        color at the center. The ochre gradient is the kāṣāya spectrum made visible:
        one pigment family at different stages of its journey.
      </p>

      {/* Three voice gradient border demos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {gradientBorders.map((gb) => (
          <div key={gb.voice} className="space-y-2">
            <div
              className={`gradient-border gradient-border-${gb.voice}`}
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--color-text)",
                }}
              >
                {gb.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "12px",
                  color: "var(--color-text-secondary)",
                }}
              >
                {gb.description}
              </span>
            </div>
            <div
              className="flex items-center gap-2"
              style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "var(--color-text-secondary)" }}
            >
              <code className="token-value">.gradient-border-{gb.voice}</code>
              <span style={{ opacity: 0.5 }}>{gb.stops}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Focus ring demo */}
      <div className="space-y-3">
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--color-text)",
          }}
        >
          Focus Ring
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            className="gradient-focus"
            style={{
              padding: "8px 20px",
              fontFamily: "var(--font-ui)",
              fontSize: "14px",
              color: "var(--color-text)",
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-default)",
              cursor: "pointer",
            }}
          >
            Tab to focus
          </button>
          <input
            type="text"
            placeholder="Focus this input"
            className="gradient-focus"
            style={{
              padding: "8px 14px",
              fontFamily: "var(--font-ui)",
              fontSize: "14px",
              color: "var(--color-text)",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-default)",
              width: "200px",
            }}
          />
        </div>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            opacity: 0.7,
          }}
        >
          <code className="token-value">.gradient-focus</code> replaces the flat gold outline
          on <code className="token-value">:focus-visible</code> with a directional gradient ring.
          Voice follows context automatically.
        </p>
      </div>
    </div>
  );
}
