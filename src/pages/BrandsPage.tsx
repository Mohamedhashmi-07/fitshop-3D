import React from 'react';
import { Link } from 'react-router-dom';
import { brands } from '../data/brands';
import { BadgeCheck, ArrowRight } from 'lucide-react';

export const BrandsPage: React.FC = () => {
  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Brand Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Featured & Emerging Brands
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Discover verified direct-to-consumer athletic innovators, powerlifting gear, and clean nutrition specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-sm shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-extrabold text-slate-900 text-base truncate group-hover:text-emerald-600 transition">
                        {brand.name}
                      </h3>
                      {brand.verified && (
                        <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-medium block">
                      {brand.category}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-700 mb-2">
                  {brand.tagline}
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {brand.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">
                  {brand.productCount} Products Active
                </span>
                <Link
                  to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                  className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
                >
                  <span>Explore Brand</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
