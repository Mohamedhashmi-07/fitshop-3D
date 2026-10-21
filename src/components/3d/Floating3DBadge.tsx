import React from 'react';

interface Floating3DBadgeProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  className?: string;
  delay?: string;
  depth?: number;
}

export const Floating3DBadge: React.FC<Floating3DBadgeProps> = ({
  icon,
  label,
  sublabel,
  className = '',
  delay = '0s',
  depth = 24,
}) => {
  return (
    <div
      className={`preserve-3d inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl glass-3d border border-white/80 shadow-3d-card animate-float-3d ${className}`}
      style={{
        animationDelay: delay,
        transform: `translateZ(${depth}px)`,
      }}
    >
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-sm shrink-0">
        {icon}
      </div>
      <div className="text-left">
        <div className="text-xs font-extrabold text-slate-900 leading-tight">{label}</div>
        {sublabel && (
          <div className="text-[10px] font-semibold text-emerald-700">{sublabel}</div>
        )}
      </div>
    </div>
  );
};
