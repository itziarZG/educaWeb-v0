'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import type { WorksheetFeedback } from '@/types/worksheet';

interface UseFeedbackFormReturn {
  rating: 1 | 2 | 3 | 4 | 5 | 0;
  setRating: (r: 1 | 2 | 3 | 4 | 5) => void;
  hoverRating: number;
  setHoverRating: (h: number) => void;
  comments: string;
  setComments: (c: string) => void;
  loading: boolean;
  error: string | null;
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useFeedbackForm(
  worksheetId: string,
  initialFeedback?: WorksheetFeedback,
  onFeedbackSubmitted?: () => void
): UseFeedbackFormReturn {
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | 0>(
    initialFeedback?.rating || 0
  );
  const [comments, setComments] = useState(initialFeedback?.comments || '');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(!!initialFeedback);
  const [error, setError] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState(0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      setError('Por favor selecciona una calificación');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worksheetId,
          rating,
          comments: comments.trim() || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        if (response.status === 409) {
          toast.error('Ya existe feedback para esta ficha');
          setError('Ya existe feedback para esta ficha');
          return;
        }

        throw new Error(data.error || 'Error al guardar feedback');
      }

      toast.success('Gracias por tu feedback. Tu opinión nos ayuda a mejorar.');
      setSubmitted(true);
      setRating(0);
      setComments('');
      onFeedbackSubmitted?.();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al guardar feedback';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    comments,
    setComments,
    loading,
    error,
    submitted,
    onSubmit,
  };
}
