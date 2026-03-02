import { calmTechnology } from "@/lib/tokens";

export default function CalmTechnologyAudit() {
  const forbidden = calmTechnology.forbidden.patterns;
  const required = calmTechnology.required.patterns;
  const guidelines = calmTechnology.guidelines.patterns;

  return (
    <section id="calm" className="showcase-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="display-text mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
        >
          Calm Technology Audit
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
          PRI-08: The portal waits; it does not interrupt. Machine-readable
          lists of forbidden and required patterns. An AI designer loads these
          constraints before generating any component.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Forbidden */}
          <div>
            <h3
              className="flex items-center gap-2 mb-4"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs"
                style={{
                  backgroundColor: "#dc2626",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                }}
              >
                &#x2715;
              </span>
              Forbidden ({forbidden.length})
            </h3>
            <div className="space-y-2">
              {forbidden.map((item) => (
                <div
                  key={item.name}
                  className="theme-transition rounded-md p-3"
                  style={{
                    backgroundColor: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className="token-value shrink-0 mt-0.5"
                      style={{
                        color: "#dc2626",
                        backgroundColor: "#dc262610",
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="token-value shrink-0 mt-0.5"
                      style={{ fontSize: "11px" }}
                    >
                      {item.principle}
                    </span>
                  </div>
                  <div
                    className="text-sm mt-1"
                    style={{
                      fontFamily: "var(--font-ui)",
                      color: "var(--color-text-secondary)",
                      fontSize: "13px",
                    }}
                  >
                    {item.why}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required */}
          <div>
            <h3
              className="flex items-center gap-2 mb-4"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs"
                style={{
                  backgroundColor: "#16a34a",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                }}
              >
                &#x2713;
              </span>
              Required ({required.length})
            </h3>
            <div className="space-y-2">
              {required.map((item) => (
                <div
                  key={item.name}
                  className="theme-transition rounded-md p-3"
                  style={{
                    backgroundColor: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className="token-value shrink-0 mt-0.5"
                      style={{
                        color: "#16a34a",
                        backgroundColor: "#16a34a10",
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="token-value shrink-0 mt-0.5"
                      style={{ fontSize: "11px" }}
                    >
                      {item.principle}
                    </span>
                  </div>
                  <div
                    className="text-sm mt-1"
                    style={{
                      fontFamily: "var(--font-ui)",
                      color: "var(--color-text-secondary)",
                      fontSize: "13px",
                    }}
                  >
                    {item.how}
                  </div>
                </div>
              ))}
            </div>

            {/* Guidelines */}
            <h3
              className="flex items-center gap-2 mb-4 mt-6"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs"
                style={{
                  backgroundColor: "var(--color-gold)",
                  color: "var(--color-navy)",
                  fontSize: "10px",
                  fontWeight: 700,
                }}
              >
                ?
              </span>
              Guidelines ({guidelines.length})
            </h3>
            <div className="space-y-2">
              {guidelines.map((item) => (
                <div
                  key={item.name}
                  className="theme-transition rounded-md p-3"
                  style={{
                    backgroundColor: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    className="font-medium text-sm mb-1"
                    style={{
                      fontFamily: "var(--font-reading)",
                      fontStyle: "italic",
                      color: "var(--color-text)",
                    }}
                  >
                    &ldquo;{item.question}&rdquo;
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-ui)",
                      color: "var(--color-text-secondary)",
                      fontSize: "13px",
                    }}
                  >
                    {item.guidance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
