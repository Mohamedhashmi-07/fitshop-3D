import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Tag,
  Boxes,
  TrendingUp,
  ArrowRight,
  PlusCircle,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { products } from '../../data/products';
import { formatINR } from '../../utils/pricing';
import { TiltCard } from '../../components/3d/TiltCard';

export const SellerDashboardPage: React.FC = () => {
  const brandProducts = products.filter((p) => p.brandId === 'stepz-footwear');

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 p-6 shadow-3d-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 shadow-3d-sm">
            Brand Merchant Console
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Stepz Footwear · Seller Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure fitness discount campaigns, monitor inventory, and review real-time orders.
          </p>
        </div>

        <Link
          to="/seller/products"
          className="px-4 py-2.5 btn-3d-emerald text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Fitness Product</span>
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <TiltCard maxTilt={8} scale={1.03}>
          <div className="bg-white/95 rounded-2xl border border-slate-200/90 p-5 shadow-3d-card h-full">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Active Products</span>
            <div className="text-2xl font-extrabold text-slate-900">{brandProducts.length}</div>
            <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
              4 Linked to Fitness Offers
            </span>
          </div>
        </TiltCard>

        <TiltCard maxTilt={8} scale={1.03}>
          <div className="bg-white/95 rounded-2xl border border-slate-200/90 p-5 shadow-3d-card h-full">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Flagship Offer Discount</span>
            <div className="text-2xl font-extrabold text-emerald-600">40% OFF</div>
            <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
              Stepz Phantom Marathon Elite
            </span>
          </div>
        </TiltCard>

        <TiltCard maxTilt={8} scale={1.03}>
          <div className="bg-white/95 rounded-2xl border border-slate-200/90 p-5 shadow-3d-card h-full">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Total Month Sales</span>
            <div className="text-2xl font-extrabold text-slate-900">{formatINR(384500)}</div>
            <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
              +28% conversion lift via FitShop
            </span>
          </div>
        </TiltCard>

        <TiltCard maxTilt={8} scale={1.03}>
          <div className="bg-white/95 rounded-2xl border border-slate-200/90 p-5 shadow-3d-card h-full">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Verified Athletes Reached</span>
            <div className="text-2xl font-extrabold text-slate-900">1,420</div>
            <span className="text-[11px] font-semibold text-purple-600 mt-1 block">
              Direct marathon runner discovery
            </span>
          </div>
        </TiltCard>
      </div>

      {/* Flagship Product Showcase */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h2 className="font-extrabold text-slate-900 text-sm">
              Current Active Fitness Campaigns
            </h2>
          </div>
          <Link
            to="/seller/offers"
            className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
          >
            <span>Manage All Campaigns</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {brandProducts.map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">{p.name}</h3>
                  <span className="text-[11px] text-slate-500">
                    Retail: {formatINR(p.originalPrice)} · Requirement: {p.fitnessOffer.requirement.description}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {p.fitnessOffer.discountPercentage}% OFF Active
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Stock: {p.stock}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
