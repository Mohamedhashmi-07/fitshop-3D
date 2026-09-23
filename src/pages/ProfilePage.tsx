import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatINR } from '../utils/pricing';
import {
  Flame,
  Award,
  Footprints,
  Compass,
  CheckCircle2,
  Save,
  User as UserIcon,
  Sparkles,
  Trophy,
  Gift,
  Target,
  Coins,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(currentUser?.name || '');
  const [bio, setBio] = useState(currentUser?.profile.bio || '');
  const [location, setLocation] = useState(currentUser?.profile.location || '');
  const [fitnessGoals, setFitnessGoals] = useState(currentUser?.fitnessGoals || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!currentUser) return null;

  // Active / Completed challenges count
  const streakChallengesList = Object.values(currentUser.streakChallenges || {});
  const activeChallengesCount = streakChallengesList.filter(
    (c) => c.challengeStatus === 'in_progress' || c.challengeStatus === 'today_pending' || c.challengeStatus === 'today_completed'
  ).length || 2;
  const completedChallengesCount = streakChallengesList.filter(
    (c) => c.challengeStatus === 'streak_completed' || c.challengeStatus === 'offer_unlocked'
  ).length || currentUser.unlockedOffers?.length || 1;

  const currentStreak = currentUser.streaks ?? 5;
  const bestStreak = currentUser.bestStreak ?? 12;
  const offersUnlockedCount = currentUser.unlockedOffers?.length ?? 4;
  const totalSavings = currentUser.totalSavings ?? 6850;

  if (!currentUser) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      fitnessGoals,
      profile: {
        ...currentUser.profile,
        bio,
        location,
      },
    });
    setIsSaved(true);
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your athlete profile details have been saved to your account.',
    });
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Athlete Profile & Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your personal bio, fitness targets, and review your cumulative FitShop savings.
          </p>
        </div>

        {/* Overview Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-emerald-50 shadow-md"
          />
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-2xl font-extrabold text-slate-900">{currentUser.name}</h2>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-center sm:self-auto">
                Verified FitShop Athlete
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">{currentUser.email}</p>
            <p className="text-xs text-slate-600 max-w-lg">{currentUser.profile.bio}</p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {currentUser.activityPreferences?.map((act) => (
                <span
                  key={act}
                  className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full"
                >
                  {act}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Cumulative Fitness & Streak Stats Grid (Prompt Section 24) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 text-center shadow-card">
            <Flame className="w-5 h-5 text-amber-500 mx-auto mb-1.5 fill-amber-500" />
            <div className="text-xl font-extrabold text-slate-900">{currentStreak} Days</div>
            <span className="text-[11px] text-slate-400 font-medium">Current Streak</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 text-center shadow-card">
            <Trophy className="w-5 h-5 text-purple-600 mx-auto mb-1.5" />
            <div className="text-xl font-extrabold text-slate-900">{bestStreak} Days</div>
            <span className="text-[11px] text-slate-400 font-medium">Best Streak</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 text-center shadow-card">
            <Target className="w-5 h-5 text-indigo-600 mx-auto mb-1.5" />
            <div className="text-xl font-extrabold text-slate-900">{activeChallengesCount}</div>
            <span className="text-[11px] text-slate-400 font-medium">Active Challenges</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 text-center shadow-card">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
            <div className="text-xl font-extrabold text-slate-900">{completedChallengesCount}</div>
            <span className="text-[11px] text-slate-400 font-medium">Completed Challenges</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 text-center shadow-card">
            <Gift className="w-5 h-5 text-rose-500 mx-auto mb-1.5" />
            <div className="text-xl font-extrabold text-slate-900">{offersUnlockedCount}</div>
            <span className="text-[11px] text-slate-400 font-medium">Offers Unlocked</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 text-center shadow-card">
            <Sparkles className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
            <div className="text-xl font-extrabold text-emerald-600">
              {formatINR(totalSavings)}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Total Savings</span>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-6">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Edit Profile Information
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Location (City, Country)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Primary Fitness Target & Goals
                </label>
                <input
                  type="text"
                  value={fitnessGoals}
                  onChange={(e) => setFitnessGoals(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Athlete Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaved ? 'Saved!' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
