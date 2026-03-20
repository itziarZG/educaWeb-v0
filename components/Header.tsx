import Image from 'next/image';
import Link from 'next/link';
import HeaderAuth from './HeaderAuth';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo_tutorai.png"
              alt="TUTOR_AI Logo"
              width={32}
              height={32}
              className="object-contain mr-2"
            />
            <span className="text-xl font-bold tracking-tight">TUTOR_AI</span>
          </Link>
        </div>
        <HeaderAuth />
      </div>
    </header>
  );
}
