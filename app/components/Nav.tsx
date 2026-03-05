"use client";

import { useState, useEffect } from "react";
import { useDesign } from "./DesignProvider";
import ThemeSwitcher from "./ThemeSwitcher";

/* Three movements: Foundations (vocabulary) → Expression (practice) → Structure (reference) */
type Movement = "foundations" | "expression" | "structure";

const sections: { id: string; label: string; movement: Movement }[] = [
  /* Movement I: Foundations — the vocabulary */
  { id: "themes", label: "Themes", movement: "foundations" },
  { id: "motifs", label: "Motifs", movement: "foundations" },
  { id: "typography", label: "Type", movement: "foundations" },
  { id: "multi-script", label: "Scripts", movement: "foundations" },
  /* Movement II: Expression — the practice */
  { id: "registers", label: "Registers", movement: "expression" },
  { id: "media-registers", label: "Media", movement: "expression" },
  { id: "voices", label: "Voices", movement: "expression" },
  { id: "gradient", label: "Gradient", movement: "expression" },
  { id: "reading", label: "Reading", movement: "expression" },
  { id: "rasa", label: "Rasa", movement: "expression" },
  { id: "commentary", label: "Commentary", movement: "expression" },
  /* Movement III: Structure — the reference */
  { id: "theory", label: "Theory", movement: "structure" },
  { id: "transitions", label: "Transitions", movement: "structure" },
  { id: "responsive", label: "Responsive", movement: "structure" },
  { id: "calm", label: "Calm", movement: "structure" },
  { id: "accessibility", label: "A11y", movement: "structure" },
  { id: "print", label: "Print", movement: "structure" },
  { id: "operations", label: "Ops", movement: "structure" },
  { id: "patterns", label: "Patterns", movement: "structure" },
];

const movementLabels: Record<Movement, string> = {
  foundations: "I",
  expression: "II",
  structure: "III",
};

export default function Nav() {
  const [activeSection, setActiveSection] = useState("");
  const { org, setOrg } = useDesign();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="theme-transition sticky top-0 z-10 backdrop-blur-md"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-bg) 85%, transparent)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-12 gap-3">
          {/* Left: logo + org toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lotus.svg" alt="" className="h-5 w-auto" />

            {/* Org toggle — individual rounded buttons to avoid overflow clip */}
            <div className="flex" style={{ gap: "1px" }}>
              <button
                onClick={() => setOrg("srf")}
                className="theme-transition px-3 py-0.5 text-xs font-semibold cursor-pointer rounded-l-full"
                style={{
                  fontFamily: "var(--font-ui)",
                  backgroundColor: org === "srf" ? "var(--color-gold)" : "var(--color-bg-secondary)",
                  color: org === "srf" ? "var(--color-navy)" : "var(--color-text-secondary)",
                  letterSpacing: "0.05em",
                  border: "1px solid var(--color-border)",
                  borderRight: "none",
                }}
              >
                SRF
              </button>
              <button
                onClick={() => setOrg("yss")}
                className="theme-transition px-3 py-0.5 text-xs font-semibold cursor-pointer rounded-r-full"
                style={{
                  fontFamily: "var(--font-ui)",
                  backgroundColor: org === "yss" ? "var(--color-gold)" : "var(--color-bg-secondary)",
                  color: org === "yss" ? "#fff" : "var(--color-text-secondary)",
                  letterSpacing: "0.05em",
                  border: "1px solid var(--color-border)",
                }}
              >
                YSS
              </button>
            </div>
          </div>

          {/* Section links — hidden below xl, grouped by movement */}
          <div className="hidden xl:flex items-center gap-0.5 shrink-0">
            {sections.map((s, i) => {
              const prevMovement = i > 0 ? sections[i - 1].movement : null;
              const isNewMovement = s.movement !== prevMovement;
              const isActive = activeSection === s.id;
              /* Which movement is the user currently reading? */
              const activeMovement = sections.find(
                (sec) => sec.id === activeSection
              )?.movement;

              return (
                <span key={s.id} className="flex items-center">
                  {/* Movement separator + numeral */}
                  {isNewMovement && (
                    <span
                      className="flex items-center"
                      style={{ marginLeft: i === 0 ? 0 : "6px" }}
                    >
                      {i > 0 && (
                        <span
                          style={{
                            width: "1px",
                            height: "12px",
                            backgroundColor: "var(--color-border)",
                            marginRight: "6px",
                          }}
                        />
                      )}
                      <span
                        className="theme-transition"
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: "9px",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          color:
                            activeMovement === s.movement
                              ? "var(--color-gold)"
                              : "var(--color-text-secondary)",
                          opacity: activeMovement === s.movement ? 1 : 0.5,
                          marginRight: "4px",
                        }}
                      >
                        {movementLabels[s.movement]}
                      </span>
                    </span>
                  )}
                  <a
                    href={`#${s.id}`}
                    className="theme-transition px-1.5 py-1 rounded text-xs whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive
                        ? "var(--color-gold)"
                        : "var(--color-text-secondary)",
                    }}
                  >
                    {s.label}
                  </a>
                </span>
              );
            })}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Theme chips — right-aligned, scrollable */}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
