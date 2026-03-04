"use client";

import { useState } from "react";

/* A rich gradient simulating a mountain landscape photograph.
   Sky → haze → foliage → earth. Through atmosphere veils,
   this produces the right kind of warmth without external assets. */
const LANDSCAPE =
  "linear-gradient(175deg, #5B86C7 0%, #8FAEC7 20%, #B0C4A8 38%, #7BA06B 52%, #8B7D55 70%, #A0623D 88%, #7A4028 100%)";

const OCEAN =
  "linear-gradient(185deg, #E8C87A 0%, #D4A76A 15%, #7BA7C7 35%, #4A7FA5 55%, #2E5F85 75%, #1A3D5C 100%)";

type Photo = "landscape" | "ocean";

const photos: Record<Photo, { gradient: string; label: string; position: string }> = {
  landscape: { gradient: LANDSCAPE, label: "Mountain Landscape", position: "center" },
  ocean: { gradient: OCEAN, label: "Ocean at Dawn", position: "center 40%" },
};

interface Role {
  name: string;
  cssClass: string;
  veil: string;
  blur: string;
  attention: string;
  description: string;
  minHeight: string;
}

const roles: Role[] = [
  {
    name: "Arrival",
    cssClass: "atmosphere-arrival",
    veil: "65%",
    blur: "none",
    attention: "Decorative (0.4)",
    description:
      "Hero surfaces. The closest photographs get to the reader. Partially visible through theme color. Scroll-driven: fades as user enters content.",
    minHeight: "180px",
  },
  {
    name: "Ambient",
    cssClass: "atmosphere-ambient",
    veil: "93%",
    blur: "4px",
    attention: "Subliminal (0.06)",
    description:
      "Section backgrounds. Photograph not visible — only warmth. The reader feels presence without seeing detail.",
    minHeight: "120px",
  },
  {
    name: "Breath",
    cssClass: "atmosphere-breath",
    veil: "95%",
    blur: "8px",
    attention: "Texture (0.03)",
    description:
      "Movement breaks. Ghost of image at boundaries between movements. The photographic equivalent of the lotus.",
    minHeight: "80px",
  },
  {
    name: "Ground",
    cssClass: "atmosphere-ground-demo",
    veil: "96%",
    blur: "16px",
    attention: "Texture (0.03)",
    description:
      "Page-level base. Heavily blurred, pure warmth. Sits behind the gold gradient adding dimension of physical place.",
    minHeight: "80px",
  },
];

const levels = [
  {
    level: 0,
    name: "Gold gradient",
    description: "Pure CSS radial gradient, scroll-driven. No assets. The canonical expression.",
    tag: "Active now",
  },
  {
    level: 1,
    name: "Static photograph",
    description: "A photograph behind the gold gradient at texture-to-subliminal opacity. Adds warmth of place.",
    tag: "opt-in",
  },
  {
    level: 2,
    name: "Scroll-driven",
    description: "Photograph presence modulates with scroll via animation-timeline. Same mechanism as gold gradient.",
    tag: "progressive",
  },
  {
    level: 3,
    name: "Ambient motion",
    description: "Very slow continuous Ken Burns on non-reading surfaces. Conditional: communal/arrival only.",
    tag: "conditional",
  },
];

/* ── Ground Demo ──────────────────────────────────────────────
   The real .atmosphere-ground uses position:fixed which would
   break the showcase layout. This simulates it contained. */
function GroundDemo({ image, position }: { image: string; position: string }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "80px",
        borderRadius: "var(--radius-medium)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Photograph layer — simulates ::before */}
      <div
        style={{
          position: "absolute",
          inset: "-24px",
          backgroundImage: image,
          backgroundSize: "cover",
          backgroundPosition: position,
          filter: "blur(16px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Theme veil — simulates ::after */}
      <div
        className="theme-transition"
        style={{
          position: "absolute",
          inset: 0,
          background: "color-mix(in srgb, var(--color-bg) 96%, transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: "16px 20px" }}>
        <div
          className="reading-text"
          style={{
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            fontStyle: "italic",
          }}
        >
          Pure warmth — the sensation of place without identifiable content.
        </div>
      </div>
    </div>
  );
}

export default function PhotographicAtmosphere() {
  const [photo, setPhoto] = useState<Photo>("landscape");
  const { gradient, position } = photos[photo];

  return (
    <section id="atmosphere" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
        >
          Photographic Atmosphere
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
          Photographs as atmosphere: felt, not seen. An optional layer for surfaces
          where photographic warmth enhances the experience. Each photograph is viewed
          through a veil of the theme&rsquo;s background color — automatic adaptation
          to every theme, including themes that don&rsquo;t yet exist.
        </p>

        {/* Photo selector */}
        <div className="flex gap-2 mb-6">
          {(Object.entries(photos) as [Photo, typeof photos[Photo]][]).map(([id, p]) => (
            <button
              key={id}
              onClick={() => setPhoto(id)}
              className="theme-transition"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "6px",
                border:
                  id === photo
                    ? "2px solid var(--color-gold)"
                    : "2px solid var(--color-border)",
                backgroundColor:
                  id === photo ? "var(--color-bg-secondary)" : "transparent",
                cursor: "pointer",
                fontFamily: "var(--font-ui)",
                fontSize: "13px",
                fontWeight: id === photo ? 600 : 400,
                color:
                  id === photo
                    ? "var(--color-text)"
                    : "var(--color-text-secondary)",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: p.gradient,
                }}
              />
              {p.label}
            </button>
          ))}
        </div>

        {/* ── Four Roles ──────────────────────────────────────── */}
        <div className="space-y-4 mb-8">
          {roles.map((role) => {
            const isGround = role.cssClass === "atmosphere-ground-demo";

            return (
              <div key={role.name}>
                {/* Role header */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "var(--color-text)",
                    }}
                  >
                    {role.name}
                  </span>
                  <span className="token-value">.{role.cssClass.replace("-demo", "")}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "11px",
                      color: "var(--color-text-secondary)",
                      opacity: 0.7,
                    }}
                  >
                    veil {role.veil} &middot; {role.attention}
                  </span>
                </div>

                {/* Live demo */}
                {isGround ? (
                  <GroundDemo image={gradient} position={position} />
                ) : (
                  <div
                    className={`${role.cssClass} theme-transition`}
                    style={{
                      // @ts-expect-error CSS custom property
                      "--atmosphere-image": gradient,
                      "--atmosphere-position": position,
                      minHeight: role.minHeight,
                      borderRadius: "var(--radius-medium)",
                      border: "1px solid var(--color-border)",
                      display: "flex",
                      alignItems: "center",
                      padding: "20px 24px",
                    }}
                  >
                    <div style={{ position: "relative", zIndex: 2 }}>
                      <div
                        className="reading-text"
                        style={{
                          fontSize: "14px",
                          color: "var(--color-text-secondary)",
                          fontStyle: "italic",
                          maxWidth: "500px",
                        }}
                      >
                        {role.description}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Theme Veil Mechanism ────────────────────────────── */}
        <div
          className="theme-transition rounded-md p-5 mb-6"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}
          >
            Theme Veil Mechanism
          </h3>
          <div
            className="reading-text mb-3"
            style={{
              fontSize: "13px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Every photograph is viewed through{" "}
            <code className="token-value">
              color-mix(in srgb, var(--color-bg) &lt;veil%&gt;, transparent)
            </code>
            . Because the veil uses the theme&rsquo;s own background color, all adaptation
            is automatic. Switch themes above to see the same photograph transform.
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { theme: "light", color: "#FAF8F5", quality: "Warm cream — old paper over landscape" },
              { theme: "sepia", color: "#f4edd4", quality: "Deep cream — antique glass" },
              { theme: "earth", color: "#3c3023", quality: "Dark earth — fire-lit warmth" },
              { theme: "dark", color: "#121c2e", quality: "Deep navy — moonlit memory" },
              { theme: "meditate", color: "#0d0d14", quality: "Near-black — ghost of place" },
              { theme: "gathering", color: "#FFFFFF", quality: "White — sunlit architecture" },
            ].map((t) => (
              <div
                key={t.theme}
                className="flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "11px",
                  color: "var(--color-text-secondary)",
                }}
              >
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "3px",
                    backgroundColor: t.color,
                    border: "1px solid var(--color-border)",
                    flexShrink: 0,
                  }}
                />
                <span>
                  <strong>{t.theme}</strong> — {t.quality}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Progressive Enhancement Stack ────────────────────── */}
        <div
          className="theme-transition rounded-md p-5"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3
            className="text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}
          >
            Progressive Enhancement
          </h3>
          <div className="space-y-3">
            {levels.map((l) => (
              <div key={l.level} className="flex items-start gap-3">
                <span
                  className="display-text shrink-0 text-center"
                  style={{
                    width: "28px",
                    fontSize: "18px",
                    color: l.level === 0 ? "var(--color-gold)" : "var(--color-text-secondary)",
                    opacity: l.level === 0 ? 1 : 0.5 + l.level * 0.15,
                  }}
                >
                  {l.level}
                </span>
                <div style={{ flex: 1 }}>
                  <div className="flex items-baseline gap-2">
                    <span
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--color-text)",
                      }}
                    >
                      {l.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        padding: "1px 6px",
                        borderRadius: "3px",
                        backgroundColor:
                          l.tag === "Active now"
                            ? "var(--color-gold)"
                            : "var(--color-bg)",
                        color:
                          l.tag === "Active now"
                            ? "var(--color-bg)"
                            : "var(--color-text-secondary)",
                        fontWeight: 500,
                      }}
                    >
                      {l.tag}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "12px",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {l.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Constraint Note ──────────────────────────────────── */}
        <p
          className="mt-6"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            opacity: 0.7,
            lineHeight: 1.5,
            maxWidth: "600px",
          }}
        >
          Guru photographs are never used as atmosphere. Reading surfaces never
          receive photographic atmosphere. The gold gradient is the canonical
          expression — photographs are an enrichment, not a replacement.
        </p>
      </div>
    </section>
  );
}
