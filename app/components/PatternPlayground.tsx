"use client";

import { sharedTokens, srfTokens, yssTokens } from "@/lib/tokens";
import { useDesign } from "./DesignProvider";

function SpacingScale() {
  const spaces = Object.entries(sharedTokens.space).filter(
    ([key]) => key !== "$type" && key !== "$description"
  ) as [string, { $value: { value: number }; $description: string }][];

  return (
    <div
      className="theme-transition rounded-md p-5"
      style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>
        Spacing Scale (8px base)
      </h3>
      <div className="space-y-2">
        {spaces.map(([name, token]) => (
          <div key={name} className="flex items-center gap-3">
            <span className="text-xs w-16 shrink-0 text-right" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
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
      style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>
        Opacity Scale
      </h3>
      <div className="space-y-2">
        {opacities.map(([name, token]) => (
          <div key={name} className="flex items-center gap-3">
            <span className="text-xs w-16 shrink-0 text-right" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
              {name}
            </span>
            <div className="flex-1 h-6 rounded-sm" style={{ backgroundColor: "var(--color-text)", opacity: token.$value }} />
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
      style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>
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
                borderRadius: token.$value.value === 9999 ? "50%" : `${token.$value.value}px`,
              }}
            />
            <div className="text-xs" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}>{name}</div>
            <div className="token-value text-xs mt-0.5">{token.$value.value}px</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReadingSurface() {
  return (
    <div className="theme-transition rounded-md overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
      <div className="p-4" style={{ backgroundColor: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)" }}>
        <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>
          Reading Surface Pattern
        </h3>
      </div>
      <div className="p-8" style={{ backgroundColor: "var(--color-bg)", maxWidth: "42em", margin: "0 auto" }}>
        <div className="reading-text" style={{ color: "var(--color-text)" }}>
          <span className="float-left mr-2 mt-1" style={{ fontFamily: "var(--font-display)", fontSize: "56px", fontWeight: 700, lineHeight: 0.78, color: "var(--color-gold)" }}>T</span>
          he characteristic features of Indian culture have long been a search
          for ultimate truths and the concomitant disciple-guru relationship, a
          universal seeking for a Goal beyond the material-Loss-of-Self-in-
          Cosmic-Consciousness.
        </div>
        <div className="lotus-divider">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lotus.svg" alt="" className="h-5" />
        </div>
        <div className="reading-text" style={{ color: "var(--color-text)" }}>
          Be as simple as you can be; you will be astonished to see how
          uncomplicated and happy your life can become. Live quietly in the
          moment and see the beauty of all before you.
        </div>
        <div className="citation-text mt-4">
          &mdash;&nbsp;Paramahansa Yogananda, <em>Autobiography of a Yogi</em>,
          Chapter 1, p. 3
        </div>
      </div>
    </div>
  );
}

function SrfColorPalette() {
  const contemplativeColors = [
    { name: "Gold", value: srfTokens.color.gold.$value },
    { name: "Navy", value: srfTokens.color.navy.$value },
    { name: "Cream", value: srfTokens.color.cream.$value },
    { name: "Cream Dark", value: srfTokens.color["cream-dark"].$value },
    { name: "Surface", value: srfTokens.color.surface.$value },
  ];

  const communalColors = [
    { name: "Marigold", value: srfTokens.color.marigold.$value },
    { name: "Marigold Hover", value: srfTokens.color["marigold-hover"].$value },
    { name: "Marigold Light", value: srfTokens.color["marigold-light"].$value },
    { name: "Charcoal", value: srfTokens.color.charcoal.$value },
    { name: "Gold Dark", value: srfTokens.color["gold-dark"].$value },
  ];

  const categoryColors = [
    { name: "Teal", value: srfTokens.category.teal.$value },
    { name: "Indigo", value: srfTokens.category.indigo.$value },
    { name: "Amber", value: srfTokens.category.amber.$value },
  ];

  return (
    <div className="space-y-6">
      <div className="theme-transition rounded-md p-5" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }} />
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>
            Contemplative Palette
          </h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          {contemplativeColors.map((c) => (
            <div key={c.name} className="text-center">
              <div className="w-14 h-14 rounded-md mb-2" style={{ backgroundColor: c.value, border: "1px solid var(--color-border)" }} />
              <div className="text-xs font-medium" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}>{c.name}</div>
              <div className="token-value text-xs mt-0.5">{c.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="theme-transition rounded-md p-5" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-marigold)" }} />
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-marigold)" }}>
            Communal Palette
          </h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          {communalColors.map((c) => (
            <div key={c.name} className="text-center">
              <div className="w-14 h-14 rounded-md mb-2" style={{ backgroundColor: c.value, border: "1px solid var(--color-border)" }} />
              <div className="text-xs font-medium" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}>{c.name}</div>
              <div className="token-value text-xs mt-0.5">{c.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
            Category Accents
          </div>
          <div className="flex gap-3 flex-wrap">
            {categoryColors.map((c) => (
              <div key={c.name} className="text-center">
                <div className="w-14 h-14 rounded-md mb-2" style={{ backgroundColor: c.value, border: "1px solid var(--color-border)" }} />
                <div className="text-xs font-medium" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}>{c.name}</div>
                <div className="token-value text-xs mt-0.5">{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function YssColorPalette() {
  const primaryColors = [
    { name: "Terracotta", value: yssTokens.color.terracotta.$value },
    { name: "Terra Hover", value: yssTokens.color["terracotta-hover"].$value },
    { name: "Terra Light", value: yssTokens.color["terracotta-light"].$value },
    { name: "Dev. Gold", value: yssTokens.color["devotional-gold"].$value },
    { name: "Dev. Cream", value: yssTokens.color["devotional-cream"].$value },
  ];

  const secondaryColors = [
    { name: "Orange", value: yssTokens.color.orange.$value },
    { name: "Saffron", value: yssTokens.color.saffron.$value },
    { name: "Navy", value: yssTokens.color["navy-accent"].$value },
    { name: "Warm Clay", value: yssTokens.color["bg-warm"].$value },
    { name: "Surface", value: yssTokens.color.surface.$value },
  ];

  const textColors = [
    { name: "Primary", value: yssTokens.color["text-primary"].$value },
    { name: "Body", value: yssTokens.color["text-body"].$value },
    { name: "Secondary", value: yssTokens.color["text-secondary"].$value },
    { name: "Warm", value: yssTokens.color["text-warm"].$value },
  ];

  return (
    <div className="space-y-6">
      <div className="theme-transition rounded-md p-5" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#BB4F27" }} />
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>
            Primary Palette
          </h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          {primaryColors.map((c) => (
            <div key={c.name} className="text-center">
              <div className="w-14 h-14 rounded-md mb-2" style={{ backgroundColor: c.value, border: "1px solid var(--color-border)" }} />
              <div className="text-xs font-medium" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}>{c.name}</div>
              <div className="token-value text-xs mt-0.5">{c.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="theme-transition rounded-md p-5" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#E8A830" }} />
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>
            Secondary &amp; Text
          </h3>
        </div>
        <div className="flex gap-3 flex-wrap mb-4">
          {secondaryColors.map((c) => (
            <div key={c.name} className="text-center">
              <div className="w-14 h-14 rounded-md mb-2" style={{ backgroundColor: c.value, border: "1px solid var(--color-border)" }} />
              <div className="text-xs font-medium" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}>{c.name}</div>
              <div className="token-value text-xs mt-0.5">{c.value}</div>
            </div>
          ))}
        </div>
        <div className="pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
            Text Colors
          </div>
          <div className="flex gap-3 flex-wrap">
            {textColors.map((c) => (
              <div key={c.name} className="text-center">
                <div className="w-14 h-14 rounded-md mb-2" style={{ backgroundColor: c.value, border: "1px solid var(--color-border)" }} />
                <div className="text-xs font-medium" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}>{c.name}</div>
                <div className="token-value text-xs mt-0.5">{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PatternPlayground() {
  const { org } = useDesign();

  return (
    <section id="patterns" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="display-text mb-2" style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}>
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
          {org === "srf" ? <SrfColorPalette /> : <YssColorPalette />}
        </div>

        <ReadingSurface />
      </div>
    </section>
  );
}
