import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/pricing';

export const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const hasDiscount = item.appliedDiscountPercentage > 0;
  const lineTotal = item.finalPrice * item.quantity;
  const lineSavings = item.savings * item.quantity;

  return (
    <div className="py-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Product Media & Info */}
      <div className="flex items-center gap-4 flex-1">
        <Link to={`/product/${item.productId}`} className="shrink-0">
          <img
            src={item.product.images[0]}
            alt={item.product.name}
            className="w-20 h-20 rounded-xl object-cover border border-slate-200"
          />
        </Link>
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {item.product.brand}
          </span>
          <Link
            to={`/product/${item.productId}`}
            className="text-sm font-bold text-slate-900 hover:text-emerald-600 block line-clamp-1 transition"
          >
            {item.product.name}
          </Link>

          {/* Fitness discount badge */}
          {hasDiscount ? (
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>{item.appliedDiscountPercentage}% Fitness Discount Applied</span>
            </div>
          ) : (
            <div className="text-[11px] text-slate-400 mt-1">
              Regular Price (Fitness offer locked)
            </div>
          )}

          {/* Unit price indicator */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-sm font-bold text-slate-900">
              {formatINR(item.finalPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">
                {formatINR(item.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stepper, Line Total, Remove */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
          <button
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            className="p-1.5 hover:bg-slate-200 text-slate-600 transition"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-3 text-xs font-bold text-slate-800">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            className="p-1.5 hover:bg-slate-200 text-slate-600 transition"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Line Price & Total Savings */}
        <div className="text-right min-w-[100px]">
          <div className="text-base font-extrabold text-slate-900">
            {formatINR(lineTotal)}
          </div>
          {hasDiscount && (
            <div className="text-[11px] font-semibold text-emerald-700">
              Save {formatINR(lineSavings)}
            </div>
          )}
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.productId)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
