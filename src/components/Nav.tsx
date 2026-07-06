import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import {
  faArrowRightFromBracket,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface NavProps {
  onAddClick?: () => void;
}

export default function Nav({ onAddClick }: NavProps) {
  const { userName, handleLogout } = useAuth();

  return (
    <div className=" mx-auto max-w-6xl flex items-center justify-between w-full py-6">
      <h1 className="font-semibold">todo learning</h1>
      <div className="flex items-center gap-4">
        <span className="flex items-center text-sm font-medium  bg-black/25 ring-1  ring-blue-200/50 rounded-xl py-2 px-4 shadow-2xl">
          {userName ? userName : <NavLink to="/login">Login</NavLink>}
        </span>
        {userName && (
          <Button buttonLabel="Adicionar" icon={faPlus} onClick={onAddClick} />
        )}
        {userName && (
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Sair da conta"
            className="text-neutral-300 hover:text-blue-200 transition-colors cursor-pointer p-1"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
          </button>
        )}
      </div>
    </div>
  );
}
