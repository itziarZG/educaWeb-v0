import React from 'react';
import Link from 'next/link';
import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProfileSelectionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: children, error } = await supabase
    .from('children')
    .select('id,name, age, grade, interests, observations')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching children:', error);
  }
  if (!children || children.length === 0) {
    redirect('/create-child');
  }
  const leoUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDB0zIlaHUbAWN_lOj7jjhfik0xanQMOFO_knLHysvrIk8RrQXH_xoZtCuTVN0WlVC7pS2ONH9xAjqnjA2eryi3ET_r9QeuFo2_f1pZ0nb2fDrsQ4A8q3rEFYIo_qgx8vXqI2J1hM5gjIjqbXikNKGlT5Vi_Ek1DOgPICkaQrn5Tkyv3DIN2mWz79ciZwGjy6KCHhoeuwwy1IfgL0r68q0RaoDslAzN6pdI-iL_SF7OKy48lEjdNK0bResnklqBOeQSklcdLO_wBw0';

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display antialiased transition-colors duration-300">
      {/* TopAppBar */}
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="w-12"></div> {/* Spacer for centering */}
        {/* <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Selección de Perfil
        </h2> */}
        {/* <div className="flex w-12 items-center justify-end">
          <button className="text-primary text-base font-bold leading-normal tracking-[0.015em] hover:opacity-80 transition-opacity">
            Editar
          </button>
        </div> */}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {/* HeadlineText */}
        <div className="w-full max-w-md">
          <h2 className="text-slate-900 dark:text-slate-100 tracking-tight text-[32px] font-bold leading-tight px-4 text-center pb-8 pt-5">
            ¿Quién va a estudiar hoy?
          </h2>
        </div>

        {/* ImageGrid / Profile Selection */}
        <div className="w-full max-w-sm">
          <div className="grid grid-cols-2 gap-8 p-4">
            {children &&
              children.length > 0 &&
              children.map((child) => (
                <Link
                  href={`/chat?childId=${child.id}`}
                  key={child.id}
                  className="group flex flex-col items-center gap-4 text-center focus:outline-none w-full"
                >
                  <div className="relative w-full aspect-square max-w-[140px]">
                    <div
                      className="w-full h-full bg-center bg-no-repeat bg-cover rounded-full border-4 border-transparent group-hover:border-primary group-active:scale-95 transition-all duration-200 shadow-md"
                      style={{
                        backgroundImage: `url("${leoUrl}")`,
                      }}
                    ></div>
                  </div>
                  <p className="text-slate-900 dark:text-slate-100 text-xl font-semibold leading-normal">
                    {child.name}
                  </p>
                </Link>
              ))}
          </div>
        </div>

        {/* SingleButton (Add New Student) */}
        <div className="w-full max-w-sm mt-12 mb-10">
          <div className="flex px-4 py-3 justify-center">
            <Link
              href="/create-child"
              className="flex min-w-[200px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary/10 border-2 border-dashed border-primary/30 text-slate-900 dark:text-slate-100 gap-3 hover:bg-primary/20 transition-colors group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-slate-900">
                <span className="material-symbols-outlined text-[20px] font-bold">
                  add
                </span>
              </div>
              <span className="truncate text-base font-bold leading-normal tracking-[0.015em]">
                Añadir Nuevo Estudiante
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
