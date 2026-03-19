export type SpaceType = "café" | "library" | "coworking" | "study-hub";

export type ZoneType = "quiet" | "group";

export interface Zone {
  type: ZoneType;
  availableSeats: number;
  totalSeats: number;
}

export interface StudySpace {
  id: string;
  name: string;
  type: SpaceType;
  distance: string;
  distanceMeters: number;
  zones: Zone[];
  confidenceScore: number;
  pricePerHour: number;
  tags: string[];
  amenities: string[];
  openingHours: string;
  hasFocusGuarantee: boolean;
  imageUrl?: string;
}

export interface Booking {
  id: string;
  space: StudySpace;
  zone: ZoneType;
  duration: number; // hours
  totalPrice: number;
  startTime: Date;
  status: "confirmed" | "checked-in" | "completed" | "cancelled";
}
