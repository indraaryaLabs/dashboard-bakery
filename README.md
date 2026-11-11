# The Artisanal Digital Bakery - Bakery Dashboard

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescript.org)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)

Dashboard web untuk bisnis bakery "The Artisanal Digital Bakery": profil toko, katalog menu, dan harga dalam situs company profile - dengan pemesanan langsung ke WhatsApp.

## Fitur

- **Halaman beranda lengkap** - hero, section about (sejak 1984), value proposition, best sellers, galeri, dan testimoni pelanggan.
- **Katalog menu per kategori** - halaman `/menu` dengan kategori Pastries & Croissants, Artisan Breads, dan Cakes & Sweets, lengkap dengan harga (Rp) dan foto.
- **Pemesanan via WhatsApp** - form order (nama, telepon, alamat, detail pesanan, catatan) yang otomatis merangkai pesan dan membuka WhatsApp ke nomor toko (`wa.me`).
- **Navigasi SPA** - routing React Router antara beranda dan halaman menu, dengan scroll-spy pada navbar dan smooth scroll antar-section.
- **Animasi halus** - transisi dan stagger animasi menggunakan Motion (Framer Motion).
- **Dark mode-ready** - token warna Tailwind dengan varian `dark:` di seluruh komponen.

## Tech Stack

| Layer | Teknologi |
| --- | --- |
| UI Library | React 19 |
| Bahasa | TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Routing | React Router DOM 7 |
| Animasi | Motion 12 |
| Ikon | lucide-react |
| AI (disiapkan) | Gemini API (`@google/genai`, konfigurasi via `GEMINI_API_KEY`) |

## Menjalankan Lokal

**Prasyarat:** Node.js

```bash
git clone https://github.com/indraaryaLabs/dashboard-bakery.git
cd dashboard-bakery
npm install
```

Salin `.env.example` ke `.env.local` dan isi `GEMINI_API_KEY` bila memakai fitur Gemini:

```bash
npm run dev
```

Buka `http://localhost:3000` di browser.

Perintah lain:

```bash
npm run build # build produksi ke folder dist/
npm run preview # pratinjau hasil build
npm run lint # verifikasi tipe (tsc --noEmit)
npm run clean # hapus folder dist/
```

## Struktur Proyek

```
src/
├── App.tsx # Navbar, Hero, About, Best Sellers, Gallery, Testimonials + routing
├── pages/
│ └── MenuPage.tsx # Katalog menu + form order via WhatsApp
├── index.css # Styling global (Tailwind)
└── main.tsx # Entry point
.env.example # Template variabel lingkungan (GEMINI_API_KEY, APP_URL)
```

## License

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
