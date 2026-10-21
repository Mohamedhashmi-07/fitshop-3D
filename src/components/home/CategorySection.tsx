import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { ArrowRight, Layers } from 'lucide-react';
import { TiltCard } from '../3d/TiltCard';

export const CategorySection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50/70 border-b border-slate-100 relative overflow-hidden">
      {/* Background depth aura */}
      <div className="absolute -top-24 right-10 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-3d-sm inline-flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              Curated Catalogs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
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

        {/* Categories 3D Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <TiltCard
              key={cat.id}
              maxTilt={8}
              scale={1.03}
              perspective={900}
              glare={true}
              className="group bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 hover:border-emerald-300 p-4 shadow-3d-card hover:shadow-3d-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <Link
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="block w-full h-full flex flex-col justify-between"
              >
                <div className="relative aspect-video sm:aspect-square w-full rounded-2xl overflow-hidden mb-3 bg-slate-100 translate-z-18 shadow-sm">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity translate-z-24">
                    <span className="text-[10px] font-bold text-white bg-emerald-600/90 backdrop-blur-xs px-2 py-0.5 rounded-full inline-block shadow-sm">
                      Explore Deals →
                    </span>
                  </div>
                </div>

                <div className="translate-z-12">
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                    {cat.description}
                  </p>
                  <span className="text-[10px] font-semibold text-emerald-700 mt-2 block">
                    {cat.productCount} Products · Discounts active
                  </span>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

