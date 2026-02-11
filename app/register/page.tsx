"use client";
import { signup } from "../auth/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);
    if (result.error) {
      setError(result.error);
    } else {
      setError(null);
      setSuccess(true);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-md border dark:bg-[#1a2e20] dark:border-gray-800"
      >
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
        <input
          name="name"
          type="text"
          placeholder="Nombre"
          required
          className="p-2 border rounded dark:bg-gray-800"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="p-2 border rounded dark:bg-gray-800"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          required
          className="p-2 border rounded dark:bg-gray-800"
        />
        <button
          type="submit"
          className="bg-primary text-black font-bold py-2 rounded hover:bg-emerald-400 transition-colors"
        >
          Registrarse
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}
      {success && (
        <div className="flex flex-col items-center gap-4 mt-4">
          <p className="text-green-500 font-medium">
            Cuenta creada exitosamente
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-primary text-black font-bold py-2 px-4 rounded hover:bg-emerald-400 transition-colors"
          >
            Iniciar sesión
          </button>
        </div>
      )}
    </div>
  );
}
