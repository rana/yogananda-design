export default function TypographySpecimen() {
  return (
    <section id="typography" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
        >
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
          Three type roles serve three different attentional purposes. Reading
          typography is immersive and warm. Display typography anchors the page
          with authority. UI typography disappears.
        </p>

        {/* Font families */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Merriweather */}
          <div
            className="theme-transition rounded-md p-6"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              Reading
            </div>
            <div
              style={{
                fontFamily: "var(--font-reading)",
                fontSize: "32px",
                fontWeight: 400,
                lineHeight: 1.3,
                color: "var(--color-text)",
                marginBottom: "12px",
              }}
            >
              Merriweather
            </div>
            <div
              className="reading-text"
              style={{ color: "var(--color-text)", marginBottom: "8px" }}
            >
              The season of failure is the best time for sowing the seeds of
              success.
            </div>
            <div className="token-value text-xs">
              18px / 400 / 1.8 line-height
            </div>
            <div
              className="mt-3 space-y-1"
              style={{ fontFamily: "var(--font-reading)", color: "var(--color-text)" }}
            >
              <div style={{ fontWeight: 300, fontSize: "15px" }}>
                Light (300) &mdash; Epigraphs, citations
              </div>
              <div style={{ fontWeight: 400, fontSize: "15px" }}>
                Regular (400) &mdash; Body text
              </div>
              <div style={{ fontWeight: 400, fontStyle: "italic", fontSize: "15px" }}>
                Italic (400) &mdash; Emphasis, book titles
              </div>
              <div style={{ fontWeight: 700, fontSize: "15px" }}>
                Bold (700) &mdash; Drop capitals
              </div>
            </div>
          </div>

          {/* Lora */}
          <div
            className="theme-transition rounded-md p-6"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              Display
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: 1.3,
                color: "var(--color-text)",
                marginBottom: "12px",
              }}
            >
              Lora
            </div>
            <div
              className="display-text"
              style={{
                fontSize: "24px",
                color: "var(--color-text)",
                marginBottom: "8px",
              }}
            >
              Chapter One: My Parents
            </div>
            <div className="token-value text-xs">
              24px / 700 / 1.3 line-height
            </div>
            <div
              className="mt-3 space-y-1"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              <div style={{ fontWeight: 400, fontSize: "15px" }}>
                Regular (400) &mdash; Subtitles
              </div>
              <div style={{ fontWeight: 400, fontStyle: "italic", fontSize: "15px" }}>
                Italic (400) &mdash; Display accents
              </div>
              <div style={{ fontWeight: 700, fontSize: "15px" }}>
                Bold (700) &mdash; Chapter titles
              </div>
            </div>
          </div>

          {/* Open Sans */}
          <div
            className="theme-transition rounded-md p-6"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              UI
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "32px",
                fontWeight: 400,
                lineHeight: 1.3,
                color: "var(--color-text)",
                marginBottom: "12px",
              }}
            >
              Open Sans
            </div>
            <div
              className="ui-text"
              style={{ color: "var(--color-text)", marginBottom: "8px" }}
            >
              Search the teachings... | Chapter 12 of 49 | Settings
            </div>
            <div className="token-value text-xs">
              14px / 400 / 1.5 line-height
            </div>
            <div
              className="mt-3 space-y-1"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-text)",
              }}
            >
              <div style={{ fontWeight: 400, fontSize: "15px" }}>
                Regular (400) &mdash; Labels, navigation
              </div>
              <div style={{ fontWeight: 600, fontSize: "15px" }}>
                Semibold (600) &mdash; Buttons, emphasis
              </div>
            </div>
          </div>
        </div>

        {/* Typographic Features */}
        <h3
          className="display-text mb-4"
          style={{ fontSize: "18px", color: "var(--color-text)" }}
        >
          Typographic Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Drop Capital */}
          <div
            className="theme-transition rounded-md p-5"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              Drop Capital
            </div>
            <div
              className="reading-text"
              style={{ color: "var(--color-text)", fontSize: "15px" }}
            >
              <span
                className="float-left mr-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "56px",
                  fontWeight: 700,
                  lineHeight: 0.8,
                  color: "var(--color-gold)",
                }}
              >
                T
              </span>
              he characteristic features of Indian culture have long been a
              search for ultimate truth and the concomitant disciple-guru
              relationship.
            </div>
          </div>

          {/* Citation */}
          <div
            className="theme-transition rounded-md p-5"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              Citation
            </div>
            <div
              className="reading-text mb-3"
              style={{ color: "var(--color-text)", fontSize: "15px" }}
            >
              &ldquo;Live quietly in the moment and see the beauty of all
              before you.&rdquo;
            </div>
            <div className="citation-text">
              &mdash;&nbsp;Paramahansa Yogananda,{" "}
              <em>Autobiography of a Yogi</em>, Chapter 12, p. 142
            </div>
          </div>

          {/* Unicode Characters */}
          <div
            className="theme-transition rounded-md p-5"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              Unicode Characters
            </div>
            <div className="space-y-2" style={{ color: "var(--color-text)" }}>
              <div
                className="flex justify-between text-sm"
                style={{ fontFamily: "var(--font-reading)" }}
              >
                <span>Em-dash</span>
                <span className="token-value">&mdash; U+2014</span>
              </div>
              <div
                className="flex justify-between text-sm"
                style={{ fontFamily: "var(--font-reading)" }}
              >
                <span>Ellipsis</span>
                <span className="token-value">&hellip; U+2026</span>
              </div>
              <div
                className="flex justify-between text-sm"
                style={{ fontFamily: "var(--font-reading)" }}
              >
                <span>Thin space</span>
                <span className="token-value">&thinsp; U+2009</span>
              </div>
              <div
                className="flex justify-between text-sm"
                style={{ fontFamily: "var(--font-reading)" }}
              >
                <span>Asterism</span>
                <span className="token-value">&#x2042; U+2042</span>
              </div>
              <div
                className="flex justify-between text-sm"
                style={{ fontFamily: "var(--font-reading)" }}
              >
                <span>Om</span>
                <span className="token-value">&#x0950; U+0950</span>
              </div>
            </div>
          </div>

          {/* Epigraph */}
          <div
            className="theme-transition rounded-md p-5"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{
                fontFamily: "var(--font-ui)",
                color: "var(--color-gold)",
              }}
            >
              Epigraph
            </div>
            <div
              style={{
                borderLeft: `3px solid var(--color-gold)`,
                paddingLeft: "16px",
                opacity: 0.85,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-reading)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "var(--color-text)",
                }}
              >
                &ldquo;Kriya Yoga is an instrument through which human
                evolution can be quickened.&rdquo;
              </div>
              <div className="citation-text mt-2">
                &mdash;&nbsp;Sri Yukteswar
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
