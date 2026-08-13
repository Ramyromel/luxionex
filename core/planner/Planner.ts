import { logger } from "@/core/logger";

export type PlanStep = {
  id: string;
  type: string;
  connector: string;
  action: string;
  payload?: unknown;
  dependsOn?: string[];
};

export type Plan = {
  id: string;
  goal: string;
  steps: PlanStep[];
  createdAt: number;
};

export type PlanInput = {
  goal: string;
  context?: Record<string, unknown>;
};

const log = logger.child("Planner");

export class Planner {
  plan(input: PlanInput): Plan {
    const { goal, context } = input;

    log.info(`Planning goal: ${goal}`, context);

    const steps = this.decompose(goal, context);

    const plan: Plan = {
      id: crypto.randomUUID(),
      goal,
      steps,
      createdAt: Date.now(),
    };

    log.debug(`Plan created with ${steps.length} step(s)`, { planId: plan.id });
    return plan;
  }

  private decompose(goal: string, context?: Record<string, unknown>): PlanStep[] {
    const lower = goal.toLowerCase();

    if (lower.includes("github") || lower.includes("issue")) {
      return [
        {
          id: crypto.randomUUID(),
          type: "github.issues",
          connector: "github",
          action: "issues",
          payload: context,
        },
      ];
    }

    if (lower.includes("binance") || lower.includes("market") || lower.includes("price")) {
      return [
        {
          id: crypto.randomUUID(),
          type: "binance.ticker",
          connector: "binance",
          action: "ticker",
          payload: context,
        },
      ];
    }

    if (lower.includes("chat") || lower.includes("openai") || lower.includes("ask")) {
      return [
        {
          id: crypto.randomUUID(),
          type: "openai.chat",
          connector: "openai",
          action: "chat",
          payload: { message: goal, ...context },
        },
      ];
    }

    // generic single-step plan
    return [
      {
        id: crypto.randomUUID(),
        type: "agent.execute",
        connector: "executive",
        action: "execute",
        payload: { goal, ...context },
      },
    ];
  }
}

export const planner = new Planner();
