import { useCallback, useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { fetchJson, itemsFromResponse } from '../lib/api'

export const API_URL =
  'https://api.freeapi.app/api/v1/public/youtube/videos'

const FETCH_URL = `${API_URL}?page=1&limit=10`

const title = 'YouTube videos'
const tagline = 'Thumbnails and titles from the FreeAPI YouTube sample feed.'

function normalizeVideo(row) {
  const v = row?.items
  if (!v?.snippet) return null
  return {
    id: v.id,
    title: v.snippet.title,
    channel: v.snippet.channelTitle,
    thumb:
      v.snippet.thumbnails?.medium?.url ??
      v.snippet.thumbnails?.default?.url,
  }
}

function YoutubeVideoListing() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const json = await fetchJson(FETCH_URL)
      const raw = itemsFromResponse(json)
      setVideos(
        raw.map(normalizeVideo).filter(Boolean)
      )
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
        <p className="animate-pulse text-slate-400">Loading videos…</p>
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
          {videos.map((v) => (
            <li key={v.id}>
              <a
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition hover:border-red-400/40 hover:bg-white/6"
              >
                <div className="aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={v.thumb}
                    alt=""
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="line-clamp-2 font-medium text-white group-hover:text-red-200">
                    {v.title}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">{v.channel}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  )
}

export default YoutubeVideoListing
