/**
 * Design token loading — reads JSON token files and provides typed access.
 * Tokens are loaded at build time (Server Components) or imported statically.
 */

import sharedTokens from "@/foundations/shared.tokens.json";
import srfTokens from "@/foundations/srf.tokens.json";
import yssTokens from "@/foundations/yss.tokens.json";
import calmTechnology from "@/semantics/calm-technology.language.json";
import emotionalRegisters from "@/semantics/emotional-registers.language.json";
import attentionGradient from "@/semantics/attention-gradient.language.json";
import typographyRules from "@/semantics/typography.language.json";
import accessibilityRules from "@/semantics/accessibility.language.json";
import readingSurface from "@/patterns/reading-surface.pattern.json";
import searchPattern from "@/patterns/search.pattern.json";
import navigationPattern from "@/patterns/navigation.pattern.json";
import contemplationPattern from "@/patterns/contemplation.pattern.json";
import transitionsPattern from "@/patterns/transitions.pattern.json";

export type Organization = "srf" | "yss";

export type ThemeName =
  | "light"
  | "sepia"
  | "earth"
  | "dark"
  | "meditate";

export interface ThemeColors {
  bg: string;
  "bg-secondary": string;
  text: string;
  "text-secondary": string;
  border: string;
  gold: string;
  surface: string;
}

export function getTheme(name: ThemeName): ThemeColors {
  const theme = srfTokens.theme[name];
  return {
    bg: theme.bg.$value,
    "bg-secondary": theme["bg-secondary"].$value,
    text: theme.text.$value,
    "text-secondary": theme["text-secondary"].$value,
    border: theme.border.$value,
    gold: theme.gold.$value,
    surface: theme.surface.$value,
  };
}

export function getThemeNames(): ThemeName[] {
  return ["light", "sepia", "earth", "dark", "meditate"];
}

export function getThemeDescription(name: ThemeName): string {
  return srfTokens.theme[name].$description;
}

export function getGoldOpacityLevels() {
  return srfTokens["gold-opacity"];
}

export function getSpacingScale() {
  return sharedTokens.space;
}

export function getMotionTokens() {
  return sharedTokens.motion;
}

export function getOpacityScale() {
  return sharedTokens.opacity;
}

export function getCircadianPeriods() {
  return srfTokens.circadian;
}

export {
  sharedTokens,
  srfTokens,
  yssTokens,
  calmTechnology,
  emotionalRegisters,
  attentionGradient,
  typographyRules,
  accessibilityRules,
  readingSurface,
  searchPattern,
  navigationPattern,
  contemplationPattern,
  transitionsPattern,
};
