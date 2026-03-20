'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import type { WorksheetFeedback } from '@/types/worksheet';

interface FeedbackFormProps {
  worksheetId: string;
  onFeedbackSubmitted?: () => void;
  initialFeedback?: WorksheetFeedback;
}

export default function FeedbackForm({
  worksheetId,
  onFeedbackSubmitted,
  initialFeedback,
}: FeedbackFormProps) {
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | 0>(
    initialFeedback?.rating || 0
  );
  const [comments, setComments] = useState(initialFeedback?.comments || '');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(!!initialFeedback);
  const [error, setError] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
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
          setSubmitted(true);
          setError('Ya existe feedback para esta ficha');
          return;
        }

        throw new Error(data.error || 'Error al guardar feedback');
      }

      toast.success('Gracias por tu feedback. Tu opinión nos ayuda a mejorar.');
      setSubmitted(true);
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

  // Si ya existe feedback, mostrar read-only
  if (submitted) {
    return (
      <div className="mt-6 p-4 md:p-6 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg shadow-sm">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Tu feedback
          </h3>

          {/* Stars read-only */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`${
                  star <= rating
                    ? 'fill-gray-400 text-gray-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Comments read-only */}
          {comments && (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {comments}
              </p>
            </div>
          )}

          {/* Success message */}
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            Gracias por tu feedback. Tu opinión nos ayuda a mejorar.
          </p>
        </div>
      </div>
    );
  }

  // Formulario activo
  return (
    <div className="mt-6 p-4 md:p-6 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          ¿Qué te pareció esta ficha?
        </h3>

        {/* Rating Stars */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star as 1 | 2 | 3 | 4 | 5)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-surface rounded-sm"
            >
              <Star
                size={28}
                className={`${
                  star <= (hoverRating || rating)
                    ? 'fill-primary text-primary'
                    : 'text-gray-300 dark:text-gray-600'
                } transition-colors`}
              />
            </button>
          ))}
        </div>

        {/* Comments Textarea */}
        <div>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Comparte tu experiencia (opcional)"
            className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-surface resize-none"
            rows={3}
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!rating || loading}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
            !rating || loading
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90 active:scale-95'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Enviando...
            </span>
          ) : (
            'Enviar feedback'
          )}
        </button>
      </form>
    </div>
  );
}
