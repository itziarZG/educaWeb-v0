'use client';

import { useEffect } from 'react';

/**
 * Componente que mide las Core Web Vitals (LCP, CLS, INP, FCP, TTFB)
 * usando la API PerformanceObserver del navegador.
 *
 * Los datos se registran en consola en desarrollo.
 * En producción, se podrían enviar a un endpoint de analítica.
 */

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

function getRating(
  name: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  // Umbrales recomendados por Google
  const thresholds: Record<string, [number, number]> = {
    LCP: [2500, 4000],
    FID: [100, 300],
    CLS: [0.1, 0.25],
    INP: [200, 500],
    FCP: [1800, 3000],
    TTFB: [800, 1800],
  };

  const [good, poor] = thresholds[name] ?? [Infinity, Infinity];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

function reportMetric(metric: WebVitalMetric) {
  if (process.env.NODE_ENV === 'development') {
    const emoji =
      metric.rating === 'good'
        ? '✅'
        : metric.rating === 'needs-improvement'
          ? '⚠️'
          : '❌';
    console.log(
      `[Web Vitals] ${emoji} ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`
    );
  }

  // Endpoint de analítica: enviar métricas cuando esté configurado
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      path: window.location.pathname,
      timestamp: Date.now(),
    });

    if (typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, body);
    }
  }
}

function observeLCP() {
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        const value = last.startTime;
        reportMetric({ name: 'LCP', value, rating: getRating('LCP', value) });
      }
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    // PerformanceObserver no disponible
  }
}

function observeCLS() {
  try {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };
        if (!layoutShift.hadRecentInput && layoutShift.value) {
          clsValue += layoutShift.value;
        }
      }
      reportMetric({
        name: 'CLS',
        value: clsValue,
        rating: getRating('CLS', clsValue),
      });
    });
    observer.observe({ type: 'layout-shift', buffered: true });
  } catch {
    // PerformanceObserver no disponible
  }
}

function observeFCP() {
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries.find((e) => e.name === 'first-contentful-paint');
      if (fcp) {
        const value = fcp.startTime;
        reportMetric({ name: 'FCP', value, rating: getRating('FCP', value) });
      }
    });
    observer.observe({ type: 'paint', buffered: true });
  } catch {
    // PerformanceObserver no disponible
  }
}

export default function WebVitals() {
  useEffect(() => {
    observeLCP();
    observeCLS();
    observeFCP();

    // TTFB
    try {
      const [nav] = performance.getEntriesByType(
        'navigation'
      ) as PerformanceNavigationTiming[];
      if (nav) {
        const ttfb = nav.responseStart - nav.requestStart;
        reportMetric({
          name: 'TTFB',
          value: ttfb,
          rating: getRating('TTFB', ttfb),
        });
      }
    } catch {
      // API de navigation timing no disponible
    }
  }, []);

  return null;
}
