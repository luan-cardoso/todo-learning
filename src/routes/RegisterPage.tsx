import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../lib/auth";
import Button from "../components/Button";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(form.name, form.email, form.password);
      navigate("/login"); // redireciona após cadastro
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4  bg-white/10 p-10 justify-center h-125 w-100 mt-20 rounded-2xl"
    >
      <h1 className="text-2xl font-bold">Criar conta</h1>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold" htmlFor="name">
          Nome e Sobrenome
        </label>
        <input
          id="name"
          name="name"
          maxLength={20}
          placeholder="Luan Cardoso"
          className="text-sm ring-1 ring-gray-300 hover:ring-amber-500 outline-0 p-2 rounded-md duration-200"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          className="text-sm ring-1 ring-gray-300 hover:ring-amber-500 outline-0 p-2 rounded-md duration-200"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <label className="text-sm font-semibold" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          className="text-sm ring-1 ring-gray-300 hover:ring-amber-500 outline-0 p-2 rounded-md duration-200"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className="text-red-500 font-medium text-xs">{error}</p>}

      <Button
        type="submit"
        buttonLabel="Cadastrar"
        loadingLabel="Cadastrando..."
        loading={loading}
        icon={faUserPlus}
      />
    </form>
  );
}
