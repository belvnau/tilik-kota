import { PageFrame } from '@/components/tilik-shell'

export default function Loading() {
  return (
    <PageFrame>
      <div className="mx-auto max-w-7xl animate-pulse px-5 py-14 lg:px-8" aria-busy="true" aria-label="Memuat laporan">
        <div className="h-9 w-64 rounded bg-muted" />
        <div className="mt-10 h-12 max-w-xl rounded-lg bg-muted" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-72 rounded bg-muted" />)}
        </div>
      </div>
    </PageFrame>
  )
}
