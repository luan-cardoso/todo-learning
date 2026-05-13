import type { FC } from "react";

type Difficulty = "facil" | "medio" | "dificil";

interface CardProps {
  title: string;
  description: string;
  date: string;
  isDone: boolean;
  difficulty: Difficulty;
}

const Card: FC<CardProps> = ({
  title,
  description,
  date,
  isDone,
  difficulty,
}) => {
  const difficultyLabel =
    difficulty === "facil" ? "Fácil" : difficulty === "medio" ? "Médio" : "Difícil";

  const difficultyClassName =
    difficulty === "facil"
      ? "bg-emerald-300"
      : difficulty === "medio"
        ? "bg-amber-300"
        : "bg-indigo-300";

  return (
    <div className="rounded-md bg-white/15 ring-1 ring-black/10 p-6 shadow-lg w-72 h-72 transition-transform duration-300 hover:scale-105 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-neutral-600">{title}</h3>
        <span
          className={`${difficultyClassName} text-neutral-600 text-xs font-bold px-2 py-1 rounded-md`}
        >
          {difficultyLabel}
        </span>
      </div>

      <p className=" text-neutral-600 mb-4">{description}</p>

      <div className="flex justify-between items-center pt-4 border-t border-neutral-400 mt-auto">
        <span className="text-sm  text-neutral-600">{date}</span>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDone}
            onChange={() => {}}
            className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-sm  text-neutral-600">
            {isDone ? "Concluído" : "A fazer"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
