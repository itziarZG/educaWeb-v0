'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Child {
  id: string;
  name: string;
  avatar_url?: string;
}

interface ChildContextType {
  selectedChild: Child | null;
  setSelectedChild: (child: Child | null) => void;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

function getInitialChild(): Child | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem('selectedChild');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem('selectedChild');
    }
  }
  return null;
}

export function ChildProvider({ children }: { children: ReactNode }) {
  const [selectedChild, setSelectedChild] = useState<Child | null>(
    getInitialChild
  );

  // Save selected child to localStorage when it changes
  const handleSetSelectedChild = (child: Child | null) => {
    setSelectedChild(child);
    if (child) {
      localStorage.setItem('selectedChild', JSON.stringify(child));
    } else {
      localStorage.removeItem('selectedChild');
    }
  };

  return (
    <ChildContext.Provider
      value={{
        selectedChild,
        setSelectedChild: handleSetSelectedChild,
      }}
    >
      {children}
    </ChildContext.Provider>
  );
}

export function useChild() {
  const context = useContext(ChildContext);
  if (context === undefined) {
    throw new Error('useChild must be used within a ChildProvider');
  }
  return context;
}
