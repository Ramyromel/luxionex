export type MemoryEntry = {
  key: string;
  value: unknown;
  ttl?: number;        // milliseconds, undefined = permanent
  createdAt: number;
  updatedAt: number;
};

export class MemoryStore {
  private state = new Map<string, MemoryEntry>();

  set(key: string, value: unknown, ttl?: number) {
    const now = Date.now();
    this.state.set(key, {
      key,
      value,
      ttl,
      createdAt: this.state.get(key)?.createdAt ?? now,
      updatedAt: now,
    });
  }

  get<T = unknown>(key: string): T | undefined {
    const entry = this.state.get(key);
    if (!entry) return undefined;

    // TTL is checked against createdAt so the expiry window is fixed from creation time
    if (entry.ttl !== undefined && Date.now() - entry.createdAt > entry.ttl) {
      this.state.delete(key);
      return undefined;
    }

    return entry.value as T;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: string): boolean {
    return this.state.delete(key);
  }

  keys(): string[] {
    return [...this.state.keys()];
  }

  snapshot(): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const key of this.keys()) {
      const val = this.get(key);
      if (val !== undefined) result[key] = val;
    }
    return result;
  }

  clear() {
    this.state.clear();
  }
}

export const memoryStore = new MemoryStore();
