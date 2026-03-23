import { create } from "zustand";
import type { Task } from "../types/task";

const loadTasks = (): Task[] => {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
};

export const useTaskStore = create<{
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}>((set) => ({
  tasks: loadTasks(),

  addTask: (task) =>
    set((state) => {
      const updated = [...state.tasks, task];
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  updateTask: (updatedTask) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  deleteTask: (id) =>
    set((state) => {
      const updated = state.tasks.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),
}));