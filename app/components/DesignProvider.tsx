"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
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
  const restoringUrl = useRef(false);

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

  // Restore state from URL on mount (?org=yss&theme=night)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlOrg = params.get("org");
    const urlTheme = params.get("theme");
    if (!urlOrg && !urlTheme) return;

    let o: Org = "srf";
    if (urlOrg === "srf" || urlOrg === "yss") o = urlOrg;

    let t: ThemeName = defaultTheme[o];
    if (urlTheme && orgThemes[o].includes(urlTheme as ThemeName)) {
      t = urlTheme as ThemeName;
    }

    // Set DOM immediately to minimize flash before React re-renders
    document.documentElement.dataset.org = o;
    document.documentElement.dataset.theme = t;

    // Mark restoring so the sync effect doesn't clobber the URL
    restoringUrl.current = true;

    setOrgState(o);
    setThemeState(t);
  }, []);

  // Sync state → DOM attributes + URL on every change
  useEffect(() => {
    document.documentElement.dataset.org = org;
    document.documentElement.dataset.theme = theme;

    // On mount, the sync effect fires with initial state before the
    // mount effect's setState takes effect. Skip URL sync to avoid
    // briefly clobbering URL params that are being restored.
    if (restoringUrl.current) {
      // Clear the flag once state matches URL params (restore complete)
      const params = new URLSearchParams(window.location.search);
      if (org === params.get("org") && theme === params.get("theme")) {
        restoringUrl.current = false;
      }
      return;
    }

    const url = new URL(window.location.href);
    if (org === "srf" && theme === "light") {
      // Default state — keep URL clean
      url.searchParams.delete("org");
      url.searchParams.delete("theme");
    } else {
      url.searchParams.set("org", org);
      url.searchParams.set("theme", theme);
    }
    history.replaceState(null, "", url);
  }, [org, theme]);

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
