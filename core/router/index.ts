import { connectorRegistry } from "@/core/registry/connectors";
import { decisionEngine } from "@/core/decision/DecisionEngine";

class Router {

  async dispatch(type: string, payload?: any) {
    const [connector, action] = type.split(".");

    const decision = await decisionEngine.evaluate({
      connector,
      action,
      payload,
    });

    if (!decision.allow) {
      return {
        ok: false,
        stage: "decision",
        reason: decision.reason,
      };
    }

    const target = connectorRegistry.get(connector);

    if (!target) {
      return {
        ok: false,
        stage: "router",
        reason: "Connector not found",
      };
    }

    return target.execute(action, payload);
  }

}

export const router = new Router();
