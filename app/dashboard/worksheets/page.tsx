'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Worksheet } from '@/types/worksheet';
import WorksheetCard from '@/components/WorksheetCard';
import WorksheetModal from '@/components/WorksheetModal';

interface Child {
  id: string;
  name: string;
}

export default function WorksheetsPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string>('');
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  const [selectedWorksheet, setSelectedWorksheet] = useState<Worksheet | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [childrenLoading, setChildrenLoading] = useState(true);

  const supabase = createClient();

  // Fetch children on mount
  useEffect(() => {
    const fetchChildren = async () => {
      setChildrenLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          console.error('No user found');
          return;
        }

        const { data, error } = await supabase
          .from('children')
          .select('id, name')
          .eq('user_id', user.id)
          .order('name');

        if (error) {
          console.error('Error fetching children:', error);
          return;
        }

        if (data && data.length > 0) {
          setChildren(data);
          setSelectedChildId(data[0].id);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setChildrenLoading(false);
      }
    };

    fetchChildren();
  }, []);

  // Fetch worksheets when child is selected
  useEffect(() => {
    if (selectedChildId) {
      setWorksheets([]);
      setPage(1);
      fetchWorksheets(1, selectedChildId);
    }
  }, [selectedChildId]);

  const fetchWorksheets = async (pageNum: number, childId: string) => {
    setLoading(true);
    try {
      const limit = 10;
      const offset = (pageNum - 1) * limit;

      const response = await fetch(
        `/api/worksheets?childId=${childId}&limit=${limit}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch worksheets');
      }

      const data = await response.json();

      if (pageNum === 1) {
        setWorksheets(data.worksheets);
      } else {
        setWorksheets((prev) => [...prev, ...data.worksheets]);
      }

      // Check if there are more results
      setHasMore(
        (data.worksheets as Worksheet[]).length === limit &&
          (data.worksheets as Worksheet[]).length > 0
      );
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching worksheets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (selectedChildId && !loading && hasMore) {
      fetchWorksheets(page + 1, selectedChildId);
    }
  };

  const handleCardClick = (worksheet: Worksheet) => {
    setSelectedWorksheet(worksheet);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedWorksheet(null);
  };

  const handleFeedbackSubmitted = () => {
    // Refresh the current worksheet data
    if (selectedChildId) {
      fetchWorksheets(1, selectedChildId);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#111813] dark:text-white tracking-tight text-3xl md:text-4xl font-bold leading-tight">
            Histórico de Fichas
          </h1>
          <p className="text-[#61896f] dark:text-[#a0c4ae] text-base mt-2">
            Revisa todas las fichas generadas y sus evaluaciones
          </p>
        </div>
      </section>

      {/* Child Selector */}
      <div className="bg-white dark:bg-dark-surface rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
        <label className="block text-sm font-bold text-[#111813] dark:text-white mb-3 uppercase tracking-wide">
          Selecciona un estudiante
        </label>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Utiliza el selector de estudiante del panel principal para elegir a quién deseas ver.
        </p>
      </div>

      {/* Worksheets Grid */}
      {selectedChildId && (
        <div>
          {worksheets.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {worksheets.map((worksheet) => (
                  <WorksheetCard
                    key={worksheet.id}
                    worksheet={worksheet}
                    onClick={() => handleCardClick(worksheet)}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className={`px-8 py-3 rounded-xl font-bold text-base transition-all ${
                      loading
                        ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary/90 text-white hover:scale-105 active:scale-95'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Cargando...
                      </span>
                    ) : (
                      'Cargar más fichas'
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-dark-surface rounded-3xl border border-gray-100 dark:border-dark-border">
              <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 block mb-4">
                description
              </span>
              <h3 className="text-xl font-bold text-[#111813] dark:text-white mb-2">
                No hay fichas disponibles
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Las fichas que generes aparecerán aquí
              </p>
            </div>
          )}
        </div>
      )}

      {/* Worksheet Modal */}
      {selectedWorksheet && (
        <WorksheetModal
          worksheet={selectedWorksheet}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onFeedbackSubmitted={handleFeedbackSubmitted}
        />
      )}
    </div>
  );
}
