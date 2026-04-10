'use client';

import { signup } from '../auth/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);
    if (result.error) {
      setError(result.error);
    } else {
      setError(null);
      toast.success('Usuario creado. ¡Tienes 3 créditos de prueba!');
      router.push('/dashboard/create-child');
    }
  };
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-md border dark:bg-gray-800 dark:border-gray-800"
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
    </div>
  );
}
