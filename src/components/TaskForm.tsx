import { useState } from "react";
import { createTask, updateTask } from "../lib/tasks";
import type { TaskListItem } from "../lib/taskPagination";
import Button from "./Button";
import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";

type Priority = "low" | "medium" | "high";

const priorityOptions: {
  value: Priority;
  label: string;
  badge: string;
}[] = [
  { value: "low", label: "Fácil", badge: "bg-emerald-300 text-neutral-700" },
  { value: "medium", label: "Médio", badge: "bg-blue-200 text-neutral-700" },
  { value: "high", label: "Difícil", badge: "bg-red-300 text-neutral-700" },
];

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  task?: TaskListItem;
}

export default function TaskForm({ onClose, onSuccess, task }: Props) {
  const isEditing = !!task;

  const [form, setForm] = useState({
    title: task?.title ?? "",
    subject: task?.subject ?? "",
    description: task?.description ?? "",
    priority: (task?.priority ?? "medium") as Priority,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function setPriority(priority: Priority) {
    setForm((prev) => ({ ...prev, priority }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isEditing) {
        await updateTask(task._id, form);
      } else {
        await createTask(form);
      }
      onSuccess();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col gap-4 bg-[#0c0f1e] p-10 justify-center w-100 rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-10 font-medium text-sm hover:text-blue-200 duration-300 cursor-pointer"
        >
          Cancelar
        </button>

        <h1 className="text-2xl font-bold">
          {isEditing ? "Editar tarefa" : "Criar tarefa"}
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="title">
            Título
          </label>
          <input
            id="title"
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            required
            maxLength={20}
            autoComplete="off"
            className="text-sm ring-1 ring-gray-300 hover:ring-blue-200 outline-0 p-2 rounded-md duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="subject">
            Matéria
          </label>
          <input
            id="subject"
            name="subject"
            placeholder="Matéria"
            value={form.subject}
            onChange={handleChange}
            required
            maxLength={10}
            autoComplete="off"
            className="text-sm ring-1 ring-gray-300 hover:ring-blue-200 outline-0 p-2 rounded-md duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="description">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Descrição (opcional)"
            value={form.description}
            onChange={handleChange}
            maxLength={120}
            className="text-sm ring-1 ring-gray-300 hover:ring-blue-200 outline-0 p-2 rounded-md duration-200 resize-none h-24"
          />
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <span id="priority-label" className="text-sm font-semibold">
            Dificuldade
          </span>
          <div
            role="radiogroup"
            aria-labelledby="priority-label"
            className="grid grid-cols-3 gap-2"
          >
            {priorityOptions.map((option) => {
              const selected = form.priority === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setPriority(option.value)}
                  className="rounded-md p-1 transition duration-200 cursor-pointer hover:bg-white/5"
                >
                  <span
                    className={`block w-full text-center text-xs font-bold px-2 py-1.5 rounded-md transition-opacity duration-200 ${option.badge} ${
                      selected ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {error && <p className="text-red-500 font-medium text-xs">{error}</p>}

        <Button
          type="submit"
          buttonLabel={isEditing ? "Salvar" : "Criar"}
          loadingLabel={isEditing ? "Salvando..." : "Criando..."}
          loading={loading}
          icon={isEditing ? faPen : faPlus}
        />
      </form>
    </div>
  );
}
