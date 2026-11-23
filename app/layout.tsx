import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUXIONEX — Governance Framework",
  description:
    "A practical governance library for architecture, security, risk, and responsible system evolution.",
  openGraph: {
    title: "LUXIONEX — Governance Framework",
    description:
      "Principles made actionable through standards, controls, and verification.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
