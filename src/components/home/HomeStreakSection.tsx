import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, CheckCircle2, Lock, Sparkles, TrendingUp } from 'lucide-react';
import { products } from '../../data/products';
import { useFitness } from '../../context/FitnessContext';
import { formatINR, calculateDiscountedPrice } from '../../utils/pricing';
import { TiltCard } from '../3d/TiltCard';

export const HomeStreakSection: React.FC = () => {
  const { getStreakChallenge } = useFitness();

  // Pick 3 flagship products with diverse streaks
  const streakProductIds = ['nike-air-max-270', 'stepz-phantom-marathon-elite', 'velocity-aero-cleats'];
  const featuredStreakProducts = streakProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[0] => !!p);

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-slate-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-amber-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-3d-sm flex items-center gap-1.5 w-fit">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>Daily Consistency Rewards</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Keep Your Streak. Unlock Better Prices.
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Complete your daily workout target consecutive days in a row to slash prices by up to 30%. One missed day resets the streak!
            </p>
          </div>
          <Link
            to="/fitness-rewards"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 hover:underline"
          >
            <span>View All Streak Challenges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Streak Challenge Cards with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStreakProducts.map((product) => {
            const streakData = getStreakChallenge(product.id);
            const isUnlocked = streakData.offerUnlocked;
            const discountedPrice = calculateDiscountedPrice(product.originalPrice, streakData.discountPercentage);
            const remainingDays = Math.max(0, streakData.streakRequiredDays - streakData.currentStreak);

            return (
              <TiltCard
                key={product.id}
                maxTilt={7}
                scale={1.02}
                perspective={1000}
                glare={true}
                className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 hover:border-emerald-300 shadow-3d-card hover:shadow-3d-card-hover transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Header Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4 translate-z-24">
                    <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-xs flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {streakData.currentStreak} / {streakData.streakRequiredDays} Days Active
                    </span>

                    <span className="text-xs font-black text-white bg-slate-900 px-3 py-1 rounded-full shadow-xs">
                      {streakData.discountPercentage}% OFF
                    </span>
                  </div>

                  {/* Product Media & Details */}
                  <div className="flex items-center gap-3.5 mb-5 translate-z-18">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0 bg-slate-50 shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block truncate tracking-wider">
                        {product.brand}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 truncate">{product.name}</h4>
                      <div className="text-xs text-slate-500 mt-0.5 font-medium">
                        {streakData.dailyTarget.toLocaleString()} {streakData.targetUnit} / day
                      </div>
                    </div>
                  </div>

                  {/* Streak Progress Bar with 3D Glow */}
                  <div className="space-y-2 mb-5 translate-z-18 bg-slate-50/70 p-3 rounded-2xl border border-slate-200/60">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                      <span>{streakData.completedDays} days completed</span>
                      <span className="text-emerald-700 font-bold">
                        {remainingDays > 0 ? `${remainingDays} days to unlock` : 'Completed!'}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 shadow-glow-green"
                        style={{
                          width: `${Math.min(100, Math.round((streakData.currentStreak / streakData.streakRequiredDays) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Pricing Display */}
                  <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between mb-5 translate-z-24">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                        {isUnlocked ? 'Unlocked Member Price' : 'Price with Streak'}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-slate-900">
                          {formatINR(discountedPrice)}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {formatINR(product.originalPrice)}
                        </span>
                      </div>
                    </div>

                    {isUnlocked ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl shadow-xs">
                        ✓ Unlocked
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-xl">
                        <Lock className="w-3 h-3 text-slate-400" /> Locked
                      </span>
                    )}
                  </div>
                </div>

                <div className="translate-z-32">
                  <Link
                    to={`/product/${product.id}`}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md btn-3d-emerald flex items-center justify-center gap-1.5 transition text-center"
                  >
                    <span>{streakData.currentStreak > 0 ? 'Continue Challenge' : 'Start Challenge'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

