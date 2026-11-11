import { NextResponse } from 'next/server'
import { findPublicReport, hasSupported, toggleSupport } from '@/lib/report-store'

// GET ?clientId=... -> { supported, count }
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const clientId = new URL(request.url).searchParams.get('clientId') ?? ''
  const report = findPublicReport(id)
  if (!report) return NextResponse.json({ error: 'Laporan tidak ditemukan.' }, { status: 404 })
  return NextResponse.json({ supported: hasSupported(id, clientId), count: report.supportCount })
}

// POST { clientId } -> menambah atau membatalkan dukungan
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = (await request.json().catch(() => null)) as { clientId?: string } | null
  const clientId = typeof body?.clientId === 'string' ? body.clientId.slice(0, 64) : ''
  if (!clientId) return NextResponse.json({ error: 'clientId wajib diisi.' }, { status: 400 })
  const result = toggleSupport(id, clientId)
  if (!result) return NextResponse.json({ error: 'Laporan tidak ditemukan.' }, { status: 404 })
  return NextResponse.json(result)
}
