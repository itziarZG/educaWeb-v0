/**
 * Correo de contacto que muestran las páginas legales y el aviso de créditos.
 * Se configura con la variable NEXT_PUBLIC_CONTACTO_EMAIL (en Vercel, por entorno).
 * Si no está definida, se usa el correo general.
 */
export const CONTACTO_EMAIL =
  process.env.NEXT_PUBLIC_CONTACTO_EMAIL || 'contact@tutoraiapp.es';

/**
 * Identificación del responsable (persona física). Se configuran con
 * NEXT_PUBLIC_RESPONSABLE_NOMBRE y NEXT_PUBLIC_RESPONSABLE_DOMICILIO.
 * Si no están definidas, las páginas legales no muestran estos datos.
 */
export const RESPONSABLE_NOMBRE =
  process.env.NEXT_PUBLIC_RESPONSABLE_NOMBRE || '';
export const RESPONSABLE_DOMICILIO =
  process.env.NEXT_PUBLIC_RESPONSABLE_DOMICILIO || '';
