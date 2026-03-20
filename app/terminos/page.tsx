import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones — TUTOR_AI',
  description:
    'Condiciones de uso del servicio TUTOR_AI. Léelas antes de usar la plataforma.',
};

export default function TerminosPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl lg:text-4xl font-black text-[#111813] dark:text-white">
          Términos y Condiciones
        </h1>
        <p className="text-sm text-slate-400">
          Última actualización: marzo de 2026
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          1. Aceptación de los términos
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Al acceder o utilizar TUTOR_AI (disponible en{' '}
          <a
            href="https://tutoraiapp.es"
            className="text-primary hover:underline"
          >
            tutoraiapp.es
          </a>
          ), aceptas quedar vinculado por estos Términos y Condiciones. Si no
          estás de acuerdo con alguno de ellos, por favor, no uses el servicio.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          2. Descripción del servicio
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          TUTOR_AI es una plataforma educativa personal en fase beta que utiliza
          inteligencia artificial para generar fichas de estudio personalizadas
          para niños y jóvenes en edad escolar. Las fichas se adaptan al curso
          académico y a los intereses de cada alumno, y pueden descargarse en
          formato PDF para imprimirse y usarse sin necesidad de dispositivos
          digitales.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          3. Acceso beta y disponibilidad
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          El servicio se encuentra actualmente en versión beta con plazas
          limitadas. Durante esta fase:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
          <li>
            El acceso es gratuito pero puede quedar restringido en cualquier
            momento.
          </li>
          <li>
            Es posible que el servicio sufra interrupciones, errores o cambios
            sin previo aviso.
          </li>
          <li>
            Las funcionalidades disponibles pueden variar o ser retiradas
            durante el período beta.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          4. Registro y cuenta de usuario
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Para usar TUTOR_AI es necesario crear una cuenta. Al registrarte, te
          comprometes a:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
          <li>Proporcionar información veraz, completa y actualizada.</li>
          <li>
            Mantener la confidencialidad de tus credenciales de acceso y ser
            responsable de toda la actividad realizada desde tu cuenta.
          </li>
          <li>Notificarnos de inmediato cualquier uso no autorizado.</li>
        </ul>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          El uso de la plataforma en nombre de menores de edad debe realizarse
          bajo la supervisión y responsabilidad del progenitor o tutor legal.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          5. Uso aceptable
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Aceptas utilizar TUTOR_AI únicamente con fines educativos personales y
          legales. Queda prohibido:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
          <li>
            Usar el servicio para generar contenido ilegal, ofensivo o dañino.
          </li>
          <li>
            Intentar acceder a partes del sistema para las que no tienes
            autorización.
          </li>
          <li>
            Reproducir, distribuir o comercializar el servicio o sus contenidos
            sin autorización expresa.
          </li>
          <li>
            Usar herramientas automatizadas para extraer datos de la plataforma
            (scraping).
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          6. Contenido generado por IA
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Las fichas y contenidos generados por la inteligencia artificial de
          TUTOR_AI son orientativos y de carácter educativo complementario. No
          sustituyen la supervisión de un docente o tutor cualificado. Te
          recomendamos revisar el contenido antes de usarlo con tus hijos. El
          titular del servicio no se responsabiliza de errores o inexactitudes
          en el contenido generado.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          7. Propiedad intelectual
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          El código, diseño, marca y demás elementos de la plataforma son
          propiedad del titular del proyecto TUTOR_AI y están protegidos por la
          legislación española e internacional de propiedad intelectual. Las
          fichas generadas para uso personal pueden descargarse e imprimirse
          libremente; no está permitida su reventa ni distribución comercial.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          8. Créditos y pagos
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Durante la fase beta, el servicio se ofrece de forma gratuita mediante
          un sistema de créditos. En el futuro pueden introducirse planes de
          pago. En tal caso, se comunicará con antelación suficiente y se
          requerirá una aceptación explícita de las nuevas condiciones
          económicas antes de realizar ningún cargo.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          9. Limitación de responsabilidad
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          En la medida en que lo permita la legislación vigente, TUTOR_AI se
          proporciona &quot;tal cual&quot; y sin garantías de ningún tipo. El
          titular no será responsable de daños directos, indirectos,
          incidentales o consecuentes derivados del uso o la imposibilidad de
          uso del servicio.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          10. Modificación y cancelación del servicio
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Nos reservamos el derecho a modificar, suspender o cancelar el
          servicio, total o parcialmente, en cualquier momento. Asimismo,
          podemos actualizar estos Términos y Condiciones. Los cambios
          significativos se comunicarán por correo electrónico o mediante aviso
          en la plataforma. El uso continuado tras la notificación implica la
          aceptación de los nuevos términos.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          11. Legislación aplicable
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Estos Términos y Condiciones se rigen por la legislación española.
          Para cualquier controversia derivada de su interpretación o
          cumplimiento, las partes se someten a los juzgados y tribunales del
          domicilio del usuario, salvo que la normativa vigente disponga otro
          fuero.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          12. Contacto
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Si tienes preguntas sobre estos términos, puedes escribirnos a{' '}
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
