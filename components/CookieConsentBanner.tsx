'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'cookie-consent';

type ConsentValue = 'accepted' | 'rejected';

function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === 'accepted' || value === 'rejected') return value;
  return null;
}

function setConsent(value: ConsentValue): void {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
}

export function useCookieConsent(): ConsentValue | null {
  const [consent, setConsentState] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsentState(getConsent());
  }, []);

  return consent;
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getConsent();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setConsent('accepted');
    setVisible(false);
  };

  const handleReject = () => {
    setConsent('rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed bottom-0 left-0 right-0 z-[100] bg-white dark:bg-dark-surface border-t border-slate-200 dark:border-slate-700 shadow-lg p-4 sm:p-6"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Utilizamos cookies estrictamente necesarias para el funcionamiento
            del servicio. También podemos usar cookies analíticas para mejorar
            tu experiencia, pero solo si nos das tu consentimiento. Consulta
            nuestra{' '}
            <Link
              href="/cookies"
              className="text-primary hover:underline font-medium"
            >
              Política de Cookies
            </Link>{' '}
            para más información.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm font-semibold border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
