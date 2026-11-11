'use client'

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-[60vh] place-items-center px-5 text-center">
      <div>
        <h1 className="text-2xl font-extrabold">Daftar laporan belum dapat dimuat</h1>
        <p className="mt-3 text-sm text-muted-foreground">Terjadi kendala saat mengambil data. Coba lagi sebentar.</p>
        <button type="button" onClick={reset} className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Coba lagi</button>
      </div>
    </main>
  )
}
