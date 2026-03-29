"use client";

import { useMemo, useState } from "react";
import { useGetOrder } from "@/app/hook/useOrder";
import OrderCard from "@/app/components/OrderCard";
import Sidebar from "@/app/components/Sidebar";
import { LucideListOrdered, LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import BottomNavBar from "@/app/components/bottomNavBar";
import SearchBar from "@/app/components/SearchBar";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    orders,
    isLoading,
    isError: error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetOrder(searchQuery);


  return (
    <div className="min-h-screen bg-surface text-on-surface flex overflow-x-hidden font-body">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 space-y-8 pb-20 max-w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
              PESANAN
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Kelola dan pantau riwayat transaksi Anda.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari pesanan berdasarkan ID, hari, produk, atau metode bayar..."
        />

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
      </main>

      {/* Mobile Nav Overlay */}
      <BottomNavBar />
    </div>
  );
}
