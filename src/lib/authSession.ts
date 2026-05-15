type Listener = () => void;

const listeners = new Set<Listener>();

export function subscribeAuth(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function notifyAuthChange() {
  listeners.forEach((listener) => listener());
}

export function getAuthToken() {
  return localStorage.getItem("token");
}
