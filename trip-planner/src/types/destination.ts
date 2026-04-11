export type Destination = {
  id: string;
  name: string;
  location: string;
  rating: number;
  imageUrl: string;
  description: string;
  travelerCount: number;
  travelerAvatars: string[];
  coordinates?: { lat: number; lng: number };
};
