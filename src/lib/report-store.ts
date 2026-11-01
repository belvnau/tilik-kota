import { reports, type Report } from './tilik-data'

const mutableReports = reports

export function getPublicReports() {
  return mutableReports.filter((report) => report.isPublic)
}

export function findPublicReport(id: string) {
  return getPublicReports().find((report) => report.id === id)
}

export function createReport(input: Omit<Report, 'id' | 'code' | 'createdAt' | 'supportCount' | 'status'>) {
  const nextId = String(Math.max(0, ...mutableReports.map((report) => Number(report.id))) + 1)
  const code = `TK-${new Date().getFullYear().toString().slice(-2)}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Number(nextId).toString().padStart(4, '0'))}`
  const report: Report = {
    ...input,
    id: nextId,
    code,
    createdAt: 'Baru saja',
    supportCount: 0,
    status: 'masuk',
  }
  mutableReports.unshift(report)
  return report
}
