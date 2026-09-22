import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import { PriceDisplay } from '../common/PriceDisplay';

export const OfferCard: React.FC<{ product: Product }> = ({ product }) => {
  const { getOfferStatus, isOfferUnlocked, unlockOffer } = useFitness();
  const navigate = useNavigate();

  const status = getOfferStatus(product.id);
  const unlocked = isOfferUnlocked(product.id);
  const req = product.fitnessOffer.requirement;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-card hover:shadow-card-hover transition-all p-4 flex gap-4 items-center">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-24 h-24 rounded-xl object-cover border border-slate-100 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {product.brand}
          </span>
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
            {product.fitnessOffer.discountPercentage}% OFF
          </span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="text-sm font-bold text-slate-900 hover:text-emerald-600 truncate block transition"
        >
          {product.name}
        </Link>

        <div className="mt-1">
          <PriceDisplay
            originalPrice={product.originalPrice}
            discountPercentage={product.fitnessOffer.discountPercentage}
            isUnlocked={unlocked}
            size="sm"
            showSavingsText={false}
          />
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
            {status === 'unlocked' ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Offer Unlocked
              </span>
            ) : status === 'activity_completed' ? (
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Activity Done · Ready
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" /> Complete {req.description}
              </span>
            )}
          </div>

          {status === 'locked' && (
            <button
              onClick={() => navigate(`/fitness-rewards?challenge=${req.challengeId}`)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
            >
              <span>View Challenge</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {status === 'activity_completed' && (
            <button
              onClick={() => unlockOffer(product.id, req.challengeId)}
              className="px-2.5 py-1 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm transition"
            >
              Unlock Now
            </button>
          )}

          {status === 'unlocked' && (
            <Link
              to={`/product/${product.id}`}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Shop Offer
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
