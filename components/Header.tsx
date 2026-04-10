import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import HeaderAuth from './HeaderAuth';
import ThemeToggle from './ui/theme-toggle';
import MobileMenu from './ui/mobile-menu';

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const logoHref = user ? '/dashboard' : '/';

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={logoHref} className="flex items-center gap-2">
          <Image
            src="/logo_tutorai.png"
            alt="TUTOR_AI Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-[#111813] dark:text-white text-lg font-bold leading-tight tracking-tight">
            TUTOR_AI
          </span>
        </Link>

        {/* Desktop: Theme Toggle + HeaderAuth */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <HeaderAuth />
        </div>

        {/* Mobile: Solo menú hamburguesa */}
        <MobileMenu />
      </div>
    </header>
  );
}
