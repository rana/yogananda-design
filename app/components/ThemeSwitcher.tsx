"use client";

import { useState, useEffect } from "react";

const themes = [
  { id: "light", label: "Light", desc: "A warm library in daylight" },
  { id: "sepia", label: "Sepia", desc: "Antique paper, physical book" },
  { id: "earth", label: "Earth", desc: "YSS-inspired warm clay" },
  { id: "dark", label: "Dark", desc: "Deep navy evening reading" },
  { id: "meditate", label: "Meditate", desc: "Pre-dawn contemplation" },
] as const;

export default function ThemeSwitcher() {
  const [active, setActive] = useState<string>("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", active);
  }, [active]);

  return (
    <div className="flex gap-2 flex-wrap">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setActive(t.id)}
          className="theme-transition px-3 py-1.5 rounded-full text-sm cursor-pointer"
          style={{
            fontFamily: "var(--font-ui)",
            backgroundColor:
              active === t.id
                ? "var(--color-gold)"
                : "var(--color-bg-secondary)",
            color:
              active === t.id ? "var(--color-navy)" : "var(--color-text)",
            border: `1px solid ${active === t.id ? "var(--color-gold)" : "var(--color-border)"}`,
            fontWeight: active === t.id ? 600 : 400,
          }}
          title={t.desc}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
