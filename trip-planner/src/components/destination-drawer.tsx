"use client";

import { Drawer } from "@base-ui/react/drawer";
import { MapPin, Star, X, Bookmark, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types/destination";

type DestinationDrawerProps = {
  destination: Destination | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DestinationDrawer({
  destination,
  open,
  onOpenChange,
}: DestinationDrawerProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Backdrop
          className={cn(
            "fixed inset-0 bg-black/40 transition-opacity duration-300",
            "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
          )}
        />
        <Drawer.Popup
          className={cn(
            "bg-card fixed bottom-0 left-0 right-0 z-50 flex max-h-[90dvh] flex-col overflow-hidden rounded-t-[28px] outline-none",
            "transition-transform duration-300 ease-out",
            "data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full"
          )}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="bg-border h-1.5 w-12 rounded-full" />
          </div>

          {/* Close button */}
          <Drawer.Close
            aria-label="Close"
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-travel-surface transition-colors hover:bg-border"
          >
            <X className="h-4 w-4 text-travel-sub-text" />
          </Drawer.Close>

          {destination && (
            <div className="flex flex-col overflow-y-auto">
              {/* Hero image */}
              <div className="relative mx-4 mt-2 h-[220px] overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="h-full w-full object-cover"
                />
                <button
                  aria-label="Bookmark destination"
                  className="absolute top-3 right-3 flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-black/20 backdrop-blur-md transition-colors hover:bg-black/35"
                >
                  <Bookmark className="h-[18px] w-[18px] text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 px-6 py-5">
                {/* Name + rating */}
                <div className="flex items-start justify-between gap-4">
                  <Drawer.Title className="text-travel-text text-2xl font-semibold leading-tight">
                    {destination.name}
                  </Drawer.Title>
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-travel-surface px-2.5 py-1">
                    <Star className="text-travel-star h-3.5 w-3.5 fill-current" />
                    <span className="text-travel-text text-sm font-medium">
                      {destination.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin className="text-travel-action h-4 w-4 shrink-0" />
                  <span className="text-travel-sub-text text-sm">
                    {destination.location}
                  </span>
                </div>

                {/* Stats row */}
                <div className="flex gap-4">
                  <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-travel-surface p-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="text-travel-primary h-4 w-4" />
                      <span className="text-travel-sub-text text-xs">
                        Duration
                      </span>
                    </div>
                    <span className="text-travel-text text-sm font-medium">
                      3–5 days
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-travel-surface p-3">
                    <div className="flex items-center gap-1.5">
                      <Users className="text-travel-primary h-4 w-4" />
                      <span className="text-travel-sub-text text-xs">
                        Travelers
                      </span>
                    </div>
                    <span className="text-travel-text text-sm font-medium">
                      {destination.travelerCount}+ joined
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-travel-text text-base font-semibold">
                    About
                  </h4>
                  <Drawer.Description className="text-travel-sub-text text-sm leading-relaxed">
                    {destination.description}
                  </Drawer.Description>
                </div>

                {/* CTA button */}
                <button className="mt-2 w-full rounded-full bg-travel-primary py-3.5 text-sm font-semibold text-white shadow-[0px_8px_19px_0px_rgba(36,186,236,0.35)] transition-opacity hover:opacity-90">
                  Plan a Trip Here
                </button>
              </div>
            </div>
          )}
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
