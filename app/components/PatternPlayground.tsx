"use client";

import { sharedTokens, srfTokens } from "@/lib/tokens";

function SpacingScale() {
  const spaces = Object.entries(sharedTokens.space).filter(
    ([key]) => key !== "$type" && key !== "$description"
  ) as [string, { $value: { value: number }; $description: string }][];

  return (
    <div
      className="theme-transition rounded-md p-5"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-4"
        style={{
          fontFamily: "var(--font-ui)",
          color: "var(--color-gold)",
        }}
      >
        Spacing Scale (8px base)
      </h3>
      <div className="space-y-2">
        {spaces.map(([name, token]) => (
          <div key={name} className="flex items-center gap-3">
            <span
              className="text-xs w-16 shrink-0 text-right"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-text-secondary)",
              }}
            >
              {name}
            </span>
            <div
              className="rounded-sm"
              style={{
                width: `${token.$value.value}px`,
                height: "24px",
                backgroundColor: "var(--color-gold)",
                opacity: 0.4,
                transition: `width var(--motion-content) var(--easing-standard)`,
              }}
            />
            <span className="token-value text-xs">{token.$value.value}px</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OpacityScale() {
  const opacities = Object.entries(sharedTokens.opacity).filter(
    ([key]) => key !== "$type" && key !== "$description"
  ) as [string, { $value: number; $description: string }][];

  return (
    <div
      className="theme-transition rounded-md p-5"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-4"
        style={{
          fontFamily: "var(--font-ui)",
          color: "var(--color-gold)",
        }}
      >
        Opacity Scale
      </h3>
      <div className="space-y-2">
        {opacities.map(([name, token]) => (
          <div key={name} className="flex items-center gap-3">
            <span
              className="text-xs w-16 shrink-0 text-right"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-text-secondary)",
              }}
            >
              {name}
            </span>
            <div
              className="flex-1 h-6 rounded-sm"
              style={{
                backgroundColor: "var(--color-text)",
                opacity: token.$value,
              }}
            />
            <span className="token-value text-xs">{token.$value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadiusScale() {
  const radii = Object.entries(sharedTokens.radius).filter(
    ([key]) => key !== "$type" && key !== "$description"
  ) as [string, { $value: { value: number }; $description: string }][];

  return (
    <div
      className="theme-transition rounded-md p-5"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-4"
        style={{
          fontFamily: "var(--font-ui)",
          color: "var(--color-gold)",
        }}
      >
        Border Radius
      </h3>
      <div className="flex gap-4 flex-wrap">
        {radii.map(([name, token]) => (
          <div key={name} className="text-center">
            <div
              className="w-14 h-14 mb-2 mx-auto"
              style={{
                border: "2px solid var(--color-gold)",
                opacity: 0.6,
                borderRadius:
                  token.$value.value === 9999
                    ? "50%"
                    : `${token.$value.value}px`,
              }}
            />
            <div
              className="text-xs"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-text)",
              }}
            >
              {name}
            </div>
            <div className="token-value text-xs mt-0.5">
              {token.$value.value}px
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReadingSurface() {
  return (
    <div
      className="theme-transition rounded-md overflow-hidden"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div
        className="p-4"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{
            fontFamily: "var(--font-ui)",
            color: "var(--color-gold)",
          }}
        >
          Reading Surface Pattern
        </h3>
      </div>
      <div
        className="p-8"
        style={{
          backgroundColor: "var(--color-bg)",
          maxWidth: "42em",
          margin: "0 auto",
        }}
      >
        {/* Drop capital */}
        <div className="reading-text" style={{ color: "var(--color-text)" }}>
          <span
            className="float-left mr-2 mt-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: 0.78,
              color: "var(--color-gold)",
            }}
          >
            T
          </span>
          he characteristic features of Indian culture have long been a search
          for ultimate truths and the concomitant disciple-guru relationship, a
          universal seeking for a Goal beyond the material-Loss-of-Self-in-
          Cosmic-Consciousness.
        </div>

        {/* Lotus divider */}
        <div className="lotus-divider">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lotus.svg" alt="" className="h-5" />
        </div>

        <div className="reading-text" style={{ color: "var(--color-text)" }}>
          Be as simple as you can be; you will be astonished to see how
          uncomplicated and happy your life can become. Live quietly in the
          moment and see the beauty of all before you.
        </div>

        {/* Citation */}
        <div className="citation-text mt-4">
          &mdash;&nbsp;Paramahansa Yogananda, <em>Autobiography of a Yogi</em>,
          Chapter 1, p. 3
        </div>
      </div>
    </div>
  );
}

function ColorPalette() {
  const colors = [
    { name: "Gold", value: srfTokens.color.gold.$value, token: "color.gold" },
    { name: "Navy", value: srfTokens.color.navy.$value, token: "color.navy" },
    {
      name: "Cream",
      value: srfTokens.color.cream.$value,
      token: "color.cream",
    },
    {
      name: "Cream Dark",
      value: srfTokens.color["cream-dark"].$value,
      token: "color.cream-dark",
    },
    {
      name: "Surface",
      value: srfTokens.color.surface.$value,
      token: "color.surface",
    },
  ];

  return (
    <div
      className="theme-transition rounded-md p-5"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-4"
        style={{
          fontFamily: "var(--font-ui)",
          color: "var(--color-gold)",
        }}
      >
        SRF Color Palette
      </h3>
      <div className="flex gap-3 flex-wrap">
        {colors.map((c) => (
          <div key={c.name} className="text-center">
            <div
              className="w-16 h-16 rounded-md mb-2"
              style={{
                backgroundColor: c.value,
                border: "1px solid var(--color-border)",
              }}
            />
            <div
              className="text-xs font-medium"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-text)",
              }}
            >
              {c.name}
            </div>
            <div className="token-value text-xs mt-0.5">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PatternPlayground() {
  return (
    <section id="patterns" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
        >
          Pattern Playground
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
          Foundation tokens composed into live patterns. All values derive from
          the design token files. Switch themes above to see how tokens adapt
          across contexts.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SpacingScale />
          <OpacityScale />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RadiusScale />
          <ColorPalette />
        </div>

        <ReadingSurface />
      </div>
    </section>
  );
}
