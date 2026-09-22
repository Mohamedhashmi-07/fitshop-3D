import React from 'react';
import { formatINR } from '../../utils/pricing';
import { ShoppingBag, CheckCircle2, Truck, Clock } from 'lucide-react';

export const SellerOrdersPage: React.FC = () => {
  const mockSellerOrders = [
    {
      id: 'ORD-894102',
      customer: 'Mohamed',
      product: 'Stepz Phantom Marathon Elite',
      date: '22 Sep 2026',
      quantity: 1,
      retailPrice: 10999,
      discount: '40% (5 KM Run Verified)',
      finalPrice: 6599.40,
      status: 'Shipped',
    },
    {
      id: 'ORD-762114',
      customer: 'Vikram',
      product: 'Nike Zoom Pegasus Pro Elite',
      date: '21 Sep 2026',
      quantity: 1,
      retailPrice: 2999,
      discount: '20% (15 KM Run Verified)',
      finalPrice: 2399.20,
      status: 'Delivered',
    },
    {
      id: 'ORD-541908',
      customer: 'Priya',
      product: 'Stepz Float Foam Recovery Slides',
      date: '20 Sep 2026',
      quantity: 1,
      retailPrice: 1999,
      discount: '30% (5 KM Run Verified)',
      finalPrice: 1399.30,
      status: 'Processing',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Seller Fulfillment & Orders
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review customer orders with verified fitness challenge discounts applied.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Retail Price</th>
                <th className="py-3.5 px-4">Fitness Verification</th>
                <th className="py-3.5 px-4">Final Paid</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockSellerOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{ord.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{ord.customer}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{ord.product}</td>
                  <td className="py-3 px-4 line-through text-slate-400">
                    {formatINR(ord.retailPrice)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                      {ord.discount}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-extrabold text-slate-900">
                    {formatINR(ord.finalPrice)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> {ord.status}
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
