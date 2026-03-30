import React from "react";
import { Pencil, Trash2, Wallet } from "lucide-react";
import { Expenditure } from "@/service/api.types";

interface TableExpendituresProps {
  expenditures: Expenditure[];
  onEdit: (item: Expenditure) => void;
  onDelete: (id: number) => void;
}

export default function TableExpenditures({ expenditures, onEdit, onDelete }: TableExpendituresProps) {
  if (expenditures.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center">
        <div className="bg-gray-50 rounded-full p-4 mb-3">
          <Wallet className="text-gray-400" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Belum ada pengeluaran</h3>
        <p className="text-gray-500 max-w-sm mx-auto mt-2">
          Catat pengeluaran harian Anda untuk memantau arus kas keluar toko.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container border border-outline-variant/30 rounded-2xl overflow-hidden">
      {/* Table header (desktop) */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-surface-container-high text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <div className="col-span-1">#</div>
        <div className="col-span-3">Nama</div>
        <div className="col-span-2">Harga</div>
        <div className="col-span-3">Catatan</div>
        <div className="col-span-2">Tanggal</div>
        <div className="col-span-1 text-right">Aksi</div>
      </div>

      {/* Rows */}
      {expenditures.map((item, idx) => (
        <div
          key={item.id}
          className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 border-t border-outline-variant/20 hover:bg-surface-container-high/50 transition-colors items-center"
        >
          {/* Mobile layout */}
          <div className="md:hidden flex flex-col gap-2 w-full">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm font-bold text-red-600 mt-0.5">Rp {item.price.toLocaleString("id-ID")}</p>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => onEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Pencil size={16} />
                </button>
                <button onClick={() => onDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {item.note && <p className="text-xs text-slate-500">{item.note}</p>}
            <p className="text-[11px] text-slate-400">
              {new Date(item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:block col-span-1 text-sm text-slate-500">{idx + 1}</div>
          <div className="hidden md:block col-span-3 font-medium text-gray-900 text-sm">{item.name}</div>
          <div className="hidden md:block col-span-2 text-sm font-semibold text-red-600">Rp {item.price.toLocaleString("id-ID")}</div>
          <div className="hidden md:block col-span-3 text-sm text-slate-500 truncate">{item.note || "-"}</div>
          <div className="hidden md:block col-span-2 text-sm text-slate-400">
            {new Date(item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
          </div>
          <div className="hidden md:flex col-span-1 justify-end gap-1">
            <button onClick={() => onEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Pencil size={16} />
            </button>
            <button onClick={() => onDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
