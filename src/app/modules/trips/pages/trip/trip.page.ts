import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-trip",
  templateUrl: "./trip.page.html",
  styleUrls: ["./trip.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripPage {
  protected isEditRangeOpen = false;
  protected isEditGuestsOpen = false;
}
