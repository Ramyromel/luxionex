import { Planner } from "@/core/planner/Planner";

describe("Planner", () => {
  const planner = new Planner();

  it("returns a plan with an id and goal", () => {
    const plan = planner.plan({ goal: "test goal" });
    expect(plan.id).toBeTruthy();
    expect(plan.goal).toBe("test goal");
    expect(plan.steps.length).toBeGreaterThan(0);
  });

  it("routes github goals to github connector", () => {
    const plan = planner.plan({ goal: "list github issues" });
    expect(plan.steps[0].connector).toBe("github");
  });

  it("routes binance goals to binance connector", () => {
    const plan = planner.plan({ goal: "get binance market price" });
    expect(plan.steps[0].connector).toBe("binance");
  });

  it("routes openai/chat goals to openai connector", () => {
    const plan = planner.plan({ goal: "ask openai about weather" });
    expect(plan.steps[0].connector).toBe("openai");
  });

  it("falls back to executive connector for unknown goals", () => {
    const plan = planner.plan({ goal: "do something unrecognized" });
    expect(plan.steps[0].connector).toBe("executive");
  });
});
