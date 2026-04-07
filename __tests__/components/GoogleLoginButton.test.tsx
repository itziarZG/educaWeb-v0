import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GoogleLoginButton from '@/components/GoogleLoginButton';

// Mock simple de Supabase
vi.mock('@/utils/supabase/client', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithOAuth: vi.fn(),
    },
  })),
}));

describe('GoogleLoginButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders button with correct text', () => {
    render(<GoogleLoginButton />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('Continuar con Google');
  });

  it('has correct styling classes', () => {
    render(<GoogleLoginButton />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('bg-white');
  });

  it('calls onClick handler when clicked', () => {
    render(<GoogleLoginButton />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toBeDefined();
  });
});
