import { NextResponse } from 'next/server'
import { createReport } from '@/lib/report-store'

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

export async function POST(request: Request) {
  const formData = await request.formData()
  const photo = formData.get('photo')
  const description = String(formData.get('description') ?? '').trim()
  const category = String(formData.get('category') ?? '').trim()
  const district = String(formData.get('district') ?? '').trim()
  const village = String(formData.get('village') ?? '').trim()
  const street = String(formData.get('street') ?? '').trim()
  const anonymous = formData.get('anonymous') === 'true'
  const name = String(formData.get('name') ?? '').trim()
  const isPublic = formData.get('isPublic') === 'true'

  if (!(photo instanceof File) || !allowedTypes.has(photo.type) || photo.size === 0 || photo.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: 'Foto wajib berupa JPG, PNG, atau WebP dengan ukuran maksimal 5MB.' }, { status: 400 })
  }
  if (!description || !category || !district || !village || !street || (!anonymous && !name)) {
    return NextResponse.json({ error: 'Lengkapi semua informasi wajib sebelum mengirim laporan.' }, { status: 400 })
  }

  const image = `data:${photo.type};base64,${Buffer.from(await photo.arrayBuffer()).toString('base64')}`
  const report = createReport({
    title: description.split(/[.!?]/)[0].slice(0, 72) || 'Laporan warga baru',
    description,
    category,
    district,
    village,
    street,
    reporter: anonymous ? 'Anonim' : name,
    isPublic,
    image,
  })

  return NextResponse.json({ code: report.code, id: report.id })
}
