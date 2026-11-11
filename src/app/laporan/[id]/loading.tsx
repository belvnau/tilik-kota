import { PageFrame } from '@/components/tilik-shell'

export default function Loading() {
  return (
    <PageFrame>
      <div className="mx-auto max-w-5xl animate-pulse px-5 py-12 lg:px-8" aria-busy="true" aria-label="Memuat laporan">
        <div className="h-4 w-40 rounded bg-muted" />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="aspect-[1.1] rounded-2xl bg-muted" />
          <div className="space-y-4">
            <div className="h-5 w-32 rounded bg-muted" />
            <div className="h-10 w-4/5 rounded bg-muted" />
            <div className="h-24 rounded bg-muted" />
            <div className="h-24 rounded bg-muted" />
          </div>
        </div>
      </div>
    </PageFrame>
  )
}
