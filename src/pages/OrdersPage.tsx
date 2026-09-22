import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/pricing';
import { EmptyState } from '../components/common/EmptyState';
import { Package, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { currentUser } = useAuth();
  const orders = currentUser?.orders || [];

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Order History
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track all orders placed with your verified fitness discounts.
          </p>
        </div>

        {orders.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No Orders Yet"
            description="You haven't placed any orders yet. Complete fitness challenges to unlock exclusive discounts and start shopping!"
            actionText="Start Shopping"
            actionLink="/shop"
          />
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card hover:shadow-card-hover transition space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">Order ID</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">{order.id}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Date</span>
                      <span className="font-semibold text-slate-700">{order.date}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block">Status</span>
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items in order */}
                <div className="divide-y divide-slate-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <Link
                            to={`/product/${item.productId}`}
                            className="font-bold text-slate-800 text-xs hover:text-emerald-600 truncate block transition"
                          >
                            {item.name}
                          </Link>
                          <span className="text-[11px] text-slate-400 block">
                            Brand: {item.brand} · Qty: {item.quantity}
                          </span>
                          {item.discountPercentage > 0 && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5">
                              <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                              {item.discountPercentage}% Fitness OFF Unlocked
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-slate-900 text-sm">
                          {formatINR(item.finalPrice * item.quantity)}
                        </div>
                        {item.discountPercentage > 0 && (
                          <div className="text-[11px] text-slate-400 line-through">
                            {formatINR(item.originalPrice * item.quantity)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary bar */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="text-slate-500">
                    Payment Method: <span className="font-bold text-slate-700">{order.paymentMethod}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    {order.totalFitnessDiscount > 0 && (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                        Saved: {formatINR(order.totalFitnessDiscount)}
                      </span>
                    )}

                    <div className="text-right">
                      <span className="text-slate-400 mr-1.5">Order Total:</span>
                      <span className="text-base font-extrabold text-slate-900">
                        {formatINR(order.finalTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
