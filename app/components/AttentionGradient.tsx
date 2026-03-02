"use client";

const levels = [
  {
    name: "Interactive",
    opacity: 1.0,
    purpose: "Demands attention \u2014 the seeker is engaging",
    elements: "Focus rings, active links, call-to-action accents",
    treatment: "Full gold, no transparency",
  },
  {
    name: "Decorative",
    opacity: 0.4,
    purpose: "Present but not calling \u2014 background beauty",
    elements: "Epigraph marks, chapter ornaments, lotus dividers",
    treatment: "Gold visible as ornament, not as signal",
  },
  {
    name: "Ambient",
    opacity: 0.3,
    purpose: "Peripheral awareness \u2014 orientation without distraction",
    elements: "Scroll indicator, meditate-theme gold, progress",
    treatment: "Gold as spatial cue, seen in periphery",
  },
  {
    name: "Highlight",
    opacity: 0.2,
    purpose: "Guiding the reader, not grabbing them",
    elements: "Keyboard-navigated paragraph outline, current section",
    treatment: "Gold as gentle guide, barely assertive",
  },
  {
    name: "Subliminal",
    opacity: 0.06,
    purpose: "Registers as warmth, not color",
    elements: "Paragraph hover background, dwell mode highlight",
    treatment: "Gold as sensation rather than sight",
  },
  {
    name: "Texture",
    opacity: 0.03,
    purpose: "The ghost of physical pages",
    elements: "Paper texture noise overlay, background warmth",
    treatment: "Gold as material memory, invisible to conscious eye",
  },
];

export default function AttentionGradient() {
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
          Gold at six calibrated opacity levels. A deliberate hierarchy from
          interactive (demands attention) to texture (the ghost of physical
          pages). The same hue, six different roles.
        </p>

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
              {/* Gold swatch */}
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: "100px",
                  backgroundColor: "var(--color-bg-secondary)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-gold)",
                    opacity: level.opacity,
                    transition: `opacity var(--motion-content) var(--easing-standard)`,
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
                    opacity: {level.opacity}
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

              {/* Live example bar */}
              <div
                className="hidden sm:flex items-center justify-center shrink-0"
                style={{
                  width: "200px",
                  backgroundColor: "var(--color-bg-secondary)",
                  padding: "12px",
                }}
              >
                <div
                  className="w-full h-full rounded"
                  style={{
                    border: `2px solid var(--color-gold)`,
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
                      color: "var(--color-gold)",
                      opacity: Math.min(1, level.opacity + 0.3),
                    }}
                  >
                    {level.name.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient strip */}
        <div className="mt-6 rounded-md overflow-hidden" style={{ height: "48px" }}>
          <div
            className="h-full flex"
            style={{
              background: `linear-gradient(to right,
                color-mix(in srgb, var(--color-gold) 100%, transparent),
                color-mix(in srgb, var(--color-gold) 40%, transparent) 20%,
                color-mix(in srgb, var(--color-gold) 30%, transparent) 35%,
                color-mix(in srgb, var(--color-gold) 20%, transparent) 50%,
                color-mix(in srgb, var(--color-gold) 6%, transparent) 75%,
                color-mix(in srgb, var(--color-gold) 3%, transparent)
              )`,
            }}
          />
        </div>
        <div
          className="flex justify-between mt-1 text-xs"
          style={{
            fontFamily: "var(--font-ui)",
            color: "var(--color-text-secondary)",
          }}
        >
          <span>Interactive (1.0)</span>
          <span>Texture (0.03)</span>
        </div>
      </div>
    </section>
  );
}
