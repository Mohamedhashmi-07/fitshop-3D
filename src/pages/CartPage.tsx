import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItemRow } from '../components/cart/CartItemRow';
import { EmptyState } from '../components/common/EmptyState';
import { formatINR } from '../utils/pricing';
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="bg-slate-50/50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState
            icon={ShoppingBag}
            title="Your Cart is Empty"
            description="You don't have any items in your cart yet. Unlock fitness discounts on high-performance athletic gear and save!"
            actionText="Start Shopping"
            actionLink="/shop"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {totals.itemCount} items ready for checkout with verified fitness pricing.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition"
          >
            Clear Cart
          </button>
        </div>

        {/* Savings banner if discounts are active */}
        {totals.totalFitnessDiscount > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-emerald-900 block">
                  Fitness Activity Discount Active!
                </span>
                <span className="text-xs text-emerald-700">
                  You are saving a total of <strong>{formatINR(totals.totalFitnessDiscount)}</strong> with verified physical achievements.
                </span>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Offer Applied
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items List */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-2">
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <CartItemRow key={item.productId} item={item} />
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <Link
                to="/shop"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-5 sticky top-24">
              <h2 className="text-base font-extrabold text-slate-900">Order Summary</h2>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Items Original Subtotal</span>
                  <span className="font-semibold text-slate-800">
                    {formatINR(totals.totalOriginalPrice)}
                  </span>
                </div>

                {totals.totalFitnessDiscount > 0 ? (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Fitness Activity Discount
                    </span>
                    <span>-{formatINR(totals.totalFitnessDiscount)}</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic">
                    No fitness discounts applied. Complete challenges to save!
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-emerald-700">FREE</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-slate-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-slate-900 block">
                      {formatINR(totals.finalTotal)}
                    </span>
                    {totals.totalFitnessDiscount > 0 && (
                      <span className="text-xs font-bold text-emerald-700">
                        Total Savings: {formatINR(totals.totalFitnessDiscount)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Safe & Secure SIH Prototype Demo Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
