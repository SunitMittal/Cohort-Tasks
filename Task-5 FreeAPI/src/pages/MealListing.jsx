import { useCallback, useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { fetchJson, itemsFromResponse } from '../lib/api'

export const API_URL = 'https://api.freeapi.app/api/v1/public/meals'

const FETCH_URL = `${API_URL}?page=1&limit=10`

const title = 'Meals'
const tagline = 'Recipe ideas from TheMealDB via FreeAPI — regions, thumbs, and names.'

function MealListing() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const json = await fetchJson(FETCH_URL)
      setMeals(itemsFromResponse(json))
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
        <p className="animate-pulse text-slate-400">Loading meals…</p>
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
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {meals.map((m) => (
            <li
              key={m.idMeal ?? m.id}
              className="overflow-hidden rounded-2xl border border-amber-500/15 bg-linear-to-b from-amber-500/5 to-transparent"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={m.strMealThumb}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-medium text-white">{m.strMeal}</p>
                <p className="mt-1 text-sm text-amber-200/80">
                  {m.strArea} · {m.strCategory}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  )
}

export default MealListing
