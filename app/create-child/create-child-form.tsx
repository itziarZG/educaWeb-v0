"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addChild as addChildAction } from "./actions";

export default function CreateChildForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const result = await addChildAction(formData);

    if (result && result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setLoading(false);
      router.push("/select-profile");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background-dark font-display text-[#111318] dark:text-white antialiased items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1a202c] rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-primary/10 p-6 border-b border-primary/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg text-primary">
              <span className="material-symbols-outlined text-2xl">
                face_retouching_natural
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#111318] dark:text-white">
              Nuevo Perfil Infantil
            </h1>
          </div>
          <p className="text-sm text-[#616f89] dark:text-[#a0aec0]">
            Configura el perfil de tu pequeño aprendiz.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="nombre"
              className="text-sm font-semibold text-[#111318] dark:text-white ml-1"
            >
              Nombre <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 pointer-events-none">
                person
              </span>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2d3748] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder="Ej. Leo"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="edad"
                className="text-sm font-semibold text-[#111318] dark:text-white ml-1"
              >
                Edad <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 pointer-events-none">
                  cake
                </span>
                <input
                  id="edad"
                  name="edad"
                  type="number"
                  required
                  min="0"
                  max="18"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2d3748] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder="Ej. 7"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="curso"
                className="text-sm font-semibold text-[#111318] dark:text-white ml-1"
              >
                Curso
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 pointer-events-none">
                  school
                </span>
                <input
                  id="curso"
                  name="curso"
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2d3748] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder="Ej. 2º Primaria"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="comunidadAutonoma"
              className="text-sm font-semibold text-[#111318] dark:text-white ml-1"
            >
              Comunidad Autónoma <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 pointer-events-none">
                map
              </span>
              <input
                id="comunidadAutonoma"
                name="comunidadAutonoma"
                type="text"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2d3748] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder="Ej. Andalucía"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="gustos"
              className="text-sm font-semibold text-[#111318] dark:text-white ml-1"
            >
              Intereses
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 pointer-events-none">
                favorite
              </span>
              <input
                id="gustos"
                name="gustos"
                type="text"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2d3748] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder="Ej. Dinosaurios, fútbol, espacio..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="observaciones"
              className="text-sm font-semibold text-[#111318] dark:text-white ml-1"
            >
              Observaciones
            </label>
            <textarea
              id="observaciones"
              name="observaciones"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2d3748] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none"
              placeholder="Ej. Alergia a los frutos secos, necesita refuerzo en matemáticas..."
            ></textarea>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-emerald-400 text-black font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">
                    sync
                  </span>
                  Creando Perfil...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">add_circle</span>
                  Crear Perfil
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
