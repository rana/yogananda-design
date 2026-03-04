"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export type Org = "srf" | "yss";
export type ThemeName =
  | "light"
  | "sepia"
  | "earth"
  | "dark"
  | "meditate"
  | "gathering"
  | "ashram"
  | "sandstone"
  | "night"
  | "devotion";

interface DesignContextType {
  org: Org;
  theme: ThemeName;
  setOrg: (org: Org) => void;
  setTheme: (theme: ThemeName) => void;
  availableThemes: ThemeName[];
}

const DesignContext = createContext<DesignContextType>({
  org: "srf",
  theme: "light",
  setOrg: () => {},
  setTheme: () => {},
  availableThemes: [],
});

export function useDesign() {
  return useContext(DesignContext);
}

export const orgThemes: Record<Org, ThemeName[]> = {
  srf: ["light", "sepia", "earth", "dark", "meditate", "gathering"],
  yss: ["ashram", "sandstone", "earth", "night", "devotion"],
};

const defaultTheme: Record<Org, ThemeName> = {
  srf: "light",
  yss: "ashram",
};

// Maps themes between orgs: [srfTheme, yssTheme]
const themeEquivalents: [ThemeName, ThemeName][] = [
  ["light", "ashram"],
  ["sepia", "sandstone"],
  ["dark", "night"],
  ["meditate", "devotion"],
];

function mapTheme(currentTheme: ThemeName, toOrg: Org): ThemeName {
  // "earth" exists in both orgs
  if (orgThemes[toOrg].includes(currentTheme)) return currentTheme;
  for (const [srf, yss] of themeEquivalents) {
    if (currentTheme === srf && toOrg === "yss") return yss;
    if (currentTheme === yss && toOrg === "srf") return srf;
  }
  return defaultTheme[toOrg];
}

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const [org, setOrgState] = useState<Org>("srf");
  const [theme, setThemeState] = useState<ThemeName>("light");

  const setTheme = useCallback((t: ThemeName) => {
    const apply = () => {
      setThemeState(t);
      document.documentElement.dataset.theme = t;
    };
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => ViewTransition;
    };
    if (doc.startViewTransition) {
      doc.startViewTransition(apply);
    } else {
      apply();
    }
  }, []);

  const setOrg = useCallback(
    (newOrg: Org) => {
      const apply = () => {
        setOrgState(newOrg);
        document.documentElement.dataset.org = newOrg;
        // Map current theme to the equivalent in the new org
        setThemeState((prev) => {
          const mapped = mapTheme(prev, newOrg);
          document.documentElement.dataset.theme = mapped;
          return mapped;
        });
      };
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => ViewTransition;
      };
      if (doc.startViewTransition) {
        doc.startViewTransition(apply);
      } else {
        apply();
      }
    },
    []
  );

  // Set initial DOM attributes
  useEffect(() => {
    document.documentElement.dataset.org = org;
    document.documentElement.dataset.theme = theme;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DesignContext.Provider
      value={{
        org,
        theme,
        setOrg,
        setTheme,
        availableThemes: orgThemes[org],
      }}
    >
      {children}
    </DesignContext.Provider>
  );
}
