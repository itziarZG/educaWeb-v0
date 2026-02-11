"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function TeacherDashboard() {
  const avatarUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC5zGeI8vlgJgmGZi1GKbM8EMImTHbWxyYEhR4LEXoLsQVFH39OpffvFFxtatVCeaiAqQ4wAEUeKG4YsZjWs1biv6feuIXFa65iySSaVTel4BGtDlWqbQSqW0sbLZiyVuXpDpnBuyjShRa1AAHfj3HxbRDmY8r-7VIkoosEoKPa-YcZj8IkAoikgBu1HwJZF08qPi8ly4CYOdDrJEg2rX72BsJj9IP-MegEwBsXmYQ5yloigMW8hoH7pQGdRVwU3Yln_XL65Dy894Q";
  const familyUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAGIAV0yd2FnpzvB0978HxNUm6fwhI24iNyBg6Dx-wK32aIhXw-14zYDkNyYjzgwtvlkunHx6OSuiBoWRln7CSl2eyaCVWnLudEZdhuFCizuXs1QZVrEFZjVNXzkUbNS8Bl1-jgKZAw9QLuSct_Fxd-U0jNT-deXs5OquC4Cf6USjd8GoD-E9FRM5So4pgFyr8WMdk0pRYWFg1u6mXXI10g3ExD2ocT3zKu8mdKa-34j_yfIFzeiEtNqLXLqWVU3DX3h9HYVkjGwBA";

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[#111813] dark:text-white text-3xl font-bold leading-tight">
            Panel de Educador
          </h2>
          <p className="text-[#61896f] dark:text-[#a0c4ae] text-base mt-2">
            Supervisa y gestiona el aprendizaje de tus estudiantes
          </p>
        </div>
        <button className="bg-white dark:bg-[#1a2e20] p-3 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-500 hover:text-primary transition-colors shadow-sm">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Main Stats & Generator */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Peace Card (Wide) */}
          <div className="bg-white dark:bg-[#1a2e20] rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary p-2 rounded-lg text-[#102216]">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                <h3 className="text-xl font-bold text-[#111813] dark:text-white">
                  Paz Familiar
                </h3>
              </div>
              <h4 className="text-4xl font-black text-[#111813] dark:text-white mb-2">
                Excelente
              </h4>
              <p className="text-[#61896f] text-base leading-relaxed mb-6">
                Leo ha completado 4 fichas esta semana sin fricción. El ambiente
                es positivo y receptivo.
              </p>
              <Link href="/dashboard/worksheet/feedback">
                <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline uppercase tracking-wider">
                  <span className="material-symbols-outlined text-lg">
                    add_circle
                  </span>
                  Añadir Feedback Manual
                </button>
              </Link>
            </div>
            <div
              className="w-full md:w-1/3 aspect-video md:aspect-square bg-cover bg-center rounded-2xl shadow-inner border-4 border-white dark:border-[#102216]"
              style={{ backgroundImage: `url("${familyUrl}")` }}
            ></div>
          </div>

          {/* Generator CTA */}
          <Link href="/dashboard/generator" className="group">
            <div className="w-full bg-gradient-to-r from-[#102216] to-[#1a2e20] hover:to-[#233b2b] rounded-3xl p-8 shadow-lg transition-all relative overflow-hidden flex items-center justify-between">
              <div className="relative z-10">
                <div className="bg-white/10 w-fit p-3 rounded-xl mb-4 text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    auto_awesome
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Generador de Fichas IA
                </h3>
                <p className="text-gray-300">
                  Crea material personalizado en segundos.
                </p>
              </div>
              <div className="bg-primary size-16 rounded-full flex items-center justify-center text-[#102216] shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform relative z-10">
                <span className="material-symbols-outlined text-3xl">
                  arrow_forward
                </span>
              </div>

              {/* Decorative */}
              <div className="absolute top-0 right-0 h-full w-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
            </div>
          </Link>
        </div>

        {/* Right Col: Recent Activity */}
        <div className="bg-white dark:bg-[#1a2e20] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#111813] dark:text-white">
              Actividad Reciente
            </h3>
            <button className="text-xs font-bold text-primary uppercase hover:underline">
              Ver Todo
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {/* Activity Item 1 */}
            <div className="flex gap-4 items-start p-3 hover:bg-gray-50 dark:hover:bg-[#102216]/50 rounded-xl transition-colors cursor-pointer group">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 shrink-0">
                <span className="material-symbols-outlined">calculate</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#111813] dark:text-white text-sm truncate">
                  Sumas Divertidas Nivel 2
                </p>
                <p className="text-xs text-gray-500">Generada hoy, 10:15</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500">
                  <span className="material-symbols-outlined text-lg">
                    print
                  </span>
                </button>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="flex gap-4 items-start p-3 hover:bg-gray-50 dark:hover:bg-[#102216]/50 rounded-xl transition-colors cursor-pointer group">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                <span className="material-symbols-outlined">auto_stories</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#111813] dark:text-white text-sm truncate">
                  Lectura: El Gato con Botas
                </p>
                <p className="text-xs text-gray-500">Ayer, 18:30</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500">
                  <span className="material-symbols-outlined text-lg">
                    print
                  </span>
                </button>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="flex gap-4 items-start p-3 hover:bg-gray-50 dark:hover:bg-[#102216]/50 rounded-xl transition-colors cursor-pointer group">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400 shrink-0">
                <span className="material-symbols-outlined">draw</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#111813] dark:text-white text-sm truncate">
                  Grafomotricidad: Curvas
                </p>
                <p className="text-xs text-gray-500">24 Oct, 09:12</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500">
                  <span className="material-symbols-outlined text-lg">
                    print
                  </span>
                </button>
              </div>
            </div>
          </div>

          <button className="w-full mt-4 py-3 border-t border-gray-100 dark:border-gray-800 text-sm font-bold text-gray-500 hover:text-[#111813] dark:hover:text-white transition-colors">
            Ver Historial Completo
          </button>
        </div>
      </div>
    </div>
  );
}
