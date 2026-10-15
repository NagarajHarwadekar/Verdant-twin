import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageId } from '../types';

interface BackButtonProps {
  onBack: () => void;
  targetLabel?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onBack,
  targetLabel = 'Back',
  className = '',
}) => {
  return (
    <button
      onClick={onBack}
      className={`group inline-flex items-center gap-2 rounded-lg border border-slate-200/90 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:border-[#064e3b] hover:text-[#064e3b] hover:bg-white active:scale-95 transition-all focus:outline-none ${className}`}
      aria-label={`Go back to ${targetLabel}`}
    >
      <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1 text-emerald-800" />
      <span>Back</span>
    </button>
  );
};
