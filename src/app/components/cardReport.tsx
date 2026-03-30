import React from "react";

import { Trash2, ShoppingCart, CalendarDays, Clock } from "lucide-react";
import { ReportItem } from "@/service/api.types";

interface CardReportProps {
  report: ReportItem;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export default function CardReport({ report, onDelete, isDeleting }: CardReportProps) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 transition-all hover:shadow-md">
      {/* Header: Tanggal & Tombol Hapus */}
      <div className="flex justify-between items-center border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600 font-medium">
            {new Date(report.date).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(String(report.id))}
            disabled={isDeleting}
            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors disabled:opacity-50"
            title="Hapus Laporan"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Badge: Period Type & Total Orders */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
          {report.periodType}
        </span>
        <span className="text-xs font-medium bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full flex items-center gap-1">
          <ShoppingCart size={12} />
          {report.totalOrders} Pesanan
        </span>
      </div>

      {/* Pemasukan & Pengeluaran */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50/60 p-3 rounded-xl">
          <p className="text-xs text-green-600/80 font-medium mb-1">Pemasukan</p>
          <p className="font-semibold text-green-700">Rp {report.totalIncome.toLocaleString("id-ID")}</p>
        </div>
        <div className="bg-red-50/60 p-3 rounded-xl">
          <p className="text-xs text-red-600/80 font-medium mb-1">Pengeluaran</p>
          <p className="font-semibold text-red-700">Rp {report.totalExpense.toLocaleString("id-ID")}</p>
        </div>
      </div>

      {/* Laba Bersih */}
      <div className="bg-blue-50/60 p-3 rounded-xl flex justify-between items-center">
        <p className="text-sm text-blue-800/80 font-medium">Laba Bersih</p>
        <p className="font-bold text-lg text-blue-700">Rp {report.netProfit.toLocaleString("id-ID")}</p>
      </div>

      {/* Produk Terlaris */}
      {report.topProductsData && report.topProductsData.length > 0 && (
        <div className="mt-1">
          <p className="text-xs font-medium text-gray-700 mb-2">🏆 Produk Terlaris</p>
          <div className="flex flex-col gap-1.5">
            {report.topProductsData.map((product, idx) => (
              <div
                key={product.productId}
                className="flex items-center justify-between bg-gray-50/80 px-3 py-2 rounded-lg text-xs"
              >
                <span className="text-gray-700 font-medium">
                  {idx + 1}. {product.name}
                </span>
                <span className="text-gray-500 font-semibold">{product.quantity}x terjual</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer: Waktu dibuat */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-1 pt-2 border-t border-gray-50">
        <Clock size={12} />
        <span>
          Dibuat: {new Date(report.createdAt).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}
        </span>
        {report.updatedAt !== report.createdAt && (
          <>
            <span className="mx-1">•</span>
            <span>
              Diperbarui: {new Date(report.updatedAt).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
