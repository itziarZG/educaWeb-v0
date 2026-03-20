'use client';

import { Worksheet } from '@/types/worksheet';
import { Star } from 'lucide-react';

interface WorksheetCardProps {
  worksheet: Worksheet;
  onClick: () => void;
}

export default function WorksheetCard({
  worksheet,
  onClick,
}: WorksheetCardProps) {
  const rating = worksheet.feedback?.rating || 0;
  const topic = worksheet.topic || 'Sin tema';

  // Format date as human-readable (e.g., "20 de marzo de 2025")
  const dateObj = new Date(worksheet.created_at);
  const dateFormatted = dateObj.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Extract first line of feedback comment (max 50 chars)
  const feedbackSnippet = worksheet.feedback?.comments
    ? worksheet.feedback.comments.split('\n')[0].substring(0, 60)
    : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative group w-full text-left cursor-pointer bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-primary/20 transition-all hover:border-primary/30 dark:hover:border-primary/30 hover:-translate-y-1"
    >
      {/* Topic Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-primary/15 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
          {topic}
        </span>
      </div>

      {/* Content Container */}
      <div className="space-y-3">
        {/* Date */}
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {dateFormatted}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={`${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          {rating > 0 && (
            <span className="text-xs text-gray-600 dark:text-gray-400 ml-2 font-medium">
              {rating}/5
            </span>
          )}
          {rating === 0 && (
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
              Sin calificar
            </span>
          )}
        </div>

        {/* Feedback Snippet */}
        {feedbackSnippet ? (
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 italic">
            "{feedbackSnippet}"
            {worksheet.feedback?.comments &&
              worksheet.feedback.comments.length > 60 &&
              '...'}
          </p>
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Sin comentarios
          </p>
        )}
      </div>

      {/* Hover Indicator */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors pointer-events-none"></div>
    </button>
  );
}
