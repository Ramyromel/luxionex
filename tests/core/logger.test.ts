import { Logger } from "@/core/logger/Logger";

describe("Logger", () => {
  it("records log entries at or above the min level", () => {
    const log = new Logger("warn");
    log.debug("ignored");
    log.info("also ignored");
    log.warn("recorded");
    log.error("also recorded");

    const entries = log.getEntries();
    expect(entries).toHaveLength(2);
    expect(entries[0].level).toBe("warn");
    expect(entries[1].level).toBe("error");
  });

  it("records message and data correctly", () => {
    const log = new Logger("debug");
    log.info("hello", { x: 1 });

    const [entry] = log.getEntries();
    expect(entry.message).toBe("hello");
    expect(entry.data).toEqual({ x: 1 });
  });

  it("child logger adds context", () => {
    const log = new Logger("debug");
    const child = log.child("MyService");
    child.info("from child");

    const [entry] = log.getEntries();
    expect(entry.context).toBe("MyService");
  });

  it("clear() empties entries", () => {
    const log = new Logger("debug");
    log.info("a");
    log.clear();
    expect(log.getEntries()).toHaveLength(0);
  });
});
