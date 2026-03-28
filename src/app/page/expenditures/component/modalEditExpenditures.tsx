"use client";

import React, { useEffect, useState } from "react";
import { Expenditure, UpdateExpenditureDTO } from "@/service/expService";
import { X } from "lucide-react";
import { useExpenditures } from "@/app/hook/useExp";

interface ModalEditExpendituresProps {  
  isOpen: boolean;
  onClose: () => void;
  expenditure: Expenditure | null;
  onSuccess: () => void;
}

export default function ModalEditExpenditures({ isOpen, onClose, expenditure, onSuccess }: ModalEditExpendituresProps) {
  const { updateExpenditure, isUpdating } = useExpenditures();
  const [form, setForm] = useState({ name: "", price: "", note: "" });

  useEffect(() => {
    if (expenditure) {
      setForm({
        name: expenditure.name,
        price: String(expenditure.price),
        note: expenditure.note || "",
      });
    }
  }, [expenditure]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenditure) return;

    const data: UpdateExpenditureDTO = {
      name: form.name,
      price: Number(form.price),
      note: form.note,
    };

    updateExpenditure(
      { id: String(expenditure.id), data },
      {
        onSuccess: () => {
          onSuccess();
          onClose();
        },
        onError: (err: any) => {
          alert("Error: " + err.message);
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Edit Pengeluaran</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Pengeluaran</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Contoh: Beli gula pasir"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Harga (Rp)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              min={0}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="15000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Catatan</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              placeholder="Opsional: catatan tambahan"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium disabled:opacity-50 transition-colors"
            >
              {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
