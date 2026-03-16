import { cn } from '@/utils/cn';
import Link from 'next/link';

interface LinkButtonProps {
  href: string;
  variant?: 'big' | 'small';
  children: React.ReactNode;
  className?: string;
}

export default function LinkButton({
  href,
  variant = 'small',
  children,
  className,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'bg-primary hover:bg-primary/90 text-[#111813] transition-all shadow-primary/20',
        variant === 'big'
          ? 'xxs:px-8 px-1 py-3 rounded-2xl text-xl font-black shadow-xl w-full flex flex-col md:flex-row items-center justify-center'
          : 'xxs:px-2 px-0.5 py-1 rounded-xl text-md font-bold shadow-lg flex items-center justify-center gap-2',
        className
      )}
    >
      {children}
    </Link>
  );
}
