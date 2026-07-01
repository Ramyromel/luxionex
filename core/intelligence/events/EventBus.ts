export type CognitiveEvent = {
  id: string;
  type: string;
  timestamp: number;
  payload?: unknown;
};

export class EventBus {
  private events: CognitiveEvent[] = [];

  emit(event: CognitiveEvent) {
    this.events.push(event);
  }

  all() {
    return this.events;
  }

  clear() {
    this.events = [];
  }
}

export const eventBus = new EventBus();
