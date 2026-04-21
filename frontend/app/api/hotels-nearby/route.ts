import { NextResponse } from 'next/server';
import { GEOAPIFY_BASE, geocodeSearchFirst, getGeoapifyKey } from '@/lib/geoapify-shared';

type GeoFeatureCollection = {
  features?: { properties?: Record<string, unknown> }[];
};

function formatAccommodationCategory(categories: unknown): string {
  if (!Array.isArray(categories) || categories.length === 0) {
    return 'Stay';
  }
  const first = String(categories[0]);
  return first
    .replace(/^accommodation\./, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function pickRating(props: Record<string, unknown>): number {
  const raw = props.datasource as { raw?: { rating?: number } } | undefined;
  const r = raw?.raw?.rating;
  if (typeof r === 'number' && r > 0 && r <= 5) {
    return r;
  }
  return 0;
}

export async function POST(req: Request) {
  const apiKey = getGeoapifyKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Set GEOAPIFY_API_KEY (or NEXT_PUBLIC_GEOAPIFY_API_KEY) in frontend/.env.local' },
      { status: 500 }
    );
  }

  const body = (await req.json().catch(() => ({}))) as { place?: string; radiusMeters?: number };
  const place = body.place?.trim();
  const radiusMeters = Math.min(20000, Math.max(500, Number(body.radiusMeters) || 8000));

  if (!place) {
    return NextResponse.json({ error: 'Place is required.' }, { status: 400 });
  }

  const point = await geocodeSearchFirst(place, apiKey);
  if (!point) {
    return NextResponse.json({ error: 'Could not find that place. Try a city or neighborhood name.' }, { status: 404 });
  }

  const { lon, lat } = point;

  const categories = [
    'accommodation.hotel',
    'accommodation.motel',
    'accommodation.hostel',
    'accommodation.guest_house',
    'accommodation.apartment',
    'accommodation.chalet',
  ].join(',');

  const placesParams = new URLSearchParams({
    categories,
    filter: `circle:${lon},${lat},${radiusMeters}`,
    bias: `proximity:${lon},${lat}`,
    limit: '40',
    lang: 'en',
    apiKey,
  });

  const placesRes = await fetch(`${GEOAPIFY_BASE}/v2/places?${placesParams.toString()}`);
  if (!placesRes.ok) {
    const t = await placesRes.text();
    return NextResponse.json({ error: `Places search failed: ${t}` }, { status: 502 });
  }

  const placesJson = (await placesRes.json()) as GeoFeatureCollection;
  const features = placesJson.features ?? [];

  const hotels = features.map((feature, index) => {
    const props = (feature.properties ?? {}) as Record<string, unknown>;
    const id = String(props.place_id ?? `hotel-${lon}-${lat}-${index}`);
    const name = String(props.name ?? props.address_line1 ?? 'Unnamed stay');
    const kind = formatAccommodationCategory(props.categories);
    const city = typeof props.city === 'string' ? props.city : '';
    const country = typeof props.country === 'string' ? props.country : '';
    const location = [city, country].filter(Boolean).join(', ') || String(props.formatted ?? props.address_line1 ?? '');

    const distance = typeof props.distance === 'number' ? Math.round(props.distance) : null;
    const highlightsParts = [
      kind,
      distance != null ? `~${distance} m from search center` : null,
    ].filter(Boolean);

    return {
      id,
      name,
      location: location || 'Nearby',
      rating: pickRating(props),
      pricePerNight: '—',
      highlights: highlightsParts.join(' · ') || 'Nearby accommodation.',
    };
  });

  return NextResponse.json({
    center: { lon, lat, label: point.label },
    hotels,
  });
}
