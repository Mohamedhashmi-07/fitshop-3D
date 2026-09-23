import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFitness } from '../context/FitnessContext';
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
  Bell,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import { formatINR } from '../utils/pricing';

export const FitnessRewardsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getStreakChallenge } = useFitness();
  const [activeTab, setActiveTab] = useState<string>('all');

  // Metrics matching Prompt Section 19
  const currentStreak = currentUser?.streaks ?? 5;
  const bestStreak = currentUser?.bestStreak ?? 12;
  const totalSteps = currentUser?.totalSteps ?? 78020;
  const totalDistance = currentUser?.totalDistanceKm ?? 60.5;
  const rewardPoints = currentUser?.rewards ?? 1938;
  const totalSavings = currentUser?.totalSavings ?? 0;
  const unlockedCount = currentUser?.unlockedOffers?.length ?? 0;

  // Nike Air Max 270 streak status for reminders
  const nikeStreak = getStreakChallenge('nike-air-max-270');

  const tabs = [
    { id: 'all', label: 'All Challenges' },
    { id: 'walking', label: 'Steps & Walking' },
    { id: 'running', label: 'Running' },
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
            <span>Streak-Based Fitness Challenges & Rewards</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Fitness Rewards Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Build consecutive daily fitness habits to unlock up to 30% OFF high-performance athletic gear.
          </p>
        </div>

        {/* Dynamic Reminder Alert Banner (Prompt Section 11, 22) */}
        {!nikeStreak.todayCompleted && nikeStreak.currentStreak > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bell className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-extrabold block text-sm text-amber-900">🔔 Don't Break Your Streak!</span>
                <span>
                  Your {nikeStreak.streakRequiredDays}-day Nike challenge is waiting. Complete <strong>{nikeStreak.dailyTarget.toLocaleString()} {nikeStreak.targetUnit}</strong> today to keep your {nikeStreak.currentStreak}-day streak alive!
                </span>
              </div>
            </div>
            <Link
              to="/product/nike-air-max-270"
              className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs shrink-0 transition"
            >
              Continue Challenge
            </Link>
          </div>
        )}

        {nikeStreak.todayCompleted && !nikeStreak.offerUnlocked && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 text-emerald-950 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-extrabold block text-sm text-emerald-900">✓ Great job! Today's Target Completed</span>
                <span>Your daily target is verified and your streak is safe! Return tomorrow to keep climbing.</span>
              </div>
            </div>
            <Link
              to="/product/nike-air-max-270"
              className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs shrink-0 transition"
            >
              View Progress
            </Link>
          </div>
        )}

        {/* 5 Stat Cards (Prompt Section 19) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. Current Streak */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Current Streak</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                <Flame className="w-4 h-4 fill-amber-500" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{currentStreak} Days</div>
            <span className="text-[11px] font-semibold text-emerald-700 mt-1 block">
              Active consecutive days
            </span>
          </div>

          {/* 2. Best Streak */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Best Streak</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Trophy className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{bestStreak} Days</div>
            <span className="text-[11px] font-semibold text-purple-700 mt-1 block">
              Personal record streak
            </span>
          </div>

          {/* 3. Total Steps */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Steps</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Footprints className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalSteps.toLocaleString()}
            </div>
            <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
              Daily verified steps
            </span>
          </div>

          {/* 4. Distance */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Distance</span>
              <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalDistance} KM
            </div>
            <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
              Running & cycling
            </span>
          </div>

          {/* 5. Reward Points */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Reward Points</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {rewardPoints.toLocaleString()}
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 mt-1 block">
              {unlockedCount} Offers Unlocked
            </span>
          </div>
        </div>

        {/* Secondary Savings & Verified Banner */}
        <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Real-World Fitness Savings Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold">
              Total Shopping Savings Generated: {formatINR(totalSavings)}
            </h2>
            <p className="text-xs text-emerald-100 max-w-xl">
              Consistent daily movement protects your streak and directly unlocks exclusive prices across top footwear, apparel, and wearables.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl text-center border border-white/20 self-stretch sm:self-auto">
            <span className="text-xs text-emerald-100 block">Unlocked Tiers</span>
            <span className="text-xl font-extrabold">{unlockedCount} Offers</span>
          </div>
        </div>

        {/* Activity Tabs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900">Active Challenges</h3>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl transition shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
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
