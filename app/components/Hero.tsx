const orgData = {
  srf: {
    color: "#1a2744",
    textOnColor: "#e8e4dc",
    hex: "#1a2744",
    themeCount: 6,
  },
  yss: {
    color: "#bb4f27",
    textOnColor: "#fff",
    hex: "#bb4f27",
    themeCount: 5,
  },
};

export default function Hero() {
  const totalThemes = orgData.srf.themeCount + orgData.yss.themeCount - 1; // earth is shared

  return (
    <header
      className="theme-transition"
      style={{
        padding: "var(--space-vast) 0 var(--space-expansive)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Phase 1: Lotus arrives first */}
        <div
          className="showcase-arrive showcase-arrive-1 flex justify-center mb-8"
          style={{ opacity: 0.4 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lotus.svg" alt="" className="h-8" />
        </div>

        {/* Phase 2: Title */}
        <h1
          className="showcase-arrive showcase-arrive-2 display-text text-center"
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            color: "var(--color-text)",
            marginBottom: "var(--space-generous)",
          }}
        >
          Yogananda Design Languages
        </h1>

        {/* Phase 3: Description */}
        <p
          className="showcase-arrive showcase-arrive-3 reading-text text-center max-w-2xl mx-auto"
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "16px",
            lineHeight: 1.7,
          }}
        >
          Two organizational expressions &mdash;{" "}
          <strong style={{ color: "var(--color-text)" }}>SRF</strong>{" "}
          <span
            className="token-value"
            style={{
              backgroundColor: orgData.srf.color,
              color: orgData.srf.textOnColor,
              borderColor: "transparent",
            }}
          >
            {orgData.srf.hex}
          </span>{" "}
          and{" "}
          <strong style={{ color: "var(--color-text)" }}>YSS</strong>{" "}
          <span
            className="token-value"
            style={{
              backgroundColor: orgData.yss.color,
              color: orgData.yss.textOnColor,
              borderColor: "transparent",
            }}
          >
            {orgData.yss.hex}
          </span> &mdash; sharing common
          foundations. Built for AI-first authorship. Every token is
          self-documenting. Every constraint is machine-readable.
        </p>

        {/* Phase 4: Stats */}
        <div
          className="showcase-arrive showcase-arrive-4 flex justify-center gap-6 mt-8 text-center flex-wrap"
          style={{ fontFamily: "var(--font-ui)", fontSize: "13px" }}
        >
          {[
            { value: "3", label: "Layers" },
            { value: "2", label: "Orgs" },
            { value: String(totalThemes), label: "Themes" },
            { value: "5", label: "Registers" },
            { value: "11", label: "Glyphs" },
            { value: "3", label: "Voices" },
            { value: "7", label: "Principles" },
          ].map((stat, i, arr) => (
            <div key={stat.label} className="flex items-center gap-6">
              <div>
                <div
                  className="display-text"
                  style={{ fontSize: "24px", color: "var(--color-gold)" }}
                >
                  {stat.value}
                </div>
                <div style={{ color: "var(--color-text-secondary)" }}>
                  {stat.label}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    background: "var(--color-border)",
                    alignSelf: "stretch",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
