import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Order, OrderItem } from '../types';
import { addUserOrder } from '../utils/storage';
import { formatINR } from '../utils/pricing';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Lock,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const { items, totals, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(currentUser?.name || 'Mohamed');
  const [addressLine, setAddressLine] = useState('Flat 402, Green Glen Layout, Bellandur');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560103');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-sm text-slate-500 mt-2">Add items to your cart before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="inline-block mt-4 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSubmitting(true);

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const orderItems: OrderItem[] = items.map((i) => ({
      productId: i.productId,
      name: i.product.name,
      brand: i.product.brand,
      image: i.product.images[0],
      quantity: i.quantity,
      originalPrice: i.originalPrice,
      discountPercentage: i.appliedDiscountPercentage,
      finalPrice: i.finalPrice,
      savings: i.savings,
    }));

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: orderItems,
      totalOriginalPrice: totals.totalOriginalPrice,
      totalFitnessDiscount: totals.totalFitnessDiscount,
      finalTotal: totals.finalTotal,
      totalSavings: totals.totalSavings,
      shippingAddress: {
        fullName,
        addressLine,
        city,
        state,
        pincode,
        phone,
      },
      paymentMethod: paymentMethod === 'upi' ? 'UPI / QR Code' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery',
      status: 'Processing',
    };

    // Save order to multi-account storage
    addUserOrder(currentUser.id, newOrder);

    // Update state
    updateUser({
      orders: [newOrder, ...(currentUser.orders || [])],
      totalSavings: Math.round(((currentUser.totalSavings || 0) + totals.totalSavings) * 100) / 100,
      cart: [],
    });

    clearCart();

    addToast({
      type: 'success',
      title: 'Order Placed Successfully!',
      message: `Order #${orderId} confirmed. You saved ${formatINR(totals.totalSavings)} with FitShop!`,
    });

    navigate(`/order-confirmation/${orderId}`, { state: { order: newOrder } });
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Complete your order and lock in your fitness reward pricing.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Delivery & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 p-6 shadow-3d-card space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Truck className="w-5 h-5 text-emerald-600" />
                <h2 className="font-bold text-slate-900 text-base">Delivery Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 p-6 shadow-3d-card space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <h2 className="font-bold text-slate-900 text-base">Select Payment Method (Demo)</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border cursor-pointer flex flex-col items-center text-center gap-2 transition duration-200 transform hover:-translate-y-0.5 ${
                    paymentMethod === 'upi'
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-3d-emerald'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-3d-sm'
                  }`}
                >
                  <QrCode className="w-6 h-6 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-900">UPI / QR Code</span>
                  <span className="text-[10px] text-slate-400">Google Pay, PhonePe, Paytm</span>
                </label>

                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border cursor-pointer flex flex-col items-center text-center gap-2 transition duration-200 transform hover:-translate-y-0.5 ${
                    paymentMethod === 'card'
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-3d-emerald'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-3d-sm'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-slate-700" />
                  <span className="text-xs font-bold text-slate-900">Credit / Debit Card</span>
                  <span className="text-[10px] text-slate-400">Visa, Mastercard, RuPay</span>
                </label>

                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border cursor-pointer flex flex-col items-center text-center gap-2 transition duration-200 transform hover:-translate-y-0.5 ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-3d-emerald'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-3d-sm'
                  }`}
                >
                  <Banknote className="w-6 h-6 text-amber-600" />
                  <span className="text-xs font-bold text-slate-900">Cash on Delivery</span>
                  <span className="text-[10px] text-slate-400">Pay when item arrives</span>
                </label>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero real money processed. Simulated sandbox for Smart India Hackathon.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Demo Order Button */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 p-6 shadow-3d-card space-y-5 sticky top-24">
              <h2 className="text-base font-extrabold text-slate-900">Order Summary</h2>

              {/* Items preview list */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between text-xs gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-800 truncate">{item.product.name}</div>
                      <div className="text-[11px] text-slate-400">
                        Qty: {item.quantity} · {item.product.brand}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">
                        {formatINR(item.finalPrice * item.quantity)}
                      </div>
                      {item.appliedDiscountPercentage > 0 && (
                        <div className="text-[10px] font-semibold text-emerald-600 line-through">
                          {formatINR(item.originalPrice * item.quantity)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Numerical breakdown (as requested in Section 30 & 45) */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Items Original Price:</span>
                  <span className="font-semibold text-slate-800">
                    {formatINR(totals.totalOriginalPrice)}
                  </span>
                </div>

                <div className="flex justify-between text-emerald-700 font-bold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Fitness Discount:
                  </span>
                  <span>-{formatINR(totals.totalFitnessDiscount)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-slate-900">Total:</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-slate-900">
                      {formatINR(totals.finalTotal)}
                    </span>
                    <div className="text-[11px] font-bold text-emerald-700">
                      You save {formatINR(totals.totalFitnessDiscount)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              {totals.totalFitnessDiscount > 0 && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5 shadow-3d-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>✓ Fitness offer applied</span>
                </div>
              )}

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 btn-3d-emerald text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{isSubmitting ? 'Placing Order...' : 'Place Demo Order'}</span>
              </button>

              <div className="text-center text-[11px] text-slate-400">
                This is a frontend prototype. No payments will be charged.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
