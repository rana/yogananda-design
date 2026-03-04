"use client";

import { useState } from "react";

interface Rasa {
  id: string;
  sanskrit: string;
  devanagari: string;
  english: string;
  /** Passage container styles */
  padding: string;
  paddingTop: string;
  paddingBottom: string;
  maxWidth: string;
  fontSize: string;
  lineHeight: number;
  fontWeight: number;
  textAlign: "center" | "left";
  transitionDuration: string;
  goldOpacity: number;
  /** First-line display font treatment */
  firstLineDisplay: boolean;
  /** Treatment card descriptions */
  whitespace: string;
  typography: string;
  accent: string;
  motion: string;
  mood: string;
}

const rasas: Rasa[] = [
  {
    id: "shanta",
    sanskrit: "Shanta",
    devanagari: "\u0936\u093E\u0928\u094D\u0924",
    english: "Peace / Stillness",
    padding: "64px",
    paddingTop: "64px",
    paddingBottom: "64px",
    maxWidth: "42em",
    fontSize: "22px",
    lineHeight: 2.2,
    fontWeight: 400,
    textAlign: "center",
    transitionDuration: "800ms",
    goldOpacity: 0.3,
    firstLineDisplay: false,
    whitespace: "Maximum \u2014 64px all around. The room is completely still.",
    typography: "Reading font at 22px, line-height 2.2. Centered. Breath between every line.",
    accent: "Gold at ambient opacity (0.3) \u2014 warmth, not color.",
    motion: "800ms transitions. The slowest pace. Nothing hurries.",
    mood: "The room is completely still. Breath settles. Attention rests.",
  },
  {
    id: "adbhuta",
    sanskrit: "Adbhuta",
    devanagari: "\u0905\u0926\u094D\u092D\u0941\u0924",
    english: "Wonder / Awe",
    padding: "56px",
    paddingTop: "56px",
    paddingBottom: "72px",
    maxWidth: "42em",
    fontSize: "19px",
    lineHeight: 2.0,
    fontWeight: 400,
    textAlign: "left",
    transitionDuration: "600ms",
    goldOpacity: 0.4,
    firstLineDisplay: true,
    whitespace: "Expansive \u2014 56px top, 72px bottom. The space opens upward.",
    typography: "Display font on the first phrase, then reading font at 19px. Line-height 2.0.",
    accent: "Gold at decorative opacity (0.4) \u2014 present and luminous.",
    motion: "600ms with decelerate easing. Arrival, not departure.",
    mood: "The space opens upward. Something larger than the self is present.",
  },
  {
    id: "karuna",
    sanskrit: "Karuna",
    devanagari: "\u0915\u0930\u0941\u0923",
    english: "Compassion / Tender Sorrow",
    padding: "48px",
    paddingTop: "48px",
    paddingBottom: "48px",
    maxWidth: "32em",
    fontSize: "18px",
    lineHeight: 1.9,
    fontWeight: 400,
    textAlign: "left",
    transitionDuration: "300ms",
    goldOpacity: 0.35,
    firstLineDisplay: false,
    whitespace: "Intimate \u2014 32em measure, 48px padding. The room draws close.",
    typography: "Reading font at 18px, line-height 1.9. Tighter measure for intimacy.",
    accent: "Gold at warm candle intensity (0.35) \u2014 slightly warmer, closer.",
    motion: "300ms transitions. Quick, responsive \u2014 like a hand reaching out.",
    mood: "The room draws close. Walls soften. Distance dissolves.",
  },
  {
    id: "vira",
    sanskrit: "Vira",
    devanagari: "\u0935\u0940\u0930",
    english: "Heroic Courage",
    padding: "40px",
    paddingTop: "40px",
    paddingBottom: "40px",
    maxWidth: "48em",
    fontSize: "18px",
    lineHeight: 1.7,
    fontWeight: 500,
    textAlign: "left",
    transitionDuration: "200ms",
    goldOpacity: 0.6,
    firstLineDisplay: false,
    whitespace: "Structured \u2014 40px padding, wider measure. Disciplined space.",
    typography: "Reading font at 18px, weight 500, line-height 1.7. Tighter, bolder.",
    accent: "Gold at interactive strength (0.6) \u2014 defined, commanding.",
    motion: "200ms transitions. Crisp, decisive. No hesitation.",
    mood: "The room becomes precise. Every word lands with conviction.",
  },
  {
    id: "bhakti",
    sanskrit: "Bhakti",
    devanagari: "\u092D\u0915\u094D\u0924\u093F",
    english: "Devotional Love",
    padding: "52px",
    paddingTop: "52px",
    paddingBottom: "60px",
    maxWidth: "40em",
    fontSize: "20px",
    lineHeight: 2.0,
    fontWeight: 400,
    textAlign: "center",
    transitionDuration: "800ms",
    goldOpacity: 0.4,
    firstLineDisplay: false,
    whitespace: "Rhythmic \u2014 52px top, 60px bottom. Breathing whitespace.",
    typography: "Reading font at 20px, line-height 2.0. Centered. Warm and generous.",
    accent: "Gold at decorative (0.4) \u2014 with lotus motif breathing below.",
    motion: "800ms contemplative transitions. The rhythm of prayer.",
    mood: "The room warms with devotion. Each word is an offering.",
  },
];

const passage =
  "\u201CThe season of failure is the best time for sowing the seeds of success. The bud of a rose does not become beautiful through some outer force; its beauty blossoms from within.\u201D";
const attribution = "\u2014\u00A0Paramahansa Yogananda";

/** Simple lotus SVG that breathes with a CSS animation */
function LotusMark({ opacity }: { opacity: number }) {
  return (
    <svg
      width="32"
      height="20"
      viewBox="0 0 32 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, transition: "opacity 800ms var(--easing-contemplative, ease)" }}
      aria-hidden="true"
    >
      {/* Center petal */}
      <ellipse cx="16" cy="12" rx="4" ry="10" fill="var(--color-gold, #dcbd23)" opacity="0.5" />
      {/* Left petal */}
      <ellipse
        cx="9"
        cy="13"
        rx="3.5"
        ry="8"
        fill="var(--color-gold, #dcbd23)"
        opacity="0.35"
        transform="rotate(-20 9 13)"
      />
      {/* Right petal */}
      <ellipse
        cx="23"
        cy="13"
        rx="3.5"
        ry="8"
        fill="var(--color-gold, #dcbd23)"
        opacity="0.35"
        transform="rotate(20 23 13)"
      />
      {/* Outer left */}
      <ellipse
        cx="5"
        cy="14"
        rx="3"
        ry="6"
        fill="var(--color-gold, #dcbd23)"
        opacity="0.2"
        transform="rotate(-35 5 14)"
      />
      {/* Outer right */}
      <ellipse
        cx="27"
        cy="14"
        rx="3"
        ry="6"
        fill="var(--color-gold, #dcbd23)"
        opacity="0.2"
        transform="rotate(35 27 14)"
      />
    </svg>
  );
}

function RasaSelector({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0px",
        marginBottom: "32px",
      }}
    >
      {rasas.map((r, i) => {
        const isActive = r.id === active;
        const isFirst = i === 0;
        const isLast = i === rasas.length - 1;
        return (
          <button
            key={r.id}
            onClick={() => onChange(r.id)}
            className="theme-transition"
            style={{
              fontFamily: "var(--font-ui)",
              backgroundColor: isActive
                ? "var(--color-gold)"
                : "var(--color-bg-secondary)",
              color: isActive
                ? "var(--color-navy)"
                : "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
              borderLeft: i > 0 ? "none" : "1px solid var(--color-border)",
              borderRadius: isFirst
                ? "8px 0 0 8px"
                : isLast
                  ? "0 8px 8px 0"
                  : "0",
              padding: "10px 16px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              minWidth: "100px",
              transition: `background-color 200ms var(--easing-standard, ease), color 200ms var(--easing-standard, ease)`,
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: isActive ? 600 : 400,
                lineHeight: 1.3,
              }}
            >
              {r.sanskrit}{" "}
              <span style={{ fontSize: "13px", opacity: 0.8 }}>
                {r.devanagari}
              </span>
            </span>
            <span
              style={{
                fontSize: "11px",
                opacity: 0.7,
                fontWeight: 400,
              }}
            >
              {r.english}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TreatmentCard({ rasa }: { rasa: Rasa }) {
  const rows = [
    { label: "Whitespace", value: rasa.whitespace },
    { label: "Typography", value: rasa.typography },
    { label: "Accent", value: rasa.accent },
    { label: "Motion", value: rasa.motion },
    { label: "Mood", value: rasa.mood },
  ];

  return (
    <div
      className="theme-transition"
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        overflow: "hidden",
        transition: `all 600ms var(--easing-contemplative, ease)`,
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          backgroundColor: "var(--color-bg-secondary)",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "var(--color-gold)",
            opacity: rasa.goldOpacity,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--color-text)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Treatment: {rasa.sanskrit}
        </span>
      </div>
      <div style={{ padding: "16px", backgroundColor: "var(--color-bg)" }}>
        {rows.map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "8px",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                minWidth: "80px",
                flexShrink: 0,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "13px",
                color: "var(--color-text)",
                lineHeight: 1.5,
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RasaExperience() {
  const [activeId, setActiveId] = useState("shanta");
  const rasa = rasas.find((r) => r.id === activeId)!;

  /** Split passage for adbhuta first-line treatment */
  const firstSentenceEnd = passage.indexOf(".");
  const firstPhrase = passage.slice(0, firstSentenceEnd + 1);
  const restOfPassage = passage.slice(firstSentenceEnd + 1);

  return (
    <section id="rasa" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "var(--color-text)",
          }}
        >
          Rasa Experience
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
          Five rasas from Indian aesthetic theory transform the same passage.
          Each rasa reshapes whitespace, typography, accent intensity, and
          motion \u2014 the content is identical, but the experience changes
          completely. Watch the passage breathe differently as you switch
          between aesthetic flavors.
        </p>

        <RasaSelector active={activeId} onChange={setActiveId} />

        {/* Passage container */}
        <div
          className="theme-transition"
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "24px",
            transition: `all 600ms var(--easing-contemplative, ease)`,
          }}
        >
          {/* Gold accent bar */}
          <div
            style={{
              height: "3px",
              backgroundColor: "var(--color-gold)",
              opacity: rasa.goldOpacity,
              transition: `opacity ${rasa.transitionDuration} var(--easing-contemplative, ease)`,
            }}
          />

          <div
            style={{
              backgroundColor: "var(--color-bg)",
              paddingTop: rasa.paddingTop,
              paddingBottom: rasa.paddingBottom,
              paddingLeft: rasa.padding,
              paddingRight: rasa.padding,
              display: "flex",
              flexDirection: "column",
              alignItems: rasa.textAlign === "center" ? "center" : "flex-start",
              transition: `padding ${rasa.transitionDuration} var(--easing-contemplative, ease)`,
            }}
          >
            <div
              style={{
                maxWidth: rasa.maxWidth,
                width: "100%",
                textAlign: rasa.textAlign,
                transition: `max-width ${rasa.transitionDuration} var(--easing-contemplative, ease)`,
              }}
            >
              {/* Passage text */}
              <div
                className="reading-text"
                style={{
                  fontSize: rasa.fontSize,
                  lineHeight: rasa.lineHeight,
                  fontWeight: rasa.fontWeight,
                  color: "var(--color-text)",
                  transition: `font-size ${rasa.transitionDuration} var(--easing-contemplative, ease), line-height ${rasa.transitionDuration} var(--easing-contemplative, ease), font-weight ${rasa.transitionDuration} var(--easing-contemplative, ease)`,
                }}
              >
                {rasa.firstLineDisplay ? (
                  <>
                    <span
                      className="display-text"
                      style={{
                        fontSize: `calc(${rasa.fontSize} * 1.35)`,
                        lineHeight: 1.4,
                        display: "inline",
                        transition: `font-size ${rasa.transitionDuration} var(--easing-contemplative, ease)`,
                      }}
                    >
                      {firstPhrase}
                    </span>
                    {restOfPassage}
                  </>
                ) : (
                  passage
                )}
              </div>

              {/* Attribution */}
              <div
                style={{
                  marginTop: "20px",
                  fontFamily: "var(--font-ui)",
                  fontSize: "13px",
                  color: "var(--color-text-secondary)",
                  letterSpacing: "0.01em",
                  transition: `margin-top ${rasa.transitionDuration} var(--easing-contemplative, ease)`,
                }}
              >
                {attribution}
              </div>

              {/* Lotus motif for bhakti */}
              {rasa.id === "bhakti" && (
                <div
                  style={{
                    marginTop: "28px",
                    display: "flex",
                    justifyContent: "center",
                    animation: "rasaLotusBreath 4s ease-in-out infinite",
                  }}
                >
                  <LotusMark opacity={rasa.goldOpacity} />
                </div>
              )}
            </div>
          </div>

          {/* Bottom accent bar */}
          <div
            style={{
              height: "1px",
              backgroundColor: "var(--color-gold)",
              opacity: rasa.goldOpacity * 0.5,
              transition: `opacity ${rasa.transitionDuration} var(--easing-contemplative, ease)`,
            }}
          />
        </div>

        {/* Treatment card */}
        <TreatmentCard rasa={rasa} />

        {/* Breathing animation keyframes */}
        <style>{`
          @keyframes rasaLotusBreath {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.08); opacity: 0.7; }
          }
        `}</style>
      </div>
    </section>
  );
}
