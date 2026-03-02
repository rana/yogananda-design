"use client";

import { useState } from "react";

const transitions = [
  {
    name: "Instant",
    duration: "0ms",
    cssVar: "var(--motion-instant)",
    purpose: "No transition. Toggle, dismiss.",
    example: "Focus indicator appearance",
  },
  {
    name: "Interaction",
    duration: "150ms",
    cssVar: "var(--motion-interaction)",
    purpose: "Hover, focus, click response.",
    example: "Button hover, link color change",
  },
  {
    name: "Content",
    duration: "300ms",
    cssVar: "var(--motion-content)",
    purpose: "Content appearing or disappearing.",
    example: "Theme switch, panel reveal, search results",
  },
  {
    name: "Contemplative",
    duration: "800ms",
    cssVar: "var(--motion-contemplative)",
    purpose: "Sacred pacing. Chapter transitions.",
    example: "Breath between chapters, dwell mode",
  },
  {
    name: "Arrival",
    duration: "1200ms",
    cssVar: "var(--motion-arrival)",
    purpose: "Portal entry. The Opening Moment.",
    example: "Portal threshold crossing, first visit",
  },
];

const easings = [
  {
    name: "Standard",
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
    desc: "Most UI transitions",
  },
  {
    name: "Decelerate",
    value: "cubic-bezier(0.0, 0, 0.2, 1)",
    desc: "Elements entering",
  },
  {
    name: "Accelerate",
    value: "cubic-bezier(0.4, 0, 1.0, 1)",
    desc: "Elements leaving",
  },
  {
    name: "Contemplative",
    value: "cubic-bezier(0.25, 0, 0.1, 1)",
    desc: "Sacred content",
  },
];

function TransitionDemo({
  duration,
  easing,
}: {
  duration: string;
  easing: string;
}) {
  const [triggered, setTriggered] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => {
          setTriggered(false);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setTriggered(true));
          });
        }}
        className="shrink-0 cursor-pointer px-3 py-1.5 rounded-full text-xs"
        style={{
          fontFamily: "var(--font-ui)",
          fontWeight: 600,
          backgroundColor: "var(--color-gold)",
          color: "var(--color-navy)",
          border: "none",
        }}
      >
        Play
      </button>
      <div
        className="flex-1 h-8 rounded overflow-hidden"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <div
          className="h-full rounded"
          style={{
            width: triggered ? "100%" : "0%",
            backgroundColor: "var(--color-gold)",
            opacity: 0.6,
            transition: `width ${duration} ${easing}`,
          }}
        />
      </div>
    </div>
  );
}

function StaggerDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="theme-transition rounded-md p-5 mt-6"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--color-text)",
          }}
        >
          Stagger Pattern
        </h3>
        <button
          onClick={() => {
            setVisible(false);
            requestAnimationFrame(() => {
              requestAnimationFrame(() => setVisible(true));
            });
          }}
          className="cursor-pointer px-3 py-1 rounded-full text-xs"
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 600,
            backgroundColor: "var(--color-gold)",
            color: "var(--color-navy)",
            border: "none",
          }}
        >
          Replay
        </button>
      </div>
      <p
        className="text-xs mb-4"
        style={{
          fontFamily: "var(--font-ui)",
          color: "var(--color-text-secondary)",
        }}
      >
        100ms delay between items, max 5 staggered. Like books being placed on
        a shelf one at a time.
      </p>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="theme-transition rounded p-3"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: `opacity var(--motion-content) var(--easing-decelerate) ${visible ? (i - 1) * 100 : 0}ms, transform var(--motion-content) var(--easing-decelerate) ${visible ? (i - 1) * 100 : 0}ms`,
            }}
          >
            <span
              className="text-sm"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-text)",
              }}
            >
              Search result {i}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TransitionTheater() {
  return (
    <section id="transitions" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
        >
          Transition Theater
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
          Every transition serves one of three purposes: responsive feedback,
          content revelation, or spiritual pacing. Decorative transitions are
          forbidden. Click Play to see each duration in real time.
        </p>

        {/* Duration demos */}
        <div className="space-y-4 mb-8">
          {transitions.map((t) => (
            <div
              key={t.name}
              className="theme-transition rounded-md p-4"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="font-semibold"
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "14px",
                    color: "var(--color-text)",
                  }}
                >
                  {t.name}
                </span>
                <span className="token-value">{t.duration}</span>
              </div>
              <div
                className="text-xs mb-3"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {t.purpose}
              </div>
              <TransitionDemo
                duration={t.duration}
                easing="var(--easing-standard)"
              />
            </div>
          ))}
        </div>

        {/* Easing curves */}
        <h3
          className="display-text mb-4"
          style={{ fontSize: "18px", color: "var(--color-text)" }}
        >
          Easing Curves
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {easings.map((e) => (
            <div
              key={e.name}
              className="theme-transition rounded-md p-3"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="font-semibold text-sm mb-1"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-text)",
                }}
              >
                {e.name}
              </div>
              <div className="token-value text-xs mb-1">{e.value}</div>
              <div
                className="text-xs"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {e.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Asymmetric timing */}
        <div
          className="theme-transition rounded-md p-5 mb-6"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3
            className="font-semibold text-sm mb-2"
            style={{
              fontFamily: "var(--font-ui)",
              color: "var(--color-text)",
            }}
          >
            Asymmetric Timing
          </h3>
          <div
            className="text-sm"
            style={{
              fontFamily: "var(--font-ui)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Appear: <span className="token-value">300ms</span> &mdash;
            Disappear: <span className="token-value">150ms</span>. Arrivals
            are celebrated; departures are swift. This asymmetry is intentional
            &mdash; the portal welcomes slowly and releases quickly.
          </div>
        </div>

        <StaggerDemo />
      </div>
    </section>
  );
}
