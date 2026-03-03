"use client";

import { useState } from "react";
import { srfTokens, yssTokens } from "@/lib/tokens";
import { useDesign } from "./DesignProvider";

const srfPassage =
  "\u201CBe as simple as you can be; you will be astonished to see how uncomplicated and happy your life can become.\u201D";
const srfAttribution = "\u2014\u00A0Paramahansa Yogananda, Autobiography of a Yogi";

const yssPassage =
  "\u201CLive quietly in the moment and see the beauty of all before you. The future will take care of itself.\u201D";
const yssAttribution = "\u2014\u00A0\u092A\u0930\u092E\u0939\u0902\u0938 \u092F\u094B\u0917\u093E\u0928\u0928\u094D\u0926, Autobiography of a Yogi";

type ThemeColors = Record<string, { $value: string }>;

interface ThemeCard {
  id: string;
  label: string;
  colors: ThemeColors;
}

function buildSrfThemes(): { contemplative: ThemeCard[]; communal: ThemeCard[] } {
  return {
    contemplative: [
      { id: "light", label: "Light", colors: srfTokens.theme.light as unknown as ThemeColors },
      { id: "sepia", label: "Sepia", colors: srfTokens.theme.sepia as unknown as ThemeColors },
      { id: "earth", label: "Earth", colors: srfTokens.theme.earth as unknown as ThemeColors },
      { id: "dark", label: "Dark", colors: srfTokens.theme.dark as unknown as ThemeColors },
      { id: "meditate", label: "Meditate", colors: srfTokens.theme.meditate as unknown as ThemeColors },
    ],
    communal: [
      { id: "gathering", label: "Gathering", colors: srfTokens.theme.gathering as unknown as ThemeColors },
    ],
  };
}

function buildYssThemes(): ThemeCard[] {
  return [
    { id: "ashram", label: "Ashram", colors: yssTokens.theme.ashram as unknown as ThemeColors },
    { id: "sandstone", label: "Sandstone", colors: yssTokens.theme.sandstone as unknown as ThemeColors },
    { id: "earth", label: "Earth", colors: yssTokens.theme.earth as unknown as ThemeColors },
    { id: "night", label: "Night", colors: yssTokens.theme.night as unknown as ThemeColors },
    { id: "devotion", label: "Devotion", colors: yssTokens.theme.devotion as unknown as ThemeColors },
  ];
}

const swatchKeys = ["bg", "bg-secondary", "text", "border", "gold", "surface"] as const;

function ThemeCardPreview({
  t,
  passage,
  attribution,
  hovered,
  onEnter,
  onLeave,
  variant,
}: {
  t: ThemeCard;
  passage: string;
  attribution: string;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  variant?: "communal" | "yss-devotional";
}) {
  const isDevotional = variant === "yss-devotional";
  const isCommunal = variant === "communal";

  return (
    <div
      className="rounded-md overflow-hidden"
      style={{
        border: "1px solid var(--color-border)",
        transform: hovered ? "translateY(-2px)" : "none",
        transition: `transform var(--motion-interaction) var(--easing-standard)`,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="p-5" style={{ backgroundColor: t.colors.bg.$value }}>
        {isCommunal ? (
          <>
            <div
              style={{
                fontFamily: "var(--font-display-event)",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: 1.3,
                color: t.colors.gold.$value,
                marginBottom: 8,
              }}
            >
              Experience the joy of the soul
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui-event)",
                fontSize: "15px",
                fontWeight: 375,
                lineHeight: 1.6,
                color: t.colors.text.$value,
                marginBottom: 8,
              }}
            >
              Join us for a transformative weeklong program on the Kriya Yoga
              teachings of Paramahansa Yogananda.
            </div>
            <div className="citation-text" style={{ color: t.colors["text-secondary"].$value }}>
              August 2&ndash;8, 2026 &middot; Los Angeles
            </div>
          </>
        ) : (
          <>
            <div
              className="reading-text mb-3"
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: t.colors.text.$value,
                fontFamily: isDevotional ? '"Merienda", cursive' : undefined,
              }}
            >
              {passage}
            </div>
            <div className="citation-text" style={{ color: t.colors["text-secondary"].$value }}>
              {attribution}
            </div>
          </>
        )}
      </div>

      <div
        className="p-3"
        style={{
          backgroundColor: t.colors["bg-secondary"].$value,
          borderTop: `1px solid ${t.colors.border.$value}`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.colors.gold.$value }} />
          <span
            className="font-semibold text-sm"
            style={{ fontFamily: "var(--font-ui)", color: t.colors.text.$value }}
          >
            {t.label}
          </span>
        </div>
        <div className="flex gap-1">
          {swatchKeys.map((key) => (
            <div
              key={key}
              className="flex-1 h-4 rounded-sm"
              style={{
                backgroundColor: t.colors[key].$value,
                border: `1px solid ${t.colors.border.$value}`,
              }}
              title={`${key}: ${t.colors[key].$value}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SrfGallery({ hoveredTheme, setHoveredTheme }: { hoveredTheme: string | null; setHoveredTheme: (id: string | null) => void }) {
  const { contemplative, communal } = buildSrfThemes();

  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#dcbd23" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
          Contemplative Voice
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {contemplative.map((t) => (
          <ThemeCardPreview
            key={t.id}
            t={t}
            passage={srfPassage}
            attribution={srfAttribution}
            hovered={hoveredTheme === t.id}
            onEnter={() => setHoveredTheme(t.id)}
            onLeave={() => setHoveredTheme(null)}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 mb-3 mt-8">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#DC6A10" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
          Communal Voice
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {communal.map((t) => (
          <div key={t.id} className="lg:col-span-2">
            <ThemeCardPreview
              t={t}
              passage={srfPassage}
              attribution={srfAttribution}
              hovered={hoveredTheme === t.id}
              onEnter={() => setHoveredTheme(t.id)}
              onLeave={() => setHoveredTheme(null)}
              variant="communal"
            />
          </div>
        ))}

        {/* Category colors */}
        <div className="rounded-md overflow-hidden lg:col-span-3" style={{ border: "1px solid var(--color-border)" }}>
          <div className="p-5" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "#DC6A10" }}>
              Category Colors
            </div>
            <div className="flex gap-3">
              {[
                { name: "Marigold", color: "#DC6A10", desc: "Community, kirtan" },
                { name: "Teal", color: "#63A3A3", desc: "Meditation, quiet" },
                { name: "Indigo", color: "#5D7BE3", desc: "Classes, study" },
                { name: "Amber", color: "#CC9900", desc: "Keynotes, featured" },
              ].map((c) => (
                <div key={c.name} className="text-center flex-1">
                  <div className="h-10 rounded-md mb-2" style={{ backgroundColor: c.color }} />
                  <div className="text-xs font-medium" style={{ fontFamily: "var(--font-ui)", color: "#4C4C4C" }}>{c.name}</div>
                  <div className="text-xs mt-0.5" style={{ fontFamily: "var(--font-ui)", color: "#4C4C4CA3" }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

function YssGallery({ hoveredTheme, setHoveredTheme }: { hoveredTheme: string | null; setHoveredTheme: (id: string | null) => void }) {
  const themes = buildYssThemes();
  const devotionalIds = new Set(["sandstone", "devotion"]);

  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#BB4F27" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
          YSS Themes
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {themes.map((t) => (
          <ThemeCardPreview
            key={t.id}
            t={t}
            passage={yssPassage}
            attribution={yssAttribution}
            hovered={hoveredTheme === t.id}
            onEnter={() => setHoveredTheme(t.id)}
            onLeave={() => setHoveredTheme(null)}
            variant={devotionalIds.has(t.id) ? "yss-devotional" : undefined}
          />
        ))}
      </div>

      {/* YSS brand accent colors */}
      <div className="mt-8">
        <h3 className="display-text mb-4" style={{ fontSize: "18px", color: "var(--color-text)" }}>
          Accent Palette
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { name: "Terracotta", color: "#BB4F27", desc: "Primary accent" },
            { name: "Dev. Gold", color: "#A87D25", desc: "Spiritual accent" },
            { name: "Saffron", color: "#E8A830", desc: "Renunciation" },
            { name: "Orange", color: "#EC8724", desc: "Events, CTAs" },
            { name: "Dev. Cream", color: "#FCF4D2", desc: "Sacred surfaces" },
            { name: "Warm Clay", color: "#F2E8DE", desc: "Reading surface" },
            { name: "Navy", color: "#052956", desc: "Dark accent" },
          ].map((c) => (
            <div key={c.name} className="text-center">
              <div
                className="h-12 rounded-md mb-2"
                style={{ backgroundColor: c.color, border: "1px solid var(--color-border)" }}
              />
              <div className="text-xs font-medium" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}>
                {c.name}
              </div>
              <div className="token-value text-xs mt-0.5">{c.color}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ThemeGallery() {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const { org } = useDesign();

  const isSrf = org === "srf";

  return (
    <section id="themes" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="display-text mb-2" style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}>
          Theme Gallery
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
          {isSrf
            ? "Six SRF themes across two voices. Five contemplative themes for reading surfaces plus one communal gathering theme for events. Every theme provides all seven token values."
            : "Five YSS themes inspired by the ashram experience \u2014 from the sunlit courtyard to the inner sanctum. Warm earth tones, terracotta accents, and devotional gold."}
        </p>

        {isSrf ? (
          <SrfGallery hoveredTheme={hoveredTheme} setHoveredTheme={setHoveredTheme} />
        ) : (
          <YssGallery hoveredTheme={hoveredTheme} setHoveredTheme={setHoveredTheme} />
        )}
      </div>
    </section>
  );
}
