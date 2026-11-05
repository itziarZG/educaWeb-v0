import { describe, expect, it } from 'vitest';
import { sanitizeWorksheetHtml } from '@/utils/sanitizeWorksheetHtml';

describe('sanitizeWorksheetHtml', () => {
  it.each([
    ['script', '<script>alert(1)</script>', 'script'],
    ['onerror', '<img src="x" onerror="alert(1)">', 'onerror'],
    ['onload en svg', '<svg onload="alert(1)"></svg>', 'onload'],
    ['onclick', '<div onclick="alert(1)">x</div>', 'onclick'],
    [
      'enlace javascript:',
      '<a href="javascript:alert(1)">x</a>',
      'javascript:',
    ],
    ['iframe', '<iframe src="https://example.com"></iframe>', 'iframe'],
    ['object', '<object data="https://example.com"></object>', 'object'],
    ['base', '<base href="https://example.com">', '<base'],
    ['form', '<form action="https://example.com"></form>', '<form'],
    [
      'mutación con noscript',
      '<noscript><p title="</noscript><img src=x onerror=alert(1)>">',
      'onerror=',
    ],
  ])('elimina contenido peligroso: %s', (_name, html, forbidden) => {
    expect(sanitizeWorksheetHtml(html).toLowerCase()).not.toContain(forbidden);
  });

  it('conserva los estilos y el contenido de una ficha', () => {
    const html =
      '<style>.title { color: red; }</style><h1 class="title">Sumas</h1><p>2 + 2 = <input type="text"></p>';

    const result = sanitizeWorksheetHtml(html);

    expect(result).toContain('<style>.title { color: red; }</style>');
    expect(result).toContain('<h1 class="title">Sumas</h1>');
    expect(result).toContain('<input type="text">');
  });

  it('conserva estilos y contenido de un documento completo', () => {
    const html =
      '<!DOCTYPE html><html><head><style>p { color: blue; }</style></head><body><p>Ficha</p></body></html>';

    const result = sanitizeWorksheetHtml(html);

    expect(result).toContain('p { color: blue; }');
    expect(result).toContain('<p>Ficha</p>');
  });

  it('conserva el contenido de un formulario eliminado', () => {
    expect(sanitizeWorksheetHtml('<form><p>Ejercicio</p></form>')).toBe(
      '<p>Ejercicio</p>'
    );
  });
});
