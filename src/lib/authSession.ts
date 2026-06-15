type Listener = () => void;

const listeners = new Set<Listener>();

export function subscribeAuth(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function notifyAuthChange() {
  listeners.forEach((listener) => listener());
}

//valida expiração antes de retornar o token
export function getAuthToken(): string | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
  } catch {
    localStorage.removeItem("token");
    return null;
  }

  return token;
}
