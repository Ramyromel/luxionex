import type { Service } from "@/core/interfaces/service";

export class BinanceService implements Service {
  name = "binance";

  async execute(action: string, payload?: unknown) {
    console.log("[BinanceService]", action, payload);

    return {
      success: true,
      service: this.name,
      action,
      payload,
    };
  }
}

export const binanceService = new BinanceService();
