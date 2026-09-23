import React from 'react';
import { Check, AlertCircle, Circle } from 'lucide-react';
import { StreakChallengeStatus } from '../../types';

interface StreakCalendarProps {
  streakRequiredDays: number;
  currentStreak: number;
  completedDays: number;
  challengeStatus: StreakChallengeStatus;
  todayCompleted: boolean;
}

export const StreakCalendar: React.FC<StreakCalendarProps> = ({
  streakRequiredDays = 7,
  currentStreak = 0,
  completedDays = 0,
  challengeStatus,
  todayCompleted,
}) => {
  // Generate day slots 1 to streakRequiredDays
  const days = Array.from({ length: streakRequiredDays }, (_, i) => i + 1);

  // Day names for 7-day streaks (Mon-Sun) or generic "Day X"
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const isBroken = challengeStatus === 'streak_reset';

  return (
    <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80">
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <span>{streakRequiredDays}-Day Streak Tracker</span>
        </span>
        <span className="font-bold text-slate-500">
          Completed: <strong className="text-emerald-700">{completedDays}</strong> / {streakRequiredDays} Days
        </span>
      </div>

      {/* Grid of days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((dayNum, idx) => {
          const isCompleted = dayNum <= completedDays;
          const isCurrentActiveDay =
            !isCompleted &&
            (dayNum === completedDays + 1 || (dayNum === 1 && completedDays === 0));

          let bgClasses = 'bg-white border-slate-200 text-slate-400';
          let icon = <Circle className="w-3.5 h-3.5 text-slate-300" />;

          if (isBroken && dayNum === completedDays + 1) {
            bgClasses = 'bg-rose-50 border-rose-300 text-rose-600 ring-2 ring-rose-200';
            icon = <AlertCircle className="w-4 h-4 text-rose-600" />;
          } else if (isCompleted) {
            bgClasses = 'bg-emerald-500 border-emerald-600 text-white shadow-sm';
            icon = <Check className="w-4 h-4 text-white stroke-[3]" />;
          } else if (isCurrentActiveDay && challengeStatus !== 'not_started') {
            if (todayCompleted) {
              bgClasses = 'bg-emerald-500 border-emerald-600 text-white shadow-sm';
              icon = <Check className="w-4 h-4 text-white stroke-[3]" />;
            } else {
              bgClasses = 'bg-amber-50 border-amber-300 text-amber-700 ring-2 ring-amber-200/70 animate-pulse';
              icon = <span className="text-[11px] font-extrabold text-amber-700">TODAY</span>;
            }
          }

          const label = streakRequiredDays === 7 ? dayLabels[idx] : `D${dayNum}`;

          return (
            <div
              key={dayNum}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border transition-all text-center ${bgClasses}`}
            >
              <span className={`text-[10px] font-bold uppercase mb-1 ${isCompleted ? 'text-emerald-100' : 'text-slate-400'}`}>
                {label}
              </span>
              <div className="flex items-center justify-center h-5">
                {icon}
              </div>
              <span className={`text-[9px] font-semibold mt-1 ${isCompleted ? 'text-white/90' : 'text-slate-400'}`}>
                Day {dayNum}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend / Helper */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2.5 border-t border-slate-200/60">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span>✓ Completed</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-white border border-slate-300 inline-block"></span>
            <span>○ Upcoming</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span>! Missed / Reset</span>
          </span>
        </div>
      </div>
    </div>
  );
};
