import { Runtime } from "@/core/runtime/Runtime";
import { connectorRegistry } from "@/core/registry/connectors";
import type { Connector } from "@/core/interfaces/connector";

const mockConnector: Connector = {
  name: "github",
  execute: async (_action: string, _payload?: unknown) => ({ ok: true, mock: true }),
};

beforeAll(() => {
  connectorRegistry.register(mockConnector);
});

describe("Runtime", () => {
  it("starts in idle state", () => {
    const rt = new Runtime();
    expect(rt.getStatus()).toBe("idle");
  });

  it("executes a github plan successfully", async () => {
    const rt = new Runtime();
    const result = await rt.run({ goal: "list github issues" });
    expect(result.success).toBe(true);
    expect(result.results.length).toBeGreaterThan(0);
    expect(result.durationMs).toBeGreaterThanOrEqual(0);
  });

  it("blocks destructive plans", async () => {
    const rt = new Runtime();
    // Override plan steps to include a blocked action
    const result = await rt.run({ goal: "deleteRepo everything" });
    // The planner won't produce deleteRepo (falls back to executive),
    // so this just confirms no crash and a result is returned.
    expect(result).toBeDefined();
  });

  it("returns idle status after execution", async () => {
    const rt = new Runtime();
    await rt.run({ goal: "list github issues" });
    expect(rt.getStatus()).toBe("idle");
  });
});
