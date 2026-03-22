<div align="center">

# 🛒 Kasir UMKM

### Solusi POS Modern & Cerdas untuk Bisnis UMKM Indonesia

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
</p>

> **Kelola stok, pantau penjualan, dan buat laporan dalam satu genggaman.**  
> Aplikasi kasir berbasis web yang didesain khusus untuk pelaku UMKM Indonesia 🇮🇩

</div>

---

## ✨ Fitur Unggulan

| Fitur | Deskripsi |
|-------|-----------|
| 🛍️ **Dashboard Produk** | Tampilan produk berbasis kartu yang intuitif, lengkap dengan pencarian & filter |
| 🛒 **Keranjang Belanja** | Tambah, ubah jumlah, dan hapus produk dengan mudah secara real-time |
| 💳 **Multi Metode Bayar** | Mendukung QRIS, Tunai (Cash), dan Transfer Bank |
| 📦 **Manajemen Stok** | Pantau & perbarui stok produk secara langsung — peringatan stok menipis otomatis |
| 🗂️ **Manajemen Produk** | CRUD produk lengkap — tambah, edit, dan hapus produk dengan mudah |
| 🔐 **Autentikasi Aman** | Login & Register berbasis JWT token, data pengguna tersimpan aman |
| 📱 **Desain Responsif** | Tampilan mobile-first yang nyaman digunakan di HP maupun desktop |
| ⚡ **Performa Tinggi** | Ditenagai React Query untuk caching & sinkronisasi data server secara efisien |

---

## 🚀 Teknologi yang Digunakan

### Frontend
- **[Next.js 16](https://nextjs.org/)** — React framework dengan App Router & SSR
- **[React 19](https://react.dev/)** — Library UI modern
- **[TypeScript 5](https://www.typescriptlang.org/)** — Type safety untuk JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** — Ikon modern dan ringan

### State Management
- **[Redux Toolkit 2](https://redux-toolkit.js.org/)** — Manajemen state keranjang belanja
- **[TanStack React Query 5](https://tanstack.com/query)** — Manajemen state server & caching

---

## 📂 Struktur Proyek

```
kasirUMKM/
├── src/
│   ├── app/
│   │   ├── components/          # Komponen UI yang dapat digunakan ulang
│   │   │   ├── CartBottom.tsx   # Bar keranjang sticky di bagian bawah
│   │   │   ├── ProductCard.tsx  # Kartu produk individual
│   │   │   ├── Sidebar.tsx      # Sidebar navigasi
│   │   │   └── sideDrawer.tsx   # Komponen side drawer
│   │   ├── hook/                # Custom React Hooks
│   │   │   ├── useProduct.ts    # Queries & mutasi produk (CRUD)
│   │   │   └── useOrder.ts      # Hook pembuatan order
│   │   ├── page/                # Halaman-halaman aplikasi
│   │   │   ├── checkout/        # Halaman checkout & pembayaran
│   │   │   ├── dashboard/       # Dashboard utama (browse produk)
│   │   │   ├── login/           # Halaman login
│   │   │   ├── product/         # Halaman manajemen produk
│   │   │   └── register/        # Halaman registrasi
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Landing page
│   ├── redux/                   # Konfigurasi Redux
│   │   ├── cartSlice.ts         # Reducer keranjang belanja
│   │   ├── store.ts             # Konfigurasi Redux store
│   │   └── provider.tsx         # Redux provider wrapper
│   └── service/                 # Layer API service
│       ├── authService.ts       # Login, register, logout
│       ├── orderService.ts      # API pembuatan order
│       └── prodcutService.ts    # API CRUD produk
├── public/                      # Aset statis
├── package.json
└── README.md
```

---

## ⚙️ Instalasi & Menjalankan Proyek

### Prasyarat

Pastikan kamu sudah menginstall:
- [Node.js](https://nodejs.org/) versi **20** atau lebih baru
- **npm**, **yarn**, **pnpm**, atau **bun**

### Langkah Instalasi

**1. Clone repositori**
```bash
git clone https://github.com/Dutaywn/kasirUMKM.git
cd kasirUMKM
```

**2. Install dependensi**
```bash
npm install
```

**3. Konfigurasi environment**

Buat file `.env.local` di root direktori proyek:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

> 💡 Sesuaikan URL dengan alamat backend API kamu.

**4. Jalankan server pengembangan**
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya 🎉

---

## 🖥️ Halaman Aplikasi

| Halaman | Route | Deskripsi |
|---------|-------|-----------|
| 🏠 Landing Page | `/` | Halaman selamat datang dengan fitur highlights & CTA |
| 🔑 Login | `/page/login` | Masuk ke akun dengan email & password |
| 📝 Register | `/page/register` | Daftar akun baru |
| 📊 Dashboard | `/page/dashboard` | Browse & cari produk, kelola keranjang belanja |
| 🗂️ Produk | `/page/product` | Manajemen produk (tambah, edit, hapus) |
| 🛒 Checkout | `/page/checkout` | Konfirmasi pesanan & proses pembayaran |

---

## 📜 Perintah yang Tersedia

```bash
# Jalankan server pengembangan (hot-reload)
npm run dev

# Build untuk produksi
npm run build

# Jalankan server produksi
npm run start

# Cek kualitas kode dengan ESLint
npm run lint
```

---

## 🔌 Integrasi API

Aplikasi ini berkomunikasi dengan backend REST API. Berikut endpoint utama yang digunakan:

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/auth/login` | Login pengguna |
| `POST` | `/auth/register` | Registrasi pengguna baru |
| `GET` | `/products` | Ambil semua produk |
| `POST` | `/products` | Tambah produk baru |
| `PUT` | `/products/:id` | Update produk |
| `DELETE` | `/products/:id` | Hapus produk |
| `POST` | `/orders` | Buat order baru |

---

## 🚢 Deploy ke Vercel

Cara termudah untuk men-deploy aplikasi ini adalah menggunakan [Vercel Platform](https://vercel.com/new).

1. Push kode ke repositori GitHub
2. Import proyek di [vercel.com/new](https://vercel.com/new)
3. Tambahkan environment variable `NEXT_PUBLIC_API_URL`
4. Klik **Deploy** 🚀

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Berikut cara berkontribusi:

1. **Fork** repositori ini
2. Buat **branch** fitur baru: `git checkout -b fitur/nama-fitur`
3. **Commit** perubahan: `git commit -m 'feat: tambahkan fitur X'`
4. **Push** ke branch: `git push origin fitur/nama-fitur`
5. Buka **Pull Request**

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**.

---

<div align="center">

Dibuat dengan ❤️ untuk memajukan UMKM Indonesia 🇮🇩

**[⭐ Beri bintang jika proyek ini bermanfaat!](https://github.com/Dutaywn/kasirUMKM)**

</div>
