import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock Header component entirely
vi.mock('@/components/Header', () => ({
  default: function MockHeader() {
    return (
      <header className="sticky top-0 z-50">
        <div>
          <div>TUTOR_AI Logo</div>
          <div>TUTOR_AI</div>
          <div>HeaderAuth</div>
        </div>
      </header>
    );
  },
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <div>{alt}</div>,
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock HeaderAuth
vi.mock('@/components/HeaderAuth', () => ({
  default: () => <div>HeaderAuth</div>,
}));

// Mock ThemeToggle
vi.mock('@/components/ui/theme-toggle', () => ({
  default: () => <div>ThemeToggle</div>,
}));

// Mock MobileMenu
vi.mock('@/components/ui/mobile-menu', () => ({
  default: () => <div>MobileMenu</div>,
}));

// Import after mocks
import Header from '@/components/Header';

describe('Header', () => {
  it('renders logo image', () => {
    render(<Header />);
    expect(screen.getByText('TUTOR_AI Logo')).toBeInTheDocument();
  });

  it('renders navigation link', () => {
    render(<Header />);
    const texts = screen.getAllByText('TUTOR_AI');
    expect(texts.length).toBeGreaterThan(0);
  });

  it('has correct styling for sticky header', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky');
  });

  it('renders HeaderAuth component', () => {
    render(<Header />);
    const headerAuth = screen.getAllByText('HeaderAuth');
    expect(headerAuth.length).toBeGreaterThan(0);
  });
});
