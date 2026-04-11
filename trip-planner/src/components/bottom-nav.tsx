"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Home, Calendar, MessageCircle, User, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { DESTINATIONS } from "@/data/destinations";

const MapModal = dynamic(() => import("@/components/map-modal"), {
  ssr: false,
});

type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "calendar", label: "Calendar", icon: Calendar, href: "/schedule" },
  { id: "messages", label: "Messages", icon: MessageCircle, href: "/messages" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
];

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  return pathname.startsWith(item.href);
}

export function BottomNav() {
  const pathname = usePathname();
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[72px] w-full items-center justify-between bg-card px-2 shadow-[0px_-1px_0px_0px_rgba(180,188,201,0.15)]">
        {/* Left two items */}
        {NAV_ITEMS.slice(0, 2).map((item) => (
          <NavButton key={item.id} item={item} active={isActive(pathname, item)} />
        ))}

        {/* Center map FAB — sits above nav bar */}
        <div className="relative flex w-[60px] flex-col items-center">
          <button
            onClick={() => setMapOpen(true)}
            aria-label="Explore map"
            className={cn(
              "absolute -top-7 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-travel-primary",
              "shadow-[0px_8px_19px_0px_rgba(13,110,253,0.17)] transition-transform hover:scale-105 active:scale-95"
            )}
          >
            <MapPin className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Right two items */}
        {NAV_ITEMS.slice(2).map((item) => (
          <NavButton key={item.id} item={item} active={isActive(pathname, item)} />
        ))}
      </nav>

      {mapOpen && (
        <MapModal destinations={DESTINATIONS} onClose={() => setMapOpen(false)} />
      )}
    </>
  );
}

function NavButton({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      className="flex w-[72px] flex-col items-center gap-1 py-2"
    >
      <Icon
        className={cn(
          "h-6 w-6 transition-colors",
          active ? "text-travel-primary" : "text-travel-sub-text"
        )}
        strokeWidth={active ? 2.5 : 1.75}
      />
      <span
        className={cn(
          "text-[12px] leading-4 transition-colors",
          active ? "font-medium text-travel-primary" : "text-travel-sub-text"
        )}
      >
        {item.label}
      </span>
    </Link>
  );
}
