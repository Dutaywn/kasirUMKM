"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/service/authService";
import TableProducts from "./component/tableProducts";
import ModalTambahProducts from "./component/modalTambahProducts";
import ModalEditProducts from "./component/modalEditProducts";
import ModalConfirm from "@/app/components/modalConfirm";
import ModalAlert from "@/app/components/modalAlert";
import SearchBar from "@/app/components/SearchBar";
import { useProduct } from "@/app/hook/useProduct";
import MainLayout from "@/app/components/MainLayout";

export default function ProductPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // States for Modals
  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // TanStack Query Hooks
  const {
    products,
    isLoadingProducts,
    errorProducts,
    deleteProduct,
    isDeleting,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProduct(searchQuery);

  // Confirm modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "delete";
    deleteId?: string;
  }>({ isOpen: false, type: "delete" });

  // Alert modal state
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });

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
    setConfirmModal({ isOpen: true, type: "delete", deleteId: id });
  };

  const handleConfirm = async () => {
    try {
      if (confirmModal.type === "delete" && confirmModal.deleteId) {
        await deleteProduct(confirmModal.deleteId);
        setConfirmModal({ isOpen: false, type: "delete" });
        setAlertModal({
          isOpen: true,
          type: "success",
          title: "Dihapus!",
          message: "Produk berhasil dihapus.",
        });
      }
    } catch (err: any) {
      setConfirmModal({ isOpen: false, type: "delete" });
      setAlertModal({
        isOpen: true,
        type: "error",
        title: "Gagal!",
        message: err.message || "Terjadi kesalahan, silakan coba lagi.",
      });
    }
  };

  return (
    <MainLayout
      title="PRODUCT MANAGEMENT"
      subtitle="Update and organize your inventory."
      headerActions={
        <button
          onClick={() => setIsModalTambahOpen(true)}
          className="group relative px-8 py-4 cta-gradient text-white rounded-2xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </button>
      }
    >
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Cari produk berdasarkan nama atau kategori..."
      />

      {/* Table Section */}
      <section className="space-y-6">
        {isLoadingProducts ? (
          <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-8 space-y-4 animate-pulse">
            <div className="h-10 bg-surface-container-high rounded-lg w-full"></div>
            <div className="h-20 bg-surface-container-highest rounded-lg w-full"></div>
            <div className="h-20 bg-surface-container-highest rounded-lg w-full"></div>
            <div className="h-20 bg-surface-container-highest rounded-lg w-full"></div>
          </div>
        ) : errorProducts ? (
          <div className="bg-error/10 border border-error/20 p-8 rounded-2xl text-center">
            <p className="text-error font-bold">Error loading products</p>
            <p className="text-slate-500 text-sm">{(errorProducts as any)?.message}</p>
          </div>
        ) : (
          <>
            <TableProducts
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            
            {hasNextPage && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-8 py-3 bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold rounded-xl transition-all border border-primary/20 disabled:opacity-50 flex items-center gap-2"
                >
                  {isFetchingNextPage ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      Memuat...
                    </>
                  ) : (
                    "Muat Lebih Banyak"
                  )}
                </button>
              </div>
            )}
          </>
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

      <ModalConfirm
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, type: "delete" })}
        onConfirm={handleConfirm}
        isLoading={isDeleting}
        title="Hapus Produk?"
        message="Produk yang dihapus tidak bisa dikembalikan. Apakah Anda yakin?"
        confirmText="Ya, Hapus"
      />

      <ModalAlert
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
      />
    </MainLayout>
  );
}
