import type { Destination } from "@/types/destination";

export const DESTINATIONS: Destination[] = [
  {
    id: "niladri",
    name: "Niladri Reservoir",
    location: "Tekergat, Sunamgnj",
    rating: 4.7,
    imageUrl:
      "http://localhost:3845/assets/f0300adc49024100a89c01bb1b2bacc523162e75.png",
    description:
      "A stunning turquoise reservoir nestled in the hills of Sunamganj, Bangladesh. Known for its crystal-clear blue-green waters reflecting the surrounding lush green hills, Niladri is often called the 'Darjeeling of Bangladesh'. Best visited between October and February when the water is at its most vibrant.",
    travelerCount: 50,
    travelerAvatars: [
      "http://localhost:3845/assets/781eb637b02b40aa3718b99bc8162ca4f5a4353a.png",
      "http://localhost:3845/assets/44dde6d6a0ee3f726d5d79e67aae431c654f9bb8.png",
      "http://localhost:3845/assets/3adb3c20adcc9641849b5932330241b5e9ac374f.png",
    ],
    coordinates: { lat: 25.0742, lng: 91.4003 },
  },
  {
    id: "darma",
    name: "Darma Reservoir",
    location: "Darma, Kuningan",
    rating: 4.9,
    imageUrl:
      "http://localhost:3845/assets/ce609041af2a3946819dfaa9194f6eb90ce77764.png",
    description:
      "One of West Java's most scenic reservoirs, surrounded by towering mountains and lush forest. The Darma Reservoir in Kuningan offers a peaceful escape with breathtaking sunrise views, fresh cool air, and opportunities for boating and fishing. A favourite destination for nature lovers and photography enthusiasts.",
    travelerCount: 50,
    travelerAvatars: [
      "http://localhost:3845/assets/781eb637b02b40aa3718b99bc8162ca4f5a4353a.png",
      "http://localhost:3845/assets/44dde6d6a0ee3f726d5d79e67aae431c654f9bb8.png",
      "http://localhost:3845/assets/3adb3c20adcc9641849b5932330241b5e9ac374f.png",
    ],
    coordinates: { lat: -6.9792, lng: 108.4783 },
  },
  {
    id: "maldives",
    name: "Maldives Atoll",
    location: "North Malé Atoll",
    rating: 4.8,
    imageUrl:
      "http://localhost:3845/assets/f0300adc49024100a89c01bb1b2bacc523162e75.png",
    description:
      "A tropical paradise of white sandy beaches, overwater bungalows, and some of the world's most vibrant coral reefs. The Maldives offers unparalleled snorkelling, diving and relaxation in a setting of unsurpassed natural beauty.",
    travelerCount: 120,
    travelerAvatars: [
      "http://localhost:3845/assets/781eb637b02b40aa3718b99bc8162ca4f5a4353a.png",
      "http://localhost:3845/assets/44dde6d6a0ee3f726d5d79e67aae431c654f9bb8.png",
      "http://localhost:3845/assets/3adb3c20adcc9641849b5932330241b5e9ac374f.png",
    ],
    coordinates: { lat: 4.4167, lng: 73.5 },
  },
];
