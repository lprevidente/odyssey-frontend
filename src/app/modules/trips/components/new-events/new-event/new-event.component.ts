import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-new-event",
  templateUrl: "./new-event.component.html",
  styleUrls: ["./new-event.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventComponent {
  protected isTransportationOpen = false;
  protected isEateryOpen = false;
  protected isAccommodationOpen = false;
  protected isEntertainmentOpen = false;

  public constructor() {}
}
