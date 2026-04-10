import LinkButton from '@/components/LinkButton';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const HERO_STATS = [
  { value: '+500', label: 'fichas generadas' },
  { value: '24/7', label: 'acceso inmediato' },
  { value: '100%', label: 'personalizable' },
];

const FEATURES = [
  {
    icon: 'psychology',
    title: 'Personalización inmediata',
    description:
      'Actividades adaptadas al curso y los gustos de cada hijo, listas para imprimir y usar sin complicaciones.',
  },
  {
    icon: 'edit_square',
    title: 'Confianza y motivación',
    description:
      'Celebramos cada acierto y fomentamos la autoestima con un sistema de refuerzo positivo tangible y divertido.',
  },
  {
    icon: 'auto_stories',
    title: 'Gamificación física',
    description:
      'Al completar actividades, tu hijo recibe recompensas tangibles que hacen visible su progreso y logros.',
  },
];

const PRODUCT_BULLETS = [
  'Fichas PDF listas para imprimir',
  'Guía para padres incluida',
  'Gamificación física y motivadora',
];

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard/chat');
  }

  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden bg-gradient-to-br from-background-dark via-[#101a2b] to-background-dark text-white">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background-light dark:to-background-dark" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 bg-white/10 text-primary px-3 py-1 rounded-full w-fit">
              <span className="material-symbols-outlined text-sm">
                auto_awesome
              </span>
              <span className="text-xs font-bold tracking-wide uppercase">
                Aprendizaje Personalizado
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                <span className="text-primary underline decoration-primary/20 underline-offset-8">
                  Acompaña
                </span>{' '}
                el aprendizaje de tus hijos, curso a curso
              </h1>
              <p className="text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed">
                Actividades personalizadas que conectan los intereses de tu hijo
                con su curso. Estudio efectivo, motivador y sin estrés.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-orange-300 bg-white/10 px-3 py-1 rounded-full w-fit">
                  🔥 Acceso Beta Gratuito (Plazas Limitadas)
                </span>
                <LinkButton href="/register" variant="big">
                  Empieza gratis ahora
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </LinkButton>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 border border-white/20 rounded-xl">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400" />
                </div>
                <span className="text-xs font-medium text-white/80">
                  +500 fichas generadas
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30" />
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-8 border-white/70"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAEuNJ-VJNWX4ukpQHGhJKfmyH8-v-8cTcaweu1yclAbV17tCytS9KGamN91f1GuOQjCct0rG5id7Taohu-MEYCsIsFAI7kHfjqdOSilm9nPdKOSIXgCKWgntSvsWwjFK-D_xSyEKYe-qKltTDhv4le_1NYbqGqVUqCGRI8ctbvivfw_ljU1fQvZdGlc_pCWwx1Qp0HwIMhYTpVn-H_yPJeJkdCU_srAXdEpdDqzvG3XGOMR5sc9JG3-uQfI4V-Yi1OLmrVsf-YKPk")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 bg-white/5 border border-white/10 rounded-2xl p-6">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-black text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-white/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black text-[#111813] dark:text-white">
              Educación que conecta con tu hijo
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Combinamos tecnología y métodos tradicionales para un aprendizaje
              efectivo, emocional y sin pantallas.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <article
                key={feature.title}
                className="bg-background-light dark:bg-[#111b2a] p-8 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-primary/5 rounded-[2rem] p-8 lg:p-16 overflow-hidden relativo">
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-5xl font-black text-[#111813] dark:text-white leading-tight">
                  Del mundo digital al papel real
                </h2>
                <p className="text-lg text-slate-700 dark:text-slate-300">
                  Nuestra IA genera el contenido, pero el aprendizaje ocurre en
                  el papel. Evita la fatiga digital y recupera la conexión
                  física con el estudio.
                </p>
                <ul className="space-y-4">
                  {PRODUCT_BULLETS.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="bg-primary text-white p-1 rounded-full">
                        <span className="material-symbols-outlined text-xs font-bold">
                          check
                        </span>
                      </div>
                      <span className="font-medium dark:text-slate-200">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBd7OsKkM0BQ6n24HOkz7p0guJ6bfusvkPfEIRe_lxcsxs_l6atjpHc39yawDuTt7YygOnqv9GYd4G9sAMv5chX1eH3Ahe0jY46JHfJohgsbFGU6IB8pBiGpviEil--RMJGT8PODmlM9lMkF9UCDE7aK_XFl6hXP2EuOBO7gpGLN-1U6hCwnO0Dvv4Ikx1l1I0q0ktQDBhEcpmWsBUhyKGPAcVYIEmdCB7XfHisQSjt7B8sdJN1-9nbpY8KL9tu4D-oHCcpt5qwdH4',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBwtUJsfiQ72wkoexFfB5ogofk_5h2Bs32sDKmXbndpplK93eySIBoEol3FDj7Ojq5iF34qwWhugMwRrF_gD5NUcy7Z-oaXEs4pcEDN1g4M__cAfLEXKWpOk7Q7gLCubUxV1QGIVYedPuzZCDdecSEwTWNRnP3QTYRR4d5_VbuyXFZsqlol8dCJkSKiCpyusKKpKR9RU9CR2cB9tu2cBfLHSQjAtQReTlzeyHP8v9pyxDFhhcp7G1_LzmLZamS_pfENUJyZJKUU_JU',
                ].map((url, idx) => (
                  <div
                    key={url}
                    className={`aspect-square bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-4 border-white dark:border-slate-700 ${idx === 0 ? 'rotate-3' : '-rotate-3 mt-12'}`}
                    style={{
                      backgroundImage: `url("${url}")`,
                      backgroundSize: 'cover',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background-light dark:bg-background-dark/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '100%', label: 'Personalizable' },
              { value: '500+', label: 'Fichas Generadas' },
              { value: '24/7', label: 'Acceso Inmediato' },
              { value: '0', label: 'Estrés en Casa' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl flex flex-col items-center text-center gap-2 bg-white dark:bg-orange-900/40 p-6"
              >
                <p className="text-orange-500 text-4xl lg:text-5xl font-black">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-orange-500 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-slate-900 dark:bg-slate-800 p-12 lg:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="relative space-y-8">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                Transforma la hora de estudio
              </h2>
              <p className="text-slate-400 text-lg">
                Únete a otras familias que ya están recuperando sus tardes.
                Empieza hoy tu prueba gratuita y personaliza el aprendizaje de
                tus hijos.
              </p>
              <div className="flex flex-col items-center gap-4">
                <LinkButton href="/register">Probar gratis</LinkButton>
                <p className="text-slate-500 text-sm">
                  Sin compromiso. Cancela en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
