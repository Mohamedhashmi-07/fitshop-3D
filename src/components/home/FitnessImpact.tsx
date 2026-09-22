import React from 'react';
import { Activity, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export const FitnessImpact: React.FC = () => {
  const pillars = [
    {
      title: 'Move More',
      desc: 'Complete running, walking, cycling, or home workouts regularly.',
      icon: Activity,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Verify Progress',
      desc: 'Track achievements and milestones with transparent instant progress.',
      icon: ShieldCheck,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      title: 'Unlock Rewards',
      desc: 'Get exclusive offers of 20% to 40% OFF directly from brands.',
      icon: Tag,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Shop & Save',
      desc: 'Pay less for products with guaranteed original price preservation.',
      icon: ShoppingBag,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Real Value Ecosystem
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            Your Fitness Has Real-World Value
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Traditional stores reward you for spending more. FitShop rewards you for moving more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 shadow-card hover:shadow-card-hover transition-all text-center flex flex-col items-center"
              >
                <div className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center mb-4 shadow-sm`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
