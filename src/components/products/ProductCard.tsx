import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { PriceDisplay } from '../common/PriceDisplay';
import { DiscountBadge } from '../common/DiscountBadge';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { getOfferStatus, isOfferUnlocked, unlockOffer } = useFitness();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const status = getOfferStatus(product.id);
  const unlocked = isOfferUnlocked(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === 'locked') {
      // Direct user to fitness rewards / challenges
      navigate(`/fitness-rewards?challenge=${product.fitnessOffer.requirement.challengeId}`);
    } else if (status === 'activity_completed') {
      // User can unlock directly from card
      unlockOffer(product.id, product.fitnessOffer.requirement.challengeId);
    } else {
      // Unlocked -> Add to Cart
      addToCart(product, 1);
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

        {/* Status Chip overlay */}
        <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
          <DiscountBadge
            status={status}
            discountPercentage={product.fitnessOffer.discountPercentage}
            requirementText={product.fitnessOffer.requirement.description}
            size="sm"
          />
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
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

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 min-h-[32px]">
            {product.description}
          </p>
        </div>

        {/* Price & Primary Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex-1">
            <PriceDisplay
              originalPrice={product.originalPrice}
              discountPercentage={product.fitnessOffer.discountPercentage}
              isUnlocked={unlocked}
              size="md"
              showSavingsText={unlocked}
            />
          </div>

          <div>
            {status === 'locked' && (
              <button
                onClick={handleAction}
                type="button"
                className="py-1.5 px-3 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-semibold rounded-xl border border-slate-200 hover:border-emerald-300 flex items-center gap-1 transition"
              >
                <span>Challenge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {status === 'activity_completed' && (
              <button
                onClick={handleAction}
                type="button"
                className="py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1 transition animate-bounce"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unlock</span>
              </button>
            )}

            {status === 'unlocked' && (
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
