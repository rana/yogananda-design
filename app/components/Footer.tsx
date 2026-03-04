"use client";

import { useRef, useState, useEffect } from "react";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className="theme-transition"
      style={{
        padding: "var(--space-vast) 0 var(--space-expansive)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Lotus — exhale */}
        <div
          className={visible ? "showcase-exhale" : ""}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "var(--space-generous)",
            opacity: visible ? 0.3 : 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lotus.svg" alt="" className="h-5" />
        </div>

        {/* Closing line — the breath completes */}
        <div
          className={visible ? "showcase-exhale" : ""}
          style={{
            fontFamily: "var(--font-reading)",
            fontSize: "15px",
            fontStyle: "italic",
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            marginBottom: "var(--space-generous)",
            opacity: visible ? 1 : 0,
            animationDelay: visible ? "200ms" : undefined,
          }}
        >
          In quietness, the design speaks.
        </div>

        <div
          className={visible ? "showcase-exhale" : ""}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            color: "var(--color-text-secondary)",
            marginBottom: "var(--space-compact)",
            opacity: visible ? 1 : 0,
            animationDelay: visible ? "400ms" : undefined,
          }}
        >
          Three layers: Foundations &middot; Semantics &middot; Patterns
        </div>
        <div
          className={visible ? "showcase-exhale" : ""}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            opacity: visible ? 0.6 : 0,
            animationDelay: visible ? "500ms" : undefined,
          }}
        >
          W3C DTCG tokens &middot; AI-first authorship &middot; SRF &amp; YSS
        </div>
      </div>
    </footer>
  );
}
