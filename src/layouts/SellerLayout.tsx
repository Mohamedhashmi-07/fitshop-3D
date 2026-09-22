import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Store,
  LayoutDashboard,
  Package,
  Tag,
  Boxes,
  ShoppingBag,
  TrendingUp,
  ArrowLeft,
  Zap,
} from 'lucide-react';
import { ToastContainer } from '../components/common/Toast';

export const SellerLayout: React.FC = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/seller/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/seller/products', icon: Package },
    { name: 'Fitness Offers', path: '/seller/offers', icon: Tag },
    { name: 'Inventory', path: '/seller/inventory', icon: Boxes },
    { name: 'Orders', path: '/seller/orders', icon: ShoppingBag },
    { name: 'Analytics', path: '/seller/analytics', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Seller Portal Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/seller/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-base text-slate-900">
                    FITSHOP <span className="text-emerald-600 font-semibold text-xs">Seller Hub</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block -mt-0.5 font-medium">
                    Verified Brand Partner: Stepz Footwear
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-xs font-semibold text-slate-600 hover:text-emerald-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Storefront</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Subnav */}
        <div className="border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto py-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400 bg-white">
        FitShop SIH Demo Seller Portal · Stepz Footwear Demo Account
      </footer>

      <ToastContainer />
    </div>
  );
};
