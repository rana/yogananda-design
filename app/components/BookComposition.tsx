"use client";

import { useState } from "react";

/* ── Book Composition ──────────────────────────────────────────────
   The design language's homecoming — every governing principle
   originates in manuscript and print tradition. The screen adapted
   these for scrolling; this section shows them restored to their
   native medium.

   Source: patterns/paginated.pattern.json
   ────────────────────────────────────────────────────────────── */

type View = "spread" | "card" | "color" | "photos";

/* ── Typography Mapping ──────────────────────────────────────── */

const typeMap = [
  { role: "Body (standard)", screen: "Merriweather 400, 18px/1.8", paper: "Merriweather 400, 11pt/15pt", ratio: "1.36", note: "Tighter on paper — the eye tracks more easily on a physical surface" },
  { role: "Body (accessible)", screen: "Merriweather 400, 18px/1.8", paper: "Merriweather 400, 12pt/17pt", ratio: "1.42", note: "Large-print editions. Still tighter than screen." },
  { role: "Chapter title", screen: "Lora 700, clamp(22–28px)", paper: "Lora 700, 18pt/22pt", ratio: "—", note: "Majestic at 18pt on paper. Crimson under publication." },
  { role: "Chapter label", screen: "Open Sans 400, 11px, small-caps", paper: "Open Sans 400, 9pt, small-caps", ratio: "—", note: "Infrastructure, not content." },
  { role: "Epigraph", screen: "Merriweather 300, italic", paper: "Merriweather 300, italic, 11pt", ratio: "—", note: "Gold decorative quotation mark in the margin." },
  { role: "Footnotes", screen: "Merriweather 400, 0.875rem", paper: "Merriweather 400, 8.5pt/11pt", ratio: "—", note: "2em separator rule, 0.5pt weight." },
  { role: "Display (devotional)", screen: "Asar 400", paper: "Asar 400, 14pt/20pt", ratio: "—", note: "Dedication, half-title. Latin + Devanagari in one voice." },
  { role: "Running header", screen: "—", paper: "Open Sans 400, 8pt, small-caps", ratio: "—", note: "Paper-only. Verso: book title. Recto: chapter title." },
];

/* ── Color Translation ───────────────────────────────────────── */

const colors = [
  { name: "Gold", srgb: "#DCBD23", cmyk: "C15 M18 Y92 K0", pantone: "7405 C", recommendation: "Spot color required. CMYK tints lose luminance." },
  { name: "Crimson", srgb: "#9B2335", cmyk: "C15 M95 Y70 K10", pantone: "200 C", recommendation: "Process CMYK faithful. Spot optional." },
  { name: "Navy", srgb: "#1A2744", cmyk: "C88 M72 Y40 K45", pantone: "—", recommendation: "Process CMYK. Rich four-color dark, not cold black." },
  { name: "Olive (growth)", srgb: "#6a6d2f", cmyk: "C45 M30 Y85 K20", pantone: "—", recommendation: "Process CMYK acceptable." },
  { name: "Ochre (warmth)", srgb: "#DC6A10", cmyk: "C5 M68 Y90 K0", pantone: "—", recommendation: "Process CMYK acceptable. Strong warm presence." },
];

/* ── Page Margins ────────────────────────────────────────────── */

const margins = {
  gutter: 0.75,
  head: 0.875,
  foreEdge: 1.0,
  foot: 1.125,
  pageW: 6,
  pageH: 9,
};

export default function BookComposition() {
  const [view, setView] = useState<View>("spread");

  return (
    <section id="book" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "var(--color-text)",
          }}
        >
          Book Composition
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
          The design language restored to its native medium. Every principle
          &mdash; dhvani, aucitya, rasa, bindu, pr&#257;&#7751;a &mdash;
          originates in manuscript and print tradition. Screen adapted them
          for scrolling; paper is where they come home.
        </p>

        {/* ── View Toggle ─────────────────────────────────────── */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {([
            { value: "spread" as View, label: "Page Spread" },
            { value: "card" as View, label: "Contemplation Card" },
            { value: "color" as View, label: "Color & Type" },
            { value: "photos" as View, label: "Photographs" },
          ]).map((v) => {
            const selected = v.value === view;
            return (
              <button
                key={v.value}
                onClick={() => setView(v.value)}
                className="theme-transition cursor-pointer"
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: selected
                    ? "2px solid var(--color-gold)"
                    : "2px solid var(--color-border)",
                  backgroundColor: selected
                    ? "var(--color-bg-secondary)"
                    : "transparent",
                  fontFamily: "var(--font-ui)",
                  fontSize: "13px",
                  fontWeight: selected ? 600 : 400,
                  color: selected
                    ? "var(--color-text)"
                    : "var(--color-text-secondary)",
                }}
              >
                {v.label}
              </button>
            );
          })}
        </div>

        {/* ── Views ───────────────────────────────────────────── */}
        {view === "spread" && <PageSpread />}
        {view === "card" && <ContemplationCard />}
        {view === "color" && <ColorAndType />}
        {view === "photos" && <PhotographAcrossMedia />}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PageSpread — Verso/Recto with margin anatomy
   ══════════════════════════════════════════════════════════════════ */

function PageSpread() {
  const scale = 0.85; // visual scale for the mock
  const pw = margins.pageW * 48 * scale; // page width in px
  const ph = margins.pageH * 48 * scale; // page height in px

  return (
    <div>
      {/* Spread */}
      <div
        className="flex justify-center gap-1 mb-6 overflow-x-auto"
        style={{ padding: "12px 0" }}
      >
        {/* Verso (left page) — blank recaka */}
        <div
          style={{
            width: pw,
            height: ph,
            backgroundColor: "#FAF8F0",
            border: "1px solid #e0ddd5",
            borderRadius: "2px 0 0 2px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {/* Running header — verso: book title */}
          <div
            style={{
              position: "absolute",
              top: margins.head * 48 * scale * 0.5,
              left: margins.foreEdge * 48 * scale,
              right: margins.gutter * 48 * scale,
              fontFamily: "var(--font-ui)",
              fontSize: "7px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#999",
            }}
          >
            Autobiography of a Yogi
          </div>
          {/* Folio — verso: outer margin (left) */}
          <div
            style={{
              position: "absolute",
              bottom: margins.foot * 48 * scale * 0.6,
              left: margins.foreEdge * 48 * scale,
              fontFamily: "var(--font-ui)",
              fontSize: "7px",
              color: "#999",
            }}
          >
            142
          </div>
          {/* Blank content — recaka */}
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "9px",
              color: "#bbb",
              fontStyle: "italic",
            }}
          >
            recaka — the exhalation
          </span>
        </div>

        {/* Recto (right page) — chapter opening */}
        <div
          style={{
            width: pw,
            height: ph,
            backgroundColor: "#FAF8F0",
            border: "1px solid #e0ddd5",
            borderRadius: "0 2px 2px 0",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {/* Margin guides */}
          <div
            style={{
              position: "absolute",
              top: margins.head * 48 * scale,
              left: margins.gutter * 48 * scale,
              right: margins.foreEdge * 48 * scale,
              bottom: margins.foot * 48 * scale,
              border: "1px dashed rgba(220, 189, 35, 0.2)",
            }}
          >
            {/* Vertical start — 1/3 from top */}
            <div style={{ height: "33%", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderBottom: "1px dashed rgba(220, 189, 35, 0.15)",
                }}
              />
            </div>

            {/* Chapter content starts here */}
            <div style={{ padding: "8px 4px", textAlign: "center" }}>
              {/* Lotus ornament */}
              <div
                style={{
                  width: "20px",
                  height: "12px",
                  margin: "0 auto 6px",
                  backgroundColor: "var(--color-gold)",
                  opacity: 0.4,
                  WebkitMaskImage: "url('/motifs/srf/glyphs/lotus-07.svg')",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: "url('/motifs/srf/glyphs/lotus-07.svg')",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
              />

              {/* Chapter label */}
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#999",
                  marginBottom: "2px",
                }}
              >
                Chapter 12
              </div>

              {/* Chapter title */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#1A2744",
                  lineHeight: 1.3,
                  marginBottom: "10px",
                }}
              >
                Years in My Master&rsquo;s Hermitage
              </div>

              {/* Body text mock — justified */}
              <div
                style={{
                  fontSize: "7px",
                  fontFamily: '"Merriweather", Georgia, serif',
                  color: "#1A2744",
                  lineHeight: 1.55,
                  textAlign: "justify",
                  hyphens: "auto",
                }}
              >
                {/* Drop cap */}
                <span
                  style={{
                    fontSize: "22px",
                    float: "left",
                    lineHeight: 0.8,
                    marginRight: "2px",
                    marginTop: "1px",
                    fontWeight: 700,
                    color: "#1A2744",
                  }}
                >
                  I
                </span>
                beheld a transformed Sri Yukteswar. No longer the familiar
                figure in an ascetic&rsquo;s garb &mdash; my guru was now
                resplendent in robes of dazzling light. His countenance was
                bright with the ineffable glory of cosmic consciousness.
                A deep ecstasy suffused my being as I realized that the form
                before me was not the teacher I had known.
              </div>
            </div>
          </div>

          {/* Folio — recto: outer margin (right) */}
          <div
            style={{
              position: "absolute",
              bottom: margins.foot * 48 * scale * 0.6,
              right: margins.foreEdge * 48 * scale,
              fontFamily: "var(--font-ui)",
              fontSize: "7px",
              color: "#999",
            }}
          >
            143
          </div>
        </div>
      </div>

      {/* Margin legend */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
      >
        {[
          { label: "Gutter", value: '0.75"', note: "The spine holds it" },
          { label: "Head", value: '0.875"', note: "Above the text block" },
          { label: "Fore-edge", value: '1.0"', note: "The reader's thumb" },
          { label: "Foot", value: '1.125"', note: "Optical center above geometric" },
        ].map((m) => (
          <div
            key={m.label}
            className="theme-transition rounded-md p-3"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-gold)",
                marginBottom: "2px",
              }}
            >
              {m.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-reading)",
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                color: "var(--color-text-secondary)",
                marginTop: "2px",
              }}
            >
              {m.note}
            </div>
          </div>
        ))}
      </div>

      {/* Composition notes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            title: "Puraka (Approach)",
            desc: "Chapters always begin on recto. The blank verso is recaka — the exhalation before the next breath. Text starts at 1/3 page height.",
          },
          {
            title: "Kumbhaka (Held)",
            desc: "Justified text, hyphenated. First-line indent 1.5em. Orphans and widows controlled (min 2 lines). The body is unlimited.",
          },
          {
            title: "Recaka (Release)",
            desc: "Gold lotus colophon ornament at chapter end. Remaining page left blank. The reader breathes before turning.",
          },
        ].map((n) => (
          <div
            key={n.title}
            className="theme-transition rounded-md p-4"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--color-text)",
                marginBottom: "4px",
              }}
            >
              {n.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.5,
              }}
            >
              {n.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ContemplationCard — The minimum viable PDF
   ══════════════════════════════════════════════════════════════════ */

function ContemplationCard() {
  const cardW = 4.25 * 56; // px
  const cardH = 5.5 * 56;  // px

  return (
    <div>
      <div className="flex justify-center mb-6" style={{ padding: "12px 0" }}>
        <div
          style={{
            width: cardW,
            maxWidth: "100%",
            height: cardH,
            backgroundColor: "#FAF8F0",
            border: "1px solid #e0ddd5",
            borderRadius: "3px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 32px",
            position: "relative",
          }}
        >
          {/* Passage — centered vertically */}
          <div
            style={{
              fontFamily: '"Merriweather", Georgia, serif',
              fontSize: "14px",
              lineHeight: 1.8,
              color: "#1A2744",
              textAlign: "center",
              maxWidth: "85%",
            }}
          >
            Be as simple as you can be; you will be astonished to see
            how uncomplicated and happy your life can become.
          </div>

          {/* Attribution */}
          <div
            style={{
              fontFamily: '"Merriweather", Georgia, serif',
              fontSize: "10px",
              fontStyle: "italic",
              color: "#666",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            &mdash;&nbsp;Paramahansa Yogananda
          </div>

          {/* Lotus colophon */}
          <div
            style={{
              width: "16px",
              height: "10px",
              marginTop: "20px",
              backgroundColor: "var(--color-gold)",
              opacity: 0.3,
              WebkitMaskImage: "url('/motifs/srf/glyphs/lotus-15.svg')",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: "url('/motifs/srf/glyphs/lotus-15.svg')",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />

          {/* Book provenance at foot */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              fontFamily: "var(--font-ui)",
              fontSize: "7px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#bbb",
            }}
          >
            Where There Is Light &middot; Self-Realization Fellowship
          </div>
        </div>
      </div>

      {/* Card specs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            title: "Dimensions",
            desc: '4.25" x 5.5" (A6 / quarter-letter). The sharable teaching — what a seeker prints to carry, pin to a wall, place on a desk.',
          },
          {
            title: "Composition",
            desc: "Passage and attribution centered vertically — the bindu occupies the optical center. Gold lotus colophon below. Provenance at foot.",
          },
          {
            title: "No Pagination",
            desc: "No page number, no running header. A single page — numbering is meaningless. The passage stands alone.",
          },
          {
            title: "Minimum Viable PDF",
            desc: "Testable immediately. Maps to the passage card pattern. The most beautiful artifact: a single teaching, framed with care, complete.",
          },
        ].map((s) => (
          <div
            key={s.title}
            className="theme-transition rounded-md p-4"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--color-text)",
                marginBottom: "4px",
              }}
            >
              {s.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.5,
              }}
            >
              {s.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ColorAndType — Screen-to-paper translation tables
   ══════════════════════════════════════════════════════════════════ */

function ColorAndType() {
  return (
    <div>
      {/* ── Color Translation ─────────────────────────────────── */}
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--color-gold)",
          marginBottom: "8px",
        }}
      >
        Color Translation &mdash; sRGB to CMYK + Spot
      </div>

      <div className="overflow-x-auto mb-8">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid var(--color-border)",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "8px 12px 8px 0", color: "var(--color-text-secondary)", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Color</th>
              <th style={{ padding: "8px 12px", color: "var(--color-text-secondary)", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>sRGB</th>
              <th style={{ padding: "8px 12px", color: "var(--color-text-secondary)", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>CMYK</th>
              <th style={{ padding: "8px 12px", color: "var(--color-text-secondary)", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pantone</th>
              <th style={{ padding: "8px 12px", color: "var(--color-text-secondary)", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Press Notes</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((c) => (
              <tr
                key={c.name}
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <td style={{ padding: "8px 12px 8px 0", whiteSpace: "nowrap" }}>
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "3px",
                        backgroundColor: c.srgb,
                        border: "1px solid rgba(0,0,0,0.1)",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontWeight: 600, color: "var(--color-text)" }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: "8px 12px", fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "var(--color-text-secondary)" }}>{c.srgb}</td>
                <td style={{ padding: "8px 12px", fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "var(--color-text-secondary)" }}>{c.cmyk}</td>
                <td style={{ padding: "8px 12px", color: "var(--color-text-secondary)" }}>{c.pantone}</td>
                <td style={{ padding: "8px 12px", color: "var(--color-text-secondary)", fontSize: "11px" }}>{c.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Two-color economy */}
      <div
        className="theme-transition rounded-md p-4 mb-8"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--color-text)",
            marginBottom: "4px",
          }}
        >
          Two-Color Economy
        </div>
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
          }}
        >
          The minimum viable print run: navy (body text, headings, rules) +
          gold spot (accents, motifs, decorative elements at screen
          percentages). The full contemplative voice in two ink channels.
          Publication overlay requires a third color (crimson) or substitution
          on publication pages.
        </div>
        <div className="flex gap-3 mt-3">
          <div className="flex items-center gap-2">
            <div style={{ width: 20, height: 12, borderRadius: "2px", backgroundColor: "#1A2744" }} />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "var(--color-text-secondary)" }}>Black channel (navy)</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 20, height: 12, borderRadius: "2px", backgroundColor: "#DCBD23" }} />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "var(--color-text-secondary)" }}>Spot channel (gold)</span>
          </div>
        </div>
      </div>

      {/* ── Typography Mapping ────────────────────────────────── */}
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--color-gold)",
          marginBottom: "8px",
        }}
      >
        Typography &mdash; Screen to Paper
      </div>

      <div className="overflow-x-auto">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid var(--color-border)",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "8px 12px 8px 0", color: "var(--color-text-secondary)", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Role</th>
              <th style={{ padding: "8px 12px", color: "var(--color-text-secondary)", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Screen</th>
              <th style={{ padding: "8px 12px", color: "var(--color-text-secondary)", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Paper</th>
              <th style={{ padding: "8px 12px", color: "var(--color-text-secondary)", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {typeMap.map((t) => (
              <tr
                key={t.role}
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <td style={{ padding: "8px 12px 8px 0", fontWeight: 600, color: "var(--color-text)", whiteSpace: "nowrap" }}>{t.role}</td>
                <td style={{ padding: "8px 12px", color: "var(--color-text-secondary)", fontSize: "11px" }}>{t.screen}</td>
                <td style={{ padding: "8px 12px", color: "var(--color-text-secondary)", fontSize: "11px" }}>{t.paper}</td>
                <td style={{ padding: "8px 12px", color: "var(--color-text-secondary)", fontSize: "11px" }}>{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paper stock note */}
      <div
        className="theme-transition rounded-md p-4 mt-6"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--color-text)",
            marginBottom: "4px",
          }}
        >
          The Substrate
        </div>
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
          }}
        >
          What is <code style={{ fontSize: "11px", fontFamily: "var(--font-mono, monospace)" }}>--color-bg (#FAF8F5)</code> on
          screen becomes the paper itself. Natural white / cream, 80&ndash;100#
          text weight, warm tone (no optical brighteners). The two lowest
          attention levels &mdash; subliminal and texture &mdash; become the
          substrate. The ghost of physicality becomes actual physicality.
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PhotographAcrossMedia — How images translate across three outputs
   ══════════════════════════════════════════════════════════════════ */

const photoRoles = [
  {
    role: "Arrival",
    screen: "Scroll-driven opacity 0.4 → 0.3. Full-bleed behind hero. The veil creates atmosphere without competing with text.",
    pdf: "Full page, facing title page (frontispiece). No veil, no opacity — the photograph exists completely.",
    print: "Same as PDF. Full bleed or generous margin. The reader's first visual encounter.",
    constraint: "Guru photograph rules apply with full force across all media.",
    screenClass: ".atmosphere-arrival",
  },
  {
    role: "Ambient",
    screen: "Subliminal opacity (0.06 to 0.03). The photograph dissolves into the background — felt, not seen.",
    pdf: "Quarter-page or smaller at chapter opening. Optional 15% screen on cream stock for warmth.",
    print: "Same as PDF. Above chapter label or in outer margin. Never guru photographs — landscape and nature only.",
    constraint: "Never guru photographs as chapter vignettes across any medium.",
    screenClass: ".atmosphere-ambient",
  },
  {
    role: "Breath",
    screen: "Texture opacity (0.03 → 0.06 → 0.03). The gentlest pulse — the photograph breathes with the reader's scroll position.",
    pdf: "Does not translate. Whitespace on paper is the breath. The lotus motif handles section breaks.",
    print: "Does not translate. Page turns and blank verso pages ARE the breath.",
    constraint: "This role is screen-only. Its purpose transfers to different media-native mechanisms.",
    screenClass: ".atmosphere-breath",
  },
  {
    role: "Transition",
    screen: "Between sections. Opacity modulates during scroll to bridge one content area to the next.",
    pdf: "Does not translate. The blank verso between chapters IS the transition.",
    print: "Does not translate. The act of turning a page is the most complete transition in any medium.",
    constraint: "Screen-only. The physical page turn is more powerful than any digital transition.",
    screenClass: "—",
  },
];

const imageCategories = [
  {
    category: "Guru Photographs",
    rules: "Never cropped, filtered, colorized, or AI-enhanced. Always with attribution. Respectful size (never < 120px on screen). Reverential context only — biography, about sections. Not navigation, search, or thumbnails.",
    screen: "Reverential register only. Not atmosphere roles.",
    paper: "Frontispiece (full page), chapter insert (full page with attribution).",
    crossMedia: "Identical rules across all media. PRI-01 is absolute.",
  },
  {
    category: "Nature & Landscape",
    rules: "Mountains, ocean, sky, gardens, flowers, trees. The safest and most versatile category. No institutional or devotional specificity.",
    screen: "All atmosphere roles (arrival, ambient, breath, ground).",
    paper: "Chapter vignettes, section openers, decorative plates.",
    crossMedia: "Most flexible. Can serve atmosphere on screen and content on paper.",
  },
  {
    category: "SRF Properties",
    rules: "Lake Shrine, Encinitas Hermitage, Mother Center, Hidden Valley. Always with location attribution.",
    screen: "Arrival and ambient roles only.",
    paper: "Section plates with attribution. Establishes sense of place.",
    crossMedia: "Shared heritage. Either organization may feature any property with attribution.",
  },
  {
    category: "Event Photography",
    rules: "Convocation, group meditation, ceremonies. Communal voice only (gathering theme).",
    screen: "Arrival role only. Atmospheric treatment (blur, overlay, reduced opacity).",
    paper: "Rarely used. If present, large format with atmospheric treatment.",
    crossMedia: "Consent-aware across all media. Prefer crowd-scale or architectural framing.",
  },
];

function PhotographAcrossMedia() {
  return (
    <div>
      {/* ── Role Translation ──────────────────────────────────── */}
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--color-gold)",
          marginBottom: "8px",
        }}
      >
        Photograph Roles &mdash; Screen to Paper
      </div>
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "12px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
          marginBottom: "12px",
          maxWidth: "600px",
        }}
      >
        On screen, photographs are atmosphere &mdash; scroll-driven opacity
        creates felt presence without visual competition. On paper, a photograph
        is fully present or absent. The role system bridges the two.
      </p>

      <div className="grid grid-cols-1 gap-3 mb-8">
        {photoRoles.map((r) => (
          <div
            key={r.role}
            className="theme-transition rounded-md overflow-hidden"
            style={{ border: "1px solid var(--color-border)" }}
          >
            {/* Role header */}
            <div
              className="flex items-center justify-between p-3"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--color-text)",
                  }}
                >
                  {r.role}
                </span>
                {r.screenClass !== "—" && (
                  <code
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "10px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {r.screenClass}
                  </code>
                )}
              </div>
            </div>

            {/* Three-column treatment */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
              {[
                { label: "Screen", text: r.screen },
                { label: "Reader PDF", text: r.pdf },
                { label: "Print", text: r.print },
              ].map((col) => (
                <div
                  key={col.label}
                  className="p-3"
                  style={{
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "9px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "var(--color-gold)",
                      marginBottom: "4px",
                    }}
                  >
                    {col.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "12px",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {col.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Cross-media constraint */}
            <div
              className="p-3"
              style={{ fontSize: "11px", fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)", fontStyle: "italic" }}
            >
              {r.constraint}
            </div>
          </div>
        ))}
      </div>

      {/* ── Image Categories ──────────────────────────────────── */}
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--color-gold)",
          marginBottom: "8px",
        }}
      >
        Image Categories &mdash; Permitted Uses
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {imageCategories.map((c) => (
          <div
            key={c.category}
            className="theme-transition rounded-md p-4"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--color-text)",
                marginBottom: "6px",
              }}
            >
              {c.category}
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.5,
                marginBottom: "8px",
              }}
            >
              {c.rules}
            </div>
            <div className="flex flex-col gap-1">
              {[
                { label: "Screen", text: c.screen },
                { label: "Paper", text: c.paper },
              ].map((row) => (
                <div key={row.label} className="flex gap-2" style={{ fontSize: "11px", fontFamily: "var(--font-ui)" }}>
                  <span style={{ color: "var(--color-gold)", fontWeight: 600, minWidth: "48px" }}>{row.label}</span>
                  <span style={{ color: "var(--color-text-secondary)" }}>{row.text}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "8px",
                paddingTop: "6px",
                borderTop: "1px solid var(--color-border)",
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                color: "var(--color-text-secondary)",
                fontStyle: "italic",
              }}
            >
              {c.crossMedia}
            </div>
          </div>
        ))}
      </div>

      {/* ── Image Treatment Rules ─────────────────────────────── */}
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--color-gold)",
          marginBottom: "8px",
          marginTop: "24px",
        }}
      >
        Image Treatment &mdash; Aspect Ratio, Rounding, Masks
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {[
          {
            title: "Aspect Ratio Preservation",
            rules: [
              "Never use object-fit: cover on content photographs — it crops. Use object-fit: contain or natural sizing (height: auto).",
              "Guru photographs: aspect ratio is sacred. Never crop, stretch, or letterbox. Display at native proportions, always.",
              "Atmosphere photographs (screen): object-fit: cover is acceptable because the veil makes cropping invisible — the image is felt, not read.",
              "On paper: photographs are always full-frame. No cropping. The image area fits the photograph, not the reverse.",
            ],
          },
          {
            title: "Corner Rounding",
            rules: [
              "Content photographs (.book-figure-img): --radius-small (2px). A barely perceptible softening — removes the digital hard edge without imposing a shape.",
              "Guru photographs: same 2px radius. Never larger. No circular crops, no shaped masks. The photograph's rectangular frame is its natural boundary.",
              "Atmosphere backgrounds: no radius. Full-bleed to container edges. Rounding would create a visible shape where none should exist.",
              "On paper: no radius at all. Print images have natural rectangular boundaries. Corner rounding is a screen affordance.",
            ],
          },
          {
            title: "CSS Masks & Clip Paths",
            rules: [
              "Never apply CSS masks or clip-path to photographs. Masks are for botanical glyphs (SVG shapes via mask-image). Photographs are not shapes.",
              "Never use circular, hexagonal, or shaped crops on any photograph. The photograph's composition is the author's — imposing a shape violates it.",
              "Exception: atmosphere role photographs may use gradient masks for edge fade (opacity transition to transparent). This is a veil, not a shape.",
            ],
          },
          {
            title: "Responsive Behavior",
            rules: [
              "max-width: 100% + height: auto. The photograph scales with the viewport while preserving aspect ratio.",
              "max-height: 70vh on screen (prevents a portrait image from consuming the entire viewport).",
              "max-height: 40vh in print preview (smaller context).",
              "On paper: sized to fit the page area. Tall images may need a full page; wide images sit within the text block width.",
            ],
          },
          {
            title: "SVG Transparency & Scene Harmony",
            rules: [
              "Botanical glyphs (lotus SVGs) use fill=\"currentColor\" — they inherit color from the CSS context. No hardcoded fills. The SVG background is always transparent.",
              "CSS mask-image renders SVG shape as a mask; background-color provides fill. The SVG never renders its own color — the theme controls everything.",
              "On dark themes, motif colors lighten automatically (--motif-growth, --motif-devotion, --motif-ochre have dark-theme overrides in motifs.css).",
              "On sepia/earth themes, motif colors shift warm (sepia: growth darkens, ochre deepens; earth: ochre terracotta).",
              "On paper: SVGs are rasterized at 300+ DPI. Transparent background means the cream paper shows through — the glyph lives on the paper surface.",
            ],
          },
          {
            title: "Responsive Sizing & Bandwidth",
            rules: [
              "Serve multiple sizes via srcset: at minimum 640w, 1024w, 1600w. Let the browser select based on viewport and device pixel ratio.",
              "Use the sizes attribute to match layout: sizes=\"(max-width: 42em) 100vw, 42em\" for reading surface images.",
              "Format hierarchy: AVIF > WebP > JPEG. Modern formats reduce file size 30-50% at equal quality. Use <picture> with <source> fallbacks.",
              "Atmosphere photographs (veiled, not read): aggressive compression is acceptable. The veil hides artifacts. Target < 50KB per atmosphere image.",
              "Content photographs (.book-figure): moderate compression. Quality 75-85 in WebP. The image is read, not felt — artifacts matter.",
              "loading=\"lazy\" on all images below the fold. Atmosphere images are always below the fold or scroll-triggered.",
              "Text-only mode (.text-only): all images hidden via display: none. Pure text — no image downloads. ADR-006.",
              "Reduced data (prefers-reduced-data / .data-constrained): atmosphere images hidden, content images retained at lowest srcset resolution.",
              "2G connections (PRI-05): the page must work without any images loading. Every image needs meaningful alt text. Captions must make sense without the image.",
            ],
          },
          {
            title: "Caption Guidance",
            rules: [
              "Every content photograph requires a caption (.book-caption). A photograph without context is a photograph without purpose.",
              "Captions use reading font (Merriweather) at 0.875rem, italic, secondary color. Max-width 30rem, centered below the image.",
              "Caption text describes what the image shows AND its significance — not just 'Lake Shrine' but 'Lake Shrine, Paramahansa Yogananda's garden sanctuary in Pacific Palisades.'",
              "Guru photograph captions: always include the guru's full title. 'Paramahansa Yogananda', never just 'Yogananda'.",
              "Attribution is part of the caption when required: 'Photo courtesy of Self-Realization Fellowship.'",
              "On paper: caption sits below the figure, left-aligned to the figure's left edge. 9pt italic.",
              "In PDF: caption is part of the figure element. break-inside: avoid keeps caption with its image across page breaks.",
              "Alt text (img alt attribute) is not the caption. Alt text describes the image for screen readers; the caption provides editorial context. Both are required.",
            ],
          },
          {
            title: "Scene Harmonization",
            rules: [
              "Atmosphere photographs use color-mix veils: color-mix(in srgb, var(--color-bg) N%, transparent). The veil adapts to the current theme's background — always harmonious.",
              "The veil variable (--atmosphere-veil) controls intensity per role: arrival 65%, ambient 93%, breath 95%. Higher = more background, less photograph.",
              "On themed surfaces, the veil inherits the theme's --color-bg. Sepia surfaces veil warm; dark surfaces veil dark. No per-theme photo treatment needed.",
              "Motif glyphs over photographs: use the motif system's opacity levels (decorative 0.4, ambient 0.3). The background-color inherits the theme. Never layer opaque motifs over transparent areas.",
              "Content photographs (.book-figure) sit on --color-bg with no veil. They are content, not atmosphere — fully present against the reading surface.",
            ],
          },
        ].map((section) => (
          <div
            key={section.title}
            className="theme-transition rounded-md p-4"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--color-text)",
                marginBottom: "8px",
              }}
            >
              {section.title}
            </div>
            <ul style={{ margin: 0, paddingLeft: "16px" }}>
              {section.rules.map((rule, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                    marginBottom: "6px",
                  }}
                >
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CSS reference */}
      <div
        className="theme-transition rounded-md p-4 mb-6"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--color-text)",
            marginBottom: "6px",
          }}
        >
          Current CSS Implementation
        </div>
        <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
          <div><span style={{ color: "var(--color-gold)" }}>.book-figure-img</span> {"{"}</div>
          <div style={{ paddingLeft: "16px" }}>max-width: 100%;</div>
          <div style={{ paddingLeft: "16px" }}>height: auto; <span style={{ color: "var(--color-text-secondary)", opacity: 0.6 }}>{"/* preserves aspect ratio */"}</span></div>
          <div style={{ paddingLeft: "16px" }}>max-height: 70vh;</div>
          <div style={{ paddingLeft: "16px" }}>border-radius: var(--radius-small); <span style={{ color: "var(--color-text-secondary)", opacity: 0.6 }}>{"/* 2px */"}</span></div>
          <div>{"}"}</div>
        </div>
      </div>

      {/* Key insight */}
      <div
        className="theme-transition rounded-md p-4 mt-6"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--color-text)",
            marginBottom: "4px",
          }}
        >
          The Medium Shift
        </div>
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
          }}
        >
          On screen, photographs are atmosphere &mdash; veiled, scroll-modulated,
          felt more than seen. On paper, a photograph is content &mdash; fully
          present, occupying its page completely. The screen simulates paper&rsquo;s
          qualities; the PDF is where simulation ends and reality begins. Two
          screen roles (breath, transition) have no paper equivalent because the
          physical medium provides its own: whitespace IS breath, the page turn
          IS transition.
        </div>
      </div>
    </div>
  );
}
