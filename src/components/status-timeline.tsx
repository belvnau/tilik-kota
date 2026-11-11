import { statusMeta, type ReportUpdate } from '@/lib/tilik-data'

function formatWaktu(iso: string) {
  return new Date(iso).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Jakarta' }) + ' WIB'
}

export function StatusTimeline({ updates }: { updates: ReportUpdate[] }) {
  const items = [...updates].reverse() // terbaru di atas
  if (!items.length) {
    return <p className="text-sm text-muted-foreground">Belum ada riwayat perubahan status.</p>
  }
  return (
    <ol className="relative ml-2 border-l-2 border-border">
      {items.map((u, i) => {
        const meta = statusMeta[u.status]
        return (
          <li key={u.id} className="relative pb-8 pl-7 last:pb-0">
            <span className={`absolute -left-[9px] top-1 size-4 rounded-full border-2 border-background ${i === 0 ? 'bg-primary' : 'bg-border'}`} aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${meta.tone}`}>{meta.label}</span>
              {i === 0 && <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">Terbaru</span>}
            </div>
            <time dateTime={u.createdAt} className="mt-2 block text-xs text-muted-foreground">{formatWaktu(u.createdAt)}</time>
            <p className="mt-1.5 text-sm leading-6">{u.note}</p>
          </li>
        )
      })}
    </ol>
  )
}
