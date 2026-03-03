"use client";

import { useDesign, orgThemes } from "./DesignProvider";
import type { ThemeName } from "./DesignProvider";

const themeLabels: Record<ThemeName, { label: string; desc: string }> = {
  // SRF
  light:     { label: "Light",     desc: "A warm library in daylight" },
  sepia:     { label: "Sepia",     desc: "Antique paper, physical book" },
  earth:     { label: "Earth",     desc: "Warm clay, immersive reading" },
  dark:      { label: "Dark",      desc: "Deep navy evening reading" },
  meditate:  { label: "Meditate",  desc: "Pre-dawn contemplation" },
  gathering: { label: "Gathering", desc: "The communal voice — events" },
  // YSS
  ashram:    { label: "Ashram",    desc: "The sunlit courtyard" },
  sandstone: { label: "Sandstone", desc: "Prayer hall lamplight" },
  night:     { label: "Night",     desc: "The evening aarti" },
  devotion:  { label: "Devotion",  desc: "The inner sanctum" },
};

export default function ThemeSwitcher() {
  const { org, theme, setTheme, availableThemes } = useDesign();

  // For SRF, separate contemplative from communal (gathering)
  const isSrf = org === "srf";
  const mainThemes = isSrf ? availableThemes.filter((t) => t !== "gathering") : availableThemes;
  const communalThemes = isSrf ? availableThemes.filter((t) => t === "gathering") : [];

  return (
    <div className="flex gap-1 items-center flex-nowrap shrink-0">
      {mainThemes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className="theme-transition px-2 py-0.5 rounded-full cursor-pointer whitespace-nowrap"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "11px",
            backgroundColor:
              theme === t ? "var(--color-gold)" : "var(--color-bg-secondary)",
            color:
              theme === t
                ? isSrf ? "var(--color-navy)" : "#fff"
                : "var(--color-text)",
            border: `1px solid ${theme === t ? "var(--color-gold)" : "var(--color-border)"}`,
            fontWeight: theme === t ? 600 : 400,
          }}
          title={themeLabels[t]?.desc}
        >
          {themeLabels[t]?.label ?? t}
        </button>
      ))}
      {communalThemes.length > 0 && (
        <>
          <div
            className="theme-transition"
            style={{
              width: "1px",
              height: "14px",
              background: "var(--color-border)",
              margin: "0 1px",
            }}
          />
          {communalThemes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className="theme-transition px-2 py-0.5 rounded-full cursor-pointer whitespace-nowrap"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                backgroundColor:
                  theme === t ? "#DC6A10" : "var(--color-bg-secondary)",
                color: theme === t ? "#FFFFFF" : "var(--color-text)",
                border: `1px solid ${theme === t ? "#DC6A10" : "var(--color-border)"}`,
                fontWeight: theme === t ? 600 : 400,
              }}
              title={themeLabels[t]?.desc}
            >
              {themeLabels[t]?.label ?? t}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
