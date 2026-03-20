"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8 text-center space-y-8">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-400 via-white to-indigo-400 bg-clip-text text-transparent animate-gradient">
          Kasir UMKM
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-medium">
          Solusi POS modern dan cerdas untuk memajukan bisnis UMKM Anda. 
          Kelola stok, pantau penjualan, dan buat laporan dalam satu genggaman.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/page/login"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
        >
          Mulai Sekarang
        </Link>
        <Link 
          href="/page/dashboard"
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-8 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
        >
          Buka Dashboard
        </Link>
      </div>

      <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-left">
         {[
           { title: "Manajemen Stok", desc: "Pantau ketersediaan barang secara real-time dengan peringatan stok rendah." },
           { title: "Laporan Penjualan", desc: "Dapatkan analisis mendalam tentang performa bisnis Anda setiap harinya." },
           { title: "Mudah Digunakan", desc: "Antarmuka yang bersih dan intuitif, dirancang khusus untuk kenyamanan Anda." }
         ].map((feature, i) => (
           <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-2">
             <h3 className="text-xl font-bold text-indigo-400">{feature.title}</h3>
             <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
           </div>
         ))}
      </div>
      
      <footer className="pt-20 text-slate-600 text-sm">
        &copy; 2026 Kasir UMKM. Made with &hearts; for UMKM Indonesia.
      </footer>
    </div>
  );
}
