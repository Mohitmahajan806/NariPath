import type { CultureNote, Hotel, Restaurant } from '@/services/api';

export const fallbackRestaurants: Restaurant[] = [
  {
    id: 'restaurant-1',
    name: 'Saffron Street Bistro',
    category: 'Indian fusion',
    rating: 4.8,
    priceLevel: '$$',
    description: 'Local favorites, safe dining with wellness-first menu options.',
  },
  {
    id: 'restaurant-2',
    name: 'Coastal Table',
    category: 'Seafood',
    rating: 4.7,
    priceLevel: '$$$',
    description: 'Ocean-view dining with secure booking and trusted reviews.',
  },
];

export const fallbackHotels: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Harbor Safe Suites',
    location: 'City center',
    rating: 4.6,
    pricePerNight: '$120/night',
    highlights: 'Women-friendly rooms, 24/7 support, sustainable design.',
  },
  {
    id: 'hotel-2',
    name: 'Greenway Boutique Stay',
    location: 'Historic district',
    rating: 4.5,
    pricePerNight: '$95/night',
    highlights: 'Eco-conscious accommodations close to culture spots.',
  },
];

export const fallbackCultureNotes: CultureNote[] = [
  { id: 'culture-1', title: 'Greet respectfully', description: 'Learn local greetings and use them when entering shops or homes.' },
  { id: 'culture-2', title: 'Dress with awareness', description: 'Choose modest attire in religious areas and local neighborhoods.' },
  { id: 'culture-3', title: 'Support local artisans', description: 'Buy sustainable handcrafts and avoid over-touristed souvenirs.' },
];
