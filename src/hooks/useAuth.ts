import { useSyncExternalStore } from "react";
import { logout } from "../lib/auth";
import { getAuthToken, subscribeAuth } from "../lib/authSession";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const token = useSyncExternalStore(
    subscribeAuth,
    getAuthToken,
    () => null,
  );

  // Pega o nome do usuário do token JWT (payload)
  let userName: string | null = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userName = payload.name ?? null;
    } catch {
      userName = null;
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return { userName, handleLogout };
}
