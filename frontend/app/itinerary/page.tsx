import { ItineraryPlanner } from '@/components/ItineraryPlanner';
import { PageHeading } from '@/components/PageHeading';

export default function ItineraryPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <PageHeading eyebrow="Planning" title="Itinerary planner">
        Describe your trip; we request a structured plan from your backend when it is available.
      </PageHeading>
      <ItineraryPlanner />
    </main>
  );
}
