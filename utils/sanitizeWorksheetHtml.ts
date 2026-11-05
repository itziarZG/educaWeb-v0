import DOMPurify from 'dompurify';

/**
 * Limpia el HTML de una ficha antes de insertarlo en la página de la app.
 * El HTML lo escribe la IA, así que se trata como contenido no fiable.
 * Solo funciona en el navegador: sin DOM devuelve una cadena vacía, nunca el
 * HTML original sin limpiar.
 */
export function sanitizeWorksheetHtml(html: string): string {
  if (!DOMPurify.isSupported) return '';

  return DOMPurify.sanitize(html, {
    // Conserva un <style> inicial, que de otro modo se pierde al analizar el HTML.
    FORCE_BODY: true,
    FORBID_TAGS: ['form'],
  });
}
