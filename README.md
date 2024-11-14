# Yellow Taxi Trip - Frontend

Ini adalah frontend dari proyek **Yellow Taxi Trip**, yang dibangun menggunakan **Next.js**, dengan berbagai library untuk meningkatkan UI/UX dan fungsionalitas aplikasi.

## Teknologi yang Digunakan

- **Next.js**: Framework React untuk membangun aplikasi dengan rendering server.
- **Axios**: Klien HTTP untuk melakukan permintaan API.
- **ShadCN UI**: Library komponen untuk desain UI modern.
- **Tailwind CSS**: Framework CSS berbasis utility untuk styling.
- **Leaflet**: Library JavaScript sumber terbuka untuk peta interaktif.
- **Leaflet Routing Machine**: Plugin untuk menambahkan fitur rute pada peta Leaflet.
- **Sonner**: Library untuk menampilkan notifikasi toast.
- **Swiper.js**: Library untuk membuat carousel atau slider yang mendukung sentuhan.

## Fitur

- **Peta Interaktif**: Menampilkan lokasi perjalanan taksi pada peta interaktif menggunakan **Leaflet**.
- **Routing**: Mendapatkan saran rute di peta menggunakan **Leaflet Routing Machine**.
- **UI Responsif**: Desain yang responsif dan ramah perangkat mobile menggunakan **Tailwind CSS**.
- **Komponen UI**: Menggunakan komponen modern yang dibangun dengan **ShadCN UI**.
- **Notifikasi**: Menampilkan pemberitahuan dalam aplikasi menggunakan **Sonner**.
- **Carousel**: Menampilkan konten dalam bentuk carousel atau slider menggunakan **Swiper.js**.

## Prasyarat

Pastikan Anda telah menginstal dan menyiapkan hal-hal berikut sebelum memulai:

- **Node.js**
- **npm**

## Instalasi

Ikuti langkah-langkah berikut untuk menyiapkan proyek ini secara lokal.

### 1. Clone repositori

Clone repositori ini ke mesin lokal Anda:

```bash
git clone https://github.com/yerikhowilliamt/yellow-taxi-trip-frontend.git
```

### 2. Instalasi dependensi

Masuk ke direktori proyek dan instal dependensi yang diperlukan:

```bash
cd yellow-taxi-trip-frontend
npm install
```

### 3. Atur variabel lingkungan

Buat file .env.local di direktori root proyek dan tambahkan variabel lingkungan berikut:

```
NEXT_PUBLIC_API_URL=https://yellow-taxi-trips.up.railway.app
```

### 4. Jalankan proyek secara lokal

Setelah dependensi terinstal dan variabel lingkungan disiapkan, jalankan server pengembangan dengan perintah:

```bash
npm run dev
```

### Pengembangan

Untuk melakukan perubahan pada aplikasi, Anda dapat menggunakan perintah berikut:

- npm run dev: Memulai server pengembangan.
- npm run build: Membuat build produksi yang teroptimasi.
- npm run start: Menjalankan server produksi secara lokal.

