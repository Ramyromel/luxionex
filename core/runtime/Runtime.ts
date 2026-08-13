import { logger } from "@/core/logger";
import { eventBus } from "@/core/events";
import { planner } from "@/core/planner";
import { reviewer } from "@/core/reviewer";
import { connectorRegistry } from "@/core/registry/connectors";
import type { PlanInput } from "@/core/planner";

export type RuntimeStatus = "idle" | "running" | "stopped";

export type ExecutionResult = {
  success: boolean;
  planId: string;
  goal: string;
  results: unknown[];
  blockedBy?: string;
  durationMs: number;
};

const log = logger.child("Runtime");

export class Runtime {
  private status: RuntimeStatus = "idle";

  getStatus(): RuntimeStatus {
    return this.status;
  }

  async run(input: PlanInput): Promise<ExecutionResult> {
    const start = Date.now();
    this.status = "running";

    await eventBus.emit("runtime.start", { goal: input.goal }, "Runtime");

    const plan = planner.plan(input);
    log.info(`Executing plan`, { planId: plan.id, steps: plan.steps.length });

    const review = reviewer.review(plan);

    if (!review.passed) {
      this.status = "idle";
      const reason = review.findings.map((f) => f.message).join("; ");
      log.warn(`Plan blocked by reviewer`, { planId: plan.id, reason });

      await eventBus.emit("runtime.blocked", { planId: plan.id, reason }, "Runtime");

      return {
        success: false,
        planId: plan.id,
        goal: input.goal,
        results: [],
        blockedBy: reason,
        durationMs: Date.now() - start,
      };
    }

    const results: unknown[] = [];

    for (const step of plan.steps) {
      const connector = connectorRegistry.get(step.connector);

      if (!connector) {
        log.warn(`Connector not found: ${step.connector}`, { stepId: step.id });
        results.push({ stepId: step.id, error: `Connector '${step.connector}' not found` });
        continue;
      }

      try {
        const result = await connector.execute(step.action, step.payload);
        results.push({ stepId: step.id, ok: true, result });
        await eventBus.emit("runtime.step.done", { stepId: step.id, result }, "Runtime");
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        log.error(`Step failed: ${step.id}`, { message });
        results.push({ stepId: step.id, ok: false, error: message });
        await eventBus.emit("runtime.step.error", { stepId: step.id, error: message }, "Runtime");
      }
    }

    this.status = "idle";
    const durationMs = Date.now() - start;

    const allOk = results.every((r) => (r as Record<string, unknown>).ok !== false);

    await eventBus.emit("runtime.done", { planId: plan.id, durationMs, allOk }, "Runtime");

    return {
      success: allOk,
      planId: plan.id,
      goal: input.goal,
      results,
      durationMs,
    };
  }
}

export const runtime = new Runtime();
