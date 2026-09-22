import React from 'react';
import { Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { OfferStatus } from '../../types';

interface DiscountBadgeProps {
  status: OfferStatus;
  discountPercentage: number;
  requirementText?: string;
  size?: 'sm' | 'md';
}

export const DiscountBadge: React.FC<DiscountBadgeProps> = ({
  status,
  discountPercentage,
  requirementText,
  size = 'md',
}) => {
  const pad = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  if (status === 'unlocked') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm ${pad}`}
      >
        <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>✓ {discountPercentage}% OFF UNLOCKED</span>
      </span>
    );
  }

  if (status === 'activity_completed') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-bold rounded-full bg-amber-50 text-amber-900 border border-amber-300 animate-pulse ${pad}`}
      >
        <Sparkles className={size === 'sm' ? 'w-3 h-3 text-amber-600' : 'w-3.5 h-3.5 text-amber-600'} />
        <span>✓ Activity Completed · {discountPercentage}% OFF Ready</span>
      </span>
    );
  }

  // Locked state
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${pad}`}
    >
      <Lock className={size === 'sm' ? 'w-3 h-3 text-slate-500' : 'w-3.5 h-3.5 text-slate-500'} />
      <span>
        {discountPercentage}% OFF {requirementText ? `· ${requirementText}` : '· Locked'}
      </span>
    </span>
  );
};
