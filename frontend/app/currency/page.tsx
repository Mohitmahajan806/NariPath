import { CurrencyConverter } from '@/components/CurrencyConverter';
import { PageHeading } from '@/components/PageHeading';

export default function CurrencyPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <PageHeading eyebrow="Money" title="Currency converter">
        Check amounts across major currencies to plan daily spend before you travel.
      </PageHeading>
      <CurrencyConverter />
    </main>
  );
}
