import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  PlusCircle,
  ShoppingBag,
  ExternalLink,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { Challenge } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import { ActivityProgress } from '../common/ActivityProgress';
import { PriceDisplay } from '../common/PriceDisplay';

interface FitnessChallengeCardProps {
  challenge: Challenge;
}

export const FitnessChallengeCard: React.FC<FitnessChallengeCardProps> = ({ challenge }) => {
  const { getChallengeProgress, simulateActivity, unlockOffer, getOfferStatus, isOfferUnlocked } = useFitness();
  const { addToCart } = useCart();

  const progress = getChallengeProgress(challenge.id);
  const associatedProduct = products.find((p) => p.id === challenge.associatedProductId);

  const status = associatedProduct ? getOfferStatus(associatedProduct.id) : 'locked';
  const unlocked = associatedProduct ? isOfferUnlocked(associatedProduct.id) : false;

  const isCompleted = progress.current >= challenge.target;

  const handleSimulate = () => {
    simulateActivity(challenge.id, challenge.stepIncrement);
  };

  const handleUnlock = () => {
    if (associatedProduct) {
      unlockOffer(associatedProduct.id, challenge.id);
    }
  };

  const handleAddToCart = () => {
    if (associatedProduct) {
      addToCart(associatedProduct, 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 p-5 flex flex-col justify-between">
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
            <Flame className="w-3 h-3 fill-emerald-600 text-emerald-600" />
            {challenge.activityType} Challenge
          </span>

          <span className="text-xs font-extrabold text-white bg-slate-900 px-2.5 py-0.5 rounded-full">
            {challenge.discountPercentage}% OFF
          </span>
        </div>

        {/* Title & Description */}
        <h4 className="text-base font-bold text-slate-900 mb-1">{challenge.title}</h4>
        <p className="text-xs text-slate-500 mb-4">{challenge.description}</p>

        {/* Associated Product Mini Card */}
        {associatedProduct && (
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/60 mb-4 flex items-center gap-3">
            <img
              src={associatedProduct.images[0]}
              alt={associatedProduct.name}
              className="w-14 h-14 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-semibold text-slate-400 block truncate">
                {associatedProduct.brand}
              </span>
              <Link
                to={`/product/${associatedProduct.id}`}
                className="text-xs font-bold text-slate-800 hover:text-emerald-600 truncate block transition"
              >
                {associatedProduct.name}
              </Link>
              <div className="mt-0.5">
                <PriceDisplay
                  originalPrice={associatedProduct.originalPrice}
                  discountPercentage={challenge.discountPercentage}
                  isUnlocked={unlocked}
                  size="sm"
                  showSavingsText={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Activity Progress Bar & Simulation */}
        <div className="mb-4">
          <ActivityProgress
            current={progress.current}
            target={challenge.target}
            unit={challenge.unit}
            stepIncrement={challenge.stepIncrement}
            onSimulate={handleSimulate}
            showSimulateButton={!isCompleted && status !== 'unlocked'}
          />
        </div>
      </div>

      {/* Dynamic State Footers */}
      <div className="pt-3 border-t border-slate-100">
        {/* STATE 1: Locked */}
        {status === 'locked' && !isCompleted && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Locked ({challenge.discountPercentage}% OFF)</span>
            </div>
            {associatedProduct && (
              <Link
                to={`/product/${associatedProduct.id}`}
                className="text-xs font-semibold text-slate-700 hover:text-emerald-600 flex items-center gap-1 transition"
              >
                <span>View Product</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        )}

        {/* STATE 2: Activity Completed (Ready to Unlock) */}
        {status === 'activity_completed' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ✓ Activity Completed
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                {challenge.discountPercentage}% OFF Available
              </span>
            </div>

            <button
              onClick={handleUnlock}
              type="button"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition transform active:scale-98 animate-pulse"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Unlock {challenge.discountPercentage}% OFF Offer</span>
            </button>
          </div>
        )}

        {/* STATE 3: Offer Unlocked */}
        {status === 'unlocked' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ✓ {challenge.discountPercentage}% OFF UNLOCKED
              </span>
              <span className="text-xs font-extrabold text-emerald-700">
                Discount Active
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                type="button"
                className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart at Discount</span>
              </button>

              {associatedProduct && (
                <Link
                  to={`/product/${associatedProduct.id}`}
                  className="p-2 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl text-slate-600 hover:text-emerald-700 transition"
                  title="View Details"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
