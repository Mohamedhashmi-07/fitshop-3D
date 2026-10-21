import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Footprints, Bike, Dumbbell, Home, ArrowRight, Activity } from 'lucide-react';
import { TiltCard } from '../3d/TiltCard';

export const ActivitySection: React.FC = () => {
  const activities = [
    {
      type: 'Running',
      icon: Flame,
      desc: 'Complete running challenges and unlock product discounts up to 40% OFF.',
      requirement: '5 KM / 15 KM sprints',
      color: 'from-amber-500 to-rose-500',
      tag: '40% Max Discount',
      shadow: 'group-hover:shadow-3d-amber',
    },
    {
      type: 'Walking',
      icon: Footprints,
      desc: 'Log daily step surges (10,000 steps) to save on smart wearables & nutrition.',
      requirement: '10,000 steps daily',
      color: 'from-emerald-500 to-teal-500',
      tag: '25% Off Wearables',
      shadow: 'group-hover:shadow-3d-emerald',
    },
    {
      type: 'Cycling',
      icon: Bike,
      desc: 'Pedal road routes or indoor smart trainers to claim discounts on aero gear.',
      requirement: '20 KM endurance ride',
      color: 'from-sky-500 to-indigo-500',
      tag: '30% Off Cleats',
      shadow: 'group-hover:shadow-3d-card',
    },
    {
      type: 'Home Workout',
      icon: Home,
      desc: 'Smash bodyweight HIIT rounds and yoga flows in your living room.',
      requirement: '45 mins HIIT shred',
      color: 'from-purple-500 to-pink-500',
      tag: '35% Off Dumbbells',
      shadow: 'group-hover:shadow-3d-card',
    },
    {
      type: 'Gym & Lifting',
      icon: Dumbbell,
      desc: 'Log heavy compound sessions to unlock power belts, wraps & iron kettlebells.',
      requirement: '30 mins strength sets',
      color: 'from-slate-700 to-slate-900',
      tag: '20% Off Belts',
      shadow: 'group-hover:shadow-3d-card',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-3d-sm inline-flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            Fitness Discipline Rewarded
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Turn Your Activity Into Savings
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            No matter how you prefer to move, FitShop verifies your effort and turns sweat into real shopping discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <TiltCard
                key={act.type}
                maxTilt={8}
                scale={1.03}
                perspective={1000}
                glare={true}
                className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 hover:border-emerald-300 p-5 shadow-3d-card hover:shadow-3d-card-hover transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 translate-z-24">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${act.color} flex items-center justify-center text-white shadow-3d-sm group-hover:scale-110 transition-transform duration-300 ${act.shadow}`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100/90 border border-slate-200/60 px-2.5 py-1 rounded-full shadow-xs">
                      {act.tag}
                    </span>
                  </div>

                  <div className="translate-z-18">
                    <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                      {act.type}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 leading-relaxed font-normal">
                      {act.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 translate-z-18">
                  <div className="text-[11px] font-semibold text-slate-400 mb-2.5">
                    Target: <span className="text-slate-800 font-bold">{act.requirement}</span>
                  </div>
                  <Link
                    to="/fitness-rewards"
                    className="w-full py-2.5 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl border border-slate-200 hover:border-emerald-600 flex items-center justify-center gap-1.5 transition shadow-xs group-hover:shadow-md"
                  >
                    <span>Explore Challenges</span>
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

