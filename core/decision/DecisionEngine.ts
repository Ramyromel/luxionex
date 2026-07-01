export type DecisionContext = {
  connector: string;
  action: string;
  payload?: unknown;
};

export type DecisionResult = {
  allow: boolean;
  reason?: string;
  modifiedAction?: string;
  modifiedPayload?: unknown;
};

export class DecisionEngine {
  async evaluate(ctx: DecisionContext): Promise<DecisionResult> {
    const { connector, action } = ctx;

    // 1. حماية أساسية (Safety Gate)
    if (!connector || !action) {
      return {
        allow: false,
        reason: "Invalid execution context",
      };
    }

    // 2. حظر عمليات خطرة افتراضيًا (Guard Layer)
    const blockedActions = ["deleteRepo", "transferOwnership", "wipe"];
    if (blockedActions.includes(action)) {
      return {
        allow: false,
        reason: "Action blocked by policy layer",
      };
    }

    // 3. Binance risk gate (placeholder control)
    if (connector === "binance") {
      if (!ctx.payload) {
        return {
          allow: false,
          reason: "Binance requires payload validation",
        };
      }
    }

    // 4. GitHub soft rules
    if (connector === "github" && action === "createIssue") {
      const p = ctx.payload as any;
      if (!p?.title) {
        return {
          allow: false,
          reason: "Issue title required",
        };
      }
    }

    // 5. Default allow
    return { allow: true };
  }
}

export const decisionEngine = new DecisionEngine();
