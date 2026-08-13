export type TraceEvent = {
  id: string;
  type: string;
  payload?: unknown;
  stage: "request" | "decision" | "execution" | "error";
  timestamp: number;
  meta?: Record<string, any>;
};

export class TraceLogger {
  private traces: TraceEvent[] = [];

  start(type: string, payload?: unknown) {
    const id = crypto.randomUUID();

    const event: TraceEvent = {
      id,
      type,
      payload,
      stage: "request",
      timestamp: Date.now(),
    };

    this.traces.push(event);
    return id;
  }

  update(id: string, stage: TraceEvent["stage"], meta?: any) {
    this.traces.push({
      id,
      type: "trace-update",
      stage,
      timestamp: Date.now(),
      meta,
    });
  }

  getAll() {
    return this.traces;
  }
}

export const traceLogger = new TraceLogger();
