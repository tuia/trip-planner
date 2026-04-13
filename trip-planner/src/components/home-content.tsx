"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { DestinationCard } from "@/components/destination-card";
import { DestinationDrawer } from "@/components/destination-drawer";
import { BottomNav } from "@/components/bottom-nav";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
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
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setAnimateIn(true);
  }, []);

  useEffect(() => {
    getSupabaseBrowserClient()
      .from("maven_destinations")
      .select("id, name, location, rating, image_url, description, traveler_count, traveler_avatars, latitude, longitude")
      .order("is_featured", { ascending: false })
      .order("rating", { ascending: false })
      .then(({ data, error }: { data: MavenDestinationRow[] | null; error: any }) => {
        if (!error && data) {
          setDestinations(data.map(mapRow));
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
          <header
            className="flex items-center justify-between px-5 pt-6 pb-2"
            style={{
              opacity: animateIn ? 1 : 0,
              animation: animateIn ? 'scheduleHeaderEnter 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards' : 'none',
            }}
          >
            {/* User info */}
            <div className="flex items-center gap-2.5 rounded-full bg-travel-surface px-3 py-1.5 transition-transform hover:scale-105 active:scale-95 duration-200">
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
              className="flex h-11 w-11 items-center justify-center rounded-full bg-travel-surface transition-transform hover:scale-110 active:scale-95 duration-200"
            >
              <Bell className="text-travel-text h-5 w-5" />
            </button>
          </header>

          {/* Hero text */}
          <section
            className="px-5 pt-8 pb-6"
            style={{
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(16px)',
              animation: animateIn ? 'scheduleItemEnter 0.5s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both' : 'none',
            }}
          >
            <h1 className="text-travel-text text-[38px] font-light leading-[1.3] w-[300px]">
              Explore the{" "}
              <span className="font-bold">
                Beautiful{" "}
                <span className="text-travel-action">world!</span>
              </span>
            </h1>
          </section>

          {/* Best Destinations section */}
          <section
            style={{
              opacity: animateIn ? 1 : 0,
              animation: animateIn ? 'scheduleItemEnter 0.5s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both' : 'none',
            }}
          >
            {/* Section header */}
            <div className="flex items-center justify-between px-5 pb-4">
              <h2 className="text-travel-text text-xl font-semibold leading-7">
                Best Destination
              </h2>
              <button className="text-travel-action text-sm transition-opacity hover:opacity-70 active:opacity-60">View all</button>
            </div>

            {/* Horizontally scrollable cards */}
            <div className="flex gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[280px] w-[220px] shrink-0 animate-pulse rounded-3xl bg-travel-surface"
                    style={{
                      opacity: animateIn ? 1 : 0,
                      transform: animateIn ? 'translateY(0)' : 'translateY(16px)',
                      animation: animateIn ? `scheduleItemEnter 0.5s ${0.3 + i * 0.1}s cubic-bezier(0.22, 1, 0.36, 1) both` : 'none',
                    }}
                  />
                ))
              ) : (
                destinations.map((destination, index) => (
                  <div
                    key={destination.id}
                    style={{
                      opacity: animateIn ? 1 : 0,
                      transform: animateIn ? 'translateY(0)' : 'translateY(16px)',
                      animation: animateIn ? `scheduleItemEnter 0.5s ${0.3 + index * 0.1}s cubic-bezier(0.22, 1, 0.36, 1) both` : 'none',
                    }}
                  >
                    <DestinationCard
                      destination={destination}
                      onOpen={handleOpenDestination}
                    />
                  </div>
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
