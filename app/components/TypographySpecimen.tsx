"use client";

import { useDesign } from "./DesignProvider";

function SrfTypography() {
  return (
    <>
      {/* Contemplative Voice */}
      <div className="flex items-center gap-2 mb-4">
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
          Contemplative Voice
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Merriweather */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>Reading</div>
          <div style={{ fontFamily: "var(--font-reading)", fontSize: "32px", fontWeight: 400, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "12px" }}>
            Merriweather
          </div>
          <div className="reading-text" style={{ color: "var(--color-text)", marginBottom: "8px" }}>
            Be as simple as you can be; you will be astonished to see how uncomplicated and happy your life can become.
          </div>
          <div className="token-value text-xs">18px / 400 / 1.8 line-height</div>
          <div className="mt-3 space-y-1" style={{ fontFamily: "var(--font-reading)", color: "var(--color-text)" }}>
            <div style={{ fontWeight: 300, fontSize: "15px" }}>Light (300) &mdash; Epigraphs, citations</div>
            <div style={{ fontWeight: 400, fontSize: "15px" }}>Regular (400) &mdash; Body text</div>
            <div style={{ fontWeight: 400, fontStyle: "italic", fontSize: "15px" }}>Italic (400) &mdash; Emphasis, book titles</div>
            <div style={{ fontWeight: 700, fontSize: "15px" }}>Bold (700) &mdash; Drop capitals</div>
          </div>
        </div>

        {/* Lora */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>Display</div>
          <div style={{ fontFamily: '"Lora", Georgia, serif', fontSize: "32px", fontWeight: 700, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "12px" }}>
            Lora
          </div>
          <div style={{ fontFamily: '"Lora", Georgia, serif', fontSize: "24px", fontWeight: 700, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "8px" }}>
            Chapter One: My Parents
          </div>
          <div className="token-value text-xs">24px / 700 / 1.3 line-height</div>
          <div className="mt-3 space-y-1" style={{ fontFamily: '"Lora", Georgia, serif', color: "var(--color-text)" }}>
            <div style={{ fontWeight: 400, fontSize: "15px" }}>Regular (400) &mdash; Subtitles</div>
            <div style={{ fontWeight: 400, fontStyle: "italic", fontSize: "15px" }}>Italic (400) &mdash; Display accents</div>
            <div style={{ fontWeight: 700, fontSize: "15px" }}>Bold (700) &mdash; Chapter titles</div>
          </div>
        </div>

        {/* Open Sans */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>UI</div>
          <div style={{ fontFamily: '"Open Sans", system-ui, sans-serif', fontSize: "32px", fontWeight: 400, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "12px" }}>
            Open Sans
          </div>
          <div style={{ fontFamily: '"Open Sans", system-ui, sans-serif', fontSize: "14px", fontWeight: 400, lineHeight: 1.5, color: "var(--color-text)", marginBottom: "8px" }}>
            Search the teachings... | Chapter 12 of 49 | Settings
          </div>
          <div className="token-value text-xs">14px / 400 / 1.5 line-height</div>
          <div className="mt-3 space-y-1" style={{ fontFamily: '"Open Sans", system-ui, sans-serif', color: "var(--color-text)" }}>
            <div style={{ fontWeight: 400, fontSize: "15px" }}>Regular (400) &mdash; Labels, navigation</div>
            <div style={{ fontWeight: 600, fontSize: "15px" }}>Semibold (600) &mdash; Buttons, emphasis</div>
          </div>
        </div>
      </div>

      {/* Communal Voice */}
      <div className="flex items-center gap-2 mb-4">
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-marigold)" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
          Communal Voice
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* ArcherPro */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-marigold)" }}>Display Event</div>
          <div style={{ fontFamily: "var(--font-display-event)", fontSize: "32px", fontWeight: 500, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "12px" }}>
            ArcherPro
          </div>
          <div style={{ fontFamily: "var(--font-display-event)", fontSize: "22px", fontWeight: 500, color: "var(--color-text)", marginBottom: "8px", lineHeight: 1.25 }}>
            Convocation 2026 &mdash; A Gathering of Seekers
          </div>
          <div className="token-value text-xs">28px / 500 / 1.25 line-height</div>
          <div className="mt-3 space-y-1" style={{ fontFamily: "var(--font-display-event)", color: "var(--color-text)" }}>
            <div style={{ fontWeight: 400, fontSize: "15px" }}>Regular (400) &mdash; Event subtitles</div>
            <div style={{ fontWeight: 500, fontSize: "15px" }}>Medium (500) &mdash; Event headings</div>
            <div style={{ fontWeight: 400, fontStyle: "italic", fontSize: "15px" }}>Italic (400) &mdash; Speaker names</div>
          </div>
        </div>

        {/* Helvetica Neue */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-marigold)" }}>UI Event</div>
          <div style={{ fontFamily: "var(--font-ui-event)", fontSize: "32px", fontWeight: 400, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "12px" }}>
            Helvetica Neue
          </div>
          <div style={{ fontFamily: "var(--font-ui-event)", fontSize: "15px", fontWeight: 375, color: "var(--color-text)", marginBottom: "8px", lineHeight: 1.5 }}>
            Register Now | View Schedule | Volunteer | Directions
          </div>
          <div className="token-value text-xs">15px / 375 / 1.5 line-height</div>
          <div className="mt-3 space-y-1" style={{ fontFamily: "var(--font-ui-event)", color: "var(--color-text)" }}>
            <div style={{ fontWeight: 375, fontSize: "15px" }}>Book (375) &mdash; Body, navigation</div>
            <div style={{ fontWeight: 600, fontSize: "15px" }}>Semibold (600) &mdash; Buttons, CTAs</div>
          </div>
        </div>
      </div>
    </>
  );
}

function YssTypography() {
  return (
    <>
      {/* YSS Type System */}
      <div className="flex items-center gap-2 mb-4">
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
          YSS Type System
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Raleway */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>UI &amp; Headings</div>
          <div style={{ fontFamily: '"Raleway", system-ui, sans-serif', fontSize: "32px", fontWeight: 500, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "12px", letterSpacing: "0.5px" }}>
            Raleway
          </div>
          <div style={{ fontFamily: '"Raleway", system-ui, sans-serif', fontSize: "14px", fontWeight: 400, lineHeight: 1.7, color: "var(--color-text)", marginBottom: "8px" }}>
            The workhorse of yssofindia.org &mdash; geometric sans-serif for headings, body, buttons, and navigation.
          </div>
          <div className="token-value text-xs">14px / 400 / 1.7 line-height</div>
          <div className="mt-3 space-y-1" style={{ fontFamily: '"Raleway", system-ui, sans-serif', color: "var(--color-text)" }}>
            <div style={{ fontWeight: 300, fontSize: "15px" }}>Light (300) &mdash; Decorative text</div>
            <div style={{ fontWeight: 400, fontSize: "15px" }}>Regular (400) &mdash; Body text</div>
            <div style={{ fontWeight: 500, fontSize: "15px" }}>Medium (500) &mdash; Section headings</div>
            <div style={{ fontWeight: 600, fontSize: "15px" }}>Semibold (600) &mdash; Buttons, CTAs</div>
          </div>
        </div>

        {/* Merriweather */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>Reading</div>
          <div style={{ fontFamily: "var(--font-reading)", fontSize: "32px", fontWeight: 400, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "12px" }}>
            Merriweather
          </div>
          <div className="reading-text" style={{ color: "var(--color-text)", marginBottom: "8px" }}>
            The teachings are the same &mdash; the reading experience honors that shared lineage with SRF.
          </div>
          <div className="token-value text-xs">18px / 400 / 1.8 line-height</div>
          <div className="mt-3 space-y-1" style={{ fontFamily: "var(--font-reading)", color: "var(--color-text)" }}>
            <div style={{ fontWeight: 300, fontSize: "15px" }}>Light (300) &mdash; Epigraphs</div>
            <div style={{ fontWeight: 400, fontSize: "15px" }}>Regular (400) &mdash; Body text</div>
            <div style={{ fontWeight: 400, fontStyle: "italic", fontSize: "15px" }}>Italic (400) &mdash; Emphasis</div>
            <div style={{ fontWeight: 700, fontSize: "15px" }}>Bold (700) &mdash; Drop capitals</div>
          </div>
        </div>

        {/* Merienda */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>Display / Devotional</div>
          <div style={{ fontFamily: '"Merienda", cursive', fontSize: "32px", fontWeight: 500, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "12px" }}>
            Merienda
          </div>
          <div style={{ fontFamily: '"Merienda", cursive', fontSize: "22px", fontWeight: 500, color: "var(--color-text)", marginBottom: "8px", lineHeight: 1.3 }}>
            Quote of the Day
          </div>
          <div className="token-value text-xs">30px / 500 / 1.3 line-height</div>
          <div className="mt-3 space-y-1" style={{ fontFamily: '"Merienda", cursive', color: "var(--color-text)" }}>
            <div style={{ fontWeight: 400, fontSize: "15px" }}>Regular (400) &mdash; Subtitles</div>
            <div style={{ fontWeight: 500, fontSize: "15px" }}>Medium (500) &mdash; Section titles</div>
            <div style={{ fontWeight: 700, fontSize: "15px" }}>Bold (700) &mdash; Hero headings</div>
          </div>
        </div>
      </div>

      {/* Indic Scripts */}
      <div className="flex items-center gap-2 mb-4">
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#E8A830" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
          Indic Scripts &mdash; 9 Languages
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Noto Sans */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>UI &amp; Body (Indic)</div>
          <div style={{ fontFamily: '"Noto Sans", system-ui, sans-serif', fontSize: "32px", fontWeight: 400, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "12px" }}>
            Noto Sans
          </div>
          <div style={{ fontFamily: '"Noto Sans", system-ui, sans-serif', fontSize: "20px", fontWeight: 400, lineHeight: 1.9, color: "var(--color-text)", marginBottom: "4px" }}>
            &#x092F;&#x094B;&#x0917;&#x093E;&#x0928;&#x0928;&#x094D;&#x0926; &#x0938;&#x0924;&#x094D;&#x0938;&#x0919;&#x094D;&#x0917; &#x0938;&#x094B;&#x0938;&#x093E;&#x0907;&#x091F;&#x0940;
          </div>
          <div style={{ fontFamily: '"Noto Sans", system-ui, sans-serif', fontSize: "15px", fontWeight: 400, lineHeight: 1.6, color: "var(--color-text-secondary)", marginBottom: "8px" }}>
            Yogoda Satsanga Society of India
          </div>
          <div className="token-value text-xs">15px / 400 / 1.6 line-height (Indic: 20px / 1.9)</div>
          <div className="mt-3 space-y-1" style={{ fontFamily: '"Noto Sans", system-ui, sans-serif', color: "var(--color-text)" }}>
            <div style={{ fontWeight: 400, fontSize: "15px" }}>Regular (400) &mdash; Body, navigation</div>
            <div style={{ fontWeight: 500, fontSize: "15px" }}>Medium (500) &mdash; Headings</div>
            <div style={{ fontWeight: 600, fontSize: "15px" }}>Semibold (600) &mdash; Buttons, CTAs</div>
          </div>
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="text-xs" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              Variable font with unicode-range subsetting. Covers Devanagari (U+0900-097F), Bengali, Gujarati, Tamil, Telugu, Kannada, Malayalam + Latin, Cyrillic, Greek.
            </div>
          </div>
        </div>

        {/* Noto Serif Devanagari (aspirational) */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", opacity: 0.7 }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>
            Reading (Indic) &mdash; Future
          </div>
          <div style={{ fontFamily: '"Noto Serif Devanagari", "Noto Serif", Georgia, serif', fontSize: "32px", fontWeight: 400, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "12px" }}>
            Noto Serif
          </div>
          <div style={{ fontFamily: '"Noto Serif Devanagari", "Noto Serif", Georgia, serif', fontSize: "20px", fontWeight: 400, lineHeight: 1.9, color: "var(--color-text)", marginBottom: "8px" }}>
            &#x092F;&#x094B;&#x0917;&#x0926;&#x093E; &#x0938;&#x0924;&#x094D;&#x0938;&#x0919;&#x094D;&#x0917; &#x0938;&#x094B;&#x0938;&#x093E;&#x0907;&#x091F;&#x0940;
          </div>
          <div className="token-value text-xs">20px / 400 / 1.9 line-height</div>
          <div className="mt-3 space-y-1" style={{ fontFamily: '"Noto Serif", Georgia, serif', color: "var(--color-text)" }}>
            <div style={{ fontWeight: 400, fontSize: "15px" }}>Regular (400) &mdash; Teaching text</div>
            <div style={{ fontWeight: 400, fontStyle: "italic", fontSize: "15px" }}>Italic (400) &mdash; Emphasis</div>
            <div style={{ fontWeight: 700, fontSize: "15px" }}>Bold (700) &mdash; Drop capitals</div>
          </div>
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="text-xs" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              Aspirational. Not yet deployed on yssofindia.org. The serif companion to Noto Sans for immersive Hindi reading surfaces. Mirrors the Merriweather reading experience.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TypographicFeatures() {
  return (
    <>
      <h3 className="display-text mb-4" style={{ fontSize: "18px", color: "var(--color-text)" }}>
        Typographic Features
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Drop Capital */}
        <div className="theme-transition rounded-md p-5" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>Drop Capital</div>
          <div className="reading-text" style={{ color: "var(--color-text)", fontSize: "15px" }}>
            <span className="float-left mr-2" style={{ fontFamily: "var(--font-display)", fontSize: "56px", fontWeight: 700, lineHeight: 0.8, color: "var(--color-gold)" }}>T</span>
            he characteristic features of Indian culture have long been a search for ultimate truth and the concomitant disciple-guru relationship.
          </div>
        </div>

        {/* Citation */}
        <div className="theme-transition rounded-md p-5" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>Citation</div>
          <div className="reading-text mb-3" style={{ color: "var(--color-text)", fontSize: "15px" }}>
            &ldquo;Live quietly in the moment and see the beauty of all before you.&rdquo;
          </div>
          <div className="citation-text">
            &mdash;&nbsp;Paramahansa Yogananda, <em>Autobiography of a Yogi</em>, Chapter 12, p. 142
          </div>
        </div>

        {/* Unicode Characters */}
        <div className="theme-transition rounded-md p-5" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>Unicode Characters</div>
          <div className="space-y-2" style={{ color: "var(--color-text)" }}>
            <div className="flex justify-between text-sm" style={{ fontFamily: "var(--font-reading)" }}><span>Em-dash</span><span className="token-value">&mdash; U+2014</span></div>
            <div className="flex justify-between text-sm" style={{ fontFamily: "var(--font-reading)" }}><span>Ellipsis</span><span className="token-value">&hellip; U+2026</span></div>
            <div className="flex justify-between text-sm" style={{ fontFamily: "var(--font-reading)" }}><span>Thin space</span><span className="token-value">&thinsp; U+2009</span></div>
            <div className="flex justify-between text-sm" style={{ fontFamily: "var(--font-reading)" }}><span>Asterism</span><span className="token-value">&#x2042; U+2042</span></div>
            <div className="flex justify-between text-sm" style={{ fontFamily: "var(--font-reading)" }}><span>Om</span><span className="token-value">&#x0950; U+0950</span></div>
          </div>
        </div>

        {/* Epigraph */}
        <div className="theme-transition rounded-md p-5" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>Epigraph</div>
          <div style={{ borderLeft: "3px solid var(--color-gold)", paddingLeft: "16px", opacity: 0.85 }}>
            <div style={{ fontFamily: "var(--font-reading)", fontWeight: 300, fontStyle: "italic", fontSize: "15px", lineHeight: 1.8, color: "var(--color-text)" }}>
              &ldquo;Kriya Yoga is an instrument through which human evolution can be quickened.&rdquo;
            </div>
            <div className="citation-text mt-2">&mdash;&nbsp;Sri Yukteswar</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function TypographySpecimen() {
  const { org } = useDesign();

  return (
    <section id="typography" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="display-text mb-2" style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}>
          Typography Specimen
        </h2>
        <p
          className="mb-8"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            maxWidth: "600px",
          }}
        >
          {org === "srf"
            ? "Two voices, five type roles. The contemplative voice serves reading and meditation \u2014 warm serifs that recede. The communal voice serves events and gathering \u2014 structured serifs that welcome."
            : "Four families, one spirit. Raleway for the modern voice \u2014 clean, geometric, welcoming. Merriweather for reading \u2014 shared lineage with SRF. Merienda for devotional display \u2014 handcrafted warmth. Noto Sans for Indic scripts \u2014 nine languages, one unified variable font."}
        </p>

        {org === "srf" ? <SrfTypography /> : <YssTypography />}
        <TypographicFeatures />
      </div>
    </section>
  );
}
