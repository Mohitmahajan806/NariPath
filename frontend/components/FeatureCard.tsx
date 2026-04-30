import Link from 'next/link';
import type { FeatureCardDef } from '@/lib/features';

export function FeatureCard({ feature }: { feature: FeatureCardDef }) {
  return (
    <Link
      href={feature.href}
      className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
    >
      <span className="text-3xl" aria-hidden>
        {feature.icon}
      </span>
      <h2 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-sky-800">{feature.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{feature.description}</p>
      <span className="mt-4 inline-flex items-center text-sm font-semibold text-sky-700">
        Open
        <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
          →
        </span>
      </span>
    </Link>
  );
}
