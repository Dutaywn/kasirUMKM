"use client";

import React from "react";

import { Package, Plus, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";

export default function ProductCard({ product, onEditStock }: { product: any; onEditStock?: (product: any) => void }) {
  // Safe extraction based on your API response
  const categoryName = product.category?.name || "General";
  const currentStock = product.stocks ?? 0;
  const latestStockRecord = product.stockId?.at(-1);

  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imgUrl: product.imgUrl,
      stockID: latestStockRecord?.id || 0
    }));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 hover:border-indigo-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-indigo-500/10">
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-slate-800/50 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner overflow-hidden border border-slate-700/50 group-hover:border-indigo-500/50">
          {product.imgUrl && product.imgUrl !== "coba" ? (
             <img src={product.imgUrl} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <Package size={28} className="transition-transform duration-500 group-hover:scale-110" />
          )}
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">Inventory</span>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${
              currentStock <= 5 
                ? "text-rose-400 bg-rose-400/10 border-rose-400/20" 
                : "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentStock <= 5 ? "bg-rose-400" : "bg-emerald-400"}`}></div>
              {currentStock} Units
            </div>
          </div>

          
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEditStock?.(product);
              }}
              className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-xl transition-all text-slate-400 hover:text-white border border-slate-700 active:scale-90"
              title="Edit Stock"
            >
              <Plus size={18} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="bg-indigo-600 hover:bg-indigo-500 p-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 text-white active:scale-90"
              title="Tambah ke Keranjang"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-extrabold text-xl text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-indigo-500/50"></span>
           <p className="text-xs text-slate-500 font-bold capitalize tracking-wide">
             {categoryName}
           </p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between pt-5 border-t border-slate-800/50">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-slate-500 font-black tracking-tighter mb-0.5">Price / Unit</span>
          <span className="text-2xl font-black text-white bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent italic">
            Rp {product.price?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
