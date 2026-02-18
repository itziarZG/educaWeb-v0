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
          ? 'bg-primary hover:bg-primary/90 text-[#111813] px-12 py-5 rounded-2xl text-xl font-black transition-all shadow-xl shadow-primary/20 w-full flex flex-col md:flex-row items-center justify-center '
          : 'bg-primary hover:bg-primary/90 text-[#111813] px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2'
      }
    >
      {children}
    </Link>
  );
}
