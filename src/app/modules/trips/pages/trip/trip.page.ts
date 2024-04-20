import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { TripService } from "@modules/trips/services/trip.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TripDetails } from "@modules/trips/models/tripInfo";
import { addDays, differenceInDays, format } from "date-fns";
import { DateRange } from "@modules/trips/models/date-range";
import { People } from "@modules/trips/models/people";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";

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

  protected readonly actionSheetButtons = [
    { text: "Delete", role: "destructive", data: { action: "delete" } },
    { text: "Cancel", role: "cancel", data: { action: "cancel" } },
  ];

  constructor(
    private _tripService: TripService,
    private _activatedRoute: ActivatedRoute,
    private _loadingService: LoadingService,
    private _toastSavingService: ToastSavingService,
    private _router: Router
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

  protected actionResult(event: CustomEvent): void {
    if (event.detail.role !== "destructive") return;
    this._loadingService.showLoading();
    this._tripService
      .deleteTrip(this._tripId)
      .subscribe({
        next: () => this._router.navigate(["/trips"]),
        error: () => this._toastSavingService.showError(),
      })
      .add(() => this._loadingService.hideLoading());
  }

  protected trackByDate = (index: number, date: Date) => date.toISOString();

  protected dates(): Date[] {
    const { from, to } = this.trip().dateRange;
    const days = differenceInDays(to, from);
    return Array.from({ length: days + 1 }, (_, i) => {
      return addDays(from, i);
    });
  }
}
