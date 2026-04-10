import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal — TUTOR_AI',
  description:
    'Aviso legal e información del titular del sitio web TUTOR_AI.',
};

export default function AvisoLegalPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl lg:text-4xl font-black text-[#111813] dark:text-white">
          Aviso Legal
        </h1>
        <p className="text-sm text-slate-400">
          Última actualización: abril de 2026
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          1. Datos identificativos
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
          Servicios de la Sociedad de la Información y de Comercio Electrónico
          (LSSI-CE), se informa al usuario de los datos del titular de este
          sitio web:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
          <li>
            <strong>Titular:</strong> TUTOR_AI (proyecto personal).
          </li>
          <li>
            <strong>Correo electrónico de contacto:</strong>{' '}
            <a
              href="mailto:contact@tutoraiapp.es"
              className="text-primary hover:underline"
            >
              contact@tutoraiapp.es
            </a>
          </li>
          <li>
            <strong>Sitio web:</strong>{' '}
            <a
              href="https://tutoraiapp.es"
              className="text-primary hover:underline"
            >
              tutoraiapp.es
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          2. Objeto
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          El presente sitio web tiene como finalidad ofrecer un servicio
          educativo basado en inteligencia artificial para la generación de
          fichas de estudio personalizadas dirigidas a familias con hijos en
          edad escolar.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          3. Condiciones de uso
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          La utilización de este sitio web atribuye la condición de usuario e
          implica la aceptación plena de todas las disposiciones incluidas en
          este Aviso Legal, así como en la{' '}
          <a href="/privacidad" className="text-primary hover:underline">
            Política de Privacidad
          </a>
          , la{' '}
          <a href="/cookies" className="text-primary hover:underline">
            Política de Cookies
          </a>{' '}
          y los{' '}
          <a href="/terminos" className="text-primary hover:underline">
            Términos y Condiciones
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          4. Propiedad intelectual e industrial
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Todos los contenidos del sitio web —incluyendo, a título enunciativo,
          textos, imágenes, gráficos, logotipos, iconos, código fuente y
          software— son propiedad del titular o de terceros que han autorizado
          su uso, y están protegidos por la legislación vigente en materia de
          propiedad intelectual e industrial. Queda prohibida su reproducción,
          distribución, comunicación pública o transformación sin autorización
          expresa.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          5. Exclusión de responsabilidad
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          El titular no se hace responsable de los daños y perjuicios que
          pudieran derivarse del uso de este sitio web, incluyendo, sin
          limitación, errores u omisiones en los contenidos, falta de
          disponibilidad del sitio o transmisión de virus o programas
          maliciosos. El servicio se encuentra actualmente en fase beta y puede
          sufrir interrupciones o cambios sin previo aviso.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          6. Enlaces externos
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          El sitio web puede contener enlaces a páginas de terceros. El titular
          no asume responsabilidad alguna sobre el contenido, la disponibilidad
          o la política de privacidad de dichas páginas externas.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          7. Protección de datos
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          El tratamiento de los datos personales de los usuarios se detalla en
          nuestra{' '}
          <a href="/privacidad" className="text-primary hover:underline">
            Política de Privacidad
          </a>
          , conforme al Reglamento General de Protección de Datos (RGPD) y la
          Ley Orgánica 3/2018 de Protección de Datos y garantía de los derechos
          digitales (LOPDGDD).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          8. Legislación aplicable y jurisdicción
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          El presente Aviso Legal se rige por la legislación española. Para
          cualquier controversia derivada del acceso o uso de este sitio web,
          las partes se someten a los juzgados y tribunales del domicilio del
          usuario, de conformidad con la normativa vigente.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          9. Contacto
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Para cualquier consulta relativa a este Aviso Legal, puedes
          contactarnos en{' '}
          <a
            href="mailto:contact@tutoraiapp.es"
            className="text-primary hover:underline"
          >
            contact@tutoraiapp.es
          </a>
          .
        </p>
      </section>
    </article>
  );
}
