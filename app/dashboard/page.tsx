import { createClient } from '@utils/supabase/server';
import Link from 'next/link';

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  await supabase.from('clients').select('*').single();

  // Placeholder URLs adhering to the new design
  // Placeholder URLs adhering to the new design

  const familyUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAGIAV0yd2FnpzvB0978HxNUm6fwhI24iNyBg6Dx-wK32aIhXw-14zYDkNyYjzgwtvlkunHx6OSuiBoWRln7CSl2eyaCVWnLudEZdhuFCizuXs1QZVrEFZjVNXzkUbNS8Bl1-jgKZAw9QLuSct_Fxd-U0jNT-deXs5OquC4Cf6USjd8GoD-E9FRM5So4pgFyr8WMdk0pRYWFg1u6mXXI10g3ExD2ocT3zKu8mdKa-34j_yfIFzeiEtNqLXLqWVU3DX3h9HYVkjGwBA';

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#111813] dark:text-white tracking-tight text-3xl md:text-4xl font-bold leading-tight">
            ¡Hola, {user?.email?.split('@')[0] || 'Leo'}! 👋
          </h1>
          <p className="text-[#61896f] dark:text-[#a0c4ae] text-base mt-2">
            ¿Listo para tu aventura de aprendizaje hoy?
          </p>
        </div>

        {/* Quick Stats (Desktop) */}
        <div className="flex gap-4">
          <div className="flex items-center gap-3 bg-white dark:bg-[#1a2e20] px-5 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
              <span className="material-symbols-outlined text-orange-500 text-xl">
                local_fire_department
              </span>
            </div>
            <div>
              <p className="text-[#111813] dark:text-white text-lg font-bold leading-none">
                5
              </p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Racha
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-[#1a2e20] px-5 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="bg-primary/20 p-2 rounded-lg">
              <span className="material-symbols-outlined text-primary text-xl">
                database
              </span>
            </div>
            <div>
              <p className="text-[#111813] dark:text-white text-lg font-bold leading-none">
                120
              </p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Puntos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Action & Progress) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Hero Action Card */}
          <div className="relative group w-full overflow-hidden rounded-3xl bg-linear-to-r from-primary to-emerald-400 p-1 shadow-lg shadow-primary/20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative bg-white dark:bg-[#102216] rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10 h-full">
              <div className="flex-1 text-center md:text-left z-10">
                <h2 className="text-2xl md:text-3xl font-black text-[#111813] dark:text-white mb-2">
                  ¡Continúa tu Misión!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Tienes 2 desafíos pendientes para completar el objetivo
                  diario. ¡Tú puedes!
                </p>
                <Link href="/dashboard/worksheet">
                  <button className="bg-primary hover:bg-emerald-400 text-[#111813] font-bold text-lg py-3 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto md:mx-0">
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      rocket_launch
                    </span>
                    Empezar Sesión
                  </button>
                </Link>
              </div>
              {/* Decorative Illustration */}
              <div className="hidden md:block w-48 h-48 relative shrink-0">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
                <div
                  className="relative z-10 w-full h-full bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage:
                      "url('https://cdn-icons-png.flaticon.com/512/7486/7486253.png')",
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Today's Progress Section */}
          <section className="bg-white dark:bg-[#1a2e20] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#111813] dark:text-white">
                Tu Progreso de Hoy
              </h3>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                2/3 Retos
              </span>
            </div>

            {/* Big Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-6 overflow-hidden mb-8 relative">
              <div className="absolute top-0 bottom-0 left-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20 z-10 w-[66%] animate-[slide_20s_linear_infinite]"></div>
              <div className="bg-primary h-full rounded-full transition-all duration-1000 w-[66%] relative"></div>
            </div>

            {/* Challenge Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="bg-background-light dark:bg-[#102216] p-4 rounded-2xl flex flex-col gap-3 group border border-transparent hover:border-primary/20 transition-all">
                <div className="flex justify-between items-start">
                  <div className="bg-white dark:bg-[#1a2e20] p-2 rounded-xl shadow-sm text-primary">
                    <span className="material-symbols-outlined">calculate</span>
                  </div>
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-[#111813] dark:text-white">
                    Matemáticas
                  </h4>
                  <p className="text-xs text-gray-500">Desafío de Números</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-background-light dark:bg-[#102216] p-4 rounded-2xl flex flex-col gap-3 group border border-transparent hover:border-primary/20 transition-all">
                <div className="flex justify-between items-start">
                  <div className="bg-white dark:bg-[#1a2e20] p-2 rounded-xl shadow-sm text-primary">
                    <span className="material-symbols-outlined">
                      auto_stories
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-[#111813] dark:text-white">
                    Lectura
                  </h4>
                  <p className="text-xs text-gray-500">Comprensión Lectora</p>
                </div>
              </div>

              {/* Card 3 (Incomplete) */}
              <div className="bg-background-light dark:bg-[#102216] p-4 rounded-2xl flex flex-col gap-3 relative overflow-hidden border border-gray-200 dark:border-gray-700 opacity-80 hover:opacity-100 transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="bg-white dark:bg-[#1a2e20] p-2 rounded-xl shadow-sm text-gray-400">
                    <span className="material-symbols-outlined">science</span>
                  </div>
                  <span className="material-symbols-outlined text-gray-300">
                    radio_button_unchecked
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-[#111813] dark:text-white">
                    Ciencias
                  </h4>
                  <p className="text-xs text-gray-500">Experimento Diario</p>
                </div>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (Family Peace & Stats) */}
        <div className="flex flex-col gap-6">
          {/* Family Peace Card */}
          <div className="bg-white dark:bg-[#1a2e20] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  family_restroom
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#111813] dark:text-white">
                Paz Familiar
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-[#111813] dark:text-white">
                  100%
                </span>
                <span className="text-sm text-[#61896f]">Armonía Total</span>
              </div>
              <div
                className="size-20 rounded-full bg-cover bg-center border-2 border-white dark:border-gray-700 shadow-md"
                style={{ backgroundImage: `url("${familyUrl}")` }}
              ></div>
            </div>

            <div className="bg-background-light dark:bg-[#102216] p-3 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center italic">
                &quot;¡Gran trabajo en equipo! Leo ha estado muy tranquilo
                hoy.&quot;
              </p>
            </div>

            <Link href="/dashboard/worksheet/feedback" className="w-full">
              <button className="w-full py-2 text-sm font-bold text-primary border border-primary rounded-xl hover:bg-primary/10 transition-colors">
                Añadir Nuevo Feedback
              </button>
            </Link>
          </div>

          {/* Upcoming Events / Calendar Mini */}
          <div className="bg-white dark:bg-[#1a2e20] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-[#111813] dark:text-white">
                Próximos Retos
              </h3>
              <Link
                href="/dashboard/calendar"
                className="text-xs font-bold text-primary uppercase hover:underline"
              >
                Ver Todo
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex gap-4 items-center group cursor-pointer">
                <div className="flex-col items-center justify-center w-12 h-14 bg-gray-100 dark:bg-[#102216] rounded-xl hidden group-hover:flex transition-all">
                  <span className="text-xs font-bold text-primary">OCT</span>
                  <span className="text-lg font-black text-[#111813] dark:text-white">
                    12
                  </span>
                </div>
                <div className="flex items-center justify-center w-12 h-14 bg-gray-50 dark:bg-[#102216]/50 rounded-xl group-hover:hidden text-gray-400">
                  <span className="material-symbols-outlined">
                    calendar_today
                  </span>
                </div>
                <div>
                  <p className="font-bold text-[#111813] dark:text-white">
                    Examen de Fracciones
                  </p>
                  <p className="text-xs text-[#61896f]">
                    Matemáticas • En 2 días
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>

              <div className="flex gap-4 items-center group cursor-pointer">
                <div className="flex-col items-center justify-center w-12 h-14 bg-gray-100 dark:bg-[#102216] rounded-xl hidden group-hover:flex transition-all">
                  <span className="text-xs font-bold text-primary">OCT</span>
                  <span className="text-lg font-black text-[#111813] dark:text-white">
                    15
                  </span>
                </div>
                <div className="flex items-center justify-center w-12 h-14 bg-gray-50 dark:bg-[#102216]/50 rounded-xl group-hover:hidden text-gray-400">
                  <span className="material-symbols-outlined">
                    calendar_today
                  </span>
                </div>
                <div>
                  <p className="font-bold text-[#111813] dark:text-white">
                    Ciclo del Agua
                  </p>
                  <p className="text-xs text-[#61896f]">Ciencias • En 5 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
