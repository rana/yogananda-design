import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ThemeGallery from "./components/ThemeGallery";
import MotifGallery from "./components/MotifGallery";
import TypographySpecimen from "./components/TypographySpecimen";
import EmotionalRegisters from "./components/EmotionalRegisters";
import VoiceCrossfade from "./components/VoiceCrossfade";
import AttentionGradient from "./components/AttentionGradient";
import ReadingExperience from "./components/ReadingExperience";
import RasaExperience from "./components/RasaExperience";
import CommentaryHierarchy from "./components/CommentaryHierarchy";
import AestheticTheory from "./components/AestheticTheory";
import TransitionTheater from "./components/TransitionTheater";
import CalmTechnologyAudit from "./components/CalmTechnologyAudit";
import AccessibilityLab from "./components/AccessibilityLab";
import PrintPreview from "./components/PrintPreview";
import PatternPlayground from "./components/PatternPlayground";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ThemeGallery />
        <MotifGallery />
        <TypographySpecimen />
        <EmotionalRegisters />
        <VoiceCrossfade />
        <AttentionGradient />
        <ReadingExperience />
        <RasaExperience />
        <CommentaryHierarchy />
        <AestheticTheory />
        <TransitionTheater />
        <CalmTechnologyAudit />
        <AccessibilityLab />
        <PrintPreview />
        <PatternPlayground />
      </main>
      <Footer />
    </>
  );
}
