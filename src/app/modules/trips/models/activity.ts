import { Place } from "@modules/trips/models/address";

export interface Attachment {
  title: string;
  url: string;
  size: number;
}

export type Activity = {
  id: string;
  name: string;
  notes: string | null;
  attachments: Attachment[];
  link: string | null;
} & (
  | ({ type: "transportation" } & Transportation)
  | ({ type: "eatery" } & Eatery)
  | ({ type: "accommodation" } & Accommodation)
  | ({ type: "entertainment" } & Entertainment)
);

export const trackByActivityId = (_: number, item: Activity): string => item.id;

export interface Transportation {
  from: Place;
  to: Place;
  departureTime: string | null;
  arrivalTime: string | null;
  mode: TransportationType;
  number: string | null;
}

export type TransportationType = "airplane" | "train" | "bus" | "car" | "walk";

export interface Eatery {
  place: Place;
  reservation: boolean;
  time: string | null;
}

export interface Accommodation {
  place: Place;
  checkIn: string;
  checkOut: string;
}

export interface Entertainment {
  place: Place;
  reservation: boolean;
  time: string | null;
}

export type NewEntertainment = Omit<Activity, "id" | "type" | "attachments"> &
  Entertainment;

export type NewEatery = Omit<Activity, "id" | "type" | "attachments"> & Eatery;

export type NewAccommodation = Omit<Activity, "id" | "type" | "attachments"> &
  Accommodation;

export type NewTransportation = Omit<Activity, "id" | "type" | "attachments"> &
  Transportation;
