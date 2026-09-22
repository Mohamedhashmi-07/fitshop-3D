import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, CheckCircle2, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { formatINR } from '../../utils/pricing';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      {/* Subtle light ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>India's 1st Fitness-Powered Commerce Engine</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Move More. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Pay Less.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Complete verified fitness activities, unlock exclusive product discounts, and shop from emerging & established brands you discover.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center justify-center gap-2 transition transform active:scale-98"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/fitness-rewards"
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition"
              >
                <Flame className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Explore Fitness Rewards</span>
              </Link>
            </div>

            {/* Micro Trust Stats */}
            <div className="pt-6 border-t border-slate-200/60 flex items-center justify-center lg:justify-start gap-8 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Activities</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Zero Backend Needed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instant Dynamic Prices</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Interactive Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative accent card backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-3xl transform rotate-2 scale-102 opacity-20 blur-sm" />

              {/* Main Showcase Card */}
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-5">
                {/* Header row */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Live Offer Demonstration
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    40% OFF
                  </span>
                </div>

                {/* Combined Product Preview */}
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"
                    alt="Stepz Phantom Marathon Elite"
                    className="w-24 h-24 object-cover rounded-2xl border border-slate-100 shadow-sm"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Stepz Footwear
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                      Stepz Phantom Marathon Elite
                    </h3>
                    <div className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <span>Carbon Plate Propulsion</span>
                    </div>
                  </div>
                </div>

                {/* Fitness Activity Requirement & Completed Status */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <Flame className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">5 KM RUN CHALLENGE</div>
                        <div className="text-[11px] text-slate-500">Outdoor GPS Verified</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  </div>

                  {/* Progress bar (100%) */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-full" />
                  </div>
                </div>

                {/* Price Transformation Showcase */}
                <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      Original Price
                    </span>
                    <span className="text-sm font-bold text-slate-400 line-through">
                      ₹10,999
                    </span>
                  </div>

                  <div className="text-emerald-500 font-bold text-lg">↓</div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold text-emerald-800 block">
                      Discounted Price
                    </span>
                    <span className="text-2xl font-extrabold text-emerald-700">
                      ₹6,599.40
                    </span>
                  </div>
                </div>

                {/* Action button */}
                <Link
                  to="/product/stepz-phantom-marathon-elite"
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                >
                  <span>Experience Dynamic Price Unlock</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
