import React from 'react';

export const LoadingSkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm animate-pulse space-y-4">
      <div className="w-full h-52 bg-slate-100 rounded-xl" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-100 rounded w-1/3" />
        <div className="h-5 bg-slate-100 rounded w-3/4" />
        <div className="h-4 bg-slate-100 rounded w-1/2" />
      </div>
      <div className="pt-2 flex justify-between items-center">
        <div className="h-6 bg-slate-100 rounded w-1/4" />
        <div className="h-9 bg-slate-100 rounded-lg w-1/3" />
      </div>
    </div>
  );
};

export const LoadingGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingSkeletonCard key={i} />
      ))}
    </div>
  );
};
