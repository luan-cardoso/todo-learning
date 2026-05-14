import { apiFetch } from "./api";

export async function getTasks(page = 1, limit = 9) {
  return apiFetch(`/api/tasks?page=${page}&limit=${limit}`, { auth: true });
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
