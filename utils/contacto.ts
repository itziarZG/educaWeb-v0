/**
 * Correo de contacto que muestran las páginas legales y el aviso de créditos.
 * Se configura con la variable NEXT_PUBLIC_CONTACTO_EMAIL (en Vercel, por entorno).
 * Si no está definida, se usa el correo general.
 */
export const CONTACTO_EMAIL =
  process.env.NEXT_PUBLIC_CONTACTO_EMAIL || 'contact@tutoraiapp.es';
