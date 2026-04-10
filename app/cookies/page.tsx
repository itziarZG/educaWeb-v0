import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies — TUTOR_AI',
  description:
    'Información sobre el uso de cookies en el sitio web TUTOR_AI.',
};

export default function CookiesPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl lg:text-4xl font-black text-[#111813] dark:text-white">
          Política de Cookies
        </h1>
        <p className="text-sm text-slate-400">
          Última actualización: abril de 2026
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          1. ¿Qué son las cookies?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Las cookies son pequeños archivos de texto que los sitios web colocan
          en el dispositivo del usuario al visitarlos. Sirven para recordar
          preferencias, mejorar la experiencia de navegación y, en algunos
          casos, recopilar información estadística.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          2. Tipos de cookies que utilizamos
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          En TUTOR_AI utilizamos las siguientes categorías de cookies:
        </p>

        <div className="space-y-4">
          <div className="bg-background-light dark:bg-background-dark p-4 rounded-xl border border-primary/10">
            <h3 className="font-bold text-[#111813] dark:text-white mb-2">
              Cookies estrictamente necesarias
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Son imprescindibles para el funcionamiento del sitio web. Incluyen
              las cookies de sesión de autenticación (gestionadas por Supabase)
              y las de preferencia de tema (claro/oscuro). No requieren
              consentimiento, ya que sin ellas el servicio no puede funcionar
              correctamente.
            </p>
          </div>

          <div className="bg-background-light dark:bg-background-dark p-4 rounded-xl border border-primary/10">
            <h3 className="font-bold text-[#111813] dark:text-white mb-2">
              Cookies analíticas
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Nos permiten medir el rendimiento del sitio web y entender cómo
              interactúan los usuarios con la plataforma. Estas cookies solo se
              activan si el usuario otorga su consentimiento explícito a través
              del banner de cookies.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          3. Detalle de cookies utilizadas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-600 dark:text-slate-400 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left p-3 font-bold text-[#111813] dark:text-white">
                  Nombre
                </th>
                <th className="text-left p-3 font-bold text-[#111813] dark:text-white">
                  Tipo
                </th>
                <th className="text-left p-3 font-bold text-[#111813] dark:text-white">
                  Finalidad
                </th>
                <th className="text-left p-3 font-bold text-[#111813] dark:text-white">
                  Duración
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-3">sb-*</td>
                <td className="p-3">Necesaria</td>
                <td className="p-3">Sesión de autenticación (Supabase)</td>
                <td className="p-3">Sesión</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-3">theme</td>
                <td className="p-3">Necesaria</td>
                <td className="p-3">Preferencia de tema (claro/oscuro)</td>
                <td className="p-3">1 año</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-3">cookie-consent</td>
                <td className="p-3">Necesaria</td>
                <td className="p-3">
                  Almacena la preferencia de cookies del usuario
                </td>
                <td className="p-3">1 año</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          4. Gestión de cookies
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Al acceder a nuestro sitio web por primera vez, se muestra un banner
          informativo que permite aceptar o rechazar las cookies no esenciales
          con la misma facilidad. Tu elección se recuerda durante un año.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Además, puedes configurar tu navegador para bloquear o eliminar
          cookies en cualquier momento. Ten en cuenta que deshabilitar las
          cookies estrictamente necesarias puede afectar al funcionamiento del
          servicio.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Instrucciones para los navegadores más comunes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          5. Cookies de terceros
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          No cargamos cookies de rastreo de terceros (como Google Analytics o
          redes publicitarias) salvo que el usuario haya otorgado su
          consentimiento explícito. En caso de activar cookies analíticas, estas
          serán gestionadas conforme a las políticas de privacidad de sus
          respectivos proveedores.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          6. Actualizaciones de esta política
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Esta Política de Cookies puede actualizarse para reflejar cambios en
          las cookies utilizadas o en la normativa aplicable. Te recomendamos
          revisarla periódicamente.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#111813] dark:text-white">
          7. Contacto
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Si tienes preguntas sobre nuestra Política de Cookies, contacta con
          nosotros en{' '}
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
