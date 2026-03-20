'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@utils/supabase/client';
import { useChild, Child } from '@/context/child-context';

interface ChildSelectorProps {
  initialChildren: Child[];
}

export default function ChildSelector({ initialChildren }: ChildSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<Child[]>(initialChildren);
  const { selectedChild, setSelectedChild } = useChild();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set initial selected child if not set
  useEffect(() => {
    if (!selectedChild && children.length > 0) {
      setSelectedChild(children[0]);
    }
  }, [children, selectedChild, setSelectedChild]);

  // Fetch children if not provided
  useEffect(() => {
    if (initialChildren.length === 0) {
      const fetchChildren = async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (!user) return;

          const { data, error } = await supabase
            .from('children')
            .select('id, name, avatar_url')
            .eq('user_id', user.id)
            .order('name');

          if (!error && data) {
            setChildren(data as Child[]);
          }
        } catch (error) {
          console.error('Error fetching children:', error);
        }
      };

      fetchChildren();
    }
  }, [initialChildren, supabase]);

  const handleSelectChild = (child: Child) => {
    setSelectedChild(child);
    setIsOpen(false);
  };

  if (children.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#102216] transition-colors group cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {selectedChild && (
          <>
            {selectedChild.avatar_url ? (
              <div
                className="size-8 rounded-full bg-cover bg-center border border-gray-300 dark:border-gray-600"
                style={{
                  backgroundImage: `url("${selectedChild.avatar_url}")`,
                }}
                title={selectedChild.name}
              />
            ) : (
              <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                {selectedChild.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium text-[#111813] dark:text-white hidden sm:inline">
              {selectedChild.name}
            </span>
            <span className="material-symbols-outlined text-gray-400 group-hover:text-[#111813] dark:group-hover:text-white transition-colors text-sm">
              {isOpen ? 'expand_less' : 'expand_more'}
            </span>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1a2e20] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 z-50 overflow-hidden">
          <div className="py-2">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => handleSelectChild(child)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#102216] transition-colors ${
                  selectedChild?.id === child.id
                    ? 'bg-primary/10 dark:bg-primary/20'
                    : ''
                }`}
              >
                {child.avatar_url ? (
                  <div
                    className="size-8 rounded-full bg-cover bg-center border border-gray-300 dark:border-gray-600"
                    style={{ backgroundImage: `url("${child.avatar_url}")` }}
                  />
                ) : (
                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {child.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#111813] dark:text-white">
                    {child.name}
                  </p>
                </div>
                {selectedChild?.id === child.id && (
                  <span className="material-symbols-outlined text-primary text-sm">
                    check
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
