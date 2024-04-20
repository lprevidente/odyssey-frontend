import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  signal,
} from "@angular/core";
import { Activity, trackByActivityId } from "@modules/trips/models/activity";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  public id = input.required<string>();
  public date = input.required<Date>();
  protected readonly trackByActivityId = trackByActivityId;

  protected activities = signal<Activity[]>([]);

  constructor() {}

  @Input({ alias: "activities", required: true })
  public set _activities(activities: Activity[]) {
    console.log(activities);
    this.activities.set(activities);
  }

  protected addActivity(activity: Activity): void {
    this.activities.update(activities => [...activities, activity]);
  }
}
