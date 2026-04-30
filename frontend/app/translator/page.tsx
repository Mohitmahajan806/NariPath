import { PageHeading } from '@/components/PageHeading';
import { Translator } from '@/components/Translator';

export default function TranslatorPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <PageHeading eyebrow="Language" title="Translator">
        Translate travel phrases so you can communicate clearly on the go.
      </PageHeading>
      <Translator />
    </main>
  );
}
