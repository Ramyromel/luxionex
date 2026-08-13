export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogEntry = {
  level: LogLevel;
  message: string;
  context?: string;
  timestamp: number;
  data?: unknown;
};

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export class Logger {
  private entries: LogEntry[] = [];
  private minLevel: LogLevel;

  constructor(minLevel: LogLevel = "info") {
    this.minLevel = minLevel;
  }

  private log(level: LogLevel, message: string, data?: unknown, context?: string) {
    if (LEVELS[level] < LEVELS[this.minLevel]) return;

    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: Date.now(),
      data,
    };

    this.entries.push(entry);

    const prefix = context ? `[${context}]` : "";
    const line = `[${level.toUpperCase()}]${prefix} ${message}`;

    if (level === "error") console.error(line, data ?? "");
    else if (level === "warn") console.warn(line, data ?? "");
    else console.log(line, data ?? "");
  }

  debug(message: string, data?: unknown, context?: string) {
    this.log("debug", message, data, context);
  }

  info(message: string, data?: unknown, context?: string) {
    this.log("info", message, data, context);
  }

  warn(message: string, data?: unknown, context?: string) {
    this.log("warn", message, data, context);
  }

  error(message: string, data?: unknown, context?: string) {
    this.log("error", message, data, context);
  }

  child(context: string): ContextLogger {
    return new ContextLogger(this, context);
  }

  getEntries(): LogEntry[] {
    return [...this.entries];
  }

  clear() {
    this.entries = [];
  }
}

export class ContextLogger {
  constructor(private readonly logger: Logger, private readonly context: string) {}

  debug(message: string, data?: unknown) { this.logger.debug(message, data, this.context); }
  info(message: string, data?: unknown)  { this.logger.info(message, data, this.context); }
  warn(message: string, data?: unknown)  { this.logger.warn(message, data, this.context); }
  error(message: string, data?: unknown) { this.logger.error(message, data, this.context); }
}

export const logger = new Logger(
  (process.env.LOG_LEVEL as LogLevel | undefined) ?? "info"
);
