"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/service/authService";
import Sidebar from "@/app/components/Sidebar";
import TableProducts from "./component/tableProducts";
import ModalTambahProducts from "./component/modalTambahProducts";
import ModalEditProducts from "./component/modalEditProducts";
import { useGetProducts, useDeleteProduct } from "@/app/hook/useProduct";
import { useQueryClient } from "@tanstack/react-query";
import BottomNavBar from "@/app/components/bottomNavBar";

export default function ProductPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // States for Modals
  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // TanStack Query Hooks
  const { data: products, isLoading: isProductsLoading, isError, error } = useGetProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    const userData = authService.getUser();
    if (!userData) {
      router.push("/page/login");
    } else {
      setUser(userData);
      setIsAuthLoading(false);
    }
  }, [router]);

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsModalEditOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["products"] });
          alert("Product deleted successfully!");
        },
        onError: (err: any) => {
          alert("Error: " + err.message);
        }
      });
    }
  };

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
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Product Management
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              Create, update, and manage your inventory items.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setIsModalTambahOpen(true)}
               className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20 active:scale-95 text-sm"
             >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tambah Produk
             </button>
          </div>
        </header>

        {/* Table Section */}
        <section>
          {isProductsLoading ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-4 animate-pulse">
                <div className="h-10 bg-slate-800 rounded-lg w-full"></div>
                <div className="h-20 bg-slate-800/50 rounded-lg w-full"></div>
                <div className="h-20 bg-slate-800/50 rounded-lg w-full"></div>
                <div className="h-20 bg-slate-800/50 rounded-lg w-full"></div>
            </div>
          ) : isError ? (
            <div className="bg-rose-500/10 border border-rose-500/20 p-8 rounded-2xl text-center">
                <p className="text-rose-400 font-bold">Error loading products</p>
                <p className="text-slate-500 text-sm">{(error as any)?.message}</p>
            </div>
          ) : (
            <TableProducts 
              products={products || []} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>

        {/* Modals */}
        <ModalTambahProducts 
          isOpen={isModalTambahOpen} 
          onClose={() => setIsModalTambahOpen(false)} 
        />
        
        <ModalEditProducts 
          isOpen={isModalEditOpen} 
          onClose={() => setIsModalEditOpen(false)} 
          product={selectedProduct}
        />

      </main>
      <BottomNavBar />
    </div>
  );
}
