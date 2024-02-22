import { Component, effect, signal } from "@angular/core";
import { TripService } from "@modules/trips/services/trip.service";
import { Trip } from "@modules/trips/models/trip";
import { format } from "date-fns";

@Component({
  selector: "app-all-trips",
  templateUrl: "all-trips.page.html",
  styleUrls: ["all-trips.page.scss"],
})
export class AllTripsPage {
  protected allTrips: Trip[] = [];
  protected readonly trips = signal<Trip[]>([]);
  protected readonly trackByFn = (_: number, trip: Trip): string => trip.id;

  protected readonly sectionActive = signal<"active" | "upcoming" | "past">(
    "active"
  );

  protected readonly searchActive = signal<boolean>(false);

  public constructor(private _tripService: TripService) {
    effect(
      () => {
        const section = this.sectionActive();
        if (section === "active") {
          this.trips.set(this.allTrips.filter(this._isActive));
        }
        if (section === "upcoming") {
          this.trips.set(this.allTrips.filter(this._isUpcoming));
        }
        if (section === "past") {
          this.trips.set(this.allTrips.filter(this._isPast));
        }
      },
      { allowSignalWrites: true }
    );
  }

  public ionViewWillEnter(): void {
    this._tripService.getTrips().subscribe(t => {
      this.allTrips = t;
      this.sectionActive.set("active");
    });
  }

  protected range(trip: Trip): string {
    const fromStr = format(trip.dateRange.from, "MMM dd");
    const toStr = format(trip.dateRange.to, "MMM dd");
    return `${fromStr} - ${toStr}`;
  }

  protected searchTrip(event: any): void {
    const searchString = event.target.value.toLowerCase();
    console.log(searchString);
    this.trips.set(
      this.allTrips.filter(t => t.name.toLowerCase().includes(searchString))
    );
  }

  private _isUpcoming(trip: Trip): boolean {
    return trip.dateRange.to >= new Date();
  }

  private _isPast(trip: Trip): boolean {
    return trip.dateRange.to < new Date();
  }

  protected _isActive(trip: Trip): boolean {
    return trip.dateRange.from >= new Date() && trip.dateRange.to <= new Date();
  }
}
