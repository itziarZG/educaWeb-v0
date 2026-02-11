import { signup } from "../auth/actions";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-md border dark:bg-[#1a2e20] dark:border-gray-800">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
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
          formAction={signup}
          className="bg-primary text-black font-bold py-2 rounded hover:bg-emerald-400 transition-colors"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
