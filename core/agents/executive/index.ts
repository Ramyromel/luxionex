import "@/core/connectors/github";
import { openaiConnector } from "@/core/connectors/openai";
import "@/core/connectors/binance";
import { router } from "@/core/router";

export class ExecutiveAgent {
  async execute(type: string, payload?: unknown) {
    return router.dispatch(type, payload);
  }
}

export const executiveAgent = {
  execute: async (route: string, payload: any) => {
    return {
      ok: true,
      route,
      payload: payload || {},
    };
  },
};
