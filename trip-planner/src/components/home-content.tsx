"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { DestinationCard } from "@/components/destination-card";
import { DestinationDrawer } from "@/components/destination-drawer";
import { BottomNav } from "@/components/bottom-nav";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import type { Destination } from "@/types/destination";

type MavenDestinationRow = {
  id: string;
  name: string;
  location: string;
  rating: number;
  image_url: string;
  description: string;
  traveler_count: number;
  traveler_avatars: string[];
  latitude: number | null;
  longitude: number | null;
};

function mapRow(row: MavenDestinationRow): Destination {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    rating: row.rating,
    imageUrl: row.image_url,
    description: row.description,
    travelerCount: row.traveler_count,
    travelerAvatars: row.traveler_avatars,
    coordinates:
      row.latitude != null && row.longitude != null
        ? { lat: row.latitude, lng: row.longitude }
        : undefined,
  };
}

const USER_AVATAR = "/user-avatar.svg";

export function HomeContent() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    supabaseBrowserClient
      .from("maven_destinations")
      .select("id, name, location, rating, image_url, description, traveler_count, traveler_avatars, latitude, longitude")
      .order("is_featured", { ascending: false })
      .order("rating", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          setDestinations((data as MavenDestinationRow[]).map(mapRow));
        }
        setLoading(false);
      });
  }, []);

  function handleOpenDestination(destination: Destination) {
    setSelectedDestination(destination);
    setDrawerOpen(true);
  }

  function handleDrawerOpenChange(open: boolean) {
    setDrawerOpen(open);
    if (!open) setSelectedDestination(null);
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col overflow-y-auto pb-24">
          {/* Header */}
          <header className="flex items-center justify-between px-5 pt-6 pb-2">
            {/* User info */}
            <div className="flex items-center gap-2.5 rounded-full bg-travel-surface px-3 py-1.5">
              <div className="h-9 w-9 overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={USER_AVATAR}
                  alt="Leonardo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-travel-text text-sm font-medium">
                Leonardo
              </span>
            </div>

            {/* Notification bell */}
            <button
              aria-label="Notifications"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-travel-surface transition-colors hover:bg-border"
            >
              <Bell className="text-travel-text h-5 w-5" />
            </button>
          </header>

          {/* Hero text */}
          <section className="px-5 pt-8 pb-6">
            <h1 className="text-travel-text text-[38px] font-light leading-[1.3] w-[300px]">
              Explore the{" "}
              <span className="font-bold">
                Beautiful{" "}
                <span className="text-travel-action">world!</span>
              </span>
            </h1>
          </section>

          {/* Best Destinations section */}
          <section>
            {/* Section header */}
            <div className="flex items-center justify-between px-5 pb-4">
              <h2 className="text-travel-text text-xl font-semibold leading-7">
                Best Destination
              </h2>
              <button className="text-travel-action text-sm">View all</button>
            </div>

            {/* Horizontally scrollable cards */}
            <div className="flex gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[280px] w-[220px] shrink-0 animate-pulse rounded-3xl bg-travel-surface"
                  />
                ))
              ) : (
                destinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onOpen={handleOpenDestination}
                  />
                ))
              )}
            </div>
          </section>
        </div>

        {/* Bottom navigation */}
        <BottomNav />
      </main>

      {/* Destination detail drawer */}
      <DestinationDrawer
        destination={selectedDestination}
        open={drawerOpen}
        onOpenChange={handleDrawerOpenChange}
      />
    </div>
  );
}
