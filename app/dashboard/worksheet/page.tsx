"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function InteractiveWorksheetPage() {
  const [diamonds, setDiamonds] = useState([
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBVIL_Pv9L7eAqiEABTwzAA14z6WRrRcPcpjC4VFOvri1KytkmvcVg1IVCAAowFUWffu02jgEkHkHdeILiRB2YOI4LyaauC73Xzqo7OuhU76yWsKeVGlO-T4_eezgEkS0P6IibJEtJoiz3KcnjB-sceZd26VQ7W0qZxoQAf0OIdp4zLmgOfOyHT-TASInnzd07Xagkpeu4IIStJX6eTK0d126mYG_ujeYqDySm-AtXNEcFAzXXXwz6PuSf1QF0kQyFdrBnyWqxQvpw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBxABMl4H-S7RdguXso8ThFyImCJf3OR4r3TsRi9UGOGxOO6hNHzMQ3W5NEpC6ZnDMEg8XcljCloGKsD0G4lmzbEw4VbAjAZ3Im48vHvaIrAX7BvOgdqGQnYV8gKGkkD3IS3osJ0yRR_nZNsFZUrgWdU9asOdWCAK7VdnzBU58Ewbt3YXDtgVio9n7ow_blE18rVIIjNY8R6JuBkzp8mijzp8KCm3fRSPh32xB9U206Ot8Tohy9g0rlEU3a6iTL3-mzi4yzQU-a5Mc",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDDlNB8lZWR5e9Q-0CgX-b9Pe-FUaH67MYfmd4AZJwD1k3CAyxOhTxHtNfAM2EBe_Ntpf2TcPza1ogshW6FAPPehvLeJUpuNZgFXb2HW2wR8rw9Tq5zOYx_Zoz6eHYnojPUNBsOlCRRjPZWQI0V6zHl7Orq1EL0o0n5gi2B9wsmWVHg7FzIvHVRG1m4I5Co5-f2LJYjuTbOCJCEeGhojF_kX8XksnMx5YFhl-eLTV7FWqZfpPTsCGpQZCYX-Dir9lRifFsdKL-eHIs",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAnN_omBEOhv_167mY2ySQIzf7nIzf9eYzO30odLPcP6mWyifdUmyz21NlKtKWQRezFLHwQCieLPDL2ctWWrNc3atcRHmTOynNBSbkU-IBWoJHmy750C9ZmOaVstsLqdY8er_0BW2OO5isKTVqadNLR3xQIecSiql9UxORkpG4GPZhRWXZs1hLcQxnvm5iq16eSR8Pj739l18UMm7BBzWbRtgHFLICLYN1qG4QuKkKbtZwOYdGzx6EZLGucI1jYW9TD6IN70J3G8Vg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCI6Eyntnrl3Mo_YMmK9iTMmDTwnr6LQYX6Qh6ormF2uCa7Q5B6B4sxeZ8Lq4hgF28-Mxnd8zvoeeaTurQoxwTBASV6ia-wplow7wjFLvRT70kU27NCym1VCX6_Uw1Z-607AcfBaVldbOBJwe9aS07v1LbEDUoOWV1M0uDkRVtW2nCYIijhupOBMtjkwGOHfCj5x7e56dwPV-j2imS4Sz0-roHgZiixryRmvTprRhhq9StULfB1c4b0_g_-_J88yMOMk6MVFB8Gka8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDjcL8AdKI-cSjkf5rd5PcdElMTaAHOgjnzWVhvDjIUOZBcZpMLxc_oK2Lh2aRoxfy2wnlGXB4zkiAAaXrdKRDQpY_LRQRpKeyR19VUXr9OchUPBPVoB0RPPPwLWvFiZE36BbEUIAdzA7N-v6KOUxPVRy54rnkj3wVojhJo5uPWgDMqoDN-375gWuzgXAzMyAOdWIpaJ12HqoNiyGOUArsmFSUjrdr4r_JOED5MxctVROoCYQZxd702koec0bahdxvyVstdpfL40_0",
  ]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto h-[calc(100vh-140px)] pb-10">
      {/* Top Navigation Bar / Progress */}
      <div className="flex items-center justify-between bg-white dark:bg-[#1a2e20] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <Link href="/dashboard">
          <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold uppercase tracking-wider text-xs">
            <span className="material-symbols-outlined text-lg">
              arrow_back
            </span>
            Salir
          </button>
        </Link>

        <div className="flex-1 max-w-md mx-4">
          <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
            <span>Progreso</span>
            <span>Ficha 3/5</span>
          </div>
          <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[60%] rounded-full shadow-[0_0_10px_rgba(19,236,91,0.5)]"></div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary font-bold text-sm">
          <span className="material-symbols-outlined">timer</span>
          <span>12:30</span>
        </div>
      </div>

      <main className="flex-1 bg-white dark:bg-[#102216] rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 relative overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar / Instructions */}
        <aside className="md:w-1/3 bg-[#f0fdf4] dark:bg-[#1a2e20] p-8 flex flex-col justify-center border-r border-[#dcfce7] dark:border-gray-800 relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[120px] text-primary">
              pets
            </span>
          </div>

          <h1 className="text-3xl font-black text-[#111813] dark:text-white mb-4 relative z-10">
            ¡Ayuda al Dragón!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 relative z-10">
            Necesita contar sus tesoros para dormir tranquilo. Arrastra{" "}
            <strong className="text-primary font-black">4 diamantes</strong> al
            cofre.
          </p>

          <div className="bg-white dark:bg-[#102216]/50 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <span className="material-symbols-outlined text-3xl text-primary animate-bounce">
              lightbulb
            </span>
            <p className="text-sm font-medium text-gray-500">
              Pista: Los diamantes azules valen el doble.
            </p>
          </div>
        </aside>

        {/* Work Area */}
        <section className="flex-1 p-8 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-fixed flex flex-col justify-between">
          {/* Draggable Area */}
          <div className="flex flex-wrap gap-4 justify-center py-8">
            {diamonds.map((url, i) => (
              <div
                key={i}
                className="cursor-grab active:cursor-grabbing hover:scale-110 transition-transform p-2 bg-white dark:bg-[#1a2e20] rounded-xl shadow-md border-2 border-transparent hover:border-primary w-24 h-24 flex items-center justify-center"
              >
                <div
                  className="w-full h-full bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url("${url}")` }}
                ></div>
              </div>
            ))}
          </div>

          {/* Drop Zone */}
          <div className="border-4 border-dashed border-primary/30 rounded-3xl p-12 bg-primary/5 flex flex-col items-center justify-center text-primary/50 font-bold text-xl uppercase tracking-widest hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-6xl mb-4">
              move_to_inbox
            </span>
            Suelta aquí los tesoros
          </div>
        </section>
      </main>

      {/* Action Footer */}
      <footer className="flex justify-end gap-4">
        <button className="px-8 py-4 bg-white dark:bg-[#1a2e20] text-gray-500 font-bold rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:text-[#111813] transition-colors">
          Saltar Ejercicio
        </button>
        <Link href="/dashboard/worksheet/feedback">
          <button className="px-12 py-4 bg-primary text-[#102216] font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform flex items-center gap-3 text-lg">
            <span>Comprobar</span>
            <span className="material-symbols-outlined">check_circle</span>
          </button>
        </Link>
      </footer>
    </div>
  );
}
