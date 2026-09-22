import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Star,
  CheckCircle2,
  Lock,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Flame,
  PlusCircle,
} from 'lucide-react';
import { products } from '../data/products';
import { challenges } from '../data/challenges';
import { useFitness } from '../context/FitnessContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { DiscountBadge } from '../components/common/DiscountBadge';
import { ActivityProgress } from '../components/common/ActivityProgress';
import { formatINR } from '../utils/pricing';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const product = products.find((p) => p.id === id);

  const {
    getOfferStatus,
    isOfferUnlocked,
    unlockOffer,
    getChallengeProgress,
    simulateActivity,
  } = useFitness();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The product you are looking for does not exist.</p>
        <Link
          to="/shop"
          className="inline-block mt-4 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const req = product.fitnessOffer.requirement;
  const challengeDef = challenges.find((c) => c.id === req.challengeId);
  const progress = getChallengeProgress(req.challengeId);
  const status = getOfferStatus(product.id);
  const unlocked = isOfferUnlocked(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleSimulate = () => {
    simulateActivity(req.challengeId, challengeDef?.stepIncrement || 1);
  };

  const handleUnlock = () => {
    unlockOffer(product.id, req.challengeId);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-emerald-600">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-emerald-600">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-emerald-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Grid: Visuals on Left, Product Details & Action Engine on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl bg-slate-50 border border-slate-200/80 overflow-hidden shadow-sm">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition ${
                  inWishlist
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-sm'
                    : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-500 border border-slate-200'
                }`}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${
                      activeImageIndex === idx
                        ? 'border-emerald-600 shadow-md ring-2 ring-emerald-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Fitness Challenge Box & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Link
                  to={`/shop?brand=${encodeURIComponent(product.brand)}`}
                  className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 hover:bg-emerald-100 transition"
                >
                  {product.brand}
                </Link>
                <span className="text-xs font-semibold text-slate-500">
                  Category: {product.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 mt-3 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                  In Stock ({product.stock} units available)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">
                    {unlocked ? 'Discounted Member Price' : 'Standard Retail Price'}
                  </span>
                  <PriceDisplay
                    originalPrice={product.originalPrice}
                    discountPercentage={product.fitnessOffer.discountPercentage}
                    isUnlocked={unlocked}
                    size="xl"
                    showSavingsText={unlocked}
                  />
                </div>

                <DiscountBadge
                  status={status}
                  discountPercentage={product.fitnessOffer.discountPercentage}
                  requirementText={req.description}
                  size="md"
                />
              </div>
            </div>

            {/* FITNESS ACTIVITY & DISCOUNT UNLOCK MODULE (CRITICAL REQUIREMENT) */}
            <div className="p-5 rounded-2xl border-2 border-emerald-500/20 bg-emerald-50/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Flame className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Fitness Challenge Requirement
                    </h3>
                    <div className="text-xs text-slate-600 font-semibold">
                      {req.description} · {product.fitnessOffer.discountPercentage}% OFF
                    </div>
                  </div>
                </div>

                {status === 'unlocked' ? (
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    ✓ Unlocked
                  </span>
                ) : status === 'activity_completed' ? (
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full animate-pulse">
                    ✓ Completed
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-600 bg-slate-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>

              {/* Progress & Simulation Controls */}
              <ActivityProgress
                current={progress.current}
                target={progress.target}
                unit={req.unit}
                stepIncrement={challengeDef?.stepIncrement || 1}
                onSimulate={handleSimulate}
                showSimulateButton={status !== 'unlocked' && !progress.isCompleted}
              />

              {/* 3-State Actions */}
              <div className="pt-2">
                {/* STATE 1: Locked */}
                {status === 'locked' && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-600">
                      Complete <span className="font-bold text-slate-900">{req.description}</span> to unlock {product.fitnessOffer.discountPercentage}% OFF. The price remains at {formatINR(product.originalPrice)} until unlocked.
                    </p>
                    <button
                      onClick={handleSimulate}
                      type="button"
                      className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 shadow-sm flex items-center justify-center gap-1.5 transition"
                    >
                      <PlusCircle className="w-4 h-4 text-emerald-600" />
                      <span>Simulate Activity (+{challengeDef?.stepIncrement || 1} {req.unit})</span>
                    </button>
                  </div>
                )}

                {/* STATE 2: Activity Completed */}
                {status === 'activity_completed' && (
                  <div className="space-y-2">
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                      🎉 <strong>Activity verified!</strong> Your {product.fitnessOffer.discountPercentage}% OFF is ready to unlock. Click below to recalculate the product price.
                    </div>
                    <button
                      onClick={handleUnlock}
                      type="button"
                      className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition animate-bounce"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Unlock {product.fitnessOffer.discountPercentage}% OFF Offer</span>
                    </button>
                  </div>
                )}

                {/* STATE 3: Unlocked */}
                {status === 'unlocked' && (
                  <div className="p-3 bg-emerald-100/70 rounded-xl border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      ✓ {product.fitnessOffer.discountPercentage}% discount is permanently unlocked for your account. You save {formatINR(product.originalPrice * product.fitnessOffer.discountPercentage / 100)}!
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity and Primary Action */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-slate-300 rounded-xl p-1 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg transition font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg transition font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                type="button"
                className="flex-1 py-3.5 px-6 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {unlocked ? 'Add to Cart at Discounted Price' : 'Add to Cart at Standard Price'}
                </span>
              </button>
            </div>

            {/* Description & Specs */}
            <div className="pt-6 border-t border-slate-200/80 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Description</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.specs && (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Technical Specifications</h3>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/60 divide-y divide-slate-200/60 text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="py-2 flex justify-between">
                        <span className="font-semibold text-slate-500">{key}</span>
                        <span className="font-bold text-slate-800">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-slate-500">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <Truck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span>100% Genuine Brand</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <RotateCcw className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span>7-Day Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
