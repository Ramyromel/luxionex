import {
  agentRegistry,
} from "@/core/registry/agents";

import type {
  AgentTask,
} from "@/core/interfaces/agent";

export class AgentManager {

  get(id: string) {
    return agentRegistry.get(id);
  }

  list() {
    return agentRegistry.list();
  }

  async execute(
    id: string,
    type: string,
    payload?: unknown,
  ) {
    const agent = this.get(id);

    if (!agent) {
      return {
        success: false,
        error: `Agent '${id}' not found`,
      };
    }

    const task: AgentTask = {
      id: Date.now().toString(),
      type,
      payload,
    };

    return agent.execute(task);
  }
}

export const agentManager = new AgentManager();
