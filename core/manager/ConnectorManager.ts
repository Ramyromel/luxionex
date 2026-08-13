import { connectorRegistry } from "@/core/registry/connectors";
import type { Connector } from "@/core/interfaces/connector";
import { logger } from "@/core/logger";

const log = logger.child("ConnectorManager");

export class ConnectorManager {
  register(connector: Connector) {
    connectorRegistry.register(connector);
    log.info(`Connector registered: ${connector.name}`);
  }

  get(name: string): Connector | undefined {
    return connectorRegistry.get(name);
  }

  list(): string[] {
    return connectorRegistry.list();
  }

  async execute(connectorName: string, action: string, payload?: unknown): Promise<unknown> {
    const connector = this.get(connectorName);

    if (!connector) {
      log.error(`Connector not found: ${connectorName}`);
      return { ok: false, error: `Connector '${connectorName}' not registered` };
    }

    log.debug(`Executing ${connectorName}.${action}`, payload);
    return connector.execute(action, payload);
  }
}

export const connectorManager = new ConnectorManager();
