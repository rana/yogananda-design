"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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

/* ── Prāṇa Breath Demo ──────────────────────────────────────────── */
/* Three-phase breath: pūraka (approach, 300ms, decelerate) →
   kumbhaka (hold, indefinite) → recaka (release, 800ms, accelerate).
   The ratio 1:4:2 from Patañjali — retention is the purpose. */

type BreathPhase = "puraka" | "kumbhaka" | "recaka" | "rest";

const PURAKA_MS = 300;
const KUMBHAKA_MS = 1200; /* One breath cycle hold */
const RECAKA_MS = 800;
const REST_MS = 600;

function BreathDemo() {
  const [phase, setPhase] = useState<BreathPhase>("rest");
  const [breathing, setBreathing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const runCycle = useCallback(() => {
    /* Pūraka — inhalation */
    setPhase("puraka");
    timerRef.current = setTimeout(() => {
      /* Kumbhaka — retention (the purpose) */
      setPhase("kumbhaka");
      timerRef.current = setTimeout(() => {
        /* Recaka — exhalation */
        setPhase("recaka");
        timerRef.current = setTimeout(() => {
          cycleRef.current += 1;
          if (cycleRef.current < 3) {
            /* Brief rest between cycles */
            setPhase("rest");
            timerRef.current = setTimeout(() => runCycle(), REST_MS);
          } else {
            setPhase("rest");
            setBreathing(false);
          }
        }, RECAKA_MS);
      }, KUMBHAKA_MS);
    }, PURAKA_MS);
  }, []);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const start = () => {
    clearTimer();
    cycleRef.current = 0;
    setBreathing(true);
    runCycle();
  };

  const phaseLabel = {
    rest: "Rest",
    puraka: "Pūraka (inhale)",
    kumbhaka: "Kumbhaka (hold)",
    recaka: "Recaka (exhale)",
  }[phase];

  const phaseDesc = {
    rest: "The space between breaths",
    puraka: "300ms \u00b7 decelerate \u00b7 content arrives",
    kumbhaka: "1200ms \u00b7 the reader is with the teaching",
    recaka: "800ms \u00b7 accelerate \u00b7 gentle release",
  }[phase];

  /* Circle scale: rest=0.3, puraka=1.0, kumbhaka=1.0, recaka=0.3 */
  const scale = phase === "puraka" || phase === "kumbhaka" ? 1 : 0.3;
  /* Transition properties per phase */
  const transition = {
    rest: "none",
    puraka: `transform ${PURAKA_MS}ms var(--easing-decelerate), opacity ${PURAKA_MS}ms var(--easing-decelerate)`,
    kumbhaka: "none",
    recaka: `transform ${RECAKA_MS}ms var(--easing-accelerate), opacity ${RECAKA_MS}ms var(--easing-accelerate)`,
  }[phase];

  return (
    <div
      className="theme-transition rounded-md p-5 mt-6"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--color-text)",
            }}
          >
            Prāṇa &mdash; Breath Rhythm
          </h3>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "12px",
              color: "var(--color-text-secondary)",
              marginTop: "2px",
            }}
          >
            The interface breathes. Approach is quick, the held state is
            sacrosanct, release is gentle.
          </div>
        </div>
        <button
          onClick={start}
          disabled={breathing}
          className="cursor-pointer shrink-0 px-3 py-1 rounded-full text-xs"
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 600,
            backgroundColor: breathing
              ? "var(--color-bg)"
              : "var(--color-gold)",
            color: breathing
              ? "var(--color-text-secondary)"
              : "var(--color-navy)",
            border: breathing
              ? "1px solid var(--color-border)"
              : "none",
            opacity: breathing ? 0.5 : 1,
          }}
        >
          {breathing ? "Breathing\u2026" : "Breathe"}
        </button>
      </div>

      {/* Visualization */}
      <div className="flex items-center gap-6">
        {/* Breath circle */}
        <div
          className="shrink-0 flex items-center justify-center"
          style={{ width: "100px", height: "100px" }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "var(--color-gold)",
              opacity: scale === 1 ? 0.6 : 0.15,
              transform: `scale(${scale})`,
              transition,
            }}
          />
        </div>

        {/* Phase info */}
        <div className="flex-1">
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              fontWeight: 600,
              color: phase === "kumbhaka" ? "var(--color-gold)" : "var(--color-text)",
              marginBottom: "4px",
              transition: "color var(--motion-interaction) var(--easing-standard)",
            }}
          >
            {phaseLabel}
          </div>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "12px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.5,
            }}
          >
            {phaseDesc}
          </div>

          {/* Phase timeline — three segments */}
          <div
            className="flex gap-1 mt-3"
            style={{ height: "4px" }}
          >
            <div
              className="rounded-full"
              style={{
                flex: PURAKA_MS,
                backgroundColor: "var(--color-gold)",
                opacity: phase === "puraka" ? 0.8 : 0.2,
                transition: "opacity var(--motion-interaction) var(--easing-standard)",
              }}
            />
            <div
              className="rounded-full"
              style={{
                flex: KUMBHAKA_MS,
                backgroundColor: "var(--color-gold)",
                opacity: phase === "kumbhaka" ? 0.8 : 0.2,
                transition: "opacity var(--motion-interaction) var(--easing-standard)",
              }}
            />
            <div
              className="rounded-full"
              style={{
                flex: RECAKA_MS,
                backgroundColor: "var(--color-gold)",
                opacity: phase === "recaka" ? 0.8 : 0.2,
                transition: "opacity var(--motion-interaction) var(--easing-standard)",
              }}
            />
          </div>
          <div
            className="flex mt-1"
            style={{ fontSize: "10px", fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}
          >
            <span style={{ flex: PURAKA_MS }}>300ms</span>
            <span style={{ flex: KUMBHAKA_MS, textAlign: "center" }}>1200ms</span>
            <span style={{ flex: RECAKA_MS, textAlign: "right" }}>800ms</span>
          </div>
        </div>
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
        <BreathDemo />
      </div>
    </section>
  );
}
