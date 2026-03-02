"use client";

import { useState, useEffect } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const sections = [
  { id: "themes", label: "Themes" },
  { id: "registers", label: "Registers" },
  { id: "gradient", label: "Gradient" },
  { id: "typography", label: "Typography" },
  { id: "calm", label: "Calm Tech" },
  { id: "transitions", label: "Transitions" },
  { id: "patterns", label: "Patterns" },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState("");

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
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lotus.svg" alt="" className="h-5 w-auto" />
            <span
              className="font-semibold text-sm hidden sm:inline"
              style={{ fontFamily: "var(--font-ui)", color: "var(--color-text)" }}
            >
              Design Languages
            </span>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto">
            <div className="hidden md:flex gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="theme-transition px-2 py-1 rounded text-xs"
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
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
