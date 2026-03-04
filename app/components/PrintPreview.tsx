"use client";

import { useState } from "react";

type View = "screen" | "print";

/* ── Print rule cards ──────────────────────────────────────────── */

interface PrintRule {
  label: string;
  desc: string;
  css: string;
}

const printRules: PrintRule[] = [
  {
    label: "Chrome Removed",
    desc: "Header, footer, nav, scroll-indicator, and dwell-icon are hidden with display: none.",
    css: "header, footer, nav, .scroll-indicator, .dwell-icon { display: none !important }",
  },
  {
    label: "Print Typography",
    desc: "Body resets to Merriweather/Georgia/serif at 12pt with 1.6 line-height on white.",
    css: "body { font-family: \"Merriweather\", Georgia, serif; font-size: 12pt; line-height: 1.6 }",
  },
  {
    label: "Page Margins",
    desc: "2cm margins on all pages. First page gets 3cm top margin for breathing room.",
    css: "@page { margin: 2cm } @page :first { margin-top: 3cm }",
  },
  {
    label: "External Link URLs",
    desc: "External links display their full URL in parentheses after the link text, at 9pt in gray.",
    css: "a[href^=\"http\"]::after { content: \" (\" attr(href) \")\"; font-size: 9pt; color: #666 }",
  },
  {
    label: "Blockquote Borders",
    desc: "Blockquotes receive a 2px left border in gray, replacing any colored or decorative styling.",
    css: "blockquote { border-inline-start: 2px solid #999; padding-inline-start: 1em }",
  },
  {
    label: "Page Break Control",
    desc: "Passage cards avoid breaking inside. H2 headings force a page break before.",
    css: ".passage-card { break-inside: avoid } h2 { break-before: page }",
  },
  {
    label: "Citations Visible",
    desc: "Reader citations always visible at 10pt italic. Print citations shown with top border.",
    css: ".reader-citation { font-size: 10pt; font-style: italic }",
  },
  {
    label: "Footnote Back-links Hidden",
    desc: "Back-links from footnotes to text are meaningless on paper and are removed.",
    css: ".footnote-backlink { display: none }",
  },
  {
    label: "Figures Protected",
    desc: "Figures avoid breaking inside. Images capped at 40vh. Captions in dark gray at 10pt.",
    css: ".book-figure { break-inside: avoid } .book-figure-img { max-height: 40vh }",
  },
  {
    label: "Decorations Removed",
    desc: "Paper texture background-image and golden thread box-shadow are stripped entirely.",
    css: ".reader-texture { background-image: none } .golden-thread-passage { box-shadow: none }",
  },
  {
    label: "Article Centered",
    desc: "Article constrained to 42em and auto-centered. Main gets full width with no padding.",
    css: "article { max-width: 42em; margin: 0 auto }",
  },
  {
    label: "Chapter Notes",
    desc: "Chapter notes section gets a top border and spacing, separating endnotes clearly.",
    css: ".chapter-notes { border-top: 1px solid #ccc; margin-top: 1.5em; padding-top: 1em }",
  },
];

/* ══════════════════════════════════════════════════════════════════
   PrintPreview — Main Component
   ══════════════════════════════════════════════════════════════════ */

export default function PrintPreview() {
  const [view, setView] = useState<View>("screen");

  return (
    <section id="print" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "var(--color-text)",
          }}
        >
          Print Preview
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
          The design system includes a print stylesheet that transforms the
          reading surface for paper. Chrome disappears, decorations are stripped,
          typography resets to serif, and external links reveal their URLs.
        </p>

        {/* ── View Toggle ────────────────────────────────────── */}
        <div className="flex gap-2 mb-6">
          {(["screen", "print"] as const).map((v) => {
            const selected = v === view;
            return (
              <button
                key={v}
                onClick={() => setView(v)}
                className="theme-transition cursor-pointer"
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
                  fontFamily: "var(--font-ui)",
                  fontSize: "13px",
                  fontWeight: selected ? 600 : 400,
                  color: selected
                    ? "var(--color-text)"
                    : "var(--color-text-secondary)",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor:
                      v === "screen"
                        ? "var(--color-gold)"
                        : "#666",
                    opacity: selected ? 1 : 0.5,
                  }}
                />
                {v === "screen" ? "Screen" : "Print"}
              </button>
            );
          })}
        </div>

        {/* ── Side-by-Side Preview ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Screen view */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: view === "screen" ? "var(--color-gold)" : "var(--color-text-secondary)",
                marginBottom: "8px",
              }}
            >
              Screen
            </div>
            <div
              className="theme-transition rounded-md overflow-hidden"
              style={{
                border: view === "screen"
                  ? "2px solid var(--color-gold)"
                  : "1px solid var(--color-border)",
                opacity: view === "screen" ? 1 : 0.5,
                transition: "opacity 300ms ease, border-color 300ms ease",
              }}
            >
              <ScreenMock />
            </div>
          </div>

          {/* Print view */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: view === "print" ? "var(--color-gold)" : "var(--color-text-secondary)",
                marginBottom: "8px",
              }}
            >
              Print
            </div>
            <div
              className="rounded-md overflow-hidden"
              style={{
                border: view === "print"
                  ? "2px solid var(--color-gold)"
                  : "1px solid var(--color-border)",
                opacity: view === "print" ? 1 : 0.5,
                transition: "opacity 300ms ease, border-color 300ms ease",
              }}
            >
              <PrintMock />
            </div>
          </div>
        </div>

        {/* ── Print Rule Cards ───────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {printRules.map((rule) => (
            <div
              key={rule.label}
              className="theme-transition rounded-md p-3"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="text-xs font-semibold mb-1"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-gold)",
                }}
              >
                {rule.label}
              </div>
              <div
                className="text-xs mb-2"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.4,
                }}
              >
                {rule.desc}
              </div>
              <div
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: "10px",
                  color: "var(--color-text-secondary)",
                  opacity: 0.6,
                  lineHeight: 1.3,
                  wordBreak: "break-all",
                }}
              >
                {rule.css}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ScreenMock — Mini reading surface with colored chrome
   ══════════════════════════════════════════════════════════════════ */

function ScreenMock() {
  return (
    <div
      className="theme-transition"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Simulated header/nav bar */}
      <div
        className="theme-transition"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg-secondary)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "var(--color-gold)",
              opacity: 0.6,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--color-text)",
            }}
          >
            Teachings
          </span>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {["Home", "Read", "Search"].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "10px",
                color: "var(--color-text-secondary)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          height: "2px",
          width: "100%",
          backgroundColor: "var(--color-gold)",
          opacity: 0.3,
        }}
      />

      {/* Article content with texture and golden thread */}
      <div
        style={{
          padding: "20px 16px",
          position: "relative",
        }}
      >
        {/* Simulated paper texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-gold)",
            opacity: 0.02,
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "100%", position: "relative" }}>
          {/* Chapter label */}
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
              textAlign: "center",
              marginBottom: "2px",
            }}
          >
            Chapter 26
          </div>

          {/* Chapter title */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--color-text)",
              textAlign: "center",
              marginBottom: "14px",
              lineHeight: 1.3,
            }}
          >
            The Heart&rsquo;s Magnet
          </div>

          {/* Passage with golden thread border */}
          <div
            style={{
              borderInlineStart: "2px solid var(--color-gold)",
              paddingInlineStart: "12px",
              marginBottom: "12px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-reading)",
                fontSize: "13px",
                lineHeight: 1.7,
                color: "var(--color-text)",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  float: "left",
                  lineHeight: 1,
                  marginRight: "4px",
                  marginTop: "2px",
                  color: "var(--color-text)",
                }}
              >
                T
              </span>
              here is a magnet in your heart that will attract true friends.
              That magnet is unselfishness, thinking of others first.
              When you learn to live for others, they will live for
              you.<sup
                style={{
                  fontSize: "9px",
                  color: "var(--color-gold)",
                  cursor: "pointer",
                }}
              >
                1
              </sup>
            </p>
          </div>

          {/* Blockquote */}
          <blockquote
            style={{
              borderInlineStart: "3px solid var(--color-gold)",
              paddingInlineStart: "12px",
              marginInlineStart: "0",
              marginBottom: "12px",
              fontFamily: "var(--font-reading)",
              fontSize: "12px",
              fontStyle: "italic",
              lineHeight: 1.6,
              color: "var(--color-text-secondary)",
            }}
          >
            Kindness is the light that dissolves all walls between souls.
          </blockquote>

          {/* External link */}
          <p
            style={{
              fontFamily: "var(--font-reading)",
              fontSize: "12px",
              lineHeight: 1.7,
              color: "var(--color-text)",
              marginBottom: "10px",
            }}
          >
            Learn more at the{" "}
            <span
              style={{
                color: "var(--color-gold)",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              Self-Realization Fellowship
            </span>{" "}
            website.
          </p>

          {/* Citation */}
          <div
            style={{
              fontFamily: "var(--font-reading)",
              fontSize: "11px",
              fontStyle: "italic",
              color: "var(--color-text-secondary)",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            &mdash; Paramahansa Yogananda
          </div>

          {/* Dwell icon (simulated) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border: "1.5px solid var(--color-gold)",
                opacity: 0.3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-gold)",
                  opacity: 0.5,
                }}
              />
            </div>
          </div>

          {/* Footnote */}
          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: "8px",
              marginTop: "4px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-reading)",
                fontSize: "10px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  color: "var(--color-gold)",
                  cursor: "pointer",
                  marginRight: "4px",
                }}
              >
                &uarr;
              </span>
              <sup style={{ fontSize: "8px" }}>1</sup>{" "}
              From <em>Where There Is Light</em>, Chapter 3. Published by
              Self-Realization Fellowship.
            </div>
          </div>
        </div>
      </div>

      {/* Simulated footer */}
      <div
        className="theme-transition"
        style={{
          padding: "8px 16px",
          borderTop: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg-secondary)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "9px",
            color: "var(--color-text-secondary)",
            opacity: 0.6,
          }}
        >
          Self-Realization Fellowship
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PrintMock — The same content as printed: white, black, serif
   ══════════════════════════════════════════════════════════════════ */

function PrintMock() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: '"Merriweather", Georgia, serif',
        fontSize: "12pt",
        lineHeight: 1.6,
      }}
    >
      {/* No header, no nav, no scroll indicator */}

      {/* Article content — centered at 42em */}
      <div
        style={{
          padding: "28px 20px 20px",
          maxWidth: "100%",
        }}
      >
        <div style={{ maxWidth: "100%" }}>
          {/* Chapter label */}
          <div
            style={{
              fontSize: "9pt",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#666",
              textAlign: "center",
              marginBottom: "2px",
            }}
          >
            Chapter 26
          </div>

          {/* Chapter title — black, no crimson */}
          <div
            style={{
              fontSize: "16pt",
              fontWeight: 700,
              color: "#000",
              textAlign: "center",
              marginBottom: "16px",
              lineHeight: 1.3,
            }}
          >
            The Heart&rsquo;s Magnet
          </div>

          {/* Passage — no golden thread, no texture */}
          <div style={{ marginBottom: "12px" }}>
            <p
              style={{
                fontSize: "12pt",
                lineHeight: 1.6,
                color: "#000",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "28pt",
                  float: "left",
                  lineHeight: 1,
                  marginRight: "4px",
                  marginTop: "2px",
                  color: "#000",
                }}
              >
                T
              </span>
              here is a magnet in your heart that will attract true friends.
              That magnet is unselfishness, thinking of others first.
              When you learn to live for others, they will live for
              you.<sup style={{ fontSize: "8pt", color: "#000" }}>1</sup>
            </p>
          </div>

          {/* Blockquote — 2px gray left border */}
          <blockquote
            style={{
              borderInlineStart: "2px solid #999",
              paddingInlineStart: "12px",
              marginInlineStart: "0",
              marginBottom: "12px",
              fontSize: "11pt",
              fontStyle: "italic",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Kindness is the light that dissolves all walls between souls.
          </blockquote>

          {/* External link — URL shown in parens */}
          <p
            style={{
              fontSize: "12pt",
              lineHeight: 1.6,
              color: "#000",
              marginBottom: "10px",
            }}
          >
            Learn more at the{" "}
            <span
              style={{
                color: "#000",
                textDecoration: "none",
              }}
            >
              Self-Realization Fellowship
            </span>{" "}
            <span style={{ fontSize: "9pt", color: "#666" }}>
              (https://www.yogananda.org)
            </span>{" "}
            website.
          </p>

          {/* Citation — 10pt italic */}
          <div
            style={{
              fontSize: "10pt",
              fontStyle: "italic",
              color: "#000",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            &mdash; Paramahansa Yogananda
          </div>

          {/* No dwell icon */}

          {/* Print citation — visible with top border */}
          <div
            style={{
              display: "block",
              marginTop: "16px",
              paddingTop: "10px",
              borderTop: "1px solid #ccc",
              fontSize: "9pt",
              color: "#666",
            }}
          >
            From <em>Where There Is Light</em>. Self-Realization Fellowship,
            Los Angeles, California.
          </div>

          {/* Footnote — no back-link */}
          <div
            style={{
              borderTop: "1px solid #ccc",
              paddingTop: "10px",
              marginTop: "12px",
            }}
          >
            <div
              style={{
                fontSize: "10pt",
                color: "#444",
                lineHeight: 1.5,
              }}
            >
              <sup style={{ fontSize: "8pt" }}>1</sup>{" "}
              From <em>Where There Is Light</em>, Chapter 3. Published by
              Self-Realization Fellowship.
            </div>
          </div>
        </div>
      </div>

      {/* No footer */}
    </div>
  );
}
