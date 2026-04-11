"use client";

import {
  ChevronLeft,
  ChevronRight,
  User,
  Bookmark,
  Plane,
  Settings,
  Info,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { BottomNav } from "@/components/bottom-nav";

const PROFILE_AVATAR = "/user-avatar.svg";

const STATS = [
  { label: "Reward Points", value: "360" },
  { label: "Travel Trips", value: "238" },
  { label: "Bucket List", value: "473" },
] as const;

const MENU_ITEMS = [
  { id: "profile", label: "Profile", Icon: User },
  { id: "bookmarked", label: "Bookmarked", Icon: Bookmark },
  { id: "previous-trips", label: "Previous Trips", Icon: Plane },
  { id: "settings", label: "Settings", Icon: Settings },
  { id: "version", label: "Version", Icon: Info },
] as const;

export default function ProfilePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col overflow-y-auto pb-24">
          {/* Header */}
          <header className="flex items-center justify-between px-5 pt-14 pb-4">
            <Link
              href="/"
              aria-label="Go back"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-travel-surface"
            >
              <ChevronLeft className="h-5 w-5 text-travel-text" />
            </Link>
            <h1 className="text-travel-text text-lg font-semibold">Profile</h1>
            <button
              aria-label="Edit profile"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-travel-surface"
            >
              <Pencil className="h-[18px] w-[18px] text-travel-primary" />
            </button>
          </header>

          {/* Avatar + Name + Email */}
          <section className="flex flex-col items-center gap-2 px-5 pt-2 pb-6">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-travel-avatar-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROFILE_AVATAR}
                alt="Leonardo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center gap-1 pt-1">
              <p className="text-travel-text text-2xl font-medium">Leonardo</p>
              <p className="text-travel-sub-text text-sm lowercase">
                leonardo@gmail.com
              </p>
            </div>
          </section>

          {/* Stats card */}
          <section className="mx-5 mb-3">
            <div className="flex overflow-hidden rounded-2xl bg-card shadow-card">
              {STATS.map(({ label, value }, index) => (
                <div
                  key={label}
                  className="relative flex flex-1 flex-col items-center gap-1.5 py-5"
                >
                  {index > 0 && (
                    <div className="absolute top-4 bottom-4 left-0 w-px bg-border" />
                  )}
                  <p className="text-travel-text px-1 text-center text-[14px] font-semibold tracking-[0.5px]">
                    {label}
                  </p>
                  <p className="text-travel-action text-base font-semibold tracking-[0.5px]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Menu list */}
          <section className="mx-5 mt-3 mb-4 overflow-hidden rounded-2xl bg-card">
            {MENU_ITEMS.map(({ id, label, Icon }, index) => (
              <div key={id}>
                <button className="flex w-full items-center gap-4 px-4 py-[17px]">
                  <Icon
                    className="text-travel-sub-text h-6 w-6 shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="text-travel-text flex-1 text-left text-base font-medium tracking-[0.5px]">
                    {label}
                  </span>
                  <ChevronRight
                    className="text-travel-sub-text h-6 w-6 shrink-0"
                    strokeWidth={1.5}
                  />
                </button>
                {index < MENU_ITEMS.length - 1 && (
                  <div className="bg-border mx-4 h-px" />
                )}
              </div>
            ))}
          </section>
        </div>

        {/* Bottom navigation */}
        <BottomNav />
      </main>
    </div>
  );
}
