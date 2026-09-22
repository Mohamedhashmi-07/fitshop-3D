import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';

export const HomeCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-4">
          <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
          <span>Start Saving Today</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Move More. Pay Less.
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
          Start your fitness journey and turn your activity into real shopping rewards. Unlock up to 40% OFF your favorite gear.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/fitness-rewards"
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition"
          >
            <span>Explore Rewards</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
