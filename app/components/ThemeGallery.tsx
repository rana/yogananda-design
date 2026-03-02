"use client";

import { useState } from "react";
import { srfTokens } from "@/lib/tokens";

const passage =
  "\u201CThe season of failure is the best time for sowing the seeds of success.\u201D";
const attribution = "\u2014\u00A0Paramahansa Yogananda, Autobiography of a Yogi";

const themes = [
  {
    id: "light",
    label: "Light",
    colors: srfTokens.theme.light,
  },
  {
    id: "sepia",
    label: "Sepia",
    colors: srfTokens.theme.sepia,
  },
  {
    id: "earth",
    label: "Earth",
    colors: srfTokens.theme.earth,
  },
  {
    id: "dark",
    label: "Dark",
    colors: srfTokens.theme.dark,
  },
  {
    id: "meditate",
    label: "Meditate",
    colors: srfTokens.theme.meditate,
  },
];

function CircadianDemo() {
  const periods = [
    {
      name: "Morning",
      time: "5:00\u201309:59",
      bg: "#FDFBF8",
      bgSec: "#f2eee6",
      desc: "Cooler cream \u2014 the clarity of early light",
    },
    {
      name: "Midday",
      time: "10:00\u201315:59",
      bg: "#FAF8F5",
      bgSec: "#f0ece4",
      desc: "Default palette \u2014 full natural light",
    },
    {
      name: "Evening",
      time: "16:00\u201320:59",
      bg: "#F7F2EC",
      bgSec: "#ebe5db",
      desc: "Warmer cream \u2014 golden hour warmth",
    },
    {
      name: "Night",
      time: "21:00\u201304:59",
      bg: "#0f1923",
      bgSec: "#1a2744",
      desc: "Dark theme applies if auto-theme is active",
      dark: true,
    },
  ];

  return (
    <div className="mt-8">
      <h3
        className="display-text mb-4"
        style={{ fontSize: "18px", color: "var(--color-text)" }}
      >
        Circadian Rhythm
      </h3>
      <p
        className="mb-4"
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "14px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.6,
        }}
      >
        In Light theme, the background subtly shifts with time of day. The
        portal breathes with the seeker&rsquo;s day. These changes are not
        transitioned &mdash; they&rsquo;re too subtle to notice, and
        transitioning would draw attention to something that should be
        unconscious.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {periods.map((p) => (
          <div
            key={p.name}
            className="rounded overflow-hidden"
            style={{ border: "1px solid var(--color-border)" }}
          >
            <div
              className="p-4 flex items-center justify-center"
              style={{
                backgroundColor: p.bg,
                height: "80px",
              }}
            >
              <div
                className="w-8 h-8 rounded"
                style={{ backgroundColor: p.bgSec }}
              />
            </div>
            <div
              className="theme-transition p-3"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
            >
              <div
                className="font-semibold text-xs"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-text)",
                }}
              >
                {p.name}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {p.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ThemeGallery() {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  return (
    <section id="themes" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
        >
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
          Five complete color themes, each with an emotional purpose. Every
          theme provides all seven token values. Use the switcher above to
          experience each one live on this page.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {themes.map((t) => (
            <div
              key={t.id}
              className="rounded-md overflow-hidden"
              style={{
                border: "1px solid var(--color-border)",
                transform:
                  hoveredTheme === t.id ? "translateY(-2px)" : "none",
                transition: `transform var(--motion-interaction) var(--easing-standard)`,
              }}
              onMouseEnter={() => setHoveredTheme(t.id)}
              onMouseLeave={() => setHoveredTheme(null)}
            >
              {/* Theme preview */}
              <div
                className="p-5"
                style={{ backgroundColor: t.colors.bg.$value }}
              >
                <div
                  className="reading-text mb-3"
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: t.colors.text.$value,
                  }}
                >
                  {passage}
                </div>
                <div
                  className="citation-text"
                  style={{ color: t.colors["text-secondary"].$value }}
                >
                  {attribution}
                </div>
              </div>

              {/* Theme metadata */}
              <div
                className="p-3"
                style={{
                  backgroundColor: t.colors["bg-secondary"].$value,
                  borderTop: `1px solid ${t.colors.border.$value}`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: t.colors.gold.$value }}
                  />
                  <span
                    className="font-semibold text-sm"
                    style={{
                      fontFamily: "var(--font-ui)",
                      color: t.colors.text.$value,
                    }}
                  >
                    {t.label}
                  </span>
                </div>

                {/* Color swatches */}
                <div className="flex gap-1">
                  {(
                    [
                      "bg",
                      "bg-secondary",
                      "text",
                      "border",
                      "gold",
                      "surface",
                    ] as const
                  ).map((key) => (
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
          ))}
        </div>

        <CircadianDemo />
      </div>
    </section>
  );
}
