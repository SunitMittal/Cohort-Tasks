import { useCallback, useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { fetchJson, itemsFromResponse } from '../lib/api'

export const API_URL = 'https://api.freeapi.app/api/v1/public/quotes'

const FETCH_URL = `${API_URL}?limit=10`

const title = 'Quotes'
const tagline = 'Curated quotes with authors — great for typography and calm layouts.'

function QuotesListing() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const json = await fetchJson(FETCH_URL)
      setQuotes(itemsFromResponse(json))
    } catch (e) {
      setError(e.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    queueMicrotask(() => {
      void load()
    })
  }, [load])

  return (
    <PageShell title={title} tagline={tagline} apiUrl={API_URL}>
      {loading && (
        <p className="animate-pulse text-slate-400">Loading quotes…</p>
      )}
      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">
          {error}{' '}
          <button
            type="button"
            onClick={load}
            className="ml-2 underline decoration-rose-300/50 hover:text-white"
          >
            Retry
          </button>
        </div>
      )}
      {!loading && !error && (
        <ul className="grid gap-5 md:grid-cols-2">
          {quotes.map((q) => (
            <li
              key={q.id}
              className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-900/50 p-6 before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-br before:from-cyan-500/10 before:to-transparent"
            >
              <p className="relative text-lg font-light italic leading-relaxed text-slate-100">
                “{q.content}”
              </p>
              <p className="relative mt-4 text-sm font-medium text-cyan-300">
                — {q.author}
              </p>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  )
}

export default QuotesListing
