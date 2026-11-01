'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, MapPin, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Logo() {
  return <Link href="/" className="flex items-center gap-3" aria-label="Tilik Kota beranda"><span className="grid size-9 place-items-center bg-primary text-primary-foreground"><MapPin aria-hidden="true" size={18} strokeWidth={2.5} /></span><span className="text-xl font-extrabold tracking-tight text-foreground">tilik<span className="text-primary">kota</span></span></Link>
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const links = [{ href: '/', label: 'Beranda' }, { href: '/eksplorasi', label: 'Eksplorasi' }, { href: '/lapor', label: 'Cara melapor' }]
  return <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur-sm"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8"><Logo /><nav className="hidden items-center gap-8 md:flex" aria-label="Navigasi utama">{links.map((link) => <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-muted-foreground'}`}>{link.label}</Link>)}</nav><div className="hidden items-center gap-4 md:flex"><span className="text-xs text-muted-foreground">Inisiatif warga</span><Link href="/lapor" className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">Buat laporan <ArrowRight size={16} /></Link></div><button type="button" onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-lg border border-border md:hidden" aria-label={open ? 'Tutup menu' : 'Buka menu'}>{open ? <X size={20} /> : <Menu size={20} />}</button></div>{open && <div className="border-t border-border bg-background px-5 py-4 md:hidden"><nav className="flex flex-col gap-1" aria-label="Navigasi mobile">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted">{link.label}</Link>)}<Link href="/lapor" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">Buat laporan</Link></nav></div>}</header>
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-card"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-8"><div><Logo /><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Ruang partisipasi warga untuk melihat, melaporkan, dan memantau perubahan di Kota Tangerang.</p></div><div className="flex flex-col gap-2 text-sm text-muted-foreground lg:items-end"><span>Data Simulasi untuk keperluan demonstrasi</span><span>© 2026 Tilik Kota · Inisiatif warga, bukan situs resmi pemerintah</span></div></div></footer>
}

export function PageFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <><SiteHeader /><main className={className}>{children}</main><SiteFooter /></>
}
