'use client';

import React, { useState } from 'react';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('child');
  const [contrastEnabled, setContrastEnabled] = useState(false);
  const [dyslexiaFontEnabled, setDyslexiaFontEnabled] = useState(true);

  const avatarUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAb3jSZiveRj3q8ztLaJircg2p0fV5iaOHJZrs8tL6lsh3KPdiOBWFDhZO1nyw7oURSpz6KvQlmyG1_1QoJ8QDpQnA9eJpVcfIp7CIyyEdPH78dgV2N6Aj9VtTnTZSHnUj9169JyECeBAaLxdBLAhBLoyFGfTE9z64Y6ZVdMbvX9-UEbBb0nzueghlqxjodK87t4WwoBrcBzIiJcYdtbQDOOjGj-o-8XQdVxoweHQRtbI7JdQiKczXRRGFK34Lxb1KyX9R0PNaNyGQ';

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[#111813] dark:text-white text-3xl font-bold leading-tight">
          Ajustes de Perfil
        </h2>
        {/* Toggle between Child/Family */}
        <div className="flex bg-white dark:bg-[#1a2e20] p-1 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('child')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'child' ? 'bg-primary text-[#102216] shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Perfil del Niño
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'family' ? 'bg-primary text-[#102216] shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Cuenta Familiar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Identity */}
        <div className="bg-white dark:bg-[#1a2e20] rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center gap-6 h-fit">
          <div className="relative group cursor-pointer">
            <div
              className="size-40 rounded-full bg-cover bg-center border-4 border-primary/20 group-hover:border-primary transition-all shadow-inner"
              style={{ backgroundImage: `url("${avatarUrl}")` }}
            ></div>
            <div className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full border-2 border-white dark:border-[#1a2e20]">
              <span className="material-symbols-outlined text-sm">edit</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#111813] dark:text-white">
              Leo
            </h3>
            <p className="text-gray-500 text-sm">Estudiante Nivel 4</p>
          </div>

          <div className="w-full h-px bg-gray-100 dark:bg-gray-700"></div>

          <div className="w-full flex justify-between items-center text-sm">
            <span className="text-gray-500">Edad</span>
            <span className="font-bold text-[#111813] dark:text-white">
              8 años
            </span>
          </div>
          <div className="w-full flex justify-between items-center text-sm">
            <span className="text-gray-500">Curso</span>
            <span className="font-bold text-[#111813] dark:text-white">
              3º Primaria
            </span>
          </div>
        </div>

        {/* Right Column: Settings Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Customization Card */}
          <div className="bg-white dark:bg-[#1a2e20] rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/20 p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <h3 className="text-xl font-bold text-[#111813] dark:text-white">
                Personalización IA
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-[#111813] dark:text-white mb-2">
                  Gustos y Pasiones
                  <span className="ml-2 text-xs font-normal text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Influye en los ejemplos
                  </span>
                </label>
                <textarea
                  className="w-full p-4 rounded-xl bg-background-light dark:bg-[#102216] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px] resize-none"
                  placeholder="Ej: Le apasiona el Real Madrid, los dinosaurios y los videojuegos de aventuras..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111813] dark:text-white mb-2">
                  Comunidad Autónoma
                </label>
                <div className="relative">
                  <select className="w-full p-4 rounded-xl bg-background-light dark:bg-[#102216] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent appearance-none">
                    <option>Madrid</option>
                    <option>Cataluña</option>
                    <option>Andalucía</option>
                    <option>Comunidad Valenciana</option>
                    <option>Galicia</option>
                    <option>País Vasco</option>
                    <option>Otros</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accessibility Card */}
          <div className="bg-white dark:bg-[#1a2e20] rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/20 p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined">
                  accessibility_new
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#111813] dark:text-white">
                Accesibilidad
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 bg-background-light dark:bg-[#102216] rounded-xl">
                <div>
                  <p className="font-bold text-[#111813] dark:text-white">
                    Alto Contraste
                  </p>
                  <p className="text-sm text-gray-500">
                    Mejora la legibilidad de los textos
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={contrastEnabled}
                    onChange={(e) => setContrastEnabled(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-background-light dark:bg-[#102216] rounded-xl">
                <div>
                  <p className="font-bold text-[#111813] dark:text-white">
                    Fuente para Dislexia
                  </p>
                  <p className="text-sm text-gray-500">
                    Usa tipografías especializadas (OpenDyslexic)
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={dyslexiaFontEnabled}
                    onChange={(e) => setDyslexiaFontEnabled(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="bg-primary hover:bg-emerald-400 text-[#102216] font-bold py-4 px-12 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
              <span className="material-symbols-outlined">save</span>
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
