# Portofolio Krisna (React + GSAP + Lenis)

## Menjalankan
1. Install Node.js (versi 18 ke atas) dari nodejs.org
2. Buka terminal di folder ini, lalu:
   - `npm install`
   - `npm run dev`  (buka alamat yang muncul, biasanya http://localhost:5173)

## Mengubah isi
- Teks, proyek, pengalaman, dan skill ada di **src/data.js**. Untuk menambah proyek, salin satu blok `{ ... }` lalu ganti isinya.
- Paragraf "Tentang" dan teks hero ada di **src/App.jsx**.
- Warna ada di bagian paling atas **src/styles.css** (`--teal`, `--bg`).

## Menaruh di internet (gratis)
- `npm run build` menghasilkan folder **dist**.
- Upload folder dist ke Netlify (drag and drop di app.netlify.com/drop) atau Vercel, atau taruh di GitHub Pages.
