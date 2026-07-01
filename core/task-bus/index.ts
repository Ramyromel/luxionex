export type Task = {
  id: string;
  type: string;
  payload?: unknown;
};

export class TaskBus {
  dispatch(task: Task) {
    console.log(`[TaskBus] ${task.type}`, task.payload);
    return {
      success: true,
      task,
    };
  }
}

export const taskBus = new TaskBus();
