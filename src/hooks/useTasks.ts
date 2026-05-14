import { useState, useEffect } from "react";
import { getTasks, updateTask } from "../lib/tasks";

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then((res) => {
      setTasks(res.data);
    });
  }, []);

  async function handleToggle(id: string, completed: boolean) {
    await updateTask(id, { completed: !completed });
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: !completed } : t)),
    );
  }

  function refetch() {
    getTasks().then((res) => setTasks(res.data));
  }

  return { tasks, handleToggle, refetch };
}
