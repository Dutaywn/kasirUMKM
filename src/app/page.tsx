"use client";

import Link from "next/link";
import { 
  Sparkles, TrendingUp, Package, BarChart3, 
  ShieldCheck, Wallet, CreditCard, Gauge, 
  Check, Circle 
} from "lucide-react";

export default function LandingPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            display: flex;
            width: 200%;
            animation: marquee 30s linear infinite;
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 4s ease-in-out infinite;
        }
        .ambient-shadow {
            box-shadow: 0 32px 64px -12px rgba(26, 27, 34, 0.06);
        }
      `}} />

      <div className="bg-background text-on-surface selection:bg-brand-blue/20 font-sans min-h-screen">
        {/* TopNavBar */}
        <nav className="bg-surface/70 backdrop-blur-xl full-width top-0 sticky z-50 shadow-sm border-b border-outline-variant/20">
          <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
            <div className="text-xl font-extrabold tracking-tight text-primary">Kasir UMKM</div>
            <div className="hidden md:flex items-center gap-8">
              <a className="text-primary font-semibold border-b-2 border-primary transition-all duration-300" href="#beranda">Beranda</a>
              <a className="text-on-surface-variant hover:text-primary transition-all duration-300" href="#fitur">Fitur</a>
              <a className="text-on-surface-variant hover:text-primary transition-all duration-300" href="#keunggulan">Keunggulan</a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/page/login" className="hidden md:block text-on-surface-variant font-medium hover:text-primary transition-all">
                Masuk
              </Link>
              <Link href="/page/register" className="px-6 py-2.5 cta-gradient text-white rounded-full font-bold scale-105 transition-transform hover:opacity-90 shadow-lg">
                Daftar Gratis
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/50 text-primary text-sm font-semibold border border-blue-200">
                <Sparkles className="w-4 h-4" />
                Aplikasi Kasir Digital No. 1 di Indonesia
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
                Kelola Bisnis UMKM <span className="text-transparent bg-clip-text signature-gradient">Lebih Mudah</span>
                &amp; Cepat
              </h1>
              
              <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
                Solusi POS cerdas: pantau stok barang, terima berbagai metode pembayaran, lacak laba bersih, hingga login instan via SSO Google dalam satu platform.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/page/register" className="px-8 py-4 cta-gradient text-white rounded-full font-bold text-lg hover:scale-105 transition-transform ambient-shadow">
                  Coba Gratis Sekarang
                </Link>
                <Link href="/page/dashboard" className="px-8 py-4 bg-white border border-outline-variant text-on-surface rounded-full font-bold text-lg hover:bg-surface-container-low transition-all">
                  Demo Dashboard
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="relative z-10 ambient-shadow rounded-xl overflow-hidden transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  className="w-full h-auto" 
                  alt="Modern point of sale dashboard interface" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF7uLtmNhy8kyv5U85K1sGZeomJ530f6sgke21nOs_lkyEvWHYS6cnB9PgIKnbXKekNCnbcetm8MelvU-OLEvhpjLUd4WWlvDy6W1sS0htl_BrVwKc3irzUK9Yl68Uk5Qn7KUelAGcPsal08-LjJry77xS7X0ZmA_inQ9TbRfX838Wl_tdCX0OQ3Mr9-rrO6NsiPkftHJ52t6Aa4lJUVr71pCmvpCG2HmGLFZxnvQAKJgE1WQacqESrHPynnWS8fWnCETfvFS0L9U"
                />
              </div>              
            </div>
          </div>
        </section>
        {/* Features Section - Integrating Documentation Features */}
        <section className="py-30 px-8" id="fitur">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl font-extrabold text-on-surface">Fitur Cerdas untuk Bisnis Skala Penuh</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg hover:text-on-surface transition-colors">
                Bukan sekadar pencatat pesanan. Sistem ini dirancang mencakup manajemen produk, pengeluaran, hingga analitik bisnis ala ERP besar.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Fitur 1 */}
              <div className="p-10 rounded-[2rem] bg-white border border-outline-variant/30 hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Manajemen Stok & Kategori</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Kelola CRUD produk dan kelas kategorinya dengan mudah. Pantau terus ketersediaan barang secara riil dan terpusat dengan sistem notifikasi peringatan stok menipis otomatis.
                </p>
              </div>
              
              {/* Fitur 2 */}
              <div className="p-10 rounded-[2rem] bg-white border border-outline-variant/30 hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-secondary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Laporan & Pengeluaran</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Bukan hanya omzet, catat pengeluaran toko (beban operasional/utilitas) untuk mendapatkan angka laba bersih yang presisi pada laporan akhir bulan.
                </p>
              </div>

              {/* Fitur 3 */}
              <div className="p-10 rounded-[2rem] bg-white border border-outline-variant/30 hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-emerald-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Aman & SSO Integrations</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Login satu-klik aman pakai Single Sign-On (SSO) Google OAuth. Semua riwayat transaksi Anda tersimpan di Cloud Database terenkripsi dengan proteksi sesi JWT modern.
                </p>
              </div>

              {/* Fitur 4 (Large Card) */}
              <div className="md:col-span-2 p-10 rounded-[2rem] bg-indigo-950 text-white relative overflow-hidden group shadow-2xl">
                <div className="relative z-10 max-w-lg">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Proses Checkout Presisi & Komplit</h3>
                  <p className="text-indigo-200 text-lg leading-relaxed">
                    Keranjang belanja fleksibel dan kalkulasi akurat. Fasilitasi pelanggan dengan berbagai opsi pembayaran terlengkap: mulai dari Tunai (Cash), Transfer Bank, hingga sinkronisasi instan via QRIS ke e-Wallet & M-Banking.
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 lg:right-4 lg:bottom-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700">
                  <CreditCard className="w-64 h-64 md:w-96 md:h-96" strokeWidth={1} />
                </div>
              </div>

              {/* Fitur 5 */}
              <div className="p-10 rounded-[2rem] bg-white border border-outline-variant/30 hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Gauge className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Dashboard POS Super Responsif</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Aksi tanpa jeda berkat TanStack React Query 5 & Redux. Side-drawer *cart* modern akan mempercepat pelayanan antrean di kasir tanpa full-reload!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* App Preview Section */}
        <section className="py-32 bg-indigo-950 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-800/40 via-transparent to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">Antarmuka Bento-Grid yang Simpel & Keren</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400">
                      <Check className="w-5 h-5" />
                    </div>
                    <p className="text-indigo-100 text-lg">UX Pengaturan (Settings) responsif bergaya kotak bento asimetris canggih.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400">
                      <Check className="w-5 h-5" />
                    </div>
                    <p className="text-indigo-100 text-lg">Pencarian kilat & filter barang dagangan yang akurat.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400">
                      <Check className="w-5 h-5" />
                    </div>
                    <p className="text-indigo-100 text-lg">Dirancang khusus untuk mengakomodasi rutinitas pemilik usaha lokal Indonesia.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative flex justify-center items-center h-full">
                <div className="relative z-20 w-full max-w-sm ambient-shadow rounded-3xl border-8 border-slate-900 overflow-hidden transform lg:-rotate-6 hover:rotate-0 transition-all duration-500">
                  <img 
                    className="w-full h-auto" 
                    alt="Close-up of a mobile smartphone POS view" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBAq6tar0zn7dfI1mUNpOsI0bjCWee8csbNcxJ7perwXOZl0GNMpGPcADSY1vTUXEnup1UHGOLEFleEYskRde-P73jRMQe0vDxydglhUsOkco_rwa1lWhXBbnRC22s4J7UZlnKjob014UY_ClWOUfvjVYn6jJgQ0aN6ideYQYedYFfHOcdRMcEZggvgqt-aqJbRhZ7OZ-3nIdU9Y9m96_aHOKn4jP5Q-WSxxiN-n4nCYyvppLVDdhQx8xPZiN-uTLp6nRTY8FhDmE"
                  />
                </div>
                <div className="absolute right-0 translate-x-10 -top-10 z-10 w-full hidden lg:block opacity-60">
                  <img 
                    className="rounded-2xl shadow-2xl h-[400px] object-cover" 
                    alt="Wide desktop POS view" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGuHMu1_wmKdvgDlBLfs-dVMj5F9-iH-m5q06JfG8rr15DRS0pDH5vSPirW5O_Wdo9X59CXTneYrlNr34-vAOVm3rSJMudSnbt_UP7VlU-9oTBrF4haPnYevI8193SLk6Xumy9Ffa7ATizvr0XsxXbdDa5f4g2f3YyN3CSFyr5krZgE96GEn41hBpnjucWg6EGgUba8VLKEhL8-qkco2vtYMLCJ_k7MyO5A-mDl9T0M8XrdDKV2vmN_oVyqS8z7JDsGGobz9K_82s"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Revenue Ribbon (Animated) */}
        <div className="bg-surface-container py-8 overflow-hidden whitespace-nowrap border-y border-outline-variant/30">
          <div className="animate-marquee gap-6">
            {/* Generating 10 ribbon items for a continuous loop */}
            {[
              { name: "Kedai Kopi ABC", val: "+Rp 120.000", time: "2 min ago" },
              { name: "Butik Fashion Z", val: "+Rp 545.000", time: "5 min ago" },
              { name: "Bengkel Maju", val: "+Rp 2.100.000", time: "12 min ago" },
              { name: "Warung Makan Ibu", val: "+Rp 45.000", time: "15 min ago" },
              { name: "Toko Sembako", val: "+Rp 320.000", time: "20 min ago" }
            ].map((d, idx) => (
              <div key={idx} className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-outline-variant/20 mx-3">
                <Circle className="w-3 h-3 text-secondary fill-secondary" />
                <span className="font-bold whitespace-nowrap">{d.name}</span>
                <span className="text-slate-500 font-medium whitespace-nowrap">{d.val}</span>
                <span className="text-xs text-slate-400 whitespace-nowrap">{d.time}</span>
              </div>
            ))}
            {[
              { name: "Kedai Kopi ABC", val: "+Rp 120.000", time: "2 min ago" },
              { name: "Butik Fashion Z", val: "+Rp 545.000", time: "5 min ago" },
              { name: "Bengkel Maju", val: "+Rp 2.100.000", time: "12 min ago" },
              { name: "Warung Makan Ibu", val: "+Rp 45.000", time: "15 min ago" },
              { name: "Toko Sembako", val: "+Rp 320.000", time: "20 min ago" }
            ].map((d, idx) => (
              <div key={`d-${idx}`} className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-outline-variant/20 mx-3">
                <Circle className="w-3 h-3 text-secondary fill-secondary" />
                <span className="font-bold whitespace-nowrap">{d.name}</span>
                <span className="text-slate-500 font-medium whitespace-nowrap">{d.val}</span>
                <span className="text-xs text-slate-400 whitespace-nowrap">{d.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <section className="py-32 px-8 bg-background" id="keunggulan">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h4 className="text-xl font-extrabold flex items-center gap-3 text-on-surface">
                <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-black shadow-sm">1</span>
                Tanpa Instalasi Rumit
              </h4>
              <p className="text-on-surface-variant font-medium">Platform kasir berbasis web eksklusif. Langsung siap dipakai dalam waktu kurang dari 5 menit untuk memperlancar pesanan. Tidak perlu server database tersendiri.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-extrabold flex items-center gap-3 text-on-surface">
                <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-black shadow-sm">2</span>
                Multi Akses Perangkat
              </h4>
              <p className="text-on-surface-variant font-medium">Mau pakai HP Android, Tablet iOS, PC Kasir Windows, maupun Laptop Mac? Aplikasi ini berjalan konsisten dan super ringan di antarmuka web apa pun yang modern.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-extrabold flex items-center gap-3 text-on-surface">
                <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-black shadow-sm">3</span>
                Terpusat & Sinkronisasi
              </h4>
              <p className="text-on-surface-variant font-medium">Bebas kekhawatiran stok barang tak sama. Berapa pun banyak karyawan kasir yang bertugas, pergerakan pengurangan dan penambahan barang selalu tersinkron via API terpusat.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8">
          <div className="max-w-5xl mx-auto cta-gradient rounded-[3rem] p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Pattern Overlay via pure CSS or external image */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-sm">Mulai Digitalisasi Penjualan Hari Ini</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto drop-shadow-sm font-medium">
                Tinggalkan pencatatan manual di kertas. Mulailah mengadopsi ekosistem titik jualan (POS) modern bersama komunitas UMKM Indonesia.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/page/register" className="px-10 py-5 bg-white text-primary hover:bg-slate-50 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl">
                  Buka Toko Gratis
                </Link>
                <Link href="/page/login" className="px-10 py-5 bg-transparent border-2 border-white/40 hover:bg-white/10 text-white rounded-full font-bold text-xl transition-colors">
                  Sudah punya akun?
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-surface-container-lowest border-t border-outline-variant/30 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 max-w-7xl mx-auto">
            <div className="mb-8 md:mb-0 space-y-2 text-center md:text-left">
              <div className="font-extrabold text-2xl text-primary">Kasir UMKM</div>
              <p className="text-slate-500 text-sm max-w-xs font-medium">
                © {new Date().getFullYear()} Kasir UMKM.<br/>
                Digital Concierge for Business Growth in Indonesia.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/" className="text-slate-500 hover:text-primary font-semibold text-sm transition-all hover:underline">Beranda</Link>
              <Link href="/page/dashboard" className="text-slate-500 hover:text-primary font-semibold text-sm transition-all hover:underline">Dashboard Demo</Link>
              <a className="text-slate-500 hover:text-primary font-semibold text-sm transition-all hover:underline" href="#">Panduan</a>
              <a className="text-slate-500 hover:text-primary font-semibold text-sm transition-all hover:underline" href="#">Kebijakan Privasi</a>
              <a className="text-slate-500 hover:text-primary font-semibold text-sm transition-all hover:underline" href="#">Ketentuan Layanan</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
