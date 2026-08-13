import type { Connector } from "@/core/interfaces/connector";

export class ConnectorRegistry {
  private connectors = new Map<string, Connector>();

  register(connector: Connector) {
    this.connectors.set(connector.name, connector);
  }

  get(name: string) {
    return this.connectors.get(name);
  }

  list() {
    return [...this.connectors.keys()];
  }
}

export const connectorRegistry = new ConnectorRegistry();
