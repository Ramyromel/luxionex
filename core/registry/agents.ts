import type { Agent } from "@/core/interfaces/agent";

class AgentRegistry {
  private readonly agents = new Map<string, Agent>();

  register(agent: Agent): void {
    this.agents.set(agent.id, agent);
  }

  unregister(id: string): boolean {
    return this.agents.delete(id);
  }

  get(id: string): Agent | undefined {
    return this.agents.get(id);
  }

  list(): Agent[] {
    return Array.from(this.agents.values());
  }

  clear(): void {
    this.agents.clear();
  }
}

export const agentRegistry = new AgentRegistry();
