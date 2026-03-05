"use client";

import { useState } from "react";

/* ══════════════════════════════════════════════════════════════════
   Stewardship — Operational Surface Vocabulary Showcase
   ══════════════════════════════════════════════════════════════════
   Demonstrates the stewardship design vocabulary from
   stewardship.css: system tone modulation, status indicators,
   tone-triggered gradient borders, data typography, density
   modulation, temporal dhvani, and narrative-as-bindu.

   The operator is a steward — tending the digital garden that
   carries Yogananda's words to seekers. The surface breathes
   with system health through gold-only escalation.
   ══════════════════════════════════════════════════════════════════ */

type Tone = "aligned" | "attention" | "concern" | "failure";

const toneDescriptions: Record<Tone, { label: string; description: string }> = {
  aligned: {
    label: "Aligned",
    description:
      "The garden grows. Gold at subliminal (0.06) — barely there. Peace needs no announcement.",
  },
  attention: {
    label: "Attention",
    description:
      "Something has shifted. Gold at ambient (0.3) — gently present. The operator notices.",
  },
  concern: {
    label: "Concern",
    description:
      "This needs tending. Gold at decorative (0.4) — clearly present. Gradient border appears.",
  },
  failure: {
    label: "Failure",
    description:
      "Act now. Gold at interactive (1.0) — unmistakable. Gradient border at full intensity.",
  },
};

const narratives: Record<Tone, string> = {
  aligned:
    "All systems aligned. The teachings portal is serving seekers from 14 countries today. Design system v1.1.0 deployed across all surfaces. Neon database healthy, Vercel edge warm, Cloudflare cache hit rate at 94%.",
  attention:
    "Font subsetting job queued longer than expected. No seeker impact yet — monitoring. The CSS bundle size increased 2% after the latest motif additions. Consider reviewing unused selectors.",
  concern:
    "Neon database connection pool at 80% capacity. Read replicas warming. The teachings portal response times have increased from 120ms to 340ms in the Asia-Pacific region. Consider scaling before the next batch ingest.",
  failure:
    "Vercel deployment failed: build error in the typography layer. Rollback to previous deployment active. Production serving from CDN cache — seekers are unaffected, but new content cannot deploy until resolved.",
};

/* ── Mock project data ────────────────────────────────────────── */

const projects = [
  {
    name: "yogananda-teachings",
    description: "The reading room",
    devCommit: "e4f2a91",
    prdCommit: "9747117",
    lastDeploy: "2m ago",
  },
  {
    name: "yogananda-platform",
    description: "Infrastructure dashboard",
    devCommit: "a3e8f21",
    prdCommit: "a3e8f21",
    lastDeploy: "18m ago",
  },
  {
    name: "yogananda-design",
    description: "Design language",
    devCommit: "b264d60",
    prdCommit: "b264d60",
    lastDeploy: "3h ago",
  },
];

const deploys = [
  { project: "yogananda-teachings", commit: "9747117", message: "Add gold version of SRF logo", time: "2m ago", age: "recent" as const },
  { project: "yogananda-platform", commit: "a3e8f21", message: "Update Neon branch config", time: "18m ago", age: "recent" as const },
  { project: "yogananda-teachings", commit: "2336181", message: "Add CSS classes for lotus-13-16", time: "1h ago", age: "today" as const },
  { project: "yogananda-design", commit: "b264d60", message: "Bump version to 1.1.0", time: "3h ago", age: "today" as const },
  { project: "yogananda-teachings", commit: "fbe5f4e", message: "Include fonts/ in package files", time: "5h ago", age: "older" as const },
];

/* ── Tone Demonstration ──────────────────────────────────────── */

function ToneDemo({ tone }: { tone: Tone }) {
  return (
    <div
      className="theme-transition rounded-md overflow-hidden"
      style={{ border: "1px solid var(--color-border)" }}
      data-tone={tone}
    >
      {/* Narrative briefing — the bindu */}
      <div
        className="p-5"
        style={{ backgroundColor: "var(--color-bg)" }}
        data-register="instructional"
      >
        <div className="stewardship-narrative">
          <p>{narratives[tone]}</p>
        </div>
      </div>

      {/* Summary stats — near orbit */}
      <div
        className="flex gap-6 p-4 flex-wrap"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {[
          { label: "Projects", value: "3" },
          { label: "Environments", value: "6" },
          { label: "In Sync", value: tone === "aligned" ? "3/3" : tone === "attention" ? "2/3" : "1/3" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="data-label">{stat.label}</span>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "1.25rem",
                fontWeight: "var(--tone-weight, 400)" as unknown as number,
                color: "var(--color-text)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Project cards — middle orbit */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4"
        style={{ backgroundColor: "var(--color-bg)" }}
        data-density="compact"
      >
        {projects.map((p, i) => {
          // First project reflects the active tone; others stay aligned
          const cardTone = i === 0 ? tone : "aligned";
          return (
            <div
              key={p.name}
              className="tone-border p-3"
              data-tone={cardTone}
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                borderRadius: "var(--radius-default)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="status-indicator" aria-hidden="true" />
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--color-text)",
                  }}
                >
                  {p.name.replace("yogananda-", "")}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="data-text" style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                  {p.devCommit === p.prdCommit ? "in sync" : `dev ${p.devCommit}`}
                </span>
                <span className="data-text" style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                  {p.lastDeploy}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deploy timeline with temporal dhvani — far orbit */}
      <div
        className="p-4"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          borderTop: "1px solid var(--color-border)",
        }}
        data-density="compact"
      >
        <span className="data-label" style={{ display: "block", marginBottom: "var(--space-compact)" }}>
          Recent Deploys
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-tight)" }}>
          {deploys.map((d) => (
            <div
              key={`${d.commit}-${d.time}`}
              className="flex items-baseline gap-3"
              data-age={d.age}
            >
              <span className="data-text" style={{ fontSize: "0.75rem", minWidth: "5ch" }}>
                {d.commit}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {d.message}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.6875rem",
                  color: "var(--color-text-secondary)",
                  flexShrink: 0,
                }}
              >
                {d.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Vocabulary Reference ─────────────────────────────────────── */

function VocabularyReference() {
  return (
    <div
      className="theme-transition rounded-md p-5"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h3
        className="data-label mb-4"
        style={{ color: "var(--color-gold)" }}
      >
        Vocabulary
      </h3>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}
      >
        <div>
          <div className="data-label" style={{ marginBottom: "var(--space-tight)" }}>Data Attributes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <code className="data-text" style={{ fontSize: "0.75rem" }}>data-tone=&quot;aligned | attention | concern | failure&quot;</code>
            <code className="data-text" style={{ fontSize: "0.75rem" }}>data-density=&quot;compact | comfortable&quot;</code>
            <code className="data-text" style={{ fontSize: "0.75rem" }}>data-age=&quot;recent | today | older&quot;</code>
          </div>
        </div>
        <div>
          <div className="data-label" style={{ marginBottom: "var(--space-tight)" }}>CSS Classes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <code className="data-text" style={{ fontSize: "0.75rem" }}>.status-indicator .status-label</code>
            <code className="data-text" style={{ fontSize: "0.75rem" }}>.tone-border</code>
            <code className="data-text" style={{ fontSize: "0.75rem" }}>.data-text .data-text-emphasis .data-label</code>
            <code className="data-text" style={{ fontSize: "0.75rem" }}>.stewardship-narrative</code>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Export ──────────────────────────────────────────────── */

export default function Stewardship() {
  const [tone, setTone] = useState<Tone>("aligned");

  return (
    <section id="stewardship" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "var(--color-text)",
          }}
        >
          Stewardship
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
          The operator tends the digital garden that carries the teachings
          to seekers. System tone modulates the entire surface through
          gold-only escalation &mdash; the same attention gradient that
          governs reading surfaces, applied to operational awareness. The
          narrative briefing is the bindu; everything else orbits it.
        </p>

        {/* Tone selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["aligned", "attention", "concern", "failure"] as Tone[]).map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className="theme-transition px-3 py-1.5 rounded cursor-pointer"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.8125rem",
                backgroundColor:
                  tone === t ? "var(--color-gold)" : "var(--color-bg-secondary)",
                color:
                  tone === t ? "var(--color-navy)" : "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
                fontWeight: tone === t ? 600 : 400,
                opacity: tone === t ? 1 : 0.8,
                minHeight: "var(--touch-target-min)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {toneDescriptions[t].label}
            </button>
          ))}
        </div>

        {/* Tone description */}
        <p
          className="mb-6"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.8125rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
            maxWidth: "50ch",
          }}
        >
          {toneDescriptions[tone].description}
        </p>

        {/* Primary demonstration — tone modulation */}
        <div className="mb-6">
          <ToneDemo tone={tone} />
        </div>

        {/* Vocabulary reference */}
        <VocabularyReference />
      </div>
    </section>
  );
}
