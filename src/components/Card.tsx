import type { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type Priority = "low" | "medium" | "high";

interface CardProps {
  title: string;
  subject: string;
  description: string;
  date: string;
  completed: boolean;
  priority: Priority;
  onToggle: () => void;
  onDelete: () => void;
}

const priorityLabel: Record<Priority, string> = {
  low: "Fácil",
  medium: "Médio",
  high: "Difícil",
};

const priorityClassName: Record<Priority, string> = {
  low: "bg-emerald-300",
  medium: "bg-amber-300",
  high: "bg-red-300",
};

const Card: FC<CardProps> = ({
  title,
  subject,
  description,
  date,
  completed,
  priority,
  onToggle,
  onDelete,
}) => {
  return (
    <div className="rounded-md bg-white/5 ring-1 ring-transparent hover:ring-amber-500 p-6 shadow-lg w-72 h-72 duration-300 flex flex-col">
      <div className="flex justify-between items-center gap-2 mb-1">
        <h3 className="text-xl font-semibold leading-tight">{title}</h3>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`${priorityClassName[priority]} text-neutral-600 text-xs font-bold px-2 py-1 rounded-md`}
          >
            {priorityLabel[priority]}
          </span>
          <button
            type="button"
            onClick={onDelete}
            aria-label="Excluir tarefa"
            className="text-neutral-500 hover:text-red-400 transition-colors cursor-pointer p-1"
          >
            <FontAwesomeIcon icon={faTrash} className="text-sm" />
          </button>
        </div>
      </div>
      <p className="text-amber-400/90 text-xs font-semibold tracking-wide uppercase mb-3">
        {subject}
      </p>
      <p className="text-neutral-500 mb-4 flex-1 min-w-0 line-clamp-4 break-words overflow-hidden">
        {description}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs font-semibold tracking-widest text-neutral-500">{date}</span>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={onToggle}
            className="w-4 h-4 rounded cursor-pointer"
          />
          <span className="text-xs font-semibold tracking-widest">
            {completed ? "Concluído" : "A fazer"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
