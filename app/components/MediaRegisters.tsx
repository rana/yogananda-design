"use client";

import { useState } from "react";

/* ── Media Register Guidance ─────────────────────────────────────
   How the emotional register system extends to non-text media:
   video, audio, photography. Each media type maps to the same
   five-register spectrum (sacred → ambient) but with medium-
   specific treatment.

   Source: semantics/emotional-registers.language.json
          media-register-guidance section, FTR-057, FTR-049
   ────────────────────────────────────────────────────────────── */

type MediaType = "video" | "audio" | "photography";

const mediaTypes: Record<
  MediaType,
  {
    label: string;
    description: string;
    variants: {
      name: string;
      register: string;
      treatment: string;
      detail: string;
    }[];
  }
> = {
  video: {
    label: "Video",
    description:
      "Video carrying Yogananda\u2019s voice, monastic teachings, or devotional chanting. Each type has a register assignment governing player chrome, autoplay policy, and surrounding whitespace.",
    variants: [
      {
        name: "Monastic talks",
        register: "Reverential",
        treatment: "Minimal player chrome. No autoplay. Generous whitespace.",
        detail: "The speaker's words receive near-sacred treatment. The video player recedes.",
      },
      {
        name: "Guided meditations",
        register: "Sacred",
        treatment: "Audio-primary. Visual is secondary or absent. Contemplative pacing.",
        detail: "The seeker's eyes may be closed. Design for the ear, not the eye.",
      },
      {
        name: "Convocation",
        register: "Communal + reverential",
        treatment: "Warmer chrome. Gathering context. Ochre accents.",
        detail: "The communal voice — events, kirtans, group practice. Warmth over solemnity.",
      },
      {
        name: "Commemorative",
        register: "Sacred",
        treatment: "Sacred register despite communal surface. Additional whitespace.",
        detail: "Mahasamadhi, founder's day. The sacred register overrides the communal surface.",
      },
    ],
  },
  audio: {
    label: "Audio",
    description:
      "Audio ranges from Yogananda\u2019s recorded voice (a sacred artifact) to devotional chanting (bhakti expression). The visual treatment must honor the source.",
    variants: [
      {
        name: "Yogananda voice",
        register: "Sacred artifact",
        treatment:
          "Gold ring border. Minimal playback controls. No scrubbing. Sacred silence before and after.",
        detail:
          "These recordings are sacred artifacts. The player design reflects the gravity of hearing the guru's actual voice. A gold ring border (like a reliquary) distinguishes these from ordinary audio.",
      },
      {
        name: "Chanting / kirtan",
        register: "Bhakti (devotional)",
        treatment:
          "Ochre warmth. Communal voice. Lyrics visible if available. Repeat enabled.",
        detail:
          "Chanting is participatory. The design invites joining, not just listening. Ochre accents signal the communal register.",
      },
    ],
  },
  photography: {
    label: "Photography",
    description:
      "Photographs of Yogananda are sacred artifacts in SRF tradition. The design system treats them with the same reverence as his written words.",
    variants: [
      {
        name: "Yogananda subject",
        register: "Sacred artifact",
        treatment:
          "Gold border at decorative opacity. No cropping. No filters. No overlaid text. Generous surrounding whitespace.",
        detail:
          "Never cropped, filtered, or overlaid. These are not stock photos \u2014 they are visual scripture. See brand/image-guidelines.json for full usage rules.",
      },
      {
        name: "Landscapes & ashrams",
        register: "Reverential to ambient",
        treatment:
          "May serve as atmospheric background at texture opacity (0.03). No gold border.",
        detail:
          "Place photographs can function as atmosphere. At texture opacity, they add warmth without competing with text.",
      },
    ],
  },
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-ui)",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--color-gold)",
  marginBottom: "4px",
};

export default function MediaRegisters() {
  const [selected, setSelected] = useState<MediaType>("video");
  const media = mediaTypes[selected];

  return (
    <section id="media-registers" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
        >
          Media Registers
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
          The emotional register system extends beyond text to video, audio,
          and photography. Each media type maps to the five-register spectrum
          with medium-specific treatment &mdash; because hearing
          Yogananda&rsquo;s recorded voice is a sacred experience, not a
          podcast episode.
        </p>

        {/* Media type selector */}
        <div className="flex gap-1 mb-6">
          {(Object.keys(mediaTypes) as MediaType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelected(type)}
              className="theme-transition cursor-pointer px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                fontFamily: "var(--font-ui)",
                backgroundColor:
                  selected === type ? "var(--color-gold)" : "var(--color-bg-secondary)",
                color: selected === type ? "var(--color-navy)" : "var(--color-text-secondary)",
                border: `1px solid ${selected === type ? "var(--color-gold)" : "var(--color-border)"}`,
              }}
            >
              {mediaTypes[type].label}
            </button>
          ))}
        </div>

        {/* Media description */}
        <div
          className="mb-4"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
            maxWidth: "560px",
          }}
        >
          {media.description}
        </div>

        {/* Variants */}
        <div className="space-y-3">
          {media.variants.map((variant) => (
            <div
              key={variant.name}
              className="theme-transition rounded-md"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                overflow: "hidden",
              }}
            >
              {/* Register indicator bar */}
              <div
                style={{
                  height: "2px",
                  backgroundColor:
                    variant.register.toLowerCase().includes("sacred")
                      ? "var(--color-gold)"
                      : variant.register.toLowerCase().includes("bhakti") ||
                          variant.register.toLowerCase().includes("communal")
                        ? "var(--color-ochre, var(--color-gold))"
                        : "var(--color-text-secondary)",
                  opacity: 0.4,
                }}
              />
              <div className="p-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="font-semibold"
                    style={{ fontFamily: "var(--font-ui)", fontSize: "14px", color: "var(--color-text)" }}
                  >
                    {variant.name}
                  </span>
                  <span style={labelStyle}>{variant.register}</span>
                </div>
                <div
                  className="text-xs mb-2"
                  style={{
                    fontFamily: "var(--font-ui)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {variant.treatment}
                </div>
                <div
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-reading)",
                    fontStyle: "italic",
                    color: "var(--color-text-secondary)",
                    opacity: 0.7,
                    lineHeight: 1.5,
                  }}
                >
                  {variant.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sacred artifact callout */}
        {(selected === "audio" || selected === "photography") && (
          <div
            className="theme-transition rounded-md p-4 mt-4"
            style={{
              backgroundColor: "var(--color-surface)",
              borderInlineStart: "3px solid var(--color-gold)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-reading)",
                fontSize: "14px",
                fontStyle: "italic",
                lineHeight: 1.6,
                color: "var(--color-text-secondary)",
              }}
            >
              {selected === "audio"
                ? "Yogananda\u2019s recorded voice is treated as a sacred artifact \u2014 the design equivalent of a reliquary. The gold ring border signals: this is not ordinary audio."
                : "Photographs of Yogananda are visual scripture in the SRF tradition. The design system honors them with the same reverence as his written words \u2014 never cropped, filtered, or overlaid."}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
