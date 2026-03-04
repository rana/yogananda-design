"use client";

import { useState } from "react";

/* ── Four-Level Commentary Hierarchy ─────────────────────────────
   Maps the Indian textual tradition's four commentary layers to
   the Yogananda Design System's emotional registers:

     Mula (मूल)       → Sacred register    → Mandala center
     Bhashya (भाष्य)  → Reverential        → Near orbit
     Tika (टीका)      → Instructional       → Middle orbit
     Varttika (वार्त्तिक) → Functional     → Far orbit

   Source: aesthetics-theory.language.json → Register-Commentary Isomorphism
   ────────────────────────────────────────────────────────────────── */

const content = {
  mula: {
    text: "“You do not have to struggle to reach God, but you do have to struggle to tear away the self-created veil that hides Him from you.”",
    attribution: "Paramahansa Yogananda",
  },
  bhashya:
    "Sri Daya Mata reflects on this teaching: ‘The Master’s words remind us that the divine presence is not distant. The veil is our own restlessness, our own preoccupation with the surface of life. The struggle he speaks of is not effort toward something far away, but the gentle, persistent turning inward.’",
  tika: "Veil (māyā): In Vedantic philosophy, the cosmic delusion that obscures the perception of ultimate reality. Yogananda often used this term to describe both the cosmic illusion and the individual’s mental restlessness that prevents direct perception of the Divine.",
  varttika:
    "Source: Autobiography of a Yogi, Chapter 14. First published 1946, Philosophical Library. This passage appears in the context of Yogananda’s description of his early experiences at Sri Yukteswar’s ashram. Cross-reference: God Talks with Arjuna, commentary on Bhagavad Gita IV:38.",
};

/* Label style shared by all four levels */
const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-ui)",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--color-gold)",
  marginBottom: "8px",
  lineHeight: 1.4,
};

export default function CommentaryHierarchy() {
  const [tikaOpen, setTikaOpen] = useState(false);

  return (
    <section id="commentary" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Section header ─────────────────────────────────────── */}
        <h2
          className="display-text mb-2"
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "var(--color-text)",
          }}
        >
          Commentary Hierarchy
        </h2>
        <p
          className="mb-10"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            maxWidth: "600px",
          }}
        >
          Four levels of textual authority from the Indian scholarly
          tradition&nbsp;&mdash; mapped to the design system&rsquo;s emotional
          registers. Each level has its own typographic treatment, whitespace,
          and accent intensity. The root text is the mandala&rsquo;s center;
          everything else orbits.
        </p>

        {/* ── Level 1: Mula — Root Text — Sacred Register ────────── */}
        <div
          className="theme-transition rounded-md"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            padding: "clamp(32px, 5vw, 64px) clamp(24px, 5vw, 56px)",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          <div style={labelStyle}>
            <span style={{ fontWeight: 600 }}>Mūla (मूल)</span>
            {" "}&middot; Sacred Register &middot; Center
          </div>

          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 3.2vw, 30px)",
              lineHeight: 1.6,
              fontWeight: 400,
              color: "var(--color-text)",
              maxWidth: "640px",
              margin: "0 auto",
              padding: 0,
              border: "none",
            }}
          >
            {content.mula.text}
          </blockquote>

          <div
            style={{
              marginTop: "20px",
              fontFamily: "var(--font-reading)",
              fontSize: "14px",
              fontWeight: 300,
              color: "var(--color-gold)",
              opacity: 0.4, /* decorative level */
            }}
          >
            &mdash;&nbsp;{content.mula.attribution}
          </div>
        </div>

        {/* ── Level 2: Bhashya — Commentary — Reverential Register ── */}
        <div
          className="theme-transition rounded-md"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
            padding: "clamp(24px, 4vw, 40px) clamp(20px, 4vw, 40px)",
            marginBottom: "16px",
          }}
        >
          <div style={labelStyle}>
            <span style={{ fontWeight: 600 }}>Bhāshya (भाष्य)</span>
            {" "}&middot; Reverential Register &middot; Near Orbit
          </div>

          <p
            style={{
              fontFamily: "var(--font-reading)",
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--color-text)",
              maxWidth: "600px",
              margin: 0,
            }}
          >
            {content.bhashya}
          </p>
        </div>

        {/* ── Level 3: Tika — Annotation — Instructional Register ── */}
        <div
          className="theme-transition rounded-md"
          style={{
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            padding: "16px 20px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div style={labelStyle}>
              <span style={{ fontWeight: 600 }}>Tīkā (टीका)</span>
              {" "}&middot; Instructional Register &middot; Middle Orbit
            </div>

            <button
              onClick={() => setTikaOpen((o) => !o)}
              aria-expanded={tikaOpen}
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                color: "var(--color-gold)",
                background: "none",
                border: "1px solid var(--color-border)",
                borderRadius: "4px",
                padding: "4px 12px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: `background-color var(--motion-interaction) var(--easing-standard)`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-bg-secondary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              {tikaOpen ? "Hide annotation" : "Show annotation"}
            </button>
          </div>

          {tikaOpen && (
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "14px",
                lineHeight: 1.6,
                color: "var(--color-text-secondary)",
                maxWidth: "560px",
                marginTop: "8px",
                marginBottom: 0,
              }}
            >
              {content.tika}
            </p>
          )}
        </div>

        {/* ── Level 4: Varttika — Background — Functional Register ── */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "12px",
            marginTop: "4px",
          }}
        >
          <div style={labelStyle}>
            <span style={{ fontWeight: 600 }}>Vārttika (वार्त्तिक)</span>
            {" "}&middot; Functional Register &middot; Far Orbit
          </div>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "12px",
              lineHeight: 1.5,
              color: "var(--color-text-secondary)",
              opacity: 0.6,
              maxWidth: "560px",
              margin: 0,
            }}
          >
            {content.varttika}
          </p>
        </div>
      </div>
    </section>
  );
}
