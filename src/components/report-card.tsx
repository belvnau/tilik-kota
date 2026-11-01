import Link from 'next/link'
import { ArrowUpRight, MapPin, Users } from 'lucide-react'
import type { Report } from '@/lib/tilik-data'
import { statusMeta } from '@/lib/tilik-data'

export function ReportCard({ report }: { report: Report }) {
  const status = statusMeta[report.status]
  return <article className="group overflow-hidden border border-border bg-card transition hover:border-primary/40"><Link href={`/laporan/${report.id}`} className="block"><div className="relative aspect-[1.55] overflow-hidden bg-muted"><img src={report.image} alt={`Foto ilustrasi ${report.title}`} className="size-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-3 top-3 bg-white/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">Dokumentasi warga</span></div><div className="flex flex-col gap-4 p-5"><div className="flex items-start justify-between gap-3"><span className="rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold text-primary">{report.category}</span><ArrowUpRight className="text-muted-foreground" size={18} /></div><div><h3 className="line-clamp-2 text-lg font-bold leading-snug text-foreground">{report.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{report.description}</p></div><div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin size={14} /><span>{report.street}, {report.district}</span></div><div className="flex items-center justify-between border-t border-border pt-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status.tone}`}>{status.label}</span><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Users size={14} /> {report.supportCount} terdampak</span></div></div></Link></article>
}
