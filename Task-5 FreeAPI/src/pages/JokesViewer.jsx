import { useCallback, useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { fetchJson, itemsFromResponse } from '../lib/api'

export const API_URL =
  'https://api.freeapi.app/api/v1/public/randomjokes'

const FETCH_URL = `${API_URL}?limit=10`

const title = 'Random jokes'
const tagline = 'Chuck Norris facts and more — jokes from FreeAPI.'

function JokesViewer() {
  const [jokes, setJokes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const json = await fetchJson(FETCH_URL)
      setJokes(itemsFromResponse(json))
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
        <p className="animate-pulse text-slate-400">Loading jokes…</p>
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
        <ul className="space-y-3">
          {jokes.map((j) => (
            <li
              key={j.id}
              className="rounded-2xl border border-white/10 bg-linear-to-br from-white/6 to-transparent px-5 py-4"
            >
              <p className="text-slate-100 leading-relaxed">{j.content}</p>
              {j.categories?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {j.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-fuchsia-500/20 px-2.5 py-0.5 text-xs font-medium text-fuchsia-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  )
}

export default JokesViewer
