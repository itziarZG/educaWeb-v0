"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function GeneratorPage() {
  const [tdahMode, setTdahMode] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-[#111813] dark:text-white transition-colors duration-200">
      <header className="bg-white dark:bg-background-dark border-b border-gray-100 dark:border-gray-800 sticky top-0 z-20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/teacher">
            <div className="bg-primary/20 p-2 rounded-lg cursor-pointer">
              <span className="material-symbols-outlined text-emerald-700 dark:text-emerald-400">
                arrow_back
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-2 rounded-lg hidden sm:block">
              <span className="material-symbols-outlined text-emerald-700 dark:text-emerald-400">
                auto_awesome
              </span>
            </div>
            <h1 className="font-bold text-lg">Generador AI</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              TDAH
            </span>
            <button
              className={`w-8 h-4 rounded-full relative transition-colors ${
                tdahMode ? "bg-primary" : "bg-gray-200 dark:bg-gray-600"
              }`}
              onClick={() => setTdahMode(!tdahMode)}
            >
              <div
                className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${
                  tdahMode ? "left-[18px]" : "left-0.5"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto pb-32">
        <section className="p-4 space-y-6 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-[#1a2e20] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
              Parámetros de Generación
            </h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    psychology
                  </span>
                  Tema de Interés
                </label>
                <textarea
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-primary focus:border-primary text-sm p-3 min-h-[80px]"
                  placeholder="Ej: Historia de la arquitectura romana, cultivo de orquídeas para principiantes..."
                ></textarea>
                <p className="text-[11px] text-gray-400">
                  La IA personalizará los ejemplos basándose en este interés.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      school
                    </span>
                    Asignatura
                  </label>
                  <select className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-primary focus:border-primary text-sm h-11">
                    <option>Matemáticas</option>
                    <option>Comprensión Lectora</option>
                    <option>Ciencias Naturales</option>
                    <option>Historia</option>
                    <option>Habilidades Blandas</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      target
                    </span>
                    Objetivo Pedagógico
                  </label>
                  <input
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-primary focus:border-primary text-sm h-11"
                    placeholder="Ej: Resolución de problemas de lógica"
                    type="text"
                  />
                </div>
              </div>
              <button className="w-full bg-[#102216] dark:bg-white text-white dark:text-[#102216] font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:opacity-90">
                <span>Generar Ficha</span>
                <span className="material-symbols-outlined">bolt</span>
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-bold text-lg">Vista Previa</h3>
              <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-2 py-1 rounded font-medium">
                Draft v1.0
              </span>
            </div>
            <div
              className={`bg-white dark:bg-gray-50 border-2 border-dashed border-gray-200 dark:border-gray-300 rounded-3xl p-6 shadow-inner min-h-[400px] relative overflow-hidden ${
                tdahMode ? "grayscale-[0.2] contrast-125" : ""
              }`}
            >
              <div
                className={`space-y-6 ${
                  tdahMode ? "tracking-wide leading-relaxed" : ""
                }`}
              >
                <div className="border-b-2 border-gray-800 pb-4">
                  <div className="h-4 w-32 bg-gray-100 rounded mb-2"></div>
                  <h1 className="text-2xl font-black text-gray-900 leading-tight">
                    La Geometría en los Acueductos
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Personalizado para: Arquitectura Romana
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-sm leading-relaxed text-gray-700">
                      <span className="font-bold">Ejercicio 1:</span> Los arcos
                      de medio punto romanos se basan en la circunferencia. Si
                      un arco tiene un radio de 3 metros, ¿cuál es el área del
                      semicírculo que forma?
                    </p>
                  </div>
                  <div className="border-2 border-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-300 italic text-sm">
                    Espacio para resolución...
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-sm leading-relaxed text-gray-700">
                      <span className="font-bold">Ejercicio 2:</span> Imagina
                      que estás construyendo el acueducto de Segovia. Necesitas
                      150 bloques por cada 10 metros...
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-8xl text-gray-900">
                  description
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-30">
        <div className="max-w-xl mx-auto flex gap-3">
          <button className="flex-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white font-bold py-4 px-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
            <span className="material-symbols-outlined">edit</span>
            <span>Refinar</span>
          </button>
          <button className="flex-[2] bg-primary text-background-dark font-black py-4 px-6 rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all">
            <span className="material-symbols-outlined">picture_as_pdf</span>
            <span>Descargar PDF</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
