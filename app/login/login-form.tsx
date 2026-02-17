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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-md border dark:bg-[#1a2e20] dark:border-gray-800"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Iniciar Sesión
        </h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          required
          className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-black font-bold py-2 rounded hover:bg-emerald-400 transition-colors disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}
    </div>
  );
}
