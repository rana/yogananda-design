"use client";

import { useState, useRef } from "react";

/* ── Toggle Button ──────────────────────────────────────────────── */

function Toggle({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer px-3 py-1.5 rounded-full text-xs theme-transition"
      style={{
        fontFamily: "var(--font-ui)",
        fontWeight: 600,
        backgroundColor: active
          ? "var(--color-gold)"
          : "var(--color-bg-secondary)",
        color: active ? "var(--color-navy)" : "var(--color-text-secondary)",
        border: `1px solid ${active ? "var(--color-gold)" : "var(--color-border)"}`,
      }}
    >
      {label}
    </button>
  );
}

/* ── Section Label ──────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-xs font-semibold uppercase tracking-wider mb-2"
      style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}
    >
      {children}
    </div>
  );
}

/* ── Demo Card ──────────────────────────────────────────────────── */

function DemoCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="theme-transition rounded-md p-4"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      {children}
    </div>
  );
}

/* ── Decorative Lotus SVG ───────────────────────────────────────── */

function LotusDecoration({ size = 48 }: { size?: number }) {
  return (
    <svg
      data-decorative
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Center petal */}
      <ellipse
        cx="24"
        cy="20"
        rx="6"
        ry="14"
        fill="var(--color-gold)"
        opacity="0.3"
      />
      {/* Left petal */}
      <ellipse
        cx="24"
        cy="20"
        rx="6"
        ry="14"
        fill="var(--color-gold)"
        opacity="0.2"
        transform="rotate(-30 24 20)"
      />
      {/* Right petal */}
      <ellipse
        cx="24"
        cy="20"
        rx="6"
        ry="14"
        fill="var(--color-gold)"
        opacity="0.2"
        transform="rotate(30 24 20)"
      />
      {/* Outer left */}
      <ellipse
        cx="24"
        cy="20"
        rx="5"
        ry="12"
        fill="var(--color-gold)"
        opacity="0.12"
        transform="rotate(-55 24 20)"
      />
      {/* Outer right */}
      <ellipse
        cx="24"
        cy="20"
        rx="5"
        ry="12"
        fill="var(--color-gold)"
        opacity="0.12"
        transform="rotate(55 24 20)"
      />
    </svg>
  );
}

/* ── 1. Text-Only Mode Demo ─────────────────────────────────────── */

function TextOnlyDemo() {
  const [textOnly, setTextOnly] = useState(false);

  return (
    <DemoCard>
      <div className="flex items-center justify-between mb-3">
        <SectionLabel>Text-Only Mode</SectionLabel>
        <Toggle
          active={textOnly}
          onClick={() => setTextOnly((v) => !v)}
          label={textOnly ? "Text-Only: On" : "Text-Only: Off"}
        />
      </div>
      <p
        className="mb-3"
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "12px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
        }}
      >
        Strips all images, decorative SVGs, and background images. Forces
        Georgia serif on all text. For maximum accessibility or
        bandwidth-constrained environments.
      </p>
      <div className={textOnly ? "text-only" : ""}>
        <div
          className="theme-transition rounded-md p-4"
          style={{
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-start gap-4">
            {/* Decorative SVG — hidden in text-only */}
            <div className="shrink-0">
              <LotusDecoration size={56} />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="reading-text mb-2"
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "var(--color-text)",
                }}
              >
                &ldquo;Be as simple as you can be; you will be astonished to see
                how uncomplicated and happy your life can become.&rdquo;
              </p>
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "12px",
                  color: "var(--color-text-secondary)",
                }}
              >
                &mdash;&nbsp;Paramahansa Yogananda
              </p>
            </div>
          </div>
          {/* Image placeholder — hidden in text-only */}
          <div className="mt-3 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='48' fill='%23ccc'%3E%3Crect width='80' height='48' rx='4'/%3E%3Ctext x='40' y='28' text-anchor='middle' font-size='10' fill='%23999'%3Eimage%3C/text%3E%3C/svg%3E"
              alt="Decorative placeholder"
              style={{ borderRadius: "4px" }}
            />
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                color: "var(--color-text-secondary)",
              }}
            >
              {textOnly
                ? "Images and decorative SVGs are now hidden"
                : "Toggle text-only to hide images and decorations"}
            </span>
          </div>
        </div>
      </div>
      <div
        className="mt-2"
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: "11px",
          color: "var(--color-text-secondary)",
          opacity: 0.7,
        }}
      >
        .text-only img, .text-only svg:not([role=&quot;img&quot;]),
        .text-only [data-decorative] &#123; display: none &#125;
      </div>
    </DemoCard>
  );
}

/* ── 2. Reduced Motion Demo ─────────────────────────────────────── */

function ReducedMotionDemo() {
  const [animating, setAnimating] = useState(false);
  const normalRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef<HTMLDivElement>(null);

  const trigger = () => {
    setAnimating(true);
    // Toggle background color on both boxes
    if (normalRef.current) {
      const isGold =
        normalRef.current.style.backgroundColor === "var(--color-gold)";
      normalRef.current.style.backgroundColor = isGold
        ? "var(--color-bg)"
        : "var(--color-gold)";
    }
    if (reducedRef.current) {
      const isGold =
        reducedRef.current.style.backgroundColor === "var(--color-gold)";
      reducedRef.current.style.backgroundColor = isGold
        ? "var(--color-bg)"
        : "var(--color-gold)";
    }
    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <DemoCard>
      <div className="flex items-center justify-between mb-3">
        <SectionLabel>Reduced Motion</SectionLabel>
        <Toggle
          active={animating}
          onClick={trigger}
          label={animating ? "Animating..." : "Trigger Transition"}
        />
      </div>
      <p
        className="mb-3"
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "12px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
        }}
      >
        When <code style={{ fontSize: "11px" }}>prefers-reduced-motion: reduce</code>{" "}
        is active, ALL transitions and animations are eliminated to 0.01ms. Not
        reduced &mdash; eliminated.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div
            className="text-xs mb-1.5"
            style={{
              fontFamily: "var(--font-ui)",
              color: "var(--color-text-secondary)",
            }}
          >
            Normal (300ms transition)
          </div>
          <div
            ref={normalRef}
            style={{
              height: "64px",
              borderRadius: "6px",
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              transition:
                "background-color 300ms var(--easing-standard)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                color: "var(--color-text-secondary)",
              }}
            >
              300ms ease
            </span>
          </div>
        </div>
        <div>
          <div
            className="text-xs mb-1.5"
            style={{
              fontFamily: "var(--font-ui)",
              color: "var(--color-text-secondary)",
            }}
          >
            Reduced motion (0.01ms)
          </div>
          <div
            ref={reducedRef}
            style={{
              height: "64px",
              borderRadius: "6px",
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              transition: "background-color 0.01ms",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                color: "var(--color-text-secondary)",
              }}
            >
              0.01ms instant
            </span>
          </div>
        </div>
      </div>
      <div
        className="mt-2"
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: "11px",
          color: "var(--color-text-secondary)",
          opacity: 0.7,
        }}
      >
        @media (prefers-reduced-motion: reduce) &#123; *, *::before, *::after
        &#123; transition-duration: 0.01ms !important &#125; &#125;
      </div>
    </DemoCard>
  );
}

/* ── 3. High Contrast Demo ──────────────────────────────────────── */

function HighContrastDemo() {
  const [highContrast, setHighContrast] = useState(false);

  const highContrastLight = {
    text: "#000000",
    secondary: "#333333",
    border: "#666666",
  };

  const highContrastDark = {
    text: "#ffffff",
    secondary: "#cccccc",
    border: "#888888",
  };

  return (
    <DemoCard>
      <div className="flex items-center justify-between mb-3">
        <SectionLabel>High Contrast</SectionLabel>
        <Toggle
          active={highContrast}
          onClick={() => setHighContrast((v) => !v)}
          label={highContrast ? "High Contrast: On" : "High Contrast: Off"}
        />
      </div>
      <p
        className="mb-3"
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "12px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
        }}
      >
        When <code style={{ fontSize: "11px" }}>prefers-contrast: more</code> is
        active, text colors push to maximum contrast. Light themes use pure
        black. Dark themes use pure white.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* Light theme comparison */}
        <div>
          <div
            className="text-xs mb-1.5 font-semibold"
            style={{
              fontFamily: "var(--font-ui)",
              color: "var(--color-text-secondary)",
            }}
          >
            Light theme
          </div>
          <div
            style={{
              padding: "12px",
              borderRadius: "6px",
              backgroundColor: "#f8f6f0",
              border: `1px solid ${highContrast ? highContrastLight.border : "#d4cfc6"}`,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-reading)",
                fontSize: "14px",
                lineHeight: 1.6,
                color: highContrast ? highContrastLight.text : "#2c2c2c",
                marginBottom: "4px",
              }}
            >
              Primary text
            </p>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                color: highContrast
                  ? highContrastLight.secondary
                  : "#6b6560",
              }}
            >
              Secondary text
            </p>
            <div
              style={{
                marginTop: "8px",
                height: "1px",
                backgroundColor: highContrast
                  ? highContrastLight.border
                  : "#d4cfc6",
              }}
            />
            <p
              className="mt-1"
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: "10px",
                color: highContrast
                  ? highContrastLight.secondary
                  : "#6b6560",
              }}
            >
              {highContrast
                ? "text: #000 / secondary: #333 / border: #666"
                : "text: #2c2c2c / secondary: #6b6560"}
            </p>
          </div>
        </div>
        {/* Dark theme comparison */}
        <div>
          <div
            className="text-xs mb-1.5 font-semibold"
            style={{
              fontFamily: "var(--font-ui)",
              color: "var(--color-text-secondary)",
            }}
          >
            Dark theme
          </div>
          <div
            style={{
              padding: "12px",
              borderRadius: "6px",
              backgroundColor: "#1a1a2e",
              border: `1px solid ${highContrast ? highContrastDark.border : "#333355"}`,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-reading)",
                fontSize: "14px",
                lineHeight: 1.6,
                color: highContrast ? highContrastDark.text : "#e0ddd7",
                marginBottom: "4px",
              }}
            >
              Primary text
            </p>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                color: highContrast
                  ? highContrastDark.secondary
                  : "#9a9590",
              }}
            >
              Secondary text
            </p>
            <div
              style={{
                marginTop: "8px",
                height: "1px",
                backgroundColor: highContrast
                  ? highContrastDark.border
                  : "#333355",
              }}
            />
            <p
              className="mt-1"
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: "10px",
                color: highContrast
                  ? highContrastDark.secondary
                  : "#9a9590",
              }}
            >
              {highContrast
                ? "text: #fff / secondary: #ccc / border: #888"
                : "text: #e0ddd7 / secondary: #9a9590"}
            </p>
          </div>
        </div>
      </div>
      <div
        className="mt-2"
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: "11px",
          color: "var(--color-text-secondary)",
          opacity: 0.7,
        }}
      >
        @media (prefers-contrast: more) &#123; :root &#123; --color-text: #000
        &#125; [data-theme=&quot;dark&quot;] &#123; --color-text: #fff &#125;
        &#125;
      </div>
    </DemoCard>
  );
}

/* ── 4. Focus Indicators Demo ───────────────────────────────────── */

function FocusIndicatorsDemo() {
  const [showFocus, setShowFocus] = useState(false);

  return (
    <DemoCard>
      <div className="flex items-center justify-between mb-3">
        <SectionLabel>Focus Indicators</SectionLabel>
        <Toggle
          active={showFocus}
          onClick={() => setShowFocus((v) => !v)}
          label={showFocus ? "Focus Visible" : "Show Focus Rings"}
        />
      </div>
      <p
        className="mb-3"
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "12px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
        }}
      >
        Gold <code style={{ fontSize: "11px" }}>:focus-visible</code> ring on
        all interactive elements. 2px solid, 2px offset. Non-negotiable
        accessibility.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          className="cursor-pointer px-4 py-2 rounded-md theme-transition"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            fontWeight: 500,
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
            outline: showFocus ? "2px solid var(--color-gold)" : "none",
            outlineOffset: showFocus ? "2px" : "0",
          }}
        >
          Button
        </button>
        <a
          href="#accessibility"
          className="theme-transition"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            color: "var(--color-gold)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            outline: showFocus ? "2px solid var(--color-gold)" : "none",
            outlineOffset: showFocus ? "2px" : "0",
            borderRadius: "2px",
            padding: "2px 4px",
          }}
        >
          Link
        </a>
        <input
          type="text"
          placeholder="Text input"
          readOnly
          className="theme-transition"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            padding: "6px 12px",
            borderRadius: "6px",
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
            outline: showFocus ? "2px solid var(--color-gold)" : "none",
            outlineOffset: showFocus ? "2px" : "0",
            width: "140px",
          }}
        />
        <select
          className="theme-transition"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            padding: "6px 12px",
            borderRadius: "6px",
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
            outline: showFocus ? "2px solid var(--color-gold)" : "none",
            outlineOffset: showFocus ? "2px" : "0",
          }}
        >
          <option>Select</option>
        </select>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              border: "2px solid var(--color-gold)",
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              color: "var(--color-text-secondary)",
            }}
          >
            2px solid var(--color-gold)
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "11px",
            color: "var(--color-text-secondary)",
            opacity: 0.6,
          }}
        >
          &middot;
        </span>
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "11px",
            color: "var(--color-text-secondary)",
          }}
        >
          outline-offset: 2px
        </span>
      </div>
      <div
        className="mt-2"
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: "11px",
          color: "var(--color-text-secondary)",
          opacity: 0.7,
        }}
      >
        :focus-visible &#123; outline: 2px solid var(--color-gold);
        outline-offset: 2px &#125;
      </div>
    </DemoCard>
  );
}

/* ── 5. Touch Targets Demo ──────────────────────────────────────── */

function TouchTargetsDemo() {
  return (
    <DemoCard>
      <SectionLabel>Touch Targets</SectionLabel>
      <p
        className="mb-3"
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "12px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
        }}
      >
        Minimum 44px touch targets (WCAG), comfortable 48px for primary
        actions. Enforced via design tokens.
      </p>
      <div className="flex flex-col gap-4">
        {/* 44px minimum */}
        <div className="flex items-center gap-3">
          <div style={{ position: "relative" }}>
            {/* Ruler background */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: "1px dashed var(--color-gold)",
                borderRadius: "6px",
                opacity: 0.4,
              }}
            />
            <button
              className="cursor-pointer rounded-md theme-transition"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                fontWeight: 500,
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
              }}
            >
              Tap
            </button>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              44px &mdash; Minimum
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                color: "var(--color-text-secondary)",
              }}
            >
              var(--touch-target-min) &middot; WCAG 2.5.8
            </div>
          </div>
          {/* Ruler measurement */}
          <div
            className="hidden sm:flex items-center"
            style={{ marginLeft: "auto" }}
          >
            <div
              style={{
                width: "44px",
                height: "2px",
                backgroundColor: "var(--color-gold)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "-4px",
                  width: "2px",
                  height: "10px",
                  backgroundColor: "var(--color-gold)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "-4px",
                  width: "2px",
                  height: "10px",
                  backgroundColor: "var(--color-gold)",
                }}
              />
            </div>
            <span
              className="ml-2"
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: "11px",
                color: "var(--color-gold)",
              }}
            >
              44px
            </span>
          </div>
        </div>

        {/* 48px comfortable */}
        <div className="flex items-center gap-3">
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: "1px dashed var(--color-gold)",
                borderRadius: "6px",
                opacity: 0.4,
              }}
            />
            <button
              className="cursor-pointer rounded-md theme-transition"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                fontWeight: 500,
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
              }}
            >
              Tap
            </button>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              48px &mdash; Comfortable
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                color: "var(--color-text-secondary)",
              }}
            >
              var(--touch-target-comfortable) &middot; Primary actions
            </div>
          </div>
          {/* Ruler measurement */}
          <div
            className="hidden sm:flex items-center"
            style={{ marginLeft: "auto" }}
          >
            <div
              style={{
                width: "48px",
                height: "2px",
                backgroundColor: "var(--color-gold)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "-4px",
                  width: "2px",
                  height: "10px",
                  backgroundColor: "var(--color-gold)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "-4px",
                  width: "2px",
                  height: "10px",
                  backgroundColor: "var(--color-gold)",
                }}
              />
            </div>
            <span
              className="ml-2"
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: "11px",
                color: "var(--color-gold)",
              }}
            >
              48px
            </span>
          </div>
        </div>
      </div>
      <div
        className="mt-3"
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: "11px",
          color: "var(--color-text-secondary)",
          opacity: 0.7,
        }}
      >
        --touch-target-min: 44px; --touch-target-comfortable: 48px;
      </div>
    </DemoCard>
  );
}

/* ── 6. Screen Reader Only Demo ─────────────────────────────────── */

function ScreenReaderDemo() {
  const [revealed, setRevealed] = useState(false);

  return (
    <DemoCard>
      <div className="flex items-center justify-between mb-3">
        <SectionLabel>Screen Reader Only</SectionLabel>
        <Toggle
          active={revealed}
          onClick={() => setRevealed((v) => !v)}
          label={revealed ? "SR Content Revealed" : "Reveal SR Content"}
        />
      </div>
      <p
        className="mb-3"
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "12px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
        }}
      >
        The <code style={{ fontSize: "11px" }}>.sr-only</code> class hides
        content visually while keeping it accessible to screen readers.
        Essential for conveying context that sighted users get from layout.
      </p>
      <div
        className="theme-transition rounded-md p-4"
        style={{
          backgroundColor: "var(--color-bg)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <button
            className="cursor-pointer rounded-md theme-transition"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              fontWeight: 500,
              padding: "8px 16px",
              backgroundColor: "var(--color-bg-secondary)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
            }}
            aria-label="Save changes to your reading preferences"
          >
            Save
            <span className={revealed ? "" : "sr-only"}>
              {" "}
              changes to your reading preferences
            </span>
          </button>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              color: "var(--color-text-secondary)",
            }}
          >
            {revealed ? (
              <span>
                <span
                  style={{
                    backgroundColor: "var(--color-gold)",
                    color: "var(--color-navy)",
                    padding: "1px 5px",
                    borderRadius: "3px",
                    fontSize: "10px",
                    fontWeight: 600,
                    marginRight: "4px",
                  }}
                >
                  visible
                </span>
                Screen reader text now shown inline
              </span>
            ) : (
              'Screen reader hears: "Save changes to your reading preferences"'
            )}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <nav
            aria-label="Chapter navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span className={revealed ? "" : "sr-only"}>
              Chapter navigation:
            </span>
            {["1", "2", "3"].map((ch) => (
              <a
                key={ch}
                href="#accessibility"
                className="theme-transition"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "13px",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "6px",
                  backgroundColor:
                    ch === "1"
                      ? "var(--color-gold)"
                      : "var(--color-bg-secondary)",
                  color:
                    ch === "1"
                      ? "var(--color-navy)"
                      : "var(--color-text-secondary)",
                  textDecoration: "none",
                  border: "1px solid var(--color-border)",
                }}
                aria-label={`Chapter ${ch}${ch === "1" ? ", current chapter" : ""}`}
                aria-current={ch === "1" ? "page" : undefined}
              >
                {ch}
              </a>
            ))}
          </nav>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              color: "var(--color-text-secondary)",
            }}
          >
            {revealed && (
              <span
                style={{
                  backgroundColor: "var(--color-gold)",
                  color: "var(--color-navy)",
                  padding: "1px 5px",
                  borderRadius: "3px",
                  fontSize: "10px",
                  fontWeight: 600,
                  marginRight: "4px",
                }}
              >
                visible
              </span>
            )}
            aria-label adds context per element
          </span>
        </div>
      </div>
      <div
        className="mt-2"
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: "11px",
          color: "var(--color-text-secondary)",
          opacity: 0.7,
        }}
      >
        .sr-only &#123; position: absolute; width: 1px; height: 1px; overflow:
        hidden; clip: rect(0,0,0,0) &#125;
      </div>
    </DemoCard>
  );
}

/* ══════════════════════════════════════════════════════════════════
   AccessibilityLab — Main Component
   ══════════════════════════════════════════════════════════════════ */

export default function AccessibilityLab() {
  return (
    <section id="accessibility" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "var(--color-text)",
          }}
        >
          Accessibility &amp; Calm Technology
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
          Non-negotiable accessibility features baked into the design language.
          Focus indicators, reduced motion, high contrast, screen reader
          support, and text-only mode are not add-ons &mdash; they are the
          foundation.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextOnlyDemo />
          <ReducedMotionDemo />
          <HighContrastDemo />
          <FocusIndicatorsDemo />
          <TouchTargetsDemo />
          <ScreenReaderDemo />
        </div>
      </div>
    </section>
  );
}
