import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo_tutorai.png"
              alt="TUTOR_AI Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <h2 className="text-[#111813] dark:text-white text-lg font-bold leading-tight tracking-tight">
              TUTOR_AI
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <Link
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
              href="#"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="bg-primary hover:bg-primary/90 text-[#111813] px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-sm"
            >
              Probar gratis
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-slate-800 dark:text-primary-100 px-3 py-1 rounded-full w-fit">
                <span className="material-symbols-outlined text-sm">
                  auto_awesome
                </span>
                <span className="text-xs font-bold tracking-wide uppercase">
                  Aprendizaje Personalizado
                </span>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-black text-[#111813] dark:text-white leading-[1.1] tracking-tight">
                  Devuelve la{" "}
                  <span className="text-primary underline decoration-primary/20 underline-offset-8">
                    calma
                  </span>{" "}
                  a tus tardes
                </h1>
                <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                  Actividades personalizadas que conectan los intereses de tu
                  hijo con su curso. Estudio efectivo, motivador y sin estrés.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="bg-primary hover:bg-primary/90 text-[#111813] px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  Empieza gratis ahora
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Link>
                <div className="flex items-center gap-3 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400"></div>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    +500 familias probando
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30"></div>
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAEuNJ-VJNWX4ukpQHGhJKfmyH8-v-8cTcaweu1yclAbV17tCytS9KGamN91f1GuOQjCct0rG5id7Taohu-MEYCsIsFAI7kHfjqdOSilm9nPdKOSIXgCKWgntSvsWwjFK-D_xSyEKYe-qKltTDhv4le_1NYbqGqVUqCGRI8ctbvivfw_ljU1fQvZdGlc_pCWwx1Qp0HwIMhYTpVn-H_yPJeJkdCU_srAXdEpdDqzvG3XGOMR5sc9JG3-uQfI4V-Yi1OLmrVsf-YKPk")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl lg:text-4xl font-black text-[#111813] dark:text-white">
                Educación que conecta con tu hijo
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Combinamos tecnología y métodos tradicionales para un
                aprendizaje efectivo, emocional y sin pantallas.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    psychology
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  Personalización inmediata
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Actividades adaptadas al curso y los gustos de cada hijo,
                  listas para imprimir y usar sin complicaciones.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    edit_square
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  Confianza y motivación
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Celebramos cada acierto y fomentamos la autoestima con un
                  sistema de refuerzo positivo tangible y divertido.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    auto_stories
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  Gamificación física
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Al completar actividades, tu hijo recibe recompensas tangibles
                  que hacen visible su progreso y logros.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-primary/5 rounded-[2rem] p-8 lg:p-16 overflow-hidden relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-5xl font-black text-[#111813] dark:text-white leading-tight">
                    Del mundo digital al papel real
                  </h2>
                  <p className="text-lg text-slate-700 dark:text-slate-300">
                    Nuestra IA genera el contenido, pero el aprendizaje ocurre
                    en el papel. Evita la fatiga digital y recupera la conexión
                    física con el estudio.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="bg-primary text-white p-1 rounded-full">
                        <span className="material-symbols-outlined text-xs font-bold">
                          check
                        </span>
                      </div>
                      <span className="font-medium dark:text-slate-200">
                        Fichas PDF listas para imprimir
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="bg-primary text-white p-1 rounded-full">
                        <span className="material-symbols-outlined text-xs font-bold">
                          check
                        </span>
                      </div>
                      <span className="font-medium dark:text-slate-200">
                        Guía para padres incluida
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="bg-primary text-white p-1 rounded-full">
                        <span className="material-symbols-outlined text-xs font-bold">
                          check
                        </span>
                      </div>
                      <span className="font-medium dark:text-slate-200">
                        Gamificación física y motivadora
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="aspect-square bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 rotate-3 border-4 border-white dark:border-slate-700"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBd7OsKkM0BQ6n24HOkz7p0guJ6bfusvkPfEIRe_lxcsxs_l6atjpHc39yawDuTt7YygOnqv9GYd4G9sAMv5chX1eH3Ahe0jY46JHfJohgsbFGU6IB8pBiGpviEil--RMJGT8PODmlM9lMkF9UCDE7aK_XFl6hXP2EuOBO7gpGLN-1U6hCwnO0Dvv4Ikx1l1I0q0ktQDBhEcpmWsBUhyKGPAcVYIEmdCB7XfHisQSjt7B8sdJN1-9nbpY8KL9tu4D-oHCcpt5qwdH4")',
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div
                    className="aspect-square bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 -rotate-3 border-4 border-white dark:border-slate-700 mt-12"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwtUJsfiQ72wkoexFfB5ogofk_5h2Bs32sDKmXbndpplK93eySIBoEol3FDj7Ojq5iF34qwWhugMwRrF_gD5NUcy7Z-oaXEs4pcEDN1g4M__cAfLEXKWpOk7Q7gLCubUxV1QGIVYedPuzZCDdecSEwTWNRnP3QTYRR4d5_VbuyXFZsqlol8dCJkSKiCpyusKKpKR9RU9CR2cB9tu2cBfLHSQjAtQReTlzeyHP8v9pyxDFhhcp7G1_LzmLZamS_pfENUJyZJKUU_JU")',
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background-light dark:bg-background-dark/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center gap-2">
                <p className="text-primary text-4xl lg:text-5xl font-black">
                  500+
                </p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Familias Felices
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <p className="text-primary text-4xl lg:text-5xl font-black">
                  10k+
                </p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Fichas Generadas
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <p className="text-primary text-4xl lg:text-5xl font-black">
                  98%
                </p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Aprobado Escolar
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <p className="text-primary text-4xl lg:text-5xl font-black">
                  0
                </p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Estrés en Casa
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-slate-900 dark:bg-slate-800 p-12 lg:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                  Transforma la hora de estudio
                </h2>
                <p className="text-slate-400 text-lg">
                  Únete a otras familias que ya están recuperando sus tardes.
                  Empieza hoy tu prueba gratuita y personaliza el aprendizaje de
                  tus hijos.
                </p>
                <div className="flex flex-col items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="bg-primary hover:bg-primary/90 text-[#111813] px-12 py-5 rounded-2xl text-xl font-black transition-all shadow-xl shadow-primary/20 w-full sm:w-auto block"
                  >
                    Probar gratis 7 días
                  </Link>
                  <p className="text-slate-500 text-sm">
                    Sin compromiso. Cancela en cualquier momento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Image
              src="/logo_tutorai.png"
              alt="TUTOR_AI Logo"
              width={32}
              height={32}
              className="object-contain mr-2"
            />
            <span className="text-[#111813] dark:text-white font-bold text-lg uppercase tracking-wider">
              TUTOR_AI
            </span>
          </div>
          <nav className="flex gap-8">
            <a
              className="text-slate-500 hover:text-primary transition-colors text-sm"
              href="#"
            >
              Privacidad
            </a>
            <a
              className="text-slate-500 hover:text-primary transition-colors text-sm"
              href="#"
            >
              Términos
            </a>
            <a
              className="text-slate-500 hover:text-primary transition-colors text-sm"
              href="mailto:contact@tutoraiapp.es"
            >
              Contacto
            </a>
            <a
              className="text-slate-500 hover:text-primary transition-colors text-sm"
              href="#"
            >
              Blog
            </a>
          </nav>
          <p className="text-slate-400 text-sm">
            © 2026 TUTOR_AI. Hecho con ❤️ para familias.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <Link
          href="/dashboard"
          className="w-full bg-primary text-[#111813] py-4 rounded-xl font-black shadow-2xl flex items-center justify-center gap-2 border-2 border-white/20"
        >
          <span className="material-symbols-outlined">rocket_launch</span>
          Empieza Gratis
        </Link>
      </div>
    </>
  );
}
