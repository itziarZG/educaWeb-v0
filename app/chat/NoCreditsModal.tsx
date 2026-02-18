'use client';
interface NoCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NoCreditsModal({
  isOpen,
  onClose,
}: NoCreditsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl scale-100 animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <span className="text-4xl">🚀</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              ¡Vaya, te ha gustado!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Como soy una desarrolladora madre también pagando la IA de mi
              bolsillo, he puesto un límite inicial para que no se me disparen
              los costes.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl w-full text-left space-y-4 border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                favorite
              </span>
              ¿Quieres seguir usándolo?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Escríbeme contándome qué tal te ha funcionado y si cambiarías
              alguna cosa que me ayudes a mejorarla y te recargo{' '}
              <span className="font-bold text-primary">15 fichas gratis</span>{' '}
              encantada.
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <a
                href="mailto:contact@tutoraiapp.es"
                className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>
                contact@tutoraiapp.es
              </a>
              {/* <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]">
                  chat
                </span>
                WhatsApp
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
