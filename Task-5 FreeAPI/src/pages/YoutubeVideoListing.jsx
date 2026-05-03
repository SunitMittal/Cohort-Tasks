import { useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { fetchJson, itemsFromResponse } from '../lib/api'

export const API_URL =
  'https://api.freeapi.app/api/v1/public/youtube/videos'

const title = 'YouTube videos'
const tagline = '4 video cards at a time; generate more whenever you want.'

function normalizeVideo(row) {
  const v = row?.items
  if (!v?.snippet) return null
  return {
    id: v.id,
    title: v.snippet.title,
    channel: v.snippet.channelTitle,
    thumb: v.snippet.thumbnails?.medium?.url ?? v.snippet.thumbnails?.default?.url,
  }
}

function YoutubeVideoListing() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    queueMicrotask(async () => {
      setLoading(true)
      setError(null)
      try {
        const json = await fetchJson(`${API_URL}?page=${page}&limit=4`)
        setVideos(itemsFromResponse(json).map(normalizeVideo).filter(Boolean))
      } catch (e) {
        setError(e.message ?? 'Something went wrong')
      } finally {
        setLoading(false)
      }
    })
  }, [page])

  return (
    <PageShell title={title} tagline={tagline} apiUrl={API_URL}>
      {loading && <p className="animate-pulse text-slate-400">Loading videos…</p>}
      {error && <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">{error}</div>}
      {!loading && !error && (
        <>
          <ul className="grid gap-5 sm:grid-cols-2">
            {videos.map((v) => (
              <li key={v.id}>
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition hover:border-red-400/40 hover:bg-white/6"
                >
                  <div className="aspect-video overflow-hidden bg-slate-900">
                    <img src={v.thumb} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-2 font-medium text-white group-hover:text-red-200">{v.title}</p>
                    <p className="mt-2 text-xs text-slate-500">{v.channel}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="mt-6 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110"
          >
            Generate more videos
          </button>
        </>
      )}
    </PageShell>
  )
}

export default YoutubeVideoListing

