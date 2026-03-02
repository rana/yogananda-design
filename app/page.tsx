import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ThemeGallery from "./components/ThemeGallery";
import EmotionalRegisters from "./components/EmotionalRegisters";
import AttentionGradient from "./components/AttentionGradient";
import TypographySpecimen from "./components/TypographySpecimen";
import CalmTechnologyAudit from "./components/CalmTechnologyAudit";
import TransitionTheater from "./components/TransitionTheater";
import PatternPlayground from "./components/PatternPlayground";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ThemeGallery />
        <EmotionalRegisters />
        <AttentionGradient />
        <TypographySpecimen />
        <CalmTechnologyAudit />
        <TransitionTheater />
        <PatternPlayground />
      </main>
      <Footer />
    </>
  );
}
