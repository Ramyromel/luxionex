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

  it("blocks plans with destructive actions via the reviewer", async () => {
    const rt = new Runtime();

    // Monkey-patch the planner inside this runtime instance to inject a blocked step
    const { planner } = await import("@/core/planner");
    const originalPlan = planner.plan.bind(planner);

    planner.plan = () => ({
      id: "test-blocked",
      goal: "delete everything",
      steps: [
        {
          id: "s1",
          type: "github.deleteRepo",
          connector: "github",
          action: "deleteRepo",
        },
      ],
      createdAt: Date.now(),
    });

    try {
      const result = await rt.run({ goal: "delete everything" });
      expect(result.success).toBe(false);
      expect(result.blockedBy).toBeTruthy();
    } finally {
      planner.plan = originalPlan;
    }
  });

  it("returns idle status after execution", async () => {
    const rt = new Runtime();
    await rt.run({ goal: "list github issues" });
    expect(rt.getStatus()).toBe("idle");
  });
});
