export const me = {
  name: 'Krisna Aditya Satria Anugerah',
  email: 'krisna.adstr@gmail.com',
  github: 'https://github.com/Joeyzeeee',
  linkedin: 'https://www.linkedin.com/in/krisna-aditya-5318a9446/',
}

// TAMBAH PROYEK: salin satu blok { ... } lalu ganti isinya
export const projects = [
  {
    no: '01', title: 'SIFORA', tag: 'Ketua tim · Full-stack', year: '2026',
    desc: 'Sistem peminjaman fasilitas kampus berbasis Laravel. Saya membagi tugas, mengatur jadwal, dan memantau progres tim, sambil ikut mengembangkan sistemnya.',
    stack: ['Laravel', 'Kepemimpinan tim'], link: 'https://github.com/Joeyzeeee',
  },
  {
    no: '02', title: 'Kompenify', tag: 'Mobile & Fullstack', year: '2026',
    desc: 'Aplikasi mobile untuk mengelola kompensasi akademik mahasiswa, dari pengajuan sampai persetujuan dosen, lengkap dengan dokumen SKPL dan uji kegunaan SUS.',
    stack: ['Flutter', 'Laravel', 'MySQL', 'REST API'], link: 'https://github.com/Joeyzeeee',
    detail: {
      subtitle: 'Aplikasi Smart Kompen Mahasiswa',
      meta: 'Mobile & Fullstack · 2026 · Proyek tim (4 orang) · Politeknik Negeri Malang',
      about: 'Kompenify adalah aplikasi Android untuk mendigitalkan proses kompensasi (kompen) mahasiswa di Politeknik Negeri Malang. Dibuat sebagai proyek PBL oleh tim 4 orang dan dipresentasikan pada Juni 2026.',
      problem: 'Proses kompen sebelumnya masih manual, mengandalkan kertas dan komunikasi informal. Akibatnya alur tidak terstruktur, progres sulit dipantau, jam kompen rawan salah catat, dan surat fisik bisa hilang atau rusak.',
      features: [
        'Assignment kompen: dibuat oleh Dosen atau Kaprodi, dipilih langsung oleh Mahasiswa',
        'Upload bukti pengerjaan dan pemantauan status secara real-time',
        'e-TTD dua tahap (Dosen lalu Kaprodi) berbasis QR Code',
        'Surat kompen PDF terbit otomatis setelah semua tahap disetujui',
        'Notifikasi di setiap perubahan status dan rekap sisa jam otomatis',
        'Empat peran: Admin, Mahasiswa, Dosen, Kaprodi',
      ],
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
      challenge: 'Fitur e-TTD menjadi bagian tersulit karena tim belum punya pengalaman menempelkan QR Code ke dokumen PDF. Solusinya memakai Imagick di backend untuk mengatur skala dan posisi QR secara presisi. Selain itu, pengurangan sisa jam kompen hanya disimpan permanen setelah Kaprodi menyetujui, supaya pengajuan yang ditolak atau dibatalkan tidak merusak data.',
      stack: [
        'Flutter', 'Dart', 'Laravel', 'PHP', 'MySQL', 'REST API', 'Laravel Sanctum', 'Dompdf', 'Imagick', 'GitHub',
      ],
      results: [
        { value: '6/6', label: 'kriteria keberhasilan tercapai' },
        { value: '70,75', label: 'skor SUS, kategori Good (10 responden)' },
      ],
      gallery: [],
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
