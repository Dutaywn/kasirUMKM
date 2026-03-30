"use client";

import React, { useMemo, useState } from "react";
import { useReport } from "../../hook/useReport";
import CardReport from "../../components/cardReport";
import ModalAlert from "@/app/components/modalAlert";
import { PlusCircle, FileText, ArrowRight } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import BottomNavBar from "@/app/components/bottomNavBar";
import ModalConfirm from "@/app/components/modalConfirm";
import SearchBar from "@/app/components/SearchBar";

export default function ReportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [periodType, setPeriodType] = useState("");

  // Generation Modal States
  const [genStartDate, setGenStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [genEndDate, setGenEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [genPeriodType, setGenPeriodType] = useState("DAILY");

  const {
    reports,
    isLoadingReports,
    generateReport,
    isGenerating,
    deleteReport,
    isDeleting,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReport({
    search: searchQuery,
    startDate,
    endDate,
    period : periodType,
  });

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
        const result = await generateReport({
          startDate: genStartDate,
          endDate: genEndDate,
          periodType: genPeriodType,
        });
        setConfirmModal({ isOpen: false, type: "generate" });
        setAlertModal({
          isOpen: true,
          type: "success",
          title: "Berhasil!",
          message: result?.message || "Laporan berhasil di-generate.",
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
              Kelola dan pantau laporan keuangan periodik Anda.
            </p>
          </div>
          <button
            onClick={openGenerateConfirm}
            disabled={isGenerating}
            className="group relative px-8 py-4 cta-gradient text-white rounded-2xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <PlusCircle className="w-5 h-5" />
            Generate Laporan Baru
          </button>
        </div>

        {/* Filters & Search */}
        <div className="space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari laporan..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Period Type */}
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block ml-2">Tipe Periode</label>
              <select
                value={periodType}
                onChange={(e) => setPeriodType(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              >
                <option value="">Semua Tipe</option>
                <option value="DAILY">Harian (DAILY)</option>
                <option value="WEEKLY">Mingguan (WEEKLY)</option>
                <option value="MONTHLY">Bulanan (MONTHLY)</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block ml-2">Dari Tanggal</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block ml-2">Sampai Tanggal</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
            
            <div className="flex items-end">
               {(periodType || startDate || endDate) && (
                <button 
                  onClick={() => {
                    setPeriodType("");
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="mb-3 text-xs text-primary font-bold hover:underline ml-2"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="space-y-6">
          {isLoadingReports ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 animate-pulse h-48" />
              ))}
            </div>
          ) : reports && reports.length > 0 ? (
            <>
              <div className="flex flex-col gap-4">
                {reports.map((report: any) => (
                  <CardReport
                    key={report.id}
                    report={report}
                    onDelete={openDeleteConfirm}
                    isDeleting={isDeleting}
                  />
                ))}
              </div>

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

        {/* Custom Generate Modal */}
        {confirmModal.isOpen && confirmModal.type === "generate" && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 text-gray-900">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
               <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <PlusCircle size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Generate Laporan</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase font-bold text-slate-400 mb-1 block ml-1">Tipe Periode</label>
                      <select 
                        value={genPeriodType}
                        onChange={(e) => setGenPeriodType(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      >
                        <option value="DAILY">Harian (DAILY)</option>
                        <option value="WEEKLY">Mingguan (WEEKLY)</option>
                        <option value="MONTHLY">Bulanan (MONTHLY)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase font-bold text-slate-400 mb-1 block ml-1">Dari Tanggal</label>
                        <input 
                          type="date"
                          value={genStartDate}
                          onChange={(e) => setGenStartDate(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase font-bold text-slate-400 mb-1 block ml-1">Sampai Tanggal</label>
                        <input 
                          type="date"
                          value={genEndDate}
                          onChange={(e) => setGenEndDate(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                      </div>
                    </div>
                    
                    <p className="text-[11px] text-slate-500 mt-2 italic px-1">
                      * Sistem akan menghitung total pemasukan, pengeluaran, dan laba untuk periode yang dipilih.
                    </p>
                  </div>

                  <div className="flex gap-3 mt-8">
                     <button
                        onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                        className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
                     >
                       Batal
                     </button>
                     <button
                        onClick={handleConfirm}
                        disabled={isGenerating}
                        className="flex-1 py-3 cta-gradient text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                     >
                       {isGenerating ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
                       ) : <FileText size={18} />}
                       {isGenerating ? "Memproses..." : "Generate"}
                     </button>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Modal Konfirmasi Delete */}
        {confirmModal.isOpen && confirmModal.type === "delete" && (
          <ModalConfirm
            isOpen={confirmModal.isOpen}
            onClose={() => setConfirmModal({ isOpen: false, type: "generate" })}
            onConfirm={handleConfirm}
            isLoading={isDeleting}
            title="Hapus Laporan?"
            message="Laporan yang dihapus tidak bisa dikembalikan. Apakah Anda yakin?"
            confirmText="Ya, Hapus"
          />
        )}

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
