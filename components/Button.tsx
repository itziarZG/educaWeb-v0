'use client';

export default function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-primary hover:bg-primary/90 text-[#111813] md:px-5 px-2 py-2 rounded-lg text-sm font-bold transition-all shadow-sm"
    >
      {children}
    </button>
  );
}
