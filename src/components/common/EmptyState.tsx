import React from 'react';
import { LucideIcon, PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = PackageOpen,
  title,
  description,
  actionText,
  actionLink,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200/80 shadow-sm max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-sm">{description}</p>

      {actionText && (
        actionLink ? (
          <Link
            to={actionLink}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
          >
            {actionText}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
};
