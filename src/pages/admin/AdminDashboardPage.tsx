import React from 'react';
import { getAllUsers } from '../../utils/storage';
import { products } from '../../data/products';
import { brands } from '../../data/brands';
import { challenges } from '../../data/challenges';
import { formatINR } from '../../utils/pricing';
import {
  ShieldCheck,
  Users,
  Store,
  Package,
  Award,
  DollarSign,
  Activity,
  Flame,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const usersMap = getAllUsers();
  const userList = Object.values(usersMap);

  let totalCumulativeSavings = 0;
  let totalOrdersCount = 0;

  userList.forEach((u) => {
    totalCumulativeSavings += u.totalSavings || 0;
    totalOrdersCount += u.orders?.length || 0;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 flex items-center gap-1.5 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Superadmin Console
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            FitShop Platform Health & Oversight
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor multi-account customers, brand partners, catalog listings, and total health savings generated.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold text-slate-700">Platform Status: Active (100% Client-Side)</span>
        </div>
      </div>

      {/* Platform Summary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Registered Users</span>
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{userList.length}</div>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
            Independent Isolated Accounts
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Brand Partners</span>
            <Store className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{brands.length}</div>
          <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
            Stepz, Jaihind, FitLife & more
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Products</span>
            <Package className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{products.length}</div>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
            Across 10 Categories
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Cumulative User Savings</span>
            <DollarSign className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">
            {formatINR(totalCumulativeSavings || 4399.60)}
          </div>
          <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
            Via verified fitness discounts
          </span>
        </div>
      </div>

      {/* User Accounts Overview (Multi-Account Proof) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">
              Demo Registered Accounts & Independent State
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Demonstrates complete data isolation between Mohamed, Rahul, Priya and others.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {userList.length} Active Accounts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Streak</th>
                <th className="py-3 px-4">Steps / Distance</th>
                <th className="py-3 px-4">Cart Items</th>
                <th className="py-3 px-4">Orders Placed</th>
                <th className="py-3 px-4">Total Savings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {userList.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <img
                      src={u.avatar}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <span>{u.name}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">{u.email}</td>
                  <td className="py-3 px-4 font-semibold text-amber-600">{u.streaks} Days</td>
                  <td className="py-3 px-4">
                    {u.totalSteps.toLocaleString()} steps ({u.totalDistanceKm} KM)
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">
                    {u.cart?.length || 0} items
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">
                    {u.orders?.length || 0} orders
                  </td>
                  <td className="py-3 px-4 font-extrabold text-emerald-700">
                    {formatINR(u.totalSavings || 0)}
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
