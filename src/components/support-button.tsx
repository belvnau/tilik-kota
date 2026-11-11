'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Loader2, Users } from 'lucide-react'

function getClientId() {
  try {
    let id = localStorage.getItem('tilik_client_id')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('tilik_client_id', id)
    }
    return id
  } catch {
    return ''
  }
}

export function SupportButton({ reportId, initialCount }: { reportId: string; initialCount: number }) {
  const [count, setCount] = useState(initialCount)
  const [supported, setSupported] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const clientId = getClientId()
    if (!clientId) return
    fetch(`/api/reports/${reportId}/support?clientId=${encodeURIComponent(clientId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) { setSupported(data.supported); setCount(data.count) }
      })
      .catch(() => {})
  }, [reportId])

  async function toggle() {
    const clientId = getClientId()
    if (!clientId) { setError('Browser kamu memblokir penyimpanan, dukungan tidak dapat dicatat.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/reports/${reportId}/support`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setSupported(data.supported)
      setCount(data.count)
    } catch {
      setError('Dukungan belum dapat dicatat. Coba lagi sebentar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Users size={16} className="text-primary" /> {count} warga terdampak
      </p>
      <button
        type="button"
        onClick={toggle}
        disabled={loading}
        aria-pressed={supported}
        className={`mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border text-sm font-bold transition disabled:opacity-60 ${
          supported
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-primary/30 bg-accent text-primary hover:bg-primary hover:text-primary-foreground'
        }`}
      >
        {loading ? <Loader2 size={17} className="animate-spin" /> : <CheckCircle2 size={17} />}
        {supported ? 'Kamu terdampak · klik untuk batal' : 'Saya juga terdampak'}
      </button>
      {error && <p role="alert" className="mt-2 text-center text-xs text-destructive">{error}</p>}
      <p className="mt-3 text-center text-[11px] leading-5 text-muted-foreground">
        Dukungan dibatasi satu per browser dan membantu menunjukkan bahwa laporan ini dirasakan warga lain.
      </p>
    </div>
  )
}
