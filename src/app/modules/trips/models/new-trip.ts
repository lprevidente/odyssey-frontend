import { Place } from "@modules/trips/models/address";
import { DateRange } from "@modules/trips/models/date-range";
import { People } from "@modules/trips/models/people";

export interface NewTrip {
  name: string;
  dateRange: DateRange;
  people: People;
  place: Place;
}
