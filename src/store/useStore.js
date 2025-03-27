import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";

const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],

      addTask: (title, category, priority, deadline) =>
        set(
          produce((state) => {
            state.tasks.push({
              id: Date.now(),
              title,
              category,
              priority,
              deadline,
              completed: false,
            });
          })
        ),

      toggleTask: (id) =>
        set(
          produce((state) => {
            const task = state.tasks.find((t) => t.id === id);
            if (task) task.completed = !task.completed;
          })
        ),

      removeTask: (id) =>
        set(
          produce((state) => {
            state.tasks = state.tasks.filter((task) => task.id !== id);
          })
        ),

      editTask: (id, newTitle, newCategory, newPriority, newDeadline) =>
        set(
          produce((state) => {
            const task = state.tasks.find((t) => t.id === id);
            if (task) {
              task.title = newTitle;
              task.category = newCategory;
              task.priority = newPriority;
              task.deadline = newDeadline;
            }
          })
        ),
    }),
    { name: "task-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useTaskStore;
