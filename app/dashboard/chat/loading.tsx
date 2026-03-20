import { Skeleton } from '@/components/ui/skeleton';

export default function ChatLoading() {
  return (
    <div className="bg-background-light dark:bg-background-dark h-screen overflow-hidden flex transition-colors animate-in fade-in duration-500">
      <main className="flex-1 flex h-full relative overflow-hidden bg-white dark:bg-dark-surface transition-colors duration-200">
        {/* Chat Section Skeleton */}
        <section className="w-full md:w-[380px] lg:w-[420px] flex flex-col border-r border-[#f0f2f4] dark:border-dark-border bg-white dark:bg-dark-surface z-20 shrink-0">
          {/* Header */}
          <div className="p-4 border-b border-[#f0f2f4] dark:border-dark-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 space-y-6 overflow-hidden">
            <div className="flex justify-start">
              <div className="space-y-2">
                <Skeleton className="h-16 w-64 rounded-2xl rounded-tl-none" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <div className="flex justify-end">
              <div className="space-y-2 flex flex-col items-end">
                <Skeleton className="h-12 w-48 rounded-2xl rounded-tr-none bg-primary/20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div className="flex justify-start">
              <div className="space-y-2">
                <Skeleton className="h-24 w-72 rounded-2xl rounded-tl-none" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#f0f2f4] dark:border-dark-border">
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </section>

        {/* Action Bar Skeleton */}
        <div className="hidden md:flex w-[80px] flex-col items-center justify-center border-r border-[#f0f2f4] dark:border-dark-border bg-gray-50/50 dark:bg-dark-surface/50 z-10">
          <Skeleton className="h-14 w-14 rounded-full" />
          <Skeleton className="h-3 w-12 mt-3" />
        </div>

        {/* Visualization Section Skeleton */}
        <section className="hidden md:flex flex-1 flex-col bg-slate-50 dark:bg-background-dark h-full overflow-hidden p-6 gap-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </div>
          <Skeleton className="flex-1 w-full rounded-2xl shadow-inner" />
        </section>
      </main>
    </div>
  );
}
