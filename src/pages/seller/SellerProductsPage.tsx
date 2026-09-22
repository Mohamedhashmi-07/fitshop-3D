import React, { useState } from 'react';
import { products as initialProducts } from '../../data/products';
import { Product } from '../../types';
import { formatINR } from '../../utils/pricing';
import { useToast } from '../../context/ToastContext';
import { PlusCircle, Package, Check, Sparkles } from 'lucide-react';

export const SellerProductsPage: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const { addToast } = useToast();

  // Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Stepz Footwear');
  const [originalPrice, setOriginalPrice] = useState('4999');
  const [category, setCategory] = useState('Footwear');
  const [discountPercentage, setDiscountPercentage] = useState('30');
  const [activityType, setActivityType] = useState<'running' | 'walking' | 'cycling' | 'workout' | 'gym'>('running');
  const [target, setTarget] = useState('10');
  const [unit, setUnit] = useState('KM');
  const [stock, setStock] = useState('25');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const priceNum = parseFloat(originalPrice) || 2999;
    const discountNum = parseFloat(discountPercentage) || 25;
    const targetNum = parseFloat(target) || 5;
    const stockNum = parseInt(stock) || 10;

    const newProd: Product = {
      id: 'stepz-custom-' + Date.now().toString(36),
      name,
      brand,
      brandId: 'stepz-footwear',
      category,
      categoryId: category.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      description: `Premium athletic edition featuring responsive foam engineering and breathable knit upper.`,
      originalPrice: priceNum,
      fitnessOffer: {
        discountPercentage: discountNum,
        requirement: {
          type: activityType,
          target: targetNum,
          unit,
          description: `${targetNum} ${unit} ${activityType.toUpperCase()}`,
          challengeId: 'challenge-stepz-5k',
        },
      },
      rating: 5.0,
      reviewCount: 1,
      stock: stockNum,
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      ],
      featured: true,
      trending: true,
    };

    setProductList([newProd, ...productList]);
    setShowAddForm(false);
    setName('');

    addToast({
      type: 'success',
      title: 'Product Added Successfully',
      message: `${name} has been published with a ${discountNum}% fitness challenge.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Seller Product Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Add and manage your catalog with integrated fitness discount campaigns.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm((v) => !v)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 self-start sm:self-auto transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showAddForm ? 'Close Form' : 'Add New Product'}</span>
        </button>
      </div>

      {/* Add Product Modal / Collapsible Form */}
      {showAddForm && (
        <form
          onSubmit={handleCreateProduct}
          className="bg-white rounded-3xl border-2 border-emerald-500/30 p-6 shadow-md space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h2 className="font-bold text-slate-900 text-sm">
              Publish New Fitness Discounted Product
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Product Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Stepz HyperStrider Carbon"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Original Retail Price (₹)
              </label>
              <input
                type="number"
                required
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none text-slate-700"
              >
                <option value="Footwear">Footwear</option>
                <option value="Sports & Sportswear">Sports & Sportswear</option>
                <option value="Fitness Products">Fitness Products</option>
                <option value="Electronics">Electronics</option>
                <option value="Health & Wellness">Health & Wellness</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Fitness Discount (%)
              </label>
              <input
                type="number"
                required
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Initial Stock
              </label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Activity Type Requirement
              </label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none text-slate-700"
              >
                <option value="running">Running</option>
                <option value="walking">Walking</option>
                <option value="cycling">Cycling</option>
                <option value="workout">Home Workout</option>
                <option value="gym">Gym & Lifting</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Target Distance/Count
              </label>
              <input
                type="number"
                required
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Unit (KM, Steps, Mins)
              </label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Publish to FitShop
            </button>
          </div>
        </form>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Retail Price</th>
                <th className="py-3.5 px-4">Fitness Offer</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {productList.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <span className="truncate max-w-xs">{p.name}</span>
                  </td>
                  <td className="py-3 px-4">{p.brand}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {formatINR(p.originalPrice)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {p.fitnessOffer.discountPercentage}% OFF ({p.fitnessOffer.requirement.description})
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold">{p.stock}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Live
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
