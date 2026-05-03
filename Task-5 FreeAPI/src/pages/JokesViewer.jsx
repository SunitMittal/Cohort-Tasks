import { useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { fetchJson, itemsFromResponse } from '../lib/api'

export const API_URL =
  'https://api.freeapi.app/api/v1/public/randomjokes'

const title = 'Random jokes'
const tagline = 'Focused feed of 4 jokes at a time.'

function JokesViewer() {
  const [jokes, setJokes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    queueMicrotask(async () => {
      setLoading(true)
      setError(null)
      try {
        const json = await fetchJson(`${API_URL}?page=${page}&limit=4`)
        setJokes(itemsFromResponse(json))
      } catch (e) {
        setError(e.message ?? 'Something went wrong')
      } finally {
        setLoading(false)
      }
    })
  }, [page])

  return (
    <PageShell title={title} tagline={tagline} apiUrl={API_URL}>
      {loading && <p className="animate-pulse text-slate-400">Loading jokes…</p>}
      {error && <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">{error}</div>}
      {!loading && !error && (
        <>
          <ul className="grid gap-5 sm:grid-cols-2 text-center">
            {jokes.map((j) => (
              <li key={j.id} className="overflow-hidden  rounded-2xl border border-white/10 bg-linear-to-br from-white/6 to-transparent px-5 py-4">
                <p className="text-slate-100 leading-relaxed">{j.content}</p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="mt-6 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110"
          >
            Generate more jokes
          </button>
        </>
      )}
    </PageShell>
  )
}

export default JokesViewer

