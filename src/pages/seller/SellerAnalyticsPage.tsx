import React from 'react';
import { formatINR } from '../../utils/pricing';
import { TrendingUp, Users, Award, DollarSign, Activity } from 'lucide-react';

export const SellerAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Brand Conversion & Fitness Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Measure how fitness challenges increase customer acquisition and brand loyalty.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Brand Revenue</span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{formatINR(384500)}</div>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">
            ↑ 34% vs standard retail
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Fitness Challenge Starts</span>
            <Activity className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">2,890</div>
          <span className="text-[11px] font-bold text-slate-500 mt-1 block">
            78% completion rate
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Discount Unlocks</span>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">2,254</div>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">
            64% converted into cart checkout
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Customer Lifetime Value</span>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{formatINR(12400)}</div>
          <span className="text-[11px] font-bold text-purple-600 mt-1 block">
            High repeat purchase rate
          </span>
        </div>
      </div>

      {/* Analytics Breakdown Visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900">
            Top Performing Fitness Campaigns
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>5 KM Running · Stepz Phantom Marathon Elite (40% OFF)</span>
                <span className="text-emerald-700">1,240 Unlocks</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[85%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>15 KM Endurance · Stepz Trail Master (25% OFF)</span>
                <span className="text-emerald-700">620 Unlocks</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[45%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>5 KM Recovery Habit · Stepz Recovery Slides (30% OFF)</span>
                <span className="text-emerald-700">394 Unlocks</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[30%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900">
            Customer Demographics & Channels
          </h3>
          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
              <span>Marathon Trainees & Road Runners</span>
              <span className="font-bold text-slate-800">54%</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
              <span>Cross-Training & Gym Athletes</span>
              <span className="font-bold text-slate-800">28%</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
              <span>Weekend Outdoor Enthusiasts</span>
              <span className="font-bold text-slate-800">18%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
