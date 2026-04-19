'use client';

import { CultureCard } from '@/components/CultureCard';
import { PageHeading } from '@/components/PageHeading';
import { useFetch } from '@/hooks/useFetch';
import { fallbackCultureNotes } from '@/lib/travel-fallbacks';
import { fetchCultureNotes } from '@/services/api';

export default function CulturePage() {
  const { data: cultureNotes, loading } = useFetch(fetchCultureNotes, []);
  const notes = cultureNotes ?? fallbackCultureNotes;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <PageHeading eyebrow="Respect" title="Culture & local norms">
        Local traditions and respectful travel tips to help you blend in and support communities.
      </PageHeading>

      {loading ? (
        <p className="text-slate-500">Loading culture notes…</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {notes.map((note) => (
            <CultureCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </main>
  );
}
