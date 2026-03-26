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
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "PENDING":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "CANCELLED":
        return "text-error bg-error/10 border-error/20";
      default:
        return "text-slate-500 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 hover:shadow-md transition-all duration-300 group mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Invoice</span>
            <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">#{order.id}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
            <span className="flex items-center gap-1.5">
              <LucideClock size={12} className="text-primary/50" />
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
              <span className="w-6 h-6 flex items-center justify-center bg-surface-container-high rounded-lg text-[10px] font-bold text-primary border border-outline-variant/20 group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                {item.quantity}
              </span>
              <span className="text-sm font-bold text-on-surface group-hover/item:text-primary transition-colors">{item.product.name}</span>
            </div>
            <span className="text-xs font-bold text-slate-500 tabular-nums">Rp {item.priceAtPurchase.toLocaleString("id-ID")}</span>
          </div>
        ))}
      </div>

      <div className="pt-5 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-surface-container rounded-xl border border-outline-variant/30 shadow-sm">
            <LucideCreditCard size={12} className="text-primary" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{order.paymentMethod}</span>
          </div>
          <Link 
            href={`/page/orders/${order.id}/nota`}
            className="flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl border border-primary/20 transition-all duration-200 active:scale-95 shadow-sm"
          >
            <NotebookTextIcon size={12} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Nota</span>
          </Link>
        </div>

        <div className="text-left sm:text-right w-full sm:w-auto">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter mb-0.5">Total Amount</p>
          <p className="text-xl font-bold text-on-surface tabular-nums">
            Rp {order.totalAmount.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
