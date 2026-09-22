import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Zap, UserPlus } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('Train for 10K & build endurance');
  const [selectedActivity, setSelectedActivity] = useState<string>('Running');
  const [error, setError] = useState('');

  const { signup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const res = signup({
      name: fullName.trim(),
      email: email.trim(),
      password,
      fitnessGoals: fitnessGoal,
      activityPreferences: [selectedActivity],
    });

    if (res.success) {
      addToast({
        type: 'success',
        title: 'Account Created!',
        message: `Welcome to FitShop, ${fullName}! Your fitness rewards account is ready.`,
      });
      navigate('/');
    } else {
      setError(res.error || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 flex flex-col justify-center items-center">
      <div className="max-w-md w-full space-y-6">
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
            Create Your FitShop Account
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Turn your daily workouts and runs into real shopping discounts.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-7 shadow-card space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ananya Sharma"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ananya@example.com"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Primary Fitness Goal
              </label>
              <input
                type="text"
                required
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                placeholder="e.g. Run 100km monthly"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Activity Preference
              </label>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none text-slate-700"
              >
                <option value="Running">Running</option>
                <option value="Walking">Walking & Steps</option>
                <option value="Cycling">Cycling</option>
                <option value="Home Workout">Home Workout & HIIT</option>
                <option value="Gym & Lifting">Gym & Lifting</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account & Start Saving</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-500">Already registered? </span>
            <Link
              to="/login"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
