import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorksheetCard from '@/components/WorksheetCard';
import { Worksheet } from '@/types/worksheet';

// Mock lucide-react Star component
jest.mock('lucide-react', () => ({
  Star: ({ className }: { className: string }) => (
    <span data-testid="star" className={className}>
      ★
    </span>
  ),
}));

describe('WorksheetCard Component', () => {
  const mockWorksheet: Worksheet = {
    id: '1',
    user_id: 'user1',
    child_id: 'child1',
    topic: 'Matemáticas',
    html_content: '<p>Test content</p>',
    created_at: '2025-03-20T10:00:00Z',
    feedback: {
      id: 'feedback1',
      worksheet_id: '1',
      user_id: 'user1',
      rating: 4,
      comments: 'Excelente trabajo',
      created_at: '2025-03-20T10:30:00Z',
    },
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render topic badge', () => {
    render(<WorksheetCard worksheet={mockWorksheet} onClick={mockOnClick} />);
    expect(screen.getByText('Matemáticas')).toBeInTheDocument();
  });

  it('should render "Sin tema" when topic is null', () => {
    const worksheetWithoutTopic = {
      ...mockWorksheet,
      topic: null,
    };
    render(
      <WorksheetCard worksheet={worksheetWithoutTopic} onClick={mockOnClick} />
    );
    expect(screen.getByText('Sin tema')).toBeInTheDocument();
  });

  it('should render formatted date in Spanish locale', () => {
    render(<WorksheetCard worksheet={mockWorksheet} onClick={mockOnClick} />);
    // Date should be formatted as "20 de marzo de 2025"
    const dateText = screen.getByText(/marzo/);
    expect(dateText).toBeInTheDocument();
  });

  it('should display star rating correctly', () => {
    render(<WorksheetCard worksheet={mockWorksheet} onClick={mockOnClick} />);
    const stars = screen.getAllByTestId('star');
    expect(stars).toHaveLength(5);

    // First 4 stars should be filled
    expect(stars[0]).toHaveClass('fill-yellow-400');
    expect(stars[1]).toHaveClass('fill-yellow-400');
    expect(stars[2]).toHaveClass('fill-yellow-400');
    expect(stars[3]).toHaveClass('fill-yellow-400');

    // 5th star should be empty
    expect(stars[4]).not.toHaveClass('fill-yellow-400');
  });

  it('should display rating number when present', () => {
    render(<WorksheetCard worksheet={mockWorksheet} onClick={mockOnClick} />);
    expect(screen.getByText('4/5')).toBeInTheDocument();
  });

  it('should display "Sin calificar" when rating is 0', () => {
    const worksheetWithoutRating = {
      ...mockWorksheet,
      feedback: undefined,
    };
    render(
      <WorksheetCard worksheet={worksheetWithoutRating} onClick={mockOnClick} />
    );
    expect(screen.getByText('Sin calificar')).toBeInTheDocument();
  });

  it('should display feedback comment snippet', () => {
    render(<WorksheetCard worksheet={mockWorksheet} onClick={mockOnClick} />);
    expect(screen.getByText(/Excelente trabajo/)).toBeInTheDocument();
  });

  it('should truncate long comments with ellipsis', () => {
    const worksheetWithLongComment = {
      ...mockWorksheet,
      feedback: {
        ...mockWorksheet.feedback!,
        comments: 'a'.repeat(100),
      },
    };
    render(
      <WorksheetCard
        worksheet={worksheetWithLongComment}
        onClick={mockOnClick}
      />
    );
    expect(screen.getByText(/\.\.\./)).toBeInTheDocument();
  });

  it('should display "Sin comentarios" when no feedback', () => {
    const worksheetWithoutFeedback = {
      ...mockWorksheet,
      feedback: undefined,
    };
    render(
      <WorksheetCard
        worksheet={worksheetWithoutFeedback}
        onClick={mockOnClick}
      />
    );
    expect(screen.getByText('Sin comentarios')).toBeInTheDocument();
  });

  it('should display "Sin comentarios" when feedback has no comments', () => {
    const worksheetWithoutComments = {
      ...mockWorksheet,
      feedback: {
        ...mockWorksheet.feedback!,
        comments: null,
      },
    };
    render(
      <WorksheetCard
        worksheet={worksheetWithoutComments}
        onClick={mockOnClick}
      />
    );
    expect(screen.getByText('Sin comentarios')).toBeInTheDocument();
  });

  it('should call onClick when card is clicked', async () => {
    const user = userEvent.setup();
    render(<WorksheetCard worksheet={mockWorksheet} onClick={mockOnClick} />);

    const card = screen.getByText('Matemáticas').closest('div');
    await user.click(card!);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should handle multiline comments by showing only first line', () => {
    const worksheetWithMultiline = {
      ...mockWorksheet,
      feedback: {
        ...mockWorksheet.feedback!,
        comments: 'Primera línea\nSegunda línea\nTercera línea',
      },
    };
    render(
      <WorksheetCard worksheet={worksheetWithMultiline} onClick={mockOnClick} />
    );
    expect(screen.getByText(/Primera línea/)).toBeInTheDocument();
    expect(screen.queryByText(/Segunda línea/)).not.toBeInTheDocument();
  });

  it('should display 5-star rating correctly', () => {
    const worksheetWith5Stars = {
      ...mockWorksheet,
      feedback: {
        ...mockWorksheet.feedback!,
        rating: 5 as const,
      },
    };
    render(
      <WorksheetCard worksheet={worksheetWith5Stars} onClick={mockOnClick} />
    );
    expect(screen.getByText('5/5')).toBeInTheDocument();

    const stars = screen.getAllByTestId('star');
    // All 5 stars should be filled
    stars.forEach((star) => {
      expect(star).toHaveClass('fill-yellow-400');
    });
  });

  it('should display 1-star rating correctly', () => {
    const worksheetWith1Star = {
      ...mockWorksheet,
      feedback: {
        ...mockWorksheet.feedback!,
        rating: 1 as const,
      },
    };
    render(
      <WorksheetCard worksheet={worksheetWith1Star} onClick={mockOnClick} />
    );
    expect(screen.getByText('1/5')).toBeInTheDocument();

    const stars = screen.getAllByTestId('star');
    expect(stars[0]).toHaveClass('fill-yellow-400');
    expect(stars[1]).not.toHaveClass('fill-yellow-400');
  });
});
