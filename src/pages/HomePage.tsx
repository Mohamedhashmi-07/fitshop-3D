import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { CategorySection } from '../components/home/CategorySection';
import { ActivitySection } from '../components/home/ActivitySection';
import { EmergingBrands } from '../components/home/EmergingBrands';
import { FitnessImpact } from '../components/home/FitnessImpact';
import { HomeCTA } from '../components/home/HomeCTA';
import { OfferCard } from '../components/fitness/OfferCard';
import { ProductCard } from '../components/products/ProductCard';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  // Flagship offer products
  const featuredOfferProducts = products.filter((p) => p.featured).slice(0, 4);
  // Trending products
  const trendingProducts = products.filter((p) => p.trending).slice(0, 8);

  return (
    <div className="bg-white">
      {/* 1. Hero Section (Strictly Light Theme) */}
      <HeroSection />

      {/* 2. How FitShop Works */}
      <HowItWorks />

      {/* 3. Shop by Category */}
      <CategorySection />

      {/* 4. Fitness Activities */}
      <ActivitySection />

      {/* 5. Featured Fitness Offers */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Featured Fitness Offers</span>
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Unlock Up to 40% OFF Through Movement
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Active fitness challenges linked directly to high-performance products. Complete your workout to claim the discount.
              </p>
            </div>
            <Link
              to="/fitness-rewards"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 hover:underline"
            >
              <span>Explore All Challenges</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredOfferProducts.map((p) => (
              <OfferCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Trending Products */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1.5 w-fit">
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                <span>Popular Right Now</span>
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Trending Products
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Top picks among runners, lifters, yogis, and everyday athletes.
              </p>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 hover:underline"
            >
              <span>View All 30+ Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Emerging Brands */}
      <EmergingBrands />

      {/* 8. Fitness Impact */}
      <FitnessImpact />

      {/* 9. Final Call to Action */}
      <HomeCTA />
    </div>
  );
};
