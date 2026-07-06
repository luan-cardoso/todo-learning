import type { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

type Priority = "low" | "medium" | "high";

interface CardProps {
  title: string;
  subject: string;
  description: string;
  date: string;
  completed: boolean;
  priority: Priority;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const priorityLabel: Record<Priority, string> = {
  low: "Fácil",
  medium: "Médio",
  high: "Difícil",
};

const priorityClassName: Record<Priority, string> = {
  low: "bg-emerald-300",
  medium: "bg-blue-200",
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
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-md bg-white/5 ring-1 ring-transparent hover:ring-blue-200 p-6 shadow-lg w-72 h-72 duration-300 flex flex-col">
      <div className="flex justify-between items-center gap-2">
      <p className="text-blue-200 text-sm font-semibold tracking-wide uppercase">
        {subject}
      </p>
        <div className="flex items-center bg-white/10 rounded-md p-1 px-2 gap-2 ">
          <span
            className={`${priorityClassName[priority]} text-neutral-600 tracking-widest text-xs font-semibold px-2 py-1 rounded-md`}
          >
            {priorityLabel[priority]}
          </span>
          <button
            type="button"
            onClick={onEdit}
            aria-label="Editar tarefa"
            className="text-neutral-500 hover:text-blue-200 transition-colors cursor-pointer "
          >
            <FontAwesomeIcon icon={faPen} className="text-sm" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label="Excluir tarefa"
            className="text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
          >
            <FontAwesomeIcon icon={faTrash} className="text-sm" />
          </button>
        </div>
      </div>
      <h3 className="text-xl font-semibold leading-tight mt-3">{title}</h3>
      <p className="text-neutral-500 flex-1 min-w-0 line-clamp-4 break-words overflow-hidden">
        {description}
      </p>
      <div className="flex justify-between items-center mt-auto text-neutral-500">
        <span className="text-xs font-semibold tracking-widest ">{date}</span>
        <div className="flex items-center gap-2 ">
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
