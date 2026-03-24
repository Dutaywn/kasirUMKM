"use client";

import React from "react";
import { LucidePackage, LucideClock, LucideCreditCard, LucideChevronRight, LucideArrowRight, NotebookIcon, NotebookTextIcon } from "lucide-react";
import Link from "next/link";

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  product: {
    name: string;
    imgUrl?: string;
  };
}

interface OrderProps {
  order: {
    id: number;
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    createdAt: string;
    items: OrderItem[];
  };
}

const OrderCard: React.FC<OrderProps> = ({ order }) => {
  const date = new Date(order.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = new Date(order.createdAt).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PAID":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "PENDING":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "CANCELLED":
        return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-indigo-500/10 mb-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Invoice</span>
            <span className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors">#{order.id}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
            <span className="flex items-center gap-1.5">
              <LucideClock size={12} className="text-indigo-500/50" />
              {date} • {time}
            </span>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${getStatusColor(order.paymentStatus)}`}>
          <div className={`w-1 h-1 rounded-full animate-pulse ${order.paymentStatus.toUpperCase() === "PAID" ? "bg-emerald-400" :
              order.paymentStatus.toUpperCase() === "PENDING" ? "bg-amber-400" : "bg-rose-400"
            }`}></div>
          {order.paymentStatus}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center group/item">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center bg-slate-800 rounded-lg text-[10px] font-black text-indigo-400 border border-slate-700/50 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                {item.quantity}
              </span>
              <span className="text-sm font-bold text-slate-300 group-hover/item:text-white transition-colors">{item.product.name}</span>
            </div>
            <span className="text-xs font-bold text-slate-500 tabular-nums">Rp {item.priceAtPurchase.toLocaleString("id-ID")}</span>
          </div>
        ))}
      </div>

      <div className="pt-5 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50 shadow-inner">
            <LucideCreditCard size={12} className="text-indigo-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.paymentMethod}</span>
          </div>
          <Link 
            href={`/page/orders/${order.id}/nota`}
            className="flex items-center gap-2 px-3 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/20 transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-500/5"
          >
            <NotebookTextIcon size={12} />
            <span className="text-[10px] font-black uppercase tracking-widest">Nota</span>
          </Link>
        </div>

        <div className="text-left sm:text-right w-full sm:w-auto">
          <p className="text-[10px] uppercase font-black text-slate-500 tracking-tighter mb-0.5">Total Amount</p>
          <p className="text-2xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent italic tabular-nums">
            Rp {order.totalAmount.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
