"use client";

import { useState } from "react";
import { useDesign } from "./DesignProvider";

const srfPassage =
  "Be as simple as you can be; you will be astonished to see how uncomplicated and happy your life can become.";
const yssPassage =
  "Live quietly in the moment and see the beauty of all before you. The future will take care of itself.";

const registers = [
  {
    id: "sacred",
    label: "Sacred",
    description: "Full reverence \u2014 the passage receives highest design treatment",
    contentTypes: "Guru quotes, scriptural passages, prayer text",
    whitespace: "Maximum \u2014 the content breathes in vast silence",
    typography: "Display font, generous size, light weight",
    accentLevel: "Subliminal \u2014 accent at 0.06 opacity, felt not seen",
    motion: "Contemplative (800ms) or arrival (1200ms)",
    distractions: "Zero \u2014 all chrome hidden, no links, no actions",
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "28px",
      fontWeight: 300,
      lineHeight: 2.0,
      letterSpacing: "0.01em",
      textAlign: "center" as const,
      padding: "48px 24px",
    },
  },
  {
    id: "reverential",
    label: "Reverential",
    description: "Deep respect \u2014 the content is honored but contextualized",
    contentTypes: "Chapter text, featured passages, biography",
    whitespace: "Generous \u2014 room to contemplate each paragraph",
    typography: "Reading font at standard size, warm serifs",
    accentLevel: "Decorative \u2014 accent at 0.4 for epigraphs and ornaments",
    motion: "Content (300ms) \u2014 smooth but not slow",
    distractions: "Minimal \u2014 navigation available but recedes",
    style: {
      fontFamily: "var(--font-reading)",
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: 1.8,
      textAlign: "left" as const,
      padding: "32px 24px",
    },
  },
  {
    id: "instructional",
    label: "Instructional",
    description: "Helpful guidance \u2014 the design serves function",
    contentTypes: "Table of contents, glossary entries, practice bridge",
    whitespace: "Moderate \u2014 organized, not sparse",
    typography: "UI font for clarity, reading font for content",
    accentLevel: "Ambient \u2014 accent at 0.3 for orientation",
    motion: "Interaction (150ms) \u2014 responsive",
    distractions: "Contextual links and navigation are welcome",
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "15px",
      fontWeight: 400,
      lineHeight: 1.6,
      textAlign: "left" as const,
      padding: "24px",
    },
  },
  {
    id: "functional",
    label: "Functional",
    description: "Transparent utility \u2014 the interface disappears",
    contentTypes: "Search input, settings, filters, pagination",
    whitespace: "Compact \u2014 efficient without being cramped",
    typography: "UI font, small sizes, semibold for actions",
    accentLevel: "Interactive \u2014 accent at full opacity for focus states",
    motion: "Interaction (150ms) \u2014 instant response",
    distractions: "Full chrome, all tools available",
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.5,
      textAlign: "left" as const,
      padding: "16px 24px",
    },
  },
  {
    id: "ambient",
    label: "Ambient",
    description: "The experience IS the absence of content",
    contentTypes: "Quiet corner, portal threshold, loading states",
    whitespace: "Maximum \u2014 space IS the content",
    typography: "Sparse, centered, secondary opacity",
    accentLevel: "Texture \u2014 accent at 0.03, the ghost of presence",
    motion: "Arrival (1200ms) \u2014 slow, contemplative",
    distractions: "None \u2014 all chrome hidden",
    style: {
      fontFamily: "var(--font-reading)",
      fontSize: "16px",
      fontWeight: 300,
      lineHeight: 2.0,
      textAlign: "center" as const,
      padding: "64px 24px",
      fontStyle: "italic" as const,
    },
  },
];

interface VoiceConfig {
  id: string;
  accent: string;
  accentContrast: string;
  label: string;
  dot: string;
}

const srfVoiceList: VoiceConfig[] = [
  { id: "contemplative", accent: "var(--color-gold)", accentContrast: "var(--color-navy)", label: "Contemplative", dot: "var(--color-gold)" },
  { id: "communal", accent: "var(--color-marigold)", accentContrast: "#FFFFFF", label: "Communal", dot: "var(--color-marigold)" },
];

const yssVoiceList: VoiceConfig[] = [
  { id: "modern", accent: "var(--color-gold)", accentContrast: "#FFFFFF", label: "Modern", dot: "var(--color-gold)" },
  { id: "devotional", accent: "var(--color-gold)", accentContrast: "#FFFFFF", label: "Devotional", dot: "var(--color-gold)" },
];

export default function EmotionalRegisters() {
  const { org } = useDesign();
  const [selectedRegister, setSelectedRegister] = useState("sacred");
  const [selectedVoiceId, setSelectedVoiceId] = useState("contemplative");
  const current = registers.find((r) => r.id === selectedRegister)!;

  const voiceList = org === "srf" ? srfVoiceList : yssVoiceList;
  const voice = voiceList.find((v) => v.id === selectedVoiceId) ?? voiceList[0];
  const passage = org === "srf" ? srfPassage : yssPassage;

  // Reset voice when org changes (handled by defaulting to first)
  const activeVoice = voiceList.find((v) => v.id === selectedVoiceId) ? selectedVoiceId : voiceList[0].id;

  // Remap font stacks based on voice
  const voiceStyle = { ...current.style };
  if (org === "srf" && activeVoice === "communal") {
    if (voiceStyle.fontFamily === "var(--font-display)") {
      voiceStyle.fontFamily = "var(--font-display-event)";
    } else if (voiceStyle.fontFamily === "var(--font-ui)") {
      voiceStyle.fontFamily = "var(--font-ui-event)";
    }
  } else if (org === "yss" && activeVoice === "devotional") {
    if (voiceStyle.fontFamily === "var(--font-ui)") {
      voiceStyle.fontFamily = "var(--font-display)";
    }
  }

  return (
    <section id="registers" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
        >
          Emotional Registers
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
          Two orthogonal axes. <strong style={{ color: "var(--color-text)" }}>Registers</strong>{" "}
          (sacred&thinsp;&rarr;&thinsp;ambient) govern content reverence.{" "}
          <strong style={{ color: "var(--color-text)" }}>Voices</strong>{" "}
          ({org === "srf" ? "contemplative\u2009\u2192\u2009communal" : "modern\u2009\u2192\u2009devotional"}) govern surface purpose.
          Toggle both to see how the same passage transforms.
        </p>

        {/* Voice toggle */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}
          >
            Voice
          </span>
          {voiceList.map((v) => {
            const isSelected = activeVoice === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVoiceId(v.id)}
                className="theme-transition px-3 py-1.5 rounded-full text-sm cursor-pointer flex items-center gap-1.5"
                style={{
                  fontFamily: "var(--font-ui)",
                  backgroundColor: isSelected ? v.accent : "var(--color-bg-secondary)",
                  color: isSelected ? v.accentContrast : "var(--color-text)",
                  border: `1px solid ${isSelected ? v.accent : "var(--color-border)"}`,
                  fontWeight: isSelected ? 600 : 400,
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: isSelected ? v.accentContrast : v.dot,
                    display: "inline-block",
                  }}
                />
                {v.label}
              </button>
            );
          })}
        </div>

        {/* Register selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {registers.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegister(r.id)}
              className="theme-transition px-3 py-1.5 rounded-full text-sm cursor-pointer"
              style={{
                fontFamily: "var(--font-ui)",
                backgroundColor: selectedRegister === r.id ? voice.accent : "var(--color-bg-secondary)",
                color: selectedRegister === r.id ? voice.accentContrast : "var(--color-text)",
                border: `1px solid ${selectedRegister === r.id ? voice.accent : "var(--color-border)"}`,
                fontWeight: selectedRegister === r.id ? 600 : 400,
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live preview */}
          <div
            className="theme-transition rounded-md overflow-hidden"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              minHeight: "240px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                ...voiceStyle,
                color: "var(--color-text)",
                transition: `all var(--motion-content) var(--easing-standard)`,
                maxWidth: "500px",
              }}
            >
              <div
                style={{
                  opacity:
                    current.id === "ambient" ? 0.5 : current.id === "sacred" ? 0.9 : 1,
                }}
              >
                {current.id === "sacred" && (
                  <div style={{ color: voice.accent, opacity: 0.4, fontSize: "48px", lineHeight: 1, marginBottom: "8px" }}>
                    &ldquo;
                  </div>
                )}
                {passage}
                {current.id === "sacred" && (
                  <div className="citation-text mt-4" style={{ textAlign: "center" }}>
                    &mdash;&nbsp;Paramahansa Yogananda
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Register details */}
          <div
            className="theme-transition rounded-md p-5"
            style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <h3 className="display-text" style={{ fontSize: "18px", color: "var(--color-text)" }}>
                {current.label}
              </h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  fontFamily: "var(--font-ui)",
                  backgroundColor: voice.accent,
                  color: voice.accentContrast,
                  fontSize: "10px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {voice.label}
              </span>
            </div>
            <p
              className="mb-4"
              style={{ fontFamily: "var(--font-ui)", fontSize: "14px", color: "var(--color-text-secondary)" }}
            >
              {current.description}
            </p>

            <div className="space-y-3">
              {[
                ["Content types", current.contentTypes],
                ["Whitespace", current.whitespace],
                ["Typography", current.typography],
                ["Accent level", current.accentLevel],
                ["Motion", current.motion],
                ["Distractions", current.distractions],
              ].map(([label, value]) => (
                <div key={label}>
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                    style={{ fontFamily: "var(--font-ui)", color: voice.accent }}
                  >
                    {label}
                  </div>
                  <div className="text-sm" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
