import React from 'react';
import { calculateDiscountedPrice, calculateSavings, formatINR } from '../../utils/pricing';

interface PriceDisplayProps {
  originalPrice: number;
  discountPercentage: number;
  isUnlocked: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSavingsText?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  originalPrice,
  discountPercentage,
  isUnlocked,
  size = 'md',
  showSavingsText = true,
}) => {
  if (!isUnlocked || discountPercentage <= 0) {
    const sizeClasses = {
      sm: 'text-sm font-semibold text-slate-900',
      md: 'text-base font-bold text-slate-900',
      lg: 'text-xl font-extrabold text-slate-900',
      xl: 'text-3xl font-extrabold text-slate-900',
    };

    return (
      <div className="flex items-center gap-1.5">
        <span className={sizeClasses[size]}>{formatINR(originalPrice)}</span>
      </div>
    );
  }

  const discountedPrice = calculateDiscountedPrice(originalPrice, discountPercentage);
  const savings = calculateSavings(originalPrice, discountedPrice);

  const priceSizes = {
    sm: 'text-sm font-bold text-emerald-600',
    md: 'text-base font-bold text-emerald-600',
    lg: 'text-xl font-extrabold text-emerald-600',
    xl: 'text-3xl font-extrabold text-emerald-600',
  };

  const strikeSizes = {
    sm: 'text-xs text-slate-400 line-through',
    md: 'text-sm text-slate-400 line-through',
    lg: 'text-base text-slate-400 line-through',
    xl: 'text-lg text-slate-400 line-through',
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-2">
        <span className={priceSizes[size]}>{formatINR(discountedPrice)}</span>
        <span className={strikeSizes[size]}>{formatINR(originalPrice)}</span>
      </div>
      {showSavingsText && (
        <span className="text-xs font-semibold text-emerald-700 mt-0.5">
          You save {formatINR(savings)} ({discountPercentage}% OFF)
        </span>
      )}
    </div>
  );
};
