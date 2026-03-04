"use client";

import { useState } from "react";

type ColorVoice = "sacred" | "growth" | "devotion" | "warmth" | "crimson";

const colorVoices: {
  id: ColorVoice;
  cssClass: string;
  label: string;
  sanskrit: string;
  meaning: string;
}[] = [
  { id: "sacred", cssClass: "motif-sacred", label: "Sacred", sanskrit: "Tejas", meaning: "Spiritual radiance" },
  { id: "growth", cssClass: "motif-growth", label: "Growth", sanskrit: "Prakṛti", meaning: "Living nature" },
  { id: "devotion", cssClass: "motif-devotion", label: "Devotion", sanskrit: "Nīla", meaning: "Meditative depth" },
  { id: "warmth", cssClass: "motif-warmth", label: "Warmth", sanskrit: "Tapas", meaning: "Renunciant warmth" },
  { id: "crimson", cssClass: "motif-crimson", label: "Crimson", sanskrit: "Kumkum", meaning: "Auspicious power" },
];

const glyphCategories = [
  {
    name: "Banner",
    description: "Wide horizontal forms (2:1 to 3:1). Natural section dividers.",
    height: "36px",
    glyphs: [
      { id: "lotus-07", cssClass: "motif-lotus-07" },
      { id: "lotus-08", cssClass: "motif-lotus-08" },
      { id: "lotus-10", cssClass: "motif-lotus-10" },
    ],
  },
  {
    name: "Landscape",
    description: "Moderate horizontal forms (1.3:1 to 1.6:1). Dividers or ornaments.",
    height: "48px",
    glyphs: [
      { id: "lotus-03", cssClass: "motif-lotus-03" },
      { id: "lotus-06", cssClass: "motif-lotus-06" },
      { id: "lotus-09", cssClass: "motif-lotus-09" },
    ],
  },
  {
    name: "Square",
    description: "Balanced forms (1:1 to 1.2:1). Ornaments, endings, focal points.",
    height: "56px",
    glyphs: [
      { id: "lotus-01", cssClass: "motif-lotus-01" },
      { id: "lotus-05", cssClass: "motif-lotus-05" },
      { id: "lotus-12", cssClass: "motif-lotus-12" },
      { id: "lotus-15", cssClass: "motif-lotus-15" },
    ],
  },
  {
    name: "Portrait",
    description: "Taller than wide. Unique vertical presence.",
    height: "72px",
    glyphs: [
      { id: "lotus-14", cssClass: "motif-lotus-14" },
    ],
  },
];

const semanticRoles = [
  {
    id: "divider",
    cssClass: "motif-divider",
    label: "Divider",
    desc: "Section boundary. Decorative opacity (0.4), spacious vertical padding.",
    css: ".motif-divider",
  },
  {
    id: "breath",
    cssClass: "motif-breath",
    label: "Breath",
    desc: "Reading pause. Ambient opacity (0.3), generous padding. The visual kumbhaka.",
    css: ".motif-breath",
  },
  {
    id: "close",
    cssClass: "motif-close",
    label: "Close",
    desc: "Chapter ending. Decorative opacity (0.4), asymmetric padding — more above than below.",
    css: ".motif-close",
  },
];

function VoiceSelector({
  active,
  onChange,
}: {
  active: ColorVoice;
  onChange: (v: ColorVoice) => void;
}) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {colorVoices.map((v) => {
        const selected = v.id === active;
        return (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            className="theme-transition"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "6px",
              border: selected
                ? "2px solid var(--color-gold)"
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
              className={`motif motif-lotus-05 ${v.cssClass}`}
              style={{ width: "18px", height: "18px", opacity: selected ? 1 : 0.5 }}
            />
            {v.label}
            <span style={{ fontSize: "11px", opacity: 0.6, fontWeight: 400 }}>
              {v.sanskrit}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function MotifGallery() {
  const [activeVoice, setActiveVoice] = useState<ColorVoice>("sacred");
  const [showPublication, setShowPublication] = useState(false);
  const voiceCssClass = colorVoices.find((v) => v.id === activeVoice)!.cssClass;

  return (
    <section id="motifs" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
        >
          Motif Gallery
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
          The lotus alphabet. Eleven botanical forms &times; five devotional color
          voices &mdash; a rich ornamental type system for section dividers, chapter
          ornaments, and breathing pauses. CSS mask-image technique: the SVG
          provides shape; background-color provides fill. Theme-responsive
          without JavaScript.
        </p>

        <VoiceSelector active={activeVoice} onChange={setActiveVoice} />

        {/* ── Glyph categories ────────────────────────────────── */}
        {glyphCategories.map((cat) => (
          <div key={cat.name} className="mb-6">
            <div className="flex items-baseline gap-2 mb-3">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}
              >
                {cat.name}
              </span>
              <span
                className="text-xs"
                style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}
              >
                {cat.description}
              </span>
            </div>
            <div
              className="theme-transition rounded-md p-6"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex gap-10 flex-wrap items-end justify-center">
                {cat.glyphs.map((g) => (
                  <div key={g.id} className="text-center">
                    <div
                      className={`motif ${g.cssClass} ${voiceCssClass}`}
                      aria-hidden="true"
                      style={{ height: cat.height }}
                    />
                    <div className="token-value text-xs mt-3">{g.id}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* ── Five voices side by side ────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-3">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}
            >
              Five Voices
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}
            >
              One devotional palette &mdash; from tejas through prakṛti to kumkum
            </span>
          </div>
          <div
            className="theme-transition rounded-md p-6"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
              {colorVoices.map((v) => (
                <div key={v.id} className="text-center">
                  <div
                    className={`motif motif-lotus-05 ${v.cssClass}`}
                    aria-hidden="true"
                    style={{ height: "56px", margin: "0 auto" }}
                  />
                  <div
                    className="text-xs font-semibold mt-3"
                    style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}
                  >
                    {v.label}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-ui)",
                      color: "var(--color-text-secondary)",
                      fontStyle: "italic",
                    }}
                  >
                    {v.sanskrit} &mdash; {v.meaning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Semantic roles ──────────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-3">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}
            >
              Semantic Roles
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}
            >
              Pre-composed sizing, centering, and opacity
            </span>
          </div>
          <div
            className="theme-transition rounded-md overflow-hidden"
            style={{ border: "1px solid var(--color-border)" }}
          >
            {semanticRoles.map((role, i) => (
              <div
                key={role.id}
                style={{
                  padding: "16px 24px",
                  backgroundColor: "var(--color-bg)",
                  borderBottom:
                    i < semanticRoles.length - 1
                      ? "1px solid var(--color-border)"
                      : "none",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}
                  >
                    {role.label}
                  </span>
                  <span className="token-value text-xs">{role.css}</span>
                </div>
                <div
                  className="text-xs mb-3"
                  style={{
                    fontFamily: "var(--font-ui)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {role.desc}
                </div>
                <div
                  className={`motif motif-lotus-07 ${role.cssClass}`}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Publication context ─────────────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}
            >
              Publication Context
            </span>
            <button
              onClick={() => setShowPublication(!showPublication)}
              className="cursor-pointer px-3 py-1 rounded-full text-xs"
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
                backgroundColor: showPublication
                  ? "#9B2335"
                  : "var(--color-bg-secondary)",
                color: showPublication ? "#fff" : "var(--color-text-secondary)",
                border: `1px solid ${showPublication ? "#9B2335" : "var(--color-border)"}`,
              }}
            >
              {showPublication ? "data-publication" : "Portal (default)"}
            </button>
          </div>
          <div
            className="theme-transition rounded-md p-8"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)",
            }}
            {...(showPublication ? { "data-publication": "" } : {})}
          >
            <div className="max-w-lg mx-auto">
              <div
                className="reading-text mb-2"
                style={{
                  color: "var(--color-text)",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  textAlign: "center",
                }}
              >
                The divider shifts to crimson under{" "}
                <span className="token-value">data-publication</span> &mdash;
                the book claiming its ornaments.
              </div>
              <div
                className="motif motif-lotus-07 motif-divider"
                aria-hidden="true"
              />
              <div
                className="reading-text mb-2"
                style={{
                  color: "var(--color-text)",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  textAlign: "center",
                }}
              >
                The breath stays gold &mdash; reading rhythm is a portal
                feature, not a book structure.
              </div>
              <div
                className="motif motif-lotus-05 motif-breath"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
