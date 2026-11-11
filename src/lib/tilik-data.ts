export type ReportStatus = 'masuk' | 'diperiksa' | 'ditangani' | 'diklaim_selesai' | 'terverifikasi' | 'ditolak'

export type Report = {
  id: string
  code: string
  title: string
  description: string
  category: string
  district: string
  village: string
  street: string
  status: ReportStatus
  createdAt: string
  supportCount: number
  reporter: string
  isPublic: boolean
  image: string
}

export const categories = ['Jalan dan Trotoar', 'Drainase dan Saluran Air', 'Penerangan Jalan', 'Fasilitas Umum', 'Lainnya']

export const districts = [
  { name: 'Tangerang', villages: ['Sukarasa', 'Sukasari', 'Babakan'] },
  { name: 'Karawaci', villages: ['Bojong Jaya', 'Nusa Jaya', 'Cimone'] },
  { name: 'Cibodas', villages: ['Panunggangan Barat', 'Jatiuwung', 'Cibodasari'] },
  { name: 'Pinang', villages: ['Kunciran', 'Neroktog', 'Pakojan'] },
]

export const statusMeta: Record<ReportStatus, { label: string; tone: string; description: string }> = {
  masuk: { label: 'Laporan Masuk', tone: 'status-blue', description: 'Laporan sudah diterima dan menunggu pemeriksaan.' },
  diperiksa: { label: 'Diperiksa', tone: 'status-amber', description: 'Kelengkapan dan informasi laporan sedang diperiksa.' },
  ditangani: { label: 'Sedang Ditangani', tone: 'status-indigo', description: 'Ada perkembangan penanganan pada laporan ini.' },
  diklaim_selesai: { label: 'Diklaim Selesai', tone: 'status-green', description: 'Perbaikan dinyatakan selesai berdasarkan informasi yang tersedia.' },
  terverifikasi: { label: 'Terverifikasi Warga', tone: 'status-forest', description: 'Warga telah mengonfirmasi bahwa permasalahan telah selesai.' },
  ditolak: { label: 'Ditolak', tone: 'status-red', description: 'Laporan belum dapat dipublikasikan atau diproses.' },
}

export const reports: Report[] = [
  { id: '1', code: 'TK-2611-0001', title: 'Lubang besar di Jalan Kisamaun', description: 'Terdapat lubang besar di dekat pasar yang membahayakan pengendara terutama saat malam hari.', category: 'Jalan dan Trotoar', district: 'Tangerang', village: 'Sukarasa', street: 'Jalan Kisamaun', status: 'ditangani', createdAt: '2 jam lalu', supportCount: 48, reporter: 'Raka P.', isPublic: true, image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80' },
  { id: '2', code: 'TK-2610-0098', title: 'Saluran air tersumbat di Taman Cibodas', description: 'Air tidak mengalir saat hujan dan mulai menimbulkan genangan di depan rumah warga.', category: 'Drainase dan Saluran Air', district: 'Cibodas', village: 'Cibodasari', street: 'Jalan Taman Cibodas', status: 'diperiksa', createdAt: 'Kemarin', supportCount: 31, reporter: 'Nadia S.', isPublic: true, image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80' },
  { id: '3', code: 'TK-2609-0087', title: 'Lampu penerangan mati sepanjang gang', description: 'Tiga titik lampu jalan tidak menyala sehingga akses warga menjadi gelap setelah pukul 19.00.', category: 'Penerangan Jalan', district: 'Karawaci', village: 'Nusa Jaya', street: 'Gang Melati', status: 'masuk', createdAt: '2 hari lalu', supportCount: 27, reporter: 'Anonim', isPublic: true, image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80' },
  { id: '4', code: 'TK-2609-0082', title: 'Trotoar pecah dekat halte', description: 'Permukaan trotoar pecah dan menyulitkan pengguna kursi roda serta orang tua.', category: 'Jalan dan Trotoar', district: 'Pinang', village: 'Kunciran', street: 'Jalan KH Hasyim Ashari', status: 'diklaim_selesai', createdAt: '3 hari lalu', supportCount: 23, reporter: 'Dimas A.', isPublic: true, image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=900&q=80' },
  { id: '5', code: 'TK-2608-0076', title: 'Bangku taman rusak dan berkarat', description: 'Bangku di ruang terbuka publik sudah tidak layak digunakan dan berpotensi melukai anak-anak.', category: 'Fasilitas Umum', district: 'Tangerang', village: 'Babakan', street: 'Taman Potret', status: 'terverifikasi', createdAt: '5 hari lalu', supportCount: 19, reporter: 'Salsa M.', isPublic: true, image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=900&q=80' },
  { id: '6', code: 'TK-2608-0069', title: 'Genangan di akses Pasar Lama', description: 'Genangan muncul setiap hujan deras dan menghambat akses pejalan kaki menuju pasar.', category: 'Drainase dan Saluran Air', district: 'Tangerang', village: 'Sukasari', street: 'Jalan Kisamaun', status: 'ditangani', createdAt: '6 hari lalu', supportCount: 42, reporter: 'Fajar R.', isPublic: true, image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80' },
  { id: '7', code: 'TK-2607-0058', title: 'Rambu jalan tertutup dahan pohon', description: 'Rambu penyeberangan tidak terlihat jelas karena tertutup dahan pohon di sisi jalan.', category: 'Lainnya', district: 'Karawaci', village: 'Bojong Jaya', street: 'Jalan Imam Bonjol', status: 'masuk', createdAt: '1 minggu lalu', supportCount: 12, reporter: 'Anonim', isPublic: true, image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80' },
  { id: '8', code: 'TK-2607-0051', title: 'Pagar lapangan warga roboh', description: 'Pagar pembatas lapangan roboh setelah hujan dan perlu diamankan agar tidak membahayakan.', category: 'Fasilitas Umum', district: 'Cibodas', village: 'Jatiuwung', street: 'Jalan Perintis', status: 'diperiksa', createdAt: '1 minggu lalu', supportCount: 16, reporter: 'Ika W.', isPublic: true, image: 'https://images.unsplash.com/photo-1564769625392-651b9182c9c4?auto=format&fit=crop&w=900&q=80' },
  { id: '9', code: 'TK-2606-0043', title: 'Marka penyeberangan mulai pudar', description: 'Marka zebra cross di depan sekolah hampir tidak terlihat pada jam sibuk.', category: 'Jalan dan Trotoar', district: 'Pinang', village: 'Pakojan', street: 'Jalan Veteran', status: 'diklaim_selesai', createdAt: '2 minggu lalu', supportCount: 14, reporter: 'Yusuf K.', isPublic: true, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80' },
  { id: '10', code: 'TK-2606-0036', title: 'Kran air taman umum bocor', description: 'Kran air di taman terus menetes dan membuat area di sekitarnya licin.', category: 'Fasilitas Umum', district: 'Karawaci', village: 'Cimone', street: 'Taman Ekspresi', status: 'terverifikasi', createdAt: '2 minggu lalu', supportCount: 9, reporter: 'Anonim', isPublic: true, image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=900&q=80' },
]

export const publicReports = reports.filter((report) => report.isPublic)

// Riwayat perubahan status. Bersifat append-only: hanya boleh ditambah, tidak diedit atau dihapus.
export type ReportUpdate = {
  id: string
  reportId: string
  status: ReportStatus
  note: string
  createdAt: string // ISO 8601
}

export const defaultStatusNote: Record<ReportStatus, string> = {
  masuk: 'Laporan diterima dan menunggu pemeriksaan.',
  diperiksa: 'Tim memeriksa kelengkapan foto dan lokasi laporan.',
  ditangani: 'Laporan diteruskan dan sedang dalam penanganan (simulasi).',
  diklaim_selesai: 'Perbaikan diklaim sudah selesai dan menunggu konfirmasi warga.',
  terverifikasi: 'Warga sekitar mengonfirmasi bahwa perbaikan sudah selesai.',
  ditolak: 'Laporan belum dapat diproses karena informasi belum memadai.',
}

export const statusOrder: ReportStatus[] = ['masuk', 'diperiksa', 'ditangani', 'diklaim_selesai', 'terverifikasi']
