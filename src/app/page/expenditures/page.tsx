"use client";

import React, { useMemo, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import BottomNavBar from "@/app/components/bottomNavBar";
import TableExpenditures from "./component/tableExpenditures";
import ModalExpenditures from "./component/modalExpenditures";
import ModalEditExpenditures from "./component/modalEditExpenditures";
import { Expenditure } from "@/service/api.types";
import { Plus } from "lucide-react";
import { useExpenditures } from "@/app/hook/useExp";
import ModalAlert from "@/app/components/modalAlert";
import ModalConfirm from "@/app/components/modalConfirm";
import SearchBar from "@/app/components/SearchBar";

export default function ExpendituresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    expenditures,
    isLoadingExpenditures,
    errorExpenditures,
    deleteExpenditure,
    isDeleting,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useExpenditures(searchQuery);

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Expenditure | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "delete";
    deleteId?: string;
  }>({ isOpen: false, type: "delete" });

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });

  const handleEdit = (item: Expenditure) => {
    setSelectedItem(item);
    setIsModalEditOpen(true);
  };
  const handleConfirm = async () => {
    try {
      if (confirmModal.type === "delete" && confirmModal.deleteId) {
        await deleteExpenditure(confirmModal.deleteId);
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

  const handleDelete = (id: number) => {
    setConfirmModal({ isOpen: true, type: "delete", deleteId: String(id) });
  };



  return (
    <div className="min-h-screen bg-surface text-on-surface flex overflow-x-hidden font-body">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-4 lg:p-8 space-y-8 pb-20 max-w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
              PENGELUARAN
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Kelola catatan pengeluaran harian toko Anda.
            </p>
          </div>
          <button
            onClick={() => setIsModalAddOpen(true)}
            className="group relative px-8 py-4 cta-gradient text-white rounded-2xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <Plus className="w-5 h-5" />
            Tambah Pengeluaran
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari pengeluaran berdasarkan nama atau catatan..."
        />

        {/* Content */}
        <section className="space-y-6">
          {isLoadingExpenditures ? (
            <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-8 space-y-4 animate-pulse">
              <div className="h-10 bg-surface-container-high rounded-lg w-full" />
              <div className="h-16 bg-surface-container-highest rounded-lg w-full" />
              <div className="h-16 bg-surface-container-highest rounded-lg w-full" />
            </div>
          ) : errorExpenditures ? (
            <div className="bg-error/10 border border-error/20 p-8 rounded-2xl text-center">
              <p className="text-error font-bold">Error memuat data pengeluaran</p>
              <p className="text-slate-500 text-sm">{(errorExpenditures as any)?.message}</p>
            </div>
          ) : (
            <>
              <TableExpenditures
                expenditures={expenditures}
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
        <ModalExpenditures
          isOpen={isModalAddOpen}
          onClose={() => setIsModalAddOpen(false)}
          onSuccess={() => {
            setAlertModal({
              isOpen: true,
              type: "success",
              title: "Berhasil!",
              message: "Pengeluaran berhasil ditambahkan.",
            });
          }}
        />
        <ModalEditExpenditures
          isOpen={isModalEditOpen}
          onClose={() => setIsModalEditOpen(false)}
          expenditure={selectedItem}
          onSuccess={() => {
            setAlertModal({
              isOpen: true,
              type: "success",
              title: "Berhasil!",
              message: "Pengeluaran berhasil diupdate.",
            });
          }}
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
      </main>
      <BottomNavBar />
    </div>
  );
}
