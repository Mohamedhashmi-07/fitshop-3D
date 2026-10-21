import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  PlusCircle,
  ShoppingBag,
  Flame,
  ArrowRight,
  AlertTriangle,
  RotateCcw,
  Clock,
  Footprints,
  Compass,
} from 'lucide-react';
import { Challenge } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import { PriceDisplay } from '../common/PriceDisplay';
import { TiltCard } from '../3d/TiltCard';

interface FitnessChallengeCardProps {
  challenge: Challenge;
}

export const FitnessChallengeCard: React.FC<FitnessChallengeCardProps> = ({ challenge }) => {
  const {
    getStreakChallenge,
    simulateTodayActivity,
    restartStreakChallenge,
    unlockStreakOffer,
    isOfferUnlocked,
  } = useFitness();
  const { addToCart } = useCart();

  const associatedProduct = products.find((p) => p.id === challenge.associatedProductId);
  const productId = associatedProduct?.id || challenge.associatedProductId;

  const streak = getStreakChallenge(productId);
  const unlocked = isOfferUnlocked(productId) || streak.offerUnlocked;
  const isBroken = streak.challengeStatus === 'streak_reset';
  const isCompletedStreak = streak.challengeStatus === 'streak_completed' || streak.currentStreak >= streak.streakRequiredDays;

  const remainingDays = Math.max(0, streak.streakRequiredDays - streak.currentStreak);
  const progressPercent = Math.min(100, Math.round((streak.currentStreak / streak.streakRequiredDays) * 100));

  const handleSimulate = () => {
    simulateTodayActivity(productId);
  };

  const handleUnlock = () => {
    unlockStreakOffer(productId);
  };

  const handleAddToCart = () => {
    if (associatedProduct) {
      addToCart(associatedProduct, 1);
    }
  };

  // Section 21: Missed Challenge Card (Broken Streak)
  if (isBroken) {
    return (
      <TiltCard
        maxTilt={6}
        scale={1.02}
        perspective={1000}
        glare={true}
        className="bg-rose-50/70 backdrop-blur-sm rounded-3xl border-2 border-rose-200/90 shadow-3d-card p-5 flex flex-col justify-between space-y-4 overflow-hidden"
      >
        <div className="translate-z-12">
          <div className="flex items-center justify-between gap-2 mb-3 translate-z-18">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-1 rounded-full flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Streak Broken
            </span>
            <span className="text-xs font-black text-rose-900 bg-white px-2.5 py-0.5 rounded-full border border-rose-200 shadow-xs">
              {streak.discountPercentage}% OFF
            </span>
          </div>

          {associatedProduct && (
            <div className="flex items-center gap-3 mb-3 bg-white/90 p-2.5 rounded-2xl border border-rose-100 shadow-xs translate-z-18">
              <img
                src={associatedProduct.images[0]}
                alt={associatedProduct.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">{associatedProduct.brand}</span>
                <h4 className="text-xs font-extrabold text-slate-900 truncate">{associatedProduct.name}</h4>
              </div>
            </div>
          )}

          <div className="space-y-1.5 text-xs text-rose-900">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-500">Previous Streak:</span>
              <span className="font-bold text-slate-700">{streak.previousStreak || 0} / {streak.streakRequiredDays} Days</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-slate-500">Current Streak:</span>
              <span className="font-extrabold text-rose-700">0 / {streak.streakRequiredDays} Days</span>
            </div>
            <p className="text-[11px] text-rose-700 pt-1 font-normal">
              You missed a required day. Start again from Day 1 to unlock this offer.
            </p>
          </div>
        </div>

        <div className="translate-z-24">
          <button
            type="button"
            onClick={() => restartStreakChallenge(productId)}
            className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition active:scale-98"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Challenge</span>
          </button>
        </div>
      </TiltCard>
    );
  }

  // Section 20: Active Challenge Card with 3D Depth
  return (
    <TiltCard
      maxTilt={7}
      scale={1.02}
      perspective={1000}
      glare={true}
      className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 hover:border-emerald-300 shadow-3d-card hover:shadow-3d-card-hover transition-all duration-300 p-5 flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3 translate-z-24">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 shadow-xs flex items-center gap-1">
            <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
            {streak.streakRequiredDays}-Day Streak
          </span>

          <span className="text-xs font-black text-white bg-slate-900 px-2.5 py-0.5 rounded-full shadow-xs">
            {streak.discountPercentage}% OFF
          </span>
        </div>

        {/* Title & Activity Requirement */}
        <div className="translate-z-18">
          <h4 className="text-base font-extrabold text-slate-900 mb-1">{challenge.title}</h4>
          <div className="text-xs text-slate-500 mb-3 flex items-center gap-1.5 font-normal">
            <span>Daily Target:</span>
            <strong className="text-slate-800 font-bold">
              {streak.dailyTarget.toLocaleString()} {streak.targetUnit}
            </strong>
            <span>•</span>
            <span className="capitalize">{streak.activityType}</span>
          </div>
        </div>

        {/* Associated Product Mini Card */}
        {associatedProduct && (
          <div className="bg-slate-50/90 backdrop-blur-xs rounded-2xl p-3 border border-slate-200/60 mb-4 flex items-center gap-3 translate-z-18 shadow-xs">
            <img
              src={associatedProduct.images[0]}
              alt={associatedProduct.name}
              className="w-14 h-14 rounded-xl object-cover bg-white border border-slate-200 shrink-0 shadow-xs"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 block uppercase truncate tracking-wider">
                {associatedProduct.brand}
              </span>
              <Link
                to={`/product/${associatedProduct.id}`}
                className="text-xs font-bold text-slate-900 hover:text-emerald-600 truncate block transition"
              >
                {associatedProduct.name}
              </Link>
              <div className="mt-1">
                <PriceDisplay
                  originalPrice={associatedProduct.originalPrice}
                  discountPercentage={streak.discountPercentage}
                  isUnlocked={unlocked}
                  size="sm"
                  showSavingsText={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Streak Progress */}
        <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200/60 space-y-2 mb-4 translate-z-18">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1 text-slate-700">
              <Flame className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600 animate-pulse" />
              Streak: {streak.currentStreak} / {streak.streakRequiredDays} Days
            </span>
            <span className="text-emerald-700 font-extrabold">{progressPercent}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300 shadow-glow-green"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/50 font-medium">
            <div className="flex items-center gap-1">
              <span className="text-slate-500">Today:</span>
              {streak.todayCompleted ? (
                <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Completed
                </span>
              ) : (
                <span className="text-amber-700 font-bold flex items-center gap-0.5">
                  <Clock className="w-3 h-3 text-amber-500" /> Pending
                </span>
              )}
            </div>

            <span className="text-slate-500 font-semibold">
              {remainingDays > 0 ? `${remainingDays} Days Left` : 'All Days Complete'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions with 3D tactile buttons */}
      <div className="pt-3 border-t border-slate-100 space-y-2 translate-z-24">
        {/* Unlocked */}
        {unlocked ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              type="button"
              className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md btn-3d-emerald flex items-center justify-center gap-1.5 transition"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add with {streak.discountPercentage}% OFF</span>
            </button>
            {associatedProduct && (
              <Link
                to={`/product/${associatedProduct.id}`}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition shadow-xs"
              >
                View
              </Link>
            )}
          </div>
        ) : isCompletedStreak ? (
          /* Ready to Unlock */
          <button
            onClick={handleUnlock}
            type="button"
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md btn-3d-emerald flex items-center justify-center gap-1.5 transition animate-pulse"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Unlock {streak.discountPercentage}% OFF</span>
          </button>
        ) : (
          /* Locked / In Progress */
          <div className="flex items-center gap-2">
            {!streak.todayCompleted && (
              <button
                onClick={handleSimulate}
                type="button"
                className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 shadow-xs flex items-center justify-center gap-1 transition active:scale-98"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Log Today</span>
              </button>
            )}

            {associatedProduct && (
              <Link
                to={`/product/${associatedProduct.id}`}
                className="flex-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 shadow-xs flex items-center justify-center gap-1 transition text-center"
              >
                <span>View Product</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        )}
      </div>
    </TiltCard>
  );
};

