import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TripService } from "@modules/trips/services/trip.service";

@Component({
  selector: "app-trip",
  templateUrl: "./trip.page.html",
  styleUrls: ["./trip.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripPage {
  protected isEditRangeOpen = false;
  protected isEditGuestsOpen = false;

  constructor(private _tripService: TripService) {}
}
