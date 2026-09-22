import React from 'react';
import { Search, Tag, Flame, KeyRound, ShoppingBag, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Browse Products',
      desc: 'Explore thousands of premium products from emerging & established brands.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Find Fitness Offer',
      desc: 'Check products with active fitness discounts (e.g. 40% OFF for 5 KM running).',
      icon: Tag,
    },
    {
      num: '03',
      title: 'Complete Activity',
      desc: 'Hit your walking, running, cycling, or home workout targets verified live.',
      icon: Flame,
    },
    {
      num: '04',
      title: 'Unlock Discount',
      desc: 'Click "Unlock Offer" to recalculate prices dynamically in real time.',
      icon: KeyRound,
    },
    {
      num: '05',
      title: 'Shop & Save',
      desc: 'Add to cart at the discounted rate and enjoy verified fitness savings.',
      icon: ShoppingBag,
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Simple 5-Step Process
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            How FitShop Works
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Bridging health and direct savings. Turn your physical effort into instant shopping discounts.
          </p>
        </div>

        {/* 5-step grid with connecting line visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Step number badge */}
                <span className="text-[11px] font-extrabold text-slate-400 group-hover:text-emerald-600 mb-3 tracking-wider">
                  STEP {step.num}
                </span>

                {/* Icon container */}
                <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-emerald-600 border border-slate-200/80 group-hover:border-emerald-600 flex items-center justify-center text-slate-700 group-hover:text-white shadow-sm transition-all duration-300 mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>

                {/* Arrow connector for large screens (except last) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
