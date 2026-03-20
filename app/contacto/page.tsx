import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto — TUTOR_AI',
  description:
    'Ponte en contacto con el equipo de TUTOR_AI. Estamos aquí para ayudarte.',
};

export default function ContactoPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl lg:text-4xl font-black text-[#111813] dark:text-white">
          Contacto
        </h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          ¿Tienes alguna pregunta, sugerencia o quieres colaborar? Escríbenos y
          te responderemos lo antes posible.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 gap-6">
        {/* Email */}
        <div className="bg-background-light dark:bg-background-dark p-6 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all group space-y-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-2xl">
              mail
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#111813] dark:text-white">
            Correo electrónico
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Para consultas generales, soporte técnico o cualquier otra cosa.
          </p>
          <a
            href="mailto:contact@tutoraiapp.es"
            className="inline-block text-primary font-semibold hover:underline text-sm"
          >
            contact@tutoraiapp.es
          </a>
        </div>

        {/* Response time */}
        <div className="bg-background-light dark:bg-background-dark p-6 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all group space-y-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-2xl">
              schedule
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#111813] dark:text-white">
            Tiempo de respuesta
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Intentamos responder en un plazo de 24–48 horas en días laborables.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          Preguntas frecuentes
        </h2>

        <div className="space-y-4">
          <details className="group bg-background-light dark:bg-background-dark rounded-2xl border border-primary/5 hover:border-primary/20 transition-all">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[#111813] dark:text-white list-none">
              ¿Cómo funciona el acceso beta gratuito?
              <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <p className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
              Durante la fase beta, puedes usar TUTOR_AI de forma completamente
              gratuita con un número de créditos limitado. Los créditos se usan
              para generar fichas. Cuando el servicio pase a producción, te
              avisaremos con antelación.
            </p>
          </details>

          <details className="group bg-background-light dark:bg-background-dark rounded-2xl border border-primary/5 hover:border-primary/20 transition-all">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[#111813] dark:text-white list-none">
              ¿Para qué edades está pensado TUTOR_AI?
              <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <p className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
              TUTOR_AI está diseñado principalmente para niños y jóvenes en
              edad escolar, desde Educación Primaria hasta Secundaria
              (aproximadamente de 6 a 16 años). Las fichas se adaptan al nivel
              y curso de cada alumno.
            </p>
          </details>

          <details className="group bg-background-light dark:bg-background-dark rounded-2xl border border-primary/5 hover:border-primary/20 transition-all">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[#111813] dark:text-white list-none">
              ¿Cómo puedo eliminar mi cuenta y mis datos?
              <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <p className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
              En cualquier momento puedes solicitar la eliminación de tu cuenta
              y todos tus datos escribiéndonos a{' '}
              <a
                href="mailto:contact@tutoraiapp.es"
                className="text-primary hover:underline"
              >
                contact@tutoraiapp.es
              </a>
              . Procesaremos tu solicitud en un máximo de 30 días.
            </p>
          </details>

          <details className="group bg-background-light dark:bg-background-dark rounded-2xl border border-primary/5 hover:border-primary/20 transition-all">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[#111813] dark:text-white list-none">
              ¿Puedo usar TUTOR_AI como docente o centro educativo?
              <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <p className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
              Actualmente TUTOR_AI está pensado para familias, pero si eres
              docente o representas a un centro educativo y tienes interés en
              usarlo, escríbenos a{' '}
              <a
                href="mailto:contact@tutoraiapp.es"
                className="text-primary hover:underline"
              >
                contact@tutoraiapp.es
              </a>{' '}
              y estudiaremos cómo podemos ayudarte.
            </p>
          </details>
        </div>
      </section>

      <section className="bg-primary/5 rounded-2xl p-8 text-center space-y-4">
        <span className="material-symbols-outlined text-primary text-4xl">
          favorite
        </span>
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          Hecho con ❤️ para familias españolas
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          TUTOR_AI es un proyecto personal con el objetivo de devolver la calma
          a las tardes de estudio. Cada mensaje que recibimos nos ayuda a
          mejorar. ¡Gracias por ser parte de esta aventura!
        </p>
        <a
          href="mailto:contact@tutoraiapp.es"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm"
        >
          <span className="material-symbols-outlined text-base">mail</span>
          Enviar un mensaje
        </a>
      </section>
    </article>
  );
}
