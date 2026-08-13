import { Reviewer } from "@/core/reviewer/Reviewer";
import { Planner } from "@/core/planner/Planner";

describe("Reviewer", () => {
  const reviewer = new Reviewer();
  const planner = new Planner();

  it("passes a normal github list plan", () => {
    const plan = planner.plan({ goal: "list github issues" });
    const result = reviewer.review(plan);
    expect(result.passed).toBe(true);
    expect(result.severity).toBe("ok");
  });

  it("blocks deleteRepo action", () => {
    const plan = planner.plan({ goal: "some goal" });
    plan.steps = [
      {
        id: "s1",
        type: "github.deleteRepo",
        connector: "github",
        action: "deleteRepo",
      },
    ];
    const result = reviewer.review(plan);
    expect(result.passed).toBe(false);
    expect(result.severity).toBe("blocked");
    expect(result.findings[0].code).toBe("BLOCKED_ACTION");
  });

  it("warns on risky delete action", () => {
    const plan = planner.plan({ goal: "some goal" });
    plan.steps = [
      {
        id: "s1",
        type: "github.delete",
        connector: "github",
        action: "delete",
      },
    ];
    const result = reviewer.review(plan);
    expect(result.passed).toBe(true);
    expect(result.severity).toBe("warning");
  });

  it("blocks binance step without payload", () => {
    const plan = planner.plan({ goal: "some goal" });
    plan.steps = [
      {
        id: "s1",
        type: "binance.order",
        connector: "binance",
        action: "order",
        payload: undefined,
      },
    ];
    const result = reviewer.review(plan);
    expect(result.passed).toBe(false);
  });

  it("blocks github createIssue without title", () => {
    const plan = planner.plan({ goal: "some goal" });
    plan.steps = [
      {
        id: "s1",
        type: "github.createIssue",
        connector: "github",
        action: "createIssue",
        payload: {},
      },
    ];
    const result = reviewer.review(plan);
    expect(result.passed).toBe(false);
    expect(result.findings[0].code).toBe("MISSING_TITLE");
  });
});
