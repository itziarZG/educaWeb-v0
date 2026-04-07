import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFeedbackForm } from '@/hooks/use-feedback-form';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import { toast } from 'sonner';

describe('useFeedbackForm', () => {
  const worksheetId = 'test-worksheet-123';

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useFeedbackForm(worksheetId));
    expect(result.current.rating).toBe(0);
    expect(result.current.comments).toBe('');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.submitted).toBe(false);
    expect(result.current.hoverRating).toBe(0);
  });

  it('initializes with provided feedback data', () => {
    const initialFeedback = {
      id: 'feedback-1',
      worksheet_id: worksheetId,
      user_id: 'user-1',
      rating: 4 as const,
      comments: 'Great content!',
      created_at: '2024-01-01T00:00:00Z',
    };

    const { result } = renderHook(() =>
      useFeedbackForm(worksheetId, initialFeedback)
    );

    expect(result.current.rating).toBe(4);
    expect(result.current.comments).toBe('Great content!');
    expect(result.current.submitted).toBe(true);
  });

  it('updates rating when setRating is called', () => {
    const { result } = renderHook(() => useFeedbackForm(worksheetId));

    act(() => {
      result.current.setRating(3);
    });

    expect(result.current.rating).toBe(3);
  });

  it('updates hoverRating when setHoverRating is called', () => {
    const { result } = renderHook(() => useFeedbackForm(worksheetId));

    act(() => {
      result.current.setHoverRating(4);
    });

    expect(result.current.hoverRating).toBe(4);
  });

  it('updates comments when setComments is called', () => {
    const { result } = renderHook(() => useFeedbackForm(worksheetId));

    act(() => {
      result.current.setComments('This is great feedback');
    });

    expect(result.current.comments).toBe('This is great feedback');
  });

  it('sets error when submitting without rating', async () => {
    const { result } = renderHook(() => useFeedbackForm(worksheetId));

    const event = { preventDefault: vi.fn() } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.onSubmit(event);
    });

    expect(result.current.error).toBe('Por favor selecciona una calificación');
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('submits successfully and calls callback', async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
    global.fetch = mockFetch;

    const onFeedbackSubmitted = vi.fn();
    const { result } = renderHook(() =>
      useFeedbackForm(worksheetId, undefined, onFeedbackSubmitted)
    );

    act(() => {
      result.current.setRating(5);
      result.current.setComments('Excellent!');
    });

    const event = { preventDefault: vi.fn() } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.onSubmit(event);
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        worksheetId,
        rating: 5,
        comments: 'Excellent!',
      }),
    });

    expect(toast.success).toHaveBeenCalled();
    expect(result.current.submitted).toBe(true);
    expect(onFeedbackSubmitted).toHaveBeenCalled();
  });

  it('handles 409 conflict error', async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: async () => ({ error: 'Conflict' }),
    });
    global.fetch = mockFetch;

    const { result } = renderHook(() => useFeedbackForm(worksheetId));

    act(() => {
      result.current.setRating(3);
    });

    const event = { preventDefault: vi.fn() } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.onSubmit(event);
    });

    expect(toast.error).toHaveBeenCalledWith(
      'Ya existe feedback para esta ficha'
    );
    expect(result.current.error).toBe('Ya existe feedback para esta ficha');
  });

  it('handles API errors', async () => {
    const errorMessage = 'Network error';
    const mockFetch = vi.fn().mockRejectedValueOnce(new Error(errorMessage));
    global.fetch = mockFetch;

    const { result } = renderHook(() => useFeedbackForm(worksheetId));

    act(() => {
      result.current.setRating(2);
    });

    const event = { preventDefault: vi.fn() } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.onSubmit(event);
    });

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
    expect(result.current.error).toBe(errorMessage);
  });

  it('trims whitespace from comments', async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
    global.fetch = mockFetch;

    const { result } = renderHook(() => useFeedbackForm(worksheetId));

    act(() => {
      result.current.setRating(3);
      result.current.setComments('  Feedback with spaces  ');
    });

    const event = { preventDefault: vi.fn() } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.onSubmit(event);
    });

    const callArgs = mockFetch.mock.calls[0];
    const bodyData = JSON.parse(callArgs[1].body as string);

    expect(bodyData.comments).toBe('Feedback with spaces');
  });
});
