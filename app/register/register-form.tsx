'use client';

import { signup } from '../auth/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptedPrivacy) {
      setError(
        'Debes aceptar la Política de Privacidad y los Términos para continuar.'
      );
      return;
    }
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
        <label className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedPrivacy}
            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
            className="mt-1 h-4 w-4 accent-primary shrink-0"
          />
          <span>
            He leído y acepto la{' '}
            <Link
              href="/privacidad"
              target="_blank"
              className="text-primary hover:underline"
            >
              Política de Privacidad
            </Link>{' '}
            y los{' '}
            <Link
              href="/terminos"
              target="_blank"
              className="text-primary hover:underline"
            >
              Términos y Condiciones
            </Link>
            .
          </span>
        </label>
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
