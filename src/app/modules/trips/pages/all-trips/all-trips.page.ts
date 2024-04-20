import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { TripService } from "@modules/trips/services/trip.service";
import { TripInfo } from "@modules/trips/models/tripInfo";
import { format } from "date-fns";

@Component({
  selector: "app-all-trips",
  templateUrl: "all-trips.page.html",
  styleUrls: ["all-trips.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllTripsPage {
  protected allTrips: TripInfo[] = [];
  protected readonly trips = signal<TripInfo[]>([]);
  protected readonly trackByFn = (_: number, trip: TripInfo): string => trip.id;

  protected readonly searchActive = signal<boolean>(false);

  public constructor(private _tripService: TripService) {}

  public ionViewWillEnter(): void {
    this._tripService.getTrips().subscribe(t => {
      this.allTrips = t;
      this.trips.set(t);
    });
  }

  protected range(trip: TripInfo): string {
    const fromStr = format(trip.dateRange.from, "MMM dd");
    const toStr = format(trip.dateRange.to, "MMM dd");
    return `${fromStr} - ${toStr}`;
  }

  protected searchTrip(event: any): void {
    const searchString = event.target.value.toLowerCase();
    this.trips.set(
      this.allTrips.filter(t => t.name.toLowerCase().includes(searchString))
    );
  }

  private _isUpcoming(trip: TripInfo): boolean {
    return trip.dateRange.to >= new Date();
  }

  private _isPast(trip: TripInfo): boolean {
    return trip.dateRange.to < new Date();
  }

  protected _isActive(trip: TripInfo): boolean {
    return trip.dateRange.from >= new Date() && trip.dateRange.to <= new Date();
  }
}
