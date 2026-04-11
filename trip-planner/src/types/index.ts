// TODO: Expand these interfaces as the data model solidifies with Supabase schemas.

export interface Trip {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO 8601
  endDate: string;   // ISO 8601
  createdAt: string;
  updatedAt: string;
}

export interface Day {
  id: string;
  tripId: string;
  date: string; // ISO 8601
  notes?: string;
  order: number;
}

export interface Destination {
  id: string;
  tripId: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  category?: string; // e.g. "restaurant", "hotel", "attraction"
  notes?: string;
}
