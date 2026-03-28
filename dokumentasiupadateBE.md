1. Update Laporan yang Sudah Ada (Validasi Upsert)
Pada fungsi 

generateDailyReport
 (di 

reportController.ts
), sebelumnya kita memang sudah menggunakan metode prisma.reportSummary.upsert milik Prisma. Metode ini secara harfiah berarti "Ubah (Update) jika datanya sudah ada, atau Buat Baru (Insert) jika belum ada".

Namun, agar umpan balik (feedback) ke Frontend lebih jelas, saya menambahkan logika untuk memeriksa data sebelum Upsert dijalankan.

Jika belum pernah tutup buku hari ini: API akan merespon "Laporan harian berhasil di-generate dan disimpan".
Jika sudah pernah tutup buku dan menekan tombol lagi: API akan merespon "Laporan hari ini sudah ada, data berhasil diperbarui (Update Tutup Buku)". Data terbaru (jumlah income, expense, produk terlaris) dari keseluruhan transaksi hari itu akan otomatis tertimpa/ter-update menyesuaikan angka terbaru.
2. Fitur Hapus Laporan
Saya sudah menambahkan controller dan route baru untuk Delete:

Endpoint: DELETE /api/reports/:id
Jika dipanggil (misal: DELETE /api/reports/5), backend akan menghapus baris laporan yang memiliki ID 5 dari database Prisma.