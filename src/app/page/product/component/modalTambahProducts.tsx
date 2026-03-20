"use client";

import React, { useState } from "react";
import { useCreateProduct } from "@/app/hook/useProduct";
import { useQueryClient } from "@tanstack/react-query";

interface ModalTambahProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalTambahProducts({ isOpen, onClose }: ModalTambahProps) {
  const queryClient = useQueryClient();
  const { mutate: createProduct, isPending } = useCreateProduct();
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stocks: "",
    categoryId: "1", // Initial value
    imgUrl: "coba",
    note: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format data according to API expectations
    const payload = {
      ...formData,
      price: Number(formData.price),
      categoryId: Number(formData.categoryId),
      // The API seems to expect stock inside a 'stocks' array or similar 
      // based on the response you showed earlier, but your 'create' method 
      // sends the raw object. I'll pass it as 'stock' and assume the BE handles it.
      // If the BE expects the exactly same structure as the response:
      // stocks: [{ total: Number(formData.stock) }]
      // But standard CRUD usually takes a flat object.
      stocks: Number(formData.stocks)   
    };

    createProduct(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        alert("Product created successfully!");
        onClose();
        setFormData({ name: "", price: "", stocks: "", categoryId: "1", imgUrl: "coba", note: "" });
      },
      onError: (err: any) => {
        alert("Error: " + err.message);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
          <h2 className="text-xl font-bold text-white">Add New Product</h2>
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
              placeholder="e.g. Es Kopi Susu"
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
                placeholder="17000"
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
                placeholder="10"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                value={formData.stocks}
                onChange={(e) => setFormData({ ...formData, stocks: e.target.value })}
              />
            </div>
          </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jenis Stock</label>
              <input
                type="text"
                placeholder="Jenis Stock"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              />
            </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
            <select
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
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
              placeholder="https://example.com/image.jpg"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              value={formData.imgUrl}
              onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
