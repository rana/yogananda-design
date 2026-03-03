"use client";

import { useDesign } from "./DesignProvider";

const orgData = {
  srf: {
    color: "#1a2744",
    textOnColor: "#e8e4dc",
    hex: "#1a2744",
    themeCount: 6,
    voiceLabel: "Voices",
    voiceCount: 2,
  },
  yss: {
    color: "#bb4f27",
    textOnColor: "#fff",
    hex: "#bb4f27",
    themeCount: 5,
    voiceLabel: "Voices",
    voiceCount: 2,
  },
};

export default function Hero() {
  const { org } = useDesign();
  const data = orgData[org];
  const totalThemes = orgData.srf.themeCount + orgData.yss.themeCount - 1; // earth is shared

  return (
    <header
      className="theme-transition"
      style={{
        padding: "var(--space-vast) 0 var(--space-expansive)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center mb-8" style={{ opacity: 0.4 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lotus.svg" alt="" className="h-8" />
        </div>

        <h1
          className="display-text text-center"
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            color: "var(--color-text)",
            marginBottom: "var(--space-generous)",
          }}
        >
          Yogananda Design Languages
        </h1>

        <p
          className="reading-text text-center max-w-2xl mx-auto"
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "16px",
            lineHeight: 1.7,
          }}
        >
          Two organizational expressions &mdash;{" "}
          <strong style={{ color: "var(--color-text)" }}>SRF</strong>{" "}
          <span
            className="token-value"
            style={{
              backgroundColor: orgData.srf.color,
              color: orgData.srf.textOnColor,
              borderColor: "transparent",
            }}
          >
            {orgData.srf.hex}
          </span>{" "}
          and{" "}
          <strong style={{ color: "var(--color-text)" }}>YSS</strong>{" "}
          <span
            className="token-value"
            style={{
              backgroundColor: orgData.yss.color,
              color: orgData.yss.textOnColor,
              borderColor: "transparent",
            }}
          >
            {orgData.yss.hex}
          </span> &mdash; sharing common
          foundations. Built for AI-first authorship. Every token is
          self-documenting. Every constraint is machine-readable.
        </p>

        <div
          className="flex justify-center gap-6 mt-8 text-center"
          style={{ fontFamily: "var(--font-ui)", fontSize: "13px" }}
        >
          <div>
            <div
              className="display-text"
              style={{ fontSize: "24px", color: "var(--color-gold)" }}
            >
              3
            </div>
            <div style={{ color: "var(--color-text-secondary)" }}>Layers</div>
          </div>
          <div
            style={{
              width: "1px",
              background: "var(--color-border)",
              alignSelf: "stretch",
            }}
          />
          <div>
            <div
              className="display-text"
              style={{ fontSize: "24px", color: "var(--color-gold)" }}
            >
              2
            </div>
            <div style={{ color: "var(--color-text-secondary)" }}>Orgs</div>
          </div>
          <div
            style={{
              width: "1px",
              background: "var(--color-border)",
              alignSelf: "stretch",
            }}
          />
          <div>
            <div
              className="display-text"
              style={{ fontSize: "24px", color: "var(--color-gold)" }}
            >
              {totalThemes}
            </div>
            <div style={{ color: "var(--color-text-secondary)" }}>Themes</div>
          </div>
          <div
            style={{
              width: "1px",
              background: "var(--color-border)",
              alignSelf: "stretch",
            }}
          />
          <div>
            <div
              className="display-text"
              style={{ fontSize: "24px", color: "var(--color-gold)" }}
            >
              5
            </div>
            <div style={{ color: "var(--color-text-secondary)" }}>
              Registers
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
