export const me = {
  name: 'Krisna Aditya Satria Anugerah',
  email: 'krisna.adstr@gmail.com',
  github: 'https://github.com/Joeyzeeee',
  linkedin: 'https://www.linkedin.com/in/krisna-aditya-5318a9446/',
}

// TAMBAH PROYEK: salin satu blok { ... } lalu ganti isinya
export const projects = [
  {
    no: '01',
    title: 'SIFORA',
    tag: 'Ketua tim · Full-stack',
    year: '2026',
    desc: 'Sistem peminjaman fasilitas kampus berbasis Laravel. Saya membagi tugas, mengatur jadwal, dan memantau progres tim, sambil ikut mengembangkan sistemnya.',
    stack: ['Laravel', 'Kepemimpinan tim'],
    link: 'https://github.com/Joeyzeeee',
    detail: {
      isComingSoon: true,
    },
  },
  {
    no: '02',
    title: 'Kompenify',
    tag: 'Mobile & Fullstack',
    year: '2026',
    desc: 'Aplikasi mobile untuk mengelola kompensasi akademik mahasiswa, dari pengajuan sampai persetujuan dosen, lengkap dengan dokumen SKPL dan uji kegunaan SUS.',
    stack: ['Flutter', 'Laravel', 'MySQL', 'REST API'],
    link: 'https://github.com/Joeyzeeee',
    detail: {
      statement: 'Aplikasi mobile untuk mendigitalkan proses kompensasi mahasiswa di Politeknik Negeri Malang.',
      about: 'Kompenify adalah aplikasi Android untuk mendigitalkan proses kompensasi (kompen) mahasiswa di Politeknik Negeri Malang. Dibuat sebagai proyek PBL oleh tim 4 orang dan dipresentasikan pada Juni 2026.',
      problem: 'Proses kompen sebelumnya masih manual, mengandalkan kertas dan komunikasi informal. Akibatnya alur tidak terstruktur, progres sulit dipantau, jam kompen rawan salah catat, dan surat fisik bisa hilang atau rusak.',
      role: {
        badge: 'System Analyst & Fullstack Developer',
        items: [
          'Merancang workflow, use case diagram, ERD, dan class diagram',
          'Menyusun dokumen SKPL dan dokumen proyek lainnya',
          'Menyiapkan struktur MVC awal dan membangun tampilan UI',
          'Ikut mengembangkan REST API dan melakukan API testing',
          'Membuat fitur upload dan hapus foto bukti, serta pengelolaan assignment Kaprodi',
          'Bug fixing bersama tim',
        ],
      },
      stack: [
        'Flutter', 'Dart', 'Laravel', 'PHP', 'MySQL', 'REST API', 'Laravel Sanctum', 'Dompdf', 'Imagick', 'GitHub',
      ],
      links: {
        github: 'https://github.com/Joeyzeeee',
      },
    },
  },
  {
    no: '03',
    title: 'Portal Lab MMT',
    tag: 'Project Manager · Fullstack',
    year: '2025',
    desc: 'Portal web dan CMS Laboratorium Multimedia & Mobile Tech Polinema untuk mengintegrasikan publikasi karya mahasiswa serta dokumentasi lab, lengkap dengan Black Box Testing.',
    stack: ['PHP', 'Bootstrap', 'PostgreSQL', 'JavaScript'],
    link: 'https://github.com/Joeyzeeee',
    detail: {
      statement: 'Portal web terintegrasi dan CMS untuk publikasi karya mahasiswa serta dokumentasi kegiatan Laboratorium Multimedia & Mobile Tech.',
      about: 'Portal web untuk Laboratorium Multimedia dan Mobile Tech (MMT) Jurusan Teknologi Informasi Politeknik Negeri Malang. Sistem ini terbagi menjadi dua bagian: Laman publik (profil lab, visi misi, struktur organisasi, karya mahasiswa, berita dan kegiatan, serta galeri foto dan video) dan Dashboard admin CMS (login, logout, lupa password, CRUD semua konten, dan upload media tanpa perlu menyentuh kode).',
      problem: 'Latar belakang pembuatan portal ini adalah publikasi karya mahasiswa dan dokumentasi kegiatan lab sebelumnya masih tersebar dan belum terintegrasi. Proyek ini dikerjakan oleh tim 5 orang dengan metode Waterfall dan diseminasikan pada 16 Desember 2025, dengan hasil Black Box Testing menyatakan seluruh fitur utama berjalan sesuai skenario.',
      role: {
        badge: 'Project Manager & Fullstack Developer',
        items: [
          'Mengoordinasikan tim 5 orang, menyusun dan mengontrol jadwal dengan metode Waterfall',
          'Merancang UI/UX dan struktur database PostgreSQL untuk halaman Karya',
          'Mengembangkan sisi Frontend dan Backend (PHP procedural & Bootstrap) untuk modul Karya',
          'Mengintegrasikan fitur karya mahasiswa dengan dashboard admin (CMS)',
          'Melakukan pengujian fitur (Black Box Testing) dan ikut menyusun laporan akhir diseminasi',
        ],
      },
      stack: [
        'PHP (Procedural)', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PostgreSQL', 'Laragon / XAMPP', 'GitHub',
      ],
      links: {
        github: 'https://github.com/Joeyzeeee',
      },
    },
  },
]

// TAMBAH PENGALAMAN: salin satu blok { ... }
export const experience = [
  { y: '2023', t: 'PKL Jaringan · Diskominfo Kota Blitar', d: 'Membantu instalasi dan pemeliharaan jaringan, troubleshooting koneksi, penyambungan fiber optik, dan pemasangan CCTV.' },
  { y: '2022 – sekarang', t: 'Fotografer & Editor Foto · Freelance', d: 'Pemotretan dan editing untuk klien, dari memahami kebutuhan sampai menyerahkan hasil tepat waktu.' },
  { y: '2024 – sekarang', t: 'Politeknik Negeri Malang', d: 'D-IV Sistem Informasi Bisnis.' },
  { y: '2021 – 2024', t: 'SMK Negeri 1 Blitar', d: 'Teknik Komputer Jaringan. Memegang sertifikat ujian kompetensi jaringan.' },
  { y: 'Sertifikat', t: 'NVIDIA · Certificate of Competency', d: 'Building LLM Applications with Prompt Engineering.' },
]

export const skills = [
  { g: 'Pengembangan', items: ['Flutter', 'Laravel', 'PHP', 'MySQL', 'PostgreSQL', 'REST API', 'Git & GitHub'] },
  { g: 'Lainnya', items: ['Kepemimpinan tim', 'Dokumentasi SKPL', 'Uji kegunaan SUS', 'Jaringan', 'Fotografi & editing'] },
]
