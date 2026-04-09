'use client';

import { useState } from 'react';
import { login } from '../auth/actions';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result && result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setLoading(false);
      router.refresh(); // Refresh to update server components/context
      router.push('/select-profile');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-md border dark:bg-slate-900 dark:border-slate-700"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Iniciar Sesión
        </h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="p-2 border rounded dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          required
          className="p-2 border rounded dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-black font-bold py-2 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}
    </div>
  );
}
