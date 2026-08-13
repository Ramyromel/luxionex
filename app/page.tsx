import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        padding: "2rem",
        background: "#0b0f19",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Logo / Brand */}
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: 0,
            background: "linear-gradient(135deg, #7c6aff 0%, #22d3ee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Luxionex
        </h1>
        <p
          style={{
            marginTop: "0.5rem",
            color: "#94a3b8",
            fontSize: "1.1rem",
            letterSpacing: "0.05em",
          }}
        >
          Cognitive Intelligence Operating System
        </p>
      </div>

      {/* Capability Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        {[
          { icon: "🤖", title: "Executive Agent", desc: "Orchestrates all agents and decisions" },
          { icon: "🔗", title: "GitHub Connector", desc: "Repo management, issues, and PRs" },
          { icon: "📈", title: "Binance Connector", desc: "Market data and order execution" },
          { icon: "🧠", title: "OpenAI Connector", desc: "Cognitive reasoning and generation" },
          { icon: "🗺️", title: "Planner", desc: "Decomposes goals into executable steps" },
          { icon: "🛡️", title: "Reviewer", desc: "Safety gate before any execution" },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              background: "#131929",
              border: "1px solid #1e2a3a",
              borderRadius: "12px",
              padding: "1.25rem",
            }}
          >
            <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{card.icon}</div>
            <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{card.title}</div>
            <div style={{ color: "#64748b", fontSize: "0.85rem" }}>{card.desc}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/dashboard"
        style={{
          background: "linear-gradient(135deg, #7c6aff 0%, #22d3ee 100%)",
          color: "#fff",
          padding: "0.75rem 2rem",
          borderRadius: "999px",
          fontWeight: 700,
          textDecoration: "none",
          fontSize: "1rem",
          letterSpacing: "0.03em",
        }}
      >
        Open Control Center →
      </Link>

      <footer style={{ color: "#334155", fontSize: "0.75rem" }}>
        Luxionex OS · v0.1.0
      </footer>
    </main>
  );
}
