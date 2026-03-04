"use client";

import { useState } from "react";

type Voice = "contemplative" | "communal";

const voices = {
  contemplative: {
    label: "Contemplative",
    sanskrit: "Dhyana",
    metaphor: "The library — a lamp illuminating a single page",
    accent: "var(--color-gold)",
    accentLabel: "Gold #DCBD23",
    text: "var(--color-text)",
    bg: "var(--color-bg)",
    displayFont: "var(--font-display)",
    uiFont: "var(--font-ui)",
    mood: "quiet, deep, scholarly, intimate",
    surfaces: "Reading portals, meditation interfaces, teaching archives",
    lineHeight: 1.9,
    fontSize: "19px",
    textAlign: "center" as const,
    padding: "48px 32px",
    letterSpacing: "0.01em",
  },
  communal: {
    label: "Communal",
    sanskrit: "Sangha",
    metaphor:
      "The courtyard at convocation — marigold garlands, shared devotion",
    accent: "var(--color-marigold)",
    accentLabel: "Marigold #DC6A10",
    text: "var(--color-text)",
    bg: "var(--color-surface, var(--color-bg))",
    displayFont: "var(--font-display-event)",
    uiFont: "var(--font-ui-event)",
    mood: "warm, welcoming, joyful, open",
    surfaces: "Events, convocation, community outreach, pilgrimage",
    lineHeight: 1.7,
    fontSize: "17px",
    textAlign: "left" as const,
    padding: "36px 32px",
    letterSpacing: "0",
  },
};

export default function VoiceCrossfade() {
  const [voice, setVoice] = useState<Voice>("contemplative");
  const [publication, setPublication] = useState(false);

  const v = voices[voice];

  return (
    <section id="voices" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "var(--color-text)",
          }}
        >
          Voice Crossfade
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
          Two voices serve two modes of seeking. The contemplative voice
          &mdash; gold, quiet, scholarly &mdash; for the seeker alone with
          the text. The communal voice &mdash; marigold, warm, welcoming
          &mdash; for seekers gathered together. Sacred content receives the
          same typographic reverence in both voices. Watch the chrome
          transform while the teaching holds steady.
        </p>

        {/* ── Voice selector ──────────────────────────────────── */}
        <div className="flex gap-2 mb-4 flex-wrap items-center">
          <div className="flex" style={{ gap: "1px" }}>
            {(["contemplative", "communal"] as Voice[]).map((k, i, arr) => (
              <button
                key={k}
                onClick={() => setVoice(k)}
                className="theme-transition px-4 py-1.5 text-xs font-semibold cursor-pointer"
                style={{
                  fontFamily: "var(--font-ui)",
                  backgroundColor:
                    voice === k
                      ? "var(--color-gold)"
                      : "var(--color-bg-secondary)",
                  color:
                    voice === k
                      ? "var(--color-navy)"
                      : "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                  borderRight:
                    i < arr.length - 1
                      ? "none"
                      : "1px solid var(--color-border)",
                  borderRadius:
                    i === 0 ? "9999px 0 0 9999px" : "0 9999px 9999px 0",
                  textTransform: "capitalize",
                }}
              >
                {voices[k].label}
              </button>
            ))}
          </div>

          {voice === "contemplative" && (
            <button
              onClick={() => setPublication(!publication)}
              className="cursor-pointer px-3 py-1.5 rounded-full text-xs theme-transition"
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
                backgroundColor: publication
                  ? "var(--color-crimson)"
                  : "var(--color-bg-secondary)",
                color: publication ? "#fff" : "var(--color-text-secondary)",
                border: `1px solid ${publication ? "var(--color-crimson)" : "var(--color-border)"}`,
              }}
            >
              {publication ? "Publication" : "+ Publication Overlay"}
            </button>
          )}
        </div>

        {/* ── Crossfade surface ─────────────────────────────── */}
        <div
          className="theme-transition rounded-md overflow-hidden"
          style={{
            border: "1px solid var(--color-border)",
            transition: "all 600ms var(--easing-contemplative)",
          }}
        >
          {/* Chrome bar — voice-colored */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 20px",
              backgroundColor: "var(--color-bg-secondary)",
              transition: "all 600ms var(--easing-contemplative)",
            }}
          >
            <div
              style={{
                fontFamily: v.uiFont,
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--color-text)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {voice === "contemplative"
                ? "Yogananda Teachings"
                : "SRF Convocation 2026"}
            </div>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: v.accent,
                transition: "background-color 600ms var(--easing-contemplative)",
              }}
            />
          </div>

          {/* Sacred content — same in both voices */}
          <div
            style={{
              backgroundColor: v.bg,
              padding: v.padding,
              transition: "all 600ms var(--easing-contemplative)",
            }}
          >
            <div style={{ maxWidth: "42em", margin: "0 auto" }}>
              {/* Chapter/Event label */}
              <div
                style={{
                  fontFamily: v.uiFont,
                  fontSize: "10px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textAlign: v.textAlign,
                  marginBottom: "8px",
                  color:
                    publication && voice === "contemplative"
                      ? "var(--color-crimson)"
                      : "var(--color-text-secondary)",
                  transition: "all 600ms var(--easing-contemplative)",
                }}
              >
                {voice === "contemplative" ? "Chapter 43" : "Opening Address"}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: v.displayFont,
                  fontSize: "clamp(20px, 3vw, 26px)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  textAlign: v.textAlign,
                  marginBottom: "28px",
                  color:
                    publication && voice === "contemplative"
                      ? "var(--color-crimson)"
                      : v.text,
                  transition: "all 600ms var(--easing-contemplative)",
                }}
              >
                {voice === "contemplative"
                  ? "The Resurrection of Sri Yukteswar"
                  : "Welcome to the World Convocation"}
              </h3>

              {/* Sacred passage — identical treatment regardless of voice */}
              <div
                className="reading-text"
                style={{
                  fontFamily: "var(--font-reading)",
                  fontSize: v.fontSize,
                  lineHeight: v.lineHeight,
                  color: v.text,
                  textAlign: v.textAlign,
                  letterSpacing: v.letterSpacing,
                  marginBottom: "24px",
                  transition: "all 600ms var(--easing-contemplative)",
                }}
              >
                &ldquo;There is a magnet in your heart that will attract
                true friends. That magnet is unselfishness, thinking of
                others first. When you learn to live for others, they will
                live for you.&rdquo;
              </div>

              {/* Attribution — always visible (PRI-02) */}
              <div
                style={{
                  fontFamily: "var(--font-reading)",
                  fontWeight: 300,
                  fontSize: "14px",
                  textAlign: v.textAlign,
                  color: "var(--color-text-secondary)",
                  transition: "all 600ms var(--easing-contemplative)",
                }}
              >
                &mdash; Paramahansa Yogananda
              </div>
            </div>
          </div>

          {/* Accent bar at bottom — voice accent color */}
          <div
            style={{
              height: "2px",
              background:
                publication && voice === "contemplative"
                  ? "linear-gradient(to right, var(--color-gold) 50%, var(--color-crimson) 50%)"
                  : v.accent,
              opacity: 0.4,
              transition: "all 600ms var(--easing-contemplative)",
            }}
          />
        </div>

        {/* ── Voice properties ──────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Left: current voice properties */}
          <div
            className="theme-transition rounded-md p-4"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              {v.label} Voice
            </div>
            {[
              { label: "Accent", value: v.accentLabel },
              { label: "Mood", value: v.mood },
              { label: "Metaphor", value: v.metaphor },
              { label: "Surfaces", value: v.surfaces },
            ].map((prop) => (
              <div key={prop.label} className="mb-2">
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--color-text-secondary)",
                    marginBottom: "2px",
                  }}
                >
                  {prop.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    color: "var(--color-text)",
                  }}
                >
                  {prop.value}
                </div>
              </div>
            ))}
          </div>

          {/* Right: interaction rule */}
          <div
            className="theme-transition rounded-md p-4"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              Voice &times; Register Interaction
            </div>
            <div
              className="reading-text"
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                fontStyle: "italic",
              }}
            >
              Sacred and reverential registers always use reading typography
              regardless of voice. The voice colors the chrome; the register
              protects the text. Yogananda&rsquo;s words receive the same
              typographic reverence whether on a quiet reading surface or a
              joyful convocation page.
            </div>
            {publication && voice === "contemplative" && (
              <div
                style={{
                  marginTop: "12px",
                  padding: "8px 12px",
                  borderRadius: "var(--radius-default)",
                  backgroundColor: "color-mix(in srgb, var(--color-crimson) 8%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--color-crimson) 20%, transparent)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "12px",
                  lineHeight: 1.5,
                  color: "var(--color-text)",
                }}
              >
                <strong style={{ color: "var(--color-crimson)" }}>Publication overlay active.</strong>{" "}
                Crimson marks the book&rsquo;s skeleton (titles, dividers, drop caps).
                Gold marks the portal&rsquo;s infrastructure (navigation, scroll, dwell).
                Two accent systems coexist.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
