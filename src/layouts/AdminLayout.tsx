import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, BarChart3, Users, Store, Tag } from 'lucide-react';
import { ToastContainer } from '../components/common/Toast';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="font-extrabold text-base text-slate-900">
                  FITSHOP <span className="text-slate-500 font-medium text-xs">Admin Console</span>
                </span>
                <span className="text-[10px] text-slate-400 block -mt-0.5">
                  Platform Oversight · Smart India Hackathon Demo
                </span>
              </div>
            </div>

            <Link
              to="/"
              className="text-xs font-semibold text-slate-600 hover:text-emerald-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400 bg-white">
        FitShop SIH Demo Admin Console · Frontend Mock Prototype
      </footer>

      <ToastContainer />
    </div>
  );
};
