import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { challenges } from '../data/challenges';
import { FitnessChallengeCard } from '../components/fitness/FitnessChallengeCard';
import {
  Flame,
  Footprints,
  Compass,
  Award,
  Sparkles,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { formatINR } from '../utils/pricing';

export const FitnessRewardsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('all');

  // Metrics from current user
  const streak = currentUser?.streaks ?? 4;
  const totalSteps = currentUser?.totalSteps ?? 78020;
  const totalDistance = currentUser?.totalDistanceKm ?? 60.5;
  const rewardPoints = currentUser?.rewards ?? 1938;
  const totalSavings = currentUser?.totalSavings ?? 0;
  const unlockedCount = currentUser?.unlockedOffers?.length ?? 0;

  const tabs = [
    { id: 'all', label: 'All Challenges' },
    { id: 'running', label: 'Running' },
    { id: 'walking', label: 'Steps & Walking' },
    { id: 'cycling', label: 'Cycling' },
    { id: 'gym', label: 'Gym & Lifting' },
  ];

  const filteredChallenges = challenges.filter((c) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'walking') return c.activityType === 'walking';
    if (activeTab === 'running') return c.activityType === 'running';
    if (activeTab === 'cycling') return c.activityType === 'cycling';
    if (activeTab === 'gym') return c.activityType === 'gym' || c.activityType === 'workout';
    return true;
  });

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Activity Verification Dashboard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Fitness Rewards & Challenges
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Log your workouts, verify milestones, and unlock exclusive discounts up to 40% OFF.
          </p>
        </div>

        {/* 4 Stat Cards (as specified in Section 25) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* 1. Streak */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Active Streak</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                <Flame className="w-5 h-5 fill-amber-500" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{streak} Days</div>
            <span className="text-xs font-semibold text-emerald-700 mt-1 block">
              🔥 On a roll! Consistent workouts
            </span>
          </div>

          {/* 2. Total Steps */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Total Steps</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Footprints className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">
              {totalSteps.toLocaleString()}
            </div>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">
              Daily average ~9,200 steps
            </span>
          </div>

          {/* 3. Distance */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Total Distance</span>
              <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                <Compass className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">
              {totalDistance} KM
            </div>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">
              Running, cycling & trail hikes
            </span>
          </div>

          {/* 4. Reward Points */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Reward Points</span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">
              {rewardPoints.toLocaleString()}
            </div>
            <span className="text-xs font-semibold text-emerald-700 mt-1 block">
              {unlockedCount} Offers Unlocked
            </span>
          </div>
        </div>

        {/* Secondary Savings & Verified Banner */}
        <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Real-World Fitness Savings Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold">
              Total Shopping Savings Generated: {formatINR(totalSavings)}
            </h2>
            <p className="text-xs text-emerald-100 max-w-xl">
              Every kilometer you run and step you take directly reduces product prices. Keep moving to unlock higher tiers!
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-center border border-white/20 self-stretch sm:self-auto">
            <span className="text-xs text-emerald-100 block">Unlocked Tiers</span>
            <span className="text-xl font-extrabold">{unlockedCount} Brands</span>
          </div>
        </div>

        {/* Activity Tabs */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2.5 px-4 text-xs font-bold rounded-xl transition shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <FitnessChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
