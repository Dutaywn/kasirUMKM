"use client";

import React from "react";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    category?: string;
  };
}

export default function ProductCard({ product }: any) {
  // Safe extraction based on your API response
  const categoryName = product.category?.name || "General";
  const stockCount = product.stocks?.[0]?.total ?? 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-indigo-500/10">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-inner overflow-hidden">
          {product.imgUrl && product.imgUrl !== "coba" ? (
             <img src={product.imgUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          )}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-1">Stock</span>
          <span className={`text-sm font-bold ${stockCount <= 5 ? "text-rose-400" : "text-emerald-400"}`}>
            {stockCount}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium capitalize">
          {categoryName}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/50">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-slate-500 font-bold">Price</span>
          <span className="text-lg font-black text-white">
            Rp {product.price?.toLocaleString()}
          </span>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 p-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

