"use client";

import { useEffect, useMemo } from "react";
import { X, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Destination } from "@/types/destination";

function createPinIcon() {
  return L.divIcon({
    html: `<div style="
        width: 28px;
        height: 36px;
        position: relative;
      ">
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 28px;
          height: 28px;
          background: #24baec;
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
      </div>`,
    className: "",
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -38],
  });
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(L.latLngBounds(positions), { padding: [60, 60] });
    } else if (positions.length === 1) {
      map.setView(positions[0], 10);
    }
  }, [map, positions]);
  return null;
}

type MapModalProps = {
  destinations: Destination[];
  onClose: () => void;
};

export default function MapModal({ destinations, onClose }: MapModalProps) {
  const withCoords = destinations.filter((d) => d.coordinates);
  const positions = withCoords.map(
    (d) => [d.coordinates!.lat, d.coordinates!.lng] as [number, number]
  );
  const pinIcon = useMemo(() => createPinIcon(), []);
  const defaultCenter: [number, number] =
    positions.length > 0 ? positions[0] : [20, 0];

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-background">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-travel-primary" />
          <h2 className="text-travel-text text-lg font-semibold">
            Explore Map
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close map"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-travel-surface transition-colors hover:bg-border"
        >
          <X className="h-4 w-4 text-travel-sub-text" />
        </button>
      </header>

      {/* Map fills remaining height */}
      <div className="relative flex-1">
        <MapContainer
          center={defaultCenter}
          zoom={4}
          style={{ height: "100%", width: "100%" }}
          zoomControl
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds positions={positions} />
          {withCoords.map((dest) => (
            <Marker
              key={dest.id}
              position={[dest.coordinates!.lat, dest.coordinates!.lng]}
              icon={pinIcon}
            >
              <Popup>
                <div style={{ minWidth: 140 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 13,
                      color: "#1b1e28",
                      marginBottom: 2,
                    }}
                  >
                    {dest.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#7d848d" }}>
                    {dest.location}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      color: "#24baec",
                      fontWeight: 500,
                    }}
                  >
                    ★ {dest.rating.toFixed(1)}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
