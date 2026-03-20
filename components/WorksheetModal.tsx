'use client';

import { useState } from 'react';
import { Worksheet } from '@/types/worksheet';
import FeedbackForm from './FeedbackForm';

interface WorksheetModalProps {
  worksheet: Worksheet;
  isOpen: boolean;
  onClose: () => void;
  onFeedbackSubmitted?: () => void;
}

export default function WorksheetModal({
  worksheet,
  isOpen,
  onClose,
  onFeedbackSubmitted,
}: WorksheetModalProps) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(!worksheet.feedback);

  if (!isOpen) return null;

  const handleFeedbackSubmitted = () => {
    setShowFeedbackForm(false);
    onFeedbackSubmitted?.();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white dark:bg-dark-surface rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-border shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-[#111813] dark:text-white">
              {worksheet.topic || 'Ficha'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {new Date(worksheet.created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-highlight rounded-lg transition-colors"
            aria-label="Cerrar"
          >
            <span className="material-symbols-outlined text-2xl text-gray-600 dark:text-gray-400">
              close
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Worksheet HTML Content */}
          <div className="bg-gray-50 dark:bg-dark-highlight rounded-2xl p-6 border border-gray-200 dark:border-dark-border">
            <div className="prose dark:prose-invert max-w-none">
              <div
                className="text-gray-800 dark:text-gray-200 text-sm"
                dangerouslySetInnerHTML={{ __html: worksheet.html_content }}
              />
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 border border-gray-100 dark:border-dark-border">
            <h3 className="text-lg font-bold text-[#111813] dark:text-white mb-4">
              Feedback
            </h3>

            {worksheet.feedback ? (
              <div className="space-y-4">
                {/* Read-only Feedback Display */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`material-symbols-outlined text-xl ${
                          star <= (worksheet.feedback?.rating || 0)
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-300 ml-2">
                      {worksheet.feedback?.rating || 0}/5
                    </span>
                  </div>

                  {worksheet.feedback?.comments && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {worksheet.feedback.comments}
                    </p>
                  )}

                  {worksheet.feedback?.created_at && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                      Feedback añadido el{' '}
                      {new Date(
                        worksheet.feedback.created_at
                      ).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600 block mb-3">
                  rate_review
                </span>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Aún no hay feedback para esta ficha
                </p>
                {showFeedbackForm ? (
                  <FeedbackForm
                    worksheetId={worksheet.id}
                    onFeedbackSubmitted={handleFeedbackSubmitted}
                  />
                ) : (
                  <button
                    onClick={() => setShowFeedbackForm(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    Añadir Feedback
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer with Action Buttons (Optional for MVP) */}
        <div className="p-6 border-t border-gray-100 dark:border-dark-border shrink-0 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-dark-highlight transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
