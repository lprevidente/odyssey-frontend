import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { TripService } from "@modules/trips/services/trip.service";
import { ActivatedRoute } from "@angular/router";
import { TripDetails } from "@modules/trips/models/tripInfo";
import { format } from "date-fns";
import { DateRange } from "@modules/trips/models/date-range";
import { People } from "@modules/trips/models/people";

@Component({
  selector: "app-trip",
  templateUrl: "./trip.page.html",
  styleUrls: ["./trip.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripPage {
  protected isEditRangeOpen = false;
  protected isEditGuestsOpen = false;
  protected readonly trip = signal<TripDetails>({} as TripDetails);
  protected readonly loading = signal<boolean>(true);
  private _tripId: string;

  constructor(
    private _tripService: TripService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._tripId = this._activatedRoute.snapshot.params["id"];
    this._tripService
      .getTrip(this._tripId)
      .subscribe(t => this.trip.set(t))
      .add(() => this.loading.set(false));
  }

  protected getRange(): string {
    const { from, to } = this.trip().dateRange;
    const fromStr = format(from, "MMM dd");
    const toStr = format(to, "MMM dd");
    return `${fromStr} - ${toStr}`;
  }

  protected updateDateRange(dateRange: DateRange): void {
    this.trip.update(t => ({ ...t, dateRange }));
  }

  protected getPeople(): number {
    const { adults, children } = this.trip().people;
    return adults + children;
  }

  protected updatePeople(people: People): void {
    this.trip.update(t => ({ ...t, people }));
  }
}
