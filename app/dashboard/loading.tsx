import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-500">
      {/* Welcome Header Skeleton */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-10 w-64 md:w-80" />
          <Skeleton className="h-5 w-48 mt-2" />
        </div>

        {/* Quick Stats Skeleton */}
        <div className="flex gap-4">
          <Skeleton className="h-20 w-32 md:w-40 rounded-2xl" />
          <Skeleton className="h-20 w-32 md:w-40 rounded-2xl" />
        </div>
      </section>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Hero Action Card Skeleton */}
          <Skeleton className="h-64 w-full rounded-3xl" />

          {/* Today's Progress Section Skeleton */}
          <div className="bg-white dark:bg-dark-surface rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            <Skeleton className="h-6 w-full rounded-full mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-32 rounded-2xl" />
              <Skeleton className="h-32 rounded-2xl" />
              <Skeleton className="h-32 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="flex flex-col gap-6">
          {/* Family Peace Card Skeleton */}
          <div className="bg-white dark:bg-dark-surface rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-20 w-20 rounded-full" />
            </div>
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          {/* Upcoming Events Skeleton */}
          <div className="bg-white dark:bg-dark-surface rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-4 mt-2">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 items-center">
                  <Skeleton className="h-14 w-12 rounded-xl" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
