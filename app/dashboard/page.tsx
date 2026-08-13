export const dynamic = "force-dynamic";

type AgentCard = {
  id: string;
  name: string;
  status: "active" | "standby" | "offline";
  capabilities: string[];
};

const AGENTS: AgentCard[] = [
  {
    id: "executive",
    name: "Executive Agent",
    status: "active",
    capabilities: ["orchestration", "routing", "decision"],
  },
  {
    id: "development",
    name: "Development Agent",
    status: "standby",
    capabilities: ["code-review", "github", "ci/cd"],
  },
  {
    id: "commerce",
    name: "Commerce Agent",
    status: "standby",
    capabilities: ["binance", "orders", "market-data"],
  },
  {
    id: "marketing",
    name: "Marketing Agent",
    status: "offline",
    capabilities: ["ads", "content", "analytics"],
  },
  {
    id: "operations",
    name: "Operations Agent",
    status: "offline",
    capabilities: ["monitoring", "alerts", "logs"],
  },
];

const STATUS_COLOR: Record<AgentCard["status"], string> = {
  active:  "#22c55e",
  standby: "#eab308",
  offline: "#475569",
};

const STATUS_LABEL: Record<AgentCard["status"], string> = {
  active:  "Active",
  standby: "Standby",
  offline: "Offline",
};

export default function Dashboard() {
  const active  = AGENTS.filter((a) => a.status === "active").length;
  const standby = AGENTS.filter((a) => a.status === "standby").length;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0f19",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "2rem",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 800 }}>
          Luxionex Control Center
        </h1>
        <p style={{ margin: "0.25rem 0 0", color: "#64748b" }}>
          Real-time agent status and system overview
        </p>
      </div>

      {/* Summary bar */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Total Agents", value: AGENTS.length, color: "#7c6aff" },
          { label: "Active",        value: active,        color: "#22c55e" },
          { label: "Standby",       value: standby,       color: "#eab308" },
          { label: "Offline",       value: AGENTS.length - active - standby, color: "#475569" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#131929",
              border: "1px solid #1e2a3a",
              borderRadius: "10px",
              padding: "1rem 1.5rem",
              minWidth: "120px",
            }}
          >
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.25rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Agent Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {AGENTS.map((agent) => (
          <div
            key={agent.id}
            style={{
              background: "#131929",
              border: "1px solid #1e2a3a",
              borderRadius: "12px",
              padding: "1.25rem",
            }}
          >
            {/* Status dot + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: STATUS_COLOR[agent.status],
                  flexShrink: 0,
                  boxShadow: agent.status === "active" ? `0 0 6px ${STATUS_COLOR[agent.status]}` : "none",
                }}
              />
              <span style={{ fontWeight: 700 }}>{agent.name}</span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "0.7rem",
                  color: STATUS_COLOR[agent.status],
                  background: `${STATUS_COLOR[agent.status]}22`,
                  padding: "2px 8px",
                  borderRadius: "999px",
                  fontWeight: 600,
                }}
              >
                {STATUS_LABEL[agent.status]}
              </span>
            </div>

            {/* Capabilities */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {agent.capabilities.map((cap) => (
                <span
                  key={cap}
                  style={{
                    fontSize: "0.72rem",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    background: "#1e2a3a",
                    color: "#94a3b8",
                  }}
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Connectors section */}
      <div style={{ marginTop: "2.5rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", color: "#94a3b8" }}>
          Registered Connectors
        </h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {["github", "binance", "openai"].map((name) => (
            <div
              key={name}
              style={{
                background: "#131929",
                border: "1px solid #1e2a3a",
                borderRadius: "8px",
                padding: "0.6rem 1.2rem",
                fontSize: "0.9rem",
                color: "#7c6aff",
                fontWeight: 600,
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <footer style={{ marginTop: "3rem", color: "#334155", fontSize: "0.75rem" }}>
        Luxionex OS · v0.1.0
      </footer>
    </main>
  );
}
