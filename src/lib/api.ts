import { notifyAuthChange } from "./authSession";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function getToken() {
  return localStorage.getItem("token");
}

type FetchOptions = {
  method?: string;
  body?: object;
  auth?: boolean;
};

export async function apiFetch(path: string, options: FetchOptions = {}) {
  const { method = "GET", body, auth = false } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  };

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // intercepta 401 e limpa sessão
  if (res.status === 401) {
    const hadToken = !!localStorage.getItem("token");
    localStorage.removeItem("token");
    if (hadToken) notifyAuthChange(); // só notifica se havia sessão ativa
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  const text = await res.text();
  let data: Record<string, unknown> = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Erro ${res.status}`);
  }

  if (!res.ok) {
    throw new Error(
      typeof data.message === "string" ? data.message : `Erro ${res.status}`,
    );
  }

  return data;
}
