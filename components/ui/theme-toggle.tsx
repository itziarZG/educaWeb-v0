'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        relative w-10 h-10 rounded-full 
        bg-slate-100 dark:bg-dark-highlight 
        border border-slate-200 dark:border-dark-border
        shadow-sm
        flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-primary/20
        ${className}
      `}
      aria-label="Cambiar tema"
    >
      <Sun className="w-5 h-5 text-amber-400 dark:hidden" strokeWidth={2} />
      <Moon
        className="w-5 h-5 text-slate-500 hidden dark:block"
        strokeWidth={2}
      />
    </button>
  );
}
