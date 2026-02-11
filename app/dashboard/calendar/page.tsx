"use client";

import React, { useState } from "react";
import Link from "next/link";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { es } from "date-fns/locale";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 1)); // October 2023

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const weekDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto h-[calc(100vh-140px)]">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[#111813] dark:text-white text-3xl font-bold leading-tight">
            Calendario Escolar
          </h2>
          <p className="text-[#61896f] text-base mt-2">
            Gestiona fechas de exámenes y entregas.
          </p>
        </div>
        <div className="flex bg-white dark:bg-[#1a2e20] p-1 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <button className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#102216] rounded-lg text-gray-500 transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="px-6 py-2 font-bold text-[#111813] dark:text-white text-lg capitalize w-48 text-center flex items-center justify-center">
            {format(currentDate, "MMMM yyyy", { locale: es })}
          </span>
          <button className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#102216] rounded-lg text-gray-500 transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-[#1a2e20] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col min-h-0">
        {/* Week Header */}
        <div className="grid grid-cols-7 mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-bold text-gray-400 uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-2 min-h-0">
          {/* Empty slots (simplified logic for demo) */}
          <div className="bg-gray-50 dark:bg-[#102216]/20 rounded-xl p-2 opacity-30"></div>
          <div className="bg-gray-50 dark:bg-[#102216]/20 rounded-xl p-2 opacity-30"></div>

          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`relative border border-transparent hover:border-primary/50 transition-all rounded-xl p-3 flex flex-col justify-between group cursor-pointer ${day === 5 ? "bg-primary/5 border-primary" : "bg-gray-50 dark:bg-[#102216]/30"}`}
            >
              <span
                className={`text-sm font-bold ${day === 5 ? "text-primary" : "text-gray-700 dark:text-gray-300"}`}
              >
                {day}
              </span>

              {/* Events */}
              {day === 12 && (
                <div className="mt-1 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded truncate dark:bg-orange-900/30 dark:text-orange-400">
                  Examen Matemáticas
                </div>
              )}
              {day === 15 && (
                <div className="mt-1 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded truncate dark:bg-blue-900/30 dark:text-blue-400">
                  Entrega Ciencias
                </div>
              )}

              {/* Add Button */}
              <button className="absolute top-2 right-2 text-gray-300 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-lg">
                  add_circle
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
