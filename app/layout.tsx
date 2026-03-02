import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yogananda Design Languages",
  description:
    "Visual design system for the Yogananda digital ecosystem. SRF and YSS design languages — foundations, semantics, and patterns.",
  icons: { icon: "/lotus.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
