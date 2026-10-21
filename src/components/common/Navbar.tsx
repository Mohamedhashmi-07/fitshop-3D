import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Zap,
  ShoppingBag,
  Heart,
  User as UserIcon,
  LogOut,
  Flame,
  Award,
  Package,
  Menu,
  X,
  ChevronDown,
  Store,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { SearchBar } from './SearchBar';

export const Navbar: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { totals } = useCart();
  const { wishlistIds } = useWishlist();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Shop All', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Brands', path: '/brands' },
    { name: 'Fitness Rewards', path: '/fitness-rewards', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-xl border-b border-slate-200/80 shadow-3d-sm transition-all">
      {/* Top micro bar for SIH Prototype Notice */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white text-[11px] font-medium py-1 px-4 text-center tracking-wide flex items-center justify-between shadow-xs">
        <div className="hidden sm:block">Smart India Hackathon (SIH) Prototype · Move More. Pay Less.</div>
        <div className="mx-auto sm:mx-0 flex items-center gap-3">
          <span className="flex items-center gap-1 font-bold bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
            <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
            Active Streak: {currentUser?.streaks || 0} Days
          </span>
          <span className="text-emerald-300">|</span>
          <Link to="/seller/dashboard" className="text-white hover:text-emerald-100 hover:underline flex items-center gap-1">
            <Store className="w-3 h-3" /> Seller Portal
          </Link>
          <span className="text-emerald-300">|</span>
          <Link to="/admin/dashboard" className="text-white hover:text-emerald-100 hover:underline flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Admin
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Brand Logo & Tagline */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-3d-emerald group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-600 transition">
                FIT<span className="text-emerald-600">SHOP</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 tracking-widest -mt-1">
                MOVE MORE. PAY LESS.
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-all px-3 py-1.5 rounded-full ${
                    link.highlight
                      ? 'text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 shadow-xs flex items-center gap-1.5 hover:scale-105'
                      : isActive
                      ? 'text-emerald-600 font-bold bg-slate-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
                  }`}
                >
                  {link.highlight && <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 animate-pulse" />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Search bar (Center / Desktop) */}
          <div className="hidden md:block flex-1 max-w-xs lg:max-w-sm">
            <SearchBar />
          </div>

          {/* Right Action Icons & User Account */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100/70 rounded-xl transition shadow-xs hover:shadow-sm"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100/70 rounded-xl transition shadow-xs hover:shadow-sm"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totals.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {totals.itemCount}
                </span>
              )}
            </Link>

            {/* User Account / Auth Dropdown */}
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-full border border-slate-200/90 hover:border-emerald-500 hover:bg-slate-50 transition shadow-xs"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <span className="text-xs font-semibold text-slate-800 hidden sm:inline-block max-w-[80px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu with 3D Float Shadow */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-3d-float border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                        <Flame className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                        {currentUser.streaks} Day Streak · {currentUser.rewards} Pts
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" /> Profile & Stats
                    </Link>
                    <Link
                      to="/fitness-rewards"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition"
                    >
                      <Award className="w-4 h-4 text-emerald-600" /> Fitness Rewards
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition"
                    >
                      <Package className="w-4 h-4 text-slate-400" /> My Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition"
                    >
                      <Heart className="w-4 h-4 text-slate-400" /> Wishlist ({wishlistIds.length})
                    </Link>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-xl transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl btn-3d-emerald shadow-sm transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600"
              >
                <span>{link.name}</span>
                {link.highlight && (
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    Save up to 40%
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            <Link
              to="/seller/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-slate-600 flex items-center gap-2 py-1"
            >
              <Store className="w-4 h-4 text-emerald-600" /> Seller Portal
            </Link>
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-slate-600 flex items-center gap-2 py-1"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Admin Console
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
