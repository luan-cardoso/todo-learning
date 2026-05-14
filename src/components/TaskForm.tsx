import { useState } from "react";
import { createTask } from "../lib/tasks";
import Button from "./Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateTaskModal({ onClose, onCreated }: Props) {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await createTask(form);
      onCreated();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#0c0f1e] rounded-xl p-8 w-full max-w-md border border-amber-500"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-6">Criar</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            required
            className="bg-white/10 rounded-lg px-4 py-2 text-sm outline-none"
          />
          <input
            name="subject"
            placeholder="Matéria"
            value={form.subject}
            onChange={handleChange}
            required
            className="bg-white/10 rounded-lg px-4 py-2 text-sm outline-none"
          />
          <textarea
            name="description"
            placeholder="Descrição (opcional)"
            value={form.description}
            onChange={handleChange}
            className="bg-white/10 rounded-lg px-4 py-2 text-sm outline-none resize-none h-24"
          />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="bg-white/10 rounded-lg px-4 py-2 text-sm outline-none"
          >
            <option value="low">Fácil</option>
            <option value="medium">Médio</option>
            <option value="high">Difícil</option>
          </select>
          <div className="flex justify-end gap-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm transition cursor-pointer font-semibold"
            >
              Cancelar
            </button>
            <Button
              type="submit"
              buttonLabel="Criar"
              loadingLabel="Criando..."
              loading={loading}
              icon={faPlus}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
