"use client";

import { useState, useCallback, useEffect, useRef } from "react";

type ReadingMode = "normal" | "focus" | "present" | "quiet";
type FontSize = "default" | "large" | "larger";
type LineSpacing = "default" | "relaxed" | "spacious";

const PARAGRAPH_COUNT = 3;

export default function ReadingExperience() {
  const [dwellIndex, setDwellIndex] = useState<number | null>(null);
  const [publication, setPublication] = useState(false);
  const [texture, setTexture] = useState(false);
  const [goldenThread, setGoldenThread] = useState(true);
  const [mode, setMode] = useState<ReadingMode>("normal");
  const [fontSize, setFontSize] = useState<FontSize>("default");
  const [lineSpacing, setLineSpacing] = useState<LineSpacing>("default");
  const [kbFocus, setKbFocus] = useState<number | null>(null);
  const [sahrdayaWarmth, setSahrdayaWarmth] = useState(0);
  const surfaceRef = useRef<HTMLDivElement>(null);

  const isDwellActive = dwellIndex !== null;

  /* ── Sahṛdaya accumulative warmth ─────────────────────────── */
  /* The prepared reader receives warmth. As the reader dwells,
     gold warmth builds from 0 → 0.04 over ~8 seconds. The effect
     is subliminal — registers as comfort, not color. Resets on
     dwell exit. One full breath cycle (1200ms) per warmth step. */
  useEffect(() => {
    if (!isDwellActive) {
      setSahrdayaWarmth(0);
      return;
    }
    const interval = setInterval(() => {
      setSahrdayaWarmth((prev) => Math.min(prev + 0.005, 0.04));
    }, 1200);
    return () => clearInterval(interval);
  }, [isDwellActive]);

  const toggleDwell = useCallback(
    (index: number) => {
      if (mode === "quiet" || mode === "present") return;
      setDwellIndex((prev) => (prev === index ? null : index));
    },
    [mode],
  );

  /* ── Keyboard navigation (j/k/d/f/Escape) ──────────────── */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      /* Don't capture when typing in inputs */
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      /* Only respond when the reading surface section is in view */
      const section = document.getElementById("reading");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      switch (e.key) {
        case "j":
          setKbFocus((prev) =>
            prev === null ? 0 : Math.min(prev + 1, PARAGRAPH_COUNT - 1),
          );
          e.preventDefault();
          break;
        case "k":
          setKbFocus((prev) =>
            prev === null ? 0 : Math.max(prev - 1, 0),
          );
          e.preventDefault();
          break;
        case "d":
          /* Toggle dwell on kb-focused paragraph */
          setKbFocus((prev) => {
            if (prev !== null) toggleDwell(prev);
            return prev;
          });
          e.preventDefault();
          break;
        case "f":
          setMode((prev) => (prev === "focus" ? "normal" : "focus"));
          e.preventDefault();
          break;
        case "Escape":
          setKbFocus(null);
          setMode("normal");
          setDwellIndex(null);
          break;
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [toggleDwell]);

  /* Scroll kb-focused paragraph into view */
  useEffect(() => {
    if (kbFocus === null || !surfaceRef.current) return;
    const paragraphs = surfaceRef.current.querySelectorAll("[data-paragraph]");
    paragraphs[kbFocus]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [kbFocus]);

  /* Reader preference: line spacing uses CSS classes (targets [data-paragraph] with !important).
     Font size computed inline because .reading-text sets absolute 18px that percentage classes can't override. */
  const lineClass = lineSpacing === "spacious" ? "line-spacious" : lineSpacing === "relaxed" ? "line-relaxed" : "";
  const articleFontSize = fontSize === "larger" ? "22px" : fontSize === "large" ? "20px" : "18px";

  return (
    <section id="reading" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "var(--color-text)",
          }}
        >
          Reading Experience
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
          The composed reading surface &mdash; where every layer converges.
          Click a paragraph for dwell contemplation. Switch reading modes to
          see how the surface adapts for solitary focus, group presentation,
          or quiet reflection. Adjust font size and line spacing for reader
          comfort. Toggle publication context for crimson structural voice.
        </p>

        {/* ── Context & Feature Controls ───────────────────────── */}
        <div
          className={mode === "present" || mode === "focus" ? "hidden" : "flex gap-2 mb-3 flex-wrap"}
        >
          <ToggleButton
            active={publication}
            onClick={() => setPublication(!publication)}
            activeColor="#9B2335"
            activeTextColor="#fff"
          >
            {publication ? "Publication" : "Portal"}
          </ToggleButton>
          <ToggleButton
            active={texture}
            onClick={() => setTexture(!texture)}
          >
            Paper Texture
          </ToggleButton>
          <ToggleButton
            active={goldenThread}
            onClick={() => setGoldenThread(!goldenThread)}
          >
            Golden Thread
          </ToggleButton>
          {isDwellActive && (
            <ToggleButton
              active={false}
              onClick={() => setDwellIndex(null)}
            >
              Exit Dwell
            </ToggleButton>
          )}
        </div>

        {/* ── Mode & Preference Controls ───────────────────────── */}
        <div
          className={mode === "present" ? "hidden" : "flex gap-4 mb-6 flex-wrap items-center"}
        >
          {/* Reading mode — segmented control */}
          <div className="flex items-center gap-1.5">
            <ControlLabel>Mode</ControlLabel>
            <SegmentedControl<ReadingMode>
              value={mode}
              onChange={(m) => {
                setMode(m);
                if (m === "quiet" || m === "present") setDwellIndex(null);
              }}
              options={[
                { value: "normal", label: "Normal" },
                { value: "focus", label: "Focus" },
                { value: "present", label: "Present" },
                { value: "quiet", label: "Quiet" },
              ]}
            />
          </div>

          <ControlDivider />

          {/* Font size — A / A / A at progressive sizes */}
          <div className="flex items-center gap-1.5">
            <ControlLabel>Size</ControlLabel>
            <div className="flex" style={{ gap: "1px" }}>
              {([
                { value: "default" as FontSize, size: 11 },
                { value: "large" as FontSize, size: 14 },
                { value: "larger" as FontSize, size: 17 },
              ]).map((f, i, arr) => (
                <button
                  key={f.value}
                  onClick={() => setFontSize(f.value)}
                  className="theme-transition cursor-pointer flex items-center justify-center"
                  style={{
                    fontFamily: "var(--font-reading)",
                    fontSize: `${f.size}px`,
                    fontWeight: 600,
                    width: "32px",
                    height: "28px",
                    backgroundColor:
                      fontSize === f.value
                        ? "var(--color-gold)"
                        : "var(--color-bg-secondary)",
                    color:
                      fontSize === f.value
                        ? "var(--color-navy)"
                        : "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                    borderRight:
                      i < arr.length - 1
                        ? "none"
                        : "1px solid var(--color-border)",
                    borderRadius:
                      i === 0
                        ? "9999px 0 0 9999px"
                        : i === arr.length - 1
                          ? "0 9999px 9999px 0"
                          : "0",
                  }}
                >
                  A
                </button>
              ))}
            </div>
          </div>

          <ControlDivider />

          {/* Line spacing */}
          <div className="flex items-center gap-1.5">
            <ControlLabel>Spacing</ControlLabel>
            <SegmentedControl<LineSpacing>
              value={lineSpacing}
              onChange={setLineSpacing}
              options={[
                { value: "default", label: "—" },
                { value: "relaxed", label: "=" },
                { value: "spacious", label: "≡" },
              ]}
            />
          </div>
        </div>

        {/* ── Reading surface ──────────────────────────────────── */}
        <div
          ref={surfaceRef}
          className={`theme-transition rounded-md overflow-hidden ${lineClass}`.trim()}
          style={{
            border: "1px solid var(--color-border)",
            position: "relative",
          }}
          {...(publication ? { "data-publication": "" } : {})}
          {...(isDwellActive ? { "data-dwell-active": "" } : {})}
          {...(mode !== "normal" ? { "data-mode": mode } : {})}
        >
          {/* Exit Present — shown only in present mode */}
          {mode === "present" && (
            <div style={{ padding: "8px 16px", textAlign: "right" }}>
              <button
                onClick={() => setMode("normal")}
                className="theme-transition cursor-pointer px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  fontFamily: "var(--font-ui)",
                  backgroundColor: "var(--color-bg-secondary)",
                  color: "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                Exit Present
              </button>
            </div>
          )}

          {/* Scroll position indicator (full-width for showcase) */}
          <div
            className="scroll-indicator"
            style={{
              position: "relative",
              insetBlockStart: 0,
              width: "100%",
            }}
          />

          <article
            className={`reader-content ${texture ? "reader-texture" : ""}`}
            style={{
              backgroundColor: sahrdayaWarmth > 0
                ? `color-mix(in srgb, var(--color-gold) ${Math.round(sahrdayaWarmth * 100)}%, var(--color-bg))`
                : "var(--color-bg)",
              padding: "clamp(24px, 5vw, 48px)",
              fontSize: articleFontSize,
              lineHeight: 1.8,
              transition: "background-color 1200ms var(--easing-contemplative)",
            }}
          >
            <div style={{ maxWidth: "42em", margin: "0 auto" }}>
              {/* Chapter label */}
              <div
                className="small-caps"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "11px",
                  color: publication
                    ? "var(--color-crimson)"
                    : "var(--color-text-secondary)",
                  textAlign: "center",
                  letterSpacing: "0.1em",
                  marginBottom: "4px",
                  transition:
                    "color var(--motion-content) var(--easing-standard)",
                }}
              >
                Chapter 12
              </div>

              {/* Chapter title */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(22px, 4vw, 28px)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: publication
                    ? "var(--color-crimson)"
                    : "var(--color-text)",
                  textAlign: "center",
                  marginBottom: "32px",
                  transition:
                    "color var(--motion-content) var(--easing-standard)",
                }}
              >
                Years in My Master&rsquo;s Hermitage
              </h3>

              {/* Paragraph 1 — with drop cap */}
              <Paragraph
                index={0}
                dwellIndex={dwellIndex}
                kbFocus={kbFocus}
                onDwell={toggleDwell}
              >
                <span
                  className="drop-cap"
                  style={{
                    color: publication
                      ? "var(--color-crimson)"
                      : "var(--color-text)",
                    opacity: publication ? 0.4 : 1,
                    transition:
                      "color var(--motion-content) var(--easing-standard)",
                  }}
                >
                  I
                </span>
                beheld a transformed Sri Yukteswar. No longer the familiar
                figure in an ascetic&rsquo;s garb &mdash; my guru was now
                resplendent in robes of dazzling light. His countenance was
                bright with the ineffable glory of cosmic consciousness.
              </Paragraph>

              {/* Scene break — swelled rule, crimson in publication */}
              <hr className="reader-scene-break" />

              {/* Paragraph 2 — golden thread passage */}
              <Paragraph
                index={1}
                dwellIndex={dwellIndex}
                kbFocus={kbFocus}
                onDwell={toggleDwell}
                className={goldenThread ? "golden-thread-passage" : ""}
              >
                &ldquo;Master, I will be your disciple and will serve you
                faithfully,&rdquo; I vowed. &ldquo;Let me stay at your
                hermitage.&rdquo; He gazed at me in the benign manner that
                always quieted my turbulent emotions.
              </Paragraph>

              {/* Epigraph — uses real .reader-epigraph CSS class */}
              <div className="reader-epigraph">
                If you want to be sad, no one in the world can make you
                happy. But if you make up your mind to be happy, no one
                and nothing on earth can take that happiness from you.
              </div>

              {/* Verse */}
              <div className="reader-verse">
                God is simple. Everything else is complex.{"\n"}
                Do not seek absolute values in the relative world of nature.
              </div>

              {/* Citation */}
              <div
                className="reader-citation"
                style={{ textAlign: "center" }}
              >
                Paramahansa Yogananda
              </div>

              {/* Motif breathing mark */}
              <div
                className="motif motif-lotus-03 motif-breath"
                aria-hidden="true"
              />

              {/* Paragraph 3 — with footnote reference */}
              <Paragraph
                index={2}
                dwellIndex={dwellIndex}
                kbFocus={kbFocus}
                onDwell={toggleDwell}
              >
                Be as simple as you can be; you will be astonished to see
                how uncomplicated and happy your life can become.
                <span className="footnote-ref">
                  <a href="#fn1" role="doc-noteref" aria-label="Footnote 1">
                    1
                  </a>
                </span>{" "}
                Live quietly in the moment and see the beauty of all
                before you. The future will take care of itself.
              </Paragraph>

              {/* Close motif — shifts to crimson in publication */}
              <div
                className="motif motif-lotus-03 motif-close"
                aria-hidden="true"
              />

              {/* Chapter notes — footnote apparatus */}
              <section
                className="chapter-notes"
                role="doc-endnotes"
                aria-label="Chapter notes"
              >
                <div
                  id="fn1"
                  style={{
                    fontFamily: "var(--font-reading)",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <a
                    href="#fn1"
                    className="footnote-backlink"
                    role="doc-backlink"
                    aria-label="Back to text"
                  >
                    &uarr;
                  </a>{" "}
                  From a talk given at Self-Realization Fellowship
                  international headquarters, Los Angeles, 1949. See also{" "}
                  <em>Journey to Self-Realization</em>, Chapter 7.
                </div>
              </section>
            </div>
          </article>

          {/* ── Golden Thread Panel ──────────────────────────── */}
          {dwellIndex === 1 && goldenThread && (
            <aside
              className="thread-panel-fade"
              style={{
                position: "absolute",
                insetBlockStart: 0,
                insetInlineEnd: 0,
                width: "min(280px, 40%)",
                height: "100%",
                backgroundColor: "var(--color-bg-secondary)",
                borderInlineStart: "1px solid var(--color-border)",
                padding: "24px 16px",
                overflowY: "auto",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "10px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-gold)",
                  marginBottom: "12px",
                }}
              >
                Following the Thread
              </div>
              {[
                {
                  title: "Chapter 1: My Parents and Early Life",
                  excerpt:
                    "“The characteristic features of Indian culture have long been a search for ultimate verities and the concomitant disciple-guru relationship.”",
                },
                {
                  title: "Chapter 24: I Become a Monk",
                  excerpt:
                    "“Master, I will serve you always!” I vowed anew at his lotus feet.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    marginBottom: "16px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--color-text)",
                      marginBottom: "4px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="reading-text"
                    style={{
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {item.excerpt}
                  </div>
                </div>
              ))}
              <button
                onClick={() => setDwellIndex(null)}
                className="theme-transition cursor-pointer text-xs"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-gold)",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
              >
                Close thread &rarr;
              </button>
            </aside>
          )}

          {/* ── Quiet mode overlay ──────────────────────────── */}
          {mode === "quiet" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div
                  className="display-text"
                  style={{
                    fontSize: "20px",
                    color: "var(--color-gold)",
                    marginBottom: "8px",
                  }}
                >
                  Pause with this
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-reading)",
                    fontSize: "15px",
                    color: "var(--color-text-secondary)",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                    marginBottom: "16px",
                    maxWidth: "280px",
                  }}
                >
                  The text fades to a whisper. Space for reflection outside
                  the reading flow.
                </div>
                <button
                  onClick={() => setMode("normal")}
                  className="theme-transition cursor-pointer px-4 py-2 rounded-full text-xs font-semibold"
                  style={{
                    fontFamily: "var(--font-ui)",
                    backgroundColor: "var(--color-bg-secondary)",
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  Return to reading
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Feature legend ────────────────────────────────── */}
        <div
          className={mode === "present" || mode === "focus" ? "hidden" : "grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4"}
        >
          {[
            {
              label: "Dwell",
              desc: "Click paragraph to focus. Others dim to 0.15 opacity.",
            },
            {
              label: "Golden Thread",
              desc: "Inset gold margin. Dwell on it to open the thread panel.",
            },
            {
              label: "Keyboard Nav",
              desc: "j/k paragraphs, d dwell, f focus, Esc reset. Try it.",
            },
            {
              label: "Scene Break",
              desc: "Swelled rule. Crimson in publication context.",
            },
            {
              label: "Paper Texture",
              desc: "SVG fractalNoise at texture opacity (0.03).",
            },
            {
              label: "Drop Cap",
              desc: "Crimson at decorative opacity in publication.",
            },
            {
              label: "Verse",
              desc: "Centered, italic, pre-line. The guru’s poetry.",
            },
            {
              label: "Focus Mode",
              desc: "Suppresses chrome. Only the reading column remains.",
            },
            {
              label: "Present Mode",
              desc: "Group reading. Text scales 24px → 36px across breakpoints.",
            },
            {
              label: "Quiet Mode",
              desc: "Article fades to a whisper. Space for contemplation.",
            },
            {
              label: "Thread Panel",
              desc: "Cross-chapter connections slide in when dwelling on a threaded passage.",
            },
            {
              label: "Epigraph",
              desc: "Decorative gold quotation mark. Centered italic at light weight.",
            },
            {
              label: "Sahṛdaya Warmth",
              desc: "Dwell accumulates gold warmth. The prepared reader receives comfort.",
            },
          ].map((f) => (
            <div
              key={f.label}
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
                {f.label}
              </div>
              <div
                className="text-xs"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.4,
                }}
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Paragraph wrapper ─────────────────────────────────────────── */

function Paragraph({
  index,
  dwellIndex,
  kbFocus,
  onDwell,
  className,
  children,
}: {
  index: number;
  dwellIndex: number | null;
  kbFocus: number | null;
  onDwell: (i: number) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const isTarget = dwellIndex === index;
  const isDwellActive = dwellIndex !== null;
  const isKbFocused = kbFocus === index;

  return (
    <div
      data-paragraph=""
      {...(isTarget ? { "data-dwell-target": "" } : {})}
      onClick={() => onDwell(index)}
      className={`reading-text ${isKbFocused ? "kb-focus" : ""} ${className ?? ""}`.trim()}
      style={{
        color: "var(--color-text)",
        fontSize: "inherit",
        marginBottom: "1.5em",
        cursor: isDwellActive ? "pointer" : "default",
        borderRadius: "var(--radius-default)",
      }}
    >
      {children}
    </div>
  );
}

/* ── Shared control components ─────────────────────────────────── */

function ToggleButton({
  active,
  onClick,
  activeColor,
  activeTextColor,
  children,
}: {
  active: boolean;
  onClick: () => void;
  activeColor?: string;
  activeTextColor?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer px-3 py-1.5 rounded-full text-xs theme-transition"
      style={{
        fontFamily: "var(--font-ui)",
        fontWeight: 600,
        backgroundColor: active
          ? activeColor ?? "var(--color-gold)"
          : "var(--color-bg-secondary)",
        color: active
          ? activeTextColor ?? "var(--color-navy)"
          : "var(--color-text-secondary)",
        border: `1px solid ${active ? activeColor ?? "var(--color-gold)" : "var(--color-border)"}`,
      }}
    >
      {children}
    </button>
  );
}

function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex" style={{ gap: "1px" }}>
      {options.map((opt, i, arr) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="theme-transition px-2.5 py-1 text-xs font-semibold cursor-pointer"
          style={{
            fontFamily: "var(--font-ui)",
            backgroundColor:
              value === opt.value
                ? "var(--color-gold)"
                : "var(--color-bg-secondary)",
            color:
              value === opt.value
                ? "var(--color-navy)"
                : "var(--color-text-secondary)",
            border: "1px solid var(--color-border)",
            borderRight:
              i < arr.length - 1
                ? "none"
                : "1px solid var(--color-border)",
            borderRadius:
              i === 0
                ? "9999px 0 0 9999px"
                : i === arr.length - 1
                  ? "0 9999px 9999px 0"
                  : "0",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ControlLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-ui)",
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "var(--color-text-secondary)",
      }}
    >
      {children}
    </span>
  );
}

function ControlDivider() {
  return (
    <div
      style={{
        width: "1px",
        alignSelf: "stretch",
        background: "var(--color-border)",
      }}
    />
  );
}
