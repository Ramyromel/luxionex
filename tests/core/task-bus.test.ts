import { TaskBus } from "@/core/task-bus/index";

describe("TaskBus", () => {
  it("dispatches a task and returns success", () => {
    const bus = new TaskBus();
    const result = bus.dispatch({ id: "1", type: "test.action", payload: { x: 42 } });
    expect(result.success).toBe(true);
    expect(result.task.type).toBe("test.action");
  });

  it("reflects the task payload in the result", () => {
    const bus = new TaskBus();
    const payload = { value: "hello" };
    const result = bus.dispatch({ id: "2", type: "foo.bar", payload });
    expect(result.task.payload).toEqual(payload);
  });
});
