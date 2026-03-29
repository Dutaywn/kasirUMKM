"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/service/authService";
import Sidebar from "@/app/components/Sidebar";
import ProductCard from "@/app/components/ProductCard";
import SearchBar from "@/app/components/SearchBar";
import SideDrawer from "@/app/components/sideDrawer";
import CartBottom from "@/app/components/CartBottom";
import { useGetCategory } from "@/app/hook/useCategory";
import { useQueryClient } from "@tanstack/react-query";
import BottomNavBar from "@/app/components/bottomNavBar";
import { useProduct } from "@/app/hook/useProduct";

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Filter states
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Drawer states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newStock, setNewStock] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState(false);


  // Hook TanStack Query
  const {
    products,
    isLoadingProducts,
    errorProducts,
    updateProduct,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useProduct(searchQuery);
  const { data: categories } = useGetCategory();

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
    updateProduct(
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

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    // 1. Filter by category
    let items = [...products];
    if (selectedCategoryId !== null) {
      items = items.filter(p => p.categoryId === selectedCategoryId);
    }

    // 2. Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((p: any) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.category?.name || "").toLowerCase().includes(q)
      );
    }

    // 3. Sort
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
  }, [products, sortBy, selectedCategoryId, searchQuery]);


  return (
    <div className="min-h-screen bg-surface text-on-surface flex overflow-x-hidden font-body">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 space-y-8 pb-20 max-w-full overflow-x-hidden">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
              KASIR UMKM HEBAT
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Manage and sell your premium products.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <span className="absolute -top-2 left-3 px-2 bg-surface text-[10px] font-bold text-primary uppercase tracking-tighter z-10">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface border border-outline-variant/50 text-on-surface text-sm font-bold rounded-full px-5 py-3 pr-10 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer shadow-sm min-w-[180px]"
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

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari produk berdasarkan nama atau kategori..."
          resultCount={searchQuery ? filteredAndSortedProducts.length : undefined}
        />

        {/* Category Filter Slide - Editorial Tabs */}
        <section className="relative overflow-visible z-10 border-b border-outline-variant/20 mb-6">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Kategori Produk
            </h2>
            {selectedCategoryId !== null && (
              <button
                onClick={() => setSelectedCategoryId(null)}
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-error transition-colors flex items-center gap-1 group"
              >
                <svg className="w-3 h-3 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                Reset Filter
              </button>
            )}
          </div>

          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mt-4">
            <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar pb-0">
              <button
                onClick={() => setSelectedCategoryId(null)}
                className={`pb-2 whitespace-nowrap px-1 transition-colors ${selectedCategoryId === null
                    ? "text-primary font-bold border-b-2 border-primary"
                    : "text-slate-500 font-medium hover:text-primary"
                  }`}
              >
                Semua Produk
              </button>
              {categories?.map((cat: any) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`pb-2 whitespace-nowrap px-1 transition-colors ${selectedCategoryId === cat.id
                      ? "text-primary font-bold border-b-2 border-primary"
                      : "text-slate-500 font-medium hover:text-primary"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="space-y-8">

          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5 h-64 animate-pulse space-y-4 shadow-sm">
                  <div className="flex justify-between">
                    <div className="w-12 h-12 bg-surface-container-high rounded-xl"></div>
                    <div className="w-10 h-4 bg-surface-container-high rounded"></div>
                  </div>
                  <div className="w-full h-6 bg-surface-container-high rounded"></div>
                  <div className="w-1/2 h-4 bg-surface-container-high rounded"></div>
                  <div className="pt-4 border-t border-outline-variant/20 mt-4 flex justify-between items-center">
                    <div className="w-20 h-6 bg-surface-container-high rounded"></div>
                    <div className="w-10 h-10 bg-surface-container-high rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : errorProducts ? (
            <div className="bg-error/10 border border-error/20 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-error shadow-sm mb-2">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-error">Failed to Load Products</h3>
              <p className="text-slate-500 max-w-md">{(errorProducts as any)?.message || "Something went wrong while fetching your inventory. Please check your connection."}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-error hover:bg-error/90 text-white px-6 py-2 rounded-xl font-bold transition-all mt-2 shadow-sm"
              >
                Try Again
              </button>
            </div>
          ) : filteredAndSortedProducts?.length === 0 ? (
            <div className="bg-surface-container-high border-2 border-dashed border-outline-variant/30 p-20 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 bg-surface rounded-3xl flex items-center justify-center text-slate-400 border border-outline-variant/20 shadow-sm">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-on-surface">No Products Found</h3>
                <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto">There are currently no products in this category.</p>
              </div>
              {selectedCategoryId !== null && (
                <button
                  onClick={() => setSelectedCategoryId(null)}
                  className="text-primary font-black text-xs uppercase tracking-widest hover:text-secondary transition-colors underline underline-offset-4"
                >
                  View All Products
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedProducts?.map((product: any) => (
                <ProductCard key={product.id} product={product} onEditStock={handleEditStock} />
              ))}
              {hasNextPage && (
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="col-span-full bg-primary/10 hover:bg-primary/20 text-primary font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isFetchingNextPage ? "Memuat..." : "Muat Lebih Banyak"}
                </button>
              )}
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
              <div className="flex items-center gap-4 p-4 bg-surface-container-high rounded-2xl border border-outline-variant/30">
                <div className="w-16 h-16 bg-white rounded-xl flex-shrink-0 overflow-hidden shadow-sm">
                  {selectedProduct.imgUrl && selectedProduct.imgUrl !== "coba" ? (
                    <img src={selectedProduct.imgUrl} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">{selectedProduct.name}</h3>
                  <p className="text-sm text-slate-500 capitalize">{selectedProduct.category?.name || "General"}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500 ml-1">Update Stock</label>
                <div className="relative group">
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-white border border-outline-variant/50 rounded-2xl px-5 py-4 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-xl font-bold shadow-sm"
                    placeholder="Masukkan jumlah stock"
                    min="0"
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                    Units
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Perubahan stock akan langsung memperbarui inventaris Anda. Pastikan jumlah yang dimasukkan sudah sesuai dengan fisik barang.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full cta-gradient disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
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
                className="w-full bg-surface-container hover:bg-surface-container-high text-slate-500 hover:text-on-surface font-semibold py-3 rounded-2xl transition-all"
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
      <BottomNavBar />
    </div>
  );
}
