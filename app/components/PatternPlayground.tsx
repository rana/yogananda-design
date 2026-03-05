"use client";

import { useState, useMemo } from "react";
import { sharedTokens, srfTokens, yssTokens } from "@/lib/tokens";
import { useDesign } from "./DesignProvider";

/* ── Token flattening ────────────────────────────────────────── */
/* Walk a JSON token tree and collect every node with $value. */

interface FlatToken {
  path: string;
  layer: string;
  value: string;
  type: string;
  description: string;
}

function flattenTokens(
  obj: Record<string, unknown>,
  layer: string,
  prefix = ""
): FlatToken[] {
  const results: FlatToken[] = [];
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    const node = val as Record<string, unknown>;
    if (node && typeof node === "object" && "$value" in node) {
      const raw = node.$value;
      const display =
        typeof raw === "object" && raw !== null
          ? JSON.stringify(raw)
          : String(raw);
      results.push({
        path,
        layer,
        value: display,
        type: (node.$type as string) ?? "",
        description: (node.$description as string) ?? "",
      });
    } else if (node && typeof node === "object") {
      results.push(...flattenTokens(node as Record<string, unknown>, layer, path));
    }
  }
  return results;
}

/* ── Token Search ────────────────────────────────────────────── */

function TokenSearch() {
  const [query, setQuery] = useState("");
  const { org } = useDesign();

  const allTokens = useMemo(() => {
    const orgTokens = org === "srf" ? srfTokens : yssTokens;
    return [
      ...flattenTokens(sharedTokens as unknown as Record<string, unknown>, "shared"),
      ...flattenTokens(orgTokens as unknown as Record<string, unknown>, org),
    ];
  }, [org]);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allTokens
      .filter(
        (t) =>
          t.path.toLowerCase().includes(q) ||
          t.value.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.type.toLowerCase().includes(q)
      )
      .slice(0, 24);
  }, [query, allTokens]);

  const tokenCount = allTokens.length;

  return (
    <div className="mb-8">
      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${tokenCount} tokens… try "gold", "contemplative", "spacing", "800ms"`}
          className="w-full theme-transition rounded-md px-4 py-3 text-sm"
          style={{
            fontFamily: "var(--font-ui)",
            backgroundColor: "var(--color-bg-secondary)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
            outline: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--color-gold)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
          }}
        />
        {query && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
            style={{
              fontFamily: "var(--font-ui)",
              color: "var(--color-text-secondary)",
            }}
          >
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {filtered.length > 0 && (
        <div
          className="theme-transition rounded-md overflow-hidden"
          style={{ border: "1px solid var(--color-border)" }}
        >
          {filtered.map((t, i) => (
            <div
              key={`${t.layer}-${t.path}`}
              className="theme-transition px-4 py-3"
              style={{
                backgroundColor:
                  i % 2 === 0 ? "var(--color-bg)" : "var(--color-bg-secondary)",
                borderBottom:
                  i < filtered.length - 1
                    ? "1px solid var(--color-border)"
                    : "none",
              }}
            >
              <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                <span className="token-value text-xs">{t.path}</span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "10px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    backgroundColor:
                      t.layer === "shared"
                        ? "var(--color-bg-secondary)"
                        : "var(--color-gold)",
                    color:
                      t.layer === "shared"
                        ? "var(--color-text-secondary)"
                        : "var(--color-navy)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {t.layer}
                </span>
                {t.type && (
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-ui)",
                      color: "var(--color-text-secondary)",
                      fontStyle: "italic",
                    }}
                  >
                    {t.type}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Value preview — color swatch for colors */}
                {t.type === "color" && t.value.startsWith("#") && (
                  <div
                    className="shrink-0 w-5 h-5 rounded"
                    style={{
                      backgroundColor: t.value,
                      border: "1px solid var(--color-border)",
                    }}
                  />
                )}
                <span className="token-value text-xs">{t.value}</span>
              </div>

              {t.description && (
                <div
                  className="text-xs mt-1"
                  style={{
                    fontFamily: "var(--font-ui)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {t.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {query && filtered.length === 0 && (
        <div
          className="text-center py-6 text-sm"
          style={{
            fontFamily: "var(--font-ui)",
            color: "var(--color-text-secondary)",
          }}
        >
          No tokens match &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}

/* ── Layer Stats ─────────────────────────────────────────────── */

function LayerStats() {
  const { org } = useDesign();
  const orgTokens = org === "srf" ? srfTokens : yssTokens;

  const sharedCount = flattenTokens(
    sharedTokens as unknown as Record<string, unknown>,
    "shared"
  ).length;
  const orgCount = flattenTokens(
    orgTokens as unknown as Record<string, unknown>,
    org
  ).length;

  const layers = [
    {
      name: "Foundations",
      file: "shared.tokens.json",
      count: sharedCount,
      desc: "Spacing, motion, opacity, reading parameters",
    },
    {
      name: org.toUpperCase(),
      file: `${org}.tokens.json`,
      count: orgCount,
      desc: "Colors, themes, typography, attention hierarchies",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {layers.map((l) => (
        <div
          key={l.name}
          className="theme-transition rounded-md p-4"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-baseline gap-2 mb-1">
            <span
              className="display-text"
              style={{ fontSize: "24px", color: "var(--color-gold)" }}
            >
              {l.count}
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-text)",
              }}
            >
              {l.name}
            </span>
          </div>
          <div className="token-value text-xs mb-1">{l.file}</div>
          <div
            className="text-xs"
            style={{
              fontFamily: "var(--font-ui)",
              color: "var(--color-text-secondary)",
            }}
          >
            {l.desc}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Existing visualizations (kept from Pattern Playground) ──── */

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
            <span className="token-value text-xs text-center" style={{ minWidth: "44px" }}>{token.$value}</span>
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

function ShadowScale() {
  const shadows = [
    { name: "Subtle", variable: "var(--shadow-subtle)", desc: "Cards at rest, quiet elevation" },
    { name: "Elevated", variable: "var(--shadow-elevated)", desc: "Hover state, focused elements, dropdowns" },
  ];

  return (
    <div
      className="theme-transition rounded-md p-5"
      style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>
        Shadow Tokens
      </h3>
      <div className="flex gap-6 flex-wrap">
        {shadows.map((s) => (
          <div key={s.name} className="text-center flex-1" style={{ minWidth: "140px" }}>
            <div
              className="rounded-md mb-3 mx-auto theme-transition"
              style={{
                width: "100%",
                height: "72px",
                backgroundColor: "var(--color-bg)",
                boxShadow: s.variable,
              }}
            />
            <div className="text-xs font-medium" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}>{s.name}</div>
            <div className="token-value text-xs mt-0.5">--shadow-{s.name.toLowerCase()}</div>
            <div className="text-xs mt-1" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>{s.desc}</div>
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
        <div className="motif motif-lotus-05 motif-divider" aria-hidden="true"></div>
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
    { name: "Ochre", value: srfTokens.color.ochre.$value },
    { name: "Ochre Hover", value: srfTokens.color["ochre-hover"].$value },
    { name: "Ochre Light", value: srfTokens.color["ochre-light"].$value },
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
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-ochre)" }} />
          <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-ochre)" }}>
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

/* ── Main Export ──────────────────────────────────────────────── */

export default function PatternPlayground() {
  const { org } = useDesign();

  return (
    <section id="patterns" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="display-text mb-2" style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}>
          Token Explorer
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
          Every token in the design language, searchable. Type a concept
          &mdash; gold, contemplative, spacing, 800ms &mdash; and see how it
          threads through foundations and {org.toUpperCase()} organization
          tokens. Switch organizations above to see the parallel vocabulary.
        </p>

        <TokenSearch />
        <LayerStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SpacingScale />
          <OpacityScale />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RadiusScale />
          <ShadowScale />
        </div>

        <div className="mb-6">
          {org === "srf" ? <SrfColorPalette /> : <YssColorPalette />}
        </div>

        <ReadingSurface />
      </div>
    </section>
  );
}
