import { Skeleton } from '@/components/ui/skeleton';

export default function SelectProfileLoading() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display antialiased transition-colors duration-300 animate-in fade-in">
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="w-12"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md flex justify-center mb-8">
          <Skeleton className="h-10 w-64" />
        </div>

        <div className="w-full max-w-sm">
          <div className="grid grid-cols-2 gap-8 p-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center gap-4 w-full">
                <Skeleton className="w-full aspect-square max-w-[140px] rounded-full" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-sm mt-12 mb-10">
          <div className="flex px-4 py-3 justify-center">
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        </div>
      </main>
    </div>
  );
}
