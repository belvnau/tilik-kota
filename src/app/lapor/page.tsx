'use client'

import Link from 'next/link'
import { ArrowLeft, Check, ImagePlus, Info, MapPin, Upload, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageFrame } from '@/components/tilik-shell'
import { categories, districts } from '@/lib/tilik-data'

export default function ReportPage() {
  const [fileName, setFileName] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [district, setDistrict] = useState('')
  const [village, setVillage] = useState('')
  const [street, setStreet] = useState('')
  const [anonymous, setAnonymous] = useState(true)
  const [name, setName] = useState('')
  const [publicConsent, setPublicConsent] = useState(true)
  const [error, setError] = useState('')
  const suggested = useMemo(() => /lampu|gelap|penerangan/i.test(description) ? 'Penerangan Jalan' : /air|selokan|drainase|genang/i.test(description) ? 'Drainase dan Saluran Air' : /trotoar|jalan|lubang|aspal/i.test(description) ? 'Jalan dan Trotoar' : '', [description])
  const villages = districts.find((item) => item.name === district)?.villages ?? []
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!photo || !description.trim() || !category || !district || !village || !street.trim() || (!anonymous && !name.trim())) {
      setError('Lengkapi bagian yang wajib diisi sebelum mengirim laporan.')
      return
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(photo.type) || photo.size > 5 * 1024 * 1024) {
      setError('Foto harus JPG, PNG, atau WebP dan berukuran maksimal 5MB.')
      return
    }
    const body = new FormData()
    body.set('photo', photo)
    body.set('description', description)
    body.set('category', category)
    body.set('district', district)
    body.set('village', village)
    body.set('street', street)
    body.set('anonymous', String(anonymous))
    body.set('name', name)
    body.set('isPublic', String(publicConsent))
    const response = await fetch('/api/reports', { method: 'POST', body })
    const result = await response.json()
    if (!response.ok) { setError(result.error ?? 'Laporan belum dapat dikirim.'); return }
    window.location.href = `/lapor/berhasil?kode=${encodeURIComponent(result.code)}&id=${encodeURIComponent(result.id)}`
  }
  return <PageFrame><section className="border-b border-border bg-[#f8f9f7]"><div className="mx-auto max-w-3xl px-5 py-12 lg:px-8"><Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"><ArrowLeft size={16} /> Kembali ke beranda</Link><p className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-primary">Laporan baru</p><h1 className="mt-3 text-4xl font-extrabold tracking-tight">Ceritakan masalah di sekitar Anda.</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">Tidak perlu membuat akun. Sertakan foto dan lokasi yang jelas agar laporan mudah dipahami warga lain.</p></div></section><section className="mx-auto max-w-3xl px-5 py-10 lg:px-8"><form onSubmit={submit} className="flex flex-col gap-8"><div className="border-t-2 border-primary/60 bg-card p-6"><SectionHeading number="01" title="Foto kerusakan" required /><label className="mt-5 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 px-6 text-center transition hover:border-primary/50 hover:bg-accent">{fileName ? <><Check className="text-primary" size={28} /><p className="mt-3 text-sm font-bold">{fileName}</p><span className="mt-1 text-xs text-muted-foreground">Klik untuk mengganti foto</span></> : <><ImagePlus className="text-primary" size={30} /><p className="mt-3 text-sm font-bold">Unggah foto kondisi infrastruktur</p><span className="mt-1 text-xs text-muted-foreground">JPG, JPEG, PNG, atau WebP · Maks. 5MB</span></>}<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => { const selected = e.target.files?.[0] ?? null; setPhoto(selected); setFileName(selected?.name ?? '') }} /></label><div className="mt-4 flex gap-2 text-xs leading-5 text-muted-foreground"><Info className="mt-0.5 shrink-0" size={15} />Hindari mengunggah wajah dan pelat nomor kendaraan.</div></div><div className="border-t-2 border-primary/60 bg-card p-6"><SectionHeading number="02" title="Detail masalah" required /><label className="mt-5 flex flex-col gap-2 text-sm font-semibold">Deskripsi kerusakan<textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Contoh: Terdapat lubang besar di tengah jalan yang membahayakan pengendara." className="resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:ring-4 focus:ring-primary/10" /></label><div className="mt-5 flex flex-col gap-2 text-sm font-semibold"><label htmlFor="category">Kategori</label><select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="h-11 rounded-lg border border-border bg-background px-3 text-sm font-normal outline-none focus:ring-4 focus:ring-primary/10"><option value="">Pilih kategori</option>{categories.map((item) => <option key={item}>{item}</option>)}</select>{suggested && suggested !== category && <button type="button" onClick={() => setCategory(suggested)} className="w-fit text-xs font-medium text-primary">Saran kategori: {suggested} · gunakan saran</button>}</div></div><div className="border-t-2 border-primary/60 bg-card p-6"><SectionHeading number="03" title="Lokasi kejadian" required /><div className="mt-5 grid gap-5 sm:grid-cols-2"><Field label="Kecamatan"><select value={district} onChange={(e) => { setDistrict(e.target.value); setVillage('') }} className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-normal outline-none focus:ring-4 focus:ring-primary/10"><option value="">Pilih kecamatan</option>{districts.map((item) => <option key={item.name}>{item.name}</option>)}</select></Field><Field label="Kelurahan"><select value={village} onChange={(e) => setVillage(e.target.value)} disabled={!district} className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-normal outline-none focus:ring-4 focus:ring-primary/10"><option value="">Pilih kelurahan</option>{villages.map((item) => <option key={item}>{item}</option>)}</select></Field></div><label className="mt-5 flex flex-col gap-2 text-sm font-semibold">Nama jalan<input value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Contoh: Jalan Kisamaun" className="h-11 rounded-lg border border-border bg-background px-3 text-sm font-normal outline-none focus:ring-4 focus:ring-primary/10" /></label></div><div className="border-t-2 border-primary/60 bg-card p-6"><SectionHeading number="04" title="Persetujuan & identitas" /><label className="mt-5 flex items-start gap-3 text-sm leading-6"><input type="checkbox" checked={publicConsent} onChange={(e) => setPublicConsent(e.target.checked)} className="mt-1 size-4 accent-primary" />Saya setuju laporan ini ditampilkan di papan laporan publik.</label><div className="mt-5 border-t border-border pt-5"><p className="text-sm font-semibold">Tampilkan identitas pelapor</p><div className="mt-3 flex gap-5 text-sm"><label className="flex items-center gap-2"><input type="radio" checked={anonymous} onChange={() => setAnonymous(true)} name="identity" className="accent-primary" />Anonim</label><label className="flex items-center gap-2"><input type="radio" checked={!anonymous} onChange={() => setAnonymous(false)} name="identity" className="accent-primary" />Dengan nama</label></div>{!anonymous && <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama yang ingin ditampilkan" className="mt-4 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-4 focus:ring-primary/10" />}</div></div>{error && <p className="rounded-lg bg-[#f9e5e3] px-4 py-3 text-sm font-medium text-[#a64e49]">{error}</p>}<button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 transition hover:bg-primary/90"><Upload size={17} /> Kirim laporan</button><p className="text-center text-xs leading-5 text-muted-foreground">Dengan mengirim laporan, Anda memahami bahwa Tilik Kota adalah inisiatif warga dan bukan situs resmi pemerintah.</p></form></section></PageFrame>
}
function SectionHeading({ number, title, required = false }: { number: string; title: string; required?: boolean }) { return <div className="flex items-center gap-3"><span className="text-xs font-bold text-primary">{number}</span><h2 className="text-lg font-bold">{title}{required && <span className="ml-1 text-primary">*</span>}</h2></div> }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="flex flex-col gap-2 text-sm font-semibold">{label}{children}</label> }
