import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { ArrowRight, Tag, Layers } from 'lucide-react';
import { TiltCard } from '../components/3d/TiltCard';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="bg-slate-50/50 min-h-screen py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-3d-sm inline-flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            All Departments
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Shop by Category
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Explore 10 curated athletic and wellness categories with active fitness discounts and reward challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <TiltCard
              key={cat.id}
              maxTilt={7}
              scale={1.03}
              perspective={900}
              glare={true}
              className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 hover:border-emerald-400 p-5 shadow-3d-card hover:shadow-3d-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <Link
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="block w-full h-full flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 translate-z-18 shadow-sm">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-800 border border-slate-200/80 shadow-xs flex items-center gap-1">
                      <Tag className="w-3 h-3 text-emerald-600" />
                      Up to 40% OFF
                    </span>
                  </div>

                  <div className="translate-z-12">
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-600 transition mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs translate-z-18">
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                    {cat.productCount} Products
                  </span>
                  <span className="font-bold text-slate-700 group-hover:text-emerald-600 flex items-center gap-1">
                    <span>Browse</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
};

