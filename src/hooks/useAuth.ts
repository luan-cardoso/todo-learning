import { logout } from "../lib/auth";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
