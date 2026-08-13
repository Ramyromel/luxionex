export type AgentStatus =
  | "idle"
  | "busy"
  | "offline"
  | "error";

export interface AgentTask {
  id: string;
  type: string;
  payload?: unknown;
}

export interface AgentResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

export interface Agent {
  id: string;

  name: string;

  description: string;

  version: string;

  status: AgentStatus;

  capabilities: string[];

  initialize(): Promise<void>;

  shutdown(): Promise<void>;

  canHandle(task: AgentTask): boolean;

  execute(task: AgentTask): Promise<AgentResult>;
}
