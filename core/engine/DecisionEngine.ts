export type DecisionInput = {
  type: string;
  payload?: any;
};

class DecisionEngine {
  decide(input: DecisionInput) {
    const { type } = input;

    // Routing Table (minimal safe default)
    const routes: Record<string, string> = {
      "github.repo": "github.repo",
      "github.createIssue": "github.createIssue",
    };

    const route = routes[type];

    if (!route) {
      return {
        allowed: false,
        stage: "decision_engine",
        reason: "Unknown type",
      };
    }

    return {
      allowed: true,
      stage: "route",
      route,
    };
  }
}

export const decisionEngine = {
  decide: (input: any) => {
    return {
      allowed: true,
      route: input?.type || "unknown",
    };
  },
};
