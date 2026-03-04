"use client";

import { useState } from "react";
import { aestheticTheory } from "@/lib/tokens";

/* ── Principle data derived from the semantic JSON ────────────── */

interface Principle {
  key: string;
  sanskrit: string;
  meaning: string;
  tradition: string;
  designMapping: string;
  evaluationQuestion: string;
  aiGuidance: string;
  existingExpression: string[];
}

function extractPrinciples(): Principle[] {
  const raw = aestheticTheory.principles as unknown as Record<
    string,
    Record<string, unknown>
  >;

  const sanskritNames: Record<string, string> = {
    dhvani: "Dhvani",
    aucitya: "Aucitya",
    rasa: "Rasa",
    bindu: "Bindu",
    sahrdaya: "Sahṛdaya",
    prana: "Prāṇa",
    alankara: "Alaṅkāra",
  };

  return Object.entries(raw).map(([key, p]) => ({
    key,
    sanskrit: sanskritNames[key] ?? key,
    meaning: (p.$description as string) ?? "",
    tradition: (p.tradition as string) ?? "",
    designMapping: (p["design-mapping"] as string) ?? "",
    evaluationQuestion: (p["evaluation-question"] as string) ?? "",
    aiGuidance: (p["ai-guidance"] as string) ?? "",
    existingExpression: (p["existing-expression"] as string[]) ?? [],
  }));
}

/* ── Structural isomorphisms ──────────────────────────────────── */

interface Isomorphism {
  key: string;
  label: string;
  mapping: string;
  implication: string;
}

function extractIsomorphisms(): Isomorphism[] {
  const raw = aestheticTheory["structural-isomorphisms"] as unknown as Record<
    string,
    unknown
  >;

  const labels: Record<string, string> = {
    "three-layer-dhvani": "Three Layers ↔ Three Meaning Levels",
    "three-voice-guna": "Three Voices ↔ Three Guṇas",
    "register-commentary": "Five Registers ↔ Commentary Hierarchy",
  };

  return Object.entries(raw)
    .filter(([key]) => key !== "$description")
    .map(([key, value]) => {
      const iso = value as Record<string, string>;
      return {
        key,
        label: labels[key] ?? key,
        mapping: iso.mapping ?? "",
        implication: iso["practical-implication"] ?? "",
      };
    });
}

/* ── Components ───────────────────────────────────────────────── */

function PrincipleCard({
  principle,
  expanded,
  onToggle,
}: {
  principle: Principle;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="theme-transition rounded-md overflow-hidden"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-5 cursor-pointer"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="flex items-baseline gap-3 mb-2">
          <span
            className="display-text"
            style={{
              fontSize: "20px",
              color: "var(--color-gold)",
            }}
          >
            {principle.sanskrit}
          </span>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "12px",
              color: "var(--color-text-secondary)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {principle.key}
          </span>
        </div>
        <div
          className="reading-text"
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--color-text)",
          }}
        >
          {principle.meaning}
        </div>
      </button>

      {expanded && (
        <div
          className="theme-transition px-5 pb-5"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          {/* Tradition */}
          <div className="mb-4">
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              Tradition
            </div>
            <div
              className="text-sm"
              style={{
                fontFamily: "var(--font-reading)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              {principle.tradition}
            </div>
          </div>

          {/* Design Mapping */}
          <div className="mb-4">
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              Design Mapping
            </div>
            <div
              className="text-sm"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-text)",
                lineHeight: 1.6,
              }}
            >
              {principle.designMapping}
            </div>
          </div>

          {/* AI Guidance */}
          <div className="mb-4">
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              AI Guidance
            </div>
            <div
              className="text-sm"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-text)",
                lineHeight: 1.6,
              }}
            >
              {principle.aiGuidance}
            </div>
          </div>

          {/* Existing Expression */}
          {principle.existingExpression.length > 0 && (
            <div className="mb-4">
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-gold)",
                }}
              >
                Existing Expression
              </div>
              <div className="flex flex-wrap gap-1.5">
                {principle.existingExpression.map((expr) => (
                  <span key={expr} className="token-value text-xs">
                    {expr}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Evaluation Question */}
          <div
            className="rounded-md p-3 mt-3"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              Evaluation Question
            </div>
            <div
              className="reading-text"
              style={{
                fontStyle: "italic",
                fontSize: "14px",
                lineHeight: 1.6,
                color: "var(--color-text)",
              }}
            >
              &ldquo;{principle.evaluationQuestion}&rdquo;
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AestheticTheory() {
  const principles = extractPrinciples();
  const isomorphisms = extractIsomorphisms();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  return (
    <section id="theory" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "var(--color-text)",
          }}
        >
          Aesthetic Theory
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
          Seven governing principles from the Indian literary tradition &mdash;
          the same tradition that produced the teachings this design system
          serves. Not metaphor: precision instruments for design reasoning. Each
          principle maps to specific design mechanisms and provides AI designers
          a framework for decisions beyond enumerated rules.
        </p>

        {/* ── Principle cards ──────────────────────────────────── */}
        <div className="space-y-3 mb-8">
          {principles.map((p) => (
            <PrincipleCard
              key={p.key}
              principle={p}
              expanded={expandedKey === p.key}
              onToggle={() =>
                setExpandedKey(expandedKey === p.key ? null : p.key)
              }
            />
          ))}
        </div>

        {/* ── Structural isomorphisms ─────────────────────────── */}
        <div>
          <div className="flex items-baseline gap-2 mb-3">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              Structural Isomorphisms
            </span>
            <span
              className="text-xs"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-text-secondary)",
              }}
            >
              Architecture mirrors tradition &mdash; emerged, not imposed
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {isomorphisms.map((iso) => (
              <div
                key={iso.key}
                className="theme-transition rounded-md p-4"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="font-semibold text-sm mb-2"
                  style={{
                    fontFamily: "var(--font-ui)",
                    color: "var(--color-text)",
                  }}
                >
                  {iso.label}
                </div>
                <div
                  className="text-xs mb-2"
                  style={{
                    fontFamily: "var(--font-ui)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {iso.mapping}
                </div>
                <div
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-ui)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                    fontStyle: "italic",
                  }}
                >
                  {iso.implication}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
