import OpenAI from "openai";
import type { Connector } from "@/core/interfaces/connector";
import { connectorRegistry } from "@/core/registry/connectors";
import { logger } from "@/core/logger";
import { env } from "@/core/services/env";

const log = logger.child("OpenAIConnector");

class OpenAIConnector implements Connector {
  name = "openai";

  private client: OpenAI | null = null;

  private getClient(): OpenAI {
    if (!this.client) {
      if (!env.openai.apiKey) {
        throw new Error("OPENAI_API_KEY is not configured.");
      }
      this.client = new OpenAI({ apiKey: env.openai.apiKey });
    }
    return this.client;
  }

  async execute(action: string, payload?: unknown): Promise<unknown> {
    switch (action) {
      case "chat":
        return this.chat(payload);
      case "models":
        return this.listModels();
      default:
        return { ok: false, error: `Unknown OpenAI action: ${action}` };
    }
  }

  private async chat(payload?: unknown): Promise<unknown> {
    const p = (payload ?? {}) as Record<string, unknown>;
    const message = (p.message as string) ?? "";
    const model = (p.model as string) ?? "gpt-4o-mini";

    if (!message) {
      return { ok: false, error: "chat requires a 'message' field" };
    }

    log.debug("chat request", { model, message: message.slice(0, 80) });

    try {
      const response = await this.getClient().chat.completions.create({
        model,
        messages: [{ role: "user", content: message }],
      });

      const content = response.choices[0]?.message?.content ?? "";
      return { ok: true, content, model, usage: response.usage };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      log.error("chat failed", msg);
      return { ok: false, error: msg };
    }
  }

  private async listModels(): Promise<unknown> {
    try {
      const models = await this.getClient().models.list();
      return { ok: true, models: models.data.map((m) => m.id) };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      log.error("listModels failed", msg);
      return { ok: false, error: msg };
    }
  }
}

export const openaiConnector = new OpenAIConnector();

connectorRegistry.register(openaiConnector);
