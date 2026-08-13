import { MemoryStore } from "./store";

export class SessionMemory extends MemoryStore {
  private readonly sessionId: string;

  constructor(sessionId?: string) {
    super();
    this.sessionId = sessionId ?? crypto.randomUUID();
  }

  getSessionId(): string {
    return this.sessionId;
  }
}

export function createSession(id?: string): SessionMemory {
  return new SessionMemory(id);
}
