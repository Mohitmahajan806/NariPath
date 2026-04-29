import { FeatureCard } from "@/components/FeatureCard";
import { FEATURE_CARDS } from "@/lib/features";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="mb-14 text-center lg:mb-16">
        <p className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
          Safety, culture, and travel intelligence
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Hey explorer! Welcome to Solosphere-where solo travel meets safety,
          support, and total freedom.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Choose a tool below to open restaurants, stays, currency help,
          translation, culture tips, itineraries, and map planning—each on its
          own page.
        </p>
      </section>

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">
          Travel features
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {FEATURE_CARDS.map((feature) => (
            <FeatureCard key={feature.href} feature={feature} />
          ))}
        </div>
      </section>
    </main>
  );
}
