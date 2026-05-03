import { useCallback, useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { fetchJson, itemsFromResponse } from '../lib/api'

export const API_URL =
  'https://api.freeapi.app/api/v1/public/randomproducts'

const FETCH_URL = `${API_URL}?limit=10`

const title = 'Random products'
const tagline = 'E-commerce style cards with thumbnails, ratings, and pricing.'

function ProductListing() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const json = await fetchJson(FETCH_URL)
      setProducts(itemsFromResponse(json))
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
        <p className="animate-pulse text-slate-400">Loading products…</p>
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
          {products.map((p) => (
            <li
              key={p.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3"
            >
              <div className="aspect-4/3 overflow-hidden bg-slate-900">
                <img
                  src={p.thumbnail}
                  alt=""
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="line-clamp-2 font-medium text-white">{p.title}</p>
                <div className="mt-auto flex items-center justify-between gap-2 text-sm">
                  <span className="font-semibold text-emerald-300">
                    ${p.price}
                  </span>
                  <span className="text-slate-500">★ {p.rating}</span>
                </div>
                <p className="text-xs text-slate-500">{p.brand}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  )
}

export default ProductListing
