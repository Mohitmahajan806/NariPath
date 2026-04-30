export type FeatureCardDef = {
  href: string;
  title: string;
  description: string;
  icon: string;
};

export const FEATURE_CARDS: FeatureCardDef[] = [
  {
    href: '/translator',
    title: 'Translator',
    description: 'Carry key phrases in Spanish, French, Hindi, and Japanese.',
    icon: '💬',
  },
  {
    href: '/currency',
    title: 'Currency converter',
    description: 'Convert amounts across USD, EUR, INR, and GBP for trip budgeting.',
    icon: '💱',
  },
  {
    href: '/restaurants',
    title: 'Restaurants near me',
    description: 'Curated dining picks with categories and trusted-style reviews.',
    icon: '🍽️',
  },
  {
    href: '/hotels',
    title: 'Hotels & stays',
    description: 'Comfortable accommodations with highlights for safer travel.',
    icon: '🏨',
  },
  {
    href: '/culture',
    title: 'Culture & norms',
    description: 'Local traditions and tips for respectful, aware travel.',
    icon: '🌍',
  },
  {
    href: '/itinerary',
    title: 'Itinerary planner',
    description: 'Describe your trip and generate a structured plan.',
    icon: '🗓️',
  },
  {
    href: '/map',
    title: 'Map & routes',
    description: 'Place for map integration and route planning when you connect an SDK.',
    icon: '🗺️',
  },
];
