import { useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { fetchJson, itemsFromResponse } from '../lib/api'

export const API_URL = 'https://api.freeapi.app/api/v1/public/meals'

const title = 'Meals'
const tagline = 'A small set of 4 meals, with a generate button for the next set.'

function MealListing() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    queueMicrotask(async () => {
      setLoading(true)
      setError(null)
      try {
        const json = await fetchJson(`${API_URL}?page=${page}&limit=4`)
        setMeals(itemsFromResponse(json))
      } catch (e) {
        setError(e.message ?? 'Something went wrong')
      } finally {
        setLoading(false)
      }
    })
  }, [page])

  return (
    <PageShell title={title} tagline={tagline} apiUrl={API_URL}>
      {loading && <p className="animate-pulse text-slate-400">Loading meals…</p>}
      {error && <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">{error}</div>}
      {!loading && !error && (
        <>
          <ul className="grid gap-5 sm:grid-cols-2">
            {meals.map((m) => (
              <li key={m.idMeal ?? m.id} className="overflow-hidden rounded-2xl border border-amber-500/15 bg-linear-to-br from-amber-500/5 to-transparent px-5 py-4">
                <div className="aspect-video overflow-hidden">
                  <img src={m.strMealThumb} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="font-medium text-white">{m.strMeal}</p>
                  <p className="mt-1 text-sm text-amber-200/80">{m.strArea} · {m.strCategory}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="mt-6 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110"
          >
            Generate more meals
          </button>
        </>
      )}
    </PageShell>
  )
}

export default MealListing

