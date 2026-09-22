import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { brands } from '../data/brands';
import { ProductGrid } from '../components/products/ProductGrid';
import { SearchBar } from '../components/common/SearchBar';
import { Filter, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const initialBrand = searchParams.get('brand') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    const s = searchParams.get('search') || '';
    const c = searchParams.get('category') || 'All';
    const b = searchParams.get('brand') || 'All';
    setSearchQuery(s);
    setSelectedCategory(c);
    setSelectedBrand(b);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Search Query filter (matches name, brand, category, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // 3. Brand filter
      if (selectedBrand !== 'All' && p.brand !== selectedBrand) {
        return false;
      }

      // 4. Min Discount filter
      if (minDiscount > 0 && p.fitnessOffer.discountPercentage < minDiscount) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.originalPrice - b.originalPrice;
      }
      if (sortBy === 'price-high') {
        return b.originalPrice - a.originalPrice;
      }
      if (sortBy === 'discount') {
        return b.fitnessOffer.discountPercentage - a.fitnessOffer.discountPercentage;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedBrand, minDiscount, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setMinDiscount(0);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="bg-slate-50/40 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Shop Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse 32+ verified athletic products. Unlock up to 40% OFF with workout challenges.
          </p>
        </div>

        {/* Filters and Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-8 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-6">
              <SearchBar
                defaultValue={searchQuery}
                onSearchSubmit={(val) => {
                  setSearchQuery(val);
                  setSearchParams((prev) => {
                    if (val) prev.set('search', val);
                    else prev.delete('search');
                    return prev;
                  });
                }}
              />
            </div>

            {/* Brand Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setSearchParams((prev) => {
                    if (e.target.value !== 'All') prev.set('brand', e.target.value);
                    else prev.delete('brand');
                    return prev;
                  });
                }}
                className="w-full py-2 px-3 text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-slate-700"
              >
                <option value="All">All Brands (16)</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2 px-3 text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-slate-700"
              >
                <option value="featured">Featured First</option>
                <option value="discount">Highest Fitness Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Category Chips Scrollbar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchParams((prev) => {
                  prev.delete('category');
                  return prev;
                });
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition ${
                selectedCategory === 'All'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setSearchParams((prev) => {
                    prev.set('category', cat.name);
                    return prev;
                  });
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition ${
                  selectedCategory === cat.name
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Active filter summary & Reset */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 gap-2">
            <div>
              Showing <span className="font-bold text-slate-800">{filteredProducts.length}</span> of {products.length} products
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400">Filter Discount:</span>
              {[0, 20, 30, 40].map((d) => (
                <button
                  key={d}
                  onClick={() => setMinDiscount(d)}
                  className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition ${
                    minDiscount === d
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d === 0 ? 'Any' : `${d}%+`}
                </button>
              ))}

              <button
                onClick={handleResetFilters}
                className="ml-3 flex items-center gap-1 text-slate-500 hover:text-rose-600 font-semibold transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};
