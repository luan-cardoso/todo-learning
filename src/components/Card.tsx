import type { FC } from "react";

type Priority = "low" | "medium" | "high";

interface CardProps {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  priority: Priority;
  onToggle: () => void;
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
  description,
  date,
  completed,
  priority,
  onToggle,
}) => {
  return (
    <div className="rounded-md bg-white/5 ring-1 ring-transparent hover:ring-amber-500 p-6 shadow-lg w-72 h-72 duration-300 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span
          className={`${priorityClassName[priority]} text-neutral-600 text-xs font-bold px-2 py-1 rounded-md`}
        >
          {priorityLabel[priority]}
        </span>
      </div>
      <p className="text-neutral-500 mb-4">{description}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs font-semibold tracking-widest">{date}</span>
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
