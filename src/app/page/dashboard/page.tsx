"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/service/authService";
import Sidebar from "@/app/components/Sidebar";
import ProductCard from "@/app/components/ProductCard";
import SideDrawer from "@/app/components/sideDrawer";
import CartBottom from "@/app/components/CartBottom";
import { useGetProducts, useUpdateProduct } from "@/app/hook/useProduct";
import { useQueryClient } from "@tanstack/react-query";

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Drawer states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newStock, setNewStock] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isUpdating, setIsUpdating] = useState(false);


  // Hook TanStack Query
  const { data: products, isLoading: isProductsLoading, isError, error } = useGetProducts();
  const updateProduct = useUpdateProduct();

  useEffect(() => {
    const userData = authService.getUser();
    if (!userData) {
      router.push("/page/login");
    } else {
      setUser(userData);
      setIsAuthLoading(false);
    }
  }, [router]);

  const handleEditStock = (product: any) => {
    setSelectedProduct(product);
    setNewStock(product.stocks || 0);
    setIsDrawerOpen(true);
  };


  const handleUpdateStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setIsUpdating(true);
    updateProduct.mutate(
      {
        id: selectedProduct.id,
        data: {
          stocks: newStock,
          stockType: "ADJUSTMENT",
        },

      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["products"] });
          setIsDrawerOpen(false);
          setIsUpdating(false);
          alert("Stock updated successfully!");
        },
        onError: (err: any) => {
          alert("Error updating stock: " + err.message);
          setIsUpdating(false);
        },
      }
    );
  };

  const sortedProducts = useMemo(() => {
    if (!products) return [];
    const items = [...products];
    switch (sortBy) {
      case "name":
        return items.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      case "price-low":
        return items.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price-high":
        return items.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "stock-low":
        return items.sort((a, b) => (a.stocks || 0) - (b.stocks || 0));
      case "newest":
      default:
        return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [products, sortBy]);

  // if (isAuthLoading) {
  //   return (
  //     <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
  //       <div className="relative w-16 h-16">
  //         <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
  //         <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin"></div>
  //       </div>
  //       <p className="text-slate-400 font-medium animate-pulse">Authenticating...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 space-y-8 pb-20">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent italic">
              KASIR UMKM HEBAT
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              Manage and sell your premium products.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <span className="absolute -top-2 left-3 px-2 bg-slate-950 text-[10px] font-bold text-slate-500 uppercase tracking-tighter z-10">Sort By</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-white text-sm font-bold rounded-2xl px-5 py-3.5 pr-10 focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer shadow-xl shadow-indigo-600/5 min-w-[180px]"
              >
                <option value="newest">Terbaru</option>
                <option value="name">Nama (A-Z)</option>
                <option value="price-low">Harga: Murah - Mahal</option>
                <option value="price-high">Harga: Mahal - Murah</option>
                <option value="stock-low">Stok: Terendah</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Product Grid Section */}
        <section className="space-y-6">

            {isProductsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 h-64 animate-pulse space-y-4">
                    <div className="flex justify-between">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl"></div>
                        <div className="w-10 h-4 bg-slate-800 rounded"></div>
                    </div>
                    <div className="w-full h-6 bg-slate-800 rounded"></div>
                    <div className="w-1/2 h-4 bg-slate-800 rounded"></div>
                    <div className="pt-4 border-t border-slate-800 mt-4 flex justify-between items-center">
                        <div className="w-20 h-6 bg-slate-800 rounded"></div>
                        <div className="w-10 h-10 bg-slate-800 rounded-xl"></div>
                    </div>
                </div>
                ))}
            </div>
            ) : isError ? (
            <div className="bg-rose-500/10 border border-rose-500/20 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 mb-2">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-rose-400">Failed to Load Products</h3>
                <p className="text-slate-400 max-w-md">{(error as any)?.message || "Something went wrong while fetching your inventory. Please check your connection."}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-rose-500 hover:bg-rose-400 text-white px-6 py-2 rounded-xl font-bold transition-all"
                >
                  Try Again
                </button>
            </div>
            ) : sortedProducts?.length === 0 ? (
            <div className="bg-slate-900/50 border border-dashed border-slate-800 p-20 rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
                <div>
                   <h3 className="text-xl font-bold">No Products Found</h3>
                   <p className="text-slate-500 text-sm max-w-xs mx-auto">Start adding products to your inventory to see them listed here.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20 active:scale-95">
                   Add First Product
                </button>
            </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts?.map((product: any) => (
                    <ProductCard key={product.id} product={product} onEditStock={handleEditStock} />
                ))}
            </div>
            )}

        </section>
      </main>

      {/* Side Drawer for Editing Stock */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Edit Stock Produk"
      >
        {selectedProduct && (
          <form onSubmit={handleUpdateStock} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                <div className="w-16 h-16 bg-slate-800 rounded-xl flex-shrink-0 overflow-hidden">
                  {selectedProduct.imgUrl && selectedProduct.imgUrl !== "coba" ? (
                    <img src={selectedProduct.imgUrl} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white">{selectedProduct.name}</h3>
                  <p className="text-sm text-slate-400 capitalize">{selectedProduct.category?.name || "General"}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 ml-1">Update Stock</label>
                <div className="relative group">
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all text-xl font-bold"
                    placeholder="Masukkan jumlah stock"
                    min="0"
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                    Units
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Perubahan stock akan langsung memperbarui inventaris Anda. Pastikan jumlah yang dimasukkan sudah sesuai dengan fisik barang.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Memperbarui...
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white font-semibold py-3 rounded-2xl transition-all"
              >
                Batal
              </button>
            </div>
          </form>
        )}
      </SideDrawer>

      {/* Sticky Bottom Cart */}
      <CartBottom />

      {/* Mobile Nav Overlay (Optional) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 flex justify-around items-center z-50 backdrop-blur-md bg-opacity-80">
          <button className="p-2 text-indigo-400"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg></button>
          <button className="p-2 text-slate-500"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg></button>
          <button className="p-2 bg-indigo-600 rounded-full text-white -mt-10 border-4 border-slate-950 shadow-xl"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg></button>
          <button className="p-2 text-slate-500"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zM9 19v-6a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg></button>
          <button className="p-2 text-slate-500"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></button>
      </div>
    </div>
  );
}
