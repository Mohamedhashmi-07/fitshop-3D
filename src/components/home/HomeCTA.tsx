import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { Scene3DBackground } from '../3d/Scene3DBackground';

export const HomeCTA: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden">
      {/* 3D Perspective Grid Background */}
      <div className="absolute inset-0 bg-perspective-grid pointer-events-none opacity-60" />

      {/* Floating 3D particles */}
      <Scene3DBackground particleCount={16} />

      {/* Ambient glowing radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-100/50 via-teal-100/30 to-amber-100/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-3d-card p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-3d-sm mb-4">
            <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 animate-pulse" />
            <span>Start Saving Today</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 drop-shadow-xs">
            Move More.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700">
              Pay Less.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
            Start your fitness journey and turn your activity into real shopping rewards. Unlock up to 40% OFF your favorite gear.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl btn-3d-emerald flex items-center justify-center gap-2.5 text-sm"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/fitness-rewards"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border border-slate-200 btn-3d-white flex items-center justify-center gap-2.5 text-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Explore Rewards</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

