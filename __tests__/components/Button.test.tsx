import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '@/components/Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(
      screen.getByRole('button', { name: 'Click me' })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with correct styling classes', () => {
    render(<Button onClick={() => {}}>Styled</Button>);
    const button = screen.getByRole('button', { name: 'Styled' });
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('rounded-lg');
    expect(button).toHaveClass('font-bold');
  });
});
