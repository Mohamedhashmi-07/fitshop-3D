import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Zap, LogIn, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

import { Scene3DBackground } from '../components/3d/Scene3DBackground';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = login(email, password);
    if (res.success) {
      addToast({
        type: 'success',
        title: 'Logged In Successfully',
        message: `Welcome back to FitShop!`,
      });
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleSelectDemoUser = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="relative min-h-screen bg-slate-50/80 py-12 px-4 flex flex-col justify-center items-center overflow-hidden">
      {/* 3D ambient particle background */}
      <Scene3DBackground particleCount={16} interactive={false} />
      <div className="absolute inset-0 bg-perspective-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-3d-emerald transform group-hover:scale-105 group-hover:rotate-3 transition duration-300">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              FIT<span className="text-emerald-600">SHOP</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back to FitShop
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Log in to continue your fitness-powered shopping journey.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 p-7 shadow-3d-card space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@fitshop.com"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:shadow-sm outline-none transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Password
                </label>
                <span className="text-[11px] text-slate-400">Demo password: 123456</span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:shadow-sm outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 btn-3d-emerald text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          </form>

          {/* Quick Demo Fill Buttons (from Section 19) */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 text-center">
              Click to Auto-Fill Demo Accounts
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSelectDemoUser('mohamed@fitshop.com', '123456')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 hover:shadow-3d-sm text-center transition group transform hover:-translate-y-0.5"
              >
                <span className="font-bold text-xs text-slate-800 group-hover:text-emerald-700 block">
                  Mohamed
                </span>
                <span className="text-[10px] text-slate-400 block">4D Streak</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoUser('rahul@fitshop.com', '123456')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 hover:shadow-3d-sm text-center transition group transform hover:-translate-y-0.5"
              >
                <span className="font-bold text-xs text-slate-800 group-hover:text-emerald-700 block">
                  Rahul
                </span>
                <span className="text-[10px] text-slate-400 block">Fresh Data</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoUser('priya@fitshop.com', '123456')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 hover:shadow-3d-sm text-center transition group transform hover:-translate-y-0.5"
              >
                <span className="font-bold text-xs text-slate-800 group-hover:text-emerald-700 block">
                  Priya
                </span>
                <span className="text-[10px] text-slate-400 block">Yoga/Cycle</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-500">Don't have an account? </span>
            <Link
              to="/signup"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
