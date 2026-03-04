import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ThemeGallery from "./components/ThemeGallery";
import MotifGallery from "./components/MotifGallery";
import TypographySpecimen from "./components/TypographySpecimen";
import MultiScriptTypography from "./components/MultiScriptTypography";
import EmotionalRegisters from "./components/EmotionalRegisters";
import MediaRegisters from "./components/MediaRegisters";
import VoiceCrossfade from "./components/VoiceCrossfade";
import AttentionGradient from "./components/AttentionGradient";
import ReadingExperience from "./components/ReadingExperience";
import RasaExperience from "./components/RasaExperience";
import CommentaryHierarchy from "./components/CommentaryHierarchy";
import AestheticTheory from "./components/AestheticTheory";
import TransitionTheater from "./components/TransitionTheater";
import ResponsiveStrategy from "./components/ResponsiveStrategy";
import CalmTechnologyAudit from "./components/CalmTechnologyAudit";
import AccessibilityLab from "./components/AccessibilityLab";
import PrintPreview from "./components/PrintPreview";
import PhotographicAtmosphere from "./components/PhotographicAtmosphere";
import PatternPlayground from "./components/PatternPlayground";
import Footer from "./components/Footer";

/* ── Movement Break ──────────────────────────────────────────── */
/* Subliminal lotus between the three movements. The breathing
   space that lets the visitor's attention reset. */

function MovementBreak({ label }: { label: string }) {
  return (
    <div className="showcase-movement-break" role="separator" aria-label={label}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/lotus.svg"
        alt=""
        style={{ height: "10px", opacity: 0.1 }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ── Scroll Progress — Pure CSS scroll-driven gold bar ── */}
      <div className="showcase-scroll-progress" aria-hidden="true" />

      {/* ── Atmospheric Warmth — Scroll-driven background glow ── */}
      {/* Gold radial gradient that blooms at the showcase's golden
          center (Reading Surface) and fades at the edges. The
          design language's answer to photographic backgrounds. */}
      <div className="showcase-atmosphere" aria-hidden="true" />

      <Nav />
      <main>
        {/* ── Arrival ─────────────────────────────────────────── */}
        <Hero />

        {/* ── Movement I: Foundations (the vocabulary) ─────────── */}
        <ThemeGallery />
        <MotifGallery />
        <TypographySpecimen />
        <MultiScriptTypography />

        <MovementBreak label="From vocabulary to expression" />

        {/* ── Movement II: Expression (the practice) ──────────── */}
        {/* Sections build toward the gravitational center:
            Reading Surface. Then descend through its extensions. */}
        <EmotionalRegisters />
        <MediaRegisters />
        <VoiceCrossfade />
        <AttentionGradient />

        {/* ── Gravitational Center ────────────────────────────── */}
        {/* The reading surface is the reason this design system
            exists. Everything else orbits it. */}
        <div className="showcase-section-primary">
          <ReadingExperience />
        </div>

        <RasaExperience />
        <CommentaryHierarchy />

        <MovementBreak label="From expression to structure" />

        {/* ── Movement III: Structure (the reference) ─────────── */}
        <AestheticTheory />
        <TransitionTheater />
        <ResponsiveStrategy />
        <CalmTechnologyAudit />
        <AccessibilityLab />
        <PrintPreview />
        <PhotographicAtmosphere />
        <PatternPlayground />
      </main>
      <Footer />
    </>
  );
}
