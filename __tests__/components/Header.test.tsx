import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from '@/components/Header';

// Mock simple next/image
vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <div>{alt}</div>,
}));

// Mock simple next/link
vi.mock('next/link', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock HeaderAuth
vi.mock('@/components/HeaderAuth', () => ({
  default: () => <div>HeaderAuth</div>,
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
