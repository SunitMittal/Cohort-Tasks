import { Link, Route, Routes } from 'react-router-dom'
import JokesViewer, { API_URL as JOKES_API } from './pages/JokesViewer'
import MealListing, { API_URL as MEALS_API } from './pages/MealListing'
import ProductListing, { API_URL as PRODUCTS_API } from './pages/ProductListing'
import QuotesListing, { API_URL as QUOTES_API } from './pages/QuotesListing'
import RandomCatViewer, { API_URL as CAT_API } from './pages/RandomCatViewer'
import RandomUsers, { API_URL as USERS_API } from './pages/RandomUsers'
import YoutubeVideoListing, { API_URL as YOUTUBE_API } from './pages/YoutubeVideoListing'

const demos = [
  {
    path: '/random-users',
    title: 'Random users',
    blurb: 'Avatars, names, and locations from the random user pool.',
    apiUrl: USERS_API,
    accent: 'from-violet-500/25 to-fuchsia-500/10',
    icon: '👤',
  },
  {
    path: '/jokes',
    title: 'Random jokes',
    blurb: 'Paginated one-liners and Chuck Norris classics.',
    apiUrl: JOKES_API,
    accent: 'from-amber-500/20 to-orange-500/10',
    icon: '😄',
  },
  {
    path: '/quotes',
    title: 'Quotes',
    blurb: 'Author-attributed quotes for typography-friendly cards.',
    apiUrl: QUOTES_API,
    accent: 'from-cyan-500/20 to-teal-500/10',
    icon: '✨',
  },
  {
    path: '/products',
    title: 'Random products',
    blurb: 'Thumbnail grids with price, rating, and brand.',
    apiUrl: PRODUCTS_API,
    accent: 'from-emerald-500/20 to-lime-500/10',
    icon: '🛒',
  },
  {
    path: '/meals',
    title: 'Meals',
    blurb: 'Global recipes with imagery from TheMealDB.',
    apiUrl: MEALS_API,
    accent: 'from-orange-500/25 to-rose-500/10',
    icon: '🍽️',
  },
  {
    path: '/random-cat',
    title: 'Random cat',
    blurb: 'One breed spotlight with portrait and temperament.',
    apiUrl: CAT_API,
    accent: 'from-pink-500/20 to-violet-500/10',
    icon: '🐱',
  },
  {
    path: '/youtube',
    title: 'YouTube videos',
    blurb: 'Thumbnails and titles — opens on YouTube in a new tab.',
    apiUrl: YOUTUBE_API,
    accent: 'from-red-500/25 to-rose-600/10',
    icon: '▶️',
  },
]

function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_100%_80%_at_50%_-30%,rgba(139,92,246,0.45),transparent),radial-gradient(ellipse_70%_50%_at_100%_0%,rgba(6,182,212,0.15),transparent),radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(244,114,182,0.12),transparent)] bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:pt-20">
        <header className="text-center">
          <h1 className="mt-4 bg-linear-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            API playground hub
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-400 sm:text-lg">
            Pick a demo below. Each route shows its live{' '}
            <span className="text-cyan-300/90">API URL</span> in the header and
            fetches real data from{' '}
            <a
              href="https://freeapi.app"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-violet-300 underline decoration-violet-500/40 underline-offset-4 hover:text-cyan-300"
            >
              freeapi.app
            </a>
            .
          </p>
        </header>

        <section className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((d) => (
            <Link
              key={d.path}
              to={d.path}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br ${d.accent} p-px shadow-xl shadow-black/40 transition hover:-translate-y-0.5 hover:border-white/20 hover:shadow-violet-900/30`}
            >
              <div className="flex h-full flex-col rounded-[15px] bg-slate-950/85 p-5 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl ring-1 ring-white/10"
                    aria-hidden
                  >
                    {d.icon}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-white group-hover:text-violet-200">
                  {d.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {d.blurb}
                </p>
                <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-fuchsia-300/80">
                    API URL
                  </p>
                  <p className="mt-1.5 break-all font-mono text-[11px] leading-snug text-cyan-200/85">
                    {d.apiUrl}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-300 transition group-hover:gap-2 group-hover:text-cyan-300">
                  Explore
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/random-users" element={<RandomUsers />} />
      <Route path="/jokes" element={<JokesViewer />} />
      <Route path="/quotes" element={<QuotesListing />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/meals" element={<MealListing />} />
      <Route path="/random-cat" element={<RandomCatViewer />} />
      <Route path="/youtube" element={<YoutubeVideoListing />} />
    </Routes>
  )
}

export default App
