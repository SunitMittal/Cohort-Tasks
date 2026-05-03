import { useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { fetchJson, itemsFromResponse } from '../lib/api'

export const API_URL = 'https://api.freeapi.app/api/v1/public/quotes'

const title = 'Quotes'
const tagline = 'Read 4 quotes, then generate a fresh set.'

function QuotesListing() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    queueMicrotask(async () => {
      setLoading(true)
      setError(null)
      try {
        const json = await fetchJson(`${API_URL}?page=${page}&limit=4`)
        setQuotes(itemsFromResponse(json))
      } catch (e) {
        setError(e.message ?? 'Something went wrong')
      } finally {
        setLoading(false)
      }
    })
  }, [page])

  return (
    <PageShell title={title} tagline={tagline} apiUrl={API_URL}>
      {loading && <p className="animate-pulse text-slate-400">Loading quotes…</p>}
      {error && <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">{error}</div>}
      {!loading && !error && (
        <>
          <ul className="grid gap-5 md:grid-cols-2">
            {quotes.map((q) => (
              <li key={q.id} className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-900/50 p-6 before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-br before:from-cyan-500/10 before:to-transparent">
                <p className="relative text-lg font-light italic leading-relaxed text-slate-100">“{q.content}”</p>
                <p className="relative mt-4 text-sm font-medium text-cyan-300">— {q.author}</p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="mt-6 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110"
          >
            Generate more quotes
          </button>
        </>
      )}
    </PageShell>
  )
}

export default QuotesListing

