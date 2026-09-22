import React from 'react';
import { Link } from 'react-router-dom';
import { brands } from '../../data/brands';
import { ArrowRight, BadgeCheck } from 'lucide-react';

export const EmergingBrands: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Direct-to-Consumer Innovation
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Discover Emerging Brands
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Find new products, support growing brands, and unlock better prices through activity.
            </p>
          </div>
          <Link
            to="/brands"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 self-start sm:self-auto hover:underline"
          >
            <span>View All 16 Brands</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Brands Grid (Showing top 8 on homepage) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.slice(0, 8).map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-3">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-slate-900 text-sm truncate group-hover:text-emerald-600 transition">
                        {brand.name}
                      </h3>
                      {brand.verified && (
                        <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {brand.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                  {brand.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  {brand.productCount} Active Products
                </span>
                <Link
                  to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
