import { useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { fetchJson, itemsFromResponse } from '../lib/api'

export const API_URL =
  'https://api.freeapi.app/api/v1/public/randomproducts'

const title = 'Random products'
const tagline = 'Only 4 product cards at a time, then generate the next batch.'

function ProductListing() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    queueMicrotask(async () => {
      setLoading(true)
      setError(null)
      try {
        const json = await fetchJson(`${API_URL}?page=${page}&limit=4`)
        setProducts(itemsFromResponse(json))
      } catch (e) {
        setError(e.message ?? 'Something went wrong')
      } finally {
        setLoading(false)
      }
    })
  }, [page])

  return (
    <PageShell title={title} tagline={tagline} apiUrl={API_URL}>
      {loading && <p className="animate-pulse text-slate-400">Loading products…</p>}
      {error && <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">{error}</div>}
      {!loading && !error && (
        <>
          <ul className="grid gap-5 sm:grid-cols-2">
            {products.map((p) => (
              <li key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3">
                <div className="aspect-4/3 overflow-hidden bg-slate-900">
                  <img src={p.thumbnail} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="line-clamp-2 font-medium text-white">{p.title}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 text-sm">
                    <span className="font-semibold text-emerald-300">${p.price}</span>
                    <span className="text-slate-500">? {p.rating}</span>
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
            Generate more products
          </button>
        </>
      )}
    </PageShell>
  )
}

export default ProductListing

