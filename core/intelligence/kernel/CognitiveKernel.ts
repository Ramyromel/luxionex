import { eventBus } from "../events/EventBus";
import { memoryStore } from "../memory/MemoryStore";

export class CognitiveKernel {
  async process(type: string, payload?: unknown) {
    eventBus.emit({
      id: crypto.randomUUID(),
      type,
      timestamp: Date.now(),
      payload,
    });

    memoryStore.set("last_event", {
      type,
      payload,
      at: Date.now(),
    });

    return {
      success: true,
      kernel: "v0.1",
      type,
    };
  }
}

export const cognitiveKernel = new CognitiveKernel();
