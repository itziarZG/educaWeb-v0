import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LinkButton from '@/components/LinkButton';

// Mock next/link to render a simple anchor
vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('LinkButton', () => {
  it('renders children and links to the correct href', () => {
    render(<LinkButton href="/login">Login</LinkButton>);
    const link = screen.getByRole('link', { name: 'Login' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');
  });

  it('applies default variant styling when no variant is provided', () => {
    render(<LinkButton href="/test">Default</LinkButton>);
    const link = screen.getByRole('link', { name: 'Default' });
    expect(link).toHaveClass('rounded-xl');
    expect(link).toHaveClass('text-md');
  });

  it('applies big variant styling when variant is "big"', () => {
    render(<LinkButton href="/register" variant="big">Register</LinkButton>);
    const link = screen.getByRole('link', { name: 'Register' });
    expect(link).toHaveClass('rounded-2xl');
    expect(link).toHaveClass('text-xl');
    expect(link).toHaveClass('font-black');
  });
});
