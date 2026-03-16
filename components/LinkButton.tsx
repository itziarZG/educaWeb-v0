'use client';

import Link from 'next/link';

export default function LinkButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        variant === 'big'
          ? 'bg-primary hover:bg-primary/90 text-[#111813] xxs:px-8 px-1 py-3 rounded-2xl text-xl font-black transition-all shadow-xl shadow-primary/20 w-full flex flex-col md:flex-row items-center justify-center '
          : 'bg-primary hover:bg-primary/90 text-[#111813] xxs:px-2 px-0.5 py-1 rounded-xl text-md font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2'
      }
    >
      {children}
    </Link>
  );
}
