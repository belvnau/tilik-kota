import {
  reports as seedReports,
  defaultStatusNote,
  statusMeta,
  statusOrder,
  type Report,
  type ReportStatus,
  type ReportUpdate,
} from './tilik-data'

// DATA SIMULASI: disimpan di memori server. Hilang saat server restart.
// Nanti seluruh fungsi di file ini diganti dengan query database (Drizzle).
type Store = {
  reports: Report[]
  updates: ReportUpdate[]
  supporters: Map<string, Set<string>> // reportId -> kumpulan clientId
}

const globalForStore = globalThis as unknown as { __tilikStore?: Store }

function buildSeed(): Store {
  const reports = seedReports.map((r) => ({ ...r }))
  const updates: ReportUpdate[] = []
  const base = new Date('2026-11-09T09:00:00+07:00').getTime()
  const day = 24 * 60 * 60 * 1000
  for (const r of reports) {
    const path: ReportStatus[] =
      r.status === 'ditolak' ? ['masuk', 'ditolak'] : statusOrder.slice(0, statusOrder.indexOf(r.status) + 1)
    path.forEach((status, i) => {
      const age = (path.length - 1 - i) * 1.5 + 0.2 + Number(r.id) * 0.3
      updates.push({
        id: `u-${r.id}-${i + 1}`,
        reportId: r.id,
        status,
        note: defaultStatusNote[status],
        createdAt: new Date(base - age * day).toISOString(),
      })
    })
  }
  return { reports, updates, supporters: new Map() }
}

// globalThis supaya data tetap satu di semua route dan tidak ter-reset oleh hot reload
const store: Store = (globalForStore.__tilikStore ??= buildSeed())

export function getAllReports() {
  return store.reports
}

export function getPublicReports() {
  return store.reports.filter((report) => report.isPublic)
}

export function findPublicReport(id: string) {
  return getPublicReports().find((report) => report.id === id)
}

export function createReport(input: Omit<Report, 'id' | 'code' | 'createdAt' | 'supportCount' | 'status'>) {
  const nextId = String(Math.max(0, ...store.reports.map((report) => Number(report.id))) + 1)
  const now = new Date()
  const code = `TK-${now.getFullYear().toString().slice(-2)}${String(now.getMonth() + 1).padStart(2, '0')}-${nextId.padStart(4, '0')}`
  const report: Report = {
    ...input,
    id: nextId,
    code,
    createdAt: 'Baru saja',
    supportCount: 0,
    status: 'masuk',
  }
  store.reports.unshift(report)
  store.updates.push({
    id: `u-${nextId}-1`,
    reportId: nextId,
    status: 'masuk',
    note: defaultStatusNote.masuk,
    createdAt: now.toISOString(),
  })
  return report
}

/** Riwayat status satu laporan, dari yang paling lama ke paling baru. */
export function getReportUpdates(reportId: string): ReportUpdate[] {
  return store.updates
    .filter((u) => u.reportId === reportId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}

/**
 * Mengubah status laporan dengan menambah satu baris riwayat.
 * Sengaja TIDAK ada fungsi untuk mengedit atau menghapus riwayat (append-only).
 * Dipakai oleh dashboard admin.
 */
export function updateReportStatus(id: string, status: ReportStatus, note?: string) {
  if (!(status in statusMeta)) return null
  const report = store.reports.find((item) => item.id === id)
  if (!report) return null
  report.status = status
  store.updates.push({
    id: `u-${id}-${getReportUpdates(id).length + 1}`,
    reportId: id,
    status,
    note: note?.trim() || defaultStatusNote[status],
    createdAt: new Date().toISOString(),
  })
  return report
}

export function hasSupported(reportId: string, clientId: string) {
  return store.supporters.get(reportId)?.has(clientId) ?? false
}

/** Klik pertama menambah dukungan, klik kedua membatalkan. Dibatasi satu per browser (clientId). */
export function toggleSupport(reportId: string, clientId: string) {
  const report = findPublicReport(reportId)
  if (!report) return null
  const set = store.supporters.get(reportId) ?? new Set<string>()
  store.supporters.set(reportId, set)
  if (set.has(clientId)) {
    set.delete(clientId)
    report.supportCount = Math.max(0, report.supportCount - 1)
  } else {
    set.add(clientId)
    report.supportCount += 1
  }
  return { supported: set.has(clientId), count: report.supportCount }
}

/** Simulasi deteksi duplikat: kategori sama, lalu urut dari wilayah paling dekat. */
export function findSimilarReports(report: Report, limit = 3) {
  return getPublicReports()
    .filter((r) => r.id !== report.id && r.category === report.category)
    .map((r) => {
      const reasons = ['Kategori sama']
      let score = 1
      if (r.district === report.district) { score += 1; reasons.push('Kecamatan sama') }
      if (r.village === report.village) { score += 1; reasons.push('Kelurahan sama') }
      if (r.street === report.street) { score += 1; reasons.push('Jalan sama') }
      return { report: r, score, reasons }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
