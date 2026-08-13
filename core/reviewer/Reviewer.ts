import { logger } from "@/core/logger";
import type { Plan } from "@/core/planner";

export type ReviewSeverity = "ok" | "warning" | "blocked";

export type ReviewFinding = {
  code: string;
  message: string;
  severity: ReviewSeverity;
};

export type ReviewResult = {
  passed: boolean;
  severity: ReviewSeverity;
  findings: ReviewFinding[];
  reviewedAt: number;
};

const BLOCKED_ACTIONS = new Set(["deleteRepo", "transferOwnership", "wipe", "drop"]);
const RISKY_ACTIONS  = new Set(["delete", "remove", "archive"]);

const log = logger.child("Reviewer");

export class Reviewer {
  review(plan: Plan): ReviewResult {
    const findings: ReviewFinding[] = [];

    for (const step of plan.steps) {
      // hard blocks
      if (BLOCKED_ACTIONS.has(step.action)) {
        findings.push({
          code: "BLOCKED_ACTION",
          message: `Action '${step.action}' on '${step.connector}' is prohibited`,
          severity: "blocked",
        });
        continue;
      }

      // risky actions → warn
      if (RISKY_ACTIONS.has(step.action)) {
        findings.push({
          code: "RISKY_ACTION",
          message: `Action '${step.action}' on '${step.connector}' is potentially destructive`,
          severity: "warning",
        });
      }

      // Binance: require payload
      if (step.connector === "binance" && !step.payload) {
        findings.push({
          code: "MISSING_PAYLOAD",
          message: `Binance action '${step.action}' requires a payload`,
          severity: "blocked",
        });
      }

      // GitHub createIssue: require title
      if (step.connector === "github" && step.action === "createIssue") {
        const p = step.payload as Record<string, unknown> | undefined;
        if (!p?.title) {
          findings.push({
            code: "MISSING_TITLE",
            message: "GitHub createIssue requires a 'title' field in payload",
            severity: "blocked",
          });
        }
      }
    }

    const maxSeverity: ReviewSeverity = findings.some((f) => f.severity === "blocked")
      ? "blocked"
      : findings.some((f) => f.severity === "warning")
      ? "warning"
      : "ok";

    const result: ReviewResult = {
      passed: maxSeverity !== "blocked",
      severity: maxSeverity,
      findings,
      reviewedAt: Date.now(),
    };

    log.info(`Review ${result.passed ? "passed" : "blocked"} — ${findings.length} finding(s)`, {
      planId: plan.id,
      severity: maxSeverity,
    });

    return result;
  }
}

export const reviewer = new Reviewer();
