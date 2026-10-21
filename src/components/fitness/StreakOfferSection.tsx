import React, { useState } from 'react';
import {
  Flame,
  CheckCircle2,
  Lock,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Calendar,
  FastForward,
  Play,
  ShoppingBag,
  Bell,
  Clock,
  Zap,
} from 'lucide-react';
import { Product } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import { useCart } from '../../context/CartContext';
import { StreakCalendar } from './StreakCalendar';
import { calculateDiscountedPrice, calculateSavings, formatINR } from '../../utils/pricing';

interface StreakOfferSectionProps {
  product: Product;
}

export const StreakOfferSection: React.FC<StreakOfferSectionProps> = ({ product }) => {
  const {
    getStreakChallenge,
    startStreakChallenge,
    simulateTodayActivity,
    simulateNextDay,
    simulateMissedDay,
    restartStreakChallenge,
    unlockStreakOffer,
    resetStreakChallenge,
  } = useFitness();
  const { addToCart } = useCart();

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const challenge = getStreakChallenge(product.id);
  const status = challenge.challengeStatus;
  const isUnlocked = challenge.offerUnlocked;

  const originalPrice = product.originalPrice;
  const discountPct = challenge.discountPercentage;
  const discountedPrice = calculateDiscountedPrice(originalPrice, discountPct);
  const savingsAmount = calculateSavings(originalPrice, discountedPrice);

  const remainingDays = Math.max(0, challenge.streakRequiredDays - challenge.currentStreak);
  const todayProgressPercent = Math.min(
    100,
    Math.round((challenge.todayProgress / challenge.dailyTarget) * 100)
  );

  // Quick simulate handler
  const handleQuickAdd = () => {
    const remaining = challenge.dailyTarget - challenge.todayProgress;
    const increment = Math.max(
      1,
      challenge.dailyTarget <= 10 ? 1 : challenge.dailyTarget <= 100 ? 10 : 1000
    );
    simulateTodayActivity(product.id, Math.min(remaining, increment));
  };

  const handleCompleteToday = () => {
    simulateTodayActivity(product.id, challenge.dailyTarget);
  };

  const handleResetChallenge = () => {
    resetStreakChallenge(product.id);
    setShowResetConfirm(false);
  };

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-50/60 via-white to-white p-5 sm:p-6 shadow-3d-card space-y-6">
      {/* 1. Header Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-3d-emerald">
            <Flame className="w-5 h-5 fill-amber-300 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black tracking-widest text-emerald-800 uppercase">
                YOUR FITNESS OFFER
              </span>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                Streak Challenge
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              🔥 {challenge.streakRequiredDays}-Day Fitness Streak
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-sm font-black text-white bg-slate-900 px-3 py-1 rounded-xl shadow-sm">
            {discountPct}% OFF
          </span>
          {isUnlocked ? (
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              ✓ Offer Unlocked
            </span>
          ) : status === 'streak_completed' ? (
            <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-xl flex items-center gap-1 animate-pulse">
              🎉 Streak Completed
            </span>
          ) : status === 'streak_reset' ? (
            <span className="text-xs font-extrabold text-rose-800 bg-rose-100 px-3 py-1 rounded-xl flex items-center gap-1">
              ⚠️ Streak Broken
            </span>
          ) : (
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-500" />
              Locked
            </span>
          )}
        </div>
      </div>

      {/* 2. Challenge Goals & Progress Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-white rounded-2xl p-3 border border-slate-200/70 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Daily Target</span>
          <span className="text-sm sm:text-base font-extrabold text-slate-900">
            {challenge.dailyTarget.toLocaleString()} {challenge.targetUnit}
          </span>
          <span className="text-[10px] text-slate-500 block capitalize">{challenge.activityType}</span>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-slate-200/70 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Required Streak</span>
          <span className="text-sm sm:text-base font-extrabold text-slate-900">
            {challenge.streakRequiredDays} Days
          </span>
          <span className="text-[10px] text-slate-500 block">Consecutive</span>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-slate-200/70 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Current Streak</span>
          <span className="text-sm sm:text-base font-extrabold text-emerald-600 flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 fill-emerald-600" />
            {challenge.currentStreak} / {challenge.streakRequiredDays}
          </span>
          <span className="text-[10px] text-slate-500 block">Days active</span>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-slate-200/70 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Remaining</span>
          <span className="text-sm sm:text-base font-extrabold text-amber-600">
            {remainingDays} Days
          </span>
          <span className="text-[10px] text-slate-500 block">To unlock offer</span>
        </div>
      </div>

      {/* 3. Progress Dots (Prompt Section 5) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Streak Milestone Progress</span>
          <span className="text-emerald-700">
            {challenge.currentStreak} of {challenge.streakRequiredDays} Days Complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 shadow-sm"
            style={{
              width: `${Math.min(100, Math.round((challenge.currentStreak / challenge.streakRequiredDays) * 100))}%`,
            }}
          />
        </div>

        {/* Dots Representation: ● ● ● ○ ○ ○ */}
        <div className="flex items-center justify-between pt-1">
          {Array.from({ length: challenge.streakRequiredDays }, (_, i) => i + 1).map((d) => (
            <div key={d} className="flex flex-col items-center">
              <span
                className={`text-sm ${
                  d <= challenge.completedDays
                    ? 'text-emerald-600 font-black'
                    : 'text-slate-300'
                }`}
              >
                ●
              </span>
              <span className="text-[9px] font-semibold text-slate-400">
                Day {d} {d <= challenge.completedDays ? '✓' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Responsive 7-Day Calendar Widget */}
      <StreakCalendar
        streakRequiredDays={challenge.streakRequiredDays}
        currentStreak={challenge.currentStreak}
        completedDays={challenge.completedDays}
        challengeStatus={status}
        todayCompleted={challenge.todayCompleted}
      />

      {/* 5. Today's Activity Box (Prompt Section 7) */}
      {status !== 'not_started' && status !== 'streak_reset' && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Today's Target: {challenge.dailyTarget.toLocaleString()} {challenge.targetUnit}
              </span>
              <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">
                {challenge.todayProgress.toLocaleString()} / {challenge.dailyTarget.toLocaleString()}{' '}
                {challenge.targetUnit}
              </h4>
            </div>

            {challenge.todayCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ✓ Today's Target Completed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                ⏳ Today's Activity Pending
              </span>
            )}
          </div>

          {/* Today's sub-progress bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                challenge.todayCompleted ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${todayProgressPercent}%` }}
            />
          </div>

          {/* Quick simulation buttons for today */}
          {!challenge.todayCompleted && status !== 'streak_completed' && !isUnlocked && (
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={handleQuickAdd}
                className="flex-1 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  Log +
                  {challenge.dailyTarget <= 10 ? 1 : challenge.dailyTarget <= 100 ? 10 : 1000}{' '}
                  {challenge.targetUnit}
                </span>
              </button>
              <button
                type="button"
                onClick={handleCompleteToday}
                className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Complete Today's Target</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 6. Contextual Reminders (Section 11, 22) */}
      {status === 'today_pending' && !challenge.todayCompleted && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <Bell className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>🔔 Reminder:</strong> Complete your daily target of {challenge.dailyTarget.toLocaleString()} {challenge.targetUnit} today to keep your {challenge.currentStreak}-day streak alive!
            {remainingDays > 0 && <span className="block mt-0.5 text-amber-700 font-semibold">{remainingDays} more consecutive days to unlock your {discountPct}% discount.</span>}
          </div>
        </div>
      )}

      {status === 'today_completed' && !isUnlocked && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong>✓ Great job!</strong> Today's target is complete and your streak is safe! Return tomorrow to continue your streak towards {discountPct}% OFF.
          </div>
        </div>
      )}

      {/* 7. Streak Broken State (Section 9, 21) */}
      {status === 'streak_reset' && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-3">
          <div className="flex items-start gap-2.5 text-rose-900">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-extrabold text-sm text-rose-800">⚠️ Streak Broken</h5>
              <p className="mt-1 text-slate-700">
                You completed {challenge.previousStreak || 0} days, but a required day was missed. Your {challenge.streakRequiredDays}-day streak has been reset to <strong>0 / {challenge.streakRequiredDays} Days</strong>.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => restartStreakChallenge(product.id)}
            className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition text-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start Again (Restart from Day 1)</span>
          </button>
        </div>
      )}

      {/* 8. Streak Completed & Ready to Unlock State (Section 14, 15) */}
      {status === 'streak_completed' && !isUnlocked && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 border-2 border-emerald-400 shadow-sm space-y-3 text-center">
          <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-700 mb-1">
            <Sparkles className="w-6 h-6 animate-spin text-emerald-600" />
          </div>
          <h4 className="text-base sm:text-lg font-black text-slate-900">
            🎉 {challenge.streakRequiredDays}-DAY STREAK COMPLETED!
          </h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            You completed all {challenge.streakRequiredDays} consecutive days of {challenge.dailyTarget.toLocaleString()} {challenge.targetUnit}. Your <strong>{discountPct}% OFF</strong> fitness reward is ready to unlock!
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => unlockStreakOffer(product.id)}
              className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition animate-bounce"
            >
              <Sparkles className="w-4 h-4" />
              <span>Unlock {discountPct}% OFF</span>
            </button>
          </div>
        </div>
      )}

      {/* 9. Offer Unlocked State (Section 15, 16) */}
      {isUnlocked && (
        <div className="p-5 rounded-2xl bg-emerald-600 text-white shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-200" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-100">
                ✓ {discountPct}% FITNESS OFFER UNLOCKED
              </span>
            </div>
            <span className="text-xs font-extrabold bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30">
              Verified Athlete
            </span>
          </div>

          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {formatINR(discountedPrice)}
            </span>
            <span className="text-sm font-semibold line-through text-emerald-200">
              {formatINR(originalPrice)}
            </span>
            <span className="text-xs font-bold text-amber-300 ml-auto">
              Save {formatINR(savingsAmount)}
            </span>
          </div>

          <p className="text-xs text-emerald-100">
            Your discounted price of {formatINR(discountedPrice)} will automatically apply in your cart and during checkout.
          </p>

          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-emerald-800 font-extrabold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition mt-2"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
            <span>Add to Cart with {discountPct}% Savings</span>
          </button>
        </div>
      )}

      {/* 10. Initial Not-Started State */}
      {status === 'not_started' && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => startStreakChallenge(product.id)}
            className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start {challenge.streakRequiredDays}-Day Streak Challenge</span>
          </button>
        </div>
      )}

      {/* 11. Warning Notice (Section 10) */}
      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>⚠️ Keep your streak alive:</strong> Complete your daily target for {challenge.streakRequiredDays} consecutive days before each day ends. Missing one day will reset your progress to 0!
        </div>
      </div>

      {/* 12. DEMO SIMULATION TOOLBAR (Prompt Sections 27, 28, 29) */}
      <div className="pt-4 border-t border-slate-200/70 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
              DEMO SIMULATION MODE
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Smart India Hackathon Testing</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Simulation 1: Complete Today's Activity */}
          <button
            type="button"
            onClick={() => simulateTodayActivity(product.id, challenge.dailyTarget)}
            disabled={challenge.todayCompleted || isUnlocked}
            className="py-2 px-2.5 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-[11px] font-bold rounded-xl border border-slate-200 hover:border-indigo-300 shadow-xs flex items-center justify-center gap-1 transition disabled:opacity-40"
            title="Completes today's remaining target in one click"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Simulate Today</span>
          </button>

          {/* Simulation 2: Simulate Next Day */}
          <button
            type="button"
            onClick={() => simulateNextDay(product.id)}
            disabled={isUnlocked}
            className="py-2 px-2.5 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-[11px] font-bold rounded-xl border border-slate-200 hover:border-indigo-300 shadow-xs flex items-center justify-center gap-1 transition disabled:opacity-40"
            title="Advances virtual date to next day"
          >
            <FastForward className="w-3.5 h-3.5 text-indigo-600" />
            <span>Simulate Next Day</span>
          </button>

          {/* Simulation 3: Simulate Missed Day (Streak Broken) */}
          <button
            type="button"
            onClick={() => simulateMissedDay(product.id)}
            disabled={isUnlocked}
            className="py-2 px-2.5 bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-[11px] font-bold rounded-xl border border-slate-200 hover:border-rose-300 shadow-xs flex items-center justify-center gap-1 transition disabled:opacity-40"
            title="Simulates skipping a day to test streak reset"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>Miss Day (Break)</span>
          </button>

          {/* Simulation 4: Reset Demo Challenge */}
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="py-2 px-2.5 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-bold rounded-xl border border-slate-200 shadow-xs flex items-center justify-center gap-1 transition"
            title="Reset this challenge for a fresh test run"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* Confirmation Modal/Bar for Reset */}
        {showResetConfirm && (
          <div className="p-3 bg-slate-900 text-white rounded-xl text-xs flex items-center justify-between gap-3 animate-fadeIn">
            <span>Reset this demo challenge back to Day 1?</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetChallenge}
                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[11px]"
              >
                Yes, Reset
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-lg text-[11px]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
