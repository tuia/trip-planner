"use client";

import { MapPin, Star, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types/destination";

type DestinationCardProps = {
  destination: Destination;
  onOpen: (destination: Destination) => void;
  className?: string;
};

export function DestinationCard({
  destination,
  onOpen,
  className,
}: DestinationCardProps) {
  return (
    <article
      className={cn(
        "bg-card flex w-[268px] shrink-0 cursor-pointer flex-col rounded-3xl shadow-[0px_6px_16px_0px_rgba(180,188,201,0.12)]",
        className
      )}
      onClick={() => onOpen(destination)}
    >
      {/* Image area */}
      <div className="relative h-[240px] overflow-hidden rounded-t-3xl rounded-b-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="h-full w-full object-cover"
        />
        {/* Bookmark button */}
        <button
          aria-label="Bookmark destination"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-black/20 backdrop-blur-md transition-colors hover:bg-black/35"
        >
          <Bookmark className="h-[18px] w-[18px] text-white" />
        </button>
      </div>

      {/* Info area */}
      <div className="flex flex-col gap-2 px-4 py-4">
        {/* Name + rating row */}
        <div className="flex items-center justify-between">
          <h3 className="text-travel-text text-[18px] font-medium leading-6 tracking-[0.5px]">
            {destination.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="text-travel-star h-3 w-3 fill-current" />
            <span className="text-travel-text text-[15px] leading-5 tracking-[0.3px]">
              {destination.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Location row */}
        <div className="flex items-center gap-1.5">
          <MapPin className="text-travel-action h-4 w-4 shrink-0" />
          <span className="text-travel-sub-text text-[15px] leading-5 tracking-[0.3px]">
            {destination.location}
          </span>
        </div>

        {/* Travelers row */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex -space-x-2">
            {destination.travelerAvatars.slice(0, 3).map((avatar, i) => (
              <div
                key={i}
                className="ring-card h-6 w-6 overflow-hidden rounded-full ring-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar}
                  alt={`Traveler ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            <div className="ring-card flex h-6 w-6 items-center justify-center rounded-full bg-travel-frame ring-2">
              <span className="text-travel-text text-[10px] font-medium leading-none">
                +{destination.travelerCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
