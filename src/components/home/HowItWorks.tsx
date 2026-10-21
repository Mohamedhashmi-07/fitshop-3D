import React from 'react';
import { Search, Tag, Flame, KeyRound, ShoppingBag, ArrowRight } from 'lucide-react';
import { TiltCard } from '../3d/TiltCard';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Browse Products',
      desc: 'Explore thousands of premium products from emerging & established brands.',
      icon: Search,
      glow: 'group-hover:border-emerald-400 group-hover:shadow-glow-green',
    },
    {
      num: '02',
      title: 'Find Fitness Offer',
      desc: 'Check products with active fitness discounts (e.g. 40% OFF for 5 KM running).',
      icon: Tag,
      glow: 'group-hover:border-teal-400 group-hover:shadow-glow-green',
    },
    {
      num: '03',
      title: 'Complete Activity',
      desc: 'Hit your walking, running, cycling, or home workout targets verified live.',
      icon: Flame,
      glow: 'group-hover:border-amber-400 group-hover:shadow-3d-amber',
    },
    {
      num: '04',
      title: 'Unlock Discount',
      desc: 'Click "Unlock Offer" to recalculate prices dynamically in real time.',
      icon: KeyRound,
      glow: 'group-hover:border-emerald-400 group-hover:shadow-glow-green',
    },
    {
      num: '05',
      title: 'Shop & Save',
      desc: 'Add to cart at the discounted rate and enjoy verified fitness savings.',
      icon: ShoppingBag,
      glow: 'group-hover:border-teal-400 group-hover:shadow-glow-green',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50/40 to-white border-b border-slate-100 relative overflow-hidden">
      {/* Subtle depth glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-emerald-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-3d-sm inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Simple 5-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            How FitShop Works
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Bridging health and direct savings. Turn your physical effort into instant shopping discounts.
          </p>
        </div>

        {/* 5-step grid with interactive 3D TiltCards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <TiltCard
                key={step.num}
                maxTilt={8}
                scale={1.03}
                perspective={1000}
                glare={true}
                className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/90 hover:border-emerald-300 shadow-3d-card hover:shadow-3d-card-hover transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
              >
                {/* Step number badge with 3D elevation */}
                <span className="text-[11px] font-black text-slate-400 group-hover:text-emerald-700 mb-3 tracking-widest px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200/60 translate-z-18 transition-colors">
                  STEP {step.num}
                </span>

                {/* 3D Icon container with depth shadow & tilt pop */}
                <div className={`w-16 h-16 rounded-2xl bg-white group-hover:bg-gradient-to-tr group-hover:from-emerald-600 group-hover:to-teal-500 border border-slate-200/90 flex items-center justify-center text-slate-700 group-hover:text-white shadow-3d-sm group-hover:shadow-3d-emerald transition-all duration-300 mb-4 translate-z-32 ${step.glow}`}>
                  <Icon className="w-7 h-7 transition-transform group-hover:scale-110" />
                </div>

                <div className="translate-z-18">
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow connector for large screens (except last) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-30 text-emerald-500 w-7 h-7 rounded-full bg-white border border-emerald-200 shadow-sm items-center justify-center pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

