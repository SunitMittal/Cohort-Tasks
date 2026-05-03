import { useCallback, useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { fetchJson } from '../lib/api'

export const API_URL =
  'https://api.freeapi.app/api/v1/public/cats/cat/random'

const title = 'Random cat'
const tagline = 'One fuzzy friend at a time — breed info and a portrait from the Cat API.'

function RandomCatViewer() {
  const [cat, setCat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const json = await fetchJson(API_URL)
      setCat(json?.data && typeof json.data === 'object' ? json.data : null)
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
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-4">
          {loading && (
            <p className="animate-pulse text-slate-400">Summoning a cat…</p>
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
          {!loading && !error && cat && (
            <>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/3 shadow-2xl shadow-violet-950/50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="aspect-4/3 w-full object-cover lg:aspect-square lg:max-h-105"
                />
              </div>
              <button
                type="button"
                onClick={load}
                className="rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110 active:scale-[0.98]"
              >
                Another cat
              </button>
            </>
          )}
        </div>
        {!loading && !error && cat && (
          <div className="lg:w-96 lg:shrink-0">
            <div className="rounded-2xl border border-white/10 bg-white/4 p-6">
              <h2 className="text-xl font-semibold text-white">{cat.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{cat.temperament}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {cat.description}
              </p>
              {cat.wikipedia_url ? (
                <a
                  href={cat.wikipedia_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-medium text-cyan-400 hover:text-cyan-300"
                >
                  Wikipedia →
                </a>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </PageShell>
  )
}

export default RandomCatViewer
