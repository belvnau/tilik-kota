'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard bisa diblokir browser; kode tetap terlihat di layar
    }
  }

  return (
    <button type="button" onClick={copy} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary">
      {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Tersalin' : 'Salin kode'}
    </button>
  )
}