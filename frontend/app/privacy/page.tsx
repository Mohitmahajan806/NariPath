import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/" className="text-sm font-medium text-sky-700 hover:text-sky-900">
        ← Back to home
      </Link>
      <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-900">Privacy policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>

      <section className="mt-10 space-y-6 text-slate-600">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">What we collect</h2>
          <p className="mt-2 leading-relaxed">
            When you use planning features, your browser may send place names, preferences, or text you enter to our
            servers or to trusted APIs (for example maps, translation, or AI). We design flows so secrets like API keys
            stay on the server where possible.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">How we use it</h2>
          <p className="mt-2 leading-relaxed">
            Data is used only to generate responses you asked for—routes, itineraries, suggestions—and to improve
            reliability and security. We do not sell personal data.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Third-party services</h2>
          <p className="mt-2 leading-relaxed">
            Maps, routing, places, translation, and AI may be processed by external providers under their own terms.
            Review their privacy policies if you rely on those features heavily.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Your choices</h2>
          <p className="mt-2 leading-relaxed">
            Clear your browser storage, rotate API keys you control, and avoid entering sensitive personal data into
            free-form trip notes unless you trust the environment.
          </p>
        </div>
      </section>
    </main>
  );
}
