'use client';

import { PageHeading } from '@/components/PageHeading';
import { HotelCard } from '@/components/HotelCard';
import { useFetch } from '@/hooks/useFetch';
import { fallbackHotels } from '@/lib/travel-fallbacks';
import { fetchHotels } from '@/services/api';

export default function HotelsPage() {
  const { data: hotels, loading } = useFetch(fetchHotels, []);
  const hotelList = hotels ?? fallbackHotels;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <PageHeading eyebrow="Stays" title="Hotels & accommodations">
        Comfortable stays with verified-style highlights for safer, more informed booking.
      </PageHeading>

      {loading ? (
        <p className="text-slate-500">Loading accommodations…</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {hotelList.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </main>
  );
}
