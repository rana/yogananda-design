"use client";

import { useState, useEffect } from "react";
import { useDesign } from "./DesignProvider";
import ThemeSwitcher from "./ThemeSwitcher";

const sections = [
  { id: "themes", label: "Themes" },
  { id: "motifs", label: "Motifs" },
  { id: "typography", label: "Type" },
  { id: "registers", label: "Registers" },
  { id: "voices", label: "Voices" },
  { id: "gradient", label: "Gradient" },
  { id: "reading", label: "Reading" },
  { id: "rasa", label: "Rasa" },
  { id: "commentary", label: "Commentary" },
  { id: "theory", label: "Theory" },
  { id: "transitions", label: "Transitions" },
  { id: "calm", label: "Calm" },
  { id: "accessibility", label: "A11y" },
  { id: "print", label: "Print" },
  { id: "patterns", label: "Patterns" },
];

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

          {/* Section links — hidden below xl */}
          <div className="hidden xl:flex gap-1 shrink-0">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="theme-transition px-1.5 py-1 rounded text-xs whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: activeSection === s.id ? 600 : 400,
                  color:
                    activeSection === s.id
                      ? "var(--color-gold)"
                      : "var(--color-text-secondary)",
                }}
              >
                {s.label}
              </a>
            ))}
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
