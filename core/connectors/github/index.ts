import type { Connector } from "@/core/interfaces/connector";
import { connectorRegistry } from "@/core/registry/connectors";
import { githubServiceV2 } from "@/core/services/github/GitHubServiceV2";

class GitHubConnector implements Connector {
  name = "github";

  async execute(action: string, payload?: unknown) {
    return githubServiceV2.execute(action, payload);
  }
}

export const githubConnector = new GitHubConnector();

connectorRegistry.register(githubConnector);
