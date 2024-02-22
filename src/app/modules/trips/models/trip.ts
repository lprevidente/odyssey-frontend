import { Place } from "@modules/trips/models/address";
import { People } from "@modules/trips/models/people";
import { DateRange } from "@modules/trips/models/date-range";

export interface Trip {
  id: string;
  name: string;
  imageURL: string;
  dateRange: DateRange;
  people: People;
  place: Place;
}
