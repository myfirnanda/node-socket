# Real-Time Chat Application - Socket.IO Prototype

Proyek ini adalah implementasi prototype aplikasi chat real-time menggunakan **Socket.IO**, **Node.js/Express** untuk backend, dan **React + TypeScript + Vite** untuk frontend.

## 🚀 Cara Menjalankan

### 1. Install Dependencies

**Server (Backend):**
```bash
cd server
npm install
```

**Client (Frontend):**
```bash
cd client
npm install
```

### 2. Jalankan Aplikasi

**Server** - Jalankan di terminal pertama:
```bash
cd server
npm start
```
Server akan berjalan di `http://localhost:8000`

**Client** - Jalankan di terminal kedua:
```bash
cd client
npm run dev
```
Client akan berjalan di `http://localhost:5174`

## 🧪 Cara Testing Real-Time Messaging

1. Buka aplikasi di **2 browser berbeda** (misalnya Chrome dan Firefox), atau buka **2 tab** di browser yang sama
2. Akses `http://localhost:5174` di kedua browser/tab
3. Ketik pesan di salah satu browser, lalu klik **Send Message**
4. Pesan akan muncul secara **real-time** di browser/tab lainnya

## ✨ Fitur

- ✅ Real-time messaging menggunakan WebSocket (Socket.IO)
- ✅ Notifikasi pesan baru dengan perubahan favicon dan title tab
- ✅ Counter pesan belum dibaca saat tab tidak aktif
- ✅ CORS configured untuk development environment
- ✅ TypeScript support di client

## 📦 Tech Stack

**Backend:**
- Node.js + Express v5.1.0
- Socket.IO v4.8.1

**Frontend:**
- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.2
- Socket.IO Client v4.8.1

## 🔧 Port Configuration

- Backend Server: `8000`
- Frontend Client: `5174`

Pastikan kedua port tersebut tidak digunakan oleh aplikasi lain sebelum menjalankan proyek ini.
