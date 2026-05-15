import { apiFetch } from "./api";
import { notifyAuthChange } from "./authSession";

export async function register(name: string, email: string, password: string) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: { name, email, password },
  });
}

function readAuthToken(data: Record<string, unknown>): string {
  const payload = data.data;
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    const token = (payload as Record<string, unknown>).token;
    if (typeof token === "string" && token.length > 0) return token;
  }
  throw new Error("Resposta de login inválida");
}

export async function login(email: string, password: string) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });

  localStorage.setItem("token", readAuthToken(data));
  notifyAuthChange();
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  notifyAuthChange();
}
