export type SystemEvent = {
  id: string;
  type: string;
  source?: string;
  timestamp: number;
  payload?: unknown;
};

export type EventHandler = (event: SystemEvent) => void | Promise<void>;

export class EventBus {
  private handlers = new Map<string, EventHandler[]>();
  private history: SystemEvent[] = [];
  private readonly maxHistory: number;

  constructor(maxHistory = 500) {
    this.maxHistory = maxHistory;
  }

  on(type: string, handler: EventHandler) {
    const existing = this.handlers.get(type) ?? [];
    this.handlers.set(type, [...existing, handler]);
  }

  off(type: string, handler: EventHandler) {
    const existing = this.handlers.get(type) ?? [];
    this.handlers.set(type, existing.filter((h) => h !== handler));
  }

  async emit(type: string, payload?: unknown, source?: string) {
    const event: SystemEvent = {
      id: crypto.randomUUID(),
      type,
      source,
      timestamp: Date.now(),
      payload,
    };

    // store history (rolling window)
    this.history.push(event);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    const handlers = this.handlers.get(type) ?? [];
    await Promise.all(handlers.map((h) => h(event)));

    return event;
  }

  getHistory(type?: string): SystemEvent[] {
    if (type) return this.history.filter((e) => e.type === type);
    return [...this.history];
  }

  clear() {
    this.history = [];
  }
}

export const eventBus = new EventBus();
