"use client";

import { useState } from "react";

/* ══════════════════════════════════════════════════════════════════
   Operational Surface — Infrastructure Patterns Showcase
   ══════════════════════════════════════════════════════════════════
   Demonstrates the five operational molecules from operations.css:
   status indicators, chain visualization, deploy timeline,
   cost bars, and narrative blocks.

   The same design language that holds Yogananda's words also holds
   the systems that serve them. Not a different voice — the
   contemplative voice at its functional register, with monospace
   precision where data demands it.
   ══════════════════════════════════════════════════════════════════ */

/* ── Mock Data ───────────────────────────────────────────────── */

const deployments = [
  { project: "yogananda-teachings", commit: "9747117", message: "Add gold version of SRF logo", time: "2m ago", env: "prd", status: "aligned" as const },
  { project: "yogananda-platform", commit: "a3e8f21", message: "Update Neon branch config", time: "18m ago", env: "prd", status: "aligned" as const },
  { project: "yogananda-teachings", commit: "2336181", message: "Add CSS classes for lotus-13–16", time: "1h ago", env: "prd", status: "aligned" as const },
  { project: "yogananda-design", commit: "b264d60", message: "Bump version to 1.1.0", time: "3h ago", env: "prd", status: "aligned" as const },
  { project: "yogananda-teachings", commit: "fbe5f4e", message: "Include fonts/ in package files", time: "5h ago", env: "prd", status: "attention" as const },
];

const costs = [
  { service: "Neon (database)", amount: "$4.20", pct: 35 },
  { service: "Vercel (hosting)", amount: "$0.00", pct: 0 },
  { service: "Contentful (CMS)", amount: "$0.00", pct: 0 },
  { service: "AWS Bedrock (AI)", amount: "$2.80", pct: 23 },
  { service: "Cloudflare (CDN)", amount: "$0.00", pct: 0 },
];

const chainEnvs = [
  { name: "dev", commit: "e4f2a91", status: "aligned" as const },
  { name: "prd", commit: "9747117", status: "aligned" as const },
];

type Status = "aligned" | "attention" | "concern" | "failure";

const statusLabels: Record<Status, string> = {
  aligned: "Aligned",
  attention: "Attention",
  concern: "Concern",
  failure: "Failure",
};

/* ── Sub-components ──────────────────────────────────────────── */

function StatusIndicators() {
  const statuses: Status[] = ["aligned", "attention", "concern", "failure"];

  return (
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
        Status Indicators
      </h3>
      <p
        className="text-xs mb-4"
        style={{
          fontFamily: "var(--font-ui)",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
          maxWidth: "50ch",
        }}
      >
        Mapped to the attention gradient. Gold for awareness, crimson for action.
        Most states suggest rather than declare.
      </p>
      <div className="flex gap-6 flex-wrap">
        {statuses.map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span className="status-dot" data-status={s} />
            <span className="status-label">{statusLabels[s]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChainVisualization() {
  return (
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
        Promotion Chain
      </h3>
      <p
        className="text-xs mb-5"
        style={{
          fontFamily: "var(--font-ui)",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
          maxWidth: "50ch",
        }}
      >
        Environment promotion flow. Horizontal on desktop, vertical on mobile.
        The connector arrow shows direction of deployment.
      </p>
      <div className="chain">
        {chainEnvs.map((env, i) => (
          <span key={env.name} className="contents">
            <div className="chain-env">
              <span className="chain-env-name">{env.name}</span>
              <span className="chain-env-commit">{env.commit}</span>
              <span
                className="status-dot"
                data-status={env.status}
                style={{ marginTop: "4px" }}
              />
            </div>
            {i < chainEnvs.length - 1 && <div className="chain-connector" />}
          </span>
        ))}
      </div>
    </div>
  );
}

function DeployTimeline() {
  return (
    <div
      className="theme-transition rounded-md overflow-hidden"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div
        className="p-4"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}
        >
          Deploy Timeline
        </h3>
      </div>

      {/* Desktop: grid layout */}
      <div
        className="hidden sm:grid p-4"
        style={{ backgroundColor: "var(--color-bg)" }}
        data-register="functional"
        data-density="compact"
      >
        <div className="deploy-timeline">
          {/* Header row */}
          <span className="deploy-timeline-header">Project</span>
          <span className="deploy-timeline-header">Commit</span>
          <span className="deploy-timeline-header">Message</span>
          <span className="deploy-timeline-header">Env</span>
          <span className="deploy-timeline-header">Time</span>
          <span className="deploy-timeline-header">Status</span>
          {/* Data rows */}
          {deployments.map((d) => (
            <span key={`${d.commit}-${d.time}`} className="contents">
              <span className="deploy-project">{d.project}</span>
              <span className="deploy-commit">{d.commit}</span>
              <span
                className="deploy-commit"
                style={{
                  maxWidth: "24ch",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {d.message}
              </span>
              <span className="deploy-commit">{d.env}</span>
              <span className="deploy-time">{d.time}</span>
              <span className="status-dot" data-status={d.status} />
            </span>
          ))}
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div
        className="sm:hidden flex flex-col gap-2 p-4"
        style={{ backgroundColor: "var(--color-bg)" }}
        data-register="functional"
        data-density="compact"
      >
        {deployments.map((d) => (
          <div key={`${d.commit}-${d.time}-mobile`} className="deploy-card">
            <span className="deploy-project">{d.project}</span>
            <span className="deploy-commit">
              {d.commit} &middot; {d.message}
            </span>
            <span className="deploy-time">{d.time}</span>
            <span className="status-dot" data-status={d.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CostBars() {
  return (
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
        Monthly Costs
      </h3>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "var(--space-compact)" }}
        data-register="functional"
        data-density="compact"
      >
        {costs.map((c) => (
          <div key={c.service} className="cost-row">
            <span
              className="cost-label"
              style={{ color: "var(--color-text)" }}
            >
              {c.service}
            </span>
            <span
              className="cost-label"
              style={{
                color: "var(--color-text-secondary)",
                textAlign: "right",
              }}
            >
              {c.amount}
            </span>
            <div className="cost-bar-track" style={{ minWidth: "80px" }}>
              <div
                className="cost-bar-fill"
                style={{ width: `${c.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NarrativeBlock() {
  return (
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
        Narrative Block
      </h3>
      <div className="narrative" data-register="instructional">
        <p>
          The design system now ships as a git dependency at{" "}
          <code>v1.1.0</code>. The teachings portal consumes{" "}
          <code>css/reading.css</code> for all reading surfaces. The platform
          dashboard consumes <code>css/index.css</code> plus{" "}
          <code>css/patterns/operations.css</code> for its operational chrome.
        </p>
        <p>
          IBM Plex Mono loads only when the operations pattern is imported. The
          teachings portal never downloads these fonts. Two weights ship:
          400 (data) and 500 (emphasis) at ~15KB each, Latin subset only.
        </p>
      </div>
    </div>
  );
}

/* ── Composed Demo ───────────────────────────────────────────── */

function OperationalDemo() {
  const [demoStatus, setDemoStatus] = useState<Status>("aligned");

  return (
    <div
      className="theme-transition rounded-md overflow-hidden"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div
        className="p-4 flex items-center justify-between"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}
        >
          Composed — System Health
        </h3>
        <div className="flex gap-1">
          {(["aligned", "attention", "concern", "failure"] as Status[]).map(
            (s) => (
              <button
                key={s}
                onClick={() => setDemoStatus(s)}
                className="theme-transition px-2 py-1 rounded text-xs cursor-pointer"
                style={{
                  fontFamily: "var(--font-ui)",
                  backgroundColor:
                    demoStatus === s
                      ? "var(--color-gold)"
                      : "var(--color-bg)",
                  color:
                    demoStatus === s
                      ? "var(--color-navy)"
                      : "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                  fontWeight: demoStatus === s ? 600 : 400,
                }}
              >
                {statusLabels[s]}
              </button>
            )
          )}
        </div>
      </div>
      <div
        className="p-6"
        style={{ backgroundColor: "var(--color-bg)" }}
        data-register="functional"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="status-dot" data-status={demoStatus} />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--color-text)",
            }}
          >
            yogananda-teachings
          </span>
          <span className="status-label">{statusLabels[demoStatus]}</span>
        </div>

        <div
          className="chain mb-5"
          style={{ maxWidth: "320px" }}
        >
          <div className="chain-env">
            <span className="chain-env-name">dev</span>
            <span className="chain-env-commit">e4f2a91</span>
          </div>
          <div className="chain-connector" />
          <div className="chain-env">
            <span className="chain-env-name">prd</span>
            <span className="chain-env-commit">9747117</span>
            <span
              className="status-dot"
              data-status={demoStatus}
              style={{ marginTop: "4px" }}
            />
          </div>
        </div>

        {demoStatus !== "aligned" && (
          <div
            className="narrative"
            data-register="instructional"
            style={{ fontSize: "0.875rem" }}
          >
            <p>
              {demoStatus === "attention" &&
                "Font subsetting job queued longer than expected. No user impact yet — monitoring."}
              {demoStatus === "concern" &&
                "Neon database connection pool at 80% capacity. Read replicas warming. Consider scaling before next batch ingest."}
              {demoStatus === "failure" &&
                "Vercel deployment failed: build error in css/patterns/operations.css. Rollback to previous deployment active. Production serving from CDN cache."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Export ──────────────────────────────────────────────── */

export default function OperationalSurface() {
  return (
    <section id="operations" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "var(--color-text)",
          }}
        >
          Operations
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
          The same design language that holds Yogananda&rsquo;s words also holds
          the systems that serve them. Not a different voice &mdash; the
          contemplative voice at its functional register, with monospace
          precision where data demands it. Status maps to the attention
          gradient: gold for awareness, crimson for action.
        </p>

        {/* Individual molecules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <StatusIndicators />
          <ChainVisualization />
        </div>

        <div className="mb-6">
          <DeployTimeline />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CostBars />
          <NarrativeBlock />
        </div>

        {/* Composed demo: all molecules working together */}
        <OperationalDemo />
      </div>
    </section>
  );
}
