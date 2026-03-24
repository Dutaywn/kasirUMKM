"use client";

import React, { useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetOrderById } from "@/app/hook/useOrder";
import { 
  Printer, 
  ArrowLeft, 
  CheckCircle2, 
  Package, 
  CreditCard, 
  Calendar, 
  User, 
  ShoppingBag,
  LucideListOrdered
} from "lucide-react";
import Link from "next/link";

export default function NotaPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: order, isLoading, error } = useGetOrderById(id as string);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-indigo-500/20"></div>
        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] animate-pulse">Menyiapkan Nota...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-8 text-center max-w-sm">
          <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/30 text-rose-500 font-bold text-2xl">!</div>
          <h2 className="text-white font-black text-xl mb-2 tracking-tight">Nota Tidak Ditemukan</h2>
          <p className="text-slate-400 text-sm mb-6 font-medium">Maaf, data transaksi tidak dapat ditemukan atau terjadi kesalahan koneksi.</p>
          <button 
            onClick={() => router.push("/page/dashboard")}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold border border-slate-800 hover:bg-slate-800 transition-all"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  const date = new Date(order.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20 print:bg-white print:text-black">
      {/* Top Navbar (Hidden in print) */}
      <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 print:hidden">
        <div className="max-w-3xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/page/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white font-bold transition-all group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            DASHBOARD
          </Link>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                <ShoppingBag size={18} />
             </div>
             <span className="font-black italic text-white tracking-widest text-sm uppercase">Nota Digital</span>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-12 print:p-0 print:m-0 print:max-w-none">
         {/* Success Message Area (Hidden in print) */}
         <div className="text-center mb-10 print:hidden space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 text-emerald-500 animate-in zoom-in-50 duration-500">
               <CheckCircle2 size={32} />
            </div>
            <h1 className="text-3xl font-black text-white italic tracking-tight uppercase">Transaksi Berhasil!</h1>
            <p className="text-slate-500 font-medium italic">Nota transaksi Anda telah dibuat di bawah ini.</p>
         </div>

         {/* The Nota (The part to be printed) */}
         <div className="bg-white text-slate-900 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 p-8 md:p-12 relative overflow-hidden print:shadow-none print:rounded-none print:p-0">
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[40px] rounded-full -mr-16 -mt-16 print:hidden" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 blur-[40px] rounded-full -ml-16 -mb-16 print:hidden" />

            {/* Receipt Header */}
            <div className="text-center space-y-2 mb-10 relative">
               <h2 className="text-2xl font-black italic tracking-tighter uppercase text-indigo-600">Kasir UMKM</h2>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bukti Pembayaran Sah • {order.paymentStatus}</p>
               <div className="flex items-center justify-center gap-4 mt-6 print:mt-4">
                  <div className="h-px bg-slate-100 flex-1" />
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                  <div className="h-px bg-slate-100 flex-1" />
               </div>
            </div>

            {/* Transaction metadata */}
            <div className="grid grid-cols-2 gap-8 mb-10 text-[11px] font-bold uppercase tracking-wide text-slate-500">
               <div className="space-y-4">
                  <div className="space-y-1">
                     <span className="text-indigo-400 block font-black mb-1">Nomor Nota</span>
                     <span className="text-slate-900 text-sm font-black">#ORD-{order.id}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-indigo-400 block font-black mb-1">Kasir / Admin</span>
                     <span className="text-slate-900 flex items-center gap-2">
                        <User size={12} className="text-slate-300" />
                        Admin Kasir
                     </span>
                  </div>
               </div>
               <div className="space-y-4 text-right">
                  <div className="space-y-1">
                     <span className="text-indigo-400 block font-black mb-1">Tanggal & Waktu</span>
                     <span className="text-slate-900 flex items-center justify-end gap-2">
                        <Calendar size={12} className="text-slate-300" />
                        {date}
                     </span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-indigo-400 block font-black mb-1">Metode Bayar</span>
                     <span className="text-slate-900 flex items-center justify-end gap-2">
                        <CreditCard size={12} className="text-slate-300" />
                        {order.paymentMethod}
                     </span>
                  </div>
               </div>
            </div>

            {/* Items List */}
            <div className="mb-10">
               <table className="w-full">
                  <thead>
                     <tr className="border-b border-slate-100 italic text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <th className="text-left pb-4">Produk</th>
                        <th className="text-center pb-4">Qty</th>
                        <th className="text-right pb-4">Harga</th>
                        <th className="text-right pb-4">Subtotal</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 border-b border-slate-100">
                     {order.items?.map((item: any) => (
                        <tr key={item.id} className="text-sm font-medium">
                           <td className="py-5 font-black text-slate-900">{item.product.name}</td>
                           <td className="py-5 text-center text-slate-500 font-bold">{item.quantity}</td>
                           <td className="py-5 text-right text-slate-500 tabular-nums">Rp {item.priceAtPurchase.toLocaleString()}</td>
                           <td className="py-5 text-right font-black text-slate-900 tabular-nums">Rp {(item.priceAtPurchase * item.quantity).toLocaleString()}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Total Footer */}
            <div className="flex flex-col items-end gap-2 mb-10 pt-4 relative">
               <div className="flex justify-between w-full max-w-[240px] text-xs font-bold text-slate-400 italic">
                  <span>Grand Total</span>
                  <span className="text-slate-900">Rp {order.totalAmount.toLocaleString()}</span>
               </div>
               <div className="flex justify-between w-full max-w-[240px] items-end border-t-2 border-slate-900 pt-4 mt-2">
                  <span className="text-indigo-600 font-black italic tracking-tighter text-lg uppercase">Total Akhir</span>
                  <span className="text-3xl font-black italic text-slate-900 tracking-tighter tabular-nums">
                     Rp {order.totalAmount.toLocaleString()}
                  </span>
               </div>
            </div>

            {/* Footer Text */}
            <div className="text-center space-y-2 relative">
               <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px bg-slate-100 flex-1" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <div className="h-px bg-slate-100 flex-1" />
               </div>
               <p className="text-[11px] font-black uppercase text-indigo-400 tracking-[0.2em] italic underline underline-offset-4">Terima Kasih Atas Kunjungan Anda</p>
               <p className="text-[10px] font-bold text-slate-400 italic">Pesanan Anda telah kami proses dengan penuh kasih sayang.</p>
            </div>
         </div>

         {/* Post-receipt Actions (Hidden in print) */}
         <div className="mt-12 grid grid-cols-2 gap-6 print:hidden">
            <button 
               onClick={handlePrint}
               className="bg-indigo-600 hover:bg-indigo-500 text-white p-5 rounded-[2rem] font-black transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 uppercase tracking-widest group active:scale-95"
            >
               <Printer size={20} className="group-hover:scale-110 transition-transform" />
               Cetak Nota
            </button>
            <Link 
               href="/page/orders"
               className="bg-slate-900 hover:bg-slate-800 text-white p-5 rounded-[2rem] font-black border border-slate-800 transition-all flex items-center justify-center gap-3 uppercase tracking-widest active:scale-95"
            >
               <LucideListOrdered size={20} />
               Lihat Pesanan
            </Link>
         </div>

         <div className="mt-8 text-center print:hidden">
            <Link href="/page/dashboard" className="text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-indigo-400 transition-colors">
               Kembali ke Halaman Utama Dashboard
            </Link>
         </div>
      </main>
    </div>
  );
}
