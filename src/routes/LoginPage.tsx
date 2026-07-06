import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../lib/auth";
import Button from "../components/Button";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
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
      await login(form.email, form.password);
      navigate("/");
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
      className="relative flex flex-col gap-4  bg-white/10 p-10 justify-center h-125 w-100 mt-20 rounded-2xl"
    >
      <h1 className="text-2xl font-bold">Entrar</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          className="text-sm ring-1 ring-gray-300 hover:ring-blue-200 outline-0 p-2 rounded-md duration-200"
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
          className="text-sm ring-1 ring-gray-300 hover:ring-blue-200 outline-0 p-2 rounded-md duration-200"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className="text-red-500 font-medium text-xs">{error}</p>}

      <Button
        type="submit"
        buttonLabel="Entrar"
        loadingLabel="Entrando..."
        loading={loading}
        icon={faRightToBracket}
      />

      <NavLink
        to="/register"
        className="absolute top-5 right-10 font-medium text-sm hover:text-blue-200 duration-300"
      >
        Criar conta
      </NavLink>
    </form>
  );
}
