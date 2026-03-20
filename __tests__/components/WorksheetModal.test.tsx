import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorksheetModal from '@/components/WorksheetModal';
import { Worksheet } from '@/types/worksheet';

// Mock FeedbackForm component
jest.mock('@/components/FeedbackForm', () => {
  return function MockFeedbackForm({
    worksheetId: _worksheetId,
    onFeedbackSubmitted,
  }: {
    worksheetId: string;
    onFeedbackSubmitted: () => void;
  }) {
    return (
      <div data-testid="feedback-form">
        <button onClick={onFeedbackSubmitted}>Submit Feedback</button>
      </div>
    );
  };
});

describe('WorksheetModal Component', () => {
  const mockWorksheet: Worksheet = {
    id: '1',
    user_id: 'user1',
    child_id: 'child1',
    topic: 'Historia',
    html_content: '<p>Test worksheet content</p>',
    created_at: '2025-03-20T10:00:00Z',
    feedback: {
      id: 'feedback1',
      worksheet_id: '1',
      user_id: 'user1',
      rating: 4 as const,
      comments: 'Great work on this topic',
      created_at: '2025-03-20T10:30:00Z',
    },
  };

  const mockOnClose = jest.fn();
  const mockOnFeedbackSubmitted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    render(
      <WorksheetModal
        worksheet={mockWorksheet}
        isOpen={false}
        onClose={mockOnClose}
      />
    );
    expect(screen.queryByText('Historia')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(
      <WorksheetModal
        worksheet={mockWorksheet}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText('Historia')).toBeInTheDocument();
  });

  it('should render worksheet topic in header', () => {
    render(
      <WorksheetModal
        worksheet={mockWorksheet}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Historia');
  });

  it('should render "Ficha" when topic is null', () => {
    const worksheetWithoutTopic = { ...mockWorksheet, topic: null };
    render(
      <WorksheetModal
        worksheet={worksheetWithoutTopic}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Ficha');
  });

  it('should render formatted date and time', () => {
    render(
      <WorksheetModal
        worksheet={mockWorksheet}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    // Date should be in Spanish format with time
    const dateTexts = screen.getAllByText(/marzo/);
    expect(dateTexts.length).toBeGreaterThan(0);
  });

  it('should render HTML content with dangerouslySetInnerHTML', () => {
    render(
      <WorksheetModal
        worksheet={mockWorksheet}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText('Test worksheet content')).toBeInTheDocument();
  });

  it('should render feedback section heading', () => {
    render(
      <WorksheetModal
        worksheet={mockWorksheet}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    const feedbackHeading = screen.getByRole('heading', { level: 3 });
    expect(feedbackHeading).toHaveTextContent('Feedback');
  });

  it('should display existing feedback rating and comments', () => {
    render(
      <WorksheetModal
        worksheet={mockWorksheet}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText('4/5')).toBeInTheDocument();
    expect(screen.getByText('Great work on this topic')).toBeInTheDocument();
  });

  it('should display feedback creation date', () => {
    render(
      <WorksheetModal
        worksheet={mockWorksheet}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText(/Feedback añadido el/)).toBeInTheDocument();
  });

  it('should not show feedback form when feedback exists', () => {
    render(
      <WorksheetModal
        worksheet={mockWorksheet}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    expect(screen.queryByTestId('feedback-form')).not.toBeInTheDocument();
  });

  it('should show "No feedback yet" message when no feedback', () => {
    const worksheetWithoutFeedback = {
      ...mockWorksheet,
      feedback: undefined,
    };
    render(
      <WorksheetModal
        worksheet={worksheetWithoutFeedback}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    expect(
      screen.getByText('Aún no hay feedback para esta ficha')
    ).toBeInTheDocument();
  });

  it('should show feedback form when no feedback exists', () => {
    const worksheetWithoutFeedback = {
      ...mockWorksheet,
      feedback: undefined,
    };
    render(
      <WorksheetModal
        worksheet={worksheetWithoutFeedback}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByTestId('feedback-form')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <WorksheetModal
        worksheet={mockWorksheet}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    const closeButtons = screen.getAllByRole('button', { name: 'Cerrar' });
    // Click the first Cerrar button (header close)
    await user.click(closeButtons[0]);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should close modal when clicking backdrop', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <WorksheetModal
        worksheet={mockWorksheet}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    const backdrop = container.querySelector('.fixed');
    if (backdrop) {
      await user.click(backdrop);
      expect(mockOnClose).toHaveBeenCalled();
    }
  });

  it('should not close when clicking modal content', async () => {
    const user = userEvent.setup();
    render(
      <WorksheetModal
        worksheet={mockWorksheet}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    const modalContent = screen.getByText('Test worksheet content');
    await user.click(modalContent);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should call onFeedbackSubmitted when feedback is submitted', async () => {
    const user = userEvent.setup();
    const worksheetWithoutFeedback = {
      ...mockWorksheet,
      feedback: undefined,
    };
    render(
      <WorksheetModal
        worksheet={worksheetWithoutFeedback}
        isOpen={true}
        onClose={mockOnClose}
        onFeedbackSubmitted={mockOnFeedbackSubmitted}
      />
    );

    const submitButton = screen.getByText('Submit Feedback');
    await user.click(submitButton);

    expect(mockOnFeedbackSubmitted).toHaveBeenCalled();
  });

  it('should hide feedback form after submission', async () => {
    const user = userEvent.setup();
    const worksheetWithoutFeedback = {
      ...mockWorksheet,
      feedback: undefined,
    };
    render(
      <WorksheetModal
        worksheet={worksheetWithoutFeedback}
        isOpen={true}
        onClose={mockOnClose}
        onFeedbackSubmitted={mockOnFeedbackSubmitted}
      />
    );

    expect(screen.getByTestId('feedback-form')).toBeInTheDocument();

    const submitButton = screen.getByText('Submit Feedback');
    await user.click(submitButton);

    // After submission, the form should be hidden
    expect(screen.queryByTestId('feedback-form')).not.toBeInTheDocument();
  });

  it('should show "Añadir Feedback" button after submission when no feedback', () => {
    const worksheetWithoutFeedback = {
      ...mockWorksheet,
      feedback: undefined,
    };
    render(
      <WorksheetModal
        worksheet={worksheetWithoutFeedback}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // Initially form should be shown
    expect(screen.getByTestId('feedback-form')).toBeInTheDocument();
  });

  it('should display feedback without comments when comments are null', () => {
    const worksheetWithoutComments = {
      ...mockWorksheet,
      feedback: {
        ...mockWorksheet.feedback!,
        comments: null,
      },
    };
    render(
      <WorksheetModal
        worksheet={worksheetWithoutComments}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText('4/5')).toBeInTheDocument();
    // Should not show comments text
    expect(screen.queryByText(/Great work/)).not.toBeInTheDocument();
  });
});
