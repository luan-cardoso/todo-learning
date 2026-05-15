import { apiFetch } from "./api";

export const TASKS_PAGE_SIZE = 9;

export type GetTasksFilters = {
  completed?: boolean;
};

export async function getTasks(
  page = 1,
  limit = TASKS_PAGE_SIZE,
  filters?: GetTasksFilters,
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (filters?.completed !== undefined) {
    params.set("completed", String(filters.completed));
  }
  return apiFetch(`/api/tasks?${params.toString()}`, { auth: true });
}

export async function createTask(data: {
  title: string;
  subject: string;
  description?: string;
  priority?: "low" | "medium" | "high";
}) {
  return apiFetch("/api/tasks", { method: "POST", body: data, auth: true });
}

export async function updateTask(
  id: string,
  data: Partial<{
    title: string;
    subject: string;
    description: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
  }>,
) {
  return apiFetch(`/api/tasks/${id}`, {
    method: "PUT",
    body: data,
    auth: true,
  });
}

export async function deleteTask(id: string) {
  return apiFetch(`/api/tasks/${id}`, { method: "DELETE", auth: true });
}
