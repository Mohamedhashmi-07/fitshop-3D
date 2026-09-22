import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import { formatINR } from '../utils/pricing';
import { CheckCircle2, ShoppingBag, ArrowRight, Package, Sparkles } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { currentUser } = useAuth();

  const stateOrder = location.state?.order as Order | undefined;
  const userOrder = currentUser?.orders?.find((o) => o.id === id);
  const order = stateOrder || userOrder;

  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-card text-center space-y-6">
          {/* Animated Success Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Demo Order Placed Successfully
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Order ID: <span className="font-mono font-bold text-slate-800">{id}</span>
            </p>
          </div>

          {/* Fitness Savings Highlight Banner */}
          {order && order.totalFitnessDiscount > 0 && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md flex items-center justify-between gap-4 text-left">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-300 shrink-0" />
                <div>
                  <div className="text-sm font-extrabold">
                    Fitness Rewards Applied!
                  </div>
                  <div className="text-xs text-emerald-100">
                    You saved {formatINR(order.totalFitnessDiscount)} through verified physical activities.
                  </div>
                </div>
              </div>
              <span className="text-xl font-black bg-white/20 px-3 py-1 rounded-xl">
                -{formatINR(order.totalFitnessDiscount)}
              </span>
            </div>
          )}

          {/* Order Details Preview */}
          {order && (
            <div className="text-left bg-slate-50 rounded-2xl p-5 border border-slate-200/70 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200 pb-3">
                <span>Items Ordered ({order.items.length})</span>
                <span>Date: {order.date}</span>
              </div>

              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-800 truncate">{item.name}</div>
                      <div className="text-[11px] text-slate-500">
                        Qty: {item.quantity} · {item.discountPercentage > 0 ? `${item.discountPercentage}% Fitness OFF` : 'Standard'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{formatINR(item.finalPrice * item.quantity)}</div>
                      {item.discountPercentage > 0 && (
                        <div className="text-[10px] text-slate-400 line-through">
                          {formatINR(item.originalPrice * item.quantity)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Original Total:</span>
                  <span className="font-semibold text-slate-800">{formatINR(order.totalOriginalPrice)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Fitness Discount:</span>
                  <span>-{formatINR(order.totalFitnessDiscount)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-200">
                  <span>Final Total:</span>
                  <span>{formatINR(order.finalTotal)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              to="/orders"
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition"
            >
              <Package className="w-4 h-4" />
              <span>View Order History</span>
            </Link>
            <Link
              to="/shop"
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
