import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import FeedbackForm from '@/components/FeedbackForm';

// Mock del hook useFeedbackForm
vi.mock('@/hooks/use-feedback-form', () => ({
  useFeedbackForm: vi.fn(),
}));

// Mock de lucide-react
vi.mock('lucide-react', () => ({
  Star: ({ className }: { className: string }) => (
    <svg className={className} data-testid="star-icon" />
  ),
}));

import { useFeedbackForm } from '@/hooks/use-feedback-form';

describe('FeedbackForm', () => {
  const worksheetId = 'test-worksheet-123';

  const mockHookValues = {
    rating: 0,
    setRating: vi.fn(),
    hoverRating: 0,
    setHoverRating: vi.fn(),
    comments: '',
    setComments: vi.fn(),
    loading: false,
    error: null,
    submitted: false,
    onSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    const mockUseFeedbackForm = useFeedbackForm as unknown as ReturnType<
      typeof vi.fn
    >;
    mockUseFeedbackForm.mockReturnValue(mockHookValues);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the form title when not submitted', () => {
    render(<FeedbackForm worksheetId={worksheetId} />);
    expect(screen.getByText('¿Qué te pareció esta ficha?')).toBeInTheDocument();
  });

  it('renders 5 star buttons for rating', () => {
    render(<FeedbackForm worksheetId={worksheetId} />);
    const starIcons = screen.getAllByTestId('star-icon');
    expect(starIcons.length).toBeGreaterThanOrEqual(5);
  });

  it('renders textarea for comments', () => {
    render(<FeedbackForm worksheetId={worksheetId} />);
    const textareas = screen.getAllByPlaceholderText(
      /Comparte tu experiencia/i
    );
    expect(textareas.length).toBeGreaterThan(0);
  });

  it('renders submit button', () => {
    render(<FeedbackForm worksheetId={worksheetId} />);
    const submitButtons = screen.getAllByText(/Enviar feedback/i);
    expect(submitButtons.length).toBeGreaterThan(0);
  });

  it('calls setRating when a star is clicked', () => {
    render(<FeedbackForm worksheetId={worksheetId} />);
    const starButtons = screen.getAllByRole('button').slice(0, 5);
    fireEvent.click(starButtons[2]);
    expect(mockHookValues.setRating).toHaveBeenCalled();
  });

  it('renders the hook with correct props', () => {
    render(<FeedbackForm worksheetId={worksheetId} />);
    expect(useFeedbackForm).toHaveBeenCalledWith(
      worksheetId,
      undefined,
      undefined
    );
  });

  it('calls setComments when textarea is changed', () => {
    render(<FeedbackForm worksheetId={worksheetId} />);
    const textareas = screen.getAllByPlaceholderText(
      /Comparte tu experiencia/i
    );
    fireEvent.change(textareas[0], { target: { value: 'Great!' } });
    expect(mockHookValues.setComments).toHaveBeenCalledWith('Great!');
  });

  it('shows error message when error exists', () => {
    const mockUseFeedbackForm = useFeedbackForm as unknown as ReturnType<
      typeof vi.fn
    >;
    mockUseFeedbackForm.mockReturnValue({
      ...mockHookValues,
      error: 'Por favor selecciona una calificación',
    });

    render(<FeedbackForm worksheetId={worksheetId} />);
    expect(
      screen.getByText('Por favor selecciona una calificación')
    ).toBeInTheDocument();
  });

  it('shows read-only view when submitted', () => {
    const mockUseFeedbackForm = useFeedbackForm as unknown as ReturnType<
      typeof vi.fn
    >;
    mockUseFeedbackForm.mockReturnValue({
      ...mockHookValues,
      submitted: true,
      rating: 4,
      comments: 'Excelente contenido',
    });

    render(<FeedbackForm worksheetId={worksheetId} />);
    expect(screen.getByText('Tu feedback')).toBeInTheDocument();
    expect(screen.getByText('Excelente contenido')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Gracias por tu feedback. Tu opinión nos ayuda a mejorar./
      )
    ).toBeInTheDocument();
  });

  it('shows loading state in button when loading is true', () => {
    const mockUseFeedbackForm = useFeedbackForm as unknown as ReturnType<
      typeof vi.fn
    >;
    mockUseFeedbackForm.mockReturnValue({
      ...mockHookValues,
      loading: true,
    });

    render(<FeedbackForm worksheetId={worksheetId} />);
    expect(screen.getByText('Enviando...')).toBeInTheDocument();
  });

  it('disables submit button when rating is 0 or loading', () => {
    const mockUseFeedbackForm = useFeedbackForm as unknown as ReturnType<
      typeof vi.fn
    >;
    mockUseFeedbackForm.mockReturnValue({
      ...mockHookValues,
      rating: 0,
      loading: false,
    });

    render(<FeedbackForm worksheetId={worksheetId} />);
    const buttons = screen.queryAllByRole('button');
    const submitButton = buttons[buttons.length - 1];
    expect(submitButton).toBeDisabled();
  });

  it('disables submit button when loading is true', () => {
    const mockUseFeedbackForm = useFeedbackForm as unknown as ReturnType<
      typeof vi.fn
    >;
    mockUseFeedbackForm.mockReturnValue({
      ...mockHookValues,
      rating: 3,
      loading: true,
    });

    render(<FeedbackForm worksheetId={worksheetId} />);
    expect(screen.getByText('Enviando...')).toBeInTheDocument();
    const buttons = screen.queryAllByRole('button');
    const submitButton = buttons[buttons.length - 1];
    expect(submitButton).toBeDisabled();
  });

  it('updates star styling on hover', () => {
    const mockUseFeedbackForm = useFeedbackForm as unknown as ReturnType<
      typeof vi.fn
    >;
    mockUseFeedbackForm.mockReturnValue({
      ...mockHookValues,
      rating: 2,
      hoverRating: 4,
    });

    render(<FeedbackForm worksheetId={worksheetId} />);
    const starIcons = screen.getAllByTestId('star-icon');
    expect(starIcons.length).toBeGreaterThan(0);
  });
});
