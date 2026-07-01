import type { Connector } from "@/core/interfaces/connector";
import { connectorRegistry } from "@/core/registry/connectors";
import { binanceService } from "@/core/services/binance";

class BinanceConnector implements Connector {
  name = "binance";

  async execute(action: string, payload?: unknown) {
    return binanceService.execute(action, payload);
  }
}

export const binanceConnector = new BinanceConnector();

connectorRegistry.register(binanceConnector);
