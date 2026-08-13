export class MemoryStore {
  private state: Record<string, any> = {};

  set(key: string, value: any) {
    this.state[key] = value;
  }

  get(key: string) {
    return this.state[key];
  }

  snapshot() {
    return { ...this.state };
  }
}

export const memoryStore = new MemoryStore();
