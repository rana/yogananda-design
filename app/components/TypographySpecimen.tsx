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

      {/* Devotional Voice */}
      <div className="flex items-center gap-2 mb-4">
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
          Devotional Voice
        </span>
      </div>
      <div className="grid grid-cols-1 gap-6 mb-10">
        {/* Asar — Devotional Display */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>Display Inspirational</div>
          <div style={{ fontFamily: "var(--font-display-inspirational)", fontSize: "36px", fontWeight: 400, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "16px" }}>
            Asar
          </div>
          <div style={{ fontFamily: "var(--font-display-inspirational)", fontSize: "22px", fontWeight: 400, lineHeight: 1.5, color: "var(--color-text)", marginBottom: "8px" }}>
            &ldquo;Be as simple as you can be; you will be astonished to see how uncomplicated and happy your life can become.&rdquo;
          </div>
          <div className="citation-text mb-4">&mdash;&nbsp;Paramahansa Yogananda</div>
          <div className="token-value text-xs">22px / 400 / 1.5 line-height &middot; Self-hosted (OFL)</div>
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="text-xs" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              Ancient Indian stone-inscription aesthetic. Covers both Latin and Devanagari in a single devotional voice. Self-hosted under OFL. Falls back to Merienda for calligraphic warmth.
            </div>
          </div>
        </div>
      </div>

      {/* Communal Voice */}
      <div className="flex items-center gap-2 mb-4">
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-ochre)" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
          Communal Voice
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* ArcherPro */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-ochre)" }}>Display Event</div>
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
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-ochre)" }}>UI Event</div>
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

      {/* Devotional Voice — Asar */}
      <div className="flex items-center gap-2 mb-4">
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#A87D25" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
          Devotional Voice &mdash; The Inscription
        </span>
      </div>
      <div className="grid grid-cols-1 gap-6 mb-10">
        {/* Asar */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>Display Inspirational</div>
          <div style={{ fontFamily: "var(--font-display-inspirational)", fontSize: "36px", fontWeight: 400, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "16px" }}>
            Asar
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English */}
            <div>
              <div style={{ fontFamily: "var(--font-display-inspirational)", fontSize: "22px", fontWeight: 400, lineHeight: 1.5, color: "var(--color-text)", marginBottom: "8px" }}>
                &ldquo;Be as simple as you can be; you will be astonished to see how uncomplicated and happy your life can become.&rdquo;
              </div>
              <div className="citation-text">&mdash;&nbsp;Paramahansa Yogananda</div>
            </div>
            {/* Hindi — same font, same voice */}
            <div>
              <div style={{ fontFamily: "var(--font-display-inspirational)", fontSize: "22px", fontWeight: 400, lineHeight: 1.7, color: "var(--color-text)", marginBottom: "8px" }}>
                &ldquo;जितनी सादगी से हो सके जीवन बिताओ; तुम देखकर चकित रह जाओगे कि जीवन कितना सरल और सुखमय हो सकता है।&rdquo;
              </div>
              <div className="citation-text">&mdash;&nbsp;परमहंस योगानन्द</div>
            </div>
          </div>
          <div className="token-value text-xs mt-4">22px / 400 / 1.5 line-height &middot; Self-hosted &middot; OFL &middot; Latin + Devanagari</div>
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="text-xs" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              Ancient Indian stone-inscription aesthetic. The only font in the system that renders both Latin and Devanagari in a single devotional voice. One guru, two scripts, one inscription.
            </div>
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
        {/* Noto Sans Devanagari */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>UI (Devanagari)</div>
          <div style={{ fontFamily: 'var(--font-ui-hi)', fontSize: "32px", fontWeight: 400, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "12px" }}>
            नोटो सान्स
          </div>
          <div style={{ fontFamily: 'var(--font-ui-hi)', fontSize: "20px", fontWeight: 400, lineHeight: 1.9, color: "var(--color-text)", marginBottom: "4px" }}>
            योगानन्द सत्सङ्ग सोसाइटी
          </div>
          <div style={{ fontFamily: 'var(--font-ui-hi)', fontSize: "15px", fontWeight: 400, lineHeight: 1.6, color: "var(--color-text-secondary)", marginBottom: "8px" }}>
            खोजें... | अध्याय 12 / 49 | सेटिंग्स
          </div>
          <div className="token-value text-xs">15px / 400 / 1.6 line-height &middot; Self-hosted variable font</div>
          <div className="mt-3 space-y-1" style={{ fontFamily: 'var(--font-ui-hi)', color: "var(--color-text)" }}>
            <div style={{ fontWeight: 400, fontSize: "16px" }}>नियमित (400) — नेविगेशन, लेबल</div>
            <div style={{ fontWeight: 600, fontSize: "16px" }}>सेमीबोल्ड (600) — बटन, सीटीए</div>
          </div>
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="text-xs" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              Self-hosted variable font with unicode-range subsetting. Devanagari subset (U+0900-097F). Zero external font requests &mdash; GDPR compliant.
            </div>
          </div>
        </div>

        {/* Noto Serif Devanagari */}
        <div className="theme-transition rounded-md p-6" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--color-gold)" }}>
            Reading (Devanagari)
          </div>
          <div style={{ fontFamily: 'var(--font-reading-hi)', fontSize: "32px", fontWeight: 400, lineHeight: 1.3, color: "var(--color-text)", marginBottom: "12px" }}>
            नोटो सेरिफ़
          </div>
          <div style={{ fontFamily: 'var(--font-reading-hi)', fontSize: "20px", fontWeight: 400, lineHeight: 1.9, color: "var(--color-text)", marginBottom: "4px" }}>
            योगदा सत्सङ्ग सोसाइटी ऑफ़ इण्डिया
          </div>
          <div style={{ fontFamily: 'var(--font-reading-hi)', fontSize: "18px", fontWeight: 400, lineHeight: 1.9, color: "var(--color-text-secondary)", marginBottom: "8px" }}>
            जितनी सादगी से हो सके जीवन बिताओ; तुम देखकर चकित रह जाओगे कि जीवन कितना सरल और सुखमय हो सकता है।
          </div>
          <div className="token-value text-xs">20px / 400 / 1.9 line-height &middot; Self-hosted variable font</div>
          <div className="mt-3 space-y-1" style={{ fontFamily: 'var(--font-reading-hi)', color: "var(--color-text)" }}>
            <div style={{ fontWeight: 400, fontSize: "17px" }}>नियमित (400) — शिक्षा पाठ</div>
            <div style={{ fontWeight: 700, fontSize: "17px" }}>बोल्ड (700) — शीर्षक</div>
          </div>
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="text-xs" style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              Self-hosted. The serif companion to Noto Sans for immersive Hindi reading. Mirrors the Merriweather reading experience with 1.9 line-height for shirorekha clearance (ADR-080).
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
            ? "Two voices, five type roles. The contemplative voice serves reading and meditation — warm serifs that recede. The communal voice serves events and gathering — structured serifs that welcome."
            : "Five families, one spirit. Raleway for the modern voice — clean, geometric, welcoming. Merriweather for reading — shared lineage with SRF. Merienda for display warmth. Asar for the devotional inscription — one font, two scripts, the guru’s words carved in stone. Noto Sans/Serif for Indic scripts — nine languages."}
        </p>

        {org === "srf" ? <SrfTypography /> : <YssTypography />}
        <TypographicFeatures />
      </div>
    </section>
  );
}
