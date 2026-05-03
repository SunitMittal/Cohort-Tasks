import { Link } from 'react-router-dom'

export function PageShell({ title, tagline, apiUrl, children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(139,92,246,0.35),transparent),radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(6,182,212,0.12),transparent),radial-gradient(ellipse_60%_40%_at_0%_80%,rgba(244,114,182,0.1),transparent)] bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="space-y-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-violet-300/90 transition hover:text-cyan-300"
            >
              <span aria-hidden>←</span> Back to hub
            </Link>
            <div>
              <h1 className="font-semibold tracking-tight text-2xl text-white sm:text-3xl">
                {title}
              </h1>
              {tagline ? (
                <p className="mt-1 max-w-xl text-sm text-slate-400">{tagline}</p>
              ) : null}
            </div>
          </div>
          <div className="w-full shrink-0 rounded-xl border border-white/10 bg-white/4 p-3 sm:max-w-md">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-fuchsia-300/90">
              API URL
            </p>
            <p className="mt-1 break-all font-mono text-xs leading-relaxed text-cyan-200/90">
              {apiUrl}
            </p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}
