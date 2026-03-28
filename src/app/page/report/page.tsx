"use client";

import React, { useState } from "react";
import { useReport } from "../../hook/useReport";
import CardReport from "../../components/cardReport";
import ModalAlert from "@/app/components/modalAlert";
import { PlusCircle, FileText, ArrowRight } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import BottomNavBar from "@/app/components/bottomNavBar";
import ModalConfirm from "@/app/components/modalConfirm";

export default function ReportPage() {
  const { reports, isLoadingReports, generateDaily, isGenerating, deleteReport, isDeleting } = useReport();

  // Confirm modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "generate" | "delete";
    deleteId?: string;
  }>({ isOpen: false, type: "generate" });

  // Alert modal state
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });

  const openGenerateConfirm = () => {
    setConfirmModal({ isOpen: true, type: "generate" });
  };

  const openDeleteConfirm = (id: string) => {
    setConfirmModal({ isOpen: true, type: "delete", deleteId: id });
  };

  const handleConfirm = async () => {
    try {
      if (confirmModal.type === "generate") {
        const result = await generateDaily();
        setConfirmModal({ isOpen: false, type: "generate" });
        setAlertModal({
          isOpen: true,
          type: "success",
          title: "Berhasil!",
          message: result?.message || "Laporan harian berhasil di-generate.",
        });
      } else if (confirmModal.type === "delete" && confirmModal.deleteId) {
        await deleteReport(confirmModal.deleteId);
        setConfirmModal({ isOpen: false, type: "generate" });
        setAlertModal({
          isOpen: true,
          type: "success",
          title: "Dihapus!",
          message: "Laporan berhasil dihapus.",
        });
      }
    } catch (err: any) {
      setConfirmModal({ isOpen: false, type: "generate" });
      setAlertModal({
        isOpen: true,
        type: "error",
        title: "Gagal!",
        message: err.message || "Terjadi kesalahan, silakan coba lagi.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex overflow-x-hidden font-body">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-4 lg:p-8 space-y-8 pb-20 max-w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
              LAPORAN
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Kelola dan pantau laporan harian (Tutup Buku) Anda.
            </p>
          </div>
          <button
            onClick={openGenerateConfirm}
            disabled={isGenerating}
            className="group relative px-8 py-4 cta-gradient text-white rounded-2xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <PlusCircle className="w-5 h-5" />
            Tutup Buku Hari Ini
          </button>
        </div>

        {/* Content */}
        <section>
          {isLoadingReports ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 animate-pulse h-48" />
              ))}
            </div>
          ) : reports && reports.length > 0 ? (
            <div className="flex flex-col gap-4">
              {reports.map((report) => (
                <CardReport
                  key={report.id}
                  report={report}
                  onDelete={openDeleteConfirm}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center">
              <div className="bg-gray-50 rounded-full p-4 mb-3">
                <FileText className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Belum ada laporan</h3>
              <p className="text-gray-500 max-w-sm mx-auto mt-2">
                Anda belum pernah melakukan tutup buku. Klik tombol di atas untuk mulai merekam laporan keuangan.
              </p>
              <button
                onClick={openGenerateConfirm}
                disabled={isGenerating}
                className="mt-6 text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700 transition-colors cursor-pointer"
              >
                Mulai tutup buku pertama Anda <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>

        {/* Modal Konfirmasi */}
        <ModalConfirm
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ isOpen: false, type: "generate" })}
          onConfirm={handleConfirm}
          isLoading={confirmModal.type === "generate" ? isGenerating : isDeleting}
          title={
            confirmModal.type === "generate"
              ? "Tutup Buku Hari Ini?"
              : "Hapus Laporan?"
          }
          message={
            confirmModal.type === "generate"
              ? "Sistem akan menghitung total pemasukan, pengeluaran, dan laba hari ini. Jika sudah pernah tutup buku, data akan diperbarui."
              : "Laporan yang dihapus tidak bisa dikembalikan. Apakah Anda yakin?"
          }
          confirmText={confirmModal.type === "generate" ? "Ya, Tutup Buku" : "Ya, Hapus"}
        />

        {/* Modal Alert */}
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
