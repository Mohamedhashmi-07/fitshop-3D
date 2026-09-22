import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Footprints, Bike, Dumbbell, Home, ArrowRight } from 'lucide-react';

export const ActivitySection: React.FC = () => {
  const activities = [
    {
      type: 'Running',
      icon: Flame,
      desc: 'Complete running challenges and unlock product discounts up to 40% OFF.',
      requirement: '5 KM / 15 KM sprints',
      color: 'from-amber-500 to-rose-500',
      tag: '40% Max Discount',
    },
    {
      type: 'Walking',
      icon: Footprints,
      desc: 'Log daily step surges (10,000 steps) to save on smart wearables & nutrition.',
      requirement: '10,000 steps daily',
      color: 'from-emerald-500 to-teal-500',
      tag: '25% Off Wearables',
    },
    {
      type: 'Cycling',
      icon: Bike,
      desc: 'Pedal road routes or indoor smart trainers to claim discounts on aero gear.',
      requirement: '20 KM endurance ride',
      color: 'from-sky-500 to-indigo-500',
      tag: '30% Off Cleats',
    },
    {
      type: 'Home Workout',
      icon: Home,
      desc: 'Smash bodyweight HIIT rounds and yoga flows in your living room.',
      requirement: '45 mins HIIT shred',
      color: 'from-purple-500 to-pink-500',
      tag: '35% Off Dumbbells',
    },
    {
      type: 'Gym & Lifting',
      icon: Dumbbell,
      desc: 'Log heavy compound sessions to unlock power belts, wraps & iron kettlebells.',
      requirement: '30 mins strength sets',
      color: 'from-slate-700 to-slate-900',
      tag: '20% Off Belts',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Fitness Discipline Rewarded
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
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
              <div
                key={act.type}
                className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${act.color} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {act.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {act.type}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                    {act.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 mb-2">
                    Target: <span className="text-slate-700">{act.requirement}</span>
                  </div>
                  <Link
                    to="/fitness-rewards"
                    className="w-full py-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-bold rounded-xl border border-slate-200 hover:border-emerald-200 flex items-center justify-center gap-1 transition"
                  >
                    <span>Explore Challenges</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
