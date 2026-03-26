"use client";

import { useGetOrder } from "@/app/hook/useOrder";
import OrderCard from "@/app/components/OrderCard";
import Sidebar from "@/app/components/Sidebar";
import { LucideListOrdered, LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import BottomNavBar from "@/app/components/bottomNavBar";

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useGetOrder();

  return (
    <div className="min-h-screen bg-surface text-on-surface flex overflow-x-hidden font-body">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 space-y-8 pb-20 max-w-full overflow-x-hidden">
        <div className="max-w-3xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <LucideListOrdered size={28} />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
                    Transaction <span className="text-secondary italic">History</span>
                  </h1>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-0.5">Manage and track your orders</p>
                </div>
              </div>
            </div>
          </header>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-500/20 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0 shadow-lg shadow-indigo-500/20"></div>
              </div>
              <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] animate-pulse">Syncing transactions...</p>
            </div>
          ) : error ? (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-8 text-center backdrop-blur-sm">
              <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
                 <span className="text-rose-500 font-black text-2xl">!</span>
              </div>
              <p className="text-rose-400 font-black uppercase tracking-widest text-xs mb-2">Sync Failed</p>
              <p className="text-slate-400 text-sm font-medium">{(error as Error).message}</p>
            </div>
          ) : orders?.length === 0 ? (
            <div className="text-center py-32 bg-surface-container-high rounded-[2.5rem] border border-dashed border-outline-variant/30 shadow-sm">
              <div className="w-20 h-20 bg-surface rounded-3xl flex items-center justify-center mx-auto mb-6 border border-outline-variant/20 shadow-sm">
                <LucideListOrdered size={36} className="text-slate-400" />
              </div>
              <h3 className="text-on-surface font-extrabold text-xl mb-2">No Transactions Found</h3>
              <p className="text-slate-500 text-sm font-medium px-8 leading-relaxed">Your order history is currently empty. Start making sales to see them here.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {orders?.map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Mobile Nav Overlay */}
      <BottomNavBar />
    </div>
  );
}
