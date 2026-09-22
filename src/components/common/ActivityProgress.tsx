import React from 'react';
import { PlusCircle, Check } from 'lucide-react';

interface ActivityProgressProps {
  current: number;
  target: number;
  unit: string;
  stepIncrement?: number;
  onSimulate?: () => void;
  showSimulateButton?: boolean;
}

export const ActivityProgress: React.FC<ActivityProgressProps> = ({
  current,
  target,
  unit,
  stepIncrement = 1,
  onSimulate,
  showSimulateButton = true,
}) => {
  const percentage = Math.min(100, Math.round((current / target) * 100));
  const isComplete = current >= target;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>Progress</span>
        <span className={isComplete ? 'text-emerald-700 font-bold' : 'text-slate-700'}>
          {current.toLocaleString()} / {target.toLocaleString()} {unit} ({percentage}%)
        </span>
      </div>

      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isComplete
              ? 'bg-emerald-500'
              : 'bg-gradient-to-r from-emerald-500 to-teal-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showSimulateButton && onSimulate && (
        <div className="pt-1">
          {isComplete ? (
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              <span>Target Achieved (100%)</span>
            </div>
          ) : (
            <button
              onClick={onSimulate}
              type="button"
              className="w-full py-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simulate +{stepIncrement} {unit}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
