import React from 'react';
import { Activity, ShieldCheck, Tag, ShoppingBag, Award } from 'lucide-react';
import { TiltCard } from '../3d/TiltCard';

export const FitnessImpact: React.FC = () => {
  const pillars = [
    {
      title: 'Move More',
      desc: 'Complete running, walking, cycling, or home workouts regularly.',
      icon: Activity,
      color: 'bg-emerald-50 text-emerald-600',
      shadow: 'group-hover:shadow-3d-emerald',
    },
    {
      title: 'Verify Progress',
      desc: 'Track achievements and milestones with transparent instant progress.',
      icon: ShieldCheck,
      color: 'bg-sky-50 text-sky-600',
      shadow: 'group-hover:shadow-3d-card',
    },
    {
      title: 'Unlock Rewards',
      desc: 'Get exclusive offers of 20% to 40% OFF directly from brands.',
      icon: Tag,
      color: 'bg-amber-50 text-amber-600',
      shadow: 'group-hover:shadow-3d-amber',
    },
    {
      title: 'Shop & Save',
      desc: 'Pay less for products with guaranteed original price preservation.',
      icon: ShoppingBag,
      color: 'bg-purple-50 text-purple-600',
      shadow: 'group-hover:shadow-3d-card',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-40 bg-emerald-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-3d-sm inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            Real Value Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
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
              <TiltCard
                key={p.title}
                maxTilt={8}
                scale={1.03}
                perspective={1000}
                glare={true}
                className="group bg-white/95 backdrop-blur-sm rounded-3xl p-7 border border-slate-200/90 hover:border-emerald-300 shadow-3d-card hover:shadow-3d-card-hover transition-all duration-300 text-center flex flex-col items-center overflow-hidden"
              >
                <div className={`w-16 h-16 rounded-2xl ${p.color} border border-slate-200/80 flex items-center justify-center mb-5 shadow-3d-sm group-hover:scale-110 transition-transform duration-300 translate-z-24 ${p.shadow}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="translate-z-18">
                  <h3 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

