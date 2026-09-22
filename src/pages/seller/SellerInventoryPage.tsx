import React, { useState } from 'react';
import { products } from '../../data/products';
import { formatINR } from '../../utils/pricing';
import { useToast } from '../../context/ToastContext';
import { Boxes, Plus, Minus } from 'lucide-react';

export const SellerInventoryPage: React.FC = () => {
  const brandProducts = products.filter((p) => p.brandId === 'stepz-footwear');
  const [stockMap, setStockMap] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    brandProducts.forEach((p) => {
      map[p.id] = p.stock;
    });
    return map;
  });
  const { addToast } = useToast();

  const handleAdjust = (id: string, delta: number) => {
    setStockMap((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
    addToast({
      type: 'info',
      title: 'Stock Updated',
      message: 'Inventory count updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Inventory Control
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor warehouse stock allocations for Stepz marathon runners and athletic shoes.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-slate-900 text-sm">Stepz Warehouse Units</span>
          </div>
          <span className="text-xs font-semibold text-slate-400">Real-time sync</span>
        </div>

        <div className="divide-y divide-slate-100">
          {brandProducts.map((p) => {
            const count = stockMap[p.id] ?? p.stock;
            return (
              <div key={p.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={p.images[0]}
                    alt=""
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">{p.name}</h3>
                    <span className="text-[11px] text-slate-400">SKU: STZ-{p.id.slice(0, 6).toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => handleAdjust(p.id, -1)}
                      className="p-1 hover:bg-slate-200 text-slate-600 transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900">{count}</span>
                    <button
                      onClick={() => handleAdjust(p.id, 1)}
                      className="p-1 hover:bg-slate-200 text-slate-600 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      count > 10
                        ? 'bg-emerald-50 text-emerald-800'
                        : count > 0
                        ? 'bg-amber-50 text-amber-800'
                        : 'bg-rose-50 text-rose-800'
                    }`}
                  >
                    {count > 10 ? 'In Stock' : count > 0 ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
