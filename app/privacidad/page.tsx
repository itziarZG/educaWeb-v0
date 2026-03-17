import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad — TUTOR_AI',
  description:
    'Información sobre cómo TUTOR_AI recoge, usa y protege tus datos personales.',
};

export default function PrivacidadPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl lg:text-4xl font-black text-[#111813] dark:text-white">
          Política de Privacidad
        </h1>
        <p className="text-sm text-slate-400">
          Última actualización: marzo de 2026
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          1. Responsable del tratamiento
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          El responsable del tratamiento de los datos personales recogidos a
          través de este sitio web es el titular del proyecto TUTOR_AI,
          contactable en{' '}
          <a
            href="mailto:contact@tutoraiapp.es"
            className="text-primary hover:underline"
          >
            contact@tutoraiapp.es
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          2. Datos que recogemos
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Al registrarte y usar TUTOR_AI podemos recoger los siguientes datos:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
          <li>Nombre y dirección de correo electrónico.</li>
          <li>
            Información del perfil de tus hijos (nombre, edad, curso y
            aficiones) que tú introduces voluntariamente para personalizar las
            actividades.
          </li>
          <li>
            Datos de uso del servicio (fichas generadas, materias consultadas,
            etc.) con fines de mejora de la plataforma.
          </li>
          <li>
            Información técnica del dispositivo y navegador (dirección IP,
            idioma, tipo de navegador) recogida automáticamente.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          3. Finalidad del tratamiento
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Usamos tus datos para:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
          <li>Prestarte el servicio de generación de fichas personalizadas.</li>
          <li>
            Mejorar y adaptar la plataforma a las necesidades de los usuarios.
          </li>
          <li>
            Enviarte comunicaciones relacionadas con el servicio (por ejemplo,
            novedades de la beta o cambios importantes).
          </li>
          <li>Cumplir con las obligaciones legales aplicables.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          4. Base jurídica
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          El tratamiento se basa en el consentimiento que prestas al registrarte
          y en la ejecución del contrato de uso del servicio. En relación con
          los datos de menores, el tratamiento se realiza exclusivamente bajo la
          responsabilidad y con el consentimiento del progenitor o tutor legal
          que crea la cuenta.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          5. Conservación de los datos
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Conservamos tus datos mientras mantengas una cuenta activa en
          TUTOR_AI. Si solicitas la cancelación de tu cuenta, procederemos a
          eliminar o anonimizar tus datos en un plazo máximo de 30 días, salvo
          que la ley nos obligue a conservarlos durante más tiempo.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          6. Transferencias a terceros
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Para ofrecer el servicio utilizamos proveedores de infraestructura y
          servicios en la nube (como Supabase para la base de datos y Vercel
          para el alojamiento). Estos proveedores actúan como encargados del
          tratamiento y están sujetos a los acuerdos de procesamiento de datos
          exigidos por el RGPD. No vendemos ni cedemos tus datos a terceros con
          fines comerciales.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          7. Tus derechos
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          De acuerdo con el Reglamento General de Protección de Datos (RGPD) y
          la Ley Orgánica de Protección de Datos (LOPDGDD), tienes derecho a:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
          <li>
            <strong>Acceso:</strong> conocer qué datos tenemos sobre ti.
          </li>
          <li>
            <strong>Rectificación:</strong> corregir datos inexactos o
            incompletos.
          </li>
          <li>
            <strong>Supresión:</strong> solicitar la eliminación de tus datos.
          </li>
          <li>
            <strong>Oposición y limitación:</strong> oponerte al tratamiento o
            solicitar que lo limitemos.
          </li>
          <li>
            <strong>Portabilidad:</strong> recibir tus datos en un formato
            estructurado y legible por máquina.
          </li>
        </ul>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Para ejercer cualquiera de estos derechos, escríbenos a{' '}
          <a
            href="mailto:contact@tutoraiapp.es"
            className="text-primary hover:underline"
          >
            contact@tutoraiapp.es
          </a>
          . También tienes derecho a presentar una reclamación ante la Agencia
          Española de Protección de Datos (
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            aepd.es
          </a>
          ).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          8. Seguridad
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Aplicamos medidas técnicas y organizativas razonables para proteger
          tus datos frente a accesos no autorizados, pérdida o destrucción.
          Todas las comunicaciones se realizan mediante HTTPS y las contraseñas
          se almacenan de forma cifrada.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          9. Cambios en esta política
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Podemos actualizar esta Política de Privacidad ocasionalmente. Te
          informaremos de los cambios significativos por correo electrónico o
          mediante un aviso destacado en la plataforma. El uso continuado del
          servicio tras la notificación implica la aceptación de la nueva
          política.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          10. Contacto
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Si tienes alguna duda sobre esta política, puedes contactarnos en{' '}
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
