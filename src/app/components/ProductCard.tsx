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
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:translate-y-[-4px] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col h-full border border-outline-variant/20 relative">
      <div className="relative h-48 overflow-hidden bg-surface-container-high w-full">
        {product.imgUrl && product.imgUrl !== "coba" ? (
           <img src={product.imgUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-500">
            <Package size={48} className="mb-2 opacity-50" />
          </div>
        )}
        <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap max-w-[80%]">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-secondary shadow-sm">
            {categoryName}
          </span>
        </div>
        
        {/* Edit stock button overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEditStock?.(product);
          }}
          className="absolute top-4 right-4 w-8 h-8 bg-white/90 hover:bg-white backdrop-blur-md rounded-full shadow-sm flex items-center justify-center text-slate-400 hover:text-primary transition-all z-10"
          title="Edit Stock"
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="font-bold text-lg text-on-surface line-clamp-2" title={product.name}>
              {product.name}
            </h3>
            <span className={`flex-shrink-0 text-xs font-bold px-2 py-1 rounded-lg ${
              currentStock <= 5 ? "text-error bg-error/10" : "text-primary bg-primary/10"
            }`}>
              {currentStock} Units
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-6 line-clamp-2">
            Click edit to update inventory details or add to cart for order.
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-extrabold text-on-surface">
            Rp {product.price?.toLocaleString()}
          </span>
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 cta-gradient rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg active:scale-90 transition-all z-10"
            title="Tambah ke Keranjang"
          >
            <ShoppingCart size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
