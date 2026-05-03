import { useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { fetchJson, itemsFromResponse } from '../lib/api'

export const API_URL =
  'https://api.freeapi.app/api/v1/public/randomusers'

const title = 'Random users'
const tagline = 'Profiles from the FreeAPI random users feed — compact batch view.'

function RandomUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    queueMicrotask(async () => {
      setLoading(true)
      setError(null)
      try {
        const json = await fetchJson(`${API_URL}?page=${page}&limit=4`)
        setUsers(itemsFromResponse(json))
      } catch (e) {
        setError(e.message ?? 'Something went wrong')
      } finally {
        setLoading(false)
      }
    })
  }, [page])

  return (
    <PageShell title={title} tagline={tagline} apiUrl={API_URL}>
      {loading && <p className="animate-pulse text-slate-400">Loading people…</p>}
      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">{error}</div>
      )}
      {!loading && !error && (
        <>
          <ul className="grid gap-5 sm:grid-cols-2">
            {users.map((u) => (
              <li
                key={u.id ?? u.login?.uuid}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/3 shadow-lg shadow-violet-950/40"
              >
                <div className="flex gap-4 p-4">
                  <img src={u.picture?.large} alt="" className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-2 ring-white/10" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">{u.name?.first} {u.name?.last}</p>
                    <p className="truncate text-sm text-slate-400">{u.email}</p>
                    <p className="mt-1 text-xs text-slate-500">{u.location?.city}, {u.location?.country}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="mt-6 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110"
          >
            Generate more users
          </button>
        </>
      )}
    </PageShell>
  )
}

export default RandomUsers

