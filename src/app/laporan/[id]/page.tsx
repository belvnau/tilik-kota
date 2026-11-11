import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PageFrame } from '@/components/tilik-shell'
import { SupportButton } from '@/components/support-button'
import { StatusTimeline } from '@/components/status-timeline'
import { SimilarReports } from '@/components/similar-reports'
import { statusMeta } from '@/lib/tilik-data'
import { findPublicReport, findSimilarReports, getReportUpdates } from '@/lib/report-store'

export const dynamic = 'force-dynamic'

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const report = findPublicReport(id)
  if (!report) notFound()
  const status = statusMeta[report.status]
  const updates = getReportUpdates(report.id)
  const similar = findSimilarReports(report)

  return (
    <PageFrame>
      <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <Link href="/eksplorasi" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Kembali ke eksplorasi
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          <div className="overflow-hidden rounded-2xl border border-border bg-muted">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={report.image} alt={`Foto ilustrasi ${report.title}`} className="aspect-[1.1] w-full object-cover" />
              <span className="absolute left-5 top-5 rounded-md bg-white/95 px-3 py-1.5 text-xs font-semibold">Foto ilustrasi</span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-primary">{report.category}</span>
              <span className="text-xs text-muted-foreground">{report.code}</span>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight">{report.title}</h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground">{report.description}</p>

            <div className="mt-7 rounded-xl border border-border bg-[#f8f9f7] p-5">
              <span className={`inline-block rounded-full px-3 py-1.5 text-xs font-bold ${status.tone}`}>{status.label}</span>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{status.description}</p>
            </div>

            <dl className="mt-7 grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted-foreground">Lokasi</dt>
                <dd className="mt-1 flex items-start gap-2 text-sm font-semibold">
                  <MapPin className="mt-0.5 shrink-0 text-primary" size={15} />
                  {report.street}, {report.village}, {report.district}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Dilaporkan</dt>
                <dd className="mt-1 text-sm font-semibold">{report.createdAt}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Pelapor</dt>
                <dd className="mt-1 text-sm font-semibold">{report.reporter}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <SupportButton reportId={report.id} initialCount={report.supportCount} />
            </div>
          </div>
        </div>

        <section className="mt-14 border-t border-border pt-10" aria-labelledby="judul-timeline">
          <h2 id="judul-timeline" className="text-2xl font-extrabold tracking-tight">Perkembangan laporan</h2>
          <p className="mt-2 mb-7 text-sm text-muted-foreground">
            Riwayat hanya bisa ditambah, tidak bisa diubah atau dihapus. Data simulasi untuk demonstrasi.
          </p>
          <StatusTimeline updates={updates} />
        </section>

        <SimilarReports items={similar} />
      </section>
    </PageFrame>
  )
}
