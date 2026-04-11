"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Bell, CalendarDays, MapPin } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { cn } from "@/lib/utils";

// Figma design asset URLs (hosted by Figma MCP, valid for 7 days)
const imgNiladri =
  "https://www.figma.com/api/mcp/asset/6e435396-888f-400c-bc1b-3bd8af5c9aea";
const imgDarma =
  "https://www.figma.com/api/mcp/asset/40825eae-5317-4bc2-a867-cb8321bffce3";
const imgHighRech =
  "https://www.figma.com/api/mcp/asset/b1f440e4-ec0f-4fa0-9b71-b37e4afdc17d";

type ScheduleItem = {
  id: string;
  name: string;
  location: string;
  date: string;
  imageUrl: string;
};

const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: "niladri",
    name: "Niladri Reservoir",
    location: "Tekergat, Sunamgnj",
    date: "26 January 2022",
    imageUrl: imgNiladri,
  },
  {
    id: "highrech",
    name: "High Rech Park",
    location: "Zeero Point, Sylhet",
    date: "26 January 2022",
    imageUrl: imgHighRech,
  },
  {
    id: "darma",
    name: "Darma Reservoir",
    location: "Darma, Kuningan",
    date: "26 January 2022",
    imageUrl: imgDarma,
  },
];

const WEEK_DAYS = [
  { label: "S", date: 18 },
  { label: "M", date: 19 },
  { label: "T", date: 20 },
  { label: "W", date: 21 },
  { label: "T", date: 22 },
  { label: "F", date: 23 },
  { label: "S", date: 24 },
];

export function ScheduleContent() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(22);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col overflow-y-auto pb-24">
          {/* Header */}
          <header className="flex items-center justify-between px-5 pt-14 pb-2">
            <button
              aria-label="Go back"
              onClick={() => router.back()}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-travel-surface"
            >
              <ChevronLeft className="h-5 w-5 text-travel-text" />
            </button>
            <h1 className="text-travel-text text-lg font-semibold">Schedule</h1>
            <button
              aria-label="Notifications"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-travel-surface"
            >
              <Bell className="h-5 w-5 text-travel-text" />
            </button>
          </header>

          {/* Week calendar card */}
          <section className="mx-5 mt-4 mb-5 rounded-3xl bg-card p-4 shadow-[var(--shadow-calendar-widget)]">
            {/* Month row */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-travel-text text-xl font-semibold">
                22 October
              </p>
              <div className="flex items-center gap-1">
                <button
                  aria-label="Previous week"
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <ChevronLeft className="h-5 w-5 text-travel-text" strokeWidth={1.75} />
                </button>
                <button
                  aria-label="Next week"
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <ChevronRight className="h-5 w-5 text-travel-text" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* Day columns */}
            <div className="flex justify-between">
              {WEEK_DAYS.map(({ label, date }) => {
                const isActive = date === selectedDay;
                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDay(date)}
                    className={cn(
                      "flex w-11 flex-col items-center gap-2 rounded-xl py-2 transition-colors",
                      isActive ? "bg-travel-action" : ""
                    )}
                  >
                    <span
                      className={cn(
                        "text-[13px] leading-5 tracking-[0.3px]",
                        isActive ? "text-white/80" : "text-travel-sub-text"
                      )}
                    >
                      {label}
                    </span>
                    <span
                      className={cn(
                        "text-base font-semibold leading-5",
                        isActive ? "text-white" : "text-travel-text"
                      )}
                    >
                      {date}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* My Schedule section */}
          <section>
            {/* Section header */}
            <div className="flex items-center justify-between px-5 pb-3">
              <h2 className="text-travel-text text-xl font-semibold leading-7">
                My Schedule
              </h2>
              <button className="text-travel-primary text-sm">View all</button>
            </div>

            {/* Schedule item cards */}
            <div className="flex flex-col gap-3 px-5">
              {SCHEDULE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className="flex w-full items-center gap-3 rounded-2xl bg-card p-3 shadow-card text-left"
                >
                  {/* Thumbnail */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                  />

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays
                        className="h-4 w-4 shrink-0 text-travel-sub-text"
                        strokeWidth={1.5}
                      />
                      <span className="text-travel-sub-text text-[13px] leading-4 tracking-[0.3px]">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-travel-text truncate text-base font-medium tracking-[0.5px]">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <MapPin
                        className="h-4 w-4 shrink-0 text-travel-sub-text"
                        strokeWidth={1.5}
                      />
                      <span className="text-travel-sub-text text-[13px] leading-4 tracking-[0.3px]">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <ChevronRight
                    className="h-6 w-6 shrink-0 text-travel-sub-text"
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom navigation */}
        <BottomNav />
      </main>
    </div>
  );
}
