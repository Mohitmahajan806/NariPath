import Link from 'next/link';
import { FEATURE_CARDS } from '@/lib/features';

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link href="/" className="text-sm font-medium text-sky-700 hover:text-sky-900">
        ← Back to home
      </Link>

      <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
        <div className="flex shrink-0 flex-col items-center sm:items-start">
          <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-sky-400 via-indigo-500 to-violet-600 text-3xl font-bold text-white shadow-xl shadow-indigo-600/30">
            You
          </div>
          <p className="mt-4 text-center text-lg font-semibold text-slate-900 sm:text-left">Traveler</p>
          <p className="mt-1 max-w-[14rem] text-center text-sm text-slate-500 sm:text-left">
            Your hub for tools and saved-style shortcuts. Sign-in can be added later.
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Profile</h1>
          <p className="mt-2 text-slate-600">
            Jump into planning features—everything you need for routes, stays, culture, and more lives here.
          </p>

          <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Your tools</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {FEATURE_CARDS.map((f) => (
              <li key={f.href}>
                <Link
                  href={f.href}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-200 hover:shadow-md"
                >
                  <span className="text-2xl" aria-hidden>
                    {f.icon}
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900">{f.title}</span>
                    <span className="mt-0.5 block text-xs text-slate-500 line-clamp-2">{f.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-800">Account</h3>
            <p className="mt-2 text-sm text-slate-600">
              Preferences, saved trips, and authentication can plug in here when you are ready to ship accounts.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/privacy" className="text-sm font-medium text-sky-700 hover:text-sky-900">
                Privacy
              </Link>
              <span className="text-slate-300">·</span>
              <Link href="/terms" className="text-sm font-medium text-sky-700 hover:text-sky-900">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
