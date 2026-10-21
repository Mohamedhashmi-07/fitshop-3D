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
import { StreakOfferSection } from '../components/fitness/StreakOfferSection';
import { formatINR } from '../utils/pricing';
import { TiltCard } from '../components/3d/TiltCard';

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
          {/* Left Column: Image Gallery with 3D TiltCard */}
          <div className="lg:col-span-6 space-y-4">
            <TiltCard
              maxTilt={8}
              scale={1.02}
              perspective={1100}
              glare={true}
              className="relative aspect-square w-full rounded-3xl bg-slate-50 border border-slate-200/90 overflow-hidden shadow-3d-card"
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center translate-z-12 transition-transform duration-500"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-200 translate-z-24 shadow-sm ${
                  inWishlist
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 scale-105'
                    : 'bg-white/85 hover:bg-white text-slate-600 hover:text-rose-500 border border-slate-200 hover:scale-110'
                }`}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500' : ''}`} />
              </button>
            </TiltCard>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImageIndex === idx
                        ? 'border-emerald-600 shadow-3d-sm ring-2 ring-emerald-200 scale-105'
                        : 'border-slate-200 hover:border-slate-300 hover:scale-102'
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

            {/* Price Box with 3D Depth */}
            <div className="p-5 rounded-3xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-3d-card">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs text-slate-500 block mb-1 font-medium">
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

            {/* FITNESS ACTIVITY & STREAK CHALLENGE MODULE */}
            <StreakOfferSection product={product} />

            {/* Quantity and Primary Action */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-slate-300 rounded-xl p-1 bg-white shadow-xs">
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
                className="flex-1 py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md btn-3d-dark flex items-center justify-center gap-2"
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
