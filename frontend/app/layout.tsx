import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://solosphere.com"),

  title: {
    default: "Solosphere | Smart Travel Assistant",
    template: "%s | Solosphere",
  },

  description:
    "Solosphere is your AI-powered travel companion for trip planning, personalized itineraries, local food recommendations, safety insights, and cultural guidance for smarter journeys.",

  keywords: [
    "Solosphere",
    "travel assistant",
    "AI travel planner",
    "trip itinerary",
    "travel guide",
    "restaurant recommendations",
    "travel safety",
    "vacation planner",
    "city guide",
    "smart travel",
  ],

  authors: [{ name: "Solosphere Team" }],
  creator: "Solosphere",
  publisher: "Solosphere",
  applicationName: "Solosphere",

  icons: {
    icon: "/Solosphere.jpeg",
    shortcut: "/Solosphere.jpeg",
    apple: "/Solosphere.jpeg",
  },

  openGraph: {
    title: "Solosphere | Smart Travel Assistant",
    description:
      "Plan better trips with Solosphere — discover destinations, build itineraries, explore local food, and travel with confidence.",
    url: "https://solosphere.com",
    siteName: "Solosphere",
    images: [
      {
        url: "/Solosphere.jpeg",
        width: 1200,
        height: 630,
        alt: "Solosphere Travel Assistant",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Solosphere | Smart Travel Assistant",
    description:
      "Your AI-powered travel companion for planning trips, finding food, and exploring the world smarter.",
    images: ["/Solosphere.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}