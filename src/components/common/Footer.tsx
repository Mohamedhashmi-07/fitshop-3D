import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Heart, ShieldCheck, Award, Store } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 text-slate-600 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                FIT<span className="text-emerald-600">SHOP</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm">
              The revolutionary fitness-powered e-commerce ecosystem. Complete verified daily workouts, runs, and walks to unlock real-time shopping discounts from emerging & established brands.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Smart India Hackathon (SIH) Prototype</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/shop" className="hover:text-emerald-600 transition">Shop All Products</Link></li>
              <li><Link to="/categories" className="hover:text-emerald-600 transition">Shop by Category</Link></li>
              <li><Link to="/brands" className="hover:text-emerald-600 transition">Emerging Brands</Link></li>
              <li><Link to="/fitness-rewards" className="hover:text-emerald-600 transition">Fitness Challenges</Link></li>
            </ul>
          </div>

          {/* Customer Support & Portals */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3">Platform Portals</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/seller/dashboard" className="hover:text-emerald-600 transition flex items-center gap-1.5"><Store className="w-3.5 h-3.5 text-emerald-600" /> Seller Portal</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-emerald-600 transition flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Admin Console</Link></li>
              <li><Link to="/profile" className="hover:text-emerald-600 transition">Customer Profile</Link></li>
              <li><Link to="/orders" className="hover:text-emerald-600 transition">Order History</Link></li>
            </ul>
          </div>

          {/* Core SIH Concept */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3">Value Proposition</h4>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="font-bold text-slate-800">"Move More. Pay Less."</div>
              <p className="text-slate-500 text-[11px]">
                Preserves original prices, calculates dynamic fitness discounts, and drives preventive health incentives.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>© {new Date().getFullYear()} FitShop. Built for Smart India Hackathon. All rights reserved.</div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Powered completely on the frontend with React & TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
