import { Place } from "@modules/trips/models/address";
import { People } from "@modules/trips/models/people";
import { DateRange } from "@modules/trips/models/date-range";
import { Activity } from "@modules/trips/models/activity";

export interface TripInfo {
  id: string;
  name: string;
  imageURL: string;
  dateRange: DateRange;
  people: People;
  place: Place;
}

export interface TripDetails {
  id: string;
  name: string;
  dateRange: DateRange;
  people: People;
  activities: { [date: string]: Activity[] };
}
