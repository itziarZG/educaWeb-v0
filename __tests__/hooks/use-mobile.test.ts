import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useIsMobile } from '@/hooks/use-mobile';

describe('useIsMobile', () => {
  let listeners: Array<() => void> = [];
  let addEventListenerSpy: ReturnType<typeof vi.fn>;
  let removeEventListenerSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    listeners = [];
    addEventListenerSpy = vi.fn((_event: string, cb: () => void) => {
      listeners.push(cb);
    });
    removeEventListenerSpy = vi.fn();

    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
      addEventListener: addEventListenerSpy,
      removeEventListener: removeEventListenerSpy,
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns false when window width is >= 768', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true when window width is < 768', () => {
    Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('updates when window is resized', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // Simulate resize to mobile
    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
      listeners.forEach((cb) => cb());
    });

    expect(result.current).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    const { unmount } = renderHook(() => useIsMobile());
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
