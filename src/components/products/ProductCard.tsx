import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Sparkles, ArrowRight, Flame, Lock, CheckCircle2 } from 'lucide-react';
import { Product } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { PriceDisplay } from '../common/PriceDisplay';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { getStreakChallenge, isOfferUnlocked, unlockStreakOffer } = useFitness();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const streak = getStreakChallenge(product.id);
  const unlocked = isOfferUnlocked(product.id) || streak.offerUnlocked;
  const inWishlist = isInWishlist(product.id);

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (unlocked) {
      addToCart(product, 1);
    } else if (streak.challengeStatus === 'streak_completed') {
      unlockStreakOffer(product.id);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Media & Badges */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
            inWishlist
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/80 hover:bg-white text-slate-500 hover:text-rose-500 border border-slate-200/60'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Status Badge overlay */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className="text-[11px] font-black text-white bg-slate-900 px-2.5 py-1 rounded-full shadow-sm">
            {streak.discountPercentage}% OFF
          </span>
        </div>

        {/* Bottom Streak Chip */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between text-[11px]">
            <span className="font-extrabold text-emerald-800 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {streak.streakRequiredDays}-Day Streak
            </span>
            <span className="text-slate-500 font-semibold">
              {streak.currentStreak} / {streak.streakRequiredDays} Days
            </span>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-medium">
              {product.category}
            </span>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="block font-bold text-slate-900 text-sm hover:text-emerald-600 line-clamp-1 transition"
          >
            {product.name}
          </Link>

          {/* Streak Daily Requirement */}
          <div className="text-[11px] text-slate-500 mt-1 font-medium flex items-center gap-1.5">
            <span>{streak.dailyTarget.toLocaleString()} {streak.targetUnit} / Day</span>
            <span>•</span>
            {unlocked ? (
              <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Unlocked
              </span>
            ) : streak.challengeStatus === 'streak_completed' ? (
              <span className="text-amber-700 font-bold">Ready to Unlock</span>
            ) : (
              <span className="text-slate-400 flex items-center gap-0.5">
                <Lock className="w-2.5 h-2.5" /> Locked
              </span>
            )}
          </div>
        </div>

        {/* Price & Primary Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex-1">
            <PriceDisplay
              originalPrice={product.originalPrice}
              discountPercentage={streak.discountPercentage}
              isUnlocked={unlocked}
              size="md"
              showSavingsText={unlocked}
            />
          </div>

          <div>
            {!unlocked && streak.challengeStatus !== 'streak_completed' && (
              <button
                onClick={handleAction}
                type="button"
                className="py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-1 transition"
              >
                <span>{streak.currentStreak > 0 ? 'Continue' : 'Challenge'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {!unlocked && streak.challengeStatus === 'streak_completed' && (
              <button
                onClick={handleAction}
                type="button"
                className="py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1 transition animate-bounce"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unlock</span>
              </button>
            )}

            {unlocked && (
              <button
                onClick={handleAction}
                type="button"
                className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1 transition"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
