"use client";

import { useMemo, useState } from "react";
import { useGetOrder } from "@/app/hook/useOrder";
import OrderCard from "@/app/components/OrderCard";
import { LucideListOrdered } from "lucide-react";
import SearchBar from "@/app/components/SearchBar";
import MainLayout from "@/app/components/MainLayout";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    orders,
    isLoading,
    isError: error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetOrder({
    search: searchQuery,
    paymentStatus,
    paymentMethod,
    startDate,
    endDate,
  });


  return (
    <MainLayout
      title="PESANAN"
      subtitle="Kelola dan pantau riwayat transaksi Anda."
    >
      {/* Filters & Search */}
      <div className="space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari pesanan (ID, Nama Pelanggan, Produk)..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Payment Status */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block ml-2">Status Bayar</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            >
              <option value="">Semua Status</option>
              <option value="PAID">Lunas (PAID)</option>
              <option value="PENDING">Menunggu (PENDING)</option>
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block ml-2">Metode Bayar</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            >
              <option value="">Semua Metode</option>
              <option value="CASH">Tunai (CASH)</option>
              <option value="QRIS">QRIS</option>
              <option value="TRANSFER">Transfer</option>
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
        </div>
        
        {(paymentStatus || paymentMethod || startDate || endDate) && (
           <button 
            onClick={() => {
              setPaymentStatus("");
              setPaymentMethod("");
              setStartDate("");
              setEndDate("");
            }}
            className="text-xs text-primary font-bold hover:underline ml-2 cursor-pointer"
           >
             Reset Filter
           </button>
        )}
      </div>

      {/* Content */}
      <section className="space-y-6">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 animate-pulse h-48" />
            ))}
          </div>
        ) : error ? (
          <div className="bg-error/10 border border-error/20 p-8 rounded-2xl text-center">
            <p className="text-error font-bold">Error memuat data pesanan</p>
            <p className="text-slate-500 text-sm">Terjadi kesalahan pada server.</p>
          </div>
        ) : orders?.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center">
            <div className="bg-gray-50 rounded-full p-4 mb-3">
              <LucideListOrdered className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Belum ada pesanan</h3>
            <p className="text-gray-500 max-w-sm mx-auto mt-2">
              Riwayat transaksi Anda masih kosong. Mulai lakukan penjualan untuk melihatnya di sini.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {orders?.map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            {hasNextPage && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-8 py-3 bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold rounded-xl transition-all border border-primary/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
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
    </MainLayout>
  );
}
