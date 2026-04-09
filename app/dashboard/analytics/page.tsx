'use client';

import React from 'react';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[#111813] dark:text-white text-3xl font-bold leading-tight">
            Análisis de Evolución
          </h2>
          <p className="text-[#61896f] dark:text-[#a0c4ae] text-base mt-2">
            Seguimiento detallado de &apos;Autonomía&apos; y
            &apos;Motivación&apos;
          </p>
        </div>

        {/* Date Range Picker (Visual) */}
        <div className="bg-white dark:bg-[#1a2e20] rounded-xl p-1 shadow-sm border border-gray-100 dark:border-gray-800 flex">
          <button className="px-4 py-2 bg-primary text-[#102216] rounded-lg text-sm font-bold shadow-sm transition-all hover:bg-primary/90">
            Últimas 10 Fichas
          </button>
          <button className="px-4 py-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg text-sm font-medium transition-all">
            Último Mes
          </button>
          <button className="px-4 py-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg text-sm font-medium transition-all">
            Histórico
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Card */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1a2e20] rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#111813] dark:text-white">
              Curva de Aprendizaje
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-primary"></span>
                <span className="text-xs font-bold text-gray-500">
                  Autonomía
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-emerald-700 dark:bg-emerald-500"></span>
                <span className="text-xs font-bold text-gray-500">
                  Motivación
                </span>
              </div>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="flex-1 w-full min-h-[300px] relative">
            <svg
              fill="none"
              width="100%"
              height="100%"
              viewBox="0 0 800 300"
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              {/* Horizontal Grid Lines */}
              <line
                x1="0"
                y1="250"
                x2="800"
                y2="250"
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="dark:stroke-gray-700"
              />
              <line
                x1="0"
                y1="150"
                x2="800"
                y2="150"
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="dark:stroke-gray-700"
              />
              <line
                x1="0"
                y1="50"
                x2="800"
                y2="50"
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="dark:stroke-gray-700"
              />

              {/* Motivation Line (Dashed) */}
              <path
                d="M0 200 C100 200 150 150 200 160 C300 180 350 100 400 110 C500 130 550 50 600 60 C700 70 750 30 800 40"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="8 8"
                className="dark:stroke-emerald-500"
              ></path>

              {/* Autonomy Area Gradient */}
              <defs>
                <linearGradient
                  id="gradientMetrics"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#13ec5b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#13ec5b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 180 C100 180 150 80 200 90 C300 110 350 40 400 50 C500 70 550 20 600 30 C700 40 750 10 800 10 L800 300 L0 300 Z"
                fill="url(#gradientMetrics)"
              ></path>

              {/* Autonomy Line (Solid) */}
              <path
                d="M0 180 C100 180 150 80 200 90 C300 110 350 40 400 50 C500 70 550 20 600 30 C700 40 750 10 800 10"
                fill="none"
                stroke="#13ec5b"
                strokeWidth="4"
                strokeLinecap="round"
              ></path>

              {/* Data Points */}
              <circle
                cx="200"
                cy="90"
                r="6"
                fill="#13ec5b"
                stroke="white"
                strokeWidth="2"
              />
              <circle
                cx="400"
                cy="50"
                r="6"
                fill="#13ec5b"
                stroke="white"
                strokeWidth="2"
              />
              <circle
                cx="600"
                cy="30"
                r="6"
                fill="#13ec5b"
                stroke="white"
                strokeWidth="2"
              />
              <circle
                cx="800"
                cy="10"
                r="6"
                fill="#13ec5b"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
            <span>Semana 1</span>
            <span>Semana 2</span>
            <span>Semana 3</span>
            <span>Semana 4</span>
          </div>
        </div>

        {/* Side Stats Column */}
        <div className="flex flex-col gap-6">
          {/* Family Peace Score */}
          <div className="bg-white dark:bg-[#1a2e20] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg text-emerald-700 dark:text-emerald-400">
                <span className="material-symbols-outlined">
                  sentiment_very_satisfied
                </span>
              </div>
              <h3 className="font-bold text-[#111813] dark:text-white">
                Paz Familiar
              </h3>
            </div>

            <div className="flex flex-col items-center py-4 relative">
              <div className="size-32 rounded-full border-[6px] border-emerald-100 dark:border-emerald-900 flex items-center justify-center relative">
                <div
                  className="absolute inset-0 rounded-full border-[6px] border-primary border-t-transparent -rotate-45"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                ></div>
                <span className="text-4xl font-black text-[#111813] dark:text-white">
                  8.5
                </span>
              </div>
              <p className="text-xs text-center font-bold text-emerald-600 dark:text-emerald-400 mt-2 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                -15% estrés doméstico
              </p>
            </div>

            <p className="text-xs text-center text-gray-500 px-4">
              Basado en la consistencia de rutinas y feedback emocional.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="flex-1 bg-linear-to-br from-[#102216] to-[#1a2e20] p-6 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-white/5 pointer-events-none">
              <span className="material-symbols-outlined text-[150px]">
                auto_awesome
              </span>
            </div>
            <h3 className="text-lg font-bold mb-4 relative z-10">Resumen IA</h3>
            <p className="text-sm text-gray-300 leading-relaxed relative z-10">
              Leo ha mostrado un aumento del{' '}
              <strong className="text-primary">22%</strong> en autonomía esta
              semana. Se recomienda aumentar ligeramente la dificultad en{' '}
              <strong className="text-white">Matemáticas</strong> para mantener
              el flujo.
            </p>
            <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-sm font-bold transition-all border border-white/10 relative z-10">
              Ver Informe Completo
            </button>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <h3 className="text-2xl font-bold text-[#111813] dark:text-white mt-4">
        Hitos Alcanzados
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Milestone 1 */}
        <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-start gap-4">
          <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
          <div>
            <h4 className="font-bold text-[#111813] dark:text-white text-lg">
              Comprensión Lectora
            </h4>
            <p className="text-sm text-gray-500 mt-1">Verificado hace 2 días</p>
            <div className="flex items-center gap-1 mt-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">
                verified
              </span>
              Completado
            </div>
          </div>
        </div>

        {/* Milestone 2 */}
        <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-start gap-4">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full text-blue-600 dark:text-blue-400">
            <span className="material-symbols-outlined">timer</span>
          </div>
          <div>
            <h4 className="font-bold text-[#111813] dark:text-white text-lg">
              Inicio Rápido
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Inicia tareas sin ayuda
            </p>
            <div className="flex items-center gap-1 mt-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">
                trending_up
              </span>
              En Progreso
            </div>
          </div>
        </div>

        {/* Milestone 3 */}
        <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-start gap-4 opacity-75">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full text-gray-400">
            <span className="material-symbols-outlined">psychology</span>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-[#111813] dark:text-white text-lg">
              Resolución Compleja
            </h4>
            <p className="text-sm text-gray-500 mt-1">Lógica y Seriación</p>
            <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-primary h-full w-[60%]"></div>
            </div>
            <p className="text-xs text-right mt-1 font-bold text-gray-400">
              60%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
