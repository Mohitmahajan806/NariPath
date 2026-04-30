'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

type PageHeadingProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function PageHeading({ eyebrow, title, children }: PageHeadingProps) {
  return (
    <div className="mb-10">
      <Link href="/" className="text-sm font-medium text-sky-700 hover:text-sky-900">
        ← Back to home
      </Link>
      <p className="mt-6 text-sm uppercase tracking-[0.35em] text-slate-400">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      {children ? <div className="mt-4 max-w-2xl text-slate-600">{children}</div> : null}
    </div>
  );
}
