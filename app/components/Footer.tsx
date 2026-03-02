export default function Footer() {
  return (
    <footer
      className="theme-transition"
      style={{
        padding: "var(--space-expansive) 0",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex justify-center mb-4" style={{ opacity: 0.3 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lotus.svg" alt="" className="h-5" />
        </div>
        <div
          className="mb-2"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            color: "var(--color-text-secondary)",
          }}
        >
          Three layers: Foundations &middot; Semantics &middot; Patterns
        </div>
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            opacity: 0.6,
          }}
        >
          W3C DTCG tokens &middot; AI-first authorship &middot; SRF &amp; YSS
        </div>
      </div>
    </footer>
  );
}
