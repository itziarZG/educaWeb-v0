'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FeedbackPage() {
  const router = useRouter();
  const [autonomy, setAutonomy] = useState(3);
  const [motivation, setMotivation] = useState<number | null>(null);

  const handleSave = () => {
    // Here we would save the feedback
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] w-full max-w-2xl mx-auto py-10">
      <div className="bg-white dark:bg-[#1a2e20] w-full rounded-3xl p-10 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-emerald-400 to-blue-500"></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="flex flex-col items-center mb-8 text-center relative z-10">
          <div className="bg-primary/20 text-primary p-4 rounded-full mb-4 animate-bounce">
            <span className="material-symbols-outlined text-4xl">
              celebration
            </span>
          </div>
          <h2 className="text-3xl font-black text-[#111813] dark:text-white mb-2">
            ¡Ficha Completada!
          </h2>
          <p className="text-gray-500 text-lg">Lógica y Seriación 1</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Autonomy Rating */}
          <div className="flex flex-col gap-4">
            <label className="font-bold text-[#111813] dark:text-white text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                psychology
              </span>
              Autonomía
            </label>
            <div className="bg-background-light dark:bg-[#102216] p-6 rounded-2xl">
              <input
                type="range"
                min="1"
                max="5"
                value={autonomy}
                onChange={(e) => setAutonomy(parseInt(e.target.value))}
                className="w-full mb-4 accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                <span>Ayuda Total</span>
                <span className="text-primary">Independiente</span>
              </div>
            </div>
          </div>

          {/* Motivation Rating */}
          <div className="flex flex-col gap-4">
            <label className="font-bold text-[#111813] dark:text-white text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-yellow-500">
                sentiment_satisfied
              </span>
              Motivación
            </label>
            <div className="flex gap-2">
              {[1, 2, 3].map((level) => (
                <button
                  key={level}
                  onClick={() => setMotivation(level)}
                  className={`flex-1 aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border-2 ${
                    motivation === level
                      ? 'border-primary bg-primary/10 scale-105 shadow-md'
                      : 'border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#102216]'
                  }`}
                >
                  <span className="text-3xl">
                    {level === 1 ? '😞' : level === 2 ? '😐' : '🤩'}
                  </span>
                  <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                    {level === 1 ? 'Baja' : level === 2 ? 'Media' : 'Alta'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className="font-bold text-[#111813] dark:text-white text-lg mb-2 block">
            Observaciones
          </label>
          <textarea
            className="w-full bg-background-light dark:bg-[#102216] border border-gray-200 dark:border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px]"
            placeholder="¿Hubo algún obstáculo específico?"
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/dashboard" className="flex-1">
            <button className="w-full py-4 text-gray-500 hover:text-[#111813] font-bold transition-colors">
              Saltar
            </button>
          </Link>
          <button
            onClick={handleSave}
            className="flex-[2] bg-primary hover:bg-emerald-400 text-[#102216] font-black py-4 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-lg"
          >
            <span>Guardar y Continuar</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
