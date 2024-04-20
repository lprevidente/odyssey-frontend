import { Component, input } from "@angular/core";
import { Activity, trackByActivityId } from "@modules/trips/models/activity";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"],
})
export class TimelineComponent {
  public date = input.required<Date>();
  protected readonly trackByActivityId = trackByActivityId;

  public activities: Activity[] = [];

  constructor() {}
}
