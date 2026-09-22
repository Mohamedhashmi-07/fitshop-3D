import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Zap, LogIn, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 flex flex-col justify-center items-center">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm">
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
        <div className="bg-white rounded-3xl border border-slate-200/80 p-7 shadow-card space-y-5">
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
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
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
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition"
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
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-center transition group"
              >
                <span className="font-bold text-xs text-slate-800 group-hover:text-emerald-700 block">
                  Mohamed
                </span>
                <span className="text-[10px] text-slate-400 block">4D Streak</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoUser('rahul@fitshop.com', '123456')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-center transition group"
              >
                <span className="font-bold text-xs text-slate-800 group-hover:text-emerald-700 block">
                  Rahul
                </span>
                <span className="text-[10px] text-slate-400 block">Fresh Data</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoUser('priya@fitshop.com', '123456')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-center transition group"
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
