"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const resources = [
    {
      title: "Álgebra para Adultos",
      subject: "Matemáticas",
      rating: 4.9,
      views: "1.2k",
    },
    {
      title: "Siglo XX: Historia",
      subject: "Historia",
      rating: 4.8,
      views: "843",
    },
    { title: "Inglés Técnico", subject: "Idiomas", rating: 5.0, views: "2.5k" },
    {
      title: "Biología Celular",
      subject: "Ciencias",
      rating: 4.7,
      views: "900",
    },
    {
      title: "Geometría Básica",
      subject: "Matemáticas",
      rating: 4.5,
      views: "1.1k",
    },
    {
      title: "Literatura Clásica",
      subject: "Lengua",
      rating: 4.8,
      views: "1.5k",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[#111813] dark:text-white text-3xl font-bold leading-tight">
            Librería Comunitaria
          </h2>
          <p className="text-[#61896f] text-base mt-2">
            Explora miles de recursos creados por otros educadores.
          </p>
        </div>
        <div className="flex bg-white dark:bg-[#1a2e20] p-1 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <button className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#102216] rounded-lg transition-colors">
            <span className="material-symbols-outlined text-gray-500">
              search
            </span>
          </button>
          <input
            className="bg-transparent outline-none text-sm w-64 placeholder-gray-400 text-[#111813] dark:text-white"
            placeholder="Buscar por tema, asignatura..."
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
        {["all", "math", "science", "history", "language", "art"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-all whitespace-nowrap ${
                activeFilter === filter
                  ? "bg-[#102216] text-white dark:bg-white dark:text-[#102216]"
                  : "bg-white dark:bg-[#1a2e20] text-gray-500 border border-gray-100 dark:border-gray-700 hover:border-gray-300"
              }`}
            >
              {filter === "all" ? "Todos" : filter}
            </button>
          ),
        )}
      </div>

      <h3 className="text-xl font-bold text-[#111813] dark:text-white -mb-4">
        Tendencias de la Semana
      </h3>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {resources.map((res, i) => (
          <div
            key={i}
            className="group bg-white dark:bg-[#1a2e20] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow relative cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="bg-primary/20 text-[#102216] dark:text-primary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                {res.subject}
              </span>
              <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                <span className="material-symbols-outlined text-sm">star</span>
                {res.rating}
              </div>
            </div>

            <h4 className="font-bold text-lg text-[#111813] dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
              {res.title}
            </h4>

            <div className="flex justify-between items-end mt-4 text-xs text-gray-400 font-medium">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  visibility
                </span>
                {res.views}
              </div>
              <div className="flex items-center gap-2">
                <span className="size-6 rounded-full bg-gray-200 dark:bg-gray-700"></span>
                <span>Usuario</span>
              </div>
            </div>

            {/* Hover Overlay Action */}
            <div className="absolute inset-0 bg-white/90 dark:bg-[#102216]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 rounded-3xl z-10">
              <button className="w-full py-3 bg-primary text-[#102216] font-bold rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
