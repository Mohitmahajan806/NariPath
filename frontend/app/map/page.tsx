import { MapPlaceholder } from '@/components/MapPlaceholder';
import { PageHeading } from '@/components/PageHeading';

export default function MapPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <PageHeading eyebrow="Navigation" title="Map & route planning">
        Reserve this area for Mapbox, Google Maps, or Leaflet when you wire geolocation and routing.
      </PageHeading>
      <MapPlaceholder />
    </main>
  );
}
