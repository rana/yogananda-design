"use client";

import { useState } from "react";
import { srfTokens } from "@/lib/tokens";

const passage =
  "\u201CBe as simple as you can be; you will be astonished to see how uncomplicated and happy your life can become.\u201D";
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
      bg: "#F5F8FC",
      bgSec: "#e8edf3",
      text: "#1a2744",
      textSec: "#1a2744b3",
      gold: "#dcbd23",
      desc: "Cool clarity of early light",
    },
    {
      name: "Midday",
      time: "10:00\u201315:59",
      bg: "#FAF8F5",
      bgSec: "#f0ece4",
      text: "#1a2744",
      textSec: "#1a2744b3",
      gold: "#dcbd23",
      desc: "Default palette \u2014 full natural light",
    },
    {
      name: "Evening",
      time: "16:00\u201320:59",
      bg: "#F5EEE4",
      bgSec: "#e8dfd2",
      text: "#1a2744",
      textSec: "#1a2744b3",
      gold: "#dcbd23",
      desc: "Golden hour warmth",
    },
    {
      name: "Night",
      time: "21:00\u201304:59",
      bg: "#0f1923",
      bgSec: "#1a2744",
      text: "#e8e4dc",
      textSec: "#a9a49a",
      gold: "#e8cf4a",
      desc: "Dark theme takes over",
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
        In Light theme, the background temperature shifts with time of day
        &mdash; cooler at dawn, neutral at midday, amber by evening. The portal
        breathes with the seeker&rsquo;s day. Changes are never transitioned;
        they register as feeling, not event.
      </p>

      {/* Gradient arc showing the day's color temperature journey */}
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background:
            "linear-gradient(to right, #F5F8FC 0%, #FAF8F5 30%, #F5EEE4 65%, #1a2744 85%, #0f1923 100%)",
          marginBottom: 20,
        }}
      />

      {/* Full reading panels — large enough to see the warmth shift */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {periods.map((p) => (
          <div
            key={p.name}
            className="rounded-md overflow-hidden"
            style={{ border: "1px solid var(--color-border)" }}
          >
            {/* Reading surface preview */}
            <div style={{ backgroundColor: p.bg, padding: "20px 16px" }}>
              <div
                className="reading-text"
                style={{
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: p.text,
                  marginBottom: 8,
                }}
              >
                {passage}
              </div>
              <div
                className="citation-text"
                style={{ color: p.textSec, fontSize: "11px" }}
              >
                {attribution}
              </div>

              {/* Secondary surface card */}
              <div
                style={{
                  backgroundColor: p.bgSec,
                  borderRadius: 4,
                  padding: "8px 10px",
                  marginTop: 12,
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 3,
                    borderRadius: 1.5,
                    backgroundColor: p.gold,
                    marginBottom: 6,
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    height: 3,
                    borderRadius: 1.5,
                    backgroundColor: p.text,
                    opacity: 0.12,
                    marginBottom: 4,
                    width: "90%",
                  }}
                />
                <div
                  style={{
                    height: 3,
                    borderRadius: 1.5,
                    backgroundColor: p.text,
                    opacity: 0.08,
                    width: "70%",
                  }}
                />
              </div>
            </div>

            {/* Period label */}
            <div
              className="theme-transition p-3"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                borderTop: "1px solid var(--color-border)",
              }}
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
              <div
                className="text-xs mt-1"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-text-secondary)",
                  opacity: 0.7,
                }}
              >
                {p.desc}
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
