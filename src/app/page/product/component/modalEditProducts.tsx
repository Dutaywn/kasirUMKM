"use client";

import React, { useEffect, useState } from "react";
import { useUpdateProduct } from "@/app/hook/useProduct";
import { useQueryClient } from "@tanstack/react-query";

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

export default function ModalEditProducts({ isOpen, onClose, product }: ModalEditProps) {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stocks: "",
    categoryId: "1",
    imgUrl: "coba",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price?.toString() || "",
        stocks: product.stocks?.[0]?.total?.toString() || "0",
        categoryId: product.categoryId?.toString() || "1",
        imgUrl: product.imgUrl || "coba",
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      name: formData.name,
      price: Number(formData.price),
      categoryId: Number(formData.categoryId),
      imgUrl: formData.imgUrl,
      stocks: Number(formData.stocks),
    };

    updateProduct(
      { id: product.id, data: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["products"] });
          alert("Product updated successfully!");
          onClose();
        },
        onError: (err: any) => {
          alert("Error: " + err.message);
        }
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
          <h2 className="text-xl font-bold text-white">Edit Product</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
            <input
              type="text"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Price (Rp)</label>
              <input
                type="number"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stock</label>
              <input
                type="number"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                value={formData.stocks}
                onChange={(e) => setFormData({ ...formData, stocks: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
            <select
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            >
              <option value="1">Minuman</option>
              <option value="2">Makanan</option>
              <option value="3">Snack</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Image URL</label>
            <input
              type="text"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              value={formData.imgUrl}
              onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
