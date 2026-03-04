/**
 * Design token bridge — the door to the design language, not a tour guide.
 *
 * The JSON files are the API. Import what you need:
 *
 *   import { srfTokens, sharedTokens } from "@/lib/tokens";
 *   const gold = srfTokens.theme.light.gold.$value;
 *
 * No reshaping. No convenience wrappers. The tokens are already
 * designed for direct consumption — self-documenting W3C DTCG format.
 */

/* Layer 1: Foundations */
import sharedTokens from "@/foundations/shared.tokens.json";
import srfTokens from "@/foundations/srf.tokens.json";
import yssTokens from "@/foundations/yss.tokens.json";

/* Layer 2: Semantics */
import calmTechnology from "@/semantics/calm-technology.language.json";
import aestheticTheory from "@/semantics/aesthetic-theory.language.json";
import emotionalRegisters from "@/semantics/emotional-registers.language.json";
import attentionGradient from "@/semantics/attention-gradient.language.json";
import typographyRules from "@/semantics/typography.language.json";
import accessibilityRules from "@/semantics/accessibility.language.json";

/* Layer 3: Patterns */
import readingSurface from "@/patterns/reading-surface.pattern.json";
import searchPattern from "@/patterns/search.pattern.json";
import navigationPattern from "@/patterns/navigation.pattern.json";
import contemplationPattern from "@/patterns/contemplation.pattern.json";
import transitionsPattern from "@/patterns/transitions.pattern.json";

export {
  sharedTokens,
  srfTokens,
  yssTokens,
  calmTechnology,
  aestheticTheory,
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
