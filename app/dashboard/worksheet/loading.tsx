import { Skeleton } from '@/components/ui/skeleton';

export default function WorksheetLoading() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto h-[calc(100vh-140px)] pb-10 animate-in fade-in duration-500">
      {/* Top Navigation Bar Skeleton */}
      <div className="flex items-center justify-between bg-white dark:bg-[#1a2e20] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <Skeleton className="h-6 w-20" />
        <div className="flex-1 max-w-md mx-4">
          <div className="flex justify-between mb-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-3 w-full rounded-full" />
        </div>
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>

      <main className="flex-1 bg-white dark:bg-[#102216] rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 relative overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar Skeleton */}
        <aside className="md:w-1/3 bg-[#f0fdf4] dark:bg-[#1a2e20] p-8 flex flex-col justify-center border-r border-[#dcfce7] dark:border-gray-800">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-20 w-full mb-8" />
          <Skeleton className="h-16 w-full rounded-2xl" />
        </aside>

        {/* Work Area Skeleton */}
        <section className="flex-1 p-8 flex flex-col justify-between">
          <div className="flex flex-wrap gap-4 justify-center py-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="w-24 h-24 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-48 w-full rounded-3xl" />
        </section>
      </main>

      {/* Action Footer Skeleton */}
      <footer className="flex justify-end gap-4">
        <Skeleton className="h-14 w-40 rounded-xl" />
        <Skeleton className="h-14 w-48 rounded-xl" />
      </footer>
    </div>
  );
}
