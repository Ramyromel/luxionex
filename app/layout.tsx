import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxionex",
  description: "Cognitive Intelligence System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* منع أي تدخل من المتصفح أو extensions */}
        <meta name="color-scheme" content="dark light" />
        <meta name="format-detection" content="telephone=no" />

        {/* تثبيت السلوك ومنع translation injection */}
        <meta httpEquiv="Content-Language" content="en" />
      </head>

      <body
        suppressHydrationWarning={true}
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#0b0f19",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Wrapper ثابت يمنع أي mismatch في DOM */}
        <div id="app-root">{children}</div>
      </body>
    </html>
  );
}
