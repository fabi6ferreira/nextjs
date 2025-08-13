'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ label = 'Voltar', className = '' }: { label?: string; className?: string }){
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={()=> router.back()}
      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 ${className}`}
      aria-label="Voltar"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
