import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { ArrowRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Curated Catalogs
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Browse top categories with verified fitness discounts and active reward multipliers.
            </p>
          </div>
          <Link
            to="/categories"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 self-start sm:self-auto hover:underline"
          >
            <span>View All 10 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 p-4 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="relative aspect-video sm:aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
                <span className="text-[10px] font-semibold text-emerald-700 mt-2 block">
                  {cat.productCount} Products · Discounts active
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
