import { ReportCard } from '@/components/report-card'
import type { Report } from '@/lib/tilik-data'

export function SimilarReports({ items }: { items: { report: Report; reasons: string[] }[] }) {
  if (!items.length) return null
  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="text-2xl font-extrabold tracking-tight">Laporan serupa</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
        Mungkin masalah yang sama sudah pernah dilaporkan. Kamu bisa memberi dukungan di sana. Pencocokan memakai kategori dan wilayah (simulasi deteksi duplikat).
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ report, reasons }) => (
          <div key={report.id}>
            <ReportCard report={report} />
            <p className="mt-2 text-xs text-muted-foreground">{reasons.join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
