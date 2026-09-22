import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store, ArrowRight } from 'lucide-react';

export const SellerLoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleDemoSellerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/seller/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-8 shadow-card text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mx-auto shadow-md">
          <Store className="w-7 h-7" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Seller Portal Login</h1>
          <p className="text-xs text-slate-500 mt-1">
            Access the brand merchant hub for Stepz Footwear partner account.
          </p>
        </div>

        <form onSubmit={handleDemoSellerLogin} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Brand Email</label>
            <input
              type="email"
              defaultValue="partner@stepzfootwear.com"
              readOnly
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Access Token</label>
            <input
              type="password"
              defaultValue="demo123456"
              readOnly
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition"
          >
            <span>Enter Demo Seller Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2">
          <Link to="/" className="text-xs text-slate-400 hover:text-emerald-600">
            ← Return to Consumer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};
