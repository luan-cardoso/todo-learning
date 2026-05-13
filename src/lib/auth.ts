import { apiFetch } from "./api";

export async function register(name: string, email: string, password: string) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: { name, email, password },
  });
}

export async function login(email: string, password: string) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });

  localStorage.setItem("token", data.data.token);
  return data;
}

export function logout() {
  localStorage.removeItem("token");
}
