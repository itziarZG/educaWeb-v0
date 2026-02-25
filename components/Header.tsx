import Image from 'next/image';
import HeaderAuth from './HeaderAuth';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo_tutorai.png"
            alt="TUTOR_AI Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <h2 className="text-[#111813] dark:text-white text-lg font-bold leading-tight tracking-tight">
            TUTOR_AI
          </h2>
        </div>
        <HeaderAuth />
      </div>
    </header>
  );
}
