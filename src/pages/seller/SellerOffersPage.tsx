import React from 'react';
import { products } from '../../data/products';
import { formatINR } from '../../utils/pricing';
import { Tag, Sparkles, Plus, Check } from 'lucide-react';

export const SellerOffersPage: React.FC = () => {
  const brandProducts = products.filter((p) => p.brandId === 'stepz-footwear');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Fitness Campaign Engine
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure fitness criteria and tiered discounts for Stepz Footwear products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brandProducts.map((p) => {
          const disc = p.fitnessOffer.discountPercentage;
          const discounted = p.originalPrice - (p.originalPrice * disc) / 100;
          return (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Active Challenge
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  {disc}% Customer Discount
                </span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{p.name}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Original Price: <strong>{formatINR(p.originalPrice)}</strong>
                  </div>
                  <div className="text-xs text-emerald-700 font-bold">
                    Effective Fitness Price: {formatINR(discounted)}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="text-slate-500 font-semibold block">Activity Requirement:</span>
                <div className="font-bold text-slate-800">
                  {p.fitnessOffer.requirement.description}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">Total Unlocks: 418 Athletes</span>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition"
                >
                  Edit Campaign
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
