'use client';

import { useMemo, useState } from 'react';
import { PageHeading } from '@/components/PageHeading';
import { RestaurantCard } from '@/components/RestaurantCard';
import { useFetch } from '@/hooks/useFetch';
import { fallbackRestaurants } from '@/lib/travel-fallbacks';
import { fetchRestaurants } from '@/services/api';

export default function RestaurantsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: restaurants, loading } = useFetch(fetchRestaurants, []);
  const restaurantList = restaurants ?? fallbackRestaurants;
  const displayedRestaurants = useMemo(
    () =>
      activeCategory === 'all' ? restaurantList : restaurantList.filter((r) => r.category.toLowerCase().includes(activeCategory)),
    [activeCategory, restaurantList]
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <PageHeading eyebrow="Dining" title="Restaurants near me">
        Curated dining with filters; data loads from your API when configured, with sensible fallbacks offline.
      </PageHeading>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {['all', 'indian fusion', 'seafood', 'local', 'vegan'].map((category) => (
            <button
              key={category}
              type="button"
              className={`rounded-full px-4 py-2 text-sm transition ${activeCategory === category ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {loading ? <p className="text-slate-500">Loading restaurants…</p> : displayedRestaurants.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
      </div>
    </main>
  );
}
