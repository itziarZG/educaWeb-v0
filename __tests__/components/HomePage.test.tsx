import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '@/app/page';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('HomePage', () => {
  it('renders the main heading with key text', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('Acompaña');
    expect(heading.textContent).toContain('el aprendizaje de tus hijos');
  });

  it('renders at least one call-to-action link to register', () => {
    render(<HomePage />);
    const ctaLinks = screen.getAllByRole('link', { name: /Empieza gratis ahora/i });
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
    expect(ctaLinks[0]).toHaveAttribute('href', '/register');
  });

  it('renders the three feature cards', () => {
    render(<HomePage />);
    expect(screen.getAllByText('Personalización inmediata').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Confianza y motivación').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Gamificación física').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the product showcase section', () => {
    render(<HomePage />);
    expect(screen.getAllByText('Del mundo digital al papel real').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Fichas PDF listas para imprimir').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the beta access badge', () => {
    render(<HomePage />);
    expect(screen.getAllByText(/Acceso Beta Gratuito/).length).toBeGreaterThanOrEqual(1);
  });
});
